import styled from 'styled-components';

import { chartWidth } from 'src/styles/variables';

export type ChartContainerDescProps = {
  desc: string;
} & Partial<StyledChartContainerDescProps>;

export type StyledChartContainerDescProps = {
  /** HTML 클래스 속성 */
  className?: string;
};

const StyledChartContainerDesc = styled.p<StyledChartContainerDescProps>`
  display: block;
  width: ${chartWidth};
  margin: 12px 0 10px 20px;
  font-weight: ${({ theme }) => theme.typography.weight.regular};
  font-size: ${({ theme }) => theme.typography.size.s3};
`;

function ChartContainerDesc({ desc }: ChartContainerDescProps) {
  return <StyledChartContainerDesc>{desc}</StyledChartContainerDesc>;
}

export default ChartContainerDesc;
