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

import Sidebar, { SidebarProps } from './Sidebar';

export default {
  title: 'Components/Sidebar',
  component: Sidebar,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Figma url="https://www.figma.com/file/3HZ3hzFyIBHORWB6MVqxna/TweetTrend?node-id=363%3A119" />
          <Stories />
        </>
      ),
    },
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/3HZ3hzFyIBHORWB6MVqxna/TweetTrend?node-id=363%3A119',
    },
  },
} as Meta;

export const Default: Story<SidebarProps> = (args) => <Sidebar {...args} />;
Default.args = {};
