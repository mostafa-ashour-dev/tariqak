"use client";
import NextLink from "next/link";

type Props = {
    children?: React.ReactNode;
    href?: string;
    text?: string;
    className?: string
}

const httpsLinkRegex = /https?:\/\//;

export default function Link({children, href, text, className}: Props) {

  if (httpsLinkRegex.test(href || "")) {
    return (
        <a href={href || "#"} className={`link ${className || ""}`} target="_blank" rel="noopener noreferrer">
          {children || text}
        </a>
    );
  }
  return (
    <NextLink className={`link ${className || ""}`} href={href || "#"}>
      {children || text}
    </NextLink>
  );
}
