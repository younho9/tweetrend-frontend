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

import MainLineChart, {
  UnWrappedMainLineChart,
  MainLineChartProps,
} from './MainLineChart';

export default {
  title: 'Charts/MainLineChart',
  component: UnWrappedMainLineChart,
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
  dataKeys: ['언급량'],
  count: 90,
  min: 100,
  max: 150,
});

const mockDatesOfThreeMonths = Array(90)
  .fill(null)
  .map((_, idx) => createPrevDate(now, 89 - idx));

export const MentionAmounts: Story<MainLineChartProps> = (args) => (
  <MainLineChart {...args} />
);
MentionAmounts.args = {
  title: '언급량 추이',
  dataKey: '언급량',
  data: mockDataOfThreeMonths.map(({ 언급량 }, idx) => ({
    date: mockDatesOfThreeMonths[idx].getTime(),
    언급량,
  })),
  color: 'Blue400',
};

const mockDataOfOneWeek = genMockData({
  dataKeys: ['사용자'],
  count: 7,
  min: 10000,
  max: 15000,
});

const mockDatesofOneWeek = Array(7)
  .fill(null)
  .map((_, idx) => createPrevDate(now, 6 - idx));

export const UserAmounts: Story<MainLineChartProps> = (args) => (
  <MainLineChart {...args} />
);

UserAmounts.args = {
  title: '사용자 추이',
  dataKey: '사용자',
  data: mockDataOfOneWeek.map(({ 사용자 }, idx) => ({
    date: mockDatesofOneWeek[idx].getTime(),
    사용자,
  })),
  color: 'Yellow400',
};

const mockDataOfOneMonth = genMockData({
  dataKeys: ['리트윗'],
  count: 30,
  min: 40000,
  max: 50000,
});

const mockDatesofOneMonth = Array(30)
  .fill(null)
  .map((_, idx) => createPrevDate(now, 29 - idx));

export const RetweetCounts: Story<MainLineChartProps> = (args) => (
  <MainLineChart {...args} />
);

RetweetCounts.args = {
  title: '리트윗 수',
  dataKey: '리트윗',
  data: mockDataOfOneMonth.map(({ 리트윗 }, idx) => ({
    date: mockDatesofOneMonth[idx].getTime(),
    리트윗,
  })),
  color: 'Magenta400',
};
