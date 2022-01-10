import { DataWithCountsType } from 'src/types';
import {
  findMaxObj,
  sumKey,
  findMaxProperty,
  sumProperties,
  mapKeyValue,
  genArrayWithCallback,
  head,
  tail,
} from 'src/utils';

import { match, mergeObj, rankObj } from '../manipulate';

describe('match()', () => {
  const obj = { a: 1 };

  it('key에 대한 value가 맞다면 true', () => {
    expect(match('a', 1)(obj)).toEqual(true);
  });

  it('key에 대한 value가 다르면 false', () => {
    expect(match('a', 0)(obj)).toEqual(false);
  });
});

describe('문자열 배열에 reduce 콜백 함수를 적용하여 객체를 만듬', () => {
  let sequence: string[];

  beforeEach(() => {
    sequence = ['first', 'second', 'third'];
  });

  it('["first","second", "third"] => { first: 1, second: 2, third:3 }', () => {
    expect(mapKeyValue(sequence, ({ idx }) => idx + 1)).toEqual({
      first: 1,
      second: 2,
      third: 3,
    });
  });
});

describe('길이와 함수를 받아 특정 길이의 함수를 적용한 배열 리턴', () => {
  it("idx를 받아 'idx * 10' key와 value로 하는 길이 7의 객체 배열 리턴", () => {
    expect(
      genArrayWithCallback(7, ({ idx }) => ({ [idx * 10]: idx * 10 }))
    ).toEqual([
      {
        '0': 0,
      },
      {
        '10': 10,
      },
      {
        '20': 20,
      },
      {
        '30': 30,
      },
      {
        '40': 40,
      },
      {
        '50': 50,
      },
      {
        '60': 60,
      },
    ]);
  });
});

describe('key(문자열)-value(숫자) 쌍에서 총 합계 반환', () => {
  let data: Record<string, number>;

  beforeEach(() => {
    // 1 + ... + 10 = 55
    data = Array(10)
      .fill(null)
      .reduce(
        (obj, _, idx) => ({
          ...obj,
          [idx + 1]: idx + 1,
        }),
        {}
      );
  });

  test('1 + 2 + ... + 10 = 55', () => {
    expect(sumProperties(data)).toEqual(55);
  });
});

describe('data 배열의 값을 조회하여 합하는지 테스트', () => {
  let data: Record<string, number>[];

  beforeEach(() => {
    // 1 + ... + 10 = 55
    data = Array(10)
      .fill(null)
      .map((cur, idx) => ({
        count: idx + 1,
      }));
  });

  test('1 + 2 + ... + 10 = 55', () => {
    expect(sumKey(data, 'count')).toEqual(55);
  });
});

describe('key(문자열)-value(숫자) 쌍에서 최대값인 key 반환', () => {
  let positiveAndNotSame: Record<string, number>;
  let negativeAndNotSame: Record<string, number>;
  let wholeAndNotSame: Record<string, number>;
  let wholeAndWithSame: Record<string, number>;

  beforeEach(() => {
    positiveAndNotSame = {
      four: 4,
      six: 6,
      three: 3,
      one: 1,
      two: 2,
      zero: 0,
    };

    negativeAndNotSame = {
      four: -4,
      six: -6,
      three: -3,
      one: -1,
      two: -2,
      zero: 0,
    };

    wholeAndNotSame = {
      'n-four': -4,
      'n-six': -6,
      one: 1,
      five: 5,
      'p-six': 6,
      zero: 0,
    };

    wholeAndWithSame = {
      four: -4,
      'n-six': -6,
      'p-six1': 6,
      one: 1,
      five: 5,
      'p-six2': 6,
      zero: 0,
    };
  });

  test('모두 0 또는 양수이고, 같은 값이 없을 때', () => {
    expect(findMaxProperty(positiveAndNotSame)).toEqual('six');
  });

  test('모두 0 또는 음수 이고, 같은 값이 없을 때', () => {
    expect(findMaxProperty(negativeAndNotSame)).toEqual('zero');
  });

  test('정수이고, 같은 값이 없을 때', () => {
    expect(findMaxProperty(wholeAndNotSame)).toEqual('p-six');
  });

  test('정수이고, 같은 값이 있을 때, 마지막 값을 반환', () => {
    expect(findMaxProperty(wholeAndWithSame)).toEqual('p-six2');
  });
});

