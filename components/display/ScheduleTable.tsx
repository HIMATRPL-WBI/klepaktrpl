import type { ScheduleItem } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function formatTimeRange(item: ScheduleItem): string {
  const start = item.start_time.slice(0, 5);
  if (!item.end_time) return start;
  return `${start}-${item.end_time.slice(0, 5)}`;
}

export default function ScheduleTable({ items }: { items: ScheduleItem[] }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8 bg-background px-8 py-12 sm:px-20 portrait:px-5 portrait:py-12 portrait:gap-6">
      <h2 className="text-2xl font-heading uppercase tracking-wide text-foreground sm:text-4xl portrait:text-2xl sm:portrait:text-3xl">
        Jadwal Hari Ini
      </h2>
      <div className="w-full max-w-4xl portrait:max-w-md overflow-hidden rounded-base border-2 border-border bg-secondary-background shadow-shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-base sm:text-lg portrait:text-xs sm:portrait:text-sm portrait:py-2.5">
                Waktu
              </TableHead>
              <TableHead className="text-base sm:text-lg portrait:text-xs sm:portrait:text-sm portrait:py-2.5">
                Kegiatan
              </TableHead>
              <TableHead className="text-base sm:text-lg portrait:text-xs sm:portrait:text-sm portrait:py-2.5">
                Lokasi / PIC
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow
                key={item.id}
                className="bg-secondary-background text-foreground even:bg-background"
              >
                <TableCell className="whitespace-nowrap font-mono text-base sm:text-lg portrait:text-xs portrait:py-2.5">
                  {formatTimeRange(item)}
                </TableCell>
                <TableCell className="text-base font-semibold sm:text-lg portrait:text-xs sm:portrait:text-sm portrait:py-2.5">
                  {item.title}
                </TableCell>
                <TableCell className="text-base sm:text-lg portrait:text-xs portrait:py-2.5">
                  {[item.location, item.pic].filter(Boolean).join(" · ") ||
                    "—"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
