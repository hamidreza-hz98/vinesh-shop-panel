import NotificationsProvider from "@/hooks/useNotifications/NotificationsProvider";
import "./globals.css";
import AppThemeProvider from "@/mui/theme-provider";
import DialogsProvider from "@/hooks/useDialogs/DialogsProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ minHeight: "100vh" }}>
        <AppThemeProvider>
          <NotificationsProvider>
            <DialogsProvider>{children}</DialogsProvider>
          </NotificationsProvider>
        </AppThemeProvider>
      </body>
    </html>
  );
}
