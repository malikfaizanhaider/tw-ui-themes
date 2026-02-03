import type React from "react";

export type ThemeMode = "light" | "dark";

export type ThemeConfig = {
  theme: ThemeMode;
  tenantId?: string;
  accentHue?: number;
};

export type ThemeVariables = Record<string, string>;

export type ThemeProviderProps = ThemeConfig & {
  children: React.ReactNode;
};
