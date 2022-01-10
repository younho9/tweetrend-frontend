import { Story, Meta } from '@storybook/react/types-6-0';

import TweetActions, { TweetActionsProps } from './TweetActions';

export default {
  title: 'Components/Tweet/TweetActions',
  component: TweetActions,
} as Meta;

export const Default: Story<TweetActionsProps> = (args) => (
  <TweetActions {...args} />
);
Default.args = {
  reply_count: 10,
  retweet_count: 100,
  quote_count: 50,
  like_count: 5000,
};
