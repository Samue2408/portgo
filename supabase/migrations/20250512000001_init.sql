-- PortGo MVP schema (Supabase / Postgres)
-- Run in Supabase SQL editor or via CLI migrations.

-- Extensions
create extension if not exists "pgcrypto";

-- Profiles (1:1 with auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  category text,
  slug text not null unique,
  order_index int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.lessons (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses (id) on delete cascade,
  title text not null,
  slug text not null,
  content_json jsonb not null default '{}'::jsonb,
  order_index int not null default 0,
  unique (course_id, slug)
);

create table if not exists public.progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  course_id uuid not null references public.courses (id) on delete cascade,
  progress_percentage int not null default 0 check (
    progress_percentage between 0 and 100
  ),
  updated_at timestamptz not null default now(),
  unique (user_id, course_id)
);

create table if not exists public.quiz_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  quiz_id text not null,
  course_id uuid references public.courses (id) on delete set null,
  score int not null,
  max_score int not null,
  completed_at timestamptz not null default now()
);

create table if not exists public.shipments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  tracking_code text not null,
  origin text,
  destination text,
  status text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- updated_at trigger helper
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists progress_updated_at on public.progress;
create trigger progress_updated_at
before update on public.progress
for each row execute function public.set_updated_at();

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1))
  );
  return new;
end;
$$ language plpgsql security definer set search_path = public;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- RLS
alter table public.profiles enable row level security;
alter table public.courses enable row level security;
alter table public.lessons enable row level security;
alter table public.progress enable row level security;
alter table public.quiz_results enable row level security;
alter table public.shipments enable row level security;

-- Profiles: own row
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

-- Courses & lessons: public read
create policy "courses_read_all" on public.courses for select using (true);
create policy "lessons_read_all" on public.lessons for select using (true);

-- Progress
create policy "progress_select_own" on public.progress
  for select using (auth.uid() = user_id);
create policy "progress_insert_own" on public.progress
  for insert with check (auth.uid() = user_id);
create policy "progress_update_own" on public.progress
  for update using (auth.uid() = user_id);

-- Quiz results
create policy "quiz_results_select_own" on public.quiz_results
  for select using (auth.uid() = user_id);
create policy "quiz_results_insert_own" on public.quiz_results
  for insert with check (auth.uid() = user_id);

-- Shipments
create policy "shipments_select_own" on public.shipments
  for select using (auth.uid() = user_id);
create policy "shipments_insert_own" on public.shipments
  for insert with check (auth.uid() = user_id);
create policy "shipments_update_own" on public.shipments
  for update using (auth.uid() = user_id);
create policy "shipments_delete_own" on public.shipments
  for delete using (auth.uid() = user_id);

-- Seed courses (Spanish)
insert into public.courses (title, description, category, slug, order_index)
values
  (
    'Fundamentos de importación',
    'Conceptos clave para entender cómo entra la mercancía a tu país: incoterms, documentos y riesgos básicos.',
    'Comercio exterior',
    'fundamentos-importacion',
    1
  ),
  (
    'Operaciones portuarias',
    'Qué sucede en el muelle: recepción de contenedores, maniobras y seguridad.',
    'Puertos',
    'operaciones-portuarias',
    2
  ),
  (
    'Contenedores y rutas marítimas',
    'Tipos de contenedor, estiba y cómo se planifican rutas comerciales simuladas.',
    'Transporte',
    'contenedores-rutas',
    3
  )
on conflict (slug) do nothing;

-- Seed lessons
insert into public.lessons (course_id, title, slug, order_index, content_json)
select c.id, 'Introducción al proceso de importación', 'intro', 1,
  '{"summary":"Visión general del flujo desde el proveedor hasta tu almacén."}'::jsonb
from public.courses c where c.slug = 'fundamentos-importacion'
on conflict (course_id, slug) do nothing;

insert into public.lessons (course_id, title, slug, order_index, content_json)
select c.id, 'Documentos y checklist', 'documentos', 2,
  '{"summary":"Factura comercial, packing list y BL: para qué sirven en la práctica."}'::jsonb
from public.courses c where c.slug = 'fundamentos-importacion'
on conflict (course_id, slug) do nothing;

insert into public.lessons (course_id, title, slug, order_index, content_json)
select c.id, 'Recepción en puerto', 'recepcion', 1,
  '{"summary":"Gate-in, verificación y movimientos internos en terminal."}'::jsonb
from public.courses c where c.slug = 'operaciones-portuarias'
on conflict (course_id, slug) do nothing;

insert into public.lessons (course_id, title, slug, order_index, content_json)
select c.id, 'Tipos de contenedor', 'tipos', 1,
  '{"summary":"Dry, reefer, open top: cuándo conviene cada uno."}'::jsonb
from public.courses c where c.slug = 'contenedores-rutas'
on conflict (course_id, slug) do nothing;

insert into public.lessons (course_id, title, slug, order_index, content_json)
select c.id, 'Rutas y tiempos de tránsito', 'rutas', 2,
  '{"summary":"Factores que afectan la duración del viaje marítimo."}'::jsonb
from public.courses c where c.slug = 'contenedores-rutas'
on conflict (course_id, slug) do nothing;
