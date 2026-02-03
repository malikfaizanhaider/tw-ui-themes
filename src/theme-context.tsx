"use client";

import React, { createContext, useMemo } from "react";
import type { ThemeConfig } from "./types";

export const ThemeContext = createContext<ThemeConfig>({
  theme: "light"
});

export const useThemeContextValue = (config: ThemeConfig): ThemeConfig =>
  useMemo(
    () => ({
      theme: config.theme,
      tenantId: config.tenantId,
      accentHue: config.accentHue
    }),
    [config.theme, config.tenantId, config.accentHue]
  );

export type ThemeContextValue = ThemeConfig;
