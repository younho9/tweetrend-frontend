import { hexToRGBA } from 'src/styles/utils';

describe('000000 ~ ffffff 범위 내의 문자열에 0 ~ 1 사이의 alpha 값을 적용해 css rgba() 형태로 변경', () => {
  it('범위 내 문자열 테스트', () => {
    expect(hexToRGBA('#ffffff', 1)).toEqual('rgba(255, 255, 255, 1)');
    expect(hexToRGBA('#6f38b1', 0.1)).toEqual('rgba(111, 56, 177, 0.1)');
    expect(hexToRGBA('#000000', 0)).toEqual('rgba(0, 0, 0, 0)');
  });
  it('범위 밖의 문자열 테스트', () => {
    expect(() => hexToRGBA('#ffffffd', 1)).toThrowError(
      new RangeError('hex must be 6-digit hexadecimal number')
    );
    expect(() => hexToRGBA('#gggggg', 0.1)).toThrowError(
      new RangeError('hex must be 6-digit hexadecimal number')
    );
    expect(() => hexToRGBA('helloz', 0.1)).toThrowError(
      new RangeError('hex must be 6-digit hexadecimal number')
    );
  });
  it('범위 밖의 alpha 테스트', () => {
    expect(() => hexToRGBA('#ffffff', 2)).toThrowError(
      new RangeError('alpha must be between 0.0 and 1.0')
    );
    expect(() => hexToRGBA('#000000', -1)).toThrowError(
      new RangeError('alpha must be between 0.0 and 1.0')
    );
  });
});
