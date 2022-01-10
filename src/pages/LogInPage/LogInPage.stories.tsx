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

import LogInPage, { LogInPageProps } from './LogInPage';

export default {
  title: 'Page/LogInPage',
  component: LogInPage,
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

export const Default: Story<LogInPageProps> = (args) => <LogInPage {...args} />;
Default.args = {};
