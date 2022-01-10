import {
  createPrevDate,
  createPrevHour,
  genMockData,
  genRandomInt,
} from 'src/utils';

describe('기준 날짜에 대한 이전 날짜 객체 반환', () => {
  let now: Date;

  beforeEach(() => {
    now = new Date();
  });

  it('오늘 기준 3일 전', () => {
    // TODO: 비교 기준 변경 필요
    // expect(now.getDate() - createPrevDate(now, 3).getDate()).toEqual(3);
  });
});

describe('기준 날짜의 시간에 대한 이전 시간 날짜 객체 반환', () => {
  let now: Date;

  beforeEach(() => {
    now = new Date();
  });

  it('현재 기준 3시간 전', () => {
    expect(
      Math.abs(now.getTime() - createPrevHour(now, 3).getTime()) / 36e5
    ).toEqual(3);
  });
});

describe('genRandomInt()', () => {
  test('min 이상 max 이하의 값을 반환한다.', () => {
    expect(genRandomInt(0, 10)).toBeGreaterThanOrEqual(0);
    expect(genRandomInt(0, 10)).toBeLessThanOrEqual(10);
  });
});

describe('목 데이터 생성 테스트', () => {
  let mockData: Record<string, number>[];
  let sample: Record<string, number>;
  let sampleValue: number;

  beforeEach(() => {
    mockData = genMockData({
      dataKeys: ['retweet', 'quoted'],
      count: 5,
      min: 0,
      max: 100,
    });
    [sample] = mockData;
    sampleValue = sample.retweet;
  });

  test('5개의 가짜 데이터를 생성한다.', () => {
    expect(mockData).toHaveLength(5);
  });

  test('retweet 키를 가진다.', () => {
    expect(sample).toHaveProperty('retweet');
  });

  test('quoted 키를 가진다.', () => {
    expect(sample).toHaveProperty('quoted');
  });

  test('샘플 값은 0부터 100이하의 값을 가진다.', () => {
    expect(sampleValue).toBeGreaterThanOrEqual(0);
    expect(sampleValue).toBeLessThanOrEqual(100);
  });
});
