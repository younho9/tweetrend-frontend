import { TrendAnalysisData } from 'src/types';
import { getReputationData } from 'src/utils';

describe('Reputation 데이터 배열을 차트 컴포넌트에 주입할 형태로 처리', () => {
  let analysisData: TrendAnalysisData[];

  beforeEach(() => {
    analysisData = [
      {
        date: 1612234800,
        reputation: [
          {
            name: 'positive',
            counts: 308,
          },
          {
            name: 'negative',
            counts: 112,
          },
          {
            name: 'neutral',
            counts: 576,
          },
        ],
      },
      {
        date: 1612238400,
        reputation: [
          {
            name: 'positive',
            counts: 308,
          },
          {
            name: 'negative',
            counts: 98,
          },
          {
            name: 'neutral',
            counts: 549,
          },
        ],
      },
      {
        date: 1612242000,
        reputation: [
          {
            name: 'positive',
            counts: 271,
          },
          {
            name: 'negative',
            counts: 77,
          },
          {
            name: 'neutral',
            counts: 474,
          },
        ],
      },
      {
        date: 1612245600,
        reputation: [
          {
            name: 'positive',
            counts: 306,
          },
          {
            name: 'negative',
            counts: 83,
          },
          {
            name: 'neutral',
            counts: 886,
          },
        ],
      },
    ];
  });

  test('배열의 길이가 같은지 테스트', () => {
    expect(getReputationData(analysisData)).toHaveLength(analysisData.length);
  });

  test('date, positive, negative, neutral 키를 가진 객체 배열을 반환', () => {
    expect(getReputationData(analysisData)[0]).toHaveProperty('date');
    expect(getReputationData(analysisData)[0]).toHaveProperty('positive');
    expect(getReputationData(analysisData)[0]).toHaveProperty('negative');
    expect(getReputationData(analysisData)[0]).toHaveProperty('neutral');
  });

  test('date가 ms단위로 변경되는지 테스트', () => {
    expect(getReputationData(analysisData)[0].date).toBe(1612234800000);
    expect(getReputationData(analysisData)[1].date).toBe(1612238400000);
  });

  test('값이 보존되는지 테스트', () => {
    expect(getReputationData(analysisData)[0].positive).toBe(308);
  });
});
