import styled, { css } from 'styled-components';

import TinyAreaChart from 'src/components/Charts/TinyAreaChart';
import Icon from 'src/components/Icon';
import { Color } from 'src/types';
import { abbreviateNumber, approximateDuration, sumKey } from 'src/utils';

export type OverviewAreaChartProps = {
  /** 차트 제목 */
  title: string;
  /** 데이터 key(이름) */
  dataKey: string;
  /** 데이터 key-value pair의 배열 */
  data: Record<string, number>[];
  /** 이전 기간의 데이터의 합계 */
  prevTotal: number;
  /** 통계 시작 지점 */
  from: Date;
  /** 통계 종료 지점 */
  to: Date;

  onClick?: React.MouseEventHandler<HTMLElement>;
} & Partial<StyledOverviewAreaChartProps>;

export type StyledOverviewAreaChartProps = {
  /** HTML 클래스 속성 */
  className?: string;
  /** 차트 색상 */
  color?: Color;
  /** 지난 기간 대비 증감 여부를 판단하는 기준 */
  criteria: number;
};

const StyledOverviewAreaChart = styled.div<StyledOverviewAreaChartProps>`
  display: inline-flex;
  align-items: flex-end;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.Gray50};
  border: 1px solid ${({ theme }) => theme.colors.Gray400};
  border-radius: 6px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.Gray75};
    border-color: ${({ theme }) => theme.colors.Gray500};
  }

  & > .area-chart-summary {
    box-sizing: border-box;
    width: 180px;
    padding: 15px 5px 8px 15px;

    & > .area-chart-header {
      margin-bottom: 14px;
      font-size: ${({ theme }) => theme.typography.size.s2};
      font-weight: ${({ theme }) => theme.typography.weight.medium};
      color: ${({ theme }) => theme.colors.Gray700};
    }

    & > .area-chart-total-container {
      margin-bottom: 8px;
      font-size: ${({ theme }) => theme.typography.size.m2};
      font-weight: ${({ theme }) => theme.typography.weight.black};
      color: ${({ theme }) => theme.colors.Gray900};
    }

    .area-chart-footer {
      display: flex;
      align-items: center;

      & > .area-chart-ratio {
        font-size: ${({ theme }) => theme.typography.size.s2};
        font-weight: ${({ theme }) => theme.typography.weight.medium};
      }

      & > i {
        width: 32px;
        height: 32px;
      }

      & > .area-chart-duration {
        white-space: nowrap;
        font-size: ${({ theme }) => theme.typography.size.s1};
        font-weight: ${({ theme }) => theme.typography.weight.light};
        color: ${({ theme }) => theme.colors.Gray700};
      }

      ${({ criteria, theme }) => {
        if (criteria > 0) {
          return css`
            .area-chart-ratio {
              color: ${theme.colors.Green400};
            }
            path {
              fill: ${theme.colors.Green400};
            }
          `;
        }
        if (criteria < 0) {
          return css`
            .area-chart-ratio {
              color: ${theme.colors.Red400};
            }
            path {
              fill: ${theme.colors.Red400};
            }
          `;
        }
        return css`
          .area-chart-ratio {
            color: ${theme.colors.Gray700};
          }
          path {
            fill: ${theme.colors.Gray700};
          }
        `;
      }}
    }
  }

  .recharts-wrapper {
    padding: 8px;
  }
`;

function GetArrowIcon({ criteria }: { criteria: number }) {
  if (criteria > 0) {
    return <Icon size={16} icon="LongArrowUp" />;
  }
  if (criteria < 0) {
    return <Icon size={16} icon="LongArrowDown" />;
  }
  return <Icon size={16} icon="DashOutline" />;
}

function OverviewAreaChart({
  title,
  from,
  to,
  dataKey,
  data,
  prevTotal,
  color,
  onClick,
  ...props
}: OverviewAreaChartProps) {
  const total = sumKey(data, dataKey);
  const prevOverRatio =
    prevTotal === 0 ? 100 : ((total - prevTotal) / prevTotal) * 100;

  const formattedRatio = Math.abs(Math.round(prevOverRatio * 10) / 10);

  return (
    <StyledOverviewAreaChart
      onClick={onClick}
      criteria={prevOverRatio}
      {...props}>
      <div className="area-chart-summary">
        <header className="area-chart-header">
          <span className="area-chart-title">{title}</span>
        </header>
        <div className="area-chart-total-container">
          <span className="area-chart-total">{abbreviateNumber(total)}</span>
        </div>
        <footer className="area-chart-footer">
          <span className="area-chart-ratio">{formattedRatio.toFixed(1)}%</span>
          <GetArrowIcon criteria={prevOverRatio} />
          <span className="area-chart-duration">
            지난 {approximateDuration(from, to)} 대비
          </span>
        </footer>
      </div>
      <TinyAreaChart dataKey={dataKey} data={data} color={color} />
    </StyledOverviewAreaChart>
  );
}

export default OverviewAreaChart;
