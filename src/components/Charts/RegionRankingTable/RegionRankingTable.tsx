import styled from 'styled-components';

import MainChartWrapper, {
  MainChartWrapperProps,
} from 'src/components/Charts/MainChartWrapper';
import { COUNTRIES } from 'src/constants';
import { RegionDataType } from 'src/types';

export type RegionRankingTableProps = {
  /**
   * name: 국가 Code 2자리
   * counts: 데이터 건수
   */
  data: RegionDataType[];
} & MainChartWrapperProps &
  Partial<StyledRegionRankingTableProps>;

export type StyledRegionRankingTableProps = {
  /** HTML 클래스 속성 */
  className?: string;
};

const StyledTableHead = styled.thead`
  color: ${({ theme }) => theme.colors.Gray900};
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  font-size: ${({ theme }) => theme.typography.size.s3};
`;

function TableHead() {
  return (
    <StyledTableHead>
      <tr>
        <td>순위</td>
        <td>국가</td>
        <td>건수</td>
      </tr>
    </StyledTableHead>
  );
}

const StyledTableItem = styled.tr`
  font-size: ${({ theme }) => theme.typography.size.s3};
  color: ${({ theme }) => theme.colors.Gray900};
  font-weight: ${({ theme }) => theme.typography.weight.medium};

  &:nth-child(even) {
    background-color: ${({ theme }) => theme.colors.Gray200};
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.Blue400};
  }
`;

type TableItemProps = RegionDataType & { rank: number };

function TableItem({ rank, name, counts, ...props }: TableItemProps) {
  return (
    <StyledTableItem {...props}>
      <td>{rank}</td>
      <td>{COUNTRIES[name] || '기타'}</td>
      <td>{counts}</td>
    </StyledTableItem>
  );
}

const StyledRegionRankingTable = styled.table<StyledRegionRankingTableProps>`
  box-sizing: border-box;

  tr {
    display: flex;
    padding: 0.5rem 1.25rem;
    border-radius: 8px;

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
        width: 200px;
      }
      :nth-child(3) {
        width: 110px;
      }
    }
  }
`;

export function UnWrappedRegionRankingTable({
  data,
  ...props
}: RegionRankingTableProps) {
  return (
    <StyledRegionRankingTable {...props}>
      <TableHead />
      <tbody>
        {data.map(({ name, counts }, idx) => (
          <TableItem key={name} rank={idx + 1} name={name} counts={counts} />
        ))}
      </tbody>
    </StyledRegionRankingTable>
  );
}

export default MainChartWrapper(UnWrappedRegionRankingTable);
