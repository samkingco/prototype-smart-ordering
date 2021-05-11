import { color } from "@echo-health/tokens";

const theme = {
  breakpoints: {
    l: "1024px",
    m: "800px",
    s: "425px",
  },
  spacing: {
    xs: "4px",
    s: "8px",
    m: "16px",
    l: "24px",
    xl: "32px",
    xxl: "48px",
  },
  typography: {
    displayFamily: "Cahuenga, sans-serif",
    bodyFamily: "IBM Plex Sans, sans-serif",
    weight: {
      bold: "500",
      normal: "400",
    },
    size: {
      xs: "0.75rem",
      s: "0.875rem",
      m: "1rem",
      l: "1.25rem",
      xl: "1.5rem",
      xxl: "2rem",
    },
    lineHeight: {
      // This should align the font sizes to a nice 4pt baseline grid
      xs: "1.5",
      s: "1.42",
      m: "1.5",
      l: "1.4",
      xl: "1.5",
      xxl: "1.5",
    },
  },
  color: {
    ...color,
    // New brand colors
    sea: "#A5E0F1",
  },

  nhslogincolor: {
    blue: "#005EB8",
    highlight: "#0973dc",
  },
  misc: {
    borderRadius: "4px",
  },
  shadow: {
    depth1: "0px 0px 1px rgba(0, 0, 0, 0.08), 0px 2px 8px rgba(0, 0, 0, 0.08)",
    depth2: "0px 1px 4px rgba(0, 0, 0, 0.16), 0px 2px 16px rgba(0, 0, 0, 0.08)",
    depth3: "0px 1px 4px rgba(0, 0, 0, 0.16), 0px 8px 40px rgba(0, 0, 0, 0.16)",
    focusRing: "0 0 0 4px",
  },
};

export default theme;
