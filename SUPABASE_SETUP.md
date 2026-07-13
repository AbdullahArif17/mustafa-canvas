# Supabase Setup

1. Create a Supabase project.

2. Open the Supabase SQL editor and run:

```sql
-- file: supabase/schema.sql
create extension if not exists pgcrypto;

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('net', 'plastic', 'other')),
  slug text not null,
  title text not null,
  description text not null,
  color text,
  company text,
  length_feet numeric,
  width_feet numeric,
  weight text,
  size text,
  images jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.products
  drop constraint if exists products_kind_check;

alter table public.products
  add constraint products_kind_check check (kind in ('net', 'plastic', 'other'));

alter table public.products
  drop constraint if exists products_net_fields;

alter table public.products
  drop constraint if exists products_plastic_fields;

alter table public.products
  alter column color drop not null;

alter table public.products
  alter column company drop not null;

alter table public.products
  add column if not exists slug text;

update public.products
set slug = lower(regexp_replace(coalesce(nullif(title, ''), id::text), '[^a-zA-Z0-9]+', '-', 'g'))
where slug is null or slug = '';

alter table public.products
  alter column slug set not null;

alter table public.products
  add column if not exists images jsonb not null default '[]'::jsonb;

alter table public.products enable row level security;

create index if not exists products_created_at_idx
  on public.products (created_at desc);

create unique index if not exists products_slug_idx
  on public.products (slug);

insert into storage.buckets (id, name, public, file_size_limit)
values ('product-images', 'product-images', true, 52428800)
on conflict (id) do update
set public = true,
    file_size_limit = 52428800;
```

3. Add these environment variables locally and in Vercel:

```bash
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
ADMIN_PASSWORD="choose-a-strong-admin-password"
CRON_SECRET="use-a-random-secret-with-at-least-16-characters"
```

4. Add the same `CRON_SECRET` to the Production environment in Vercel and
redeploy. Vercel automatically sends it as a Bearer token when invoking the
configured cron route.

5. Restart the dev server after adding env vars.

The site uses server API routes for product writes, updates, and deletes, so the service role key stays on the server. Product image files upload through Supabase signed upload URLs and are capped at 50 MB by both the app and the storage bucket.

The first entry in each product's `images` array is its main image and appears on public product cards. Any remaining entries are optional gallery images shown only on that product's details page.

The `/admin` route uses `ADMIN_PASSWORD` to create a signed, HTTP-only session that expires after 30 minutes. The password is never stored in browser storage or sent with product requests.

The Vercel cron configuration runs `/api/cron/supabase-health` once per day at
08:00 UTC. The protected route makes one minimal, read-only query so the Free
Supabase project receives regular database activity. It does not expose product
data and cannot be called without `CRON_SECRET`.

Regular activity reduces the chance of a Free project being classified as
inactive, but Supabase only guarantees that paid projects will not be paused.
See the [Supabase pausing documentation](https://supabase.com/docs/guides/platform/free-project-pausing)
and [Vercel cron documentation](https://vercel.com/docs/cron-jobs/manage-cron-jobs).

Never expose `SUPABASE_SERVICE_ROLE_KEY` in browser code or public client variables.
