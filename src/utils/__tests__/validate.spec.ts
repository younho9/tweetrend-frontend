import {
  isCssUnitValue,
  cssUnits,
  convertValueToPixel,
  validateCssUnitValue,
} from 'src/utils';

describe('CSS 단위 문자열 유효성 검사', () => {
  it('유효한 CSS 단위 문자열', () => {
    cssUnits.map((unit) => expect(isCssUnitValue(`10${unit}`)).toEqual(true));
  });

  it('유효하지 않은 CSS 단위 문자열', () => {
    expect(isCssUnitValue(`10hex`)).toEqual(false);
    expect(isCssUnitValue('100')).toEqual(false);
  });
});

it('숫자를 px단위로 변환', () => {
  expect(convertValueToPixel(10)).toEqual('10px');
});

describe('undefined 또는 문자열 또는 숫자를 유효한 CSS 단위 문자열로 변환', () => {
  it('숫자를 px단위로 변환', () => {
    expect(validateCssUnitValue(10)).toEqual('10px');
  });

  it('유효한 CSS 단위는 그대로 사용', () => {
    cssUnits.map((unit) =>
      expect(validateCssUnitValue(`10${unit}`)).toEqual(`10${unit}`)
    );
  });

  it('숫자가 담긴 문자열은 px단위로 변환', () => {
    expect(validateCssUnitValue('10')).toEqual('10px');
    expect(validateCssUnitValue('10somestring')).toEqual('10px');
    expect(validateCssUnitValue('10somestring19')).toEqual('10px');
  });

  it('유효하지 않은 문자열은 auto로 변환', () => {
    expect(validateCssUnitValue('somestring')).toEqual('auto');
  });

  it('undefined는 auto로 변환', () => {
    expect(validateCssUnitValue()).toEqual('auto');
  });
});
