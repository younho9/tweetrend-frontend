import { DefaultTheme } from 'styled-components';

export const lightColors = {
  Gray50: '#ffffff',
  Gray75: '#fafafa',
  Gray100: '#f5f5f5',
  Gray200: '#eaeaea',
  Gray300: '#e1e1e1',
  Gray400: '#cacaca',
  Gray500: '#b3b3b3',
  Gray600: '#8e8e8e',
  Gray700: '#6e6e6e',
  Gray800: '#4b4b4b',
  Gray900: '#2c2c2c',
  Blue400: '#2680eb',
  Blue500: '#1473e6',
  Blue600: '#0d66d0',
  Blue700: '#095aba',
  Red400: '#e34850',
  Red500: '#d7373f',
  Red600: '#c9252d',
  Red700: '#bb121a',
  Green400: '#2d9d78',
  Green500: '#268e6c',
  Green600: '#12805c',
  Green700: '#107154',
  Yellow400: '#dfbf00',
  Yellow500: '#d2b200',
  Yellow600: '#c4a600',
  Yellow700: '#b79900',
  Orange400: '#e68619',
  Orange500: '#da7b11',
  Orange600: '#cb6f10',
  Orange700: '#bd640d',
  Indigo400: '#6767ec',
  Indigo500: '#5c5ce0',
  Indigo600: '#5151d3',
  Indigo700: '#4646c6',
  Magenta400: '#d83790',
  Magenta500: '#ce2783',
  Magenta600: '#bc1c74',
  Magenta700: '#ae0e66',
  Purple400: '#9256d9',
  Purple500: '#864ccc',
  Purple600: '#7a42bf',
  Purple700: '#6f38b1',
};

export const darkColors = {
  Gray50: '#252525',
  Gray75: '#2f2f2f',
  Gray100: '#323232',
  Gray200: '#3e3e3e',
  Gray300: '#4a4a4a',
  Gray400: '#5a5a5a',
  Gray500: '#6e6e6e',
  Gray600: '#909090',
  Gray700: '#b9b9b9',
  Gray800: '#e3e3e3',
  Gray900: '#ffffff',
  Blue400: '#2680eb',
  Blue500: '#378ef0',
  Blue600: '#4b9cf5',
  Blue700: '#5aa9fa',
  Red400: '#e34850',
  Red500: '#ec5b62',
  Red600: '#f76d74',
  Red700: '#ff7b82',
  Green400: '#2d9d78',
  Green500: '#33ab84',
  Green600: '#39b990',
  Green700: '#3fc89c',
  Yellow400: '#dfbf00',
  Yellow500: '#edcc00',
  Yellow600: '#fad900',
  Yellow700: '#ffe22e',
  Orange400: '#e68619',
  Orange500: '#f29423',
  Orange600: '#f9a43f',
  Orange700: '#ffb55b',
  Indigo400: '#6767ec',
  Indigo500: '#7575f1',
  Indigo600: '#8282f6',
  Indigo700: '#9090fa',
  Magenta400: '#d83790',
  Magenta500: '#e2499d',
  Magenta600: '#ec5aaa',
  Magenta700: '#f56bb7',
  Purple400: '#9256d9',
  Purple500: '#9d64e1',
  Purple600: '#a873e9',
  Purple700: '#b483f0',
};

export const typography = {
  fonts: "'Noto Sans KR', sans-serif",
  weight: {
    thin: 100,
    light: 300,
    regular: 400,
    medium: 500,
    bold: 700,
    black: 900,
  },
  size: {
    s1: '12px',
    s2: '14px',
    s3: '16px',
    m1: '20px',
    m2: '24px',
    m3: '28px',
    l1: '32px',
    l2: '40px',
    l3: '48px',
    code: '90px',
  },
};

export const lightTheme: DefaultTheme = {
  colors: lightColors,
  typography,
};

export const darkTheme: DefaultTheme = {
  colors: darkColors,
  typography,
};
