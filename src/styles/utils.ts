import { BoxSizeShorthandProps, DeviceType } from 'src/types';
import { validateCssUnitValue } from 'src/utils';

import { deviceSizeMap } from './variables';

export const margin = (...args: BoxSizeShorthandProps) =>
  `margin: ${args.map((val) => validateCssUnitValue(val)).join(' ')};`;

export const padding = (...args: BoxSizeShorthandProps) =>
  `padding: ${args.map((val) => validateCssUnitValue(val)).join(' ')};`;

export const hexToRGBA = (hex: string, alpha: number) => {
  const value = hex.replace(/^#/, '');
  const n = parseInt(value, 16); // Hexadecimal to Decimal

  if (value.length !== 6 || Number.isNaN(n)) {
    throw new RangeError('hex must be 6-digit hexadecimal number');
  }

  if (alpha < 0 || alpha > 1) {
    throw new RangeError('alpha must be between 0.0 and 1.0');
  }

  // Decimal to Binary & masking
  const [r, g, b] = [(n >> 16) & 0xff, (n >> 8) & 0xff, (n >> 0) & 0xff];

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const flexAlignMap = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
};

const customMediaQuery = (maxWidth: number) =>
  `@media (max-width: ${maxWidth}px)`;

export const media = (device: DeviceType) =>
  customMediaQuery(deviceSizeMap[device]);
