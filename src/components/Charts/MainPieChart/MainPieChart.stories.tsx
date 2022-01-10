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

import { REPUTATIONS_COLOR_MAP, REPUTATIONS_KO_MAP } from 'src/constants';

import MainPieChart, {
  UnWrappedMainPieChart,
  MainPieChartProps,
} from './MainPieChart';

export default {
  title: 'Charts/MainPieChart',
  component: UnWrappedMainPieChart,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Figma url="https://www.figma.com/file/3HZ3hzFyIBHORWB6MVqxna/TweetTrend?node-id=497%3A0" />
          <Stories />
        </>
      ),
    },
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/3HZ3hzFyIBHORWB6MVqxna/TweetTrend?node-id=497%3A0',
    },
  },
} as Meta;

export const Default: Story<MainPieChartProps> = (args) => (
  <MainPieChart {...args} />
);
Default.args = {
  title: '평판 분석',
  height: 320,
  data: [
    { name: 'positive', counts: 401 },
    { name: 'neutral', counts: 299 },
    { name: 'negative', counts: 300 },
  ],
  dataNameMap: REPUTATIONS_KO_MAP,
  dataColorMap: REPUTATIONS_COLOR_MAP,
};

export const Source: Story<MainPieChartProps> = (args) => (
  <MainPieChart {...args} />
);
Source.args = {
  title: '작성 소스 분석',
  width: 250,
  height: 380,
  data: [
    { name: 'Twitter for Android', counts: 6431 },
    { name: 'Twitter Web App', counts: 4714 },
    { name: 'Twitter for iPhone', counts: 2684 },
    { name: 'etc', counts: 925 + 139 },
  ],
  dataColorMap: {
    'Twitter for Android': 'Green400',
    'Twitter Web App': 'Blue400',
    'Twitter for iPhone': 'Red400',
    etc: 'Orange400',
  },
};
