import styled from 'styled-components';

import { dash, rotate } from 'src/styles';
import { Color } from 'src/types';

export type SpinnerProps = {
  /** Spinner 색상 */
  color?: Color;
  /** HTML 클래스 속성 */
  className?: string;
};

const StyledSpinner = styled.svg<SpinnerProps>`
  animation: ${rotate} 2s linear infinite;
  z-index: 2;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -25px 0 0 -25px;
  width: 50px;
  height: 50px;

  & .path {
    stroke: ${({ theme, color }) => color && theme.colors[color]};
    stroke-linecap: round;
    animation: ${dash} 1.5s ease-in-out infinite;
  }
`;

function Spinner({ color = 'Gray700' }: SpinnerProps) {
  return (
    <StyledSpinner color={color} viewBox="0 0 50 50" cx={25} cy={25} r={20}>
      <circle
        className="path"
        cx={25}
        cy={25}
        r={20}
        fill="none"
        strokeWidth="5"
      />
    </StyledSpinner>
  );
}

export default Spinner;
