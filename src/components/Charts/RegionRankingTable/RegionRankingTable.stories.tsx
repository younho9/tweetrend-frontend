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

import RegionRankingTable, {
  UnWrappedRegionRankingTable,
  RegionRankingTableProps,
} from './RegionRankingTable';

export default {
  title: 'Charts/RegionRankingTable',
  component: UnWrappedRegionRankingTable,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Figma url="https://www.figma.com/file/3HZ3hzFyIBHORWB6MVqxna/TweetTrend?node-id=654%3A128" />
          <Stories />
        </>
      ),
    },
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/3HZ3hzFyIBHORWB6MVqxna/TweetTrend?node-id=654%3A128',
    },
  },
} as Meta;

export const Default: Story<RegionRankingTableProps> = (args) => (
  <RegionRankingTable {...args} />
);
Default.args = {
  title: '작성 국가 순위',
  data: [
    { name: 'GB', counts: 123 },
    { name: 'US', counts: 106 },
    { name: 'ES', counts: 61 },
    { name: 'ID', counts: 44 },
    { name: 'FR', counts: 30 },
    { name: 'IN', counts: 29 },
    { name: 'MY', counts: 26 },
    { name: 'IT', counts: 25 },
    { name: 'AU', counts: 23 },
    { name: 'etc', counts: 230 },
  ],
};
