/* eslint-disable @typescript-eslint/naming-convention */
import styled from 'styled-components';
import 'styled-components/macro';

import Avatar from 'src/components/Avatar';
import Quoted from 'src/components/Tweet/QuotedTweet';
import RetweetUser from 'src/components/Tweet/RetweetUser';
import Actions from 'src/components/Tweet/TweetActions';
import Body from 'src/components/Tweet/TweetBody';
import Header from 'src/components/Tweet/TweetHeader';
import { margin } from 'src/styles';
import { ExpandedTweetData, UserData } from 'src/types';
import { match } from 'src/utils';

export type TweetStreamItemProps = ExpandedTweetData &
  Partial<StyledTweetStreamItemProps>;

export type StyledTweetStreamItemProps = {
  id: string;
  /** HTML 클래스 속성 */
  className?: string;
};

const StyledTweetStreamItem = styled.article<StyledTweetStreamItemProps>`
  box-sizing: border-box;
  padding: 6px 10px 0px;
  position: relative;

  .tweet {
    display: flex;
    width: 100%;

    .content {
      width: 100%;
    }
  }

  hr {
    display: block;
    height: 1px;
    border: 0;
    border-top: 1px solid ${({ theme }) => theme.colors.Gray400};
    margin-bottom: 0;
  }

  &:last-child {
    hr {
      border-color: transparent;
    }
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.Gray75};
  }
`;

function TweetStreamItem({ data, includes, ...props }: TweetStreamItemProps) {
  const { tweets = [], users = [] } = includes || {};
  const author = users.find(match('id', data.author_id)) as UserData;
  const replyTo = users.find(match('id', data.in_reply_to_user_id));
  const reTwRef = data.referenced_tweets?.find(match('type', 'retweeted'));
  const reTweet = tweets?.find(match('id', reTwRef?.id));
  const reTwAuthor = users?.find(match('id', reTweet?.author_id));
  const quoTwRef = data.referenced_tweets?.find(match('type', 'quoted'));
  const quoTweet = tweets?.find(match('id', quoTwRef?.id));
  const quoTwAuthor = users?.find(match('id', quoTweet?.author_id));

  return (
    <StyledTweetStreamItem id={data.id} {...props}>
      {reTweet && <RetweetUser css={margin(0, 0, 6, 0)} user={author} />}
      <div className="tweet">
        <Avatar css={margin(0, 10, 0, 0)} user={reTwAuthor || author} />
        <div className="content">
          <Header
            css={margin(0, 0, 5, 0)}
            user={reTwAuthor || author}
            createdAt={data.created_at}
          />
          <Body
            css={margin(0, 0, 10, 0)}
            replyTo={replyTo}
            message={data.message || (data.text as string)} // data.text For Dev
          />
          {quoTweet && quoTwAuthor && (
            <Quoted
              css={margin(0, 0, 10, 0)}
              author={quoTwAuthor}
              {...quoTweet}
            />
          )}
          <footer className="tweetFooter">
            <Actions {...data.public_metrics} />
          </footer>
        </div>
      </div>
      <hr />
    </StyledTweetStreamItem>
  );
}

export default TweetStreamItem;
