create table public.service_page_details (
  id uuid primary key default gen_random_uuid(),
  service_slug text not null unique references public.services(slug) on update cascade on delete cascade,
  cover_image_url text check (cover_image_url is null or cover_image_url ~ '^https?://'),
  hero_image_url text check (hero_image_url is null or hero_image_url ~ '^https?://'),
  gallery_image_urls jsonb not null default '[]'::jsonb check (jsonb_typeof(gallery_image_urls) = 'array'),
  hero_title text,
  hero_description text,
  overview_title text,
  overview_body text,
  benefits jsonb not null default '[]'::jsonb check (jsonb_typeof(benefits) = 'array'),
  audience_title text,
  audience jsonb not null default '[]'::jsonb check (jsonb_typeof(audience) = 'array'),
  features jsonb not null default '[]'::jsonb check (jsonb_typeof(features) = 'array'),
  cta_title text,
  cta_body text,
  updated_at timestamptz not null default now()
);

create trigger service_page_details_updated_at before update on public.service_page_details for each row execute function public.touch_updated_at();
alter table public.service_page_details enable row level security;
create policy "Public can read service page details" on public.service_page_details for select to anon, authenticated using (true);
create policy "Admins can manage service page details" on public.service_page_details for all to authenticated using (public.is_admin()) with check (public.is_admin());

insert into public.service_page_details (service_slug)
select slug from public.services
on conflict (service_slug) do nothing;
