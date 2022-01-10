import styled from 'styled-components';

import { TWITTER_BASE_URL, TWITTER_KO_REPLY_TO_SUFFIX } from 'src/constants';
import { typography } from 'src/styles';

export type TweetReplyToProps = {
  /** 트위터 유저 ID */
  username?: string;
  /** HTML 클래스 속성 */
  className?: string;
};

const StyledTweetReplyTo = styled.div`
  font-size: ${typography.size.s2};

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.Blue400};
  }
`;

function TweetReplyTo({ username, ...props }: TweetReplyToProps) {
  return (
    <StyledTweetReplyTo {...props}>
      <a href={`${TWITTER_BASE_URL}/${username}`}>@{username}</a>
      <span>{TWITTER_KO_REPLY_TO_SUFFIX}</span>
    </StyledTweetReplyTo>
  );
}

export default TweetReplyTo;
