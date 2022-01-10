import { useReducer, useEffect } from 'react';
import styled from 'styled-components';

import { fetchTweets } from 'src/api';
import Spinner from 'src/components/Spinner';
import TweetStreamItem from 'src/components/Tweet/TweetStreamItem';
import { WS_BASE_URL } from 'src/constants';
import { feedWidth } from 'src/styles/variables';
import { ExpandedTweetData, TweetsResponse } from 'src/types';

export type RealTimeFeedProps = Record<string, unknown> &
  Partial<StyledRealTimeFeedProps>;

export type StyledRealTimeFeedProps = {
  /** HTML 클래스 속성 */
  className?: string;
};

const StyledRealTimeFeed = styled.div<StyledRealTimeFeedProps>`
  width: ${feedWidth};
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none;
  }
  position: fixed;
  height: 100%;

  background-color: ${({ theme }) => theme.colors.Gray50};

  .title {
    box-sizing: border-box;
    padding: 28px 24px;
    color: ${({ theme }) => theme.colors.Gray900};
    font-weight: ${({ theme }) => theme.typography.weight.bold};
    font-size: ${({ theme }) => theme.typography.size.m3};
  }
`;

type ActionType =
  | { type: 'INSERT_AT_TOP'; payload: ExpandedTweetData[] }
  | { type: 'INSERT_AT_BOTTOM'; payload: ExpandedTweetData[] }
  | { type: 'UPDATE_WAITING' }
  | { type: 'UPDATE_ERROR'; payload: string };

const initialState = {
  tweets: [] as ExpandedTweetData[],
  isWaiting: true,
  error: null as { message: string } | null,
};

const reducer = (state: typeof initialState, action: ActionType) => {
  switch (action.type) {
    case 'INSERT_AT_TOP':
      return {
        ...state,
        tweets: [...action.payload, ...state.tweets],
        isWaiting: false,
        error: null,
      };
    case 'INSERT_AT_BOTTOM':
      return {
        ...state,
        tweets: [...state.tweets, ...action.payload],
        isWaiting: false,
        error: null,
      };
    case 'UPDATE_WAITING':
      return { ...state, isWaiting: true };
    case 'UPDATE_ERROR':
      return { ...state, isWaitng: false, error: { message: action.payload } };
    default:
      return state;
  }
};

function RealTimeFeed(props: RealTimeFeedProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tweets, isWaiting, error } = state;

  const streamTweets = (topId: string) => {
    const socket = new WebSocket(`${WS_BASE_URL}/ws/feed/covid-19/`);

    socket.onopen = () => socket.send(JSON.stringify({ topId })); // tweet topId

    socket.onmessage = (e) => {
      if (!e.data) {
        return;
      }

      const tweetsResponse = JSON.parse(e.data) as TweetsResponse;

      if (tweetsResponse.tweets) {
        dispatch({ type: 'INSERT_AT_TOP', payload: tweetsResponse.tweets });
      }
    };

    socket.onclose = (e) =>
      dispatch({
        type: 'UPDATE_ERROR',
        payload: `Socket onclose event. (code=${e.code} reason=${e.reason})`,
      });

    socket.onerror = (e) =>
      dispatch({
        type: 'UPDATE_ERROR',
        payload: `Socket onerror event: ${e.type}`,
      });
  };

  useEffect(() => {
    const injectTweets = async () => {
      dispatch({ type: 'UPDATE_WAITING' });

      const [, data] = await fetchTweets('covid-19');

      if (!data.error && data.tweets) {
        dispatch({ type: 'INSERT_AT_BOTTOM', payload: data.tweets });
        streamTweets(data.tweets[0]?.data.id);
      }
    };

    injectTweets();
  }, []);

  return (
    <StyledRealTimeFeed {...props}>
      <div className="title">실시간 피드</div>
      {/* TODO: 에러 메시지 컴포넌트 구현 */}
      {error && <span>{error.message}</span>}
      {isWaiting ? (
        <Spinner />
      ) : (
        tweets.length > 0 &&
        tweets.map(
          (tweet) =>
            tweet.data && (
              <TweetStreamItem
                key={tweet.data.id}
                data={tweet.data}
                includes={tweet.includes}
              />
            )
        )
      )}
    </StyledRealTimeFeed>
  );
}

export default RealTimeFeed;
