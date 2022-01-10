import { useState } from 'react';
import styled from 'styled-components';

import Button from 'src/components/Button';
import { REPUTATIONS_COLOR_MAP, REPUTATIONS_KO_MAP } from 'src/constants';
import { Color, RelWordsDataType, ReputationType } from 'src/types';
import { validateCssUnitValue } from 'src/utils';

const StyledTableHead = styled.thead`
  color: ${({ theme }) => theme.colors.Gray900};
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  font-size: ${({ theme }) => theme.typography.size.m1};
`;

function TableHead() {
  return (
    <StyledTableHead>
      <tr>
        <td>순위</td>
        <td>평판</td>
        <td>키워드</td>
        <td>건수</td>
      </tr>
    </StyledTableHead>
  );
}

type StyledTableItemProps = {
  reputation: ReputationType;
  active: boolean;
  compareIdx?: number;
  colors: Color[];
};

const StyledTableItem = styled.tr<StyledTableItemProps>`
  font-size: ${({ theme }) => theme.typography.size.s3};
  color: ${({ theme }) => theme.colors.Gray900};
  font-weight: ${({ theme }) => theme.typography.weight.medium};
  display: flex;
  justify-content: center;
  align-items: center;

  &:nth-child(odd) {
    background-color: ${({ theme }) => theme.colors.Gray100};
    background-color: ${({ theme, active, colors, compareIdx = -1 }) =>
      active && theme.colors[colors[compareIdx]]};
  }

  &:nth-child(even) {
    background-color: ${({ theme }) => theme.colors.Gray300};
    background-color: ${({ theme, active, colors, compareIdx = -1 }) =>
      active && theme.colors[colors[compareIdx]]};
  }

  .reputation-badge {
    padding: 0;
    div {
      padding: 0.25rem 0.75rem;
      color: ${({ theme, active, reputation }) =>
        !active && theme.colors[REPUTATIONS_COLOR_MAP[reputation]]};
      background-color: ${({ theme, active, reputation }) =>
        active && theme.colors[REPUTATIONS_COLOR_MAP[reputation]]};
      background-color: ${({ theme, active, reputation }) =>
        active && reputation === 'positive' && theme.colors.Blue700};
      border: 1px solid
        ${({ theme, reputation }) =>
          theme.colors[REPUTATIONS_COLOR_MAP[reputation]]};
      border-radius: 9999px;
    }
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.Gray50};

    .reputation-badge {
      div {
        color: ${({ theme }) => theme.colors.Gray900};
        background-color: ${({ theme, reputation }) =>
          theme.colors[REPUTATIONS_COLOR_MAP[reputation]]};
      }
    }
  }
`;

type TableItemProps = RelWordsDataType & {
  rank: number;
  colors: Color[];
  compareIdx?: number;
  addCompare?: (word: string) => void;
  deleteCompare?: (word: string) => void;
};

function TableItem({
  rank,
  name,
  score,
  counts,
  compareIdx,
  addCompare,
  deleteCompare,
  ...props
}: TableItemProps) {
  const [hover, setHover] = useState(false);
  const active = compareIdx !== undefined && compareIdx !== -1;
  let reputation: ReputationType;

  if (score > 0) {
    reputation = 'positive';
  } else if (score === 0) {
    reputation = 'neutral';
  } else {
    reputation = 'negative';
  }

  return (
    <StyledTableItem
      compareIdx={compareIdx}
      active={active}
      reputation={reputation}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...props}>
      {compareIdx && hover ? (
        <div className="select-button-container">
          {!active && (
            <Button
              variants="informative"
              width="200"
              onClick={() => addCompare && addCompare(name)}>
              추가
            </Button>
          )}
          {active && (
            <Button
              variants="negative"
              width="200"
              onClick={() => deleteCompare && deleteCompare(name)}>
              삭제
            </Button>
          )}
        </div>
      ) : (
        <>
          <td>{rank}</td>
          <td className="reputation-badge">
            <div>{REPUTATIONS_KO_MAP[reputation]}</div>
          </td>
          <td>{name}</td>
          <td>{counts}</td>
        </>
      )}
    </StyledTableItem>
  );
}

export type RelationRankingTableProps = {
  /**
   * name: 데이터 key
   * counts: 데이터 건수
   * score: 데이터 긍부정 점수
   */
  data: RelWordsDataType[];
  colors?: Color[];
  compares?: string[];

  addCompare?: (word: string) => void;
  deleteCompare?: (word: string) => void;
} & Partial<StyledRelationRankingTableProps>;

export type StyledRelationRankingTableProps = {
  /** HTML 클래스 속성 */
  className?: string;
  height?: number;
};

const StyledRelationRankingTable = styled.table<StyledRelationRankingTableProps>`
  display: block;
  height: ${({ height }) => validateCssUnitValue(height)};

  tr {
    display: flex;
    padding: 0.5rem 1.25rem;
    border-radius: 6px;
    margin: 4px 6px;

    td {
      box-sizing: border-box;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.5rem 1.25rem;
      text-align: center;

      :nth-child(1) {
        width: 80px;
      }
      :nth-child(2) {
        width: 80px;
      }
      :nth-child(3) {
        width: 100px;
      }
      :nth-child(4) {
        width: 90px;
      }
    }
  }
`;

function RelationRankingTable({
  data,
  compares,
  colors,
  addCompare,
  deleteCompare,
  ...props
}: RelationRankingTableProps) {
  return (
    <StyledRelationRankingTable {...props}>
      <TableHead />
      <tbody>
        {data.map(({ name, counts, score }, idx) => (
          <TableItem
            key={name}
            rank={idx + 1}
            colors={colors || []}
            compareIdx={compares?.findIndex((comp) => comp === name)}
            addCompare={addCompare}
            deleteCompare={deleteCompare}
            name={name}
            counts={counts}
            score={score}
          />
        ))}
      </tbody>
    </StyledRelationRankingTable>
  );
}

export default RelationRankingTable;
