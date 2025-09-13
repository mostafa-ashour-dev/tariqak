"use client";
import NextLink from "next/link";

type Props = {
    children?: React.ReactNode;
    link?: string;
    text?: string;
}

const httpsLinkRegex = /https?:\/\//;

export default function Link({children, link, text}: Props) {

  if (httpsLinkRegex.test(link || "")) {
    return (
      <li>
        <a href={link || "#"} className="link" target="_blank" rel="noopener noreferrer">
          {children || text}
        </a>
      </li>
    );
  }
  return (
    <li>
      <NextLink className="link" href={link || "#"}>
        {children || text}
      </NextLink>
    </li>
  );
}
