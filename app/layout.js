import NotificationsProvider from "@/hooks/useNotifications/NotificationsProvider";
import "./globals.css";
import AppThemeProvider from "@/mui/theme-provider";
import DialogsProvider from "@/hooks/useDialogs/DialogsProvider";
import StoreProvider from "@/store/StoreProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ minHeight: "100vh" }}>
        <StoreProvider>
          <AppThemeProvider>
            <NotificationsProvider>
              <DialogsProvider>{children}</DialogsProvider>
            </NotificationsProvider>
          </AppThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
