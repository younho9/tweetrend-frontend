import React, { useEffect, useReducer } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';

import { fetchTrendAnalysis } from 'src/api';
import {
  Header,
  Sidebar,
  ChartContainerTitle,
  RelationRankingTable,
  BubbleChart,
  Spinner,
  TopicSelector,
  RealTimeFeed,
  MainChartWrapper,
  OverviewPieChart,
  ReputationKeyValueData,
  MainPieChart,
  PeriodBarChart,
} from 'src/components';
import {
  REPUTATIONS,
  REPUTATIONS_COLOR_MAP,
  REPUTATIONS_KO_MAP,
  REPUTATIONS_LEGENDS,
  REPUTATION_SCORE_COLOR_MAP,
} from 'src/constants';
import { useAuth, usePeriod, useUIContext } from 'src/contexts';
import {
  chartWidth,
  rankingTableWidth,
  headerHeight,
  sidebarWidth,
  feedWidth,
} from 'src/styles/variables';
import {
  Color,
  PeriodicReputeDataType,
  RelWordsDataType,
  ReputationDataType,
  ReputationType,
  TrendAnalysisData,
} from 'src/types';
import { TopicType } from 'src/types/topic';
import { getReputationData } from 'src/utils';

export type RelationParams = {
  topic: TopicType;
};

export type RelationPageProps = RouteComponentProps<RelationParams> &
  Partial<StyledRelationPageProps>;

export type StyledRelationPageProps = {
  /** HTML 클래스 속성 */
  className?: string;
  sideBarCollapsed?: boolean;
};

type ActionType =
  | {
      type: 'SET_DATA';
      payload: {
        periodReputeData: TrendAnalysisData[];
        prevReputation: ReputationDataType[];
        curReputation: ReputationDataType[];
        periodic: TrendAnalysisData[];
        total: RelWordsDataType[];
        compares: string[];
      };
    }
  | { type: 'SET_COMPARES'; payload: string[] }
  | { type: 'ADD_COMPARE'; payload: string }
  | { type: 'DELETE_COMPARE'; payload: string }
  | { type: 'UPDATE_WAITING' }
  | { type: 'UPDATE_ERROR'; payload: string };

const initialState = {
  periodReputeData: [] as TrendAnalysisData[],
  prevReputation: [] as ReputationDataType[],
  curReputation: [] as ReputationDataType[],
  periodRelwords: [] as TrendAnalysisData[],
  totalRelwords: [] as RelWordsDataType[],
  compares: [] as string[],
  isWaiting: true,
  error: null as { message: string } | null,
};

const reducer = (state: typeof initialState, action: ActionType) => {
  switch (action.type) {
    case 'SET_DATA':
      return {
        ...state,
        periodReputeData: [...action.payload.periodReputeData],
        prevReputation: [...action.payload.prevReputation],
        curReputation: [...action.payload.curReputation],
        periodRelwords: [...action.payload.periodic],
        totalRelwords: [...action.payload.total],
        compares: [...action.payload.compares],
        isWaiting: false,
        error: null,
      };
    case 'SET_COMPARES':
      return {
        ...state,
        compares: [...action.payload],
      };
    case 'ADD_COMPARE':
      return {
        ...state,
        compares: [...state.compares, action.payload],
      };
    case 'DELETE_COMPARE':
      return {
        ...state,
        compares: [...state.compares.filter((name) => name !== action.payload)],
      };
    case 'UPDATE_WAITING':
      return { ...state, isWaiting: true };
    case 'UPDATE_ERROR':
      return { ...state, isWaiting: false, error: { message: action.payload } };
    default:
      return state;
  }
};

const StyledRelationPage = styled.div<StyledRelationPageProps>`
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
    margin-right: ${rankingTableWidth};
    margin-bottom: 60px;
    width: 100%;
    height: 100%;

    & > .overview-container {
      width: ${chartWidth};
    }

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

    & > .relwords-chart-container {
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
  }

  & > .right-fixed-column {
    position: fixed;
    top: ${headerHeight};
    width: ${feedWidth};
    right: 250px;
    margin-right: -250px;
    overflow: scroll;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */

    &::-webkit-scrollbar {
      display: none;
    }
    height: calc(100% - ${headerHeight});

    background-color: ${({ theme }) => theme.colors.Gray50};

    .title {
      box-sizing: border-box;
      padding: 28px 24px;
      color: ${({ theme }) => theme.colors.Gray900};
      font-weight: ${({ theme }) => theme.typography.weight.bold};
      font-size: ${({ theme }) => theme.typography.size.m3};
    }
  }
`;

const WrappedRankingTable = MainChartWrapper(RelationRankingTable);

