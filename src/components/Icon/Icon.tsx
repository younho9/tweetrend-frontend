import styled, { css } from 'styled-components';

import { hexToRGBA } from 'src/styles';
import { Color } from 'src/types';

import * as icons from './svg';

export const iconKeys: IconType[] = Object.keys(icons) as any[];

export type IconType = keyof typeof icons;

export type IconProps = {
  /** 사용 할 아이콘 타입 */
  icon: IconType;
} & Partial<StyledIconProps>;

export type StyledIconProps = {
  /** HTML 클래스 속성 */
  className?: string;
  /** 같은 스타일로 렌더링할 엘리먼트 */
  as?: React.ElementType;
  /** 아이콘 크기 */
  size: number;
  /** 아이콘 색상 */
  color: Color;
  /** 아이콘 호버 시 색상 */
  hover?: Color;
};

const StyledIcon = styled.i<StyledIconProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 9999px;
  width: ${({ size }) => size + 8}px;
  height: ${({ size }) => size + 8}px;

  path {
    fill: ${({ color, theme }) => theme.colors[color] || 'currentColor'};
  }

  ${({ hover }) => {
    return (
      hover &&
      css`
        :hover {
          background-color: ${({ theme }) =>
            hexToRGBA(theme.colors[hover], 0.1)};

          path {
            fill: ${({ theme }) => theme.colors[hover] || 'currentColor'};
          }
        }
      `
    );
  }}
`;

function Icon({ icon, size = 24, color = 'Gray600', ...props }: IconProps) {
  const SVGIcon = icons[icon];

  return (
    <StyledIcon size={size} color={color} {...props}>
      <SVGIcon width={size} height={size} />
    </StyledIcon>
  );
}

export default Icon;
