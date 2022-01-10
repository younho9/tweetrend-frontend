import { TooltipPayload, TooltipProps } from 'recharts';
import styled from 'styled-components';

import { hexToRGBA } from 'src/styles';
import { addUnit, formatDate } from 'src/utils';

export type CustomTooltipFormatterArgs = {
  value?: string | number | readonly (string | number)[];
  name?: string;
  entry?: TooltipPayload;
  index?: number;
};

export type CustomTooltipProps = TooltipProps & {
  /** 데이터 단위 */
  unit?: string;
  /** 말풍선 여부 */
  arrow?: boolean;
  customFormatter?: (args: CustomTooltipFormatterArgs) => string;
} & Partial<StyledCustomTooltipProps>;

export type StyledCustomTooltipProps = {
  /** HTML 클래스 속성 */
  className?: string;
};

const StyledCustomTooltip = styled.div<StyledCustomTooltipProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  filter: ${({ theme }) =>
    `drop-shadow(0px 5px 15px ${hexToRGBA(theme.colors.Gray700, 0.1)})`};

  .tooltip-content {
    background-color: ${({ theme }) => theme.colors.Gray50};
    padding: 15px;

    .tooltip-date {
      font-weight: ${({ theme }) => theme.typography.weight.bold};
      font-size: ${({ theme }) => theme.typography.size.s3};
      margin-bottom: 16px;
    }

    .tooltip-datas {
      .tooltip-data {
        display: flex;
        align-items: center;
        height: 12px;
        line-height: 12px;
        margin-bottom: 12px;
        font-size: ${({ theme }) => theme.typography.size.s2};

        &:last-child {
          margin-bottom: 0px;
        }

        .tooltip-counts {
          text-align: center;
        }
      }
    }
  }

  .tooltip-arrow {
    top: 50px;
    left: 50px;
    width: 0;
    height: 0;
    background-color: transparent;
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    border-bottom: 12px solid transparent;
    border-top: 12px solid ${({ theme }) => theme.colors.Gray50};
  }
`;

export const ColorCircle = styled.div<{ color?: string; size?: number }>`
  width: ${({ size }) => size || 10}px;
  height: ${({ size }) => size || 10}px;
  border-radius: 9999px;
  background-color: ${({ color }) => color};
  margin-right: 8px;
`;

function CustomTooltip({
  active,
  unit = '',
  arrow = true,
  payload = [],
  customFormatter,
  cursor,
  ...props
}: CustomTooltipProps) {
  const dataMap = payload?.map(
    ({ payload: currData, dataKey, color, value }) => ({
      currData,
      dataKey,
      color,
      value,
      name: currData.name,
      fill: currData.fill,
      date: currData.date,
    })
  );
  const dataLen = dataMap?.length;

  return (
    <>
      {dataLen > 0 && active && (
        <StyledCustomTooltip {...props}>
          <div className="tooltip-content">
            {dataMap[0].date && (
              <p className="tooltip-date">
                {formatDate('YYMMDDHH')(dataMap[0].date)}
              </p>
            )}
            <ul className="tooltip-datas">
              {dataMap.map(
                ({ color, fill, value, name, currData, dataKey }, idx) => (
                  <li key={String(dataKey)} className="tooltip-data">
                    <ColorCircle color={color || fill} />
                    <p className="tooltip-counts">
                      <span>
                        {customFormatter
                          ? customFormatter({
                              value,
                              name,
                              entry: currData,
                              index: idx,
                            })
                          : dataKey}{' '}
                        :{' '}
                      </span>
                      <em>
                        {currData
                          ? addUnit(currData[`${dataKey}`], unit)
                          : ' -- '}
                      </em>
                    </p>
                  </li>
                )
              )}
            </ul>
          </div>
          {arrow && <div className="tooltip-arrow" />}
        </StyledCustomTooltip>
      )}
    </>
  );
}

export default CustomTooltip;
