import type { Announcement } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

const PRIORITY_LABEL: Record<Announcement["priority"], string> = {
  darurat: "DARURAT",
  penting: "PENTING",
  normal: "INFO",
};

export default function AnnouncementsList({
  announcements,
}: {
  announcements: Announcement[];
}) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8 bg-background px-8 py-12 sm:px-20 portrait:px-6 portrait:py-12 portrait:gap-6">
      <h2 className="text-2xl font-heading uppercase tracking-wide text-foreground sm:text-4xl portrait:text-2xl sm:portrait:text-3xl">
        Info Hari Ini
      </h2>
      <ul className="flex w-full max-w-4xl portrait:max-w-md flex-col gap-4 portrait:gap-3.5">
        {announcements.map((a) => (
          <li
            key={a.id}
            className="flex flex-col gap-2 rounded-base border-2 border-border bg-secondary-background px-6 py-5 shadow-shadow sm:flex-row sm:items-center sm:gap-5 portrait:p-4 portrait:gap-2.5"
          >
            <Badge
              variant={a.priority === "normal" ? "neutral" : "default"}
              className={
                a.priority === "darurat"
                  ? "bg-destructive text-destructive-foreground portrait:text-xs portrait:px-2.5 portrait:py-0.5"
                  : "portrait:text-xs portrait:px-2.5 portrait:py-0.5"
              }
            >
              {PRIORITY_LABEL[a.priority]}
            </Badge>
            <span className="text-lg leading-snug text-foreground sm:text-2xl portrait:text-base sm:portrait:text-lg">
              {a.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
