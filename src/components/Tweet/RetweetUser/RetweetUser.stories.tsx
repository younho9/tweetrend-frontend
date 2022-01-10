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

import RetweetUser, { RetweetUserProps } from './RetweetUser';

export default {
  title: 'Components/Tweet/RetweetUser',
  component: RetweetUser,
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

export const Default: Story<RetweetUserProps> = (args) => (
  <RetweetUser {...args} />
);
Default.args = {
  user: {
    id: '70345946',
    name: 'Dan Abramov',
    username: 'dan_abramov',
    profile_image_url:
      'https://pbs.twimg.com/profile_images/1336281436685541376/fRSl8uJP_normal.jpg',
  },
};
