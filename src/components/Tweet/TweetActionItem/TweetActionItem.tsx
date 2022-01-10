import styled from 'styled-components';

import Icon, { IconType } from 'src/components/Icon';
import { TweetActionType } from 'src/components/Tweet/TweetActions';
import { hexToRGBA, typography } from 'src/styles';
import { Color } from 'src/types';
import { abbreviateNumber, capitalizeFirstLetter } from 'src/utils';

export type TweetActionItemProps = {
  /** 트윗 액션 이름 */
  action: TweetActionType;
  /** 트윗 액션의 개수 */
  count?: number;
} & Partial<StyledTweetActionItemProps>;

export type StyledTweetActionItemProps = {
  /** HTML 클래스 속성 */
  className?: string;
  /** 트윗 액션 호버 시 색상 */
  color: Color;
};

const StyledTweetActionItem = styled.li<StyledTweetActionItemProps>`
  min-width: 80px;
  list-style-type: none;
  display: flex;
  align-items: center;

  div {
    font-size: ${typography.size.s1};
    color: ${({ theme }) => theme.colors.Gray600};
    padding: 0 10px;
  }

  &:hover {
    div {
      color: ${({ color, theme }) => theme.colors[color]};
    }

    i {
      background-color: ${({ color, theme }) =>
        hexToRGBA(theme.colors[color], 0.1)};
    }

    path {
      fill: ${({ color, theme }) => theme.colors[color] || 'currentColor'};
    }
  }
`;

function TweetActionItem({
  action,
  count = 0,
  color = 'Gray600',
  ...props
}: TweetActionItemProps) {
  const icon = `${capitalizeFirstLetter(action)}Outline` as IconType;

  return (
    <StyledTweetActionItem color={color} {...props}>
      <Icon icon={icon} color="Gray600" size={20} />
      <div>
        <span>{abbreviateNumber(count)}</span>
      </div>
    </StyledTweetActionItem>
  );
}

export default TweetActionItem;
