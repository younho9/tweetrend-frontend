import { Story, Meta } from '@storybook/react/types-6-0';

import CountPage, { CountPageProps } from './CountPage';

export default {
  title: 'Page/CountPage',
  component: CountPage,
} as Meta;

export const Default: Story<CountPageProps> = (args) => <CountPage {...args} />;
Default.args = {};
