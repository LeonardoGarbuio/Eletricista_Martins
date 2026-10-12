import type { Metadata, Viewport } from "next";
import "@fontsource/manrope/latin-400.css";
import "@fontsource/manrope/latin-500.css";
import "@fontsource/manrope/latin-600.css";
import "@fontsource/manrope/latin-700.css";
import "@fontsource/manrope/latin-800.css";
import "@fontsource/space-grotesk/latin-500.css";
import "@fontsource/space-grotesk/latin-600.css";
import "@fontsource/space-grotesk/latin-700.css";
import "@fontsource/barlow-condensed/latin-700.css";
import { business } from "@/config/business";
import "./globals.css";
import "../styles/hero.css";
import "../styles/inspiration.css";
import "../styles/brand.css";
const title = "Eletricista Martins | Serviços elétricos em Ponta Grossa";
const description = "Serviços elétricos residenciais e comerciais em Ponta Grossa. Instalações, iluminação, manutenção e reformas. Prepare seu orçamento e solicite uma preferência de atendimento.";
export const metadata: Metadata = {
  metadataBase: new URL(business.siteUrl), title, description,
  robots: business.indexable ? { index: true, follow: true } : { index: false, follow: false, nocache: true },
  ...(business.indexable ? { alternates: { canonical: "/" } } : {}),
  openGraph: { title, description, siteName: business.name, locale: "pt_BR", type: "website", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Eletricista Martins — Precisou? Chama a Martins." }] },
  twitter: { card: "summary_large_image", title, description },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0b0d10" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
