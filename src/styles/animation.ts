import { keyframes } from 'styled-components';

export const glow = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: .4; }
`;

export const rotate = keyframes`
  100% {
      transform: rotate(360deg);
    }
`;

export const dash = keyframes`
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
`;