describe('data 배열에서 특정 키가 최대인 객체 반환', () => {
  let positiveAndNotSame: DataWithCountsType<'count'>;
  let negativeAndNotSame: DataWithCountsType<'count'>;
  let wholeAndNotSame: DataWithCountsType<'count'>;
  let wholeAndWithSame: DataWithCountsType<'count'>;

  beforeEach(() => {
    positiveAndNotSame = [
      { count: 4, name: 'four' },
      { count: 6, name: 'six' },
      { count: 3, name: 'three' },
      { count: 1, name: 'one' },
      { count: 2, name: 'two' },
      { count: 0, name: 'zero' },
    ];

    negativeAndNotSame = [
      { count: -4, name: 'four' },
      { count: -6, name: 'six' },
      { count: -3, name: 'three' },
      { count: -1, name: 'one' },
      { count: -2, name: 'two' },
      { count: 0, name: 'zero' },
    ];

    wholeAndNotSame = [
      { count: -4, name: 'n-four' },
      { count: -6, name: 'n-six' },
      { count: 1, name: 'p-one' },
      { count: 5, name: 'p-five' },
      { count: 6, name: 'p-six' },
      { count: 0, name: 'zero' },
    ];

    wholeAndWithSame = [
      { count: -4, name: 'n-four' },
      { count: -6, name: 'n-six' },
      { count: 6, name: 'p-six1' },
      { count: 1, name: 'p-one' },
      { count: 5, name: 'p-five' },
      { count: 6, name: 'p-six2' },
      { count: 0, name: 'zero' },
    ];
  });

  test('모두 0 또는 양수이고, 같은 값이 없을 때', () => {
    expect(findMaxObj(positiveAndNotSame, 'count').name).toEqual('six');
  });

  test('모두 0 또는 음수 이고, 같은 값이 없을 때', () => {
    expect(findMaxObj(negativeAndNotSame, 'count').name).toEqual('zero');
  });

  test('정수이고, 같은 값이 없을 때', () => {
    expect(findMaxObj(wholeAndNotSame, 'count').name).toEqual('p-six');
  });

  test('정수이고, 같은 값이 있을 때, 마지막 값을 반환', () => {
    expect(findMaxObj(wholeAndWithSame, 'count').name).toEqual('p-six2');
  });
});

describe('배열 요소 조회', () => {
  let empty: any[];
  let hasEl: any[];

  beforeEach(() => {
    empty = [];
    hasEl = [1, 2];
  });

  it('head(): 빈 배열일 시 null 반환', () => {
    expect(head(empty)).toEqual(null);
  });

  it('tail(): 빈 배열일 시 null 반환', () => {
    expect(tail(empty)).toEqual(null);
  });

  it('head(): 요소가 있는 배열일 시 요소 반환', () => {
    expect(head(hasEl)).toEqual(1);
  });

  it('tail(): 요소가 있는 배열일 시 마지막 요소 반환', () => {
    expect(tail(hasEl)).toEqual(2);
  });
});

describe('mergeObj()', () => {
  it('객체 배열의 객체들을 병합함', () => {
    expect(mergeObj([{ a: 1 }, { b: 2 }])).toHaveProperty('a');
    expect(mergeObj([{ a: 1 }, { b: 2 }])).toHaveProperty('b');
  });

  it('키가 같다면 이후 값을 더함', () => {
    expect(mergeObj([{ a: 1 }, { a: 2 }])).toEqual({ a: 3 });
  });
});

describe('rankObj()', () => {
  it('count=1이면 etc로 모두 병합', () => {
    expect(rankObj({ a: 1, b: 2 }, 1)).toHaveLength(1);
    expect(rankObj({ a: 1, b: 2 }, 1)).toEqual([{ name: 'etc', counts: 3 }]);
  });
});
