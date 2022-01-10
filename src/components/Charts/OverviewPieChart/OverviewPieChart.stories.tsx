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

import { createPrevDate } from 'src/utils';

import OverviewPieChart, { OverviewPieChartProps } from './OverviewPieChart';

export default {
  title: 'Charts/OverviewPieChart',
  component: OverviewPieChart,
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

const pastWeek = createPrevDate(now, 7);

export const Positive: Story<OverviewPieChartProps> = (args) => (
  <OverviewPieChart {...args} />
);
Positive.args = {
  title: '평판 분석',
  from: pastWeek,
  to: now,
  data: [{ positive: 40, neutral: 30, negative: 30 }],
  prevData: [{ positive: 38, neutral: 25, negative: 37 }],
};

export const neutral: Story<OverviewPieChartProps> = (args) => (
  <OverviewPieChart {...args} />
);
neutral.args = {
  title: '평판 분석',
  from: pastWeek,
  to: now,
  data: [{ positive: 30, neutral: 40, negative: 30 }],
  prevData: [{ positive: 38, neutral: 25, negative: 37 }],
};

export const Negative: Story<OverviewPieChartProps> = (args) => (
  <OverviewPieChart {...args} />
);
Negative.args = {
  title: '평판 분석',
  from: pastWeek,
  to: now,
  data: [{ positive: 22, neutral: 30, negative: 48 }],
  prevData: [{ positive: 16, neutral: 25, negative: 59 }],
};
