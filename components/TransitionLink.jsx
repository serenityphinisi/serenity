"use client";

import Link from "next/link";
import { usePageTransition } from "./PageTransitionProvider";

function isModifiedEvent(event) {
  return Boolean(
    event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button === 1
  );
}

function isExternalLikeHref(href) {
  if (typeof href !== "string") return false;
  const trimmed = href.trim();
  return (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("//") ||
    trimmed.startsWith("mailto:") ||
    trimmed.startsWith("tel:")
  );
}

export default function TransitionLink({
  href,
  transitionImage,
  transitionLabel,
  replace,
  target,
  onClick,
  children,
  ...props
}) {
  const { navigate } = usePageTransition();
  const hrefString = typeof href === "string" ? href : String(href ?? "");

  const handleClick = (event) => {
    if (onClick) onClick(event);
    if (event.defaultPrevented) return;

    if (isModifiedEvent(event)) return;
    if (target && target !== "_self") return;
    if (!hrefString) return;
    if (hrefString.startsWith("#")) return;
    if (isExternalLikeHref(hrefString)) return;

    event.preventDefault();
    navigate(hrefString, {
      image: transitionImage,
      label: transitionLabel,
      replace: Boolean(replace),
    });
  };

  return (
    <Link
      href={href}
      replace={replace}
      target={target}
      onClick={handleClick}
      {...props}
    >
      {children}
    </Link>
  );
}
