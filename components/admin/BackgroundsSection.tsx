"use client";

import { useState, type FormEvent } from "react";
import { Images } from "lucide-react";
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
