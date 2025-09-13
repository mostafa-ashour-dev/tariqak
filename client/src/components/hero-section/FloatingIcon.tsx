import React from 'react'

type Props = { children: React.ReactNode; text?: string; pos?: string };

export default function FloatingIcon({ children, text, pos }: Props) {
  return <div className={`floating-icon pos${pos || "1"}`} title={text || "Icon"}>{children}</div>;
}
