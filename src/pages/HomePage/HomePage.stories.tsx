import { Story, Meta } from '@storybook/react/types-6-0';

import HomePage, { HomePageProps } from './HomePage';

export default {
  title: 'Page/HomePage',
  component: HomePage,
} as Meta;

export const Default: Story<HomePageProps> = (args) => <HomePage {...args} />;
Default.args = {};
