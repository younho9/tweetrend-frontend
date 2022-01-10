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

import { UserData } from 'src/types';

import Avatar, { AvatarProps } from './Avatar';

export default {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Figma url="https://www.figma.com/file/3HZ3hzFyIBHORWB6MVqxna/TweetTrend?node-id=311%3A5" />
          <Stories />
        </>
      ),
    },
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/3HZ3hzFyIBHORWB6MVqxna/TweetTrend?node-id=311%3A5',
    },
  },
} as Meta;

export const Default: Story<AvatarProps> = (args) => <Avatar {...args} />;
Default.args = {
  user: {
    id: '937698624',
    name: 'Linus Torvalds',
    username: 'Linus__Torvalds',
  },
};

export const ExtraLarge: Story<AvatarProps> = (args) => {
  const { profile_image_url: src, ...withoutSrc } = args.user as UserData;

  return (
    <div>
      <Avatar {...args} size="extraLarge" isLoading />
      <Avatar user={withoutSrc} size="extraLarge" />
      <Avatar {...args} size="extraLarge" />
    </div>
  );
};
ExtraLarge.args = {
  user: {
    id: '937698624',
    name: 'Linus Torvalds',
    username: 'Linus__Torvalds',
    profile_image_url:
      'https://pbs.twimg.com/profile_images/2828597835/0f1840e9c2fbafa93fe6f0d7ccf64a3e_normal.jpeg',
  },
};

export const Large: Story<AvatarProps> = (args) => {
  const { profile_image_url: src, ...withoutSrc } = args.user as UserData;

  return (
    <div>
      <Avatar {...args} size="large" isLoading />
      <Avatar user={withoutSrc} size="large" />
      <Avatar {...args} size="large" />
    </div>
  );
};
Large.args = {
  user: {
    id: '1636590253',
    name: 'Tim Cook',
    username: 'tim_cook',
    profile_image_url:
      'https://pbs.twimg.com/profile_images/1194113737092935681/63O1znGw_normal.jpg',
  },
};

export const Medium: Story<AvatarProps> = (args) => {
  const { profile_image_url: src, ...withoutSrc } = args.user as UserData;

  return (
    <div>
      <Avatar {...args} size="medium" isLoading />
      <Avatar user={withoutSrc} size="medium" />
      <Avatar {...args} size="medium" />
    </div>
  );
};

Medium.args = {
  user: {
    id: '70345946',
    name: 'Dan Abramov',
    username: 'dan_abramov',
    profile_image_url:
      'https://pbs.twimg.com/profile_images/1336281436685541376/fRSl8uJP_normal.jpg',
  },
};

export const Small: Story<AvatarProps> = (args) => {
  const { profile_image_url: src, ...withoutSrc } = args.user as UserData;

  return (
    <div>
      <Avatar {...args} size="small" isLoading />
      <Avatar user={withoutSrc} size="small" />
      <Avatar {...args} size="small" />
    </div>
  );
};
Small.args = {
  user: {
    id: '389681470',
    name: 'Kent C. Dodds',
    username: 'kentcdodds',
    profile_image_url:
      'https://pbs.twimg.com/profile_images/759557613445001216/6M2E1l4q_normal.jpg',
  },
};
