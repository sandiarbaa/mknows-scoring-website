import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#F7FCFB",
        ijoToska: "#4AC1A2",
        tulisan: "#9E9E9E",
      },
      container: {
        center: true,
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: false, // Disable all themes and use default DaisyUI light and dark themes
    darkTheme: "light", // Set dark mode theme
    base: true, // Apply base styles
    styled: true, // Include DaisyUI component styles
    utils: true, // Include DaisyUI utility classes
    prefix: "", // No prefix
    logs: false, // Disable logs
    themeRoot: ":root", // Use :root for theme colors
  },
  // daisyui: {
  //   themes: ["light"],
  // },
};
export default config;
