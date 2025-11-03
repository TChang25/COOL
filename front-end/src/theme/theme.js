// /src/theme/theme.js
import { createTheme } from "@mui/material/styles";

// 🎨 City of Orlando Loaners MUI Theme (official 6-color palette)
const theme = createTheme({
  palette: {
    // 💙 Pantone 287 — Primary buttons, headers, sections
    primary: {
      main: "#0072CE",
      contrastText: "#FFFFFF",
    },

    // 🩵 Pantone 283 — Page backgrounds
    secondary: {
      main: "#8CC8FF",
      contrastText: "#2C2C2C",
    },

    // 🤍 White — Background, text, and icon contrast
    background: {
      default: "#FFFFFF",
      paper: "#FFFFFF",
    },

    // 🖤 Pantone Cool Gray 45 — Text
    text: {
      primary: "#2C2C2C",
      secondary: "#2C2C2C",
    },

    // ❤️ Pantone 1797C — Error & alert states
    error: {
      main: "#D22630",
      contrastText: "#FFFFFF",
    },

    // 💚 Pantone 376 — Success & status
    success: {
      main: "#78BE20",
      contrastText: "#FFFFFF",
    },
  },

  typography: {
    fontFamily: '"Manrope", "Nunito Sans", "Arial", sans-serif',
    fontSize: 14,
    h1: { fontSize: "2.5rem", fontWeight: 500, color: "#2C2C2C" },
    h2: { fontSize: "2rem", fontWeight: 500, color: "#2C2C2C" },
    h3: { fontSize: "1.5rem", fontWeight: 500, color: "#2C2C2C" },
    body1: { fontSize: "1rem", lineHeight: 1.6, color: "#2C2C2C" },
    body2: { fontSize: "0.9rem", color: "#2C2C2C" },
    button: { fontWeight: 600, textTransform: "none" },
  },

  shape: {
    borderRadius: 20, // From your design tokens
  },

  shadows: [
    "none",
    "3px 3px 5px rgb(0, 72, 224)", // Custom shadow from design tokens
    ...Array(23).fill("none"),
  ],

  spacing: 5, // 5px base unit
});

export default theme;
