alter table public.media
  add column gallery_category text check (gallery_category is null or gallery_category in ('workspace', 'meeting-rooms', 'lounge-areas', 'amenities'));

update public.media
set gallery_category = 'workspace'
where category = 'gallery' and gallery_category is null;

create index media_gallery_category_idx on public.media (category, gallery_category, sort_order);
