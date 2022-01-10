import { Story, Meta } from '@storybook/react/types-6-0';

import Spinner, { SpinnerProps } from './Spinner';

export default {
  title: 'Components/Spinner',
  component: Spinner,
} as Meta;

export const Default: Story<SpinnerProps> = (args) => <Spinner {...args} />;
Default.args = {
  color: 'Gray700',
};
