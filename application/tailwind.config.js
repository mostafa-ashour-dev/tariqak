/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/app/**/*.{js,jsx,ts,tsx}", "./src/components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#ff4250",
          light: "#ff6b75",
          dark: "#cc3340",
          soft: "#ffe5e7",
        },
        secondary: {
          DEFAULT: "#0f79c6",
          light: "#46a0e0",
          dark: "#0c5d98",
          soft: "#e6f2fb",
        },
        body: "#ffffff",
        surface: "#f2f2f2",
        text: "#1a1a1a",
        subtext: "#5c5c5c",
        border: "#e0e0e0",
      },
      fontFamily: {
        // Cairo
        "cairo-black": ["Cairo-Black"],
        "cairo-bold": ["Cairo-Bold"],
        "cairo-extrabold": ["Cairo-ExtraBold"],
        "cairo-extralight": ["Cairo-ExtraLight"],
        "cairo-light": ["Cairo-Light"],
        "cairo-medium": ["Cairo-Medium"],
        "cairo-regular": ["Cairo-Regular"],
        "cairo-semibold": ["Cairo-SemiBold"],

        // Tajawal
        "tajawal-black": ["Tajawal-Black"],
        "tajawal-bold": ["Tajawal-Bold"],
        "tajawal-extrabold": ["Tajawal-ExtraBold"],
        "tajawal-extralight": ["Tajawal-ExtraLight"],
        "tajawal-light": ["Tajawal-Light"],
        "tajawal-medium": ["Tajawal-Medium"],
        "tajawal-regular": ["Tajawal-Regular"],
      },
    },
  },
  plugins: [],
}