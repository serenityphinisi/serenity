"use client";

import useLenis from "../hooks/useLenis";
import { PageTransitionProvider } from "../components/PageTransitionProvider";

export default function Providers({ children }) {
  useLenis();
  return <PageTransitionProvider>{children}</PageTransitionProvider>;
}
