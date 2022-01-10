import { Story, Meta } from '@storybook/react/types-6-0';

import CustomTooltip, { CustomTooltipProps } from './CustomTooltip';

export default {
  title: 'Charts/CustomTooltip',
  component: CustomTooltip,
} as Meta;

export const Default: Story<CustomTooltipProps> = (args) => (
  <CustomTooltip {...args} />
);
Default.args = {
  active: true,
  payload: [
    {
      color: '#2680eb',
      dataKey: '언급량',
      name: '언급량',
      payload: { date: 1606383302005, 언급량: 128911 },
      value: 128911,
    },
  ],
};
