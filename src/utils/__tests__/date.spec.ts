import { WithDateData } from 'src/types';
import {
  dateDiff,
  dateToUTC,
  getPrevDate,
  sameDay,
  utcToMs,
  utcToMsAll,
  createPrevDate,
} from 'src/utils';

describe('date 객체를 seconds 단위인 UTC timestamp로 변경', () => {
  let date: Date;

  beforeEach(() => {
    date = new Date(1612338487427);
  });

  test('1612338487427 => 1612338487', () => {
    expect(dateToUTC(date)).toEqual(1612338487);
  });
});

describe('utc timestamp(s 단위)를 ms단위로 변경', () => {
  test('1612338487 => 1612338487000', () => {
    expect(utcToMs(1612338487)).toEqual(1612338487000);
  });
});

describe('date: utc timestamp(s 단위) 키를 가진 객체 배열을 모두 ms단위로 변경함', () => {
  let data: WithDateData[];

  beforeEach(() => {
    data = [
      { date: 1612338487 },
      { date: 1612338488 },
      { date: 1612338489 },
      { date: 1612338490 },
    ];
  });

  test('배열 길이 유지되는지 테스트', () => {
    expect(utcToMsAll(data)).toHaveLength(data.length);
  });

  test('date 키를 가지는지 테스트', () => {
    utcToMsAll(data).map((dt) => expect(dt).toHaveProperty('date'));
  });

  test('ms 단위로 변환되는지 테스트', () => {
    utcToMsAll(data).map((dt, idx) =>
      expect(dt.date).toEqual(data[idx].date * 1000)
    );
  });
});

describe('두 Date 객체의 일 단위 차이를 반환함', () => {
  let now: Date;

  beforeEach(() => {
    now = new Date();
  });

  test('25일 차이', () => {
    expect(dateDiff(createPrevDate(now, 25), now)).toEqual(25);
  });

  test('90일 차이', () => {
    expect(dateDiff(createPrevDate(now, 90), now)).toEqual(90);
  });

  test('17일 차이', () => {
    expect(dateDiff(createPrevDate(now, 17), now)).toEqual(17);
  });

  test('61일 차이', () => {
    expect(dateDiff(createPrevDate(now, 61), now)).toEqual(61);
  });
});

describe('from, to의 차이 만큼 from보다 이전인 Date 객체를 반환함', () => {
  let to: Date;

  beforeEach(() => {
    to = new Date();
  });

  test('from이 to보다 5일 이전이면 prev는 to보다 10일 이전', () => {
    const from = createPrevDate(to, 5);
    const prev = getPrevDate(from, to);

    expect(dateDiff(prev, from)).toEqual(dateDiff(from, to));
    expect(dateDiff(prev, to)).toEqual(10);
  });

  test('from이 to보다 1일 이전이면 prev는 to보다 2일 이전', () => {
    const from = createPrevDate(to, 1);
    const prev = getPrevDate(from, to);

    expect(dateDiff(prev, from)).toEqual(dateDiff(from, to));
    expect(dateDiff(prev, to)).toEqual(2);
  });
});

describe('같은 날인지 테스트', () => {
  let first: Date;
  let second: Date;

  beforeEach(() => {
    first = new Date();
    second = createPrevDate(first, 2);
  });

  test('같은 날이면 true 반환', () => {
    expect(sameDay(first, first)).toEqual(true);
  });

  test('다른 날이면 false 반환', () => {
    expect(sameDay(first, second)).toEqual(false);
  });
});
