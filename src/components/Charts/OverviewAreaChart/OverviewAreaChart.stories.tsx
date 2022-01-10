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

import OverviewAreaChart, { OverviewAreaChartProps } from './OverviewAreaChart';

export default {
  title: 'Charts/OverviewAreaChart',
  component: OverviewAreaChart,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Figma url="https://www.figma.com/file/3HZ3hzFyIBHORWB6MVqxna/TweetTrend?node-id=247%3A0" />
          <Stories />
        </>
      ),
    },
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/3HZ3hzFyIBHORWB6MVqxna/TweetTrend?node-id=247%3A0',
    },
  },
} as Meta;

const now = new Date();

const times = {
  past24Hours: createPrevDate(now, 1),
  pastWeek: createPrevDate(now, 7),
  pastMonth: createPrevDate(now, 30),
  pastThreeMonths: createPrevDate(now, 90),
  pastYear: createPrevDate(now, 365),
};

export const TotalQuoteAmount: Story<OverviewAreaChartProps> = (args) => (
  <OverviewAreaChart {...args} />
);

TotalQuoteAmount.args = {
  title: '총 언급량',
  from: times.pastThreeMonths,
  to: now,
  dataKey: 'quote',
  data: genMockData({
    dataKeys: ['quote'],
    count: 90,
    min: 8000,
    max: 9000,
  }),
  prevTotal: 678048,
  color: 'Blue400',
};

export const TotalUserCounts: Story<OverviewAreaChartProps> = (args) => (
  <OverviewAreaChart {...args} />
);

TotalUserCounts.args = {
  title: '개별 사용자 수',
  from: times.pastWeek,
  to: now,
  dataKey: 'users',
  data: genMockData({
    dataKeys: ['users'],
    count: 7,
    min: 4000,
    max: 5000,
  }),
  prevTotal: 44855,
  color: 'Yellow400',
};

export const RetweetCounts: Story<OverviewAreaChartProps> = (args) => (
  <OverviewAreaChart {...args} />
);

RetweetCounts.args = {
  title: '리트윗 수',
  from: times.pastMonth,
  to: now,
  dataKey: 'retweets',
  data: genMockData({
    dataKeys: ['retweets'],
    count: 30,
    min: 4000,
    max: 5000,
  }),
  prevTotal: 196893,
  color: 'Magenta400',
};
