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
import StoryRouter from 'storybook-react-router';

import Header, { HeaderProps } from './Header';

export default {
  title: 'Components/Header',
  component: Header,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Figma url="https://www.figma.com/file/3HZ3hzFyIBHORWB6MVqxna/TweetTrend?node-id=311%3A47" />
          <Stories />
        </>
      ),
    },
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/3HZ3hzFyIBHORWB6MVqxna/TweetTrend?node-id=311%3A47',
    },
  },
  decorators: [StoryRouter()],
} as Meta;

export const Default: Story<HeaderProps> = (args) => <Header {...args} />;
Default.args = {
  user: {
    id: '937698624',
    name: 'Linus Torvalds',
    username: 'Linus__Torvalds',
    profile_image_url:
      'https://pbs.twimg.com/profile_images/2828597835/0f1840e9c2fbafa93fe6f0d7ccf64a3e_normal.jpeg',
  },
};

export const NotSignedIn: Story<HeaderProps> = (args) => <Header {...args} />;
NotSignedIn.args = {};
