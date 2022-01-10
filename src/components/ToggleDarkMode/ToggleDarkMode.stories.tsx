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

import ToggleDarkMode, { ToggleDarkModeProps } from './ToggleDarkMode';

export default {
  title: 'Components/ToggleDarkMode',
  component: ToggleDarkMode,
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

export const Default: Story<ToggleDarkModeProps> = (args) => (
  <ToggleDarkMode
    size={args.size}
    align={args.align}
    width={args.width}
    textOnly
  />
);
Default.args = {
  size: 'extraLarge',
  align: 'left',
  width: 185,
};
