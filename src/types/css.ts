import { DEVICES } from 'src/styles/variables';

export type BoxSizeShorthandProps =
  | [all: string | number]
  | [vertical: string | number, horizontal: string | number]
  | [top: string | number, horizontal: string | number, bottom: string | number]
  | [
      top: string | number,
      right: string | number,
      bottom: string | number,
      left: string | number
    ];

export type DeviceType = typeof DEVICES[number];
