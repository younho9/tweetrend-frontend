import styled from 'styled-components';
import 'styled-components/macro';

import ReplyTo from 'src/components/Tweet/TweetReplyTo';
import { margin, typography } from 'src/styles';
import { UserData } from 'src/types';

const sizes = {
  small: {
    fontSize: typography.size.s1,
    lineHeight: typography.size.s2,
  },
  medium: {
    fontSize: typography.size.s2,
    lineHeight: typography.size.s3,
  },
};

export type TweetBodyProps = {
  message: string;
  replyTo?: UserData;
} & Partial<StyledTweetBodyProps>;

export type StyledTweetBodyProps = {
  /** HTML 클래스 속성 */
  className?: string;
  size: keyof typeof sizes;
};

const StyledTweetBody = styled.div<StyledTweetBodyProps>`
  font-size: ${({ size }) => sizes[size].fontSize};
  line-height: ${({ size }) => sizes[size].lineHeight};

  & > p {
    overflow-wrap: break-word;
    word-wrap: break-word;
    word-break: break-word;
  }
`;

function TweetBody({
  message,
  replyTo,
  size = 'medium',
  ...props
}: TweetBodyProps) {
  return (
    <StyledTweetBody size={size} {...props}>
      {replyTo && <ReplyTo css={margin(0, 0, 8)} username={replyTo.username} />}
      <p>{message}</p>
    </StyledTweetBody>
  );
}

export default TweetBody;
