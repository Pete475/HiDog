/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        sand: {
          50: "#faf8f5",
          100: "#f3efe8",
          200: "#e8dfd2",
          300: "#d9c9b5",
          400: "#c4ab8f",
          500: "#b39272",
          600: "#9c7a5e",
          700: "#80634e",
          800: "#695242",
          900: "#564437",
        },
        /** Ocean / sky blues */
        lagoon: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
        },
        /** Tropical greens — emerald / island foliage */
        palm: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
        },
        slatemuted: {
          50: "#f6f7f8",
          100: "#eceef0",
          200: "#d5d9de",
          300: "#b0b7c0",
          400: "#858f9c",
          500: "#677281",
          600: "#525b68",
          700: "#434a55",
          800: "#3a3f48",
          900: "#32363d",
        },
      },
      fontFamily: {
        sans: ["DM Sans", "system-ui", "sans-serif"],
        display: ["Fraunces", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
