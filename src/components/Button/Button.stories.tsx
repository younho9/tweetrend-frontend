import { action } from '@storybook/addon-actions';
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

import { iconKeys } from '../Icon';

import Button, { ButtonProps } from './Button';

export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Figma url="https://www.figma.com/file/3HZ3hzFyIBHORWB6MVqxna/TweetTrend?node-id=171%3A424" />
          <Stories />
        </>
      ),
    },
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/3HZ3hzFyIBHORWB6MVqxna/TweetTrend?node-id=171%3A424',
    },
  },
  argTypes: {
    icon: {
      control: {
        type: 'select',
        options: iconKeys,
      },
    },
  },
} as Meta;

export const Default: Story<ButtonProps> = (args) => <Button {...args} />;
Default.args = {
  children: 'Default',
  onClick: action("I'm Default!"),
};

export const Informative: Story<ButtonProps> = (args) => <Button {...args} />;
Informative.args = {
  size: 'medium',
  children: 'Informative',
  variants: 'informative',
  onClick: action("I'm Informative!"),
};

export const Notice: Story<ButtonProps> = (args) => <Button {...args} />;
Notice.args = {
  size: 'medium',
  children: 'Notice',
  variants: 'notice',
  onClick: action("I'm Notice!"),
};

export const Positive: Story<ButtonProps> = (args) => <Button {...args} />;
Positive.args = {
  size: 'medium',
  children: 'Positive',
  variants: 'positive',
  onClick: action("I'm Positive!"),
};

export const Negative: Story<ButtonProps> = (args) => <Button {...args} />;
Negative.args = {
  size: 'medium',
  children: 'Negative',
  variants: 'negative',
  onClick: action("I'm Negative!"),
};

export const WithIcon: Story<ButtonProps> = (args) => <Button {...args} />;
WithIcon.args = {
  size: 'medium',
  icon: 'TwitterFill',
  children: 'Tweet',
};

export const Filled: Story<ButtonProps> = (args) => <Button {...args} />;
Filled.args = {
  size: 'medium',
  variants: 'informative',
  children: 'Filled',
  filled: true,
};

export const Rounded: Story<ButtonProps> = (args) => <Button {...args} />;
Rounded.args = {
  size: 'medium',
  variants: 'informative',
  children: 'Rounded',
  rounded: true,
};

export const Disabled: Story<ButtonProps> = (args) => <Button {...args} />;
Disabled.args = {
  size: 'medium',
  variants: 'informative',
  children: 'Disabled',
  disabled: true,
};

export const TextOnly: Story<ButtonProps> = (args) => <Button {...args} />;
TextOnly.args = {
  size: 'medium',
  variants: 'informative',
  children: 'TextOnly',
  textOnly: true,
};

export const IconOnly: Story<ButtonProps> = (args) => <Button {...args} />;
IconOnly.args = {
  size: 'medium',
  variants: 'informative',
  icon: 'TwitterFill',
  iconOnly: true,
  rounded: true,
};

export const CustomWidth: Story<ButtonProps> = (args) => <Button {...args} />;
CustomWidth.args = {
  size: 'medium',
  width: '240px',
  variants: 'informative',
  children: 'CustomWidth',
};

const StyledButtonWrapper = styled.div`
  margin: 10px;

  .description {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  .variants-desc {
    display: flex;
    width: 100%;
    margin-bottom: 60px;
    justify-content: space-between;
  }

  .variants {
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 60px;
  }
  & > div + div {
    margin-top: 2rem;
  }
`;

export const Variants: Story<ButtonProps> = (args) => {
  return (
    <StyledButtonWrapper>
      <div>
        <div className="variants-desc">
          <div className="description">/</div>
          <div className="description">Default</div>
          <div className="description">Filled</div>
          <div className="description">Rounded</div>
          <div className="description">Disabled</div>
          <div className="description">TextOnly</div>
          <div className="description">WithIcon</div>
        </div>
        <div className="variants">
          <div className="description">Default</div>
          <Default>Default</Default>
          <Default filled>Default</Default>
          <Default rounded>Default</Default>
          <Default disabled>Default</Default>
          <Default textOnly>Default</Default>
          <Default icon="TwitterFill">Default</Default>
        </div>
        <div className="variants">
          <div className="description">Informative</div>
          <Informative variants="informative">Informative</Informative>
          <Informative variants="informative" filled>
            Informative
          </Informative>
          <Informative variants="informative" rounded>
            Informative
          </Informative>
          <Informative variants="informative" disabled>
            Informative
          </Informative>
          <Informative variants="informative" textOnly>
            Informative
          </Informative>
          <Informative variants="informative" icon="TwitterFill">
            Informative
          </Informative>
        </div>
        <div className="variants">
          <div className="description">Notice</div>
          <Notice variants="notice">Notice</Notice>
          <Notice variants="notice" filled>
            Notice
          </Notice>
          <Notice variants="notice" rounded>
            Notice
          </Notice>
          <Notice variants="notice" disabled>
            Notice
          </Notice>
          <Notice variants="notice" textOnly>
            Notice
          </Notice>
          <Notice variants="notice" icon="TwitterFill">
            Notice
          </Notice>
        </div>
        <div className="variants">
          <div className="description">Positive</div>
          <Positive variants="positive">Positive</Positive>
          <Positive variants="positive" filled>
            Positive
          </Positive>
          <Positive variants="positive" rounded>
            Positive
          </Positive>
          <Positive variants="positive" disabled>
            Positive
          </Positive>
          <Positive variants="positive" textOnly>
            Positive
          </Positive>
          <Positive variants="positive" icon="TwitterFill">
            Positive
          </Positive>
        </div>
        <div className="variants">
          <div className="description">Negative</div>
          <Negative variants="negative">Negative</Negative>
          <Negative variants="negative" filled>
            Negative
          </Negative>
          <Negative variants="negative" rounded>
            Negative
          </Negative>
          <Negative variants="negative" disabled>
            Negative
          </Negative>
          <Negative variants="negative" textOnly>
            Negative
          </Negative>
          <Negative variants="negative" icon="TwitterFill">
            Negative
          </Negative>
        </div>
      </div>
    </StyledButtonWrapper>
  );
};

export const Sizes: Story<ButtonProps> = (args) => {
  return (
    <StyledButtonWrapper>
      <div>
        <div className="description">Small</div>
        <Button {...args} size="small">
          Small
        </Button>
      </div>
      <div>
        <div className="description">Medium</div>
        <Button {...args} size="medium">
          Medium
        </Button>
      </div>
      <div>
        <div className="description">Large</div>
        <Button {...args} size="large">
          Large
        </Button>
      </div>
      <div>
        <div className="description">Extra Large</div>
        <Button {...args} size="extraLarge">
          Extra Large
        </Button>
      </div>
    </StyledButtonWrapper>
  );
};
Sizes.args = {
  icon: 'TwitterFill',
};
