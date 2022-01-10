import { Story, Meta } from '@storybook/react/types-6-0';

import ChartContainerTitle, {
  ChartContainerTitleProps,
} from './ChartContainerTitle';

export default {
  title: 'Charts/ChartContainerTitle',
  component: ChartContainerTitle,
} as Meta;

export const Default: Story<ChartContainerTitleProps> = (args) => (
  <ChartContainerTitle {...args} />
);
Default.args = {};
