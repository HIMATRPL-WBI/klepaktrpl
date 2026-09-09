"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import { Images, Settings as SettingsIcon } from "lucide-react";
import { createClient } from "@/lib/supabase";
import type { Settings } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Section from "./Section";

async function uploadIdleAudioFile(file: File): Promise<string> {
  const supabase = createClient();
  const ext = file.name.split(".").pop() || "mp3";
  const path = `idle-audio/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage
    .from("signage-images")
    .upload(path, file, { cacheControl: "3600", upsert: false });
  if (error) throw error;
  return supabase.storage.from("signage-images").getPublicUrl(path).data
    .publicUrl;
}

async function uploadLogoFile(file: File): Promise<string> {
  const supabase = createClient();
  const ext = file.name.split(".").pop() || "png";
  const path = `branding/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage
    .from("signage-images")
    .upload(path, file, { cacheControl: "3600", upsert: false });
  if (error) throw error;
  return supabase.storage.from("signage-images").getPublicUrl(path).data
    .publicUrl;
}

export default function SettingsSection({
  alwaysOpen,
}: { alwaysOpen?: boolean } = {}) {
  const supabase = useMemo(() => createClient(), []);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [seconds, setSeconds] = useState("8");
  const [idleYoutubeUrl, setIdleYoutubeUrl] = useState("");
  const [idleAudioUrl, setIdleAudioUrl] = useState("");
  const [idleAudioPlaying, setIdleAudioPlaying] = useState(true);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [displayTitle, setDisplayTitle] = useState("Klepak TRPL");
  const [displayLogoUrl, setDisplayLogoUrl] = useState("");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [idleBrightness, setIdleBrightness] = useState("85");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("settings")
        .select("*")
        .eq("id", 1)
        .maybeSingle();
      if (data) {
        setSettings(data);
        setSeconds(String(data.poster_default_seconds));
        setIdleYoutubeUrl(data.idle_youtube_url ?? "");
        setIdleAudioUrl(data.idle_audio_url ?? "");
        setIdleAudioPlaying(data.idle_audio_playing ?? true);
        setDisplayTitle(data.display_title ?? "Klepak TRPL");
        setDisplayLogoUrl(data.display_logo_url ?? "");
        setIdleBrightness(String(data.idle_background_brightness ?? 85));
      }
    }
    load();
  }, [supabase]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    setError(null);
    try {
      const audioUrl = audioFile
        ? await uploadIdleAudioFile(audioFile)
        : idleAudioUrl.trim() || null;

      const logoUrl = logoFile
        ? await uploadLogoFile(logoFile)
        : displayLogoUrl.trim() || null;

      await supabase
        .from("settings")
        .update({
          poster_default_seconds: Number(seconds),
          idle_youtube_url: idleYoutubeUrl.trim() || null,
          idle_audio_url: audioUrl,
          display_title: displayTitle.trim() || "Klepak TRPL",
          display_logo_url: logoUrl,
          idle_background_brightness: Number(idleBrightness),
        })
        .eq("id", 1);

      setIdleAudioUrl(audioUrl ?? "");
      setDisplayLogoUrl(logoUrl ?? "");
      setAudioFile(null);
      setLogoFile(null);
      setSaved(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menyimpan.");
    } finally {
      setSaving(false);
    }
  }

  async function handleRemoveLogo() {
    setSaving(true);
    setSaved(false);
    setError(null);
    try {
      await supabase
        .from("settings")
        .update({ display_logo_url: null })
        .eq("id", 1);
      setDisplayLogoUrl("");
      setLogoFile(null);
      setSaved(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menghapus logo.");
    } finally {
      setSaving(false);
    }
  }

  async function handleToggleAudioPlaying() {
    const next = !idleAudioPlaying;
    setIdleAudioPlaying(next);
    setError(null);
    try {
      await supabase
        .from("settings")
        .update({ idle_audio_playing: next })
        .eq("id", 1);
    } catch (err) {
      setIdleAudioPlaying(!next);
      setError(err instanceof Error ? err.message : "Gagal mengubah.");
    }
  }

  async function handleRemoveAudio() {
    setSaving(true);
    setSaved(false);
    setError(null);
    try {
      await supabase
        .from("settings")
        .update({ idle_audio_url: null })
        .eq("id", 1);
      setIdleAudioUrl("");
      setAudioFile(null);
      setSaved(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menghapus.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Section
      id="pengaturan"
      title="Pengaturan"
      icon={<SettingsIcon size={18} />}
      alwaysOpen={alwaysOpen}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <Label>Durasi tampil poster default (detik)</Label>
        <Input
          type="number"
          min={1}
          value={seconds}
          onChange={(e) => {
            setSeconds(e.target.value);
            setSaved(false);
          }}
        />

        <div className="mt-3 flex flex-col gap-2 rounded-base border-2 border-border bg-secondary-background p-3">
          <Label className="font-heading text-sm text-foreground">
            Branding & Logo Kustom Display
          </Label>
          <p className="text-xs text-foreground/60">
            Secara default, layar menampilkan logo Politeknik WBI & HIMATRPL. Anda dapat mengganti logo TRPL dengan logo kustom (misal: logo acara/seminar/sponsor).
          </p>

          <Label className="mt-1">Judul Tampilan Display</Label>
          <Input
            type="text"
            placeholder="Klepak TRPL"
            value={displayTitle}
            onChange={(e) => {
              setDisplayTitle(e.target.value);
              setSaved(false);
            }}
          />

          <Label className="mt-1">Unggah Logo Kustom (opsional)</Label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              setLogoFile(e.target.files?.[0] ?? null);
              setSaved(false);
            }}
            className="rounded-base border-2 border-border bg-background p-2 text-sm font-base text-foreground"
          />

          {(displayLogoUrl || logoFile) && (
            <div className="mt-1 flex items-center justify-between gap-3 rounded-base border border-border bg-background p-2">
              <div className="flex items-center gap-2">
                {displayLogoUrl && !logoFile && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={displayLogoUrl}
                    alt="Logo Kustom"
                    className="h-9 w-auto object-contain"
                  />
                )}
                {logoFile && (
                  <span className="text-xs font-heading text-foreground/70">
                    File baru: {logoFile.name}
                  </span>
                )}
              </div>
              {displayLogoUrl && (
                <Button
                  type="button"
                  variant="neutral"
                  size="sm"
                  disabled={saving}
                  onClick={handleRemoveLogo}
                  className="bg-destructive text-destructive-foreground text-xs"
                >
                  Kembalikan ke Default TRPL
                </Button>
              )}
            </div>
          )}
        </div>

        <div className="mt-3 flex items-center justify-between gap-3 rounded-base border-2 border-border bg-secondary-background p-3">
          <div className="flex flex-col gap-0.5">
            <span className="font-heading text-sm text-foreground flex items-center gap-1.5">
              <Images size={16} /> Foto Latar Layar Siaga
            </span>
            <span className="text-xs text-foreground/60">
              Unggah & kelola foto kampus/lab yang tampil di layar siaga (Idle & Quotes).
            </span>
          </div>
          <Link href="/admin/latar">
            <Button type="button" variant="neutral" size="sm" className="whitespace-nowrap">
              Kelola Foto Latar &rarr;
            </Button>
          </Link>
        </div>

        <div className="mt-3 flex flex-col gap-1.5 rounded-base border-2 border-border bg-secondary-background p-3">
          <div className="flex items-center justify-between">
            <Label className="font-heading text-sm text-foreground">
              Kecerahan Foto Latar Layar Siaga
            </Label>
            <span className="rounded-full border border-main/30 bg-main/10 px-2 py-0.5 font-mono text-xs font-bold text-main">
              {idleBrightness}%
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold text-foreground/60">20%</span>
            <input
              type="range"
              min="20"
              max="100"
              step="5"
              value={idleBrightness}
              onChange={(e) => {
                setIdleBrightness(e.target.value);
                setSaved(false);
              }}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-main dark:bg-slate-700"
            />
            <span className="font-mono text-xs font-bold text-foreground/60">100%</span>
          </div>
          <p className="text-[11px] text-foreground/60">
            Kecerahan foto saat jam dan kutipan aktif di layar siaga. Lapisan kotak-kotak kini berada di belakang gambar sehingga foto tampil jelas.
          </p>
        </div>

        <Label className="mt-2">
          Video YouTube latar saat layar idle (opsional)
        </Label>
        <Input
          type="text"
          placeholder="ID atau URL video YouTube"
          value={idleYoutubeUrl}
          onChange={(e) => {
            setIdleYoutubeUrl(e.target.value);
            setSaved(false);
          }}
        />

        <Label className="mt-2">Musik latar saat layar idle (opsional)</Label>
        <input
          type="file"
          accept="audio/*"
          onChange={(e) => {
            setAudioFile(e.target.files?.[0] ?? null);
            setSaved(false);
          }}
          className="rounded-base border-2 border-border bg-secondary-background p-2 text-sm font-base text-foreground"
        />
        {idleAudioUrl && !audioFile && (
          <div className="flex flex-col gap-2 rounded-base border-2 border-border bg-background p-3">
            <p className="text-xs text-foreground/50">
              File tersimpan saat ini: {idleAudioUrl.split("/").pop()}
            </p>
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <audio src={idleAudioUrl} controls className="w-full" />
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="neutral"
                size="sm"
                onClick={handleToggleAudioPlaying}
                className={
                  idleAudioPlaying
                    ? "bg-main text-main-foreground"
                    : undefined
                }
              >
                {idleAudioPlaying ? "⏸ Pause di /display" : "▶ Play di /display"}
              </Button>
              <Button
                type="button"
                variant="neutral"
                size="sm"
                disabled={saving}
                onClick={handleRemoveAudio}
                className="bg-destructive text-destructive-foreground"
              >
                Hapus musik
              </Button>
            </div>
            <p className="text-xs text-foreground/50">
              Tombol play/pause di atas langsung ngefek ke /display detik itu
              juga (butuh koneksi realtime, bukan lewat tombol Simpan).
            </p>
          </div>
        )}
        <p className="text-xs text-foreground/50">
          Diputar loop di latar hanya ketika layar benar-benar idle (tidak
          ada konten aktif lain). Terpisah dari video YouTube di atas — bisa
          dipakai salah satu atau keduanya. Kosongkan untuk tanpa musik.
        </p>
        <a href="/display" target="_blank" rel="noopener noreferrer">
          <Button type="button" variant="neutral" size="sm" className="w-full">
            Buka /display buat cek langsung
          </Button>
        </a>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <Button type="submit" disabled={saving}>
          {saving ? "Menyimpan..." : "Simpan"}
        </Button>
        {saved && (
          <p className="text-sm text-foreground/70">Pengaturan tersimpan.</p>
        )}
        {!settings && (
          <p className="text-sm text-foreground/50">Memuat...</p>
        )}
      </form>
    </Section>
  );
}
