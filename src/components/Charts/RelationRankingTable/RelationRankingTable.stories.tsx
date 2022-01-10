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

import RelationRankingTable, {
  RelationRankingTableProps,
} from './RelationRankingTable';

export default {
  title: 'Charts/RelationRankingTable',
  component: RelationRankingTable,
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

export const Default: Story<RelationRankingTableProps> = (args) => (
  <RelationRankingTable {...args} />
);
Default.args = {
  data: [
    { name: '확산', counts: 2993, score: 0 },
    { name: '안전', counts: 1077, score: 2 },
    { name: '위기', counts: 913, score: -2 },
    { name: '추락하다', counts: 765, score: -2 },
    { name: '저렴하다', counts: 751, score: 1 },
    { name: '바라다', counts: 651, score: 2 },
    { name: '크다', counts: 645, score: 0 },
    { name: '구매하다', counts: 638, score: 0 },
    { name: '좋은', counts: 519, score: 2 },
    { name: '희망', counts: 509, score: 2 },
  ],
};
