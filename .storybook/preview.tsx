import { withDesign } from 'storybook-addon-designs';
import { MemoryRouter } from 'react-router-dom';

import { AppProvider } from '../src/contexts';
import { GlobalStyle } from '../src/styles';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  darkMode: {
    current: 'dark',
  },
  layout: 'fullscreen',
};

export const decorators = [
  (Story) => (
    <AppProvider>
      <MemoryRouter>
        <GlobalStyle />
        <Story />
      </MemoryRouter>
    </AppProvider>
  ),
  withDesign,
];
