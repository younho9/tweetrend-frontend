import { createGlobalStyle, DefaultTheme } from 'styled-components';

import fonts from './fonts';
import resetStyle from './resetStyle';

export const GlobalStyle = createGlobalStyle<{ theme: DefaultTheme }>`
  ${resetStyle}
  ${fonts}
  body {
    margin: 0;
    font-family: ${({ theme }) => theme.typography.fonts};
    color: ${({ theme }) => theme.colors.Gray900};
    background-color: ${({ theme }) => theme.colors.Gray100};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: all 0.25s linear;
  }
`;
