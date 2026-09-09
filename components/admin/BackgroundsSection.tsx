"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Images, Sun } from "lucide-react";
import { createClient } from "@/lib/supabase";
import { useAdminTable } from "@/lib/useAdminTable";
import type { IdleBackground } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import RowControls from "./RowControls";
import Section from "./Section";

export function getBackgroundPublicUrl(storagePath: string): string {
  const supabase = createClient();
  return supabase.storage.from("signage-images").getPublicUrl(storagePath).data
    .publicUrl;
}

async function uploadBackgroundFile(file: File): Promise<string> {
  const supabase = createClient();
  const ext = file.name.split(".").pop() || "jpg";
  const path = `backgrounds/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage
    .from("signage-images")
    .upload(path, file, { cacheControl: "3600", upsert: false });
  if (error) throw error;
  return path;
}

function AddForm({
  onAdd,
}: {
  onAdd: (row: Partial<IdleBackground>) => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const path = await uploadBackgroundFile(file);
      onAdd({
        storage_path: path,
        caption: caption.trim() || null,
        is_active: true,
      });
      setFile(null);
      setCaption("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal mengunggah foto.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 flex flex-col gap-2 rounded-base border-2 border-dashed border-border bg-background p-3"
    >
      <div className="flex flex-col gap-1">
        <label className="text-xs font-heading text-foreground/70">
          Pilih Foto Latar (JPG, PNG, atau WebP)
        </label>
        <input
          type="file"
          accept="image/*"
          required
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="rounded-base border-2 border-border bg-secondary-background p-2 text-sm font-base text-foreground"
        />
      </div>
      <Input
        type="text"
        placeholder="Keterangan / Nama Lokasi (contoh: Lab TRPL 1, Gedung WBI)"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      {error && (
        <p className="rounded-base border-2 border-border bg-destructive px-2 py-1 text-sm font-heading text-destructive-foreground">
          {error}
        </p>
      )}
      <Button type="submit" disabled={uploading}>
        {uploading ? "Mengunggah..." : "Tambah Foto Latar"}
      </Button>
    </form>
  );
}

function Row({
  row,
  onSave,
  controls,
}: {
  row: IdleBackground;
  onSave: (patch: Partial<IdleBackground>) => void;
  controls: React.ReactNode;
}) {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    onSave({
      caption: String(form.get("caption") ?? "").trim() || null,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 border-b-2 border-border py-4 last:border-none"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={getBackgroundPublicUrl(row.storage_path)}
        alt={row.caption ?? ""}
        className="h-36 w-full rounded-base border-2 border-border object-cover"
      />
      <Input
        name="caption"
        defaultValue={row.caption ?? ""}
        placeholder="Keterangan / Nama Lokasi"
      />
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Button type="submit" variant="neutral" size="sm">
          Simpan Keterangan
        </Button>
        {controls}
      </div>
    </form>
  );
}

function BrightnessControl({ previewPhotoUrl }: { previewPhotoUrl?: string }) {
  const [brightness, setBrightness] = useState(85);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("settings")
          .select("*")
          .eq("id", 1)
          .maybeSingle();

        if (!error && data && data.idle_background_brightness != null) {
          setBrightness(data.idle_background_brightness);
        } else {
          const local = localStorage.getItem("idle_bg_brightness");
          if (local) setBrightness(Number(local));
        }
      } catch {
        // graceful fallback
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    setError(null);
    try {
      localStorage.setItem("idle_bg_brightness", String(brightness));
      const supabase = createClient();
      const { error } = await supabase
        .from("settings")
        .update({ idle_background_brightness: brightness })
        .eq("id", 1);

      if (error) {
        setError(
          "Tersimpan di browser lokal. Agar tersimpan di database Supabase, pastikan migrasi SQL '0004_idle_background_brightness.sql' telah dijalankan di dashboard Supabase."
        );
      } else {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menyimpan kecerahan.");
    } finally {
      setSaving(false);
    }
  }

  const PRESETS = [
    { label: "Redup (40%)", value: 40 },
    { label: "Seimbang (70%)", value: 70 },
    { label: "Terang (85%)", value: 85 },
    { label: "Maksimal (100%)", value: 100 },
  ];

  return (
    <div className="mb-4 rounded-base border-2 border-border bg-secondary-background p-4 shadow-shadow">
      <div className="mb-3 flex flex-col gap-2 border-b-2 border-border pb-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="flex items-center gap-2 font-heading text-base text-foreground">
            <Sun size={18} className="text-amber-500" />
            Tingkat Kecerahan Gambar Latar
            <span className="rounded-full border border-main/30 bg-main/10 px-2 py-0.5 font-mono text-xs font-bold text-main">
              {brightness}%
            </span>
          </h3>
          <p className="mt-0.5 text-xs text-foreground/70">
            Atur kecerahan foto latar belakang agar tidak terlalu gelap saat jam siaga aktif. Lapisan grid kotak-kotak kini berada di belakang gambar sehingga foto tampil jernih.
          </p>
        </div>
        <Button
          type="button"
          onClick={handleSave}
          disabled={saving || loading}
          size="sm"
          className="shrink-0"
        >
          {saving ? "Menyimpan..." : saved ? "Tersimpan! ✅" : "Simpan Kecerahan"}
        </Button>
      </div>

      <div className="flex flex-col gap-3">
        {/* Slider input */}
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs font-bold text-foreground/60">20%</span>
          <input
            type="range"
            min="20"
            max="100"
            step="5"
            value={brightness}
            onChange={(e) => setBrightness(Number(e.target.value))}
            className="h-2.5 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-main dark:bg-slate-700"
          />
          <span className="font-mono text-xs font-bold text-foreground/60">100%</span>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-heading text-foreground/70">Preset Cepat:</span>
          {PRESETS.map((p) => (
            <button
              key={p.value}
              type="button"
              onClick={() => setBrightness(p.value)}
              className={`rounded-base border-2 border-border px-2.5 py-1 font-mono text-xs font-bold transition-transform active:scale-95 ${
                brightness === p.value
                  ? "bg-main text-white shadow-sm"
                  : "bg-background text-foreground hover:bg-main/10"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Mini Live Preview */}
        <div className="mt-1 flex flex-col gap-1.5">
          <span className="text-xs font-heading text-foreground/70">Pratinjau Langsung:</span>
          <div className="relative h-24 w-full overflow-hidden rounded-base border-2 border-border bg-[#07090e] sm:h-28">
            {/* Base grid layer */}
            <div className="cyber-grid-bg absolute inset-0 opacity-40" />

            {/* Photo layer with dynamic brightness */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewPhotoUrl || "/logos/wbi.webp"}
              alt="Preview"
              className="absolute inset-0 h-full w-full object-cover transition-all duration-300"
              style={{
                opacity: Math.max(0.15, Math.min(1, brightness / 100)),
                filter: `brightness(${Math.max(40, Math.min(130, brightness))}%) contrast(105%)`,
              }}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />

            {/* Overlay simulation */}
            <div className="absolute inset-0 flex items-center justify-center p-2">
              <div className="rounded-xl border border-white/20 bg-slate-950/60 px-4 py-1.5 text-center shadow-lg backdrop-blur-md">
                <span className="font-mono text-sm font-black text-white">12:30:45</span>
                <span className="block font-mono text-[9px] text-slate-300">Simulasi Jam Siaga</span>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <p className="rounded-base border-2 border-border bg-amber-100 p-2 text-xs text-amber-950">
            ⚠️ {error}
          </p>
        )}
      </div>
    </div>
  );
}

