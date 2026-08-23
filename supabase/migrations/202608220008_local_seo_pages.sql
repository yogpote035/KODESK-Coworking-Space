-- Controlled local SEO page content. Public rendering remains limited to
-- developer-approved page templates and valid KODESK service relationships.
create table if not exists public.local_seo_pages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  service_slug text not null references public.services(slug) on update cascade on delete restrict,
  title text not null check (char_length(title) between 10 and 160),
  description text not null check (char_length(description) between 30 and 500),
  seo_title text,
  seo_description text,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists local_seo_pages_active_sort_idx on public.local_seo_pages (is_active, sort_order);
drop trigger if exists local_seo_pages_updated_at on public.local_seo_pages;
create trigger local_seo_pages_updated_at before update on public.local_seo_pages for each row execute function public.touch_updated_at();
alter table public.local_seo_pages enable row level security;
create policy "Public can read active local SEO pages" on public.local_seo_pages for select to anon, authenticated using (is_active = true);
create policy "Admins can manage local SEO pages" on public.local_seo_pages for all to authenticated using (public.is_admin()) with check (public.is_admin());

insert into public.local_seo_pages (slug, service_slug, title, description, sort_order) values
  ('coworking-space-baner', 'coworking-space', 'Coworking Space in Baner, Pune', 'Explore a professional coworking space for single professionals, women, freelancers, startups and teams in Baner, Pune.', 1),
  ('dedicated-desk-baner', 'dedicated-desk', 'Dedicated Desk in Baner, Pune', 'Reserve a dedicated desk in a professional coworking environment in Baner, Pune.', 2),
  ('private-office-baner', 'private-office', 'Private Office in Baner, Pune', 'Find private office workspace options for teams and professionals in Baner, Pune.', 3),
  ('meeting-room-baner', 'meeting-room', 'Meeting Room in Baner, Pune', 'Book a professional meeting room in Baner, Pune. Contact KODESK for current availability and duration.', 4),
  ('managed-office-baner', 'managed-office', 'Managed Office in Baner, Pune', 'Explore managed office spaces for rent and shared office space options in Baner, Pune, with flexible professional workspace arrangements.', 5),
  ('day-pass-baner', 'day-pass', 'Coworking Day Pass in Baner, Pune', 'Get a productive coworking day pass in Baner, Pune for ₹599 per day, subject to availability.', 6)
on conflict (slug) do nothing;
