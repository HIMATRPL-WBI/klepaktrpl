# Perencanaan Transformasi Identitas Proyek: Klepak TRPL

Dokumen ini adalah panduan lengkap (*actionable blueprint & checklist*) untuk mentransformasi proyek hasil *clone* dari **WBI / WBIIC** menjadi versi mandiri **Klepak TRPL** (Teknologi Rekayasa Perangkat Lunak). Setiap tahapan disusun secara berurutan dan dilengkapi kotak centang (*checklist*) agar proses pengerjaan dapat dipantau langkah demi langkah.

---

## 📌 Ringkasan Status Proyek

- **Status Saat Ini**: Fresh clone dari repositori asal (`wbiic/klepak`).
- **Target Identitas**: **Klepak TRPL** (Sistem Informasi Digital Signage Laboratorium / Prodi TRPL).
- **Teknologi**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Supabase (Database, Auth, Realtime, Storage).

---

## 📋 DAFTAR CHECKLIST TAHAPAN LENGKAP (FULL STEPS)

### 🔹 Fase 1: Identifikasi Proyek & Konfigurasi Dasar
Tahap awal untuk melepaskan identitas lama pada konfigurasi dependensi dan lingkungan kerja.

- [x] **1.1. Konfigurasi `package.json` & `package-lock.json`**
  - [x] Ubah field `"name": "klepak"` menjadi `"name": "klepaktrpl"`.
  - [x] Perbarui deskripsi proyek atau metadata paket (bila ada).
  - [x] Jalankan `npm install` singkat untuk sinkronisasi `package-lock.json`.
- [x] **1.2. Pengaturan Variabel Lingkungan (`.env.local`)**
  - [x] Salin template: `cp .env.example .env.local`.
  - [x] Hubungkan `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY` ke project Supabase milik tim TRPL (`dmmadoiimjaijrwsosfr`).
- [ ] **1.3. Konfigurasi Git & Remote Repository**
  - [ ] Tentukan target repositori baru untuk TRPL (GitHub/GitLab).
  - [ ] Jalankan `git remote set-url origin <URL_REPO_TRPL>` agar commit tidak mengarah ke repo lama *(Menunggu URL repo baru)*.

---

### 🔹 Fase 2: Pembersihan & Penggantian Aset Grafis (Branding Visual)
Menghilangkan identitas WBIIC dan mengadopsi logo resmi TRPL berdampingan dengan Politeknik WBI.

- [x] **2.1. Hapus Aset Logo Lama & Pertahankan Logo Institusi**
  - [x] Pertahankan berkas `public/logos/wbi.webp` (Logo Politeknik WBI).
  - [x] Hapus berkas `public/logos/wbiic.webp` (WBI Innovation Center digantikan oleh TRPL).
- [x] **2.2. Tambahkan Aset Logo Baru (TRPL)**
  - [x] Berkas `public/logos/trpl.png` (Logo HIMATRPL) telah diunggah dan aktif.
- [ ] **2.3. Pembaruan Favicon & Ikon Web**
  - [ ] *(Opsional)* Ganti `app/favicon.ico` dengan favicon bertema TRPL atau simbol layar signage.

---

### 🔹 Fase 3: Pembaruan Tampilan Publik (`/display`)
Menyesuaikan halaman yang tampil di TV Kiosk agar sepenuhnya menampilkan identitas TRPL.

- [x] **3.1. Refactor Komponen Jam & Logo Siaga (`components/display/IdleClock.tsx`)**
  - [x] Ganti pemanggilan gambar logo:
    - Menampilkan `wbi.webp` (Politeknik WBI) dan `trpl.png` (TRPL) berdampingan secara rapi dan harmonis dengan divider.
    - Atribut alt: `alt="Politeknik WBI"` dan `alt="TRPL"`.
  - [x] Hapus class CSS rasio lama WBIIC (`aspect-[974/270]`) dan komentar padding canvas lama.
- [x] **3.2. Pembaruan Channel Realtime (`app/display/page.tsx`)**
  - [x] Ubah nama channel langganan realtime dari `supabase.channel("klepak-display")` menjadi `supabase.channel("klepaktrpl-display")`.
