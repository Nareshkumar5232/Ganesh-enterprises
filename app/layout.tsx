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
    default: "Sri Ganesh Enterprises ENTERPRISES PVT LTD | Electronics, Computers & IT Products",
    template: "%s | Sri Ganesh Enterprises ENTERPRISES",
  },
  description:
    "Shop electronics, computers, IT accessories, networking products, and technology solutions at Sri Ganesh Enterprises ENTERPRISES PVT LTD. Quality products, genuine brands, fast delivery across Chennai.",
  keywords: [
    "electronics products",
    "computer products",
    "it products",
    "technology solutions",
    "it accessories",
    "networking products",
    "Chennai",
    "Sri Ganesh Enterprises",
  ],
  authors: [{ name: "Sri Ganesh Enterprises ENTERPRISES PVT LTD" }],
  creator: "Sri Ganesh Enterprises ENTERPRISES PVT LTD",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://alhikmath.com",
    siteName: "Sri Ganesh Enterprises ENTERPRISES",
    title: "Sri Ganesh Enterprises ENTERPRISES PVT LTD | Electronics, Computers & IT Products",
    description:
      "Shop electronics, computers, IT accessories, networking products, and technology solutions at Sri Ganesh Enterprises ENTERPRISES PVT LTD.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sri Ganesh Enterprises ENTERPRISES PVT LTD",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sri Ganesh Enterprises ENTERPRISES PVT LTD",
    description: "Electronics, Computers & IT Products",
  },
  alternates: {
    canonical: "https://alhikmath.com",
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
