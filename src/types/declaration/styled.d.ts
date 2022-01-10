import 'styled-components';
import { Colors, FontWeightName, FontSizes } from 'src/types';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: Colors;
    typography: {
      fonts: string;
      weight: {
        [key in FontWeightName]: number;
      };
      size: {
        [key in FontSizes]: string;
      };
    };
  }
}
