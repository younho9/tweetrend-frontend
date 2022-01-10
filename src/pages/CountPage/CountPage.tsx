import React, { RefObject, useEffect, useReducer, useRef } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';

import { fetchTrendAnalysis, fetchTrendCount } from 'src/api';
import {
  RealTimeFeed,
  Header,
  MainLineChart,
  MainPieChart,
  OverviewAreaChart,
  PeriodBarChart,
  Sidebar,
  RegionRankingTable,
  Spinner,
  ChartContainerTitle,
  TopicSelector,
} from 'src/components';
import {
  REPUTATIONS,
  REPUTATIONS_COLOR_MAP,
  REPUTATIONS_KO_MAP,
  REPUTATIONS_LEGENDS,
  TOP_FIVE_COLORS,
} from 'src/constants';
import { useAuth, useUIContext, usePeriod } from 'src/contexts';
import { chartWidth, feedWidth, headerHeight, sidebarWidth } from 'src/styles';
import {
  ReputationDataType,
  TrendCountData,
  PeriodicReputeDataType,
  SourceDataType,
  RegionDataType,
  TopicType,
  TrendAnalysisData,
  TrendCountType,
} from 'src/types';
import { getReputationData, utcToMs, utcToMsAll } from 'src/utils';

export type CountParams = {
  topic: TopicType;
};

export type CountPageProps = RouteComponentProps<CountParams> &
  Partial<StyledCountPageProps>;

export type StyledCountPageProps = {
  /** HTML 클래스 속성 */
  className?: string;
  sideBarCollapsed?: boolean;
};

type ActionType =
  | {
      type: 'SET_COUNT_DATA';
      payload: {
        data: {
          quote: TrendCountData[];
          user: TrendCountData[];
          retweet: TrendCountData[];
        };
        prevTotal: {
          quote: number;
          user: number;
          retweet: number;
        };
      };
    }
  | { type: 'UPDATE_ACTIVE'; payload: TrendCountType }
  | { type: 'UPDATE_WAITING' }
  | { type: 'UPDATE_ERROR'; payload: string };

const initialState = {
  quoteCounts: [] as TrendCountData[],
  prevQuoteTotal: 0,
  userCounts: [] as TrendCountData[],
  prevUserTotal: 0,
  retweetCounts: [] as TrendCountData[],
  prevRetweetTotal: 0,
  isWaiting: true,
  active: 'total-counts' as TrendCountType,
  error: null as { message: string } | null,
};

const reducer = (state: typeof initialState, action: ActionType) => {
  switch (action.type) {
    case 'SET_COUNT_DATA':
      return {
        ...state,
        quoteCounts: [...action.payload.data.quote],
        prevQuoteTotal: action.payload.prevTotal.quote,
        userCounts: [...action.payload.data.user],
        prevUserTotal: action.payload.prevTotal.user,
        retweetCounts: [...action.payload.data.retweet],
        prevRetweetTotal: action.payload.prevTotal.retweet,
        isWaiting: false,
      };
    case 'UPDATE_ACTIVE':
      return {
        ...state,
        active: action.payload,
      };
    case 'UPDATE_WAITING':
      return {
        ...state,
        isWaiting: true,
      };
    case 'UPDATE_ERROR':
      return {
        ...state,
        isWaiting: true,
        error: { message: action.payload },
      };
    default:
      return state;
  }
};

const StyledCountPage = styled.div<StyledCountPageProps>`
  display: flex;

  & > .sidebar {
    z-index: 1;
  }

  & > .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: ${headerHeight};
    margin-left: ${({ sideBarCollapsed }) =>
      sideBarCollapsed ? sidebarWidth.min : sidebarWidth.default};
    margin-right: ${feedWidth};
    margin-bottom: 60px;
    width: 100%;
    height: 100%;

    & > .topic-selector-container {
      margin-top: 45px;
      width: ${chartWidth};
      overflow: scroll;
      -ms-overflow-style: none; /* IE and Edge */
      scrollbar-width: none; /* Firefox */

      &::-webkit-scrollbar {
        display: none;
      }
    }

    & > .chart-group-title {
      display: block;
      width: ${chartWidth};
      margin: 45px 0 10px 20px;
      font-weight: ${({ theme }) => theme.typography.weight.bold};
      font-size: ${({ theme }) => theme.typography.size.l1};
    }

    & > .overview-container {
      margin: 15px;
      width: ${chartWidth};
      display: flex;
      justify-content: space-between;
    }

    & > .reputation-container {
      display: flex;
      margin: 15px;
      width: ${chartWidth};
      justify-content: space-between;
    }

    & > .source-container {
      display: flex;
      margin: 15px;
      width: ${chartWidth};
      justify-content: space-between;
    }
  }

  & > .right-fixed-column {
    position: fixed;
    top: ${headerHeight};
    right: 250px;
    margin-right: -250px;
    height: calc(100% - ${headerHeight});
  }
`;

