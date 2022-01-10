import { Story, Meta } from '@storybook/react/types-6-0';

import ChartContainerDesc, {
  ChartContainerDescProps,
} from './ChartContainerDesc';

export default {
  title: 'Charts/ChartContainerDesc',
  component: ChartContainerDesc,
} as Meta;

export const Default: Story<ChartContainerDescProps> = (args) => (
  <ChartContainerDesc {...args} />
);
Default.args = {};
