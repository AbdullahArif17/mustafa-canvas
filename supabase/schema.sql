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
