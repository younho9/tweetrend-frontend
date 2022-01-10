import styled from 'styled-components';
import 'styled-components/macro';

import TweetActionItem from 'src/components/Tweet/TweetActionItem';
import { margin } from 'src/styles';
import { Color, PublicMetrics } from 'src/types';

const actions = ['reply', 'retweet', 'like'] as const;

export type TweetActionType = typeof actions[number];

export type TweetActionsProps = PublicMetrics & {
  /** HTML 클래스 속성 */
  className?: string;
};

const StyledTweetActions = styled.ul`
  display: inline-flex;
  align-items: center;
`;

function TweetActions({
  reply_count,
  retweet_count,
  quote_count,
  like_count,
  ...props
}: TweetActionsProps) {
  const countMap = {
    reply: reply_count,
    retweet: retweet_count + quote_count,
    like: like_count,
  };

  const colorMap: { [key in TweetActionType]: Color } = {
    reply: 'Blue700',
    retweet: 'Green700',
    like: 'Red700',
  };

  return (
    <StyledTweetActions {...props}>
      {actions.map((action) => (
        <TweetActionItem
          css={margin(0, 10, 0, 0)}
          key={action}
          action={action}
          count={countMap[action]}
          color={colorMap[action]}
        />
      ))}
    </StyledTweetActions>
  );
}

export default TweetActions;
