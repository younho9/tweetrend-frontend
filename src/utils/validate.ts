import { isNumber, isUndefined } from 'src/utils';

export const cssUnits = [
  'em',
  'ex',
  'ch',
  'rem',
  'vw',
  'vh',
  'vmin',
  'vmax',
  '%',
  'cm',
  'mm',
  'in',
  'px',
  'pt',
  'pc',
];

export const isCssUnitValue = (value: string): boolean => {
  const regexps = cssUnits.map(
    (unit) => new RegExp(`^[0-9]+${unit}$|^[0-9]+\\.[0-9]+${unit}$`, 'i')
  );

  return regexps.find((regexp) => regexp.test(value)) !== undefined;
};

export const convertValueToPixel = (value: number): string => `${value}px`;

export const validateCssUnitValue = (
  value?: string | number,
  defaultValue = 'auto'
): string => {
  if (isUndefined(value)) {
    return defaultValue;
  }

  if (isNumber(value)) {
    return convertValueToPixel(value);
  }

  if (isCssUnitValue(value)) {
    return value;
  }

  const parsed = parseInt(value, 10);

  return Number.isNaN(parsed) ? defaultValue : `${parsed}px`;
};
