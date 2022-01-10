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

import { lightColors } from 'src/styles';

import BubbleChart, {
  UnWrappedBubbleChart,
  BubbleChartProps,
} from './BubbleChart';

export default {
  title: 'Charts/BubbleChart',
  component: UnWrappedBubbleChart,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Figma url="https://www.figma.com/file/3HZ3hzFyIBHORWB6MVqxna/TweetTrend?node-id=654%3A81" />
          <Stories />
        </>
      ),
    },
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/3HZ3hzFyIBHORWB6MVqxna/TweetTrend?node-id=654%3A81',
    },
  },
} as Meta;

export const Default: Story<BubbleChartProps> = (args) => (
  <BubbleChart {...args} />
);

Default.args = {
  title: '연관어 지도',
  width: 500,
  height: 500,
  bubblesData: [
    { name: 'React', counts: 30, color: 'Indigo400' },
    { name: 'TypeScript', counts: 100, color: 'Purple400' },
    { name: 'SCSS', counts: 75, color: 'Red400' },
    { name: 'Recoil', counts: 150, color: 'Blue400' },
    { name: 'Redux', counts: 150, color: 'Green400' },
    { name: 'Material-UI', counts: 125, color: 'Magenta400' },
    { name: 'Router', counts: 300, color: 'Orange400' },
    { name: 'Jest', counts: 500, color: 'Yellow400' },
    { name: 'Enzym', counts: 70, color: 'Indigo500' },
    { name: 'Sinon', counts: 70, color: 'Purple500' },
    { name: 'Puppeteer', counts: 70, color: 'Red500' },
    { name: 'ESLint', counts: 50, color: 'Blue500' },
    { name: 'Prettier', counts: 60, color: 'Green500' },
    { name: 'Lodash', counts: 70, color: 'Magenta500' },
    { name: 'Moment', counts: 80, color: 'Orange500' },
    { name: 'Classnames', counts: 90, color: 'Yellow500' },
    { name: 'Serve', counts: 100, color: 'Magenta600' },
    { name: 'Snap', counts: 150, color: 'Orange600' },
    { name: 'Helmet', counts: 150, color: 'Yellow600' },
  ],
};