- [x] **3.3. Penyesuaian Komentar & Styling Tampilan**
  - [x] Komponen display (`PosterSlide.tsx`, `AnnouncementsList.tsx`, `EmergencyOverlay.tsx`) telah diperiksa dan kelas styling berjalan serasi.

---

### 🔹 Fase 4: Pembaruan Metadata & Antarmuka Admin (`/admin`)
Memastikan seluruh dashboard admin dan tab browser mencerminkan identitas Klepak TRPL.

- [x] **4.1. Metadata Global (`app/layout.tsx`)**
  - [x] Ubah metadata aplikasi:
    - `title: "Klepak TRPL — Digital Signage"`
    - `description: "Digital Signage Laboratorium & Program Studi Teknologi Rekayasa Perangkat Lunak"`
- [x] **4.2. Halaman Login Admin (`app/admin/login/page.tsx`)**
  - [x] Ubah judul form login: `<h1>Klepak TRPL</h1>`.
  - [x] Perbarui teks subjudul: `Portal Admin Signage TRPL`.
- [x] **4.3. Layout Dashboard Admin (`app/admin/(dashboard)/layout.tsx`)**
  - [x] Ubah header navigasi: `<h1 ...>Klepak TRPL Admin</h1>`.

---

### 🔹 Fase 5: Penyesuaian Konten Tematik Khusus TRPL
Mengganti konten bernuansa bisnis umum dengan konten sains komputasi, rekayasa perangkat lunak, dan teknologi.

- [x] **5.1. Pembaruan Kutipan Layar Siaga (`lib/idleQuotes.ts`)**
  - [x] Tambahkan kutipan tokoh-tokoh *Computer Science & Software Engineering*:
    - **Linus Torvalds**: *"Talk is cheap. Show me the code."*
    - **Grace Hopper**: *"The most dangerous phrase in the language is: We've always done it this way."*
    - **Martin Fowler**: *"Any fool can write code that a computer can understand. Good programmers write code that humans can understand."*
    - **Alan Turing**: *"Sometimes it is the people no one can imagine anything of who do the things no one can imagine."*
    - **Dennis Ritchie**: *"UNIX is basically a simple operating system, but you have to be a genius to understand the simplicity."*
    - **Ada Lovelace**, **Donald Knuth**, **Bjarne Stroustrup**, **Edsger W. Dijkstra**, **Harold Abelson**, **Kent Beck**, dll.
  - [x] Bersihkan atau filter kutipan yang murni bernuansa bisnis korporat yang kurang relevan dengan prodi TRPL.
- [x] **5.2. Format Contoh Pengumuman & Jadwal**
  - [x] Buat template/seeding data awal khusus TRPL di `supabase/seed_trpl.sql` (praktikum lab, workshop Git, seminar prodi, tautan modul TRPL).

---

### 🔹 Fase 6: Dokumentasi & Skema Basis Data
Membuat dokumentasi yang profesional dan relevan untuk mahasiswa, dosen, atau pengelola lab TRPL.

- [x] **6.1. Rombak `README.md`**
  - [x] Ganti judul utama menjadi `# Klepak TRPL — Digital Signage`.
  - [x] Perbarui deskripsi proyek untuk peruntukan Program Studi Teknologi Rekayasa Perangkat Lunak.
  - [x] Tuliskan panduan setup dari awal:
    - Panduan koneksi Supabase & eksekusi `schema.sql`.
    - Konfigurasi bucket Storage `signage-images`.
    - Pembuatan akun admin TRPL.
    - Panduan menjalankan secara lokal (`npm run dev`) dan deployment (Vercel / Kiosk Android TV).
    - Panduan seeding data awal TRPL (`seed_trpl.sql`).
- [x] **6.2. Skema Supabase (`supabase/schema.sql`)**
  - [x] Perbarui header komentar SQL dari `-- Klepak digital signage` menjadi `-- Klepak TRPL digital signage`.
  - [x] Pastikan script SQL siap dijalankan pada instance Supabase baru milik tim TRPL.

---

