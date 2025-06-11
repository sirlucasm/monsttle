import { theme } from "../styles/theme";
import { heroui } from "@heroui/react";

export default heroui({
  themes: {
    dark: {
      colors: {
        primary: theme.colors.primary,
        background: {
          DEFAULT: theme.colors.neutral[900],
        },
        foreground: {
          DEFAULT: theme.colors.neutral.foreground,
        },
        focus: theme.colors.primary,
        default: {
          DEFAULT: theme.colors.neutral[900],
        },
      },
    },
    light: {
      colors: {
        primary: theme.colors.primary,
        background: {
          DEFAULT: theme.colors.neutral.foreground,
        },
        foreground: {
          DEFAULT: theme.colors.neutral[900],
        },
      },
    },
  },
});
