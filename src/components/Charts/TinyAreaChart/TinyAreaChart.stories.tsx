import { Story, Meta } from '@storybook/react/types-6-0';

import { genMockData } from 'src/utils';

import TinyAreaChart, { TinyAreaChartProps } from './TinyAreaChart';

export default {
  title: 'Charts/TinyAreaChart',
  component: TinyAreaChart,
} as Meta;

export const Default: Story<TinyAreaChartProps> = (args) => (
  <TinyAreaChart {...args} />
);
Default.args = {
  dataKey: 'uv',
  data: genMockData({ dataKeys: ['uv'], count: 7, min: 1800, max: 4000 }),
};

export const Colors = () => {
  return (
    <>
      <div>
        <TinyAreaChart
          dataKey="yellow"
          data={genMockData({
            dataKeys: ['yellow'],
            count: 7,
            min: 1800,
            max: 4000,
          })}
        />
      </div>
      <div>
        <TinyAreaChart
          dataKey="blue"
          data={genMockData({
            dataKeys: ['blue'],
            count: 7,
            min: 1800,
            max: 4000,
          })}
          color="Blue400"
        />
      </div>
      <div>
        <TinyAreaChart
          dataKey="green"
          data={genMockData({
            dataKeys: ['green'],
            count: 7,
            min: 1800,
            max: 4000,
          })}
          color="Red400"
        />
      </div>
    </>
  );
};
