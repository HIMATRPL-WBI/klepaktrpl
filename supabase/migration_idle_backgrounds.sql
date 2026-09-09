-- ============================================================================
-- Klepak TRPL - Migrasi Tabel Foto Latar Siaga (idle_backgrounds)
-- Jalankan skrip ini di Supabase SQL Editor (Project > SQL Editor)
-- ============================================================================

-- 1. Buat tabel idle_backgrounds jika belum ada
create table if not exists idle_backgrounds (
  id           uuid primary key default gen_random_uuid(),
  storage_path text not null,
  caption      text,
  sort_order   integer not null default 0,
  is_active    boolean not null default true,
  created_at   timestamptz not null default now()
);

-- 2. Aktifkan Row Level Security (RLS)
alter table idle_backgrounds enable row level security;

-- 3. Kebijakan akses untuk publik (anon): hanya bisa melihat foto aktif
drop policy if exists "idle_backgrounds_public_read_live" on idle_backgrounds;
create policy "idle_backgrounds_public_read_live" on idle_backgrounds
  for select to anon
  using (is_active = true);

-- 4. Kebijakan akses untuk admin (authenticated): akses penuh (CRUD)
drop policy if exists "idle_backgrounds_admin_select" on idle_backgrounds;
create policy "idle_backgrounds_admin_select" on idle_backgrounds
  for select to authenticated using (true);

drop policy if exists "idle_backgrounds_admin_insert" on idle_backgrounds;
create policy "idle_backgrounds_admin_insert" on idle_backgrounds
  for insert to authenticated with check (true);

drop policy if exists "idle_backgrounds_admin_update" on idle_backgrounds;
create policy "idle_backgrounds_admin_update" on idle_backgrounds
  for update to authenticated using (true) with check (true);

drop policy if exists "idle_backgrounds_admin_delete" on idle_backgrounds;
create policy "idle_backgrounds_admin_delete" on idle_backgrounds
  for delete to authenticated using (true);

-- 5. Daftarkan tabel ke publikasi Realtime Supabase
do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'idle_backgrounds'
  ) then
    alter publication supabase_realtime add table idle_backgrounds;
  end if;
end $$;
