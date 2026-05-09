import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "PrecoMelhor - Compare preços e economize",
    template: "%s | PrecoMelhor",
  },
  description:
    "Compare preços de milhares de produtos em dezenas de lojas. Encontre o melhor preço e economize nas suas compras.",
  keywords: ["comparar preços", "melhor preço", "economizar", "compras online"],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "PrecoMelhor",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
