import { useEffect, useState } from 'react';

import { ThemeType } from 'src/types';

export const useDarkMode = (): [theme: ThemeType, toggleTheme: () => void] => {
  const [theme, setTheme] = useState<ThemeType>('light');

  const storeTheme = (mode: ThemeType) => {
    window.localStorage.setItem('theme', mode);
    setTheme(mode);
  };

  const toggleTheme = () => {
    if (theme === 'light') {
      storeTheme('dark');
    } else {
      storeTheme('light');
    }
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme') as ThemeType | null;
    const userPreferDark =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (localTheme) {
      setTheme(localTheme);
    } else if (userPreferDark) {
      storeTheme('dark');
    } else {
      storeTheme('light');
    }
  }, []);

  return [theme, toggleTheme];
};
