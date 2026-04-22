"use client";

import { createTheme } from "@mui/material/styles";

// Material Design 3 inspired color palette
export const getTheme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            primary: {
              main: "#6750A4", // M3 primary
              light: "#9A82DB",
              dark: "#4F378B",
              contrastText: "#FFFFFF",
            },
            secondary: {
              main: "#625B71",
              light: "#7A7289",
              dark: "#4A4458",
            },
            background: {
              default: "#FEF7FF",
              paper: "#FFFFFF",
            },
            text: {
              primary: "#1D1B20",
              secondary: "#49454F",
            },
            divider: "#CAC4D0",
          }
        : {
            primary: {
              main: "#D0BCFF",
              light: "#EADDFF",
              dark: "#9A82DB",
              contrastText: "#371E73",
            },
            secondary: {
              main: "#CCC2DC",
              light: "#E8DEF8",
              dark: "#9A92AB",
            },
            background: {
              default: "#141218",
              paper: "#1D1B20",
            },
            text: {
              primary: "#E6E0E9",
              secondary: "#CAC4D0",
            },
            divider: "#49454F",
          }),
    },
    typography: {
      fontFamily:
        '"Roboto", "Noto Sans JP", "Helvetica Neue", Arial, sans-serif',
      h1: { fontWeight: 400, letterSpacing: "-0.02em" },
      h2: { fontWeight: 400, letterSpacing: "-0.01em" },
      h3: { fontWeight: 500 },
      h4: { fontWeight: 500 },
      h5: { fontWeight: 500 },
      h6: { fontWeight: 600 },
      button: { textTransform: "none", fontWeight: 500 },
    },
    shape: {
      borderRadius: 16, // M3 uses larger radii
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 100, // M3 pill-shaped buttons
            paddingLeft: 24,
            paddingRight: 24,
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 8,
          },
        },
      },
    },
  });
