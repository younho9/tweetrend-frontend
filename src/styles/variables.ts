import { DeviceType } from 'src/types';

export const sidebarWidth = {
  min: '68px',
  default: '200px',
};

export const headerHeight = '56px';

export const feedWidth = '370px';

export const rankingTableWidth = '400px';

export const chartWidth = '1010px';

export const DEVICES = ['large', 'medium', 'small', 'extraSmall'] as const;

export const deviceSizeMap: { [key in DeviceType]: number } = {
  large: 1199,
  medium: 991,
  small: 767,
  extraSmall: 574,
};
