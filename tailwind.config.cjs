// tailwind.config.cjs

const defaultTheme = require('tailwindcss/defaultTheme');

// Professional color themes using color theory
const themes = {
  // Theme 1: Sophisticated Gold, with darker Reddit-inspired backgrounds
  sophisticatedGold: {
    primary: '#C9A96E',      // Gold Accent (Retained Brand Primary)
    secondary: '#8B7355',    // Muted Gold (Retained Brand Secondary)
    accent: '#E4D4B7',       // Light Gold (Retained Brand Accent)

    background: {
      primary: '#0B0E11',    // Very deep, slightly cool charcoal (main background)
      secondary: '#1A1D21',  // Dark charcoal (cards, secondary surfaces)
      tertiary: '#24282E',   // Medium-dark charcoal (other UI elements, borders)
      card: '#1A1D21',       // Card background (same as secondary)
    },
    text: {
      primary: '#FFFFFF',    // Primary text (Pure White)
      secondary: '#AEAEB2',  // Secondary text (Light Gray)
      muted: '#98989F',      // Muted text (Adjusted for better contrast on new dark backgrounds)
    }
  },

  // ... (Your other themes, if any, remain unchanged) ...
};

// Select active theme
const activeTheme = 'sophisticatedGold';
const currentTheme = themes[activeTheme];

// Helper function (ensure this is defined in your actual file)
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result) {
    return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
  }
  return '255, 255, 255'; // fallback
}

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: currentTheme.primary,
          dark: currentTheme.secondary,
          light: currentTheme.accent,
        },
        secondary: {
          DEFAULT: currentTheme.secondary,
          light: currentTheme.accent,
        },
        accent: currentTheme.accent,
        dark: { // These will now use the new darker background values
          DEFAULT: currentTheme.background.primary,
          lighter: currentTheme.background.secondary, // 'lighter' is now a very dark grey
          card: currentTheme.background.card,
          accent: currentTheme.background.tertiary,   // 'accent' background
        },
        gold: currentTheme.primary,
      },

      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
        serif: ['Cormorant Infant', ...defaultTheme.fontFamily.serif],
        display: ['Cormorant Infant', ...defaultTheme.fontFamily.sans],
      },

      textColor: {
        // These will now use the new text values (muted is updated)
        primary: currentTheme.text.primary,
        secondary: currentTheme.text.secondary,
        muted: currentTheme.text.muted,
        
        heading: currentTheme.primary,
        'heading-secondary': currentTheme.text.primary, // White for secondary headings
        'heading-subtle': currentTheme.text.secondary,  // New lighter gray for subtle headings
        
        'on-primary': currentTheme.background.primary, // Text on gold buttons will be the new very dark background
        'on-gold': currentTheme.background.primary,
        gold: currentTheme.primary,
      },

      boxShadow: {
        'card': `0 10px 30px -5px rgba(0, 0, 0, 0.4), 0 1px 3px rgba(${hexToRgb(currentTheme.primary)}, 0.1)`,
        'card-hover': `0 20px 40px -5px rgba(0, 0, 0, 0.5), 0 1px 3px rgba(${hexToRgb(currentTheme.primary)}, 0.2)`,
        'glow': `0 0 20px rgba(${hexToRgb(currentTheme.primary)}, 0.3)`,
      },

      backgroundImage: {
        'gradient-primary': `linear-gradient(135deg, ${currentTheme.primary} 0%, ${currentTheme.secondary} 100%)`,
        'gradient-accent': `linear-gradient(135deg, ${currentTheme.accent} 0%, ${currentTheme.primary} 100%)`,
        'gradient-dark': `linear-gradient(135deg, ${currentTheme.background.primary} 0%, ${currentTheme.background.secondary} 100%)`,
      },

      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: currentTheme.text.primary,
            maxWidth: 'none',
            a: {
              color: currentTheme.primary,
              '&:hover': {
                color: currentTheme.accent,
                opacity: '0.8',
              },
            },
            h1: { color: currentTheme.text.primary, fontFamily: theme('fontFamily.display'), fontWeight: '700' },
            h2: { color: currentTheme.text.primary, fontFamily: theme('fontFamily.display'), fontWeight: '600' },
            h3: { color: currentTheme.text.primary, fontFamily: theme('fontFamily.display'), fontWeight: '600' },
            blockquote: { color: currentTheme.text.secondary, borderLeftColor: currentTheme.primary },
            strong: { color: currentTheme.text.primary, fontWeight: '600' },
            code: { color: currentTheme.primary, backgroundColor: currentTheme.background.card },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
