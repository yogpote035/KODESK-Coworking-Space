insert into public.site_settings (key, value)
values ('branding', '{"site_name":"KODESK","logo_url":"","favicon_url":"","default_og_image_url":"","default_cta_label":"Book a Tour","default_cta_url":"/contact"}'::jsonb)
on conflict (key) do nothing;
