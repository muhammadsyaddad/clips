"use client";

import { Settings } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { updateContentLayout } from "@/lib/layout-utils";
import { updateThemeMode } from "@/lib/theme-utils";
import { setValueToCookie } from "@/server/server-actions";
import { usePreferencesStore } from "@/stores/preferences/preferences-provider";
import type { SidebarCollapsible, ContentLayout } from "@/types/preferences/layout";

type LayoutControlsProps = {
  readonly collapsible: SidebarCollapsible;
  readonly contentLayout: ContentLayout;
};

export function LayoutControls(props: LayoutControlsProps) {
  const { collapsible, contentLayout } = props;

  const themeMode = usePreferencesStore((s) => s.themeMode);
  const setThemeMode = usePreferencesStore((s) => s.setThemeMode);

  // FIX 2: Menggunakan `switch` statement untuk keamanan dan kejelasan.
  // Ini adalah pola yang paling aman untuk menangani aksi berdasarkan key.
  const handleValueChange = async (key: "theme_mode" | "content_layout" | "sidebar_collapsible", value: string) => {
    switch (key) {
      case "theme_mode":
        if (value === "light" || value === "dark") {
          updateThemeMode(value);
          setThemeMode(value);
        }
        break;
      case "content_layout":
        // Asumsi ContentLayout adalah string, jika tidak, perlu validasi
        updateContentLayout(value as ContentLayout);
        break;
      case "sidebar_collapsible":
        // Logika untuk sidebar collapsible bisa ditambahkan di sini
        break;
      default:
        // Menangani kasus jika key tidak dikenali
        console.warn(`Unhandled setting key: ${key}`);
        return;
    }

    // Simpan ke cookie setelah aksi selesai
    await setValueToCookie(key, value);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon">
          <Settings />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end">
        <div className="flex flex-col gap-5">
          <div className="space-y-1.5">
            <h4 className="text-sm leading-none font-medium">Layout Settings</h4>
            <p className="text-muted-foreground text-xs">Customize your dashboard layout preferences.</p>
          </div>
          <div className="space-y-3">
            <div className="space-y-1">
              <Label className="text-xs font-medium">Mode</Label>
              <ToggleGroup
                className="w-full"
                size="sm"
                variant="outline"
                type="single"
                value={themeMode}
                onValueChange={(value) => {
                  if (value) handleValueChange("theme_mode", value);
                }}
              >
                <ToggleGroupItem className="text-xs" value="light" aria-label="Toggle inset">
                  Light
                </ToggleGroupItem>
                <ToggleGroupItem className="text-xs" value="dark" aria-label="Toggle sidebar">
                  Dark
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-medium">Sidebar Collapsible</Label>
              <ToggleGroup
                className="w-full"
                size="sm"
                variant="outline"
                type="single"
                value={collapsible}
                onValueChange={(value) => {
                  if (value) handleValueChange("sidebar_collapsible", value);
                }}
              >
                <ToggleGroupItem className="text-xs" value="icon" aria-label="Toggle icon">
                  Icon
                </ToggleGroupItem>
                <ToggleGroupItem className="text-xs" value="offcanvas" aria-label="Toggle offcanvas">
                  OffCanvas
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-medium">Content Layout</Label>
              <ToggleGroup
                className="w-full"
                size="sm"
                variant="outline"
                type="single"
                value={contentLayout}
                onValueChange={(value) => {
                  if (value) handleValueChange("content_layout", value);
                }}
              >
                <ToggleGroupItem className="text-xs" value="centered" aria-label="Toggle centered">
                  Centered
                </ToggleGroupItem>
                <ToggleGroupItem className="text-xs" value="full-width" aria-label="Toggle full-width">
                  Full Width
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
