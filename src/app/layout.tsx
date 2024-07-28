import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Providers from "./Providers";

import { Theme } from "@components/layout";
import AuthProvider from "@components/auth";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "devextreme/dist/css/dx.softblue.css";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PZW - strona administracyjna",
  description: "Strona administracyjna PZW",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet-geosearch/dist/geosearch.css"
        />
      </head>
      <body className={inter.className}>
        <Providers>
          <AuthProvider>
            <Theme>{children}</Theme>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