### 🔹 Fase 7: (Peningkatan Fitur) Dynamic Branding di Admin Settings
*(Fitur Nilai Tambah)*: Agar identitas dan logo tidak perlu di-hardcode lagi di kemudian hari.

- [x] **7.1. Ekstensi Skema Database (`schema.sql`) & Tipe TypeScript (`types.ts`)**
  - [x] Tambahkan kolom pada tabel `settings`:
    - `display_title text default 'Klepak TRPL'`
    - `display_logo_url text`
  - [x] Tambahkan `display_title` dan `display_logo_url` pada interface `Settings` di `lib/types.ts`.
- [x] **7.2. Form Pengaturan di Dashboard (`components/admin/SettingsSection.tsx`)**
  - [x] Tambahkan opsi input judul dan upload logo kustom instansi langsung dari browser.
  - [x] Simpan URL logo ke bucket `signage-images` dan tabel `settings` dengan tombol hapus/reset.
- [x] **7.3. Integrasi Dinamis di `IdleClock.tsx` & `Slideshow.tsx`**
  - [x] Alirkan `display_logo_url` dari database `settings` menuju `Slideshow` dan `IdleClock`.
  - [x] Jika `display_logo_url` ada, tampilkan logo kustom; jika kosong, fallback otomatis ke `/logos/trpl.png`.

---

### 🔹 Fase 8: Pengujian & Validasi Menyeluruh (Verification & Testing)
Memastikan tidak ada error sintaks, aset yang hilang, ataupun jejak lama yang tertinggal.

- [x] **8.1. Pemindaian Kata Kunci Lama (Zero Residual WBIIC Search)**
  - [x] Seluruh codebase bebas dari kata kunci `wbiic` (0 matches di kode sumber).
- [x] **8.2. Linting & Type Checking**
  - [x] Type check lolos sempurna (`npx tsc --noEmit` exit code 0).
  - [x] Next.js linting terintegrasi lolos tanpa error.
- [x] **8.3. Build Uji Produksi**
  - [x] `npm run build` berhasil mengompilasi dan mengoptimasi seluruh 14 static pages & middleware tanpa error.
- [x] **8.4. Verifikasi Tampilan Visual & Fungsional**
  - [x] Rute `/display`, `/admin`, `/admin/login`, dan sub-halaman dashboard terverifikasi siap dijalankan.

---

### 🔹 Fase 9: Manajemen Foto Latar Siaga via Supabase & Panel Admin
Memungkinkan admin mengunggah, mengurutkan, menonaktifkan, dan menghapus foto latar siaga (Idle & Quotes) dari panel admin ke Supabase Storage & Database dengan sinkronisasi Realtime.

- [x] **9.1. Skema Database & Storage**
  - [x] Tabel `idle_backgrounds` dibuat di `supabase/schema.sql` dan `supabase/migration_idle_backgrounds.sql`.
  - [x] RLS policies dikonfigurasi (anon read active, authenticated CRUD).
  - [x] Realtime publication diaktifkan untuk `idle_backgrounds`.
- [x] **9.2. Panel Admin Foto Latar**
  - [x] Komponen `BackgroundsSection.tsx` dibuat dengan upload gambar, preview thumbnail, keterangan, reordering, dan toggle aktif.
  - [x] Halaman `/admin/latar` dibuat dan didaftarkan ke navigasi bar admin (`layout.tsx`) dan kartu ringkasan (`page.tsx`).
  - [x] Banner tautan cepat ditambahkan ke `/admin/pengaturan`.
- [x] **9.3. Integrasi Layar Display (`/display`)**
  - [x] `app/display/page.tsx` mengambil foto aktif dari Supabase dengan subscription Realtime.
  - [x] `Slideshow.tsx` dan `IdleClock.tsx` memutar foto database dengan rotasi acak/berkala dan efek 3D Ken Burns.
  - [x] Fallback mulus jika tabel kosong agar layar tidak pernah blank.

---

### 🔹 Fase 10: Tema Programming Futuristik & Perbaikan Layout Error
Memperbaiki error/peringatan tipe pada `layout.tsx` dan mentransformasikan layar siaga (`/display`) menjadi tema developer/programming futuristik dengan logo-logo teknologi melayang, partikel sintaks kode, cyber grid, dan kartu kutipan bergaya IDE code editor.

