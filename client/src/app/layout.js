import "./globals.css";
import { Header } from "@/components/Header";

export const metadata = {
  title: "Tetoka!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <head>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </head>
      <body className="dark:bg-black select-none">
        <Header />
        {children}
      </body>
    </html>
  );
}
