import styled from 'styled-components';

import { UserData } from 'src/types';

import Avatar from '../Avatar';

export type UserProps = {
  isLoading: boolean;
  user: UserData;
} & Partial<StyledUserProps>;

export type StyledUserProps = {
  /** HTML 클래스 속성 */
  className?: string;
};

const StyledUser = styled.div<StyledUserProps>`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  .image-container {
    margin-right: 10px;
  }

  .info-container {
    display: flex;
    flex-direction: column;

    .name {
      font-size: ${({ theme }) => theme.typography.size.s2};
      font-weight: ${({ theme }) => theme.typography.weight.bold};
      color: ${({ theme }) => theme.colors.Gray800};
      margin-bottom: 2px;
    }

    .username {
      font-size: ${({ theme }) => theme.typography.size.s1};
      font-weight: ${({ theme }) => theme.typography.weight.medium};
      color: ${({ theme }) => theme.colors.Gray600};
    }
  }
`;

function User({ isLoading = false, user, ...props }: UserProps) {
  return (
    <StyledUser {...props}>
      <Avatar
        className="image-container"
        isLoading={isLoading}
        user={user}
        size="large"
      />
      <div className="info-container">
        <span className="name">{user.name}</span>
        <span className="username">@{user.username}</span>
      </div>
    </StyledUser>
  );
}

export default User;
