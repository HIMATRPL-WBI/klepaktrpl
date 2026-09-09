"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

export default function AdminHeader() {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <header className="flex items-center justify-between border-b-2 border-border bg-main px-4 py-3 shadow-shadow">
      <div className="flex items-center gap-2">
        <span className="flex h-3 w-3 rounded-full bg-emerald-400 animate-pulse" />
        <h1 className="font-heading text-lg uppercase tracking-wide text-main-foreground">
          Klepak TRPL Admin
        </h1>
      </div>
      <Button
        type="button"
        variant="neutral"
        size="sm"
        onClick={handleLogout}
      >
        Keluar
      </Button>
    </header>
  );
}
