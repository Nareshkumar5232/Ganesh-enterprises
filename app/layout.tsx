import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { QueryProvider, StoreHydration } from "@/components/providers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Sri Ganesh Enterprises | Chennai's Electronics Wholesale Marketplace",
    template: "%s | Sri Ganesh Enterprises",
  },
  description:
    "Chennai's largest wholesale electronics distributor. Genuine computers, laptops, TVs, CCTV, networking, mobile devices and home appliances at bulk pricing. 100+ brands, 5000+ products.",
  keywords: [
    "wholesale electronics Chennai",
    "bulk electronics supplier",
    "computers laptops wholesale",
    "CCTV security systems",
    "Samsung LG Sony wholesale dealer",
    "electronics distributor Tamil Nadu",
    "Sri Ganesh Enterprises",
  ],
  authors: [{ name: "Sri Ganesh Enterprises" }],
  creator: "Sri Ganesh Enterprises",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://sriganeshenterprises.in",
    siteName: "Sri Ganesh Enterprises",
    title: "Sri Ganesh Enterprises | Chennai's Electronics Wholesale Marketplace",
    description:
      "Wholesale electronics distributor — genuine computers, laptops, TVs, CCTV & home appliances at bulk pricing. 100+ brands in stock.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sri Ganesh Enterprises — Wholesale Electronics Chennai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sri Ganesh Enterprises | Wholesale Electronics",
    description: "Chennai's Electronics Wholesale Marketplace",
  },
  alternates: {
    canonical: "https://sriganeshenterprises.in",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <QueryProvider>
            <StoreHydration />
            <Navbar />
            <main>{children}</main>
            <Footer />
            <WhatsAppButton />
            <Toaster
              richColors
              position="top-right"
              duration={3000}
              closeButton
            />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
