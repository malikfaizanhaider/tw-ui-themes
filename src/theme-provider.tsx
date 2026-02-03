"use client";

import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import { ThemeContext, useThemeContextValue } from "./theme-context";
import type { ThemeConfig, ThemeProviderProps } from "./types";
import { generateThemeVariables, serializeThemeVariables } from "./theme-engine";

const STYLE_ID_PREFIX = "twui-theme";

const ensureStyleTag = (id: string): HTMLStyleElement | null => {
  if (typeof document === "undefined") {
    return null;
  }

  const existing = document.getElementById(id);
  if (existing && existing instanceof HTMLStyleElement) {
    return existing;
  }

  const style = document.createElement("style");
  style.setAttribute("id", id);
  document.head.appendChild(style);
  return style;
};

const setRootAttributes = (config: ThemeConfig) => {
  if (typeof document === "undefined") {
    return;
  }

  const root = document.documentElement;
  root.dataset.theme = config.theme;
  root.dataset.accentColor = config.accentColor ?? "indigo";
  root.dataset.grayColor = config.grayColor ?? "slate";
  root.dataset.radius = config.radius ?? "medium";
  root.dataset.scaling = config.scaling ?? "100%";
  root.dataset.panelBackground = config.panelBackground ?? "translucent";
  root.dataset.hasBackground = config.hasBackground === false ? "false" : "true";
  if (config.tenantId) {
    root.dataset.tenant = config.tenantId;
  } else {
    delete root.dataset.tenant;
  }
};

const DEFAULT_CONFIG: ThemeConfig = {
  theme: "light",
  accentColor: "indigo",
  grayColor: "slate",
  radius: "medium",
  scaling: "100%",
  panelBackground: "translucent",
  hasBackground: true
};

const mergeConfig = (base: ThemeConfig, next?: ThemeConfig): ThemeConfig => ({
  ...base,
  ...next
});

export const ThemeProvider = ({ children, value, defaultValue, onChange }: ThemeProviderProps) => {
  const [uncontrolledValue, setUncontrolledValue] = useState<ThemeConfig>(
    mergeConfig(DEFAULT_CONFIG, defaultValue)
  );

  const currentConfig = mergeConfig(DEFAULT_CONFIG, value ?? uncontrolledValue);

  const setThemeConfig = useMemo(
    () => (next: ThemeConfig) => {
      if (value) {
        onChange?.(next);
      } else {
        setUncontrolledValue(next);
        onChange?.(next);
      }
    },
    [onChange, value]
  );

  const contextValue = useThemeContextValue(currentConfig, setThemeConfig);
  const id = useId();
  const styleIdRef = useRef(`${STYLE_ID_PREFIX}-${id}`);

  useEffect(() => {
    const style = ensureStyleTag(styleIdRef.current);
    if (!style) {
      return;
    }

    const variables = generateThemeVariables(currentConfig);
    style.textContent = `:root[data-theme="${currentConfig.theme}"]${currentConfig.tenantId ? `[data-tenant="${currentConfig.tenantId}"]` : ""} {\n${serializeThemeVariables(variables)}\n}`;
    setRootAttributes(currentConfig);

    return () => {
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, [currentConfig]);

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};