- [x] **10.1. Perbaikan Layout Error di VS Code & Runtime**
  - [x] Logika logout client-side dipisahkan ke komponen client `AdminHeader.tsx`.
  - [x] `app/admin/(dashboard)/layout.tsx` diubah menjadi Server Component standar Next.js 14 dengan tipe `React.ReactNode` dan metadata resmi.
  - [x] Atribut `suppressHydrationWarning` ditambahkan ke `<html>` dan `<body>` di `app/layout.tsx`.
- [x] **10.2. Koleksi Logo & Komponen Animasi Programming**
  - [x] File `lib/techLogos.tsx` dibuat dengan 14 logo SVG resmi teknologi (TypeScript, Python, React, Go, Rust, Java, C++, PHP, Docker, Git, PostgreSQL, Tailwind, JavaScript, Next.js).
  - [x] File `components/display/FloatingTechBackground.tsx` dirancang ulang dengan pendekatan Linear/Vercel: ambient subtle watermarks dengan micro-motion tenang (bukan kartu tebal/lebay) dan sleek tech stack marquee ribbon di bagian bawah layar.
  - [x] Keyframe animasi floating diperhalus (`tech-float-subtle-1`, `tech-float-subtle-2`, `tech-marquee`) di `app/globals.css`.
- [x] **10.3. Redesain Layar Siaga TRPL (`IdleClock.tsx`)**
  - [x] Jam digital didesain ulang dengan badge status `🟢 TRPL KIOSK • LIVE`.
  - [x] Kartu kutipan dirombak menjadi **IDE / Code Editor Window** dengan traffic light dots (merah, kuning, hijau), line numbers (`01`, `02`), dan author signature developer.
  - [x] Header logo Politeknik WBI & HIMATRPL dibungkus dalam glassmorphic cyber pill.

---

## 🚀 Log Progres Pengerjaan

Gunakan tabel ini untuk mencatat tanggal dan kontributor saat setiap fase selesai dikerjakan:

| Fase | Deskripsi | Status | Tanggal Selesai | Catatan |
|---|---|---|---|---|
| **Fase 1** | Identifikasi & Konfigurasi Dasar | Selesai | 2026-09-08 | package.json & lock selesai, .env.local terhubung ke Supabase baru |
| **Fase 2** | Pembersihan & Aset Visual TRPL | Selesai | 2026-09-08 | wbiic.webp dihapus, wbi.webp dipertahankan, trpl.png (HIMATRPL) aktif |
| **Fase 3** | Pembaruan Display (`/display`) | Selesai | 2026-09-08 | Logo WBI + TRPL aktif di IdleClock, channel realtime diubah ke klepaktrpl-display |
| **Fase 4** | Metadata & Admin (`/admin`) | Selesai | 2026-09-08 | layout.tsx (title & desc), login/page.tsx, dan layout header diubah ke Klepak TRPL |
| **Fase 5** | Konten Tematik Quotes TRPL | Selesai | 2026-09-08 | idleQuotes.ts diperbarui dengan Software Engineering quotes, seed_trpl.sql dibuat |
| **Fase 6** | Dokumentasi & Skema DB | Selesai | 2026-09-08 | README.md dirombak total untuk Klepak TRPL, header schema.sql diperbarui |
| **Fase 7** | Dynamic Branding (Opsional) | Selesai | 2026-09-08 | Upload logo kustom & judul di Admin Settings, fallback cerdas ke logo TRPL default |
| **Fase 8** | Pengujian & Build Final | Selesai | 2026-09-08 | tsc 0 error, build Next.js 14 sukses (14/14 static pages), 0 residual wbiic |
| **Fase 9** | Foto Latar Siaga via Supabase | Selesai | 2026-09-08 | Upload/kelola foto latar via panel admin (/admin/latar) & realtime ke /display |
| **Fase 10** | Tema Programming & Fix Layout | Selesai | 2026-09-09 | Floating tech logos di /display, IDE quote window, layout.tsx server component |
