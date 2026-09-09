-- ============================================================================
-- Klepak TRPL — Data Awal / Seed Data Contoh Khusus Prodi TRPL (Opsional)
-- Jalankan di SQL Editor Supabase setelah schema.sql diterapkan.
-- ============================================================================

-- 1. Pengumuman Info Hari Ini
insert into announcements (text, priority, starts_at, ends_at, sort_order, is_active)
values
  ('Selamat datang di Laboratorium Teknologi Rekayasa Perangkat Lunak (TRPL).', 'normal', now(), now() + interval '30 days', 0, true),
  ('Praktikum Rekayasa Perangkat Lunak Lanjut sesi siang dimulai tepat waktu di Lab Komputer.', 'penting', now(), now() + interval '7 days', 1, true),
  ('Gunakan selalu etika laboratorium komputasi: jaga kebersihan dan matikan perangkat setelah digunakan.', 'normal', now(), now() + interval '30 days', 2, true);

-- 2. Contoh Jadwal Hari Ini (otomatis menggunakan tanggal hari ini)
insert into schedule_items (event_date, start_time, end_time, title, location, pic, sort_order, is_active)
values
  (current_date, '08:00', '10:30', 'Praktikum Pemrograman Berorientasi Objek', 'Lab RPL 1', 'Dosen Pengampu', 0, true),
  (current_date, '10:45', '12:15', 'Workshop Git & Software Versioning', 'Ruang Seminar', 'HIMATRPL', 1, true),
  (current_date, '13:30', '16:00', 'Bimbingan Proyek Perangkat Lunak Mandiri', 'Lab RPL 2', 'Tim Asisten Lab', 2, true);

-- 3. Tautan QR Code Contoh
insert into qr_links (title, url, starts_at, ends_at, sort_order, is_active)
values
  ('Modul Praktikum & Repositori TRPL', 'https://github.com', now(), now() + interval '60 days', 0, true),
  ('Presensi Kegiatan & Lab TRPL', 'https://trpl.campus.id', now(), now() + interval '60 days', 1, true);
