import { getLocalStorage, setLocalStoarge } from 'src/utils';

describe('로컬 스토리지 테스트', () => {
  beforeEach(() => {
    setLocalStoarge('test-number', 1);
  });

  test('getLocalStorage() 값이 있으면 값을 리턴', () => {
    expect(getLocalStorage('test-number')).toEqual(1);
  });

  test('getLocalStorage() 값이 없으면 null 리턴', () => {
    expect(getLocalStorage('tast-number')).toEqual(null);
  });

  afterEach(() => {
    window.localStorage.removeItem('test');
  });
});
