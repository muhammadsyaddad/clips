export const THEME_MODE_OPTIONS = [
  {
    label: "Light",
    value: "light",
  },
  {
    label: "Dark",
    value: "dark",
  },
] as const;

export const THEME_MODE_VALUES = THEME_MODE_OPTIONS.map((m) => m.value);

export type ThemeMode = (typeof THEME_MODE_VALUES)[number];

// --- themes are now manually managed ---

export const THEME_PRESET_OPTIONS = [{ label: "Default", value: "default" }] as const;

export const THEME_PRESET_VALUES = THEME_PRESET_OPTIONS.map((p) => p.value);

export type ThemePreset = (typeof THEME_PRESET_OPTIONS)[number]["value"];

// --- end ---
