/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

// Professional color themes using color theory
const themes = {
  // Theme 1: Sophisticated Gold (current, refined)
  sophisticatedGold: {
    primary: '#C9A96E',      // Refined warm gold
    secondary: '#8B7355',    // Muted gold
    accent: '#E4D4B7',       // Light gold
    background: {
      primary: '#0A0A0A',    // True deep black
      secondary: '#1A1A1A',  // Charcoal
      tertiary: '#2D2D2D',   // Medium gray
      card: '#242424',       // Card background
    },
    text: {
      primary: '#F5F5F5',    // Near white
      secondary: '#B8B8B8',  // Medium gray
      muted: '#888888',      // Muted gray
    }
  },

  // Theme 2: Platinum Elegance
  platinumElegance: {
    primary: '#E8E8E8',      // Platinum
    secondary: '#B8B8B8',    // Silver
    accent: '#D4AF37',       // Classic gold accent
    background: {
      primary: '#0F0F0F',    // Deep black
      secondary: '#1C1C1C',  // Dark charcoal
      tertiary: '#2A2A2A',   // Medium charcoal
      card: '#252525',       // Card background
    },
    text: {
      primary: '#FFFFFF',    // Pure white
      secondary: '#CCCCCC',  // Light gray
      muted: '#999999',      // Medium gray
    }
  },

  // Theme 3: Midnight Blue Professional
  midnightBlue: {
    primary: '#4A90C2',      // Professional blue
    secondary: '#2E5984',    // Deep blue
    accent: '#87CEEB',       // Light blue accent
    background: {
      primary: '#0B1426',    // Deep navy
      secondary: '#1A2332',  // Navy blue
      tertiary: '#243447',   // Medium navy
      card: '#2A3D54',       // Card background
    },
    text: {
      primary: '#F0F8FF',    // Alice blue
      secondary: '#B8D4F0',  // Light blue gray
      muted: '#7A95B0',      // Muted blue
    }
  },

  // Theme 4: Rose Gold Luxury
  roseGoldLuxury: {
    primary: '#E8B4B8',      // Rose gold
    secondary: '#C49EA3',    // Muted rose
    accent: '#F4D7DA',       // Light rose
    background: {
      primary: '#1A0F10',    // Deep burgundy black
      secondary: '#2A1B1D',  // Dark burgundy
      tertiary: '#3D2B2E',   // Medium burgundy
      card: '#342428',       // Card background
    },
    text: {
      primary: '#FFF5F5',    // Rose white
      secondary: '#E0C5C8',  // Light rose gray
      muted: '#B89599',      // Muted rose
    }
  },

  // Theme 5: Emerald Professional
  emeraldProfessional: {
    primary: '#50C878',      // Emerald green
    secondary: '#3A9B5C',    // Forest green
    accent: '#98FB98',       // Light green
    background: {
      primary: '#0A1A0A',    // Deep forest black
      secondary: '#1A2B1A',  // Dark forest
      tertiary: '#2D3D2D',   // Medium forest
      card: '#243324',       // Card background
    },
    text: {
      primary: '#F0FFF0',    // Honeydew
      secondary: '#C8E6C8',  // Light green gray
      muted: '#8FB08F',      // Muted green
    }
  }
};

// Select active theme (change this to switch themes)
const activeTheme = 'sophisticatedGold'; // Options: sophisticatedGold, platinumElegance, midnightBlue, roseGoldLuxury, emeraldProfessional
const currentTheme = themes[activeTheme];

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary brand colors
        primary: {
          DEFAULT: currentTheme.primary,
          dark: currentTheme.secondary,
          light: currentTheme.accent,
        },

        // Secondary colors
        secondary: {
          DEFAULT: currentTheme.secondary,
          light: currentTheme.accent,
        },

        // Accent color
        accent: currentTheme.accent,

        // Background colors
        dark: {
          DEFAULT: currentTheme.background.primary,
          lighter: currentTheme.background.secondary,
          card: currentTheme.background.card,
          accent: currentTheme.background.tertiary,
        },

        // Legacy gold support (for gradual migration)
        gold: currentTheme.primary,
      },

      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
        serif: ['Cormorant Infant', ...defaultTheme.fontFamily.serif],
        display: ['Cormorant Infant', ...defaultTheme.fontFamily.sans],
      },

      textColor: {
        primary: currentTheme.text.primary,
        secondary: currentTheme.text.secondary,
        muted: currentTheme.text.muted,
        heading: currentTheme.primary,          // Primary gold headings (for hero, main titles)
        'heading-secondary': currentTheme.text.primary,  // White/neutral headings (for section headings)
        'heading-subtle': currentTheme.text.secondary,   // Gray headings (for card titles, minor headings)
        'on-primary': currentTheme.background.primary,
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
            h1: {
              color: currentTheme.text.primary,
              fontFamily: theme('fontFamily.display'),
              fontWeight: '700',
            },
            h2: {
              color: currentTheme.text.primary,
              fontFamily: theme('fontFamily.display'),
              fontWeight: '600',
            },
            h3: {
              color: currentTheme.text.primary,
              fontFamily: theme('fontFamily.display'),
              fontWeight: '600',
            },
            h4: {
              color: currentTheme.text.primary,
              fontFamily: theme('fontFamily.display'),
              fontWeight: '500',
            },
            h5: {
              color: currentTheme.text.primary,
              fontFamily: theme('fontFamily.display'),
              fontWeight: '500',
            },
            h6: {
              color: currentTheme.text.primary,
              fontFamily: theme('fontFamily.display'),
              fontWeight: '500',
            },
            blockquote: {
              color: currentTheme.text.secondary,
              borderLeftColor: currentTheme.primary,
            },
            strong: {
              color: currentTheme.text.primary,
              fontWeight: '600',
            },
            code: {
              color: currentTheme.primary,
              backgroundColor: currentTheme.background.card,
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

// Helper function to convert hex to RGB
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result) {
    return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
  }
  return '255, 255, 255'; // fallback
}
