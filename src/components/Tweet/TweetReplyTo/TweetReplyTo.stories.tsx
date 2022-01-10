import { Story, Meta } from '@storybook/react/types-6-0';

import TweetReplyTo, { TweetReplyToProps } from './TweetReplyTo';

export default {
  title: 'Components/Tweet/TweetReplyTo',
  component: TweetReplyTo,
} as Meta;

export const Default: Story<TweetReplyToProps> = (args) => (
  <TweetReplyTo {...args} />
);
Default.args = {
  username: 'dan_abramov',
};
