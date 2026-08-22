# KODESK Public Website

The customer-facing KODESK coworking website and its separate Supabase-backed admin application live in this repository.

## Supabase production setup

1. Create a Supabase project and run [202608210001_kodesk_cms.sql](supabase/migrations/202608210001_kodesk_cms.sql) in its SQL editor.
2. Copy `.env.example` to `.env.local` and add only your public Supabase URL and anon key. `SUPABASE_SERVICE_ROLE_KEY` is server-only and must never use the `NEXT_PUBLIC_` prefix.
3. Configure the same public Supabase URL and anon key in the separate `admin/` deployment.
4. Create the first administrator manually in Supabase Auth and add its ID/email to `public.admin_profiles` as an active `admin`.

The public contact form writes enquiries to Supabase and displays a truthful error if the database is unavailable. Public pricing, active hero media, active gallery media, footer contact data, and social settings retain safe static fallbacks when no Supabase data is available.

See [admin/README.md](admin/README.md) for separate admin-app setup and deployment.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
