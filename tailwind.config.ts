import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        pry: "#006089",
        sec: "#BED600",
        ecobankBlue: "rgb(2, 130, 173)",
        ecobankGreen: "rgb(177, 220, 48)",
        ecobankTeal: "rgb(2, 52, 72)",
        ecobankLightTeal: "rgb(0, 91, 130)",
        ecobankLightBlue: "rgba(192, 230, 247, 1)",
        endRed: "rgba(179, 38, 30, 1)",
        error: "#B3261E",
        darkBlue: "#005A86"
      },
      fontFamily: {
        "Inter-Thin": ["Inter-Thin"],
        "Inter-Extralight": ["Inter-Extralight"],
        "Inter-Light": ["Inter-Light"],
        "Inter-Regular": ["Inter-Regular"],
        "Inter-Medium": ["Inter-Medium"],
        "Inter-Bold": ["Inter-Bold"],
        "Killam-Bold": ["Killam-Bold"],
        "Inter-Extrabold": ["Inter-Extrabold"],
        "Inter-Black": ["Inter-Black"],
        "Aladin-Regular": ["Aladin-Regular"],
        "ABeeZee-Regular": ["ABeeZee-Regular"],
      }
    },
  },
  plugins: [],
};
export default config;
