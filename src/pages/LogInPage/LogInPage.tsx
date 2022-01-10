import { Redirect, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { Button, Logo } from 'src/components';
import { AUTH_SERVER_BASE_URL } from 'src/constants';
import { useAuth } from 'src/contexts';

import { Illustration } from './assets';

export type LogInPageProps = Record<string, unknown> &
  Partial<StyledLogInPageProps>;

export type StyledLogInPageProps = {
  /** HTML 클래스 속성 */
  className?: string;
};

const StyledLogInPage = styled.div<StyledLogInPageProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .login-wrapper {
    display: flex;
    width: 1130px;
    height: 800px;
    filter: drop-shadow(0px 30px 50px rgba(110, 110, 110, 0.4));

    .left-container {
      box-sizing: border-box;
      padding: 40px;
      border-radius: 16px 0 0 16px;
      background-color: ${({ theme }) => theme.colors.Gray50};

      .logo-container {
        height: 50px;
        padding: 10px;
      }

      .login-container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 300px;
        height: 580px;
      }
    }

    .right-container {
      width: 700px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: 0 16px 16px 0;
      background-color: ${({ theme }) => theme.colors.Blue500};
    }
  }
`;

function LogInPage(props: LogInPageProps) {
  const { authenticated } = useAuth();
  const history = useHistory();

  if (authenticated) return <Redirect to="/" />;

  return (
    <StyledLogInPage {...props}>
      <div className="login-wrapper">
        <div className="left-container">
          <div className="logo-container">
            <Logo onClick={() => history.push('/')} />
          </div>
          <div className="login-container">
            <Button
              onClick={() => {
                window.location.href = `${AUTH_SERVER_BASE_URL}/auth/twitter`;
              }}
              variants="informative"
              rounded
              filled
              size="extraLarge"
              icon="TwitterFill">
              Sign In with Twitter
            </Button>
          </div>
        </div>
        <div className="right-container">
          <Illustration />
        </div>
      </div>
    </StyledLogInPage>
  );
}

export default LogInPage;
