import "./globals.css";
import { Header } from "@/components/Header";
import { Provider } from "./provider";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; /* eslint-disable import/first */

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
        <Provider>
          <Header />
          {children}
        </Provider>
      </body>
    </html>
  );
}
