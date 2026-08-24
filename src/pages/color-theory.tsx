import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FiCopy,
  FiSave,
  FiTrash2,
  FiPlus,
  FiBookOpen,
  FiArrowLeft,
  FiGrid,
  FiEye,
  FiCode,
  FiSliders,
  FiEdit3,
  FiSun,
  FiMoon
} from "react-icons/fi";

// ==========================================
// COLOR MATHEMATICS & UTILITIES
// ==========================================

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1));
  return [
    Math.round(255 * f(0)),
    Math.round(255 * f(8)),
    Math.round(255 * f(4))
  ];
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (c: number) => {
    const hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function hexToRgb(hex: string): [number, number, number] | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16)
    ]
    : null;
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function getLuminance(r: number, g: number, b: number): number {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function getContrastRatio(
  rgb1: [number, number, number],
  rgb2: [number, number, number]
): number {
  const l1 = getLuminance(rgb1[0], rgb1[1], rgb1[2]);
  const l2 = getLuminance(rgb2[0], rgb2[1], rgb2[2]);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

function getWCAGRating(ratio: number) {
  return {
    normalAA: ratio >= 4.5,
    normalAAA: ratio >= 7,
    largeAA: ratio >= 3,
    largeAAA: ratio >= 4.5
  };
}

function simulateColorBlindness(
  r: number,
  g: number,
  b: number,
  type: "protanopia" | "deuteranopia" | "tritanopia" | "achromatopsia"
): [number, number, number] {
  let rSim = 0, gSim = 0, bSim = 0;

  switch (type) {
    case "protanopia":
      rSim = r * 0.567 + g * 0.433;
      gSim = r * 0.558 + g * 0.442;
      bSim = g * 0.242 + b * 0.758;
      break;
    case "deuteranopia":
      rSim = r * 0.625 + g * 0.375;
      gSim = r * 0.7 + g * 0.3;
      bSim = g * 0.3 + b * 0.7;
      break;
    case "tritanopia":
      rSim = r * 0.95 + g * 0.05;
      gSim = g * 0.433 + b * 0.567;
      bSim = g * 0.475 + b * 0.525;
      break;
    case "achromatopsia":
      const gray = r * 0.299 + g * 0.587 + b * 0.114;
      rSim = gray;
      gSim = gray;
      bSim = gray;
      break;
    default:
      return [r, g, b];
  }

  return [
    Math.max(0, Math.min(255, Math.round(rSim))),
    Math.max(0, Math.min(255, Math.round(gSim))),
    Math.max(0, Math.min(255, Math.round(bSim)))
  ];
}

interface ColorItem {
  h: number;
  s: number;
  l: number;
  hex: string;
  rgb: [number, number, number];
  role: string;
  notes: string;
}

interface SavedProject {
  id: string;
  title: string;
  notes: string;
  harmonyMode: string;
  baseHue: number;
  baseSaturation: number;
  baseLightness: number;
  palette: ColorItem[];
  date: string;
}

const PRESETS = [
  {
    title: "Zen Forest Sanctuary",
    harmonyMode: "monochromatic",
    baseHue: 142,
    baseSaturation: 45,
    baseLightness: 35,
    notes: "Muted deep forest green tones. Conveys growth, serenity, and organic grounding. Perfect for wellness portals, architectural portfolios, and environmental brands where subtle gradients build atmosphere without visual noise.",
    palette: [
      { h: 142, s: 45, l: 35, role: "Base Dominant", notes: "Rich forest green for headers and primary branding." },
      { h: 142, s: 36, l: 60, role: "Accent Soft", notes: "Softer sage shade for alert overlays or dashboard cards." },
      { h: 142, s: 40, l: 50, role: "Interactive States", notes: "Mid-tone green representing active tabs and links." },
      { h: 142, s: 40, l: 20, role: "Typography Primary", notes: "Ultra-dark forest tone to serve as high-contrast body text." },
      { h: 142, s: 31, l: 85, role: "Surface Borders", notes: "Very light green tint for borders and dividers." }
    ]
  },
  {
    title: "Cyberpunk Neon",
    harmonyMode: "complementary",
    baseHue: 320,
    baseSaturation: 95,
    baseLightness: 50,
    notes: "Vibrant hot pink paired with electric green-cyan. Creates a futuristic, high-contrast, high-energy UI. Opposing hues generate maximum visual vibration and excitement, ideal for gaming interfaces, tech streams, or dark theme branding.",
    palette: [
      { h: 320, s: 95, l: 50, role: "Primary Laser Pink", notes: "Vibrant hot pink for focal hero components, key titles, and brand identity." },
      { h: 140, s: 95, l: 50, role: "Electric Cyan Accent", notes: "Opposing neon hue to highlight buttons and drive action callouts." }
    ]
  },
  {
    title: "Earthy Sunset",
    harmonyMode: "analogous",
    baseHue: 24,
    baseSaturation: 85,
    baseLightness: 55,
    notes: "Warm gradient of burnt orange, warm scarlet, and golden honey. Analogous schemes use colors adjacent to each other on the color wheel. This replicates natural light transitions like sunsets, fostering trust, optimism, and retro comfort.",
    palette: [
      { h: 24, s: 85, l: 55, role: "Brand Orange (Base)", notes: "Warm orange representing friendly and creative core brand elements." },
      { h: 354, s: 85, l: 55, role: "Warm Scarlet (Left)", notes: "Red tone for primary text headings, alerts, or active buttons." },
      { h: 54, s: 85, l: 55, role: "Honey Yellow (Right)", notes: "Secondary warm accent for icons, highlight cards, and hover effects." }
    ]
  },
  {
    title: "Ocean Breeze",
    harmonyMode: "split-complementary",
    baseHue: 205,
    baseSaturation: 80,
    baseLightness: 45,
    notes: "Professional royal blue accented by warm coral-orange and mustard-amber. A split-complementary scheme reduces the harshness of a direct complement while maintaining high contrast. It projects safety, trust, and inviting corporate energy.",
    palette: [
      { h: 205, s: 80, l: 45, role: "Deep Sky Blue (Base)", notes: "Conveys corporate trust, stability, and clean security." },
      { h: 355, s: 80, l: 45, role: "Coral Red-Orange", notes: "Primary CTA button to capture attention immediately." },
      { h: 55, s: 80, l: 45, role: "Mustard Gold", notes: "Secondary support accent for badges, stars, and discount banners." }
    ]
  },
  {
    title: "Vintage Editorial",
    harmonyMode: "triadic",
    baseHue: 350,
    baseSaturation: 65,
    baseLightness: 40,
    notes: "Earthy crimson, muted olive sage, and deep slate blue. Triadic schemes offer balanced contrast through colors spaced 120 degrees apart. This combination is sophisticated, editorial, and classic, perfect for arts, museums, or luxury publications.",
    palette: [
      { h: 350, s: 65, l: 40, role: "Earthy Crimson (Base)", notes: "Strong editorial primary tone representing passion and intellectual focus." },
      { h: 110, s: 65, l: 40, role: "Sage Olive Green", notes: "Secondary grounding tone for quotes, borders, and sidebar backdrops." },
      { h: 230, s: 65, l: 40, role: "Deep Slate Blue", notes: "Professional link colors and secondary action items." }
    ]
  }
];

export default function ColorTheoryLab() {
  const { isDark } = useTheme();

  // Primary Color Wheel Coordinates & Values
  const [baseHue, setBaseHue] = useState<number>(210);
  const [baseSaturation, setBaseSaturation] = useState<number>(85);
  const [baseLightness, setBaseLightness] = useState<number>(50);
  const [harmonyMode, setHarmonyMode] = useState<string>("complementary");
  const [palette, setPalette] = useState<ColorItem[]>([]);

  // Base Hex Code input state (Two-Way Binding)
  const [baseHexInput, setBaseHexInput] = useState<string>("#2b82d9");

  // Swatch configuration sliders drawer tracker
  const [activeSlidersIndex, setActiveSlidersIndex] = useState<number | null>(null);

  // Mockup theme mode context (just for sandbox preview card)
  const [mockupDarkMode, setMockupDarkMode] = useState<boolean>(true);
  const [mockupBgOverride, setMockupBgOverride] = useState<string | null>(null);
  const [mockupTextOverride, setMockupTextOverride] = useState<string | null>(null);

  // Custom contrast tester states (foreground & background)
  const [customFgColor, setCustomFgColor] = useState<string>("#1e293b");
  const [customBgColor, setCustomBgColor] = useState<string>("#ffffff");

  // Notebook Content
  const [notebookTitle, setNotebookTitle] = useState<string>("Brand Studio Palette");
  const [notebookNotes, setNotebookNotes] = useState<string>(
    "A custom color palette generated using color wheel harmony rules. Edit this text block to define your design logic, brand emotional positioning, or project guidelines."
  );

  // Saved Projects (from LocalStorage)
  const [savedProjects, setSavedProjects] = useState<SavedProject[]>([]);
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null);

  // Interactive UI Tabs
  const [activeTab, setActiveTab] = useState<"notebook" | "contrast" | "simulator" | "export">("notebook");
  const tabIds = ["notebook", "contrast", "simulator", "export"] as const;

  const handleTabKeyDown = (e: React.KeyboardEvent, index: number) => {
    let newIndex = index;
    if (e.key === "ArrowRight") {
      newIndex = (index + 1) % tabIds.length;
    } else if (e.key === "ArrowLeft") {
      newIndex = (index - 1 + tabIds.length) % tabIds.length;
    } else if (e.key === "Home") {
      newIndex = 0;
    } else if (e.key === "End") {
      newIndex = tabIds.length - 1;
    } else {
      return;
    }
    e.preventDefault();
    setActiveTab(tabIds[newIndex]);
    const nextTabEl = document.getElementById(`tab-${tabIds[newIndex]}`);
    if (nextTabEl) {
      nextTabEl.focus();
    }
  };

  // Dragging mechanics on the SVG wheel
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const wheelRef = useRef<SVGSVGElement | null>(null);

  // Math: HSL to HEX/RGB generator for harmony offsets
  const generatePalette = useCallback((
    h: number,
    s: number,
    l: number,
    mode: string,
    overrides?: { s: number; l: number }[]
  ): ColorItem[] => {
    const getFinalSL = (idx: number, defS: number, defL: number) => {
      if (overrides && overrides[idx]) {
        return [overrides[idx].s, overrides[idx].l];
      }
      return [defS, defL];
    };

    switch (mode) {
      case "monochromatic": {
        return Array.from({ length: 5 }).map((_, i) => {
          const defaultS = Math.round(s * (1 - i * 0.12));
          const defaultL = Math.max(
            10,
            Math.min(95, Math.round(l + (i - 2) * 15))
          );
          const [finalS, finalL] = getFinalSL(i, defaultS, defaultL);
          const rgb = hslToRgb(h, finalS, finalL);
          return {
            h,
            s: finalS,
            l: finalL,
            hex: rgbToHex(rgb[0], rgb[1], rgb[2]),
            rgb,
            role: i === 0 ? "Dominant Base" : `Shade ${i}`,
            notes: i === 0 ? "Core brand hue anchor" : "Supporting gradient surface color."
          };
        });
      }
      case "analogous": {
        const offsets = [0, -30, 30];
        return offsets.map((offset, i) => {
          const nodeH = (h + offset + 360) % 360;
          const [finalS, finalL] = getFinalSL(i, s, l);
          const rgb = hslToRgb(nodeH, finalS, finalL);
          return {
            h: nodeH,
            s: finalS,
            l: finalL,
            hex: rgbToHex(rgb[0], rgb[1], rgb[2]),
            rgb,
            role: i === 0 ? "Primary Base" : i === 1 ? "Supporting Warm" : "Supporting Cool",
            notes: i === 0 ? "Primary visual anchor." : "Harmonizing secondary background accent."
          };
        });
      }
      case "complementary": {
        const offsets = [0, 180];
        return offsets.map((offset, i) => {
          const nodeH = (h + offset) % 360;
          const [finalS, finalL] = getFinalSL(i, s, l);
          const rgb = hslToRgb(nodeH, finalS, finalL);
          return {
            h: nodeH,
            s: finalS,
            l: finalL,
            hex: rgbToHex(rgb[0], rgb[1], rgb[2]),
            rgb,
            role: i === 0 ? "Dominant Brand" : "Contrast Accent",
            notes: i === 0 ? "Core identity focus color." : "Opposing CTA button accent for clicks."
          };
        });
      }
      case "split-complementary": {
        const offsets = [0, 150, 210];
        return offsets.map((offset, i) => {
          const nodeH = (h + offset) % 360;
          const [finalS, finalL] = getFinalSL(i, s, l);
          const rgb = hslToRgb(nodeH, finalS, finalL);
          return {
            h: nodeH,
            s: finalS,
            l: finalL,
            hex: rgbToHex(rgb[0], rgb[1], rgb[2]),
            rgb,
            role: i === 0 ? "Dominant Base" : i === 1 ? "Accent Split A" : "Accent Split B",
            notes: i === 0 ? "Primary layout canvas tone." : "Vibrant border highlight component."
          };
        });
      }
      case "triadic": {
        const offsets = [0, 120, 240];
        return offsets.map((offset, i) => {
          const nodeH = (h + offset) % 360;
          const [finalS, finalL] = getFinalSL(i, s, l);
          const rgb = hslToRgb(nodeH, finalS, finalL);
          return {
            h: nodeH,
            s: finalS,
            l: finalL,
            hex: rgbToHex(rgb[0], rgb[1], rgb[2]),
            rgb,
            role: i === 0 ? "Dominant Base" : i === 1 ? "Secondary Highlight" : "Tertiary Action",
            notes: i === 0 ? "Primary core theme tone." : "Action points and links color."
          };
        });
      }
      case "tetradic": {
        const offsets = [0, 30, 180, 210];
        return offsets.map((offset, i) => {
          const nodeH = (h + offset) % 360;
          const [finalS, finalL] = getFinalSL(i, s, l);
          const rgb = hslToRgb(nodeH, finalS, finalL);
          return {
            h: nodeH,
            s: finalS,
            l: finalL,
            hex: rgbToHex(rgb[0], rgb[1], rgb[2]),
            rgb,
            role: `Quad Swatch ${i + 1}`,
            notes: i === 0 ? "Base layout anchor." : "Balanced color divider element."
          };
        });
      }
      default:
        return [];
    }
  }, []);

  // Initialize palette on load
  useEffect(() => {
    const initialPalette = generatePalette(
      baseHue,
      baseSaturation,
      baseLightness,
      harmonyMode
    );
    setPalette(initialPalette);

    const stored = localStorage.getItem("sachin_color_lab_projects");
    if (stored) {
      try {
        setSavedProjects(JSON.parse(stored));
      } catch (e) {
        console.error(e);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [generatePalette]);

  // Two-way binding: Update hexInput string state whenever the base color HSL shifts
  useEffect(() => {
    const rgb = hslToRgb(baseHue, baseSaturation, baseLightness);
    const hex = rgbToHex(rgb[0], rgb[1], rgb[2]);
    setBaseHexInput(hex);
  }, [baseHue, baseSaturation, baseLightness]);

  // Update palette when base parameters or harmony changes
  useEffect(() => {
    setPalette((prevPalette) => {
      const currentRoles = prevPalette.map((c) => c.role);
      const currentNotes = prevPalette.map((c) => c.notes);

      const generated = generatePalette(
        baseHue,
        baseSaturation,
        baseLightness,
        harmonyMode
      );

      return generated.map((col, index) => {
        return {
          ...col,
          role: currentRoles[index] || col.role,
          notes: currentNotes[index] || col.notes
        };
      });
    });
  }, [baseHue, baseSaturation, baseLightness, harmonyMode, generatePalette]);

  // Offset helpers to map child hues back to base hue during node dragging
  const getHueOffsetForIndex = (idx: number, mode: string): number => {
    if (idx === 0) return 0;
    switch (mode) {
      case "analogous":
        return idx === 1 ? -30 : 30;
      case "complementary":
        return 180;
      case "split-complementary":
        return idx === 1 ? 150 : 210;
      case "triadic":
        return idx === 1 ? 120 : 240;
      case "tetradic":
        return idx === 1 ? 30 : idx === 2 ? 180 : 210;
      default:
        return 0;
    }
  };

  // Drag mechanics handler
  const handleDrag = useCallback((clientX: number, clientY: number) => {
    if (draggedIndex === null || !wheelRef.current) return;

    const rect = wheelRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = clientX - centerX;
    const dy = clientY - centerY;

    let adjustedAngleRad = Math.atan2(dy, dx) + Math.PI / 2;
    if (adjustedAngleRad < 0) {
      adjustedAngleRad += 2 * Math.PI;
    }
    const hue = Math.round((adjustedAngleRad * 180) / Math.PI) % 360;

    const distance = Math.sqrt(dx * dx + dy * dy);
    // Expand click radius slightly beyond boundaries for smooth edge picks
    const maxRadius = 135;
    const saturation = Math.min(
      100,
      Math.max(0, Math.round((distance / maxRadius) * 100))
    );

    if (draggedIndex === 0) {
      setBaseHue(hue);
      setBaseSaturation(saturation);
    } else {
      const offset = getHueOffsetForIndex(draggedIndex, harmonyMode);
      const newBase = (hue - offset + 360) % 360;
      setBaseHue(newBase);
      setBaseSaturation(saturation);
    }
  }, [draggedIndex, harmonyMode]);

  // Handle keyboard adjustments for color wheel nodes (hue and saturation)
  const handleWheelKeyDown = (e: React.KeyboardEvent, idx: number) => {
    const col = palette[idx];
    if (!col) return;

    let handled = false;
    let newHue = col.h;
    let newSat = col.s;

    if (e.shiftKey) {
      // Shift + ArrowUp/ArrowRight = Saturation +5%
      // Shift + ArrowDown/ArrowLeft = Saturation -5%
      if (e.key === "ArrowUp" || e.key === "ArrowRight") {
        newSat = Math.min(100, col.s + 5);
        handled = true;
      } else if (e.key === "ArrowDown" || e.key === "ArrowLeft") {
        newSat = Math.max(0, col.s - 5);
        handled = true;
      }
    } else {
      // ArrowUp/ArrowRight = Hue +5 degrees
      // ArrowDown/ArrowLeft = Hue -5 degrees
      if (e.key === "ArrowUp" || e.key === "ArrowRight") {
        newHue = (col.h + 5) % 360;
        handled = true;
      } else if (e.key === "ArrowDown" || e.key === "ArrowLeft") {
        newHue = (col.h - 5 + 360) % 360;
        handled = true;
      } else if (e.key === "Home") {
        newHue = 0;
        handled = true;
      } else if (e.key === "End") {
        newHue = 359;
        handled = true;
      }
    }

    if (handled) {
      e.preventDefault();
      if (idx === 0) {
        setBaseHue(newHue);
        setBaseSaturation(newSat);
      } else {
        const offset = getHueOffsetForIndex(idx, harmonyMode);
        const newBase = (newHue - offset + 360) % 360;
        setBaseHue(newBase);
        setBaseSaturation(newSat);
      }
    }
  };

  // Global mousemove/mouseup listeners for smooth dragging outside the wheel bounds
  useEffect(() => {
    const handleGlobalMove = (e: MouseEvent) => {
      if (isDragging) {
        handleDrag(e.clientX, e.clientY);
      }
    };

    const handleGlobalTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length > 0) {
        handleDrag(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleGlobalUp = () => {
      setIsDragging(false);
      setDraggedIndex(null);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleGlobalMove);
      window.addEventListener("mouseup", handleGlobalUp);
      window.addEventListener("touchmove", handleGlobalTouchMove);
      window.addEventListener("touchend", handleGlobalUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleGlobalMove);
      window.removeEventListener("mouseup", handleGlobalUp);
      window.removeEventListener("touchmove", handleGlobalTouchMove);
      window.removeEventListener("touchend", handleGlobalUp);
    };
  }, [isDragging, handleDrag]);

  // Direct user HEX input editor (updates Base hue, saturation, lightness)
  const handleHexInputEdit = (val: string) => {
    setBaseHexInput(val);
    let clean = val.replace("#", "").trim();
    if (clean.length === 3) {
      clean = clean[0] + clean[0] + clean[1] + clean[1] + clean[2] + clean[2];
    }
    if (clean.length === 6) {
      const rgb = hexToRgb(clean);
      if (rgb) {
        const [h, s, l] = rgbToHsl(rgb[0], rgb[1], rgb[2]);
        setBaseHue(h);
        setBaseSaturation(s);
        setBaseLightness(l);
      }
    }
  };

  // Adjust sliders on individual colors
  const handleColorOverride = (idx: number, field: "s" | "l", value: number) => {
    setPalette((prev) => {
      const next = [...prev];
      const target = { ...next[idx] };
      if (field === "s") target.s = value;
      if (field === "l") target.l = value;

      const rgb = hslToRgb(target.h, target.s, target.l);
      target.hex = rgbToHex(rgb[0], rgb[1], rgb[2]);
      target.rgb = rgb;

      next[idx] = target;

      if (idx === 0) {
        if (field === "s") setBaseSaturation(value);
        if (field === "l") setBaseLightness(value);
      }

      return next;
    });
  };

  const handleRoleChange = (idx: number, val: string) => {
    setPalette((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], role: val };
      return next;
    });
  };

  const loadPreset = (preset: typeof PRESETS[0]) => {
    setBaseHue(preset.baseHue);
    setBaseSaturation(preset.baseSaturation);
    setBaseLightness(preset.baseLightness);
    setHarmonyMode(preset.harmonyMode);
    setNotebookTitle(preset.title);
    setNotebookNotes(preset.notes);

    const generated = generatePalette(
      preset.baseHue,
      preset.baseSaturation,
      preset.baseLightness,
      preset.harmonyMode
    );
    const merged = generated.map((col, i) => ({
      ...col,
      role: preset.palette[i]?.role || col.role,
      notes: preset.palette[i]?.notes || col.notes
    }));

    setPalette(merged);
    setActiveProjectIndex(null);
    toast.info(`Loaded Preset: ${preset.title}`);
  };

  const saveProject = () => {
    if (!notebookTitle.trim()) {
      toast.warning("Please provide a palette title before saving.");
      return;
    }

    const payload: SavedProject = {
      id: activeProjectIndex !== null ? savedProjects[activeProjectIndex].id : Date.now().toString(),
      title: notebookTitle,
      notes: notebookNotes,
      harmonyMode,
      baseHue,
      baseSaturation,
      baseLightness,
      palette,
      date: new Date().toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric"
      })
    };

    let updated: SavedProject[] = [];
    if (activeProjectIndex !== null) {
      updated = [...savedProjects];
      updated[activeProjectIndex] = payload;
      toast.success("Palette changes updated successfully!");
    } else {
      updated = [payload, ...savedProjects];
      setActiveProjectIndex(0);
      toast.success("Palette saved to your local notebook!");
    }

    setSavedProjects(updated);
    localStorage.setItem("sachin_color_lab_projects", JSON.stringify(updated));
  };

  const loadSavedProject = (idx: number) => {
    const proj = savedProjects[idx];
    setNotebookTitle(proj.title);
    setNotebookNotes(proj.notes);
    setHarmonyMode(proj.harmonyMode);
    setBaseHue(proj.baseHue);
    setBaseSaturation(proj.baseSaturation);
    setBaseLightness(proj.baseLightness);
    setPalette(proj.palette);
    setActiveProjectIndex(idx);
    toast.info(`Loaded Palette: ${proj.title}`);
  };

  const deleteSavedProject = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = savedProjects.filter((_, i) => i !== idx);
    setSavedProjects(updated);
    localStorage.setItem("sachin_color_lab_projects", JSON.stringify(updated));
    if (activeProjectIndex === idx) {
      setActiveProjectIndex(null);
      setNotebookTitle("Custom Brand Palette");
    } else if (activeProjectIndex !== null && activeProjectIndex > idx) {
      setActiveProjectIndex(activeProjectIndex - 1);
    }
    toast.error("Palette deleted from notebook.");
  };

  const startNewProject = () => {
    setNotebookTitle("My Brand Palette");
    setNotebookNotes("Enter custom brand colors notes here...");
    setBaseHue(210);
    setBaseSaturation(85);
    setBaseLightness(50);
    setHarmonyMode("complementary");
    setActiveProjectIndex(null);
    toast.info("Created a fresh palette.");
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`Copied ${label} to clipboard!`);
  };

  const exportCSS = () => {
    const vars = palette
      .map((col) => `  --color-${col.role.toLowerCase().replace(/[^a-z0-9]/g, "-")}: ${col.hex}; /* HSL(${col.h}, ${col.s}%, ${col.l}%) */`)
      .join("\n");
    return `:root {\n${vars}\n}`;
  };

  const exportTailwind = () => {
    const entries = palette
      .map((col) => `        "${col.role.toLowerCase().replace(/[^a-z0-9]/g, "-")}": "${col.hex}",`)
      .join("\n");
    return `module.exports = {\n  theme: {\n    extend: {\n      colors: {\n${entries}\n      }\n    }\n  }\n}`;
  };

  const exportJSON = () => {
    return JSON.stringify(
      {
        title: notebookTitle,
        harmony: harmonyMode,
        colors: palette.map((c) => ({
          hex: c.hex,
          rgb: c.rgb,
          hsl: [c.h, c.s, c.l],
          role: c.role,
          notes: c.notes
        }))
      },
      null,
      2
    );
  };

  const getCoordinatesForHue = (h: number, s: number, radius = 100) => {
    const angleRad = ((h - 90) * Math.PI) / 180;
    const center = 150;
    const distanceFactor = s / 100;
    const x = center + radius * distanceFactor * Math.cos(angleRad);
    const y = center + radius * distanceFactor * Math.sin(angleRad);
    return { x, y };
  };

  const renderConnectors = () => {
    if (palette.length === 0) return null;

    const coords = palette.map((col) => getCoordinatesForHue(col.h, col.s, 135));

    if (harmonyMode === "complementary" && coords.length >= 2) {
      return (
        <line
          x1={coords[0].x}
          y1={coords[0].y}
          x2={coords[1].x}
          y2={coords[1].y}
          className="stroke-[#B88E6A] dark:stroke-[#93C5FD] stroke-[2.5]"
          strokeDasharray="6 6"
        />
      );
    }
    if (
      (harmonyMode === "triadic" || harmonyMode === "split-complementary") &&
      coords.length >= 3
    ) {
      const points = coords.map((c) => `${c.x},${c.y}`).join(" ");
      return (
        <polygon
          points={points}
          className="fill-transparent stroke-[#B88E6A] dark:stroke-[#93C5FD] stroke-[2]"
        />
      );
    }
    if (harmonyMode === "analogous" && coords.length >= 3) {
      return (
        <>
          <line
            x1={coords[0].x}
            y1={coords[0].y}
            x2={coords[1].x}
            y2={coords[1].y}
            className="stroke-[#B88E6A] dark:stroke-[#93C5FD] stroke-[2]"
          />
          <line
            x1={coords[0].x}
            y1={coords[0].y}
            x2={coords[2].x}
            y2={coords[2].y}
            className="stroke-[#B88E6A] dark:stroke-[#93C5FD] stroke-[2]"
          />
        </>
      );
    }
    if (harmonyMode === "tetradic" && coords.length >= 4) {
      const points = `${coords[0].x},${coords[0].y} ${coords[1].x},${coords[1].y} ${coords[2].x},${coords[2].y} ${coords[3].x},${coords[3].y}`;
      return (
        <polygon
          points={points}
          className="fill-transparent stroke-[#B88E6A] dark:stroke-[#93C5FD] stroke-[2]"
        />
      );
    }
    if (harmonyMode === "monochromatic" && coords.length >= 2) {
      const maxCoord = coords[coords.length - 1];
      const minCoord = getCoordinatesForHue(baseHue, 0, 135);
      return (
        <line
          x1={minCoord.x}
          y1={minCoord.y}
          x2={maxCoord.x}
          y2={maxCoord.y}
          className="stroke-[#B88E6A] dark:stroke-[#93C5FD] stroke-[2]"
        />
      );
    }
    return null;
  };

  const baseColor = palette[0]?.hex || "#3b82f6";
  const accentColor = palette[1]?.hex || palette[0]?.hex || "#10b981";
  const secondaryColor = palette[2]?.hex || "#f59e0b";

  // Calculate Mockup background color based on selection
  const bgMockup = mockupBgOverride || (mockupDarkMode ? "#0e1310" : "#ffffff");

  // Calculate Mockup text color based on best contrast against the selected background
  const textColor = (() => {
    const bgRgb = hexToRgb(bgMockup) || [0, 0, 0];
    const whiteRgb: [number, number, number] = [248, 250, 252]; // #f8fafc
    const darkRgb: [number, number, number] = [15, 23, 42];    // #0f172a

    let bestColor = mockupDarkMode ? "#f8fafc" : "#0f172a";
    let maxRatio = getContrastRatio(mockupDarkMode ? whiteRgb : darkRgb, bgRgb);

    // Check white contrast
    const whiteRatio = getContrastRatio(whiteRgb, bgRgb);
    if (whiteRatio > maxRatio) {
      maxRatio = whiteRatio;
      bestColor = "#f8fafc";
    }

    // Check dark slate contrast
    const darkRatio = getContrastRatio(darkRgb, bgRgb);
    if (darkRatio > maxRatio) {
      maxRatio = darkRatio;
      bestColor = "#0f172a";
    }

    // Check palette colors
    palette.forEach((col) => {
      const ratio = getContrastRatio(col.rgb, bgRgb);
      if (ratio > maxRatio) {
        maxRatio = ratio;
        bestColor = col.hex;
      }
    });

    return bestColor;
  })();

  const resolvedMockupTextColor = mockupTextOverride || textColor;

  // Primary action button background (avoid matching mockup background)
  const mockupBtnColor = (() => {
    if (palette.length === 0) return "#3b82f6";
    const primaryHex = palette[0].hex;
    if (bgMockup.toLowerCase() === primaryHex.toLowerCase()) {
      return palette[1]?.hex || palette[0]?.hex || "#3b82f6";
    }
    return primaryHex;
  })();

  // Primary button text color with best contrast
  const mockupBtnTextColor = (() => {
    const btnRgb = hexToRgb(mockupBtnColor) || [59, 130, 246];
    const whiteContrast = getContrastRatio([255, 255, 255], btnRgb);
    const darkContrast = getContrastRatio([15, 23, 42], btnRgb);
    return whiteContrast > darkContrast ? "#ffffff" : "#0f172a";
  })();

  return (
    <>
      <ToastContainer position="top-right" theme={isDark ? "dark" : "light"} />

      <Seo
        title="Color Wheel & Palette Design Lab | Sachin.dev"
        description="A professional, highly interactive design utility built to explore color wheel harmonies, evaluate contrast accessibility, simulate color blindness, and draft custom palettes with local saving."
        keywords="Color Wheel, Color Theory, Color Harmonies, Accessibility, WCAG Contrast Checker, Color Blindness Simulator, Branding Tool, CSS Generator"
        url="https://sachindev.vercel.app/color-theory"
      />

      <div
        className={`relative min-h-screen w-full max-w-full overflow-x-hidden flex flex-col transition-colors duration-300 font-sans ${isDark ? "bg-[#0b0e0c] text-[#e2e8f0]" : "bg-[#f8fafc] text-[#1e293b]"
          }`}
      >
        <Header />

        {/* Ambient glows */}
        <div className="absolute top-0 left-1/4 w-[35rem] h-[35rem] bg-gradient-to-br from-[#B88E6A]/10 to-[#93C5FD]/10 dark:from-[#B88E6A]/5 dark:to-[#93C5FD]/5 rounded-full blur-[8rem] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[25rem] h-[25rem] bg-gradient-to-tr from-[#93C5FD]/10 to-[#B88E6A]/5 dark:from-[#93C5FD]/5 dark:to-[#B88E6A]/3 rounded-full blur-[6rem] pointer-events-none" />

        <main className="flex-grow container mx-auto px-6 py-8 max-w-7xl relative z-10">

          {/* Header Title Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800/80 pb-6 mb-8">
            <div className="space-y-1">
              <Link
                href="/"
                className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider transition-all mb-2 ${isDark
                    ? "text-[#93C5FD] hover:text-white"
                    : "text-[#185693] hover:text-[#B88E6A]"
                  }`}
              >
                <FiArrowLeft size={14} /> Back to Portfolio
              </Link>
              <h1
                className={`text-3xl font-black bg-gradient-to-r ${isDark ? "from-[#B88E6A] to-[#93C5FD]" : "from-[#B88E6A] to-[#185693]"
                  } bg-clip-text text-transparent tracking-tight`}
              >
                Color Wheel & Design Studio
              </h1>
            </div>

            <p className={`text-xs md:text-sm font-medium max-w-md ${isDark ? "text-slate-400" : "text-slate-600"}`}>
              Directly type a HEX code or drag nodes on the wheel to generate harmonies. Preview contrast metrics, local notebooks and blindness maps.
            </p>
          </div>

          {/* MAIN PAGE LAYOUT GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* LEFT PLAYGROUND: Color Wheel sandbox and Live Mockup (Lg: 7 cols) */}
            <div className="lg:col-span-7 space-y-8">

              {/* Card 1: Color Wheel Studio */}
              <div
                className={`p-6 rounded-3xl border backdrop-blur-xl transition-all ${isDark
                    ? "bg-slate-950/45 border-slate-800/60 shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
                    : "bg-white border-slate-200 shadow-xl shadow-slate-100"
                  }`}
              >
                <div className="flex flex-col md:flex-row items-center justify-around gap-8">
                  {/* Wheel block */}
                  <div className="flex flex-col items-center gap-6">
                    <div className="text-center w-full">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#B88E6A] block">
                        Solid Vector Picker
                      </span>
                      <h3 className="text-lg font-black tracking-tight mt-0.5">Color Wheel</h3>
                    </div>

                    {/* Draggable solid wheel */}
                    <div
                      className={`relative w-[300px] h-[300px] rounded-full p-2 border backdrop-blur-sm shadow-md transition-colors ${isDark ? "border-slate-800 bg-black/25" : "border-slate-200 bg-slate-50"
                        }`}
                    >
                      {/* SOLID COLOR WHEEL (Conic Gradient) */}
                      <div
                        className="w-full h-full rounded-full overflow-hidden relative shadow-inner"
                        style={{
                          background:
                            "conic-gradient(from 0deg, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)"
                        }}
                      >
                        {/* Radial overlay */}
                        <div
                          className="absolute inset-0 pointer-events-none opacity-85"
                          style={{
                            background:
                              "radial-gradient(circle, #ffffff 0%, transparent 80%)"
                          }}
                        />
                      </div>

                      {/* Interactive Drag Vector Surface */}
                      <svg
                        ref={wheelRef}
                        className="absolute inset-0 cursor-crosshair w-full h-full overflow-visible z-20"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          setIsDragging(true);
                          setDraggedIndex(0);
                          handleDrag(e.clientX, e.clientY);
                        }}
                        onTouchStart={(e) => {
                          e.preventDefault();
                          setIsDragging(true);
                          setDraggedIndex(0);
                          if (e.touches.length > 0) {
                            handleDrag(e.touches[0].clientX, e.touches[0].clientY);
                          }
                        }}
                      >
                        {/* Connector shapes */}
                        {renderConnectors()}

                        {/* Interactive Handle Nodes */}
                        {palette.map((col, idx) => {
                          const { x, y } = getCoordinatesForHue(col.h, col.s, 135);
                          const isPrimaryNode = idx === 0;

                           return (
                            <g
                              key={idx}
                              tabIndex={0}
                              role="slider"
                              aria-label={`Color handle ${idx + 1}: ${col.role}`}
                              aria-valuemin={0}
                              aria-valuemax={360}
                              aria-valuenow={col.h}
                              aria-valuetext={`Hue ${col.h} degrees, Saturation ${col.s}%, Lightness ${col.l}%`}
                              onKeyDown={(e) => handleWheelKeyDown(e, idx)}
                              className="group focus:outline-none focus-visible:outline-none cursor-grab active:cursor-grabbing"
                              onMouseDown={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                setIsDragging(true);
                                setDraggedIndex(idx);
                              }}
                              onTouchStart={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                setIsDragging(true);
                                setDraggedIndex(idx);
                              }}
                            >
                              {/* Keyboard focus ring */}
                              <circle
                                cx={x}
                                cy={y}
                                r={isPrimaryNode ? 18 : 15}
                                className="fill-none stroke-[#B88E6A] dark:stroke-[#93C5FD] stroke-[2.5] opacity-0 group-focus-visible:opacity-100 transition-opacity pointer-events-none"
                                style={{ filter: `drop-shadow(0 0 4px ${col.hex})` }}
                              />
                              {/* Glowing node halo */}
                              <circle
                                cx={x}
                                cy={y}
                                r={isPrimaryNode ? 14 : 11}
                                className="fill-transparent transition-all duration-200"
                                style={{
                                  stroke: col.hex,
                                  strokeWidth: isPrimaryNode ? 3 : 2,
                                  filter: `drop-shadow(0 0 5px ${col.hex})`
                                }}
                              />
                              {/* Inner node color */}
                              <circle
                                cx={x}
                                cy={y}
                                r={isPrimaryNode ? 8 : 6}
                                style={{ fill: col.hex }}
                                className="stroke-white stroke-[2] shadow-lg active:scale-125 transition-transform"
                              />
                            </g>
                          );
                        })}
                      </svg>
                    </div>
                  </div>

                  {/* Controller Options Block on the right side of Card 1 */}
                  <div className="flex flex-col justify-center gap-6 w-full max-w-sm">
                    <div className="space-y-1">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#B88E6A] block">
                        Base color coordinate info
                      </span>
                      <div className="flex gap-4 text-xs font-bold font-mono">
                        <span>HUE: {baseHue}°</span>
                        <span>SAT: {baseSaturation}%</span>
                        <span>LIT: {baseLightness}%</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="base-hex-input" className="text-[9px] font-black uppercase tracking-widest text-[#B88E6A] block">
                        Base HEX Code (Editable)
                      </label>
                      <div className="flex gap-2 items-center">
                        <input
                          id="base-color-picker"
                          type="color"
                          value={baseHexInput.startsWith("#") && baseHexInput.length === 7 ? baseHexInput : (() => { let clean = baseHexInput.replace("#", "").trim(); if (clean.length === 3) { clean = clean[0] + clean[0] + clean[1] + clean[1] + clean[2] + clean[2]; } return clean.length === 6 ? "#" + clean : "#000000"; })()}
                          onChange={(e) => handleHexInputEdit(e.target.value)}
                          className="w-10 h-10 rounded-xl cursor-pointer border border-slate-300 dark:border-slate-800 bg-transparent shrink-0"
                          aria-label="Base color picker swatch"
                        />
                        <div className="relative flex-grow">
                          <input
                            id="base-hex-input"
                            type="text"
                            value={baseHexInput}
                            onChange={(e) => handleHexInputEdit(e.target.value)}
                            className={`w-full py-2.5 pl-3 pr-8 rounded-xl border text-xs font-mono font-bold focus:border-[#B88E6A] focus:outline-none uppercase ${isDark ? "bg-black/20 border-slate-800 text-white" : "bg-slate-50 border-slate-200 text-[#185693]"
                              }`}
                            placeholder="#HEXCODE"
                          />
                          <FiEdit3 className="absolute right-3 top-3 text-gray-500" size={14} />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-widest text-[#B88E6A] block">
                        Harmony Select rule
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: "complementary", label: "Complement" },
                          { id: "analogous", label: "Analogous" },
                          { id: "monochromatic", label: "Monochromatic" },
                          { id: "split-complementary", label: "Split" },
                          { id: "triadic", label: "Triadic" },
                          { id: "tetradic", label: "Tetradic" }
                        ].map((item) => (
                          <button
                            key={item.id}
                            onClick={() => setHarmonyMode(item.id)}
                            aria-pressed={harmonyMode === item.id}
                            className={`py-2 px-3 rounded-xl border text-[11px] font-bold text-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B88E6A] dark:focus-visible:ring-[#93C5FD] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 ${harmonyMode === item.id
                                ? isDark
                                  ? "bg-[#93C5FD]/10 border-[#93C5FD] text-[#93C5FD]"
                                  : "bg-[#185693]/15 border-[#185693] text-[#185693]"
                                : isDark
                                  ? "bg-transparent border-slate-850 text-slate-400 hover:text-white"
                                  : "bg-transparent border-slate-200 text-slate-600 hover:text-[#185693]"
                              }`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Visual Swatch Ribbon merged inside Solid Vector Picker */}
                <div className="border-t border-slate-200/20 dark:border-slate-800/60 pt-4 mt-6 w-full space-y-3">
                  <div className="flex justify-between items-center px-1">
                    <span className="text-[9px] font-black uppercase tracking-widest text-[#B88E6A]">
                      Active Harmony Swatches (Click to fine-tune)
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2.5 items-center w-full">
                    {palette.map((col, idx) => {
                      const isSlidersOpen = activeSlidersIndex === idx;
                      return (
                        <div
                          key={idx}
                          className={`flex items-center gap-2 px-2.5 py-1 rounded-xl border transition-all ${
                            isSlidersOpen
                              ? isDark
                                ? "bg-slate-900/40 border-[#93C5FD] ring-1 ring-[#93C5FD]"
                                : "bg-slate-55 border-[#185693] ring-1 ring-[#185693]"
                              : isDark
                              ? "bg-slate-950/20 border-slate-850 hover:border-slate-800"
                              : "bg-slate-50/50 border-slate-200 hover:border-slate-350"
                          }`}
                        >
                          <button
                            type="button"
                            onClick={() => setActiveSlidersIndex(isSlidersOpen ? null : idx)}
                            className="w-6 h-6 rounded border border-black/10 shrink-0 shadow-inner hover:scale-105 active:scale-95 transition-transform focus:outline-none"
                            style={{ backgroundColor: col.hex }}
                            aria-label={`Fine tune ${col.role} (${col.hex})`}
                            aria-expanded={isSlidersOpen}
                          />

                          <div className="min-w-0 flex flex-col justify-center">
                            <input
                              type="text"
                              value={col.role}
                              onChange={(e) => handleRoleChange(idx, e.target.value)}
                              aria-label={`Edit role name for color ${idx + 1}`}
                              className={`text-[8px] font-black uppercase tracking-wider bg-transparent border-none focus:outline-none w-18 truncate ${
                                isDark ? "text-white/80" : "text-[#185693]"
                              }`}
                            />
                            <button
                              type="button"
                              onClick={() => copyToClipboard(col.hex, `HEX ${col.hex}`)}
                              className="text-[9px] font-black font-mono hover:underline inline-block text-left leading-none text-slate-400 focus:outline-none"
                              aria-label={`Copy hex code ${col.hex}`}
                            >
                              {col.hex}
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => setActiveSlidersIndex(isSlidersOpen ? null : idx)}
                            className={`p-0.5 rounded hover:bg-slate-200/50 dark:hover:bg-slate-800 transition-colors focus:outline-none ${
                              isSlidersOpen ? "text-[#B88E6A]" : "text-slate-400"
                            }`}
                            aria-label={`Fine tune ${col.role}`}
                            aria-expanded={isSlidersOpen}
                          >
                            <FiSliders size={10} />
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  {/* Collapsible Sliders Drawer */}
                  <AnimatePresence>
                    {activeSlidersIndex !== null && palette[activeSlidersIndex] && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.18 }}
                        className="border border-slate-200/50 dark:border-slate-850 p-3 rounded-xl bg-slate-100/40 dark:bg-black/10 space-y-2.5 overflow-hidden"
                      >
                        <div className="flex justify-between items-center border-b border-slate-200/10 pb-1 mb-1">
                          <span className="text-[9px] font-black tracking-widest text-[#B88E6A] uppercase">
                            Fine-Tuning: {palette[activeSlidersIndex].role}
                          </span>
                          <span className="text-[9px] font-mono text-slate-400 font-bold">
                            H:{palette[activeSlidersIndex].h}° S:{palette[activeSlidersIndex].s}% L:{palette[activeSlidersIndex].l}%
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <div className="flex justify-between text-[8px] font-black tracking-widest text-[#B88E6A]">
                              <span>SATURATION</span>
                              <span>{palette[activeSlidersIndex].s}%</span>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={palette[activeSlidersIndex].s}
                              onChange={(e) => handleColorOverride(activeSlidersIndex!, "s", parseInt(e.target.value))}
                              aria-label="Saturation slider"
                              className="w-full accent-[#B88E6A] cursor-ew-resize h-1 bg-gray-300 dark:bg-gray-700 rounded-lg appearance-none"
                            />
                          </div>

                          <div className="space-y-1">
                            <div className="flex justify-between text-[8px] font-black tracking-widest text-[#B88E6A]">
                              <span>LIGHTNESS</span>
                              <span>{palette[activeSlidersIndex].l}%</span>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={palette[activeSlidersIndex].l}
                              onChange={(e) => handleColorOverride(activeSlidersIndex!, "l", parseInt(e.target.value))}
                              aria-label="Lightness slider"
                              className="w-full accent-[#B88E6A] cursor-ew-resize h-1 bg-gray-300 dark:bg-gray-700 rounded-lg appearance-none"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Card 2: Interactive Live Preview Mockup */}
              <div
                className={`p-6 rounded-3xl border backdrop-blur-xl transition-all ${isDark
                    ? "bg-slate-950/45 border-slate-800/60 shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
                    : "bg-white border-slate-200 shadow-xl shadow-slate-100"
                  }`}
              >
                <div className="flex flex-col gap-4">
                  {/* Toolbar Header */}
                  <div className="flex items-center justify-between gap-4 border-b border-slate-200/10 dark:border-slate-800/80 pb-4">
                    {/* Left Aligned Card Titles */}
                    <div className="text-left">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#B88E6A] block">
                        Interactive Dashboard Preview
                      </span>
                      <h3 className="text-lg font-black tracking-tight mt-0.5 font-sans">Mockup Canvas</h3>
                    </div>

                    {/* Top Right: Theme Mode Single Toggle Icon Button */}
                    <button
                      type="button"
                      onClick={() => {
                        setMockupDarkMode(!mockupDarkMode);
                        setMockupBgOverride(null);
                        setMockupTextOverride(null);
                      }}
                      className={`p-2.5 rounded-full border transition-all shadow-sm hover:scale-105 active:scale-95 flex items-center justify-center shrink-0 ${
                        isDark
                          ? "bg-slate-900/60 border-slate-800 text-white shadow shadow-[#93C5FD]/5"
                          : "bg-white border-slate-200 text-slate-700 shadow-sm"
                      }`}
                      title={mockupDarkMode ? "Switch to Light theme template" : "Switch to Dark theme template"}
                      aria-label={`Toggle mockup canvas preview theme mode. Currently ${mockupDarkMode ? "Dark Mode" : "Light Mode"} active.`}
                      aria-pressed={mockupDarkMode}
                    >
                      {mockupDarkMode ? (
                        <FiSun size={14} className="text-yellow-500" />
                      ) : (
                        <FiMoon size={14} className="text-blue-500" />
                      )}
                    </button>
                  </div>

                  {/* Responsive Inspector Control Panel (Now 2 columns: Canvas Fill & Typography Fill) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start bg-slate-100/40 dark:bg-slate-900/40 p-4 rounded-2xl border border-slate-200/50 dark:border-slate-850/60 shadow-sm">

                      {/* Section 2: Canvas Background Fill Swatches */}
                      <div className="flex flex-col gap-2 w-full text-left">
                        <span className="text-[9px] font-black text-[#B88E6A] uppercase tracking-widest block">
                          Canvas Fill
                        </span>
                        
                        {/* Row 1: Swatches */}
                        <div className="flex flex-wrap items-center gap-1.5">
                          {/* Default Reset Swatch */}
                          <button
                            onClick={() => setMockupBgOverride(null)}
                            aria-pressed={mockupBgOverride === null}
                            className={`w-6 h-6 rounded-full border text-[8px] font-extrabold flex items-center justify-center transition-all hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B88E6A] dark:focus-visible:ring-[#93C5FD] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 ${
                              mockupBgOverride === null
                                ? "ring-2 ring-[#B88E6A] scale-110"
                                : "opacity-80 hover:opacity-100"
                            }`}
                            style={{
                              backgroundColor: mockupDarkMode ? "#0e1310" : "#ffffff",
                              borderColor: mockupDarkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)",
                              color: mockupDarkMode ? "#ffffff" : "#000000"
                            }}
                            title="Default template background"
                            aria-label={`Default template background color${mockupBgOverride === null ? " - Active" : ""}`}
                          >
                            Def
                          </button>
                          {/* Palette swatch options */}
                          {palette.map((col, idx) => {
                            const isActive = mockupBgOverride?.toLowerCase() === col.hex.toLowerCase();
                            return (
                              <button
                                key={idx}
                                onClick={() => setMockupBgOverride(col.hex)}
                                aria-pressed={isActive}
                                className={`w-6 h-6 rounded-full border transition-all hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B88E6A] dark:focus-visible:ring-[#93C5FD] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 ${
                                  isActive
                                    ? "ring-2 ring-[#B88E6A] scale-110"
                                    : "opacity-80 hover:opacity-100"
                                }`}
                                style={{
                                  backgroundColor: col.hex,
                                  borderColor: "rgba(0,0,0,0.15)"
                                }}
                                title={`Set background to ${col.role} (${col.hex})`}
                                aria-label={`Set background to ${col.role} (${col.hex})${isActive ? " - Active" : ""}`}
                              />
                            );
                          })}
                        </div>
                        {/* Row 2: Custom color picker + HEX input underneath */}
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <input
                            id="custom-bg-picker"
                            type="color"
                            value={mockupBgOverride || (mockupDarkMode ? "#0e1310" : "#ffffff")}
                            onChange={(e) => setMockupBgOverride(e.target.value)}
                            className="w-6 h-6 rounded-md cursor-pointer border border-slate-300 dark:border-slate-800 bg-transparent shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B88E6A] dark:focus-visible:ring-[#93C5FD]"
                            title="Choose custom background color"
                            aria-label="Choose custom background color via picker"
                          />
                          <input
                            id="custom-bg-input"
                            type="text"
                            value={mockupBgOverride || ""}
                            onChange={(e) => setMockupBgOverride(e.target.value)}
                            placeholder="#HEX"
                            aria-label="Choose custom background color via hex input"
                            className={`w-18 py-1 px-1.5 rounded-lg border text-[9px] font-mono font-bold focus:border-[#B88E6A] focus-visible:ring-2 focus-visible:ring-[#B88E6A] dark:focus-visible:ring-[#93C5FD] focus:outline-none uppercase ${
                              isDark ? "bg-black/20 border-slate-800 text-white" : "bg-slate-55 border-slate-200 text-slate-700"
                            }`}
                          />
                        </div>
                      </div>

                      {/* Section 3: Canvas Typography Color Swatches */}
                      <div className="flex flex-col gap-2 w-full text-left">
                        <span className="text-[9px] font-black text-[#B88E6A] uppercase tracking-widest block">
                          Typography Fill
                        </span>
                        {/* Row 1: Swatches */}
                        <div className="flex flex-wrap items-center gap-1.5">
                          {/* Auto reset swatch */}
                          <button
                            onClick={() => setMockupTextOverride(null)}
                            aria-pressed={mockupTextOverride === null}
                            className={`w-6 h-6 rounded-full border text-[7px] font-extrabold flex items-center justify-center transition-all hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B88E6A] dark:focus-visible:ring-[#93C5FD] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 ${
                              mockupTextOverride === null
                                ? "ring-2 ring-[#B88E6A] scale-110"
                                : "opacity-80 hover:opacity-100"
                            }`}
                            style={{
                              backgroundColor: mockupDarkMode ? "#ffffff" : "#0f172a",
                              borderColor: mockupDarkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)",
                              color: mockupDarkMode ? "#000000" : "#ffffff"
                            }}
                            title="Auto-contrast calculations text color"
                            aria-label={`Auto-contrast text color${mockupTextOverride === null ? " - Active" : ""}`}
                          >
                            Auto
                          </button>
                          {/* Palette swatch options */}
                          {palette.map((col, idx) => {
                            const isActive = mockupTextOverride?.toLowerCase() === col.hex.toLowerCase();
                            return (
                              <button
                                key={idx}
                                onClick={() => setMockupTextOverride(col.hex)}
                                aria-pressed={isActive}
                                className={`w-6 h-6 rounded-full border transition-all hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B88E6A] dark:focus-visible:ring-[#93C5FD] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 ${
                                  isActive
                                    ? "ring-2 ring-[#B88E6A] scale-110"
                                    : "opacity-80 hover:opacity-100"
                                }`}
                                style={{
                                  backgroundColor: col.hex,
                                  borderColor: "rgba(0,0,0,0.15)"
                                }}
                                title={`Set typography color to ${col.role} (${col.hex})`}
                                aria-label={`Set typography color to ${col.role} (${col.hex})${isActive ? " - Active" : ""}`}
                              />
                            );
                          })}
                        </div>

                        {/* Row 2: Custom color picker + HEX input underneath */}
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <input
                            id="custom-text-picker"
                            type="color"
                            value={mockupTextOverride || textColor}
                            onChange={(e) => setMockupTextOverride(e.target.value)}
                            className="w-6 h-6 rounded-md cursor-pointer border border-slate-300 dark:border-slate-800 bg-transparent shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B88E6A] dark:focus-visible:ring-[#93C5FD]"
                            title="Choose custom typography color"
                            aria-label="Choose custom typography color via picker"
                          />
                          <input
                            id="custom-text-input"
                            type="text"
                            value={mockupTextOverride || ""}
                            onChange={(e) => setMockupTextOverride(e.target.value)}
                            placeholder="#HEX"
                            aria-label="Choose custom typography color via hex input"
                            className={`w-18 py-1 px-1.5 rounded-lg border text-[9px] font-mono font-bold focus:border-[#B88E6A] focus-visible:ring-2 focus-visible:ring-[#B88E6A] dark:focus-visible:ring-[#93C5FD] focus:outline-none uppercase ${
                              isDark ? "bg-black/20 border-slate-800 text-white" : "bg-slate-55 border-slate-200 text-slate-700"
                            }`}
                          />
                        </div>
                      </div>
                    </div>

                  {/* Mockup canvas body */}
                  <div
                    style={{ backgroundColor: bgMockup }}
                    className={`p-6 rounded-2xl border flex flex-col justify-between min-h-[300px] relative overflow-hidden transition-all duration-300 ${mockupDarkMode ? "border-slate-850" : "border-slate-200 shadow-inner"
                      }`}
                  >
                    {/* Glowing background bubble */}
                    <div className="absolute top-0 right-0 w-36 h-36 rounded-full opacity-10 blur-2xl pointer-events-none" style={{ backgroundColor: baseColor }} />

                    {/* Mock Navigation Header */}
                    <div className="flex items-center justify-between border-b border-slate-200/10 pb-4 mb-4" style={{ borderBottomColor: mockupDarkMode ? "rgba(255,255,255,0.1)" : "rgba(15,23,42,0.1)" }}>
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: baseColor }} />
                        <span className="text-xs font-black uppercase tracking-widest font-mono" style={{ color: resolvedMockupTextColor }}>Mockup.io</span>
                      </div>
                      <div className="flex gap-4 text-xs font-extrabold" style={{ color: resolvedMockupTextColor }}>
                        <span style={{ color: baseColor }}>Home</span>
                        <span className="opacity-80 hover:opacity-100 cursor-pointer">Dashboard</span>
                        <span className="opacity-80 hover:opacity-100 cursor-pointer">Team</span>
                      </div>
                    </div>

                    {/* Mock Content */}
                    <div className="py-6 space-y-4 flex-grow flex flex-col justify-center">
                      <span
                        className="px-2.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider inline-block self-start"
                        style={{ backgroundColor: `${secondaryColor}1c`, color: secondaryColor }}
                      >
                        Interactive Theme Sandbox
                      </span>
                      <h4 className="text-xl font-black leading-tight max-w-xl" style={{ color: resolvedMockupTextColor }}>
                        Build responsive digital brand templates in real-time.
                      </h4>
                      <p className="text-xs opacity-75 leading-relaxed max-w-2xl" style={{ color: resolvedMockupTextColor }}>
                        Drag the color wheel vectors above to change this landing mockup background, buttons, badges, navigation headers, and typography contrast colors instantly. The system will automatically select the best readable text contrast.
                      </p>
                    </div>

                    {/* Mock Footer Actions */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-200/10 pt-4" style={{ borderTopColor: mockupDarkMode ? "rgba(255,255,255,0.1)" : "rgba(15,23,42,0.1)" }}>
                      <div className="text-[10px] font-bold opacity-70" style={{ color: resolvedMockupTextColor }}>
                        Contrast Matrix Score: <strong className="font-mono">{getContrastRatio(hexToRgb(resolvedMockupTextColor) || [255, 255, 255], hexToRgb(bgMockup) || [0, 0, 0]).toFixed(1)}:1</strong>
                        <span className="ml-2 px-1.5 py-0.5 rounded bg-green-500/10 text-green-500 text-[8px] uppercase font-black">
                          {getContrastRatio(hexToRgb(resolvedMockupTextColor) || [255, 255, 255], hexToRgb(bgMockup) || [0, 0, 0]) >= 4.5 ? "AA PASS" : "FAIL"}
                        </span>
                      </div>

                      <div className="flex gap-2.5">
                        <button
                          className="px-4 py-2 rounded-xl text-xs font-black transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-md"
                          style={{
                            backgroundColor: mockupBtnColor,
                            color: mockupBtnTextColor,
                            boxShadow: `0 4px 14px ${mockupBtnColor}35`
                          }}
                        >
                          Get Started
                        </button>
                        {palette[1] && (
                          <button
                            className="px-4 py-2 rounded-xl text-xs font-bold border transition-colors"
                            style={{
                              color: accentColor,
                              borderColor: `${accentColor}30`
                            }}
                          >
                            Learn More
                          </button>
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT DASHBOARD PANELS: Control Center Tabs (Lg: 5 cols) */}
            <div className="lg:col-span-5 space-y-8">

              {/* Tab navigation drawer (Redesigned as Premium Card Grid - Sleek & Compact) */}
              <div
                role="tablist"
                aria-label="Configuration Panels"
                className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6 relative z-10"
              >
                {(
                  [
                    {
                      id: "notebook",
                      icon: <FiBookOpen size={14} />,
                      label: "Notebook",
                      desc: "Save specs & notes",
                      color: "from-blue-500/20 to-cyan-500/10 text-blue-600 dark:text-[#93C5FD]"
                    },
                    {
                      id: "contrast",
                      icon: <FiGrid size={14} />,
                      label: "WCAG Checker",
                      desc: "Check contrast ratios",
                      color: "from-amber-500/20 to-yellow-500/10 text-amber-600 dark:text-[#fbbf24]"
                    },
                    {
                      id: "simulator",
                      icon: <FiEye size={14} />,
                      label: "Simulation",
                      desc: "Color blindness maps",
                      color: "from-purple-500/20 to-pink-500/10 text-purple-600 dark:text-[#c084fc]"
                    },
                    {
                      id: "export",
                      icon: <FiCode size={14} />,
                      label: "Export",
                      desc: "Production code vars",
                      color: "from-emerald-500/20 to-teal-500/10 text-emerald-600 dark:text-[#34d399]"
                    }
                  ] as const
                ).map((tab, idx) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      role="tab"
                      id={`tab-${tab.id}`}
                      aria-selected={isActive}
                      aria-controls={`panel-${tab.id}`}
                      tabIndex={isActive ? 0 : -1}
                      onKeyDown={(e) => handleTabKeyDown(e, idx)}
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B88E6A] dark:focus-visible:ring-[#93C5FD] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-955 ${
                        isActive
                          ? isDark
                            ? "bg-slate-900/60 border-[#93C5FD] shadow-md shadow-[#93C5FD]/5"
                            : "bg-white border-[#185693] shadow-sm shadow-[#185693]/5"
                          : isDark
                          ? "bg-slate-950/40 border-slate-850/80 hover:border-slate-700 text-slate-400"
                          : "bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-650"
                      }`}
                    >
                      <div className={`p-1.5 rounded-lg bg-gradient-to-br ${tab.color} shrink-0`}>
                        {tab.icon}
                      </div>
                      <div className="min-w-0 flex-grow">
                        <span className={`text-[10px] font-black uppercase tracking-wider block truncate ${
                          isActive
                            ? isDark ? "text-white" : "text-[#185693]"
                            : isDark ? "text-slate-300" : "text-slate-600"
                        }`}>
                          {tab.label}
                        </span>
                        <p className={`text-[8px] font-medium leading-normal block truncate mt-0.5 ${
                          isActive
                            ? isDark ? "text-slate-405" : "text-slate-500"
                            : isDark ? "text-slate-500" : "text-slate-455"
                        }`}>
                          {tab.desc}
                        </p>
                      </div>
                      {isActive && (
                        <motion.div
                          layoutId="active-tab-card-border"
                          className="absolute inset-0 rounded-xl border border-[#B88E6A] dark:border-[#93C5FD] pointer-events-none -m-[1px]"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Dashboard cards */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  role="tabpanel"
                  id={`panel-${activeTab}`}
                  aria-labelledby={`tab-${activeTab}`}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.18 }}
                  className={`p-6 rounded-3xl border backdrop-blur-xl ${isDark
                      ? "bg-slate-950/45 border-slate-800/60 shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
                      : "bg-white border-slate-200 shadow-xl shadow-slate-105"
                    }`}
                >

                  {/* TAB 1: NOTEBOOK */}
                  {activeTab === "notebook" && (
                    <div className="space-y-6">

                      <div className="space-y-4">
                        <div className="space-y-1">
                          <label htmlFor="notebook-title-input" className="text-[9px] font-black uppercase tracking-widest text-[#B88E6A] block">
                            Notebook Palette Title
                          </label>
                          <div className="flex gap-2">
                            <input
                              id="notebook-title-input"
                              type="text"
                              value={notebookTitle}
                              onChange={(e) => setNotebookTitle(e.target.value)}
                              className={`text-lg font-black bg-transparent border-b border-slate-200 dark:border-slate-855 focus:border-[#B88E6A] focus:outline-none w-full py-1 ${isDark ? "text-white" : "text-[#185693]"
                                }`}
                              placeholder="e.g. Cyberpunk Orange"
                            />
                            <button
                              onClick={startNewProject}
                              className={`p-2 rounded-lg border text-[10px] font-bold shrink-0 transition-all ${isDark ? "border-slate-800 text-slate-400 hover:text-white" : "border-slate-200 text-slate-600 hover:text-[#185693]"
                                }`}
                              title="Start fresh theme"
                              aria-label="Start fresh specifications folder"
                            >
                              <FiPlus size={14} />
                            </button>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label htmlFor="notebook-notes-textarea" className="text-[9px] font-black uppercase tracking-widest text-[#B88E6A] block">
                            Guidelines & Color Psychology Description
                          </label>
                          <textarea
                            id="notebook-notes-textarea"
                            value={notebookNotes}
                            onChange={(e) => setNotebookNotes(e.target.value)}
                            rows={5}
                            className={`w-full text-xs leading-relaxed p-3 rounded-xl border bg-transparent focus:border-[#B88E6A] focus:outline-none ${isDark
                                ? "border-slate-800/80 text-slate-350 bg-black/10"
                                : "border-slate-200 text-slate-700 bg-slate-50"
                              }`}
                            placeholder="Draft details on why this palette is chosen..."
                          />
                        </div>

                        <button
                          onClick={saveProject}
                          className={`w-full py-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-2 text-white transition-all shadow-md shadow-[#B88E6A]/10 hover:shadow-[#B88E6A]/20 ${isDark
                              ? "bg-[#B88E6A] hover:bg-[#a67a55]"
                              : "bg-[#185693] hover:bg-[#154b80]"
                            }`}
                        >
                          <FiSave size={14} /> Save Current Specs
                        </button>
                      </div>

                      {/* Inspiration presets */}
                      <div className="border-t border-slate-200/20 pt-5 space-y-3">
                        <span className="text-[9px] font-black uppercase tracking-widest text-[#B88E6A] block">
                          Harmony Inspiration presets
                        </span>
                        <div className="flex flex-col gap-1.5 max-h-[140px] overflow-y-auto pr-1">
                          {PRESETS.map((preset, idx) => (
                            <button
                              key={idx}
                              onClick={() => loadPreset(preset)}
                              className={`p-2.5 rounded-xl border text-left flex items-center justify-between text-[11px] font-bold transition-all ${isDark
                                  ? "border-slate-900 bg-slate-900/10 hover:bg-slate-900/30 text-slate-300"
                                  : "border-slate-100 bg-slate-55 hover:bg-slate-100 text-slate-700"
                                }`}
                            >
                              <span>{preset.title}</span>
                              <span className="text-[8px] font-medium uppercase tracking-wide opacity-50">
                                {preset.harmonyMode}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Saved Local Notebook list */}
                      {savedProjects.length > 0 && (
                        <div className="border-t border-slate-200/20 pt-5 space-y-3">
                          <span className="text-[9px] font-black uppercase tracking-widest text-[#B88E6A] block">
                            My Saved Projects ({savedProjects.length})
                          </span>
                          <div className="flex flex-col gap-2 max-h-[160px] overflow-y-auto pr-1">
                            {savedProjects.map((proj, idx) => (
                              <div
                                key={proj.id}
                                onClick={() => loadSavedProject(idx)}
                                className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${activeProjectIndex === idx
                                    ? isDark
                                      ? "bg-[#93C5FD]/10 border-[#93C5FD]/30"
                                      : "bg-[#185693]/10 border-[#185693]/30"
                                    : isDark
                                      ? "bg-transparent border-slate-900 hover:border-slate-800"
                                      : "bg-transparent border-slate-100 hover:border-slate-200"
                                  }`}
                              >
                                <div className="space-y-1 truncate max-w-[170px]">
                                  <p className="text-xs font-bold truncate">{proj.title}</p>
                                  <div className="flex gap-1">
                                    {proj.palette.map((col, cIdx) => (
                                      <div
                                        key={cIdx}
                                        className="w-2.5 h-2.5 rounded-full border border-black/10"
                                        style={{ backgroundColor: col.hex }}
                                      />
                                    ))}
                                  </div>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <span className="text-[8px] text-gray-500 font-bold">
                                    {proj.date}
                                  </span>
                                  <button
                                    onClick={(e) => deleteSavedProject(idx, e)}
                                    className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                                    title="Delete from list"
                                    aria-label={`Delete saved project ${proj.title}`}
                                  >
                                    <FiTrash2 size={12} />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    </div>
                  )}

                  {/* TAB 2: Contrast checker */}
                  {activeTab === "contrast" && (
                    <div className="space-y-6">
                      <div className="space-y-1">
                        <h4 className="text-sm font-black uppercase tracking-wider text-[#B88E6A]">Contrast Matrix</h4>
                        <p className={`text-[10px] leading-relaxed ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                          Calculates foreground contrast against background swatches based on WCAG 2.1 relative luminance thresholds (Min 4.5:1 for normal text).
                        </p>
                      </div>

                      {palette.length < 2 ? (
                        <div className="p-3 text-xs border border-yellow-500/25 bg-yellow-500/5 text-yellow-500 rounded-xl">
                          Select a harmony rule with multiple nodes to view contrast metrics.
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl max-h-[220px] overflow-y-auto">
                            <table className="w-full text-[10px] text-left border-collapse font-sans">
                              <thead className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800 sticky top-0">
                                <tr>
                                  <th className="p-2 font-black text-slate-400 text-[8px] uppercase tracking-wider">BG \ TEXT</th>
                                  {palette.map((col, idx) => (
                                    <th key={idx} className="p-2 text-center">
                                      <div className="w-3.5 h-3.5 rounded-full border border-black/10 mx-auto" style={{ backgroundColor: col.hex }} title={col.role} />
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {palette.map((bgCol, bgIdx) => (
                                  <tr key={bgIdx} className="border-b border-slate-200/50 dark:border-slate-800/30">
                                    <td className="p-2 font-bold flex items-center gap-1.5 max-w-[90px] truncate">
                                      <div className="w-2.5 h-2.5 rounded-full border border-black/10 shrink-0" style={{ backgroundColor: bgCol.hex }} />
                                      <span className="truncate">{bgCol.role}</span>
                                    </td>

                                    {palette.map((txtCol, txtIdx) => {
                                      if (bgIdx === txtIdx) {
                                        return <td key={txtIdx} className="p-2 text-center text-slate-400">-</td>;
                                      }

                                      const ratio = getContrastRatio(txtCol.rgb, bgCol.rgb);
                                      const score = getWCAGRating(ratio);

                                      return (
                                        <td key={txtIdx} className="p-1 text-center">
                                          <div
                                            className={`py-1 rounded font-mono font-bold text-[9px] ${score.normalAA
                                                ? "text-green-500 bg-green-500/5"
                                                : "text-red-500 bg-red-500/5"
                                              }`}
                                            title={`Ratio: ${ratio.toFixed(2)}:1`}
                                          >
                                            {ratio.toFixed(1)}
                                          </div>
                                        </td>
                                      );
                                    })}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>

                          <div
                            className="p-4 rounded-xl border flex flex-col justify-between h-[100px] transition-colors"
                            style={{
                              backgroundColor: baseColor,
                              color: palette[3]?.hex || palette[1]?.hex || palette[0]?.hex
                            }}
                          >
                            <span className="text-[8px] font-black uppercase tracking-widest opacity-60">
                              Luminance Test Block
                            </span>
                            <p className="text-xs font-bold leading-tight">
                              Visual balance starts with proper accessibility.
                            </p>
                            <span className="text-[9px] font-mono opacity-80 pt-1 border-t border-current/25">
                              Contrast: {getContrastRatio(palette[3]?.rgb || palette[1]?.rgb || palette[0]?.rgb, palette[0].rgb).toFixed(1)}:1 Ratio ({getContrastRatio(palette[3]?.rgb || palette[1]?.rgb || palette[0]?.rgb, palette[0].rgb) >= 4.5 ? "AA PASS" : "FAIL"})
                            </span>
                          </div>

                          {/* Custom Color Contrast Tester Section */}
                          <div className={`mt-6 pt-6 border-t ${isDark ? "border-slate-800/80" : "border-slate-200"} space-y-4`}>
                            <div className="space-y-1">
                              <h4 className="text-xs font-black uppercase tracking-wider text-[#B88E6A]">Custom Contrast Sandbox</h4>
                              <p className={`text-[9px] leading-relaxed ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                                Test your own color pairings. Type or pick custom values for foreground text and background colors.
                              </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              {/* Foreground Picker */}
                              <div className="space-y-1.5">
                                <label htmlFor="custom-fg-input" className="text-[9px] font-black uppercase tracking-widest text-[#B88E6A] block">
                                  Foreground Text
                                </label>
                                <div className="flex gap-1.5 items-center">
                                  <input
                                    id="custom-fg-picker"
                                    type="color"
                                    value={customFgColor}
                                    onChange={(e) => setCustomFgColor(e.target.value)}
                                    className="w-8 h-8 rounded-lg cursor-pointer border border-slate-300 dark:border-slate-800 shrink-0 bg-transparent"
                                    aria-label="Custom foreground color picker swatch"
                                  />
                                  <input
                                    id="custom-fg-input"
                                    type="text"
                                    value={customFgColor}
                                    onChange={(e) => setCustomFgColor(e.target.value)}
                                    className={`w-full py-1.5 px-2 rounded-lg border text-xs font-mono font-bold focus:border-[#B88E6A] focus:outline-none uppercase ${isDark ? "bg-black/20 border-slate-800 text-white" : "bg-slate-50 border-slate-200 text-slate-700"
                                      }`}
                                    placeholder="#000000"
                                  />
                                </div>

                                {/* Quick swatches row for Foreground */}
                                <div className="flex flex-wrap items-center gap-1 mt-1">
                                  {palette.map((col, idx) => (
                                    <button
                                      key={idx}
                                      type="button"
                                      onClick={() => setCustomFgColor(col.hex)}
                                      className="w-4 h-4 rounded-full border border-slate-305 dark:border-slate-805 transition-transform hover:scale-110"
                                      style={{ backgroundColor: col.hex }}
                                      title={`Set text to ${col.role} (${col.hex})`}
                                      aria-label={`Set foreground text to ${col.role} (${col.hex})`}
                                    />
                                  ))}
                                  <button
                                    type="button"
                                    onClick={() => setCustomFgColor("#000000")}
                                    className="w-4 h-4 rounded-full border border-slate-305 dark:border-slate-805 transition-transform hover:scale-110 bg-black"
                                    title="Set text to Black"
                                    aria-label="Set foreground text to Black"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => setCustomFgColor("#ffffff")}
                                    className="w-4 h-4 rounded-full border border-slate-305 dark:border-slate-805 transition-transform hover:scale-110 bg-white"
                                    title="Set text to White"
                                    aria-label="Set foreground text to White"
                                  />
                                </div>
                              </div>

                              {/* Background Picker */}
                              <div className="space-y-1.5">
                                <label htmlFor="custom-bg-input" className="text-[9px] font-black uppercase tracking-widest text-[#B88E6A] block">
                                  Background Fill
                                </label>
                                <div className="flex gap-1.5 items-center">
                                  <input
                                    id="custom-bg-picker"
                                    type="color"
                                    value={customBgColor}
                                    onChange={(e) => setCustomBgColor(e.target.value)}
                                    className="w-8 h-8 rounded-lg cursor-pointer border border-slate-300 dark:border-slate-800 shrink-0 bg-transparent"
                                    aria-label="Custom background color picker swatch"
                                  />
                                  <input
                                    id="custom-bg-input"
                                    type="text"
                                    value={customBgColor}
                                    onChange={(e) => setCustomBgColor(e.target.value)}
                                    className={`w-full py-1.5 px-2 rounded-lg border text-xs font-mono font-bold focus:border-[#B88E6A] focus:outline-none uppercase ${isDark ? "bg-black/20 border-slate-800 text-white" : "bg-slate-55 border-slate-200 text-slate-700"
                                      }`}
                                    placeholder="#FFFFFF"
                                  />
                                </div>

                                {/* Quick swatches row for Background */}
                                <div className="flex flex-wrap items-center gap-1 mt-1">
                                  {palette.map((col, idx) => (
                                    <button
                                      key={idx}
                                      type="button"
                                      onClick={() => setCustomBgColor(col.hex)}
                                      className="w-4 h-4 rounded-full border border-slate-305 dark:border-slate-805 transition-transform hover:scale-110"
                                      style={{ backgroundColor: col.hex }}
                                      title={`Set background to ${col.role} (${col.hex})`}
                                      aria-label={`Set background to ${col.role} (${col.hex})`}
                                    />
                                  ))}
                                  <button
                                    type="button"
                                    onClick={() => setCustomBgColor("#000000")}
                                    className="w-4 h-4 rounded-full border border-slate-305 dark:border-slate-805 transition-transform hover:scale-110 bg-black"
                                    title="Set background to Black"
                                    aria-label="Set background to Black"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => setCustomBgColor("#ffffff")}
                                    className="w-4 h-4 rounded-full border border-slate-305 dark:border-slate-805 transition-transform hover:scale-110 bg-white"
                                    title="Set background to White"
                                    aria-label="Set background to White"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Live calculation results */}
                            {(() => {
                              const fgRgb = hexToRgb(customFgColor) || [0, 0, 0];
                              const bgRgb = hexToRgb(customBgColor) || [255, 255, 255];
                              const ratio = getContrastRatio(fgRgb, bgRgb);
                              const score = getWCAGRating(ratio);

                              return (
                                <div className="space-y-3">
                                  {/* Result readouts */}
                                  <div className="flex items-center justify-between text-[10px] font-bold">
                                    <span>Ratio: <strong className="font-mono text-sm">{ratio.toFixed(2)}:1</strong></span>

                                    <div className="flex gap-2">
                                      <span className={`px-2 py-0.5 rounded text-[8px] uppercase font-black ${score.normalAA ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                                        }`}>
                                        AA: {score.normalAA ? "Pass" : "Fail"}
                                      </span>
                                      <span className={`px-2 py-0.5 rounded text-[8px] uppercase font-black ${score.normalAAA ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                                        }`}>
                                        AAA: {score.normalAAA ? "Pass" : "Fail"}
                                      </span>
                                    </div>
                                  </div>

                                  {/* Real-time custom preview block */}
                                  <div
                                    style={{ backgroundColor: customBgColor, color: customFgColor }}
                                    className="p-4 rounded-xl border border-slate-250/30 dark:border-slate-800/30 text-center font-bold transition-all text-xs"
                                  >
                                    <span className="text-[8px] font-black uppercase tracking-widest opacity-60 block mb-1">
                                      Real-Time Contrast Preview
                                    </span>
                                    <p className="text-xs leading-normal">
                                      This is a preview text using your custom colors. Lorem ipsum dolor sit amet.
                                    </p>
                                  </div>
                                </div>
                              );
                            })()}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB 3: SIMULATOR */}
                  {activeTab === "simulator" && (
                    <div className="space-y-6">
                      <div className="space-y-1">
                        <h4 className="text-sm font-black uppercase tracking-wider text-[#B88E6A]">Blindness Simulator</h4>
                        <p className={`text-[10px] leading-relaxed ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                          Ensure visual design patterns remain functional under common color blindness categories.
                        </p>
                      </div>

                      <div className="flex flex-col gap-4 max-h-[350px] overflow-y-auto pr-1">
                        {(
                          [
                            { id: "normal", label: "Normal Vision", desc: "Standard sRGB range." },
                            { id: "protanopia", label: "Protanopia (Red-Blind)", desc: "Missing L-cones." },
                            { id: "deuteranopia", label: "Deuteranopia (Green-Blind)", desc: "Missing M-cones." },
                            { id: "tritanopia", label: "Tritanopia (Blue-Blind)", desc: "Missing S-cones." },
                            { id: "achromatopsia", label: "Achromatopsia (Total)", desc: "Full luminance mapping." }
                          ] as const
                        ).map((mode) => (
                          <div
                            key={mode.id}
                            className={`p-2.5 rounded-xl border space-y-2 ${isDark ? "bg-slate-900/10 border-slate-850" : "bg-slate-55 border-slate-100"
                              }`}
                          >
                            <div className="flex items-center justify-between text-[10px] font-bold px-0.5">
                              <span className="text-[#B88E6A]">{mode.label}</span>
                              <span className="text-[8px] text-gray-500 font-medium">{mode.desc}</span>
                            </div>

                            <div className="flex gap-1.5">
                              {palette.map((col, idx) => {
                                const rgbSim =
                                  mode.id === "normal"
                                    ? col.rgb
                                    : simulateColorBlindness(col.rgb[0], col.rgb[1], col.rgb[2], mode.id);
                                const hexSim = rgbToHex(rgbSim[0], rgbSim[1], rgbSim[2]);

                                return (
                                  <button
                                    key={idx}
                                    type="button"
                                    className="flex-1 h-6 rounded border border-black/10 hover:scale-[1.08] transition-transform cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B88E6A] dark:focus-visible:ring-[#93C5FD]"
                                    style={{ backgroundColor: hexSim }}
                                    title={`Copy HEX: ${hexSim}`}
                                    onClick={() => copyToClipboard(hexSim, `${mode.label} simulated code`)}
                                    aria-label={`Copy simulated ${mode.label} color hex code ${hexSim} to clipboard`}
                                  />
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB 4: EXPORT */}
                  {activeTab === "export" && (
                    <div className="space-y-6">
                      <div className="space-y-1">
                        <h4 className="text-sm font-black uppercase tracking-wider text-[#B88E6A]">Export Formats</h4>
                        <p className={`text-[10px] leading-relaxed ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                          Export your palette parameters instantly into variables formatted for direct production copy-paste.
                        </p>
                      </div>

                      <div className="space-y-5">
                        <div className="space-y-1">
                          <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-[#B88E6A]">
                            <span>CSS Variables</span>
                            <button
                              onClick={() => copyToClipboard(exportCSS(), "CSS styles")}
                              className="text-slate-400 hover:text-white flex items-center gap-1"
                            >
                              <FiCopy /> Copy
                            </button>
                          </div>
                          <pre
                            className={`p-2.5 rounded-xl text-[10px] font-mono overflow-x-auto border select-all max-h-[90px] overflow-y-auto ${isDark ? "bg-black/30 border-slate-800 text-slate-350" : "bg-slate-50 border-slate-200 text-slate-700"
                              }`}
                          >
                            {exportCSS()}
                          </pre>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-[#B88E6A]">
                            <span>Tailwind Config</span>
                            <button
                              onClick={() => copyToClipboard(exportTailwind(), "Tailwind config")}
                              className="text-slate-400 hover:text-white flex items-center gap-1"
                            >
                              <FiCopy /> Copy
                            </button>
                          </div>
                          <pre
                            className={`p-2.5 rounded-xl text-[10px] font-mono overflow-x-auto border select-all max-h-[90px] overflow-y-auto ${isDark ? "bg-black/30 border-slate-800 text-slate-350" : "bg-slate-50 border-slate-200 text-slate-700"
                              }`}
                          >
                            {exportTailwind()}
                          </pre>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-[#B88E6A]">
                            <span>JSON Data</span>
                            <button
                              onClick={() => copyToClipboard(exportJSON(), "JSON data")}
                              className="text-slate-400 hover:text-white flex items-center gap-1"
                            >
                              <FiCopy /> Copy
                            </button>
                          </div>
                          <pre
                            className={`p-2.5 rounded-xl text-[10px] font-mono overflow-x-auto border select-all max-h-[90px] overflow-y-auto ${isDark ? "bg-black/30 border-slate-800 text-slate-350" : "bg-slate-50 border-slate-200 text-slate-700"
                              }`}
                          >
                            {exportJSON()}
                          </pre>
                        </div>
                      </div>
                    </div>
                  )}

                </motion.div>
              </AnimatePresence>

            </div>

          </div>          {/* COLOR THEORY STUDY HANDBOOK */}
          <div className="mt-16 border-t border-slate-200 dark:border-slate-800/80 pt-12 space-y-12">
            <div className="text-center max-w-xl mx-auto mb-10 space-y-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#B88E6A]">
                Educational Guide
              </span>
              <h2 className="text-2xl font-black tracking-tight">The Handbook of Color Theory</h2>
              <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                Learn how designers and artists find the perfect color combinations and structure palettes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 leading-relaxed text-xs">

              {/* Category 1 */}
              <div className={`p-6 rounded-2xl border transition-all ${isDark ? "bg-slate-950/20 border-slate-900/60 hover:border-slate-800" : "bg-slate-55 border-slate-200 hover:shadow-md"}`}>
                <span className="text-[9px] font-black text-[#B88E6A] uppercase tracking-widest block mb-1">Chapter 1</span>
                <h4 className="font-extrabold text-base mb-3">Wheel Physics: RGB vs. RYB</h4>
                <p className={`${isDark ? "text-slate-400" : "text-slate-600"} space-y-2`}>
                  The color spectrum was mapped onto a circle by Isaac Newton in 1666, laying the basis of color theory. Today, design relies on two distinct models:
                </p>
                <ul className={`list-disc list-inside mt-3 space-y-1.5 ${isDark ? "text-slate-400" : "text-slate-650"}`}>
                  <li><strong>RGB System (Additive):</strong> Red, Green, and Blue light mix to form pure white light. This is designed for digital displays (screens, TVs, computers).</li>
                  <li><strong>RYB System (Subtractive):</strong> Red, Yellow, and Blue pigments mix. This is the traditional model used by physical artists for combining paint colors.</li>
                </ul>
              </div>

              {/* Category 2 */}
              <div className={`p-6 rounded-2xl border transition-all ${isDark ? "bg-slate-950/20 border-slate-900/60 hover:border-slate-800" : "bg-slate-55 border-slate-200 hover:shadow-md"}`}>
                <span className="text-[9px] font-black text-[#B88E6A] uppercase tracking-widest block mb-1">Chapter 2</span>
                <h4 className="font-extrabold text-base mb-3">Temperature & Psychology</h4>
                <p className={`${isDark ? "text-slate-400" : "text-slate-600"} space-y-2`}>
                  Colors evoke deep emotional reactions. Hues are split by temperature, which alters user mood:
                </p>
                <ul className={`list-disc list-inside mt-3 space-y-1.5 ${isDark ? "text-slate-400" : "text-slate-650"}`}>
                  <li><strong>Warm Colors:</strong> Hues from red through yellow. Associated with sunlight, warm fire, coziness, passion, and high kinetic energy.</li>
                  <li><strong>Cool Colors:</strong> Hues from green through blue and purple. Associated with water, deep forest foliage, serenity, focus, and calm isolation.</li>
                </ul>
              </div>

              {/* Category 3 */}
              <div className={`p-6 rounded-2xl border transition-all ${isDark ? "bg-slate-950/20 border-slate-900/60 hover:border-slate-800" : "bg-slate-55 border-slate-200 hover:shadow-md"}`}>
                <span className="text-[9px] font-black text-[#B88E6A] uppercase tracking-widest block mb-1">Chapter 3</span>
                <h4 className="font-extrabold text-base mb-3">Tints, Tones, and Shades</h4>
                <p className={`${isDark ? "text-slate-400" : "text-slate-600"} space-y-2`}>
                  Adjusting the value and purity of a base hue builds rich supporting gradients:
                </p>
                <ul className={`list-disc list-inside mt-3 space-y-1.5 ${isDark ? "text-slate-400" : "text-slate-650"}`}>
                  <li><strong>Shade:</strong> Created by adding black to a base hue. Darkens the color to build dramatic, rich, and high-impact tones.</li>
                  <li><strong>Tint:</strong> Created by adding white to a base hue. Lightens the color, useful to build soft pastels and balance bright schemes.</li>
                  <li><strong>Tone:</strong> Created by adding gray (black & white). Mutes saturation, revealing complex, sophisticated nuances without becoming pastel.</li>
                </ul>
              </div>

              {/* Category 4 */}
              <div className={`p-6 rounded-2xl border transition-all lg:col-span-3 ${isDark ? "bg-slate-950/20 border-slate-900/60 hover:border-slate-800" : "bg-slate-55 border-slate-200 hover:shadow-md"}`}>
                <span className="text-[9px] font-black text-[#B88E6A] uppercase tracking-widest block mb-1">Curated Resources</span>
                <h4 className="font-extrabold text-base mb-3">Famous Color & Accessibility Study Resources</h4>
                <p className={`${isDark ? "text-slate-400" : "text-slate-600"} mb-4`}>
                  Here is a list of famous resources, color calculators, and tools to help you test color configurations in your development work:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { title: "Adobe Color Wheel", url: "https://color.adobe.com/", desc: "Calculate visual palettes using vector geometry." },
                    { title: "Coolors Palette Engine", url: "https://coolors.co/", desc: "Fast keyboard-based color scheme generator." },
                    { title: "Canva Color Wheel Guide", url: "https://www.canva.com/colors/color-wheel/", desc: "RGB educational guide explaining psychology." },
                    { title: "WebAIM Contrast Checker", url: "https://webaim.org/resources/contrastchecker/", desc: "Check text compliance against WCAG 2.1 specifications." },
                    { title: "Material Design Color Tool", url: "https://material.io/resources/color/", desc: "Validate contrast across standard UI components." }
                  ].map((ref, idx) => (
                    <a
                      key={idx}
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3.5 rounded-xl border flex flex-col justify-between transition-all hover:-translate-y-0.5 ${isDark
                          ? "bg-slate-900/30 border-slate-850 hover:bg-slate-900/55 hover:border-slate-700"
                          : "bg-white border-slate-200 hover:shadow hover:border-slate-300"
                        }`}
                    >
                      <div>
                        <span className="font-extrabold text-[11px] block text-[#B88E6A] hover:underline">{ref.title}</span>
                        <p className={`text-[10px] leading-relaxed mt-1 opacity-75 ${isDark ? "text-slate-400" : "text-slate-600"}`}>{ref.desc}</p>
                      </div>
                      <span className="text-[8px] font-black uppercase text-blue-500 tracking-wider mt-2 block">Visit site &rarr;</span>
                    </a>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </main>

        <Footer />
      </div>
    </>
  );
}
