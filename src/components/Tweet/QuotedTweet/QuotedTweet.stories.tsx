import { Story, Meta } from '@storybook/react/types-6-0';

import QuotedTweet, { QuotedTweetProps } from './QuotedTweet';

export default {
  title: 'Components/Tweet/QuotedTweet',
  component: QuotedTweet,
} as Meta;

export const Default: Story<QuotedTweetProps> = (args) => (
  <QuotedTweet {...args} />
);
Default.args = {
  id: '1346176822850048000',
  message:
    'Quote tweet this with the pun about your job Arnold Schwarzenegger would make if he killed you in a movie.',
  possibly_sensitive: false,
  source: 'Twitter for iPhone',
  created_at: '2021-01-04T19:28:59.000Z',
  reply_settings: 'everyone',
  conversation_id: '1346176822850048000',
  author_id: '44141752',
  entities: {},
  public_metrics: {
    retweet_count: 204,
    reply_count: 1249,
    like_count: 3177,
    quote_count: 6436,
  },
  author: {
    name: 'Alice Moran',
    username: 'Alice_Moran',
    verified: true,
    id: '44141752',
    profile_image_url:
      'https://pbs.twimg.com/profile_images/1323387328937795585/HCrpxDv7_normal.jpg',
  },
};
