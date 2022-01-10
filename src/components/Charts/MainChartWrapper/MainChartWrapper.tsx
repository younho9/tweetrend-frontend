import React from 'react';
import styled from 'styled-components';

import CustomLegend from 'src/components/Charts/CustomLegend';
import { padding } from 'src/styles/utils';
import { BoxSizeShorthandProps, Color } from 'src/types';

export type MainChartWrapperProps = {
  /** 차트 제목 */
  title: string;
  legend?: { name: string; color: Color }[];
} & Partial<StyledMainChartWrapperProps>;

export type StyledMainChartWrapperProps = {
  /** HTML 클래스 속성 */
  className?: string;
  /** 마진 추가 여부 */
  withMargin: boolean;
  /** 담기는 콘텐츠의 padding 정보 */
  contentsPadding?: BoxSizeShorthandProps;
};

const StyledMainChartWrapper = styled.div<StyledMainChartWrapperProps>`
  display: inline-block;
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.colors.Gray400};
  border-radius: 6px;
  width: max-content;
  margin: ${({ withMargin }) => withMargin && '15px'};
  background-color: ${({ theme }) => theme.colors.Gray50};

  .title {
    box-sizing: border-box;
    padding: 24px 24px 12px;
    color: ${({ theme }) => theme.colors.Gray900};
    font-weight: ${({ theme }) => theme.typography.weight.bold};
    font-size: ${({ theme }) => theme.typography.size.m2};
  }

  .custom-legend {
    padding: 10px 0px 10px 20px;
  }

  .content-wrapper {
    overflow: scroll;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */

    &::-webkit-scrollbar {
      display: none;
    }

    ${({ contentsPadding }) => contentsPadding && padding(...contentsPadding)};
  }
`;

function MainChartWrapper<P extends Record<string, unknown>>(
  Component: React.ComponentType<P>
) {
  type Ref = HTMLDivElement;
  type Props = MainChartWrapperProps & P;

  return React.forwardRef<Ref, Props>(
    (
      {
        title,
        withMargin = false,
        contentsPadding = [12, 24, 28],
        legend,
        ...props
      }: Props,
      ref
    ) => (
      <StyledMainChartWrapper
        withMargin={withMargin}
        contentsPadding={contentsPadding}>
        <div className="title" ref={ref}>
          {title}
        </div>
        {legend && <CustomLegend className="custom-legend" colorMap={legend} />}
        <div className="content-wrapper">
          <Component {...(props as P)} />
        </div>
      </StyledMainChartWrapper>
    )
  );
}

export default MainChartWrapper;
