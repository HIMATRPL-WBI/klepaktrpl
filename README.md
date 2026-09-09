# Klepak TRPL — Digital Signage

Sistem informasi *Digital Signage* mandiri untuk **Program Studi Teknologi Rekayasa Perangkat Lunak (TRPL)** dan laboratorium komputasi Politeknik WBI.

Aplikasi ini terdiri dari dua antarmuka utama:

- **`/display`** — Layar publik *full-screen kiosk*, dioptimalkan untuk TV atau Android TV box. Menampilkan slideshow rotasi pengumuman prodi, jadwal praktikum/sidang/workshop, poster acara, tautan QR, video latar, serta jam siaga (*Idle Screen*) beranimasi dengan logo resmi Politeknik WBI & HIMATRPL serta kutipan seputar *Software Engineering*.
- **`/admin`** — Panel manajemen konten terproteksi (CRUD Pengumuman, Poster, Jadwal, QR, Video, Override Pengumuman Darurat, dan Pengaturan Sistem).

Setiap konten memiliki siklus aktif (`starts_at` / `ends_at`) otomatis, sehingga konten yang telah kadaluarsa akan hilang dengan sendirinya tanpa perlu dinonaktifkan manual.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, React 18, TypeScript)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & Lucide React (Desain Neo-brutalism)
- **Database & Auth**: [Supabase](https://supabase.com/) (PostgreSQL, Row Level Security, Realtime Pub/Sub, Storage Bucket)
- **Deployment**: Vercel / Kiosk Android TV

---

## 🚀 Panduan Memulai Cepat (Setup Guide)

### 1. Jalankan Skema SQL di Supabase

1. Buat proyek baru di [Supabase Dashboard](https://database.new).
2. Buka menu **SQL Editor** pada proyek Anda.
3. Salin dan jalankan seluruh isi berkas [`supabase/schema.sql`](./supabase/schema.sql).

Skrip ini akan otomatis membuat:
- 6 tabel konten (`announcements`, `posters`, `schedule_items`, `qr_links`, `videos`, `emergency_override`) dan 1 tabel singleton `settings`.
- Kebijakan **Row Level Security (RLS)** untuk proteksi data.
- **Supabase Realtime** untuk auto-update layar display tanpa perlu refresh browser.
- Storage bucket publik `signage-images` beserta seluruh policies upload & aksesnya.

### 2. *(Opsional)* Terapkan Data Awal TRPL (Seed Data)

Untuk mengisi data awal berupa jadwal lab dan pengumuman TRPL:
1. Buka kembali **SQL Editor** di dashboard Supabase.
2. Salin dan jalankan isi berkas [`supabase/seed_trpl.sql`](./supabase/seed_trpl.sql).

### 3. Buat Akun Admin

Klepak TRPL menggunakan sistem single-admin via Supabase Auth:
1. Di dashboard Supabase, buka menu **Authentication** → **Users** → **Add user**.
2. Masukkan email dan password admin, lalu centang/konfirmasi user.
3. Akun ini yang digunakan untuk login di `/admin/login`.

### 4. Konfigurasi Variabel Lingkungan (`.env.local`)

Salin template variabel lingkungan:

```bash
cp .env.example .env.local
```

Isi kredensial dari **Project Settings → API** di dashboard Supabase Anda:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
```

> [!CAUTION]
> Jangan pernah memasukkan `service_role key` ke variabel lingkungan publik atau file client-side. Cukup gunakan `anon` key karena otorisasi sudah dijamin oleh RLS.

### 5. Jalankan Secara Lokal

```bash
npm install
npm run dev
```

- Buka `http://localhost:3000/display` untuk melihat tampilan layar signage.
- Buka `http://localhost:3000/admin` untuk masuk ke panel admin (akan diarahkan ke `/admin/login`).

---

## 🖥️ Struktur Direktori

```
app/
  layout.tsx                  Metadata global & konfigurasi font
  page.tsx                    Redirect otomatis ke /display
  display/page.tsx            Halaman publik signage (realtime listener)
  admin/
    login/page.tsx            Halaman autentikasi admin
    (dashboard)/layout.tsx    Header & navigasi dashboard admin
    (dashboard)/page.tsx      Ringkasan dashboard
    (dashboard)/pengumuman/   Manajemen pengumuman
    (dashboard)/poster/       Manajemen poster slide
    (dashboard)/jadwal/       Manajemen jadwal harian lab/prodi
    (dashboard)/qr/           Manajemen tautan QR code
    (dashboard)/video/        Manajemen video slide
    (dashboard)/pengaturan/   Pengaturan durasi & media latar
components/
  display/                    Komponen display (IdleClock, Slideshow, ScheduleTable, dll.)
  admin/                      Komponen form admin & EmergencyBanner
lib/
  supabase.ts                 Supabase browser client
  supabase-server.ts          Supabase server client (SSR)
  idleQuotes.ts               Kumpulan kutipan inspiratif Software Engineering
  types.ts                    TypeScript interface tabel database
supabase/
  schema.sql                  Skema lengkap DDL, RLS, Realtime & Storage
  seed_trpl.sql               Template data awal TRPL
```

---

## 🌐 Panduan Deployment

1. **Deploy Web App ke Vercel**:
   - Push repository ini ke GitHub / GitLab.
   - Buat project baru di Vercel dan hubungkan repository ini.
   - Tambahkan variabel `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY` pada menu **Settings → Environment Variables**.
   - Deploy.

2. **Setup di TV Kiosk / Android TV Box**:
   - Pasang browser kiosk (misal *Fully Kiosk Browser* atau browser bawaan TV).
   - Masukkan URL aplikasi: `https://your-app.vercel.app/display`.
   - Aktifkan mode *Kiosk / Auto-start on boot* agar layar otomatis berjalan saat TV dinyalakan.

---

## 📄 Lisensi & Kontribusi

Dikembangkan dan dipelihara untuk lingkungan **Teknologi Rekayasa Perangkat Lunak (TRPL)** Politeknik WBI.
