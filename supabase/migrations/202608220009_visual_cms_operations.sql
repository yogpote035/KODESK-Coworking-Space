-- Controlled visual-CMS operations. These records configure developer-approved
-- sections only; they never permit arbitrary page-builder markup or scripts.
create table if not exists public.cms_section_settings (
  id uuid primary key default gen_random_uuid(),
  page_key text not null check (page_key ~ '^[a-z0-9-]+$'),
  section_key text not null check (section_key ~ '^[a-z0-9-]+$'),
  is_visible boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (page_key, section_key)
);

create table if not exists public.redirect_rules (
  id uuid primary key default gen_random_uuid(),
  source_path text not null unique check (source_path ~ '^/[^\\s]*$'),
  destination_path text not null check (destination_path ~ '^/[^\\s]*$'),
  status_code integer not null default 301 check (status_code in (301, 302, 307, 308)),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists cms_section_settings_updated_at on public.cms_section_settings;
create trigger cms_section_settings_updated_at before update on public.cms_section_settings for each row execute function public.touch_updated_at();
drop trigger if exists redirect_rules_updated_at on public.redirect_rules;
create trigger redirect_rules_updated_at before update on public.redirect_rules for each row execute function public.touch_updated_at();

alter table public.cms_section_settings enable row level security;
alter table public.redirect_rules enable row level security;
create policy "Public can read section settings" on public.cms_section_settings for select to anon, authenticated using (true);
create policy "Admins can manage section settings" on public.cms_section_settings for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins can read redirect rules" on public.redirect_rules for select to authenticated using (public.is_admin());
create policy "Admins can manage redirect rules" on public.redirect_rules for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Public can read active redirect rules" on public.redirect_rules for select to anon, authenticated using (is_active = true);
