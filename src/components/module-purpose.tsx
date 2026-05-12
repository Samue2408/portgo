import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type ModulePurposeItem = {
  title: string;
  text: string;
  icon: LucideIcon;
};

export function ModulePurpose({ items }: { items: ModulePurposeItem[] }) {
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <Card key={item.title} className="border-border/80 bg-card/80 shadow-sm transition-shadow hover:shadow-md">
          <CardContent className="flex gap-3 p-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-sky-100 text-sky-700 dark:bg-sky-950/50 dark:text-sky-200">
              <item.icon className="size-5" aria-hidden />
            </div>
            <div>
              <p className="text-sm font-semibold">{item.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
