import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import Button from 'src/components/Button';
import Logo from 'src/components/Logo';
import User from 'src/components/User';
import { usePeriod } from 'src/contexts';
import { headerHeight } from 'src/styles/variables';
import { UserData } from 'src/types';

import DatePicker from '../DatePicker';

export type HeaderProps = {
  isLoading?: boolean;
  user?: UserData | null;
} & Partial<StyledHeaderProps>;

export type StyledHeaderProps = {
  /** HTML 클래스 속성 */
  className?: string;
};

const StyledHeader = styled.div<StyledHeaderProps>`
  position: fixed;
  width: 100%;
  z-index: 2;
  box-sizing: border-box;
  height: ${headerHeight};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background-color: ${({ theme }) => theme.colors.Gray50};

  & > .left-group {
    display: inline-flex;
    align-items: center;

    & > .logo {
      padding: 18px;
    }

    & > .button-group {
      background-color: ${({ theme }) => theme.colors.Gray400};
      border-radius: 4px;
      display: inline-flex;
      justify-content: center;
      margin: 0px 32px 0px 64px;
    }
  }

  & > .right-group {
    margin-right: 24px;
  }
`;

function Header({ isLoading = false, user, ...props }: HeaderProps) {
  const history = useHistory();
  const { active, setFromNow } = usePeriod();

  const moveToHome = useCallback(() => {
    history.push('/');
  }, [history]);

  return (
    <StyledHeader {...props}>
      <div className="left-group">
        <Logo className="logo" onClick={moveToHome} />
        <div className="button-group">
          <Button onClick={() => setFromNow(1)} active={active === '오늘'}>
            오늘
          </Button>
          <Button onClick={() => setFromNow(7)} active={active === '일주일'}>
            일주일
          </Button>
          <Button onClick={() => setFromNow(30)} active={active === '1개월'}>
            1개월
          </Button>
          <Button onClick={() => setFromNow(90)} active={active === '3개월'}>
            3개월
          </Button>
        </div>
        <DatePicker />
      </div>
      <div className="right-group">
        {user && <User isLoading={isLoading} user={user} />}
      </div>
    </StyledHeader>
  );
}

export default Header;
