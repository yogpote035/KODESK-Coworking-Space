create table public.services (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  name text not null unique check (char_length(name) between 2 and 120),
  short_description text not null check (char_length(short_description) between 10 and 500),
  image_url text check (image_url is null or image_url ~ '^https?://'),
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index services_active_sort_idx on public.services (is_active, sort_order);
create trigger services_updated_at before update on public.services for each row execute function public.touch_updated_at();

alter table public.services enable row level security;
create policy "Public can read active services" on public.services for select to anon, authenticated using (is_active = true);
create policy "Admins can manage services" on public.services for all to authenticated using (public.is_admin()) with check (public.is_admin());

insert into public.services (slug, name, short_description, sort_order) values
  ('coworking-space', 'Coworking Space', 'Flexible shared workspace for focused, productive workdays.', 1),
  ('dedicated-desk', 'Dedicated Desk', 'A reserved desk for professionals who value a consistent setup.', 2),
  ('private-office', 'Private Office', 'A private, professional office for teams and growing businesses.', 3),
  ('managed-office', 'Managed Office', 'A ready-to-use office solution with operations handled for you.', 4),
  ('flexible-seating', 'Flexible Seating', 'Choose a comfortable place to work whenever you need it.', 5),
  ('meeting-room', 'Meeting Room', 'Well-equipped meeting space for conversations that matter.', 6),
  ('event-space', 'Event Space', 'A polished venue for workshops, gatherings, and community events.', 7),
  ('day-pass', 'Day Pass', 'Easy day access to a refined KODESK workspace.', 8),
  ('virtual-office', 'Virtual Office', 'A professional business presence without a full-time office.', 9),
  ('podcast-studio', 'Podcast Studio', 'A dedicated studio environment for clear, confident recordings.', 10)
on conflict (slug) do nothing;
