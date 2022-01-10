export type GrayscaleVariants =
  | 50
  | 75
  | 100
  | 200
  | 300
  | 400
  | 500
  | 600
  | 700
  | 800
  | 900;

export type GrayscaleColor = `Gray${GrayscaleVariants}`;

export type GrayscaleColors = {
  [key in GrayscaleColor]: string;
};

export type BaseVariants = 400 | 500 | 600 | 700;

export const BaseColorNames = [
  'Red',
  'Green',
  'Blue',
  'Yellow',
  'Orange',
  'Indigo',
  'Magenta',
  'Purple',
] as const;

export type BaseColorNamesType = typeof BaseColorNames[number];

export type BaseColor = `${BaseColorNamesType}${BaseVariants}`;

export type BaseColors = {
  [key in BaseColor]: string;
};

export type Color = GrayscaleColor | BaseColor;

export type Colors = GrayscaleColors & BaseColors;

export type FontWeightNumber = 100 | 300 | 400 | 500 | 700 | 900;

export type FontWeightName =
  | 'thin'
  | 'light'
  | 'regular'
  | 'medium'
  | 'bold'
  | 'black';

export type FontSizes =
  | 's1'
  | 's2'
  | 's3'
  | 'm1'
  | 'm2'
  | 'm3'
  | 'l1'
  | 'l2'
  | 'l3'
  | 'code';

export type ThemeType = 'light' | 'dark';
