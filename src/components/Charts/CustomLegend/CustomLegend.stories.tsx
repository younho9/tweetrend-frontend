import { Story, Meta } from '@storybook/react/types-6-0';

import CustomLegend, { CustomLegendProps } from './CustomLegend';

export default {
  title: 'Charts/CustomLegend',
  component: CustomLegend,
} as Meta;

export const Default: Story<CustomLegendProps> = (args) => (
  <CustomLegend {...args} />
);
Default.args = {
  colorMap: [
    { name: '긍정적', color: 'Blue400' },
    { name: '중립', color: 'Green400' },
    { name: '부정적', color: 'Red400' },
  ],
};
