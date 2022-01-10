import { createContext, ReactNode, useContext } from 'react';
import { ThemeProvider } from 'styled-components';

import { useDarkMode } from 'src/hooks';
import { darkTheme, lightTheme } from 'src/styles';
import { ThemeType } from 'src/types';

type ThemeContextType = {
  theme: ThemeType;
  toggleTheme: () => void;
};

type ThemeProviderProps = {
  children: ReactNode;
};

const ThemeContext = createContext<Partial<ThemeContextType>>({});

function CustomThemeProvider({ children }: ThemeProviderProps) {
  const [theme, toggleTheme] = useDarkMode();

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);

export default CustomThemeProvider;
