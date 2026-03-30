import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}", // Important si tu mets des classes dans tes constantes
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  darkMode: "class", // Permet de forcer le mode sombre via une classe parent
  theme: {
    extend: {
      fontFamily: {
        // Utilise la police par défaut de Next.js (souvent Inter)
        sans: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        xxs: "0.5rem",
      },
      colors: {
        // --- PALETTE "CRYPTO DARK" ---
        // Le fond n'est pas noir pur (#000), mais un Zinc très profond (#110b1a)
        // pour réduire la fatigue oculaire et faire ressortir les néons.
        background: "#110b1a", 
        foreground: "#fbfbfb", // Texte principal (Zinc 50)
        
        // Les surfaces (Cartes, Modales, Sidebars) - légèrement plus claires que le fond
        card: {
          DEFAULT: "#18181b", // Zinc 900
          foreground: "#fafafa",
          border: "#27272a",  // Zinc 800
        },
        
        // Couleur Primaire : Un Violet électrique (Ethereum vibe)
        primary: {
          DEFAULT: "#7c3aed", // Violet 600
          btnhover: "#6d28d9",   // Violet 700
        },
        
        // Couleur Secondaire : Un Fuchsia pour les gradients et notifs
        secondary: {
          DEFAULT: "#c026d3", // Fuchsia 600
        },

        // Pour les textes grisés / moins importants
        muted: {
          DEFAULT: "#27272a", // Zinc 800
          foreground: "#a1a1aa", // Zinc 400
        },
        
        // Pour les inputs et éléments interactifs
        accent: {
          DEFAULT: "#27272a", // Zinc 800
          foreground: "#fafafa",
        },
        
        // Bordures subtiles
        border: "#27272a", // Zinc 800
        input: "#27272a",
        ring: "#7c3aed", // L'anneau de focus reprend la couleur primaire
      },
      
      // --- EFFETS SPÉCIAUX WEB3 ---
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'conic-gradient(from 180deg at 50% 50%, #2a8af6 0deg, #a853ba 180deg, #e92a67 360deg)',
      },
      boxShadow: {
        'neon': '0 0 20px -5px rgba(124, 58, 237, 0.5)', // Lueur violette
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      
      // --- ANIMATIONS ---
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
export default config;