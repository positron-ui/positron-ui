export interface PositronTheme {
  colors: {
    primary: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
      950: string;
    };
    secondary: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
      950: string;
    };
    accent: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
      950: string;
    };
    neutral: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
      950: string;
    };
    success: string;
    warning: string;
    error: string;
    info: string;
  };
  typography: {
    fontFamily: {
      mono: string[];
      sans: string[];
    };
    fontSize: {
      xs: [string, string];
      sm: [string, string];
      base: [string, string];
      lg: [string, string];
      xl: [string, string];
      '2xl': [string, string];
      '3xl': [string, string];
      '4xl': [string, string];
    };
    fontWeight: {
      light: number;
      normal: number;
      medium: number;
      semibold: number;
      bold: number;
      extrabold: number;
      black: number;
    };
  };
  spacing: {
    border: {
      thin: string;
      default: string;
      thick: string;
    };
    radius: {
      none: string;
      sm: string;
      default: string;
      md: string;
      lg: string;
    };
    shadow: {
      brutal: string;
      'brutal-lg': string;
      'brutal-hover': string;
    };
  };
  animation: {
    duration: {
      fast: string;
      default: string;
      slow: string;
    };
    easing: {
      snap: string;
      pop: string;
      glitch: string;
    };
  };
}

export const defaultTheme: PositronTheme = {
  colors: {
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
      950: '#082f49',
    },
    secondary: {
      50: '#fefce8',
      100: '#fef9c3',
      200: '#fef08a',
      300: '#fde047',
      400: '#facc15',
      500: '#eab308',
      600: '#ca8a04',
      700: '#a16207',
      800: '#854d0e',
      900: '#713f12',
      950: '#422006',
    },
    accent: {
      50: '#fdf2f8',
      100: '#fce7f3',
      200: '#fbcfe8',
      300: '#f9a8d4',
      400: '#f472b6',
      500: '#ec4899',
      600: '#db2777',
      700: '#be185d',
      800: '#9d174d',
      900: '#831843',
      950: '#500724',
    },
    neutral: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
      950: '#0a0a0a',
    },
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },
  typography: {
    fontFamily: {
      mono: ['IBM Plex Mono', 'ui-monospace', 'SFMono-Regular', 'Consolas', 'Liberation Mono', 'Menlo', 'monospace'],
      sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
    },
    fontSize: {
      xs: ['0.75rem', '1rem'],
      sm: ['0.875rem', '1.25rem'],
      base: ['1rem', '1.5rem'],
      lg: ['1.125rem', '1.75rem'],
      xl: ['1.25rem', '1.75rem'],
      '2xl': ['1.5rem', '2rem'],
      '3xl': ['1.875rem', '2.25rem'],
      '4xl': ['2.25rem', '2.5rem'],
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    },
  },
  spacing: {
    border: {
      thin: '1px',
      default: '2px',
      thick: '4px',
    },
    radius: {
      none: '0px',
      sm: '2px',
      default: '4px',
      md: '6px',
      lg: '8px',
    },
    shadow: {
      brutal: '4px 4px 0px 0px #000000',
      'brutal-lg': '8px 8px 0px 0px #000000',
      'brutal-hover': '6px 6px 0px 0px #000000',
    },
  },
  animation: {
    duration: {
      fast: '0.15s',
      default: '0.2s',
      slow: '0.3s',
    },
    easing: {
      snap: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      pop: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      glitch: 'steps(5, jump-none)',
    },
  },
};

export type PositronConfig = {
  theme: PositronTheme;
};

export const positronConfig: PositronConfig = {
  theme: defaultTheme,
};
