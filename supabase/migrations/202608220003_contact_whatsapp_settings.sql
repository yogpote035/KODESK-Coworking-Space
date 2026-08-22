update public.site_settings
set value = value || jsonb_build_object(
  'whatsapp_number', coalesce(nullif(value->>'whatsapp_number', ''), value->>'phone', '+91 93598 05818'),
  'whatsapp_message', coalesce(nullif(value->>'whatsapp_message', ''), 'Hello KODESK, I would like to know more about your coworking space and managed office options.')
)
where key = 'contact_information';
