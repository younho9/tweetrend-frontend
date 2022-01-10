import {
  capitalizeFirstLetter,
  abbreviateNumber,
  approximateDuration,
  formatDate,
} from 'src/utils';

import { addUnit } from '../format';

describe('시간 표시 형식 포맷팅 테스트', () => {
  let date: Date;

  beforeEach(() => {
    date = new Date('2021-02-07T06:47:01.524Z');
  });

  it('YYYY년 MM월 DD일', () => {
    expect(formatDate('YYYYMMDD')(date)).toEqual('2021년 2월 7일');
  });

  it('YYMMDDHH', () => {
    expect(formatDate('YYMMDDHH')(date)).toEqual('21년 2월 7일 15시');
  });
  it('YYMMDD', () => {
    expect(formatDate('YYMMDD')(date)).toEqual('21년 2월 7일');
  });
  it('MMDD', () => {
    expect(formatDate('MMDD')(date)).toEqual('2월 7일');
  });
  it('MMDDHH', () => {
    expect(formatDate('MMDDHH')(date)).toEqual('2월 7일 15시');
  });
  it('DDHH', () => {
    expect(formatDate('DDHH')(date)).toEqual('7일 15시');
  });
  it('DD', () => {
    expect(formatDate('DD')(date)).toEqual('7일');
  });
  it('HH', () => {
    expect(formatDate('HH')(date)).toEqual('15시');
  });
});

describe('addUnit', () => {
  it('숫자 뒤에 단위를 붙인 문자열 반환', () => {
    expect(addUnit('1000', '건')).toEqual('1000건');
  });
});

describe('첫 글자를 대문자로 변환', () => {
  it('유효한 문자열', () => {
    expect(capitalizeFirstLetter('hello')).toEqual('Hello');
  });
  it('유효하지 않은 문자열 - 한글', () => {
    expect(capitalizeFirstLetter('안녕하세요')).toEqual('안녕하세요');
  });
  it('유효하지 않은 문자열 - 숫자', () => {
    expect(capitalizeFirstLetter('1234')).toEqual('1234');
  });
});

describe('긴 숫자를 영어 숫자 단위로 축약', () => {
  it('1000 미만', () => {
    expect(abbreviateNumber(994)).toEqual('994');
    expect(abbreviateNumber(123)).toEqual('123');
    expect(abbreviateNumber(24)).toEqual('24');
    expect(abbreviateNumber(0)).toEqual('0');
  });
  it('단위별 테스트', () => {
    expect(abbreviateNumber(1000)).toEqual('1.0K');
    expect(abbreviateNumber(2000000)).toEqual('2.0M');
    expect(abbreviateNumber(4000000000)).toEqual('4.0B');
    expect(abbreviateNumber(5000000000000)).toEqual('5.0T');
  });
  it('임계점 테스트', () => {
    expect(abbreviateNumber(995)).toEqual('1.0K');
    expect(abbreviateNumber(999500)).toEqual('1.0M');
    expect(abbreviateNumber(999500000)).toEqual('1.0B');
    expect(abbreviateNumber(999500000000)).toEqual('1.0T');
  });
});

describe('지속된 일자를 대략적인 기간을 나타내는 문자열로 변환', () => {
  let now: Date;
  let past: Date;

  beforeEach(() => {
    now = new Date();
    past = new Date();
  });

  it('1일 => 하루', () => {
    past.setDate(now.getDate() - 1);
    expect(approximateDuration(past, now)).toEqual('하루');
  });
  it('2일 => 2일', () => {
    past.setDate(now.getDate() - 2);
    expect(approximateDuration(past, now)).toEqual('2일');
  });
  it('6일 => 6일', () => {
    past.setDate(now.getDate() - 6);
    expect(approximateDuration(past, now)).toEqual('6일');
  });
  it('7일 => 7일', () => {
    past.setDate(now.getDate() - 7);
    expect(approximateDuration(past, now)).toEqual('7일');
  });
  it('17일 => 17일', () => {
    past.setDate(now.getDate() - 17);
    expect(approximateDuration(past, now)).toEqual('17일');
  });
  it('21일 => 21일', () => {
    past.setDate(now.getDate() - 21);
    expect(approximateDuration(past, now)).toEqual('21일');
  });
  it('31일 => 한 달', () => {
    past.setDate(now.getDate() - 31);
    expect(approximateDuration(past, now)).toEqual('한 달');
  });
  it('32일 => 한 달', () => {
    past.setDate(now.getDate() - 32);
    expect(approximateDuration(past, now)).toEqual('한 달');
  });
  it('46일 => 2달', () => {
    past.setDate(now.getDate() - 46);
    expect(approximateDuration(past, now)).toEqual('2달');
  });
  it('77일 => 3달', () => {
    past.setDate(now.getDate() - 77);
    expect(approximateDuration(past, now)).toEqual('3달');
  });
});
