import type { Metadata } from "next";
import "./global.css";
import { AppBar, Box, Toolbar, Container } from "@mui/material";
import { SearchBar } from "./_components/SearchBar";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Roboto } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import StoreProvider from "./StoreProvider";
import { RecipeSnackbar } from "./_components/RecipeSnackbar";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Recipe List",
  description: "Web app that manages recipes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <StoreProvider>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <Box>
                <AppBar position="fixed">
                  <Toolbar sx={{ py: 2 }}>
                    <Container sx={{ display: "flex" }}>
                      <Box sx={{ flexGrow: 1 }} />
                      <SearchBar />
                    </Container>
                  </Toolbar>
                </AppBar>
                <Container sx={{ pt: 11 }}>{children}</Container>
              </Box>
              <RecipeSnackbar />
            </ThemeProvider>
          </AppRouterCacheProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
