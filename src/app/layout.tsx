import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { GoogleTagManagerHead, GoogleTagManagerBody } from "@/components/GoogleTagManager";
import PageTracker from "@/components/PageTracker";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://diegogonzalezvaccaro.com'),
  title: {
    default: "Hocuz Focuz - Optimización y Automatización",
    template: "%s | Hocuz Focuz"
  },
  description: "Transformo tu caos diario en sistemas automatizados que funcionan 24/7. Especialista en optimización de procesos, productividad y automatización con IA.",
  keywords: ["optimización", "automatización", "productividad", "IA", "sistemas", "procesos"],
  authors: [{ name: "Diego Gonzalez Vaccaro" }],
  creator: "Diego Gonzalez Vaccaro",
  publisher: "Hocuz Focuz",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://diegogonzalezvaccaro.com",
    siteName: "Hocuz Focuz",
    title: "Hocuz Focuz - Optimización y Automatización",
    description: "Transformo tu caos diario en sistemas automatizados que funcionan 24/7.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Hocuz Focuz - Optimización y Automatización",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hocuz Focuz - Optimización y Automatización",
    description: "Transformo tu caos diario en sistemas automatizados que funcionan 24/7.",
    images: ["/og-image.jpg"],
    creator: "@diegogonzalezv",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "tu-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <GoogleTagManagerHead />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased bg-black text-gray-300 min-h-screen`}
      >
        <GoogleTagManagerBody />
        <PageTracker />
        <Analytics />
        <SpeedInsights />
        {children}
      </body>
    </html>
  );
}
