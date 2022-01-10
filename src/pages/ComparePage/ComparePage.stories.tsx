import { Story, Meta } from '@storybook/react/types-6-0';

import ComparePage, { ComparePageProps } from './ComparePage';

export default {
  title: 'Page/ComparePage',
  component: ComparePage,
} as Meta;

export const Default: Story<ComparePageProps> = (args) => (
  <ComparePage {...args} />
);
Default.args = {};
