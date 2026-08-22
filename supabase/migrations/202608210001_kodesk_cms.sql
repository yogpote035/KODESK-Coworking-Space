create extension if not exists pgcrypto;

create type public.enquiry_status as enum ('new', 'contacted', 'closed');

create table public.admin_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  role text not null default 'admin' check (role = 'admin'),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 120),
  phone text not null check (char_length(phone) between 7 and 30),
  email text check (email is null or char_length(email) <= 254),
  interested_in text,
  message text check (message is null or char_length(message) <= 3000),
  status public.enquiry_status not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index enquiries_status_idx on public.enquiries(status);
create index enquiries_created_at_idx on public.enquiries(created_at desc);
create index enquiries_email_idx on public.enquiries(email);
create index enquiries_phone_idx on public.enquiries(phone);

create table public.site_settings (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  value jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.pricing (
  id uuid primary key default gen_random_uuid(),
  service_key text unique not null,
  service_name text not null,
  price numeric(12,2) check (price is null or price >= 0),
  price_label text,
  currency text not null default 'INR',
  billing_period text,
  description text,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.media (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  storage_path text not null unique,
  public_url text not null,
  alt_text text,
  category text not null check (category in ('hero', 'gallery', 'service', 'other')),
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.admin_profiles where id = auth.uid() and role = 'admin' and is_active = true); $$;

create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$ begin new.updated_at = now(); return new; end; $$;

create trigger enquiries_updated_at before update on public.enquiries for each row execute function public.touch_updated_at();
create trigger site_settings_updated_at before update on public.site_settings for each row execute function public.touch_updated_at();
create trigger pricing_updated_at before update on public.pricing for each row execute function public.touch_updated_at();
create trigger media_updated_at before update on public.media for each row execute function public.touch_updated_at();

alter table public.admin_profiles enable row level security;
alter table public.enquiries enable row level security;
alter table public.site_settings enable row level security;
alter table public.pricing enable row level security;
alter table public.media enable row level security;

create policy "Admins can read their profile" on public.admin_profiles for select to authenticated using (id = auth.uid());
create policy "Admins can manage enquiries" on public.enquiries for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Public can create enquiries" on public.enquiries for insert to anon, authenticated with check (status = 'new');
create policy "Public can read settings" on public.site_settings for select to anon, authenticated using (true);
create policy "Admins can manage settings" on public.site_settings for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Public can read active pricing" on public.pricing for select to anon, authenticated using (is_active = true);
create policy "Admins can manage pricing" on public.pricing for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Public can read active media" on public.media for select to anon, authenticated using (is_active = true);
create policy "Admins can manage media" on public.media for all to authenticated using (public.is_admin()) with check (public.is_admin());

insert into storage.buckets (id, name, public) values ('kodesk-media', 'kodesk-media', true) on conflict (id) do nothing;
create policy "Public can read KODESK media" on storage.objects for select to anon, authenticated using (bucket_id = 'kodesk-media');
create policy "Admins can manage KODESK media" on storage.objects for all to authenticated using (bucket_id = 'kodesk-media' and public.is_admin()) with check (bucket_id = 'kodesk-media' and public.is_admin());

insert into public.pricing (service_key, service_name, price, price_label, billing_period, description, sort_order) values
  ('day_pass', 'Day Pass', 599, '₹599 / day', 'day', 'Flexible workspace access for one day.', 1),
  ('dedicated_desk', 'Dedicated Desk', 7499, '₹7,499 / month', 'month', 'A reserved workspace for consistent work.', 2),
  ('private_office', 'Private Office', null, 'Request Pricing', null, 'Private workspace options for teams and professionals.', 3),
  ('managed_office', 'Managed Office', null, 'Request a Quote', null, 'Ready-to-use managed workspace solutions.', 4),
  ('meeting_room', 'Meeting Room', null, 'Request Pricing', null, 'Professional meeting space, subject to availability.', 5)
on conflict (service_key) do nothing;

insert into public.site_settings (key, value) values
  ('contact_information', '{"phone":"+91 93598 05818","email":"hello@kodesk.com","address":"Baner, Pune, Maharashtra","whatsapp_number":"+91 93598 05818","whatsapp_message":"Hello KODESK, I would like to know more about your coworking space and managed office options."}'::jsonb),
  ('business_hours', '{"reception":"Mon–Sat, 8:00 AM–8:00 PM"}'::jsonb),
  ('social_links', '{"instagram":"https://www.instagram.com/kodesk_coworking/","whatsapp":"https://wa.me/919359805818","facebook":"https://www.facebook.com/kodesk.coworking/","linkedin":"https://www.linkedin.com/company/kodeskcoworking/"}'::jsonb),
  ('seo_defaults', '{"site_url":"https://kodesk-coworking-space.vercel.app"}'::jsonb)
on conflict (key) do nothing;
