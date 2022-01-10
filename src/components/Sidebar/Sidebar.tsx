import { useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import Button from 'src/components/Button';
import ToggleDarkMode from 'src/components/ToggleDarkMode';
import { useAuth, useUIContext } from 'src/contexts';
import { sidebarWidth } from 'src/styles/variables';

import ToggleCollapsed from '../ToggleCollapsed';

export type SidebarProps = Record<string, unknown> &
  Partial<StyledSidebarProps>;

export type StyledSidebarProps = {
  /** HTML 클래스 속성 */
  className?: string;
  collapsed?: boolean;
};

const StyledSidebar = styled.div<StyledSidebarProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: ${({ collapsed }) =>
    collapsed ? sidebarWidth.min : sidebarWidth.default};
  height: 100%;
  position: fixed;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.Gray50};
  padding: 8px;

  .menu-list {
    margin-top: 180px;
    font-weight: ${({ theme }) => theme.typography.weight.bold};
    color: ${({ theme }) => theme.colors.Gray700};

    & > .menu-item {
      border-radius: 12px;
      display: flex;
      align-items: center;
      margin-bottom: 10px;
    }
  }

  .option-list {
    margin-bottom: 120px;
    font-weight: ${({ theme }) => theme.typography.weight.bold};
    color: ${({ theme }) => theme.colors.Gray700};

    & > .option-item {
      border-radius: 12px;
      display: flex;
      align-items: center;
      margin-bottom: 10px;
    }
  }
`;

function Sidebar({ ...props }: SidebarProps) {
  const { collapsed } = useUIContext();
  const location = useLocation();
  const history = useHistory();
  const { authenticated, logOut } = useAuth();
  const [, active, subPath] = location.pathname.split('/');

  const handleClick = useCallback(
    (to: string) => () => {
      if (to !== active) {
        history.push(`/${to}/${subPath}`);
      }
    },
    [active, history, subPath]
  );

  return (
    <StyledSidebar collapsed={collapsed} {...props}>
      <ul className="menu-list">
        <li className="menu-item">
          <Button
            size="extraLarge"
            align="left"
            width={collapsed ? 52 : 185}
            iconOnly={collapsed}
            textOnly
            active={active === 'home'}
            onClick={handleClick('home')}
            icon="HomeOutline">
            홈
          </Button>
        </li>
        <li className="menu-item">
          <Button
            size="extraLarge"
            align="left"
            width={collapsed ? 52 : 185}
            iconOnly={collapsed}
            textOnly
            active={active === 'count'}
            onClick={handleClick('count')}
            icon="ReplyOutline">
            언급량 분석
          </Button>
        </li>
        <li className="menu-item">
          <Button
            size="extraLarge"
            align="left"
            width={collapsed ? 52 : 185}
            iconOnly={collapsed}
            textOnly
            active={active === 'reputation'}
            onClick={handleClick('reputation')}
            icon="MedalFill">
            평판 분석
          </Button>
        </li>
        <li className="menu-item">
          <Button
            size="extraLarge"
            align="left"
            width={collapsed ? 52 : 185}
            iconOnly={collapsed}
            textOnly
            active={active === 'compare'}
            onClick={handleClick('compare')}
            icon="LinkOutline">
            연관어 비교
          </Button>
        </li>
      </ul>
      <ul className="option-list">
        <li className="option-item">
          <ToggleDarkMode
            size="extraLarge"
            align="left"
            width={collapsed ? 52 : 185}
            iconOnly={collapsed}
            textOnly
          />
        </li>
        <li className="option-item">
          <ToggleCollapsed size="extraLarge" align="left" textOnly />
        </li>
        <li className="option-item">
          <Button
            size="extraLarge"
            align="left"
            width={collapsed ? 52 : 185}
            iconOnly={collapsed}
            textOnly
            icon="LogInOutline"
            onClick={
              authenticated
                ? () => {
                    if (logOut) {
                      logOut();
                    }
                    history.push('/login');
                  }
                : () => history.push('/login')
            }>
            {authenticated ? 'Log Out' : 'Log In'}
          </Button>
        </li>
      </ul>
    </StyledSidebar>
  );
}

export default Sidebar;
