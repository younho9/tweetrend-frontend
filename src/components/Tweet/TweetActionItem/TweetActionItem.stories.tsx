import { Story, Meta } from '@storybook/react/types-6-0';

import TweetActionItem, { TweetActionItemProps } from './TweetActionItem';

export default {
  title: 'Components/Tweet/ActionItem',
  component: TweetActionItem,
} as Meta;

export const Default: Story<TweetActionItemProps> = (args) => (
  <TweetActionItem {...args} />
);
Default.args = {
  action: 'like',
};
