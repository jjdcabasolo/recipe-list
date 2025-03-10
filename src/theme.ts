"use client";

import { grey } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    page: {
      default: string;
    };
  }
  interface ThemeOptions {
    page?: {
      default?: string;
    };
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#435490",
    },
  },
  page: {
    default: true ? grey[300] : grey[700],
  },
  typography: {
    fontFamily: "var(--font-roboto)",
  },
});

export default theme;
