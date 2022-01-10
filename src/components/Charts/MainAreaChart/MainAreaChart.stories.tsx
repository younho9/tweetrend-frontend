import {
  Title,
  Subtitle,
  Description,
  Primary,
  ArgsTable,
  Stories,
  PRIMARY_STORY,
} from '@storybook/addon-docs/blocks';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Figma } from 'storybook-addon-designs/esm/blocks';

import { createPrevDate, genMockData } from 'src/utils';

import MainAreaChart, {
  UnWrappedMainAreaChart,
  MainAreaChartProps,
} from './MainAreaChart';

export default {
  title: 'Charts/MainAreaChart',
  component: UnWrappedMainAreaChart,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Figma url="https://www.figma.com/file/3HZ3hzFyIBHORWB6MVqxna/TweetTrend?node-id=374%3A124" />
          <Stories />
        </>
      ),
    },
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/3HZ3hzFyIBHORWB6MVqxna/TweetTrend?node-id=374%3A124',
    },
  },
} as Meta;

const now = new Date();

const mockDataOfThreeMonths = genMockData({
  dataKeys: ['마스크', '백신'],
  count: 90,
  min: 100,
  max: 150,
});

const mockDatesOfThreeMonths = Array(90)
  .fill(null)
  .map((_, idx) => createPrevDate(now, 89 - idx));

export const MentionAmounts: Story<MainAreaChartProps> = (args) => (
  <MainAreaChart {...args} />
);
MentionAmounts.args = {
  title: '연관어 비교',
  dataKeys: ['마스크', '백신'],
  data: mockDataOfThreeMonths.map(({ 마스크, 백신 }, idx) => ({
    date: mockDatesOfThreeMonths[idx].getTime(),
    마스크,
    백신,
  })),
  colors: ['Blue400', 'Red400'],
};
