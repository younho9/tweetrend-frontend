import Moment from 'react-moment';
import 'moment/locale/ko';
import styled from 'styled-components';
import 'styled-components/macro';

import Icon from 'src/components/Icon';
import {
  MOMENT_KO_DEFAULT_FEW_SECONDS_STRING,
  MOMENT_KO_FEW_SECONDS_STRING,
  TWITTER_BASE_URL,
} from 'src/constants';
import { typography, margin } from 'src/styles';
import { UserData } from 'src/types';

const sizes = {
  small: {
    name: typography.size.s2,
    username: typography.size.s1,
  },
  medium: {
    name: typography.size.s3,
    username: typography.size.s2,
  },
};

export type TweetHeaderProps = {
  user: UserData;
  /** 트윗 작성 시간 */
  createdAt: Date | string;
} & Partial<StyledTweetHeaderProps>;

export type StyledTweetHeaderProps = {
  /** HTML 클래스 속성 */
  className?: string;
  /** TweetHeader 사이즈 */
  size: keyof typeof sizes;
};

const StyledTweetHeader = styled.header<StyledTweetHeaderProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  .author {
    color: ${({ theme }) => theme.colors.Gray900};
    text-decoration: none;

    .author-info {
      display: inline-flex;
      line-height: 26px;
      max-width: 250px;
      overflow: hidden;

      .author-name {
        font-size: ${({ size }) => sizes[size].name};
        font-weight: ${typography.weight.bold};
        text-align: center;
        white-space: nowrap;
        max-width: 250px;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .author-username {
        font-size: ${({ size }) => sizes[size].username};
        font-weight: ${typography.weight.medium};
        color: ${({ theme }) => theme.colors.Gray600};
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }

  time {
    font-size: ${typography.size.s2};
  }
`;

Moment.globalFilter = (date: string) =>
  date === MOMENT_KO_DEFAULT_FEW_SECONDS_STRING
    ? MOMENT_KO_FEW_SECONDS_STRING
    : date;

/**
 * @todo 시간 로직 수정 필요.
 * @todo 하루 내에는 지금, 1분, 2분, 23시간 ...
 * @todo 일주일까지는 어제 오전 hh:mm, 2일 오후 hh:mm, 3일 오전 hh:mm ...
 * @todo 일주일 이후로는 M월 D일 오전 hh:mm, 2일 오후 hh:mm, 3일 오전 hh:mm ...
 * @todo 1년 이후로는 YYYY년 M월 D일 오전 hh:mm, 2일 오후 hh:mm, 3일 오전 hh:mm ...
 */
function TweetHeader({
  user,
  createdAt,
  size = 'medium',
  ...props
}: TweetHeaderProps) {
  const { id, name, username, verified = 'false' } = user;

  return (
    <StyledTweetHeader id={id} size={size} {...props}>
      <a
        className="author"
        href={`${TWITTER_BASE_URL}/${username}`}
        target="_blank"
        rel="noreferrer">
        <div className="author-info">
          <b className="author-name" css={margin(0, 6, 0, 0)}>
            {name}
          </b>
          {verified && (
            <Icon
              css={margin(0, 6, 0, 0)}
              icon="VerifiedFill"
              size={18}
              color="Blue400"
            />
          )}
          <span className="author-username">@{username}</span>
        </div>
      </a>
      {size !== 'small' && (
        <Moment fromNow ago>
          {createdAt}
        </Moment>
      )}
    </StyledTweetHeader>
  );
}

export default TweetHeader;
