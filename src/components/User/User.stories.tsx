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

import User, { UserProps } from './User';

export default {
  title: 'Components/User',
  component: User,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Figma url="https://www.figma.com/file/3HZ3hzFyIBHORWB6MVqxna/TweetTrend?node-id=311%3A4" />
          <Stories />
        </>
      ),
    },
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/3HZ3hzFyIBHORWB6MVqxna/TweetTrend?node-id=311%3A4',
    },
  },
} as Meta;

export const Default: Story<UserProps> = (args) => <User {...args} />;
Default.args = {
  user: {
    id: '70345946',
    name: 'Dan Abramov',
    username: 'dan_abramov',
    profile_image_url:
      'https://pbs.twimg.com/profile_images/1336281436685541376/fRSl8uJP_normal.jpg',
  },
};
