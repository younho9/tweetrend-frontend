import styled from 'styled-components';

import { chartWidth } from 'src/styles/variables';
import { validateCssUnitValue } from 'src/utils';

export type ChartContainerTitleProps = {
  title: string;
} & Partial<StyledChartContainerTitleProps>;

export type StyledChartContainerTitleProps = {
  /** HTML 클래스 속성 */
  width: number | string;
  className?: string;
};

const StyledChartContainerTitle = styled.h2<StyledChartContainerTitleProps>`
  display: block;
  width: ${({ width }) => validateCssUnitValue(width)};
  margin: 45px 0 20px 20px;
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  font-size: ${({ theme }) => theme.typography.size.l1};
`;

function ChartContainerTitle({
  title,
  width = chartWidth,
}: ChartContainerTitleProps) {
  return (
    <StyledChartContainerTitle width={width}>{title}</StyledChartContainerTitle>
  );
}

export default ChartContainerTitle;
