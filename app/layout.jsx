import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Providers from "./providers";

import Navbar from "../components/Navbar";

import { MessageCircle } from "lucide-react";

export const metadata = {
  title: {
    default:
      "Serenity Phinisi — Intimate Yacht Journeys Across Indonesia",
    template: "%s | Serenity Phinisi",
  },

  description:
    "A contemporary phinisi built in South Sulawesi for intimate ocean adventures through Raja Ampat and Komodo with only twelve guests aboard.",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/6281234567890"
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
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
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
