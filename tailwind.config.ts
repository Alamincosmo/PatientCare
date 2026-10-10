import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bone: {
          50: "#F9F8F6", // approx bg-bone-50
          100: "#F1EFE9",
        },
        ink: {
          700: "#333333",
          800: "#1A1A1A",
          900: "#000000",
        },
        primary: {
          50: "#e0f2fe",
          600: "#0284c7", // blue/teal maybe? Wait, I'll use a nice teal
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
        },
        accent: {
          50: "#fdf4ff",
          300: "#f0abfc",
          500: "#d946ef",
          600: "#c026d3",
        },
        border: {
          subtle: "#E5E5E5",
        }
      },
      backgroundImage: {
        "gradient-hero": "linear-gradient(135deg, #0c4a6e 0%, #082f49 100%)",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-sans)", "sans-serif"],
        bangla: ["sans-serif"], // just a fallback
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        brand: "0 4px 14px 0 rgba(2, 132, 199, 0.39)",
      }
    },
  },
  plugins: [],
};

export default config;
