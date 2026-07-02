import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk } from "next/font/google";
import "./globals.css";

const sans = Hanken_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vireo.video";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Vireo — AI Video Editor for TikTok, Reels & Shorts",
    template: "%s | Vireo",
  },
  description:
    "Vireo is the AI video editor for creators. Upload your clips, drop in a track, describe the vibe — and get a post-ready vertical video for TikTok, Reels & Shorts in seconds.",
  keywords: [
    "AI video editor",
    "TikTok video editor",
    "Instagram Reels editor",
    "YouTube Shorts editor",
    "auto captions",
    "beat sync video",
    "vertical video editor",
    "online video editor",
    "video editing for creators",
  ],
  applicationName: "Vireo",
  authors: [{ name: "Vireo" }],
  creator: "Vireo",
  publisher: "Vireo",
  category: "technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Vireo",
    title: "Vireo — AI Video Editor for TikTok, Reels & Shorts",
    description:
      "Upload your clips, describe the vibe, and Vireo edits a post-ready vertical video — beat-synced cuts, auto-captions, and drafts in seconds.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@vireo",
    creator: "@vireo",
    title: "Vireo — AI Video Editor for TikTok, Reels & Shorts",
    description:
      "Upload your clips, describe the vibe, and Vireo edits a post-ready vertical video — beat-synced cuts, auto-captions, and drafts in seconds.",
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
};

export const viewport: Viewport = {
  themeColor: "#123724",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={sans.variable}>
      <body>{children}</body>
    </html>
  );
}
