import styled from 'styled-components';
import 'styled-components/macro';

import Icon from 'src/components/Icon';
import { TWITTER_BASE_URL, TWITTER_KO_RETWEET_SUFFIX } from 'src/constants';
import { margin } from 'src/styles';
import { UserData } from 'src/types';

export type RetweetUserProps = {
  user: UserData;
} & Partial<StyledRetweetUserProps>;

export type StyledRetweetUserProps = {
  /** HTML 클래스 속성 */
  className?: string;
};

const StyledRetweetUser = styled.div<StyledRetweetUserProps>`
  a {
    margin-left: 5px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    font-size: ${({ theme }) => theme.typography.size.s1};
    color: ${({ theme }) => theme.colors.Gray700};
    outline: none;
    white-space: nowrap;
    max-width: 300px;

    .name {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      border-bottom: 1px solid transparent;
    }

    .suffix {
      border-bottom: 1px solid transparent;
    }

    :hover {
      .name,
      .suffix {
        border-bottom-color: ${({ theme }) => theme.colors.Gray600};
      }
    }
  }
`;

function RetweetUser({ user, ...props }: RetweetUserProps) {
  const { name, username } = user;
  return (
    <StyledRetweetUser {...props}>
      <a
        href={`${TWITTER_BASE_URL}/${username}`}
        target="_blank"
        rel="noreferrer">
        <Icon css={margin(0, 8, 0, 0)} size={20} icon="RetweetOutline" />
        <span className="name">{name}</span>
        <span className="suffix">{TWITTER_KO_RETWEET_SUFFIX}</span>
      </a>
    </StyledRetweetUser>
  );
}

export default RetweetUser;
