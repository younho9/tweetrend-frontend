import { useEffect, useReducer } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';

import { fetchTrendAnalysis } from 'src/api';
import {
  Header,
  Sidebar,
  ChartContainerTitle,
  RelationRankingTable,
  Spinner,
  TopicSelector,
  MainAreaChart,
} from 'src/components';
import { REPUTATION_SCORE_COLOR_MAP } from 'src/constants';
import { useAuth, usePeriod, useUIContext } from 'src/contexts';
import {
  chartWidth,
  rankingTableWidth,
  headerHeight,
  sidebarWidth,
} from 'src/styles';
import { Color, RelWordsDataType, TrendAnalysisData } from 'src/types';
import { TopicType } from 'src/types/topic';
import { utcToMs } from 'src/utils';

const COMPARE_CHART_COLORS: Color[] = [
  'Blue400',
  'Magenta400',
  'Indigo400',
  'Yellow400',
  'Orange400',
];

export type RelationParams = {
  topic: TopicType;
};

export type ComparePageProps = RouteComponentProps<RelationParams> &
  Partial<StyledComparePageProps>;

export type StyledComparePageProps = {
  /** HTML 클래스 속성 */
  className?: string;
  sideBarCollapsed?: boolean;
};

type ActionType =
  | {
      type: 'SET_DATA';
      payload: {
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

const StyledComparePage = styled.div<StyledComparePageProps>`
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

    & > .compare-chart-container {
      margin: 15px;
      width: ${chartWidth};
    }

    & > .bubble-chart-container {
      width: 800px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    & > .content-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      & > .bubble-chart-wrapper {
      }
    }
  }

  & > .right-fixed-column {
    position: fixed;
    top: ${headerHeight};
    width: ${rankingTableWidth};
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

function ComparePage({ match, ...props }: ComparePageProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { collapsed } = useUIContext();
  const { user } = useAuth();
  const { period, periodTotal } = usePeriod();
  const { periodRelwords, totalRelwords, compares, isWaiting, error } = state;
  const { topic } = match.params;
  const compareData = periodRelwords.map(({ date, relwords }) => ({
    date: utcToMs(date),
    ...compares.reduce(
      (periodMap, curWord) => ({
        ...periodMap,
        [curWord]: relwords?.find(({ name }) => name === curWord)?.counts || 0,
      }),
      {}
    ),
  }));

  useEffect(() => {
    const fetchRelationTrends = async () => {
      dispatch({ type: 'UPDATE_WAITING' });

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

      if (relwordsData.error) {
        dispatch({ type: 'UPDATE_ERROR', payload: relwordsData.error });
        return;
      }

      if (relwordsTotalData.error) {
        dispatch({ type: 'UPDATE_ERROR', payload: relwordsTotalData.error });
        return;
      }

      if (relwordsData.data && relwordsTotalData.data) {
        const total = relwordsTotalData.data[0]?.relwords || [];

        dispatch({
          type: 'SET_DATA',
          payload: {
            periodic: relwordsData.data,
            total,
            compares: total.slice(0, 5).map(({ name }) => name),
          },
        });
      }
    };

    fetchRelationTrends();
  }, [period, periodTotal, topic]);

  return (
    <StyledComparePage sideBarCollapsed={collapsed} {...props}>
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
                <ChartContainerTitle title="연관어 비교" />
                {compareData && (
                  <MainAreaChart
                    title="연관어 비교"
                    colors={COMPARE_CHART_COLORS}
                    dataKeys={compares}
                    legend={compares.map((name, idx) => ({
                      name,
                      color: COMPARE_CHART_COLORS[idx],
                    }))}
                    withMargin
                    data={compareData}
                  />
                )}
              </>
            )}
          </>
        )}
      </div>
      <div className="right-fixed-column">
        <div className="title">연관어 순위</div>
        {isWaiting ? (
          <Spinner />
        ) : (
          totalRelwords && (
            <RelationRankingTable
              compares={compares}
              colors={COMPARE_CHART_COLORS}
              addCompare={(word: string) =>
                dispatch({ type: 'ADD_COMPARE', payload: word })
              }
              deleteCompare={(word: string) =>
                dispatch({ type: 'DELETE_COMPARE', payload: word })
              }
              data={totalRelwords}
            />
          )
        )}
      </div>
    </StyledComparePage>
  );
}

export default withRouter(ComparePage);
