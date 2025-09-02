import "./globals.css";
import AppThemeProvider from "@/mui/theme-provider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ minHeight: "100vh" }}>
      <AppThemeProvider>
        {children}
      </AppThemeProvider>
      </body>
    </html>
  );
}