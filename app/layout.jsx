import "./globals.css";

import Providers from "./providers";
import { SITE_BRAND, SITE_CONTACT } from "@/lib/siteConfig";

import Navbar from "../components/Navbar";

import { MessageCircle } from "lucide-react";

const DEFAULT_TITLE =
  "Serenity Phinisi — Intimate Yacht Journeys Across Indonesia";

const DEFAULT_DESCRIPTION =
  "Private phinisi yacht journeys through Indonesia’s most remarkable waters, from Komodo to Raja Ampat.";

export const metadata = {
  metadataBase: new URL(SITE_BRAND.url),

  title: {
    default: DEFAULT_TITLE,
    template: "%s | Serenity Phinisi",
  },

  description: DEFAULT_DESCRIPTION,

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: SITE_BRAND.name,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },

  twitter: {
    card: "summary",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
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

function WhatsAppButton() {
  return (
    <a
      href={SITE_CONTACT.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact Serenity via WhatsApp"
      className="
        group
        fixed
        bottom-5
        right-5
        z-[120]
        md:bottom-7
        md:right-7
      "
    >
      {/* GLOW */}
      <div
        className="
          absolute
          inset-0
          rounded-full
          bg-[#D7C3A0]/20
          blur-[24px]
          transition-all
          duration-700
          group-hover:bg-[#D7C3A0]/32
          group-hover:blur-[32px]
        "
      />

      {/* BUTTON */}
      <div
        className="
          relative
          flex
          h-[58px]
          w-[58px]
          items-center
          justify-center
          overflow-hidden
          rounded-full
          border
          border-white/10
          bg-[#1E2A4A]/72
          shadow-[0_18px_45px_rgba(0,0,0,0.22)]
          backdrop-blur-xl
          transition-all
          duration-500
          group-hover:scale-[1.04]
          group-hover:border-white/20
          group-hover:bg-[#24345C]/82
        "
      >
        {/* ATMOSPHERIC OVERLAY */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.12),transparent_42%)]
          "
        />

        {/* ICON */}
        <MessageCircle
          strokeWidth={1.7}
          className="
            relative
            h-[22px]
            w-[22px]
            text-[#F4F5F2]
            transition-transform
            duration-500
            group-hover:scale-[1.06]
          "
        />
      </div>
    </a>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className="
          bg-[#F4F5F2]
          font-sans
          antialiased
          text-[#1A1A1A]
        "
      >
        <Providers>
          <Navbar />

          {children}

          {/* GLOBAL CONTACT BUTTON */}
          <WhatsAppButton />
        </Providers>
      </body>
    </html>
  );
}
