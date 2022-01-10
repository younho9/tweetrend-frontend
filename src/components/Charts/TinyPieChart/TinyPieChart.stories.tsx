import { Story, Meta } from '@storybook/react/types-6-0';

import TinyPieChart, { TinyPieChartProps } from './TinyPieChart';

export default {
  title: 'Charts/TinyPieChart',
  component: TinyPieChart,
} as Meta;

export const Positive: Story<TinyPieChartProps> = (args) => (
  <TinyPieChart {...args} />
);
Positive.args = {
  ratio: 82,
  color: 'Blue400',
};

export const neutral: Story<TinyPieChartProps> = (args) => (
  <TinyPieChart {...args} />
);
neutral.args = {
  ratio: 24,
  color: 'Green400',
};

export const Negative: Story<TinyPieChartProps> = (args) => (
  <TinyPieChart {...args} />
);
Negative.args = {
  ratio: 38,
  color: 'Red400',
};
