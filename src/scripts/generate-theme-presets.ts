/**
 * Script: generate-theme-presets.ts
 *
 * This script is no longer needed as we are only using the default theme.
 * You can either delete this file or leave it as is.
 */
import fs from "fs";
import path from "path";

import prettier from "prettier";

const outputPath = path.resolve(__dirname, "../types/preferences/theme.ts");

const generatedBlock = `// --- themes are now manually managed ---

export const THEME_PRESET_OPTIONS = [{ label: "Default", value: "default" }] as const;

export const THEME_PRESET_VALUES = THEME_PRESET_OPTIONS.map((p) => p.value);

export type ThemePreset = (typeof THEME_PRESET_OPTIONS)[number]["value"];

// --- end ---`;

const fileContent = fs.readFileSync(outputPath, "utf8");

const updated = fileContent.replace(
  /\/\/ --- generated:themePresets:start ---[\s\S]*?\/\/ --- generated:themePresets:end ---/,
  generatedBlock,
);

async function main() {
  const formatted = await prettier.format(updated, { parser: "typescript" });

  if (formatted === fileContent) {
    console.log("ℹ️ No changes in theme.ts");
    return;
  }

  fs.writeFileSync(outputPath, formatted);
  console.log("✅ theme.ts updated to remove theme presets");
}

main().catch((err) => {
  console.error("❌ Unexpected error while updating theme presets:", err);
  process.exit(1);
});
