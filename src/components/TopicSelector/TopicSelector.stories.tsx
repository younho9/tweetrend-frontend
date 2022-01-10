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

import TopicSelector, { TopicSelectorProps } from './TopicSelector';

export default {
  title: 'Components/TopicSelector',
  component: TopicSelector,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Figma url="https://www.figma.com/" />
          <Stories />
        </>
      ),
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/',
    },
  },
} as Meta;

export const Default: Story<TopicSelectorProps> = (args) => (
  <TopicSelector {...args} />
);
Default.args = {};
