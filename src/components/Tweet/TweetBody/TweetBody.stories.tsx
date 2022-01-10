import { Story, Meta } from '@storybook/react/types-6-0';

import TweetBody, { TweetBodyProps } from './TweetBody';

export default {
  title: 'Components/Tweet/TweetBody',
  component: TweetBody,
} as Meta;

export const Default: Story<TweetBodyProps> = (args) => <TweetBody {...args} />;
Default.args = {
  message:
    '@swyx @wongmjane @biilmann @undef_obj @ednergizer I think there’s some confusion about WS. When I say streaming I just mean the ability to provide HTTP response progressively instead of all at once. Aka chunked encoding. https://t.co/VflmLfejEQ',
  replyTo: {
    id: '33521530',
    name: 'shawn swyx wang',
    profile_image_url:
      'https://pbs.twimg.com/profile_images/1336445471359823872/vgcUXO4W_normal.jpg',
    verified: false,
    username: 'swyx',
  },
};
