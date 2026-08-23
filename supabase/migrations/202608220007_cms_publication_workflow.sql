-- Structured draft/publish foundation for the fixed KODESK CMS sections.
-- This does not migrate or change any currently published public content.

create table if not exists public.content_documents (
  document_key text primary key check (document_key ~ '^[a-z0-9-]+(?:\.[a-z0-9-]+)*$'),
  draft_content jsonb not null default '{}'::jsonb check (jsonb_typeof(draft_content) = 'object'),
  published_content jsonb not null default '{}'::jsonb check (jsonb_typeof(published_content) = 'object'),
  draft_updated_at timestamptz not null default now(),
  draft_updated_by uuid references auth.users(id) on delete set null,
  published_at timestamptz,
  published_by uuid references auth.users(id) on delete set null,
  published_version integer not null default 0 check (published_version >= 0)
);

create table if not exists public.content_revisions (
  id uuid primary key default gen_random_uuid(),
  document_key text not null references public.content_documents(document_key) on delete cascade,
  version integer not null check (version > 0),
  content jsonb not null check (jsonb_typeof(content) = 'object'),
  action text not null check (action in ('published', 'restored')),
  created_at timestamptz not null default now(),
  created_by uuid references auth.users(id) on delete set null,
  unique (document_key, version)
);

create index if not exists content_revisions_document_created_idx
  on public.content_revisions (document_key, created_at desc);

alter table public.content_documents enable row level security;
alter table public.content_revisions enable row level security;

create policy "Admins can manage content documents"
  on public.content_documents for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

create policy "Admins can read content revisions"
  on public.content_revisions for select to authenticated
  using (public.is_admin());

create policy "Admins can create content revisions"
  on public.content_revisions for insert to authenticated
  with check (public.is_admin());

-- The function intentionally returns published content only: drafts never reach
-- the public browser, even though this is called with the browser-safe key.
create or replace function public.get_published_content_documents()
returns table (document_key text, content jsonb, published_at timestamptz, version integer)
language sql stable security definer set search_path = public
as $$
  select document_key, published_content, published_at, published_version
  from public.content_documents
  where published_at is not null;
$$;

grant execute on function public.get_published_content_documents() to anon, authenticated;
