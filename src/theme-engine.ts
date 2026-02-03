import type { ThemeConfig, ThemeVariables } from "./types";

const DEFAULT_ACCENT_HUE = 260;

export const clampHue = (value: number): number => {
  if (Number.isNaN(value)) {
    return DEFAULT_ACCENT_HUE;
  }
  return Math.max(0, Math.min(360, value));
};

export const generateThemeVariables = ({
  theme,
  accentHue = DEFAULT_ACCENT_HUE
}: ThemeConfig): ThemeVariables => {
  const hue = clampHue(accentHue);
  const isDark = theme === "dark";

  return {
    "--twui-theme": theme,
    "--twui-color-bg": isDark ? "#0b0b0f" : "#ffffff",
    "--twui-color-fg": isDark ? "#f8f8ff" : "#0b0b0f",
    "--twui-color-primary": `hsl(${hue} 90% ${isDark ? "70%" : "55%"})`,
    "--twui-color-primary-contrast": isDark ? "#0b0b0f" : "#ffffff"
  };
};

export const serializeThemeVariables = (variables: ThemeVariables): string =>
  Object.entries(variables)
    .map(([key, value]) => `${key}: ${value};`)
    .join("\n");
