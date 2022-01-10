import { css } from 'styled-components';

import NotoSansKRBlackWoff from './NotoSansKR/NotoSansKR-Black.woff';
import NotoSansKRBlackWoff2 from './NotoSansKR/NotoSansKR-Black.woff2';
import NotoSansKRBoldWoff from './NotoSansKR/NotoSansKR-Bold.woff';
import NotoSansKRBoldWoff2 from './NotoSansKR/NotoSansKR-Bold.woff2';
import NotoSansKRLightWoff from './NotoSansKR/NotoSansKR-Light.woff';
import NotoSansKRLightWoff2 from './NotoSansKR/NotoSansKR-Light.woff2';
import NotoSansKRMediumWoff from './NotoSansKR/NotoSansKR-Medium.woff';
import NotoSansKRMediumWoff2 from './NotoSansKR/NotoSansKR-Medium.woff2';
import NotoSansKRRegularWoff from './NotoSansKR/NotoSansKR-Regular.woff';
import NotoSansKRRegularWoff2 from './NotoSansKR/NotoSansKR-Regular.woff2';
import NotoSansKRThinWoff from './NotoSansKR/NotoSansKR-Thin.woff';
import NotoSansKRThinWoff2 from './NotoSansKR/NotoSansKR-Thin.woff2';

export default css`
  @font-face {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 100;
    src: url(${NotoSansKRThinWoff2}) format('woff2'),
      url(${NotoSansKRThinWoff}) format('woff');
  }
  @font-face {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 300;
    src: url(${NotoSansKRLightWoff2}) format('woff2'),
      url(${NotoSansKRLightWoff}) format('woff');
  }
  @font-face {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    src: url(${NotoSansKRRegularWoff2}) format('woff2'),
      url(${NotoSansKRRegularWoff}) format('woff');
  }
  @font-face {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 500;
    src: url(${NotoSansKRMediumWoff2}) format('woff2'),
      url(${NotoSansKRMediumWoff}) format('woff');
  }
  @font-face {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 700;
    src: url(${NotoSansKRBoldWoff2}) format('woff2'),
      url(${NotoSansKRBoldWoff}) format('woff');
  }
  @font-face {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 900;
    src: url(${NotoSansKRBlackWoff2}) format('woff2'),
      url(${NotoSansKRBlackWoff}) format('woff');
  }
`;
