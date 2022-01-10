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

import { REPUTATIONS } from 'src/constants';
import { ReputationType } from 'src/types';
import { createPrevDate, genArrayWithCallback, genRandomInt } from 'src/utils';

import PeriodBarChart, {
  UnWrappedPeriodBarChart,
  PeriodBarChartProps,
} from './PeriodBarChart';

export default {
  title: 'Charts/PeriodBarChart',
  component: UnWrappedPeriodBarChart,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Figma url="https://www.figma.com/file/3HZ3hzFyIBHORWB6MVqxna/TweetTrend?node-id=564%3A0" />
          <Stories />
        </>
      ),
    },
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/3HZ3hzFyIBHORWB6MVqxna/TweetTrend?node-id=564%3A0',
    },
  },
} as Meta;

const now = new Date();
const mockDatesOfOneWeeks = genArrayWithCallback(7, ({ idx }) =>
  createPrevDate(now, 6 - idx)
);

export const Default: Story<PeriodBarChartProps<ReputationType>> = (args) => (
  <PeriodBarChart {...args} />
);

Default.args = {
  title: '기간별 평판 추이',
  dataKeys: [...REPUTATIONS],
  data: genArrayWithCallback(7, ({ idx }) => {
    const positive = genRandomInt(0, 50);
    const negative = genRandomInt(0, 50);
    const neutral = 100 - positive - negative;

    return {
      date: mockDatesOfOneWeeks[idx].getTime(),
      positive,
      neutral,
      negative,
    };
  }),
  colorMap: {
    positive: 'Blue400',
    neutral: 'Green400',
    negative: 'Red400',
  },
  from: mockDatesOfOneWeeks[0],
  to: mockDatesOfOneWeeks[6],
  interval: 'weekly',
};
