import { View, Text } from 'react-native'

type Props = {
    children: React.ReactNode | string
    alignment?: "left" | "center" | "right"
    size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "8xl" | "9xl" | undefined
    className?: string
}

const sizes = {
    xs: "text-xs",
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
    "4xl": "text-4xl",
    "5xl": "text-5xl",
    "6xl": "text-6xl",
    "7xl": "text-7xl",
    "8xl": "text-8xl",
    "9xl": "text-9xl",
}

const alignments = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
}

export default function Heading({children, size = "3xl", className, alignment}: Props) {
  return (
      <Text className={`${size && sizes[size]} ${alignment && alignments[alignment]} leading-normal font-cairo-bold ${className} text-text`}>{children}</Text>
  )
}