function RelationPage({ match, ...props }: RelationPageProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { collapsed } = useUIContext();
  const { user } = useAuth();
  const { prevPeriod, period, periodTotal } = usePeriod();
  const {
    periodReputeData,
    prevReputation,
    curReputation,
    totalRelwords,
    isWaiting,
    error,
  } = state;
  const overviewCurData = curReputation.reduce(
    (prev, cur) => ({
      ...prev,
      [cur.name]: cur.counts,
    }),
    {} as ReputationKeyValueData
  );
  const overviewPrevData = prevReputation.reduce(
    (prev, cur) => ({
      ...prev,
      [cur.name]: cur.counts,
    }),
    {} as ReputationKeyValueData
  );

  const { topic } = match.params;
  const rankData = totalRelwords.slice(0, 15);
  const mapData = rankData.map(({ score, ...rest }) => ({
    ...rest,
    color: REPUTATION_SCORE_COLOR_MAP(score),
  }));

  useEffect(() => {
    const fetchRelationTrends = async () => {
      dispatch({ type: 'UPDATE_WAITING' });
      const [, reputePeriodData] = await fetchTrendAnalysis(
        'reputation',
        topic,
        period
      );

      const [, reputationData] = await fetchTrendAnalysis(
        'reputation',
        topic,
        periodTotal
      );

      const [, prevReputationData] = await fetchTrendAnalysis(
        'reputation',
        topic,
        prevPeriod
      );

      const [, relwordsData] = await fetchTrendAnalysis(
        'relwords',
        topic,
        period
      );

      const [, relwordsTotalData] = await fetchTrendAnalysis(
        'relwords',
        topic,
        periodTotal
      );

      if (reputePeriodData.error) {
        dispatch({ type: 'UPDATE_ERROR', payload: reputePeriodData.error });
        return;
      }

      if (reputationData.error) {
        dispatch({ type: 'UPDATE_ERROR', payload: reputationData.error });
        return;
      }

      if (prevReputationData.error) {
        dispatch({ type: 'UPDATE_ERROR', payload: prevReputationData.error });
        return;
      }

      if (relwordsData.error) {
        dispatch({ type: 'UPDATE_ERROR', payload: relwordsData.error });
        return;
      }

      if (relwordsTotalData.error) {
        dispatch({ type: 'UPDATE_ERROR', payload: relwordsTotalData.error });
        return;
      }

      if (
        reputePeriodData.data &&
        reputationData.data &&
        prevReputationData.data &&
        relwordsData.data &&
        relwordsTotalData.data
      ) {
        const total = relwordsTotalData.data[0]?.relwords || [];

        dispatch({
          type: 'SET_DATA',
          payload: {
            periodReputeData: reputePeriodData.data || [],
            curReputation: reputationData.data[0].reputation || [],
            prevReputation: prevReputationData.data[0].reputation || [],
            periodic: relwordsData.data,
            total,
            compares: total.slice(0, 5).map(({ name }) => name),
          },
        });
      }
    };

    fetchRelationTrends();
  }, [period, periodTotal, prevPeriod, topic]);

  return (
    <StyledRelationPage sideBarCollapsed={collapsed} {...props}>
      <Header user={user} />
      <Sidebar className="sidebar" />
      <div className="main">
        {/* TODO: 에러 메시지 컴포넌트 구현 */}
        {error && <span>{error.message}</span>}
        {!error && (
          <>
            {isWaiting ? (
              <Spinner />
            ) : (
              <>
                <div className="topic-selector-container">
                  <TopicSelector />
                </div>
                <ChartContainerTitle title="요약 분석" />
                <div className="overview-container">
                  <OverviewPieChart
                    title="평판 비율"
                    from={period.from}
                    to={period.to}
                    data={[overviewCurData]}
                    prevData={[overviewPrevData]}
                    color="Blue400"
                  />
                </div>

                <ChartContainerTitle title="연관어 평판 분석" />
                <div className="relwords-chart-container">
                  <WrappedRankingTable
                    title="연관어 순위"
                    height={600}
                    contentsPadding={[0]}
                    data={rankData}
                  />
                  {mapData && (
                    <BubbleChart
                      title="버블 차트"
                      width={570}
                      height={600}
                      contentsPadding={[0]}
                      bubblesData={mapData}
                    />
                  )}
                </div>
                <ChartContainerTitle title="평판 분석" />
                <div className="reputation-container">
                  {curReputation.length > 0 && (
                    <MainPieChart
                      title="긍부정 비율"
                      data={curReputation}
                      height={350}
                      dataNameMap={REPUTATIONS_KO_MAP}
                      dataColorMap={REPUTATIONS_COLOR_MAP}
                    />
                  )}
                  {periodReputeData.length > 0 && (
                    <PeriodBarChart
                      title="기간별 긍부정 추이"
                      dataKeys={[...REPUTATIONS]}
                      data={getReputationData(periodReputeData)}
                      legend={REPUTATIONS_LEGENDS}
                      colorMap={REPUTATIONS_COLOR_MAP}
                      interval={period.interval}
                    />
                  )}
                </div>
              </>
            )}
          </>
        )}
      </div>
      <RealTimeFeed className="right-fixed-column" />
    </StyledRelationPage>
  );
}

export default withRouter(RelationPage);
