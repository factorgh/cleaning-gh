/** @type {import('tailwindcss').Config} */

/**
 * Tailwind CSS Configuration File
 * 
 * This configuration extends Tailwind's default theme with custom colors, animations,
 * and other utilities used throughout the car service management application.
 * 
 * Dependencies Required:
 * - tailwindcss
 * - postcss
 * - autoprefixer
 * 
 * Install using: npm install -D tailwindcss postcss autoprefixer
 * 
 * Color Scheme:
 * - primary: Blue-based colors for main actions and branding
 * - secondary: Gray-based colors for text and backgrounds
 * - success: Green-based colors for success states
 * - warning: Orange-based colors for warning states
 * - error: Red-based colors for error states
 */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Custom color palette for consistent branding
      colors: {
        primary: {
          50: '#f0f9ff',  // Lightest primary - Used for hover backgrounds
          100: '#e0f2fe', // Used for subtle primary backgrounds
          200: '#bae6fd', // Used for lighter primary elements
          300: '#7dd3fc', // Used for primary element highlights
          400: '#38bdf8', // Used for interactive elements
          500: '#0ea5e9', // Main primary color - Used for buttons and key elements
          600: '#0284c7', // Used for hover states on primary elements
          700: '#0369a1', // Used for active states
          800: '#075985', // Used for dark primary text
          900: '#0c4a6e', // Darkest primary - Used for emphasis
        },
        secondary: {
          // Similar color descriptions for secondary palette...
        },
        success: {
          // Color definitions for success states...
        },
        warning: {
          // Color definitions for warning states...
        },
        error: {
          // Color definitions for error states...
        }
      },
      
      // Custom shadow definitions for depth and elevation
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'card-active': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      
      // Custom animations for enhanced interactivity
      animation: {
        'float': 'float 3s ease-in-out infinite',      // Floating animation for icons
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite', // Slow pulse effect
        'bounce-slow': 'bounce 3s infinite',           // Slow bounce effect
        'fade-in': 'fadeIn 0.5s ease-out',            // Fade in animation for elements
        'slide-up': 'slideUp 0.5s ease-out',          // Slide up animation for elements
      },
      
      // Keyframe definitions for custom animations
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      
      // Additional transition properties
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      
      // Custom scale values for hover effects
      scale: {
        '102': '1.02', // Subtle scale effect for hover states
      }
    },
  },
  plugins: [],
};
