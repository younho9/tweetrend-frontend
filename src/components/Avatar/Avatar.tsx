import styled, { css } from 'styled-components';

import Icon from 'src/components/Icon';
import { TWITTER_BASE_URL } from 'src/constants';
import { glow } from 'src/styles';
import { UserData } from 'src/types';

const sizes = {
  small: 20,
  medium: 28,
  large: 36,
  extraLarge: 48,
};

export type AvatarProps = {
  user: UserData;
} & Partial<StyledAvatarProps>;

export type StyledAvatarProps = {
  /** HTML 클래스 속성 */
  className?: string;
  isLoading: boolean;
  hasSrc: boolean;
  /** 아바타 크기 */
  size: keyof typeof sizes;
};

export type StyledInitialProps = {
  size: keyof typeof sizes;
};

const StyledAvatar = styled.div<StyledAvatarProps>`
  background: ${({ isLoading, theme }) =>
    !isLoading ? 'transparent' : theme.colors.Gray100};
  border-radius: 9999px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  vertical-align: top;
  overflow: hidden;
  text-transform: uppercase;
  height: ${({ size }) => sizes[size]}px;
  width: ${({ size }) => sizes[size]}px;
  min-width: ${({ size }) => sizes[size]}px;
  line-height: ${({ size }) => sizes[size]}px;

  ${({ hasSrc, isLoading }) =>
    !hasSrc &&
    css`
      background: ${({ theme }) => !isLoading && theme.colors.Blue400};
    `}

  & > .avatar-link {
    text-decoration: none;

    & > .avatar-image {
      width: 100%;
      height: auto;
      display: block;
    }

    & > .avatar-loading {
      & svg {
        position: relative;
        bottom: ${({ size }) => -(sizes[size] / 10)}px;
        height: 100%;
        width: 100%;
        vertical-align: top;
      }

      & path {
        fill: ${({ theme }) => theme.colors.Gray400};
        animation: ${glow} 1.5s ease-in-out infinite;
      }
    }
  }
`;

const Initial = styled.div<StyledInitialProps>`
  color: ${({ theme }) => theme.colors.Gray50};
  text-align: center;
  font-size: ${({ size }) => sizes[size] / 2}px;
  line-height: ${({ size }) => sizes[size]}px;
`;

function Avatar({
  user,
  isLoading = false,
  size = 'large',
  ...props
}: AvatarProps) {
  const { id, username = 'loading', profile_image_url: src } = user;

  let figure;

  if (isLoading) {
    figure = (
      <Icon
        className="avatar-loading"
        icon="UserFill"
        color="Gray400"
        size={sizes[size] - 10}
      />
    );
  } else if (src) {
    figure = <img className="avatar-image" src={src} alt={username} />;
  } else {
    figure = <Initial size={size}>{username.substring(0, 1)}</Initial>;
  }

  return (
    <StyledAvatar
      id={id}
      isLoading={isLoading}
      size={size}
      hasSrc={!!src}
      {...props}>
      <a
        className="avatar-link"
        href={`${TWITTER_BASE_URL}/${username}`}
        target="_blank"
        rel="noreferrer">
        {figure}
      </a>
    </StyledAvatar>
  );
}

export default Avatar;
