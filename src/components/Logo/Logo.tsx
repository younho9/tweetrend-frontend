import styled from 'styled-components';

import { validateCssUnitValue } from 'src/utils';

import SVGLogo from './images';

export type LogoProps = Record<string, unknown> & Partial<StyledLogoProps>;

export type StyledLogoProps = {
  /** HTML 클래스 속성 */
  className?: string;
  /** 로고 너비 */
  width: number | string;
};

const StyledLogo = styled.div<StyledLogoProps>`
  display: inline-block;
  width: ${({ width }) => validateCssUnitValue(width)};
  cursor: pointer;
`;

function Logo({ width = 140, ...props }: LogoProps) {
  return (
    <StyledLogo width={width} {...props}>
      <SVGLogo width={width} height="100%" />
    </StyledLogo>
  );
}

export default Logo;
