import { Story, Meta } from '@storybook/react/types-6-0';

import RelationPage, { RelationPageProps } from './ReputationPage';

export default {
  title: 'Page/RelationPage',
  component: RelationPage,
} as Meta;

export const Default: Story<RelationPageProps> = (args) => (
  <RelationPage {...args} />
);
Default.args = {};
