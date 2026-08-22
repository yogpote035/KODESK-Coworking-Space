# KODESK Admin Application

This is a standalone, protected Next.js admin application. Deploy `admin/` as a separate Vercel project, for example `admin.kodesk.com`.

## Setup

1. Create a Supabase project.
2. Run the migrations in `../supabase/migrations/` in filename order in the Supabase SQL editor, including `202608220001_kodesk_services.sql`, `202608220002_gallery_categories.sql`, and `202608220003_contact_whatsapp_settings.sql` for service, gallery, and shared contact settings.
3. Copy `.env.example` to `.env.local`, then supply the project URL and anon key. Never place a service-role key in this app.
4. In Supabase Auth, manually create the initial email/password user. Do not enable public admin sign-up.
5. Insert the matching user ID and email into `public.admin_profiles` with `role = 'admin'` and `is_active = true`.
6. Install and run:

```powershell
cd admin
npm install
npm run dev
```

## Features

- Supabase Auth email/password login and logout.
- Next.js proxy redirects unauthenticated dashboard requests to `/login`.
- RLS-protected enquiries, pricing, media, services, and site settings.
- Enquiry search, status updates, detail modal, phone/email actions, and refresh.
- Pricing edits with non-negative numeric validation.
- Service create, edit, activation, ordering, optional image URL, and confirmed deletion.
- Categorized multi-image upload to the public `kodesk-media` bucket; JPEG/PNG/WebP only, up to 5 MB per image.
- Editable settings rows and a configurable public-website link.
- Contact settings with shared phone, email, WhatsApp number, and a WhatsApp prefilled message.

The public KODESK app requires the same `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`. Its server-side contact endpoint writes enquiries to Supabase; it does not use localStorage. Never place a Supabase `sb_secret_...` key in a `NEXT_PUBLIC_` variable.
