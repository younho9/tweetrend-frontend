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
import styled from 'styled-components';

import Icon, { iconKeys, IconProps } from './Icon';

export default {
  title: 'Components/Icon',
  component: Icon,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Figma url="https://www.figma.com/file/3HZ3hzFyIBHORWB6MVqxna/TweetTrend?node-id=12%3A42" />
          <Stories />
        </>
      ),
    },
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/3HZ3hzFyIBHORWB6MVqxna/TweetTrend?node-id=12%3A42',
    },
  },
} as Meta;

export const Default: Story<IconProps> = (args) => <Icon {...args} />;
Default.args = {
  icon: 'UserFill',
  size: 24,
};

const Label = styled.label`
  color: #666;
  font-size: 12px;
`;

const Item = styled.li`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  flex: 0 1 20%;
  min-width: 120px;
  padding: 0px 7.5px 20px;

  svg {
    margin-right: 10px;
  }
`;

const List = styled.ul`
  margin-top: 12px;
  display: flex;
  flex-flow: row wrap;
  list-style: none;
`;

export const Labels: Story<IconProps> = (args) => (
  <>
    <p>There are {iconKeys.length} icons</p>
    <List>
      {iconKeys.map((key) => (
        <Item key={key}>
          <Icon {...args} icon={key} />
          <Label>{key}</Label>
        </Item>
      ))}
    </List>
  </>
);

Labels.args = {
  size: 24,
};
