import { getTheme } from "./content";

export function getThemeCssVariables() {
  const theme = getTheme();
  const lightVars = {
    "--bg": theme.colors.light.bg,
    "--surface": theme.colors.light.surface,
    "--surface-raised": theme.colors.light.surfaceRaised,
    "--border": theme.colors.light.border,
    "--text": theme.colors.light.text,
    "--text-muted": theme.colors.light.textMuted,
    "--primary": theme.colors.light.primary,
    "--primary-hover": theme.colors.light.primaryHover,
    "--accent": theme.colors.light.accent,
    "--accent-glow": theme.colors.light.accentGlow,
    "--success": theme.colors.light.success,
    "--danger": theme.colors.light.danger,
  };

  const darkVars = {
    "--bg": theme.colors.dark.bg,
    "--surface": theme.colors.dark.surface,
    "--surface-raised": theme.colors.dark.surfaceRaised,
    "--border": theme.colors.dark.border,
    "--text": theme.colors.dark.text,
    "--text-muted": theme.colors.dark.textMuted,
    "--primary": theme.colors.dark.primary,
    "--primary-hover": theme.colors.dark.primaryHover,
    "--accent": theme.colors.dark.accent,
    "--accent-glow": theme.colors.dark.accentGlow,
    "--success": theme.colors.dark.success,
    "--danger": theme.colors.dark.danger,
  };

  return { lightVars, darkVars, heroGradient: theme.colors.heroGradient };
}
