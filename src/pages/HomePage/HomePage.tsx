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
} from 'src/types';
import { getReputationData, utcToMs, utcToMsAll } from 'src/utils';

export type HomeParams = {
  topic: TopicType;
};

export type HomePageProps = RouteComponentProps<HomeParams> &
  Partial<StyledHomePageProps>;

export type StyledHomePageProps = {
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
  | {
      type: 'SET_REPUTATION_DATA';
      payload: {
        data: PeriodicReputeDataType[];
        totalData: ReputationDataType[];
      };
    }
  | {
      type: 'SET_SOURCE_DATA';
      payload: {
        region: RegionDataType[];
        source: SourceDataType[];
      };
    }
  | { type: 'UPDATE_WAITING' }
  | { type: 'UPDATE_ERROR'; payload: string };

const initialState = {
  quoteCounts: [] as TrendCountData[],
  prevQuoteTotal: 0,
  userCounts: [] as TrendCountData[],
  prevUserTotal: 0,
  retweetCounts: [] as TrendCountData[],
  prevRetweetTotal: 0,
  reputationTotal: [] as ReputationDataType[],
  reputation: [] as PeriodicReputeDataType[],
  region: [] as RegionDataType[],
  source: [] as SourceDataType[],
  waitingCounts: true,
  waitingRepute: true,
  waitingSource: true,
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
        waitingCounts: false,
      };
    case 'SET_REPUTATION_DATA':
      return {
        ...state,
        reputation: [...action.payload.data],
        reputationTotal: [...action.payload.totalData],
        waitingRepute: false,
      };
    case 'SET_SOURCE_DATA':
      return {
        ...state,
        region: [...action.payload.region],
        source: [...action.payload.source],
        waitingSource: false,
      };
    case 'UPDATE_WAITING':
      return {
        ...state,
        waitingCounts: true,
        waitingRepute: true,
        waitingSource: true,
      };
    case 'UPDATE_ERROR':
      return {
        ...state,
        waitingCounts: false,
        waitingRepute: false,
        waitingSource: false,
        error: { message: action.payload },
      };
    default:
      return state;
  }
};

const StyledHomePage = styled.div<StyledHomePageProps>`
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

function HomePage({ match, ...props }: HomePageProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    quoteCounts,
    prevQuoteTotal,
    userCounts,
    prevUserTotal,
    retweetCounts,
    prevRetweetTotal,
    reputation,
    reputationTotal,
    region,
    source,
    waitingCounts,
    waitingRepute,
    waitingSource,
    error,
  } = state;
  const isWaiting = waitingCounts && waitingRepute && waitingSource;

  const { topic } = match.params;
  const { collapsed } = useUIContext();
  const { prevPeriod, period, periodTotal } = usePeriod();
  const { user } = useAuth();
  const totalRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const retweetRef = useRef<HTMLDivElement>(null);

  const excuteScroll = (ref: RefObject<HTMLDivElement>) =>
    ref && ref.current && ref.current.scrollIntoView();

  useEffect(() => {
    const fetchTrends = async () => {
      dispatch({ type: 'UPDATE_WAITING' });

      const fetchCountTrend = async () => {
        const [, quoteData] = await fetchTrendCount(
          'total-counts',
          topic,
          period
        );
        const [, userData] = await fetchTrendCount(
          'user-counts',
          topic,
          period
        );
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

      const fetchReputationTrend = async () => {
        const [, reputeData] = await fetchTrendAnalysis(
          'reputation',
          topic,
          period
        );

        const [, reputeTotalData] = await fetchTrendAnalysis(
          'reputation',
          topic,
          periodTotal
        );

        if (
          !reputeData.error &&
          !reputeTotalData.error &&
          reputeData.data &&
          reputeTotalData.data
        ) {
          const reputationData: PeriodicReputeDataType[] = getReputationData(
            reputeData.data
          );

          dispatch({
            type: 'SET_REPUTATION_DATA',
            payload: {
              data: reputationData,
              totalData: reputeTotalData.data[0]?.reputation || [],
            },
          });
        }
      };

      const fetchSourceTrend = async () => {
        const [, regionData] = await fetchTrendAnalysis(
          'region',
          topic,
          periodTotal
        );

        const [, sourceData] = await fetchTrendAnalysis(
          'source',
          topic,
          periodTotal
        );

        if (
          !regionData.error &&
          !sourceData.error &&
          regionData.data &&
          sourceData.data
        ) {
          dispatch({
            type: 'SET_SOURCE_DATA',
            payload: {
              region: regionData.data[0]?.region?.slice(0, 10) || [],
              source: sourceData.data[0]?.source?.slice(0, 5) || [],
            },
          });
        }
      };

      fetchCountTrend();
      fetchReputationTrend();
      fetchSourceTrend();
    };
    fetchTrends();
  }, [topic, period, prevPeriod, periodTotal]);

  return (
    <StyledHomePage sideBarCollapsed={collapsed} {...props}>
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
                  onClick={() => excuteScroll(totalRef)}
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
                  onClick={() => excuteScroll(userRef)}
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
                  onClick={() => excuteScroll(retweetRef)}
                  from={period.from}
                  to={period.to}
                  dataKey="count"
                  data={retweetCounts}
                  prevTotal={prevRetweetTotal}
                  color="Magenta400"
                />
              )}
            </div>
            <ChartContainerTitle title="평판 분석" />
            <div className="reputation-container">
              {reputation.length > 0 && (
                <MainPieChart
                  title="긍부정 비율"
                  data={reputationTotal}
                  height={350}
                  dataNameMap={REPUTATIONS_KO_MAP}
                  dataColorMap={REPUTATIONS_COLOR_MAP}
                />
              )}
              {reputation.length > 0 && (
                <PeriodBarChart
                  title="기간별 긍부정 추이"
                  dataKeys={[...REPUTATIONS]}
                  data={reputation}
                  legend={REPUTATIONS_LEGENDS}
                  colorMap={REPUTATIONS_COLOR_MAP}
                  interval={period.interval}
                />
              )}
            </div>
            <ChartContainerTitle title="출처 분석" />
            <div className="source-container">
              {source && (
                <RegionRankingTable title="작성 국가 순위" data={region} />
              )}
              {source && (
                <MainPieChart
                  title="작성 소스 분석"
                  width={450}
                  height={540}
                  innerRadius={80}
                  outerRadius={110}
                  data={source}
                  dataColorMap={Object.values(source).reduce(
                    (map, { name }, idx) => ({
                      ...map,
                      [name]: TOP_FIVE_COLORS[idx],
                    }),
                    {}
                  )}
                />
              )}
            </div>
          </>
        )}
      </div>
      <RealTimeFeed className="right-fixed-column" />
    </StyledHomePage>
  );
}

export default withRouter(HomePage);
