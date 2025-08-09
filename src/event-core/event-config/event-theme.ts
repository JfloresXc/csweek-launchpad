// Tema visual específico para CS WEEK 2025
export const EVENT_THEME = {
  // Colores principales del evento
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6', // Color principal
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a'
    },
    secondary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9', // Color secundario
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e'
    },
    accent: {
      50: '#fdf4ff',
      100: '#fae8ff',
      200: '#f5d0fe',
      300: '#f0abfc',
      400: '#e879f9',
      500: '#d946ef', // Color de acento
      600: '#c026d3',
      700: '#a21caf',
      800: '#86198f',
      900: '#701a75'
    },
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6'
  },

  // Gradientes del evento
  gradients: {
    primary: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    secondary: 'linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%)',
    accent: 'linear-gradient(135deg, #d946ef 0%, #a21caf 100%)',
    hero: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #0ea5e9 100%)',
    card: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
    darkCard: 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)'
  },

  // Tipografía del evento
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
      display: ['Poppins', 'system-ui', 'sans-serif']
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem'
    }
  },

  // Espaciado y dimensiones
  spacing: {
    section: '6rem', // Espaciado entre secciones
    container: '1.5rem', // Padding del container
    card: '1.5rem', // Padding interno de cards
    element: '1rem' // Espaciado entre elementos
  },

  // Bordes y sombras
  effects: {
    borderRadius: {
      sm: '0.375rem',
      md: '0.5rem',
      lg: '0.75rem',
      xl: '1rem',
      '2xl': '1.5rem'
    },
    boxShadow: {
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
      glow: '0 0 20px rgb(59 130 246 / 0.3)'
    }
  },

  // Animaciones del evento
  animations: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms'
    },
    easing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)'
    }
  },

  // Breakpoints responsivos
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  }
} as const;

// Utilidades para el tema
export const getEventColor = (color: keyof typeof EVENT_THEME.colors, shade: number = 500) => {
  const colorObj = EVENT_THEME.colors[color];
  if (typeof colorObj === 'string') return colorObj;
  return colorObj[shade as keyof typeof colorObj] || colorObj[500];
};

export const getEventGradient = (gradient: keyof typeof EVENT_THEME.gradients) => {
  return EVENT_THEME.gradients[gradient];
};