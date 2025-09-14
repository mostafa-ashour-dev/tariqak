import React from 'react'

type Props = { children: React.ReactNode; text?: string; pos?: string, x?: number, y?: number, index?: number };

export default function FloatingIcon({ children, text, x, y }: Props) {
  return <div className={`text-surface absolute top-[${(y as number)}rem] left-[${(x as number)}rem] z-10 text-3xl hover:text-secondary`} title={text || "Icon"}>{children}</div>;
}