function CountPage({ match, ...props }: CountPageProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    quoteCounts,
    prevQuoteTotal,
    userCounts,
    prevUserTotal,
    retweetCounts,
    prevRetweetTotal,
    active,
    isWaiting,
    error,
  } = state;
  const { topic } = match.params;
  const { collapsed } = useUIContext();
  const { prevPeriod, period, periodTotal } = usePeriod();
  const { user } = useAuth();

  useEffect(() => {
    const fetchTrends = async () => {
      dispatch({ type: 'UPDATE_WAITING' });

      const [, quoteData] = await fetchTrendCount(
        'total-counts',
        topic,
        period
      );
      const [, userData] = await fetchTrendCount('user-counts', topic, period);
      const [, retweetData] = await fetchTrendCount(
        'retweet-counts',
        topic,
        period
      );
      const [, prevQuoteData] = await fetchTrendCount(
        'total-counts',
        topic,
        prevPeriod
      );
      const [, prevUserData] = await fetchTrendCount(
        'user-counts',
        topic,
        prevPeriod
      );
      const [, prevRetweetData] = await fetchTrendCount(
        'retweet-counts',
        topic,
        prevPeriod
      );

      if (
        !quoteData.error &&
        !userData.error &&
        !retweetData.error &&
        !prevQuoteData.error &&
        !prevUserData.error &&
        !prevRetweetData.error &&
        quoteData.data &&
        userData.data &&
        retweetData.data &&
        prevQuoteData.data &&
        prevUserData.data &&
        prevRetweetData.data
      ) {
        dispatch({
          type: 'SET_COUNT_DATA',
          payload: {
            data: {
              quote: quoteData.data,
              user: userData.data,
              retweet: retweetData.data,
            },
            prevTotal: {
              quote: prevQuoteData.data[0]?.count,
              user: prevUserData.data[0]?.count,
              retweet: prevRetweetData.data[0]?.count,
            },
          },
        });
      }
    };
    fetchTrends();
  }, [topic, period, prevPeriod, periodTotal]);

  return (
    <StyledCountPage sideBarCollapsed={collapsed} {...props}>
      <Header user={user} />
      <Sidebar className="sidebar" />
      <div className="main">
        {isWaiting ? (
          <Spinner />
        ) : (
          <>
            <div className="topic-selector-container">
              <TopicSelector />
            </div>
            <ChartContainerTitle title="요약 분석" />
            <div className="overview-container">
              {quoteCounts.length > 0 && (
                <OverviewAreaChart
                  title="총 언급량"
                  onClick={() =>
                    dispatch({ type: 'UPDATE_ACTIVE', payload: 'total-counts' })
                  }
                  from={period.from}
                  to={period.to}
                  dataKey="count"
                  data={quoteCounts}
                  prevTotal={prevQuoteTotal}
                  color="Blue400"
                />
              )}
              {userCounts.length > 0 && (
                <OverviewAreaChart
                  title="개별 사용자 수"
                  onClick={() =>
                    dispatch({ type: 'UPDATE_ACTIVE', payload: 'user-counts' })
                  }
                  from={period.from}
                  to={period.to}
                  dataKey="count"
                  data={userCounts}
                  prevTotal={prevUserTotal}
                  color="Yellow400"
                />
              )}
              {retweetCounts.length > 0 && (
                <OverviewAreaChart
                  title="리트윗 수"
                  onClick={() =>
                    dispatch({
                      type: 'UPDATE_ACTIVE',
                      payload: 'retweet-counts',
                    })
                  }
                  from={period.from}
                  to={period.to}
                  dataKey="count"
                  data={retweetCounts}
                  prevTotal={prevRetweetTotal}
                  color="Magenta400"
                />
              )}
            </div>
            <>
              <ChartContainerTitle title="자세히 보기" />
              {quoteCounts.length > 0 && active === 'total-counts' && (
                <>
                  <MainLineChart
                    title="언급량 추이"
                    color="Blue400"
                    withMargin
                    dataKey="언급량"
                    data={utcToMsAll(quoteCounts).map(({ count, ...rest }) => ({
                      ...rest,
                      언급량: count,
                    }))}
                  />
                </>
              )}
              {userCounts.length > 0 && active === 'user-counts' && (
                <MainLineChart
                  title="사용자 추이"
                  color="Yellow400"
                  withMargin
                  dataKey="사용자"
                  data={utcToMsAll(userCounts).map(({ count, ...rest }) => ({
                    ...rest,
                    사용자: count,
                  }))}
                />
              )}
              {retweetCounts.length > 0 && active === 'retweet-counts' && (
                <MainLineChart
                  title="리트윗 추이"
                  color="Magenta400"
                  withMargin
                  dataKey="리트윗"
                  data={utcToMsAll(retweetCounts).map(({ count, ...rest }) => ({
                    ...rest,
                    리트윗: count,
                  }))}
                />
              )}
            </>
          </>
        )}
      </div>
      <RealTimeFeed className="right-fixed-column" />
    </StyledCountPage>
  );
}

export default withRouter(CountPage);
