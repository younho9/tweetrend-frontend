import { ReactNode } from 'react';

import {
  AuthProvider,
  PeriodProvider,
  ThemeProvider,
  UIProvider,
} from 'src/contexts';

type AppProviderProps = {
  children: ReactNode;
};

function AppProvider({ children }: AppProviderProps) {
  return (
    <ThemeProvider>
      <UIProvider>
        <AuthProvider>
          <PeriodProvider>{children}</PeriodProvider>
        </AuthProvider>
      </UIProvider>
    </ThemeProvider>
  );
}

export default AppProvider;
