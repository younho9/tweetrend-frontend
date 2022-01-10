import { useReducer, useEffect } from 'react';
import { io as socketIOClient } from 'socket.io-client';
import styled from 'styled-components';

import TweetStreamItem from 'src/components/Tweet/TweetStreamItem';
import { REACT_APP_REAL_TIME_SERVER_BASE_URL_DEV } from 'src/constants';
import { feedWidth } from 'src/styles/variables';
import { TweetResponse } from 'src/types';

export type DevRealTimeFeedProps = Partial<StyledDevRealTimeFeedProps>;

export type StyledDevRealTimeFeedProps = {
  /** HTML 클래스 속성 */
  className?: string;
};

const StyledDevRealTimeFeed = styled.div<StyledDevRealTimeFeedProps>`
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
  | { type: 'ADD_TWEET'; payload: TweetResponse }
  | { type: 'UPDATE_WAITING' };

const initialState = {
  tweets: [] as TweetResponse[],
  isWaiting: true,
};

const reducer = (state: typeof initialState, action: ActionType) => {
  switch (action.type) {
    case 'ADD_TWEET':
      return {
        ...state,
        tweets: [action.payload, ...state.tweets],
        isWaiting: false,
      };
    case 'UPDATE_WAITING':
      return { ...state, error: null, isWaiting: true };
    default:
      return state;
  }
};

function DevRealTimeFeed({ ...props }: DevRealTimeFeedProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tweets } = state;

  const streamTweets = () => {
    const socket = socketIOClient(REACT_APP_REAL_TIME_SERVER_BASE_URL_DEV);

    socket.on('connect-success', () => {});
    socket.on('tweet', (json: TweetResponse) => {
      if (json.data) {
        dispatch({ type: 'ADD_TWEET', payload: json });
      }
    });
    socket.on('heartbeat', () => {
      dispatch({ type: 'UPDATE_WAITING' });
    });
  };

  useEffect(() => {
    streamTweets();
  }, []);

  return (
    <StyledDevRealTimeFeed {...props}>
      <div className="title">실시간 피드 (개발용)</div>
      {tweets.length > 0 &&
        tweets.map(
          (tweet) =>
            tweet.data && (
              <TweetStreamItem
                key={tweet.data.id}
                data={tweet.data}
                includes={tweet.includes}
              />
            )
        )}
    </StyledDevRealTimeFeed>
  );
}

export default DevRealTimeFeed;
