import type {
  AccentColor,
  GrayColor,
  PanelBackground,
  RadiusScale,
  Scaling,
  ThemeConfig,
  ThemeMode,
  ThemeVariables
} from "./types";

const DEFAULT_ACCENT: AccentColor = "indigo";
const DEFAULT_GRAY: GrayColor = "slate";
const DEFAULT_RADIUS: RadiusScale = "medium";
const DEFAULT_SCALING: Scaling = "100%";
const DEFAULT_PANEL_BACKGROUND: PanelBackground = "translucent";

const ACCENT_HUES: Record<AccentColor, number> = {
  gray: 0,
  gold: 44,
  bronze: 28,
  brown: 25,
  yellow: 50,
  amber: 36,
  orange: 24,
  tomato: 10,
  red: 5,
  ruby: 350,
  crimson: 340,
  pink: 320,
  plum: 300,
  purple: 285,
  violet: 270,
  iris: 255,
  indigo: 245,
  blue: 220,
  cyan: 200,
  teal: 180,
  jade: 165,
  green: 140,
  grass: 125,
  lime: 90,
  mint: 155,
  sky: 210
};

const GRAY_HUES: Record<Exclude<GrayColor, "auto">, number> = {
  gray: 0,
  mauve: 280,
  slate: 215,
  sage: 140,
  olive: 95,
  sand: 45
};

const lightnessScale = [99, 97, 94, 91, 88, 82, 76, 68, 60, 52, 44, 36];
const darkLightnessScale = [12, 14, 16, 18, 22, 28, 36, 44, 52, 60, 70, 82];

export const clampHue = (value: number): number => {
  if (Number.isNaN(value)) {
    return ACCENT_HUES[DEFAULT_ACCENT];
  }
  return Math.max(0, Math.min(360, value));
};

export const resolveAccentHue = (accentColor?: AccentColor): number =>
  ACCENT_HUES[accentColor ?? DEFAULT_ACCENT];

export const resolveGrayHue = (
  grayColor?: GrayColor,
  accentHue?: number
): number => {
  if (!grayColor || grayColor === "auto") {
    return clampHue(accentHue ?? ACCENT_HUES[DEFAULT_ACCENT]);
  }
  return GRAY_HUES[grayColor];
};

const buildScale = (
  hue: number,
  saturation: number,
  isDark: boolean
): Record<string, string> => {
  const steps = isDark ? darkLightnessScale : lightnessScale;
  return steps.reduce<Record<string, string>>((acc, lightness, index) => {
    acc[`${index + 1}`] = `hsl(${hue} ${saturation}% ${lightness}%)`;
    return acc;
  }, {});
};

export const generateThemeVariables = ({
  theme,
  accentColor,
  grayColor,
  radius,
  scaling,
  panelBackground,
  hasBackground = true
}: ThemeConfig): ThemeVariables => {
  const isDark = theme === "dark";
  const accentHue = resolveAccentHue(accentColor);
  const grayHue = resolveGrayHue(grayColor, accentHue);
  const accentScale = buildScale(accentHue, 78, isDark);
  const grayScale = buildScale(grayHue, 12, isDark);

  const radiusMap: Record<RadiusScale, string> = {
    none: "0px",
    small: "6px",
    medium: "10px",
    large: "16px",
    full: "999px"
  };

  const variables: ThemeVariables = {
    "--twui-theme": theme,
    "--twui-accent-color": accentColor ?? DEFAULT_ACCENT,
    "--twui-gray-color": grayColor ?? DEFAULT_GRAY,
    "--twui-radius-scale": radius ?? DEFAULT_RADIUS,
    "--twui-radius": radiusMap[radius ?? DEFAULT_RADIUS],
    "--twui-scaling": scaling ?? DEFAULT_SCALING,
    "--twui-panel-background": panelBackground ?? DEFAULT_PANEL_BACKGROUND,
    "--twui-has-background": hasBackground ? "1" : "0",
    "--twui-color-bg": isDark ? grayScale["1"] : grayScale["1"],
    "--twui-color-fg": isDark ? grayScale["12"] : grayScale["12"],
    "--twui-color-panel-solid": isDark ? grayScale["3"] : grayScale["1"],
    "--twui-color-panel-translucent": `color-mix(in srgb, ${grayScale["1"]} 80%, transparent)`,
    "--twui-color-primary": accentScale["9"],
    "--twui-color-primary-contrast": isDark ? grayScale["1"] : grayScale["12"]
  };

  Object.entries(accentScale).forEach(([step, value]) => {
    variables[`--accent-${step}`] = value;
  });

  Object.entries(grayScale).forEach(([step, value]) => {
    variables[`--gray-${step}`] = value;
  });

  return variables;
};

export const serializeThemeVariables = (variables: ThemeVariables): string =>
  Object.entries(variables)
    .map(([key, value]) => `${key}: ${value};`)
    .join("\n");

export const getAccentSwatchColor = (accent: AccentColor, theme: ThemeMode): string => {
  const hue = resolveAccentHue(accent);
  const lightness = theme === "dark" ? darkLightnessScale[8] : lightnessScale[8];
  return `hsl(${hue} 78% ${lightness}%)`;
};

export const getGraySwatchColor = (gray: GrayColor, theme: ThemeMode): string => {
  const hue = resolveGrayHue(gray, ACCENT_HUES[DEFAULT_ACCENT]);
  const lightness = theme === "dark" ? darkLightnessScale[8] : lightnessScale[8];
  return `hsl(${hue} 12% ${lightness}%)`;
};
