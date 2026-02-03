"use client";

import React, { createContext, useMemo } from "react";
import type { ThemeConfig, ThemeContextValue } from "./types";

export const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  setThemeConfig: () => {}
});

export const useThemeContextValue = (
  config: ThemeConfig,
  setThemeConfig: (next: ThemeConfig) => void
): ThemeContextValue =>
  useMemo(
    () => ({
      theme: config.theme,
      tenantId: config.tenantId,
      accentColor: config.accentColor,
      grayColor: config.grayColor,
      radius: config.radius,
      scaling: config.scaling,
      panelBackground: config.panelBackground,
      hasBackground: config.hasBackground,
      setThemeConfig
    }),
    [
      config.theme,
      config.tenantId,
      config.accentColor,
      config.grayColor,
      config.radius,
      config.scaling,
      config.panelBackground,
      config.hasBackground,
      setThemeConfig
    ]
  );
