import styled, { css } from 'styled-components';

import TinyPieChart from 'src/components/Charts/TinyPieChart';
import Icon from 'src/components/Icon';
import {
  REPUTATIONS,
  REPUTATIONS_COLOR_MAP,
  REPUTATIONS_KO_MAP,
} from 'src/constants';
import { Color, ReputationType } from 'src/types';
import {
  approximateDuration,
  findMaxProperty,
  mapKeyValue,
  sumKey,
  sumProperties,
} from 'src/utils';

export type ReputationKeyValueData = { [key in ReputationType]: number };

export type OverviewPieChartProps = {
  /** 차트 제목 */
  title: string;
  /** 평판 데이터 key(positive, neutral, negative) - value(키워드 개수) pair 배열 */
  data: ReputationKeyValueData[];
  /** 이전 기간의 평판 데이터 */
  prevData: ReputationKeyValueData[];
  /** 통계 시작 지점 */
  from: Date;
  /** 통계 종료 지점 */
  to: Date;
} & Partial<StyledOverviewPieChartProps>;

export type StyledOverviewPieChartProps = {
  /** HTML 클래스 속성 */
  className?: string;
  /** 차트 색상 */
  color?: Color;
  /** 지난 기간 대비 증감 여부를 판단하는 기준 */
  criteria: number;
};

const StyledOverviewPieChart = styled.div<StyledOverviewPieChartProps>`
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

  .summary {
    box-sizing: border-box;
    width: 180px;
    padding: 15px 5px 8px 15px;

    header {
      margin-bottom: 14px;
      font-size: ${({ theme }) => theme.typography.size.s2};
      font-weight: ${({ theme }) => theme.typography.weight.medium};
      color: ${({ theme }) => theme.colors.Gray700};
    }

    .total-container {
      margin-bottom: 8px;
      font-size: ${({ theme }) => theme.typography.size.m2};
      font-weight: ${({ theme }) => theme.typography.weight.black};
      color: ${({ theme }) => theme.colors.Gray900};
    }

    footer {
      display: flex;
      align-items: center;

      .ratio {
        font-size: ${({ theme }) => theme.typography.size.s2};
        font-weight: ${({ theme }) => theme.typography.weight.medium};
      }

      i {
        width: 32px;
        height: 32px;
      }

      .duration {
        white-space: nowrap;
        font-size: ${({ theme }) => theme.typography.size.s1};
        font-weight: ${({ theme }) => theme.typography.weight.light};
        color: ${({ theme }) => theme.colors.Gray700};
      }

      ${({ criteria, theme }) => {
        if (criteria > 0) {
          return css`
            .ratio {
              color: ${theme.colors.Green400};
            }
            path {
              fill: ${theme.colors.Green400};
            }
          `;
        }
        if (criteria < 0) {
          return css`
            .ratio {
              color: ${theme.colors.Red400};
            }
            path {
              fill: ${theme.colors.Red400};
            }
          `;
        }
        return css`
          .ratio {
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
    padding: 10px;
  }
`;

function GetArrowIcon({ criteria }: { criteria: number }) {
  if (criteria > 0) {
    return <Icon size={20} icon="LongArrowUp" />;
  }
  if (criteria < 0) {
    return <Icon size={20} icon="LongArrowDown" />;
  }
  return <Icon size={20} icon="DashOutline" />;
}

function OverviewPieChart({
  title,
  from,
  to,
  data,
  prevData,
  color,
  ...props
}: OverviewPieChartProps) {
  const totalMap = mapKeyValue([...REPUTATIONS], ({ cur }) =>
    sumKey(data, cur)
  );
  const prevTotalMap = mapKeyValue([...REPUTATIONS], ({ cur }) =>
    sumKey(prevData, cur)
  );

  const top = findMaxProperty(totalMap);
  const topRatio = Math.round((totalMap[top] / sumProperties(totalMap)) * 100);
  const prevTopRatio = Math.round(
    (prevTotalMap[top] / sumProperties(prevTotalMap)) * 100
  );

  const prevOverRatio = topRatio - prevTopRatio;

  return (
    <StyledOverviewPieChart criteria={prevOverRatio} {...props}>
      <div className="summary">
        <header>
          <span className="title">{title}</span>
        </header>
        <div className="total-container">
          <span className="total">{REPUTATIONS_KO_MAP[top]}</span>
        </div>
        <footer>
          <span className="ratio">
            {Number.isNaN(prevOverRatio) ? 0 : Math.abs(prevOverRatio)}%
          </span>
          <GetArrowIcon criteria={prevOverRatio} />
          <span className="duration">
            지난 {approximateDuration(from, to)} 대비
          </span>
        </footer>
      </div>
      <TinyPieChart ratio={topRatio} color={REPUTATIONS_COLOR_MAP[top]} />
    </StyledOverviewPieChart>
  );
}

export default OverviewPieChart;
