import type { ReactNode } from "react";
import type { Metadata } from "next";
import {
  CalendarClock,
  Image as ImageIcon,
  Images,
  LayoutDashboard,
  Megaphone,
  QrCode,
  Settings as SettingsIcon,
  Video as VideoIcon,
} from "lucide-react";
import EmergencyBanner from "@/components/admin/EmergencyBanner";
import AdminNav, { type AdminNavItem } from "@/components/admin/AdminNav";
import AdminHeader from "@/components/admin/AdminHeader";

export const metadata: Metadata = {
  title: "Klepak TRPL Admin",
  description: "Panel Kontrol Digital Signage Klepak TRPL",
};

const NAV_ITEMS: AdminNavItem[] = [
  { href: "/admin", label: "Ringkasan", icon: <LayoutDashboard size={14} /> },
  {
    href: "/admin/pengumuman",
    label: "Pengumuman",
    icon: <Megaphone size={14} />,
  },
  { href: "/admin/poster", label: "Poster", icon: <ImageIcon size={14} /> },
  { href: "/admin/latar", label: "Latar", icon: <Images size={14} /> },
  {
    href: "/admin/jadwal",
    label: "Jadwal",
    icon: <CalendarClock size={14} />,
  },
  { href: "/admin/qr", label: "QR", icon: <QrCode size={14} /> },
  { href: "/admin/video", label: "Video", icon: <VideoIcon size={14} /> },
  {
    href: "/admin/pengaturan",
    label: "Pengaturan",
    icon: <SettingsIcon size={14} />,
  },
];

export default function AdminDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-background pb-16">
      <div className="sticky top-0 z-10">
        <AdminHeader />
        <AdminNav items={NAV_ITEMS} />
      </div>

      <div className="mx-auto flex max-w-2xl flex-col gap-4 px-4 py-4">
        <EmergencyBanner />
        {children}
      </div>
    </main>
  );
}