export default function BackgroundsSection({
  alwaysOpen,
}: { alwaysOpen?: boolean } = {}) {
  const { rows, loading, error, add, update, remove, toggleActive, move } =
    useAdminTable<IdleBackground>("idle_backgrounds");

  return (
    <Section
      id="latar"
      title="Foto Latar Layar Siaga"
      icon={<Images size={18} />}
      badge={`${rows.length}`}
      alwaysOpen={alwaysOpen}
    >
      <div className="mb-3 rounded-base border-2 border-border bg-secondary-background p-3 text-xs text-foreground/70">
        <p className="font-heading text-sm text-foreground">
          Foto Latar Layar Siaga (Idle Clock & Quotes)
        </p>
        <p className="mt-1">
          Foto yang diunggah di sini akan diputar bergiliran (dengan efek gerak 3D Ken Burns) di layar siaga saat jam dan kutipan motivasi ditampilkan.
        </p>
        {rows.length === 0 && !loading && (
          <p className="mt-2 font-heading text-foreground/80">
            ℹ️ Belum ada foto yang diunggah. Sistem saat ini menggunakan wallpaper pemandangan default.
          </p>
        )}
      </div>

      <BrightnessControl
        previewPhotoUrl={
          rows.length > 0 ? getBackgroundPublicUrl(rows[0].storage_path) : undefined
        }
      />

      <AddForm onAdd={add} />

      {loading && <p className="text-sm text-foreground/50">Memuat...</p>}
      {error && <p className="text-sm text-destructive">{error}</p>}
      {rows.map((row, i) => (
        <Row
          key={row.id}
          row={row}
          onSave={(patch) => update(row.id, patch)}
          controls={
            <RowControls
              isActive={row.is_active}
              onToggleActive={() => toggleActive(row)}
              onMoveUp={() => move(row, "up")}
              onMoveDown={() => move(row, "down")}
              onDelete={() => remove(row.id)}
              canMoveUp={i > 0}
              canMoveDown={i < rows.length - 1}
              itemLabel="foto latar ini"
            />
          }
        />
      ))}
    </Section>
  );
}
