import styled from 'styled-components';
import 'styled-components/macro';

import Avatar from 'src/components/Avatar';
import Body from 'src/components/Tweet/TweetBody';
import Header from 'src/components/Tweet/TweetHeader';
import { margin, padding } from 'src/styles';
import { TweetData, UserData } from 'src/types';

export type QuotedTweetProps = TweetData & {
  author: UserData;
} & Partial<StyledQuotedTweetProps>;

export type StyledQuotedTweetProps = {
  /** HTML 클래스 속성 */
  className?: string;
};

const StyledQuotedTweet = styled.div<StyledQuotedTweetProps>`
  border: 1px solid ${({ theme }) => theme.colors.Gray300};
  border-radius: 12px;
  padding: 12px;

  & div {
    display: flex;
    align-items: center;
  }
`;

function QuotedTweet({
  id,
  message,
  text,
  attachments,
  author_id,
  conversation_id,
  created_at,
  entities,
  in_reply_to_user_id,
  possibly_sensitive,
  public_metrics,
  referenced_tweets,
  reply_settings,
  source,
  author,
  ...props
}: QuotedTweetProps) {
  return (
    <StyledQuotedTweet {...props}>
      <div className="header-wrapper" css={padding(0, 6) + margin(0, 0, 4, 0)}>
        <Avatar css={margin(0, 5, 0, 0)} user={author} size="small" />
        <Header user={author} createdAt={created_at} size="small" />
      </div>
      <Body
        css={padding(0, 6) + margin(0, 0, 10, 0)}
        message={message || (text as string)} // text For Dev
        size="small"
      />
    </StyledQuotedTweet>
  );
}

export default QuotedTweet;
