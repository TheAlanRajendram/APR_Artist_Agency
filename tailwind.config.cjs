// tailwind.config.cjs

const defaultTheme = require('tailwindcss/defaultTheme');

// Professional color themes using color theory
const themes = {
  // Theme 1: Sophisticated Gold, now adjusted for Apple HIG-like dark mode neutrals
  sophisticatedGold: {
    primary: '#C9A96E',      // Gold Accent (Retained Brand Primary)
    secondary: '#8B7355',    // Muted Gold (Retained Brand Secondary)
    accent: '#E4D4B7',       // Light Gold (Retained Brand Accent)

    background: {
      primary: '#1C1C1E',    // Apple HIG systemGray6Dark equivalent (Main app/page background)
      secondary: '#2C2C2E',  // Apple HIG systemGray5Dark equivalent (Lighter background elements, e.g., grouped content)
      tertiary: '#3A3A3C',   // Apple HIG systemGray4Dark equivalent (Subtle borders, or tertiary backgrounds)
      card: '#2C2C2E',       // Card background (same as secondary for grouped content feel)
    },
    text: {
      primary: '#FFFFFF',    // Apple HIG labelColor equivalent (Pure White for high emphasis)
      secondary: '#AEAEB2',  // Apple HIG secondaryLabelColor equivalent (e.g., systemGray for dark mode)
      muted: '#8E8E93',      // Apple HIG tertiaryLabelColor equivalent (e.g., systemGray2 for dark mode)
    }
  },

  // ... (Your other themes, if any, remain unchanged) ...
  // Theme 2: Platinum Elegance ...
  // Theme 3: Midnight Blue Professional ...
  // Theme 4: Rose Gold Luxury ...
  // Theme 5: Emerald Professional ...
};

// Select active theme (change this to switch themes)
const activeTheme = 'sophisticatedGold'; // This now points to the Apple HIG-inspired version
const currentTheme = themes[activeTheme];

// Helper function (ensure this is defined in your actual file if not already)
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
        // Primary brand colors (Your gold palette)
        primary: {
          DEFAULT: currentTheme.primary,
          dark: currentTheme.secondary,
          light: currentTheme.accent,
        },
        secondary: { // This refers to your brand's secondary color (muted gold)
          DEFAULT: currentTheme.secondary,
          light: currentTheme.accent,
        },
        accent: currentTheme.accent, // Your brand's light gold accent

        // Background colors (Now Apple HIG inspired)
        dark: {
          DEFAULT: currentTheme.background.primary,     // e.g., #1C1C1E
          lighter: currentTheme.background.secondary,   // e.g., #2C2C2E
          card: currentTheme.background.card,           // e.g., #2C2C2E
          accent: currentTheme.background.tertiary,     // e.g., #3A3A3C (use for accent backgrounds)
        },
        gold: currentTheme.primary, // Legacy or direct gold access
      },

      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
        serif: ['Cormorant Infant', ...defaultTheme.fontFamily.serif],
        display: ['Cormorant Infant', ...defaultTheme.fontFamily.sans],
      },

      textColor: {
        // Text colors (Now Apple HIG inspired for neutrals)
        primary: currentTheme.text.primary,             // e.g., #FFFFFF
        secondary: currentTheme.text.secondary,         // e.g., #AEAEB2
        muted: currentTheme.text.muted,                 // e.g., #8E8E93
        
        // Heading colors using your brand's gold
        heading: currentTheme.primary,                  // Gold for main headings
        'heading-secondary': currentTheme.text.primary, // Now White for secondary headings
        'heading-subtle': currentTheme.text.secondary,  // Now Apple-like gray for subtle headings
        
        // On-color text
        'on-primary': currentTheme.background.primary, // Text on gold buttons will be the new dark background
        'on-gold': currentTheme.background.primary,    // (Same as above)
        gold: currentTheme.primary,                    // Direct gold text access
      },

      boxShadow: { // Assuming hexToRgb helper is available
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
            color: currentTheme.text.primary, // Main prose text will be new primary text (White)
            maxWidth: 'none',
            a: {
              color: currentTheme.primary, // Links remain gold
              '&:hover': {
                color: currentTheme.accent,
                opacity: '0.8',
              },
            },
            // Adjust heading colors within prose if needed, they might default to currentTheme.text.primary
            // The global heading classes like 'text-heading' will use your gold.
            // Prose specific headings might need targeting if you want them different from body text.
            h1: { color: currentTheme.text.primary, fontFamily: theme('fontFamily.display'), fontWeight: '700' },
            h2: { color: currentTheme.text.primary, fontFamily: theme('fontFamily.display'), fontWeight: '600' },
            h3: { color: currentTheme.text.primary, fontFamily: theme('fontFamily.display'), fontWeight: '600' },
            // ... and so on for h4, h5, h6
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
