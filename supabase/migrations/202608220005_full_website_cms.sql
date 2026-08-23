create table if not exists public.page_sections (
  id uuid primary key default gen_random_uuid(),
  page_key text not null check (page_key ~ '^[a-z0-9-]+$'),
  section_key text not null check (section_key ~ '^[a-z0-9-]+$'),
  content jsonb not null default '{}'::jsonb check (jsonb_typeof(content) = 'object'),
  is_active boolean not null default true,
  sort_order integer not null default 0,
  updated_at timestamptz not null default now(),
  unique (page_key, section_key)
);

create table if not exists public.service_media (
  id uuid primary key default gen_random_uuid(),
  service_slug text not null references public.services(slug) on update cascade on delete cascade,
  media_id uuid references public.media(id) on delete set null,
  public_url text not null check (public_url ~ '^https?://'),
  role text not null check (role in ('cover', 'hero', 'gallery')),
  alt_text text,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.service_page_details add column if not exists subtitle text;
alter table public.service_page_details add column if not exists cta_label text;
alter table public.service_page_details add column if not exists cta_url text;
alter table public.service_page_details add column if not exists faq_items jsonb not null default '[]'::jsonb;
alter table public.service_page_details add column if not exists seo_title text;
alter table public.service_page_details add column if not exists seo_description text;

create index if not exists page_sections_page_sort_idx on public.page_sections (page_key, is_active, sort_order);
create index if not exists service_media_service_role_sort_idx on public.service_media (service_slug, role, is_active, sort_order);

drop trigger if exists page_sections_updated_at on public.page_sections;
create trigger page_sections_updated_at before update on public.page_sections for each row execute function public.touch_updated_at();
drop trigger if exists service_media_updated_at on public.service_media;
create trigger service_media_updated_at before update on public.service_media for each row execute function public.touch_updated_at();

alter table public.page_sections enable row level security;
alter table public.service_media enable row level security;
create policy "Public can read active page sections" on public.page_sections for select to anon, authenticated using (is_active = true);
create policy "Admins can manage page sections" on public.page_sections for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Public can read active service media" on public.service_media for select to anon, authenticated using (is_active = true);
create policy "Admins can manage service media" on public.service_media for all to authenticated using (public.is_admin()) with check (public.is_admin());
