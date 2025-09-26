import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GoogleTagManagerHead, GoogleTagManagerBody } from "@/components/GoogleTagManager";
import PageTracker from "@/components/PageTracker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://diegogonzalezvaccaro.com'),
  title: {
    default: "Diego Gonzalez Vaccaro - Optimización y Automatización",
    template: "%s | Diego Gonzalez Vaccaro"
  },
  description: "Transformo tu caos diario en sistemas automatizados que funcionan 24/7. Especialista en optimización de procesos, productividad y automatización con IA.",
  keywords: ["optimización", "automatización", "productividad", "IA", "sistemas", "procesos"],
  authors: [{ name: "Diego Gonzalez Vaccaro" }],
  creator: "Diego Gonzalez Vaccaro",
  publisher: "Diego Gonzalez Vaccaro",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://diegogonzalezvaccaro.com",
    siteName: "Diego Gonzalez Vaccaro",
    title: "Diego Gonzalez Vaccaro - Optimización y Automatización",
    description: "Transformo tu caos diario en sistemas automatizados que funcionan 24/7.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Diego Gonzalez Vaccaro - Optimización y Automatización",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Diego Gonzalez Vaccaro - Optimización y Automatización",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-gray-300 min-h-screen`}
      >
        <GoogleTagManagerBody />
        <PageTracker />
        {children}
      </body>
    </html>
  );
}
