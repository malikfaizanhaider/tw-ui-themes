import type React from "react";

export type ThemeMode = "light" | "dark";

export type AccentColor =
  | "gray"
  | "gold"
  | "bronze"
  | "brown"
  | "yellow"
  | "amber"
  | "orange"
  | "tomato"
  | "red"
  | "ruby"
  | "crimson"
  | "pink"
  | "plum"
  | "purple"
  | "violet"
  | "iris"
  | "indigo"
  | "blue"
  | "cyan"
  | "teal"
  | "jade"
  | "green"
  | "grass"
  | "lime"
  | "mint"
  | "sky";

export type GrayColor = "auto" | "gray" | "mauve" | "slate" | "sage" | "olive" | "sand";

export type RadiusScale = "none" | "small" | "medium" | "large" | "full";

export type Scaling = "90%" | "95%" | "100%" | "105%" | "110%";

export type PanelBackground = "solid" | "translucent";

export type ThemeConfig = {
  theme: ThemeMode;
  accentColor?: AccentColor;
  grayColor?: GrayColor;
  radius?: RadiusScale;
  scaling?: Scaling;
  panelBackground?: PanelBackground;
  hasBackground?: boolean;
  tenantId?: string;
};

export type ThemeVariables = Record<string, string>;

export type ThemeContextValue = ThemeConfig & {
  setThemeConfig: (next: ThemeConfig) => void;
};

export type ThemeProviderProps = {
  children: React.ReactNode;
  value?: ThemeConfig;
  defaultValue?: ThemeConfig;
  onChange?: (next: ThemeConfig) => void;
};
