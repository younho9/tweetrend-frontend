import React from 'react';
import styled, { css } from 'styled-components';

import Icon, { IconType } from 'src/components/Icon';
import { flexAlignMap } from 'src/styles';
import { BaseColorNamesType, Colors } from 'src/types';
import { validateCssUnitValue } from 'src/utils';

const sizes = {
  small: {
    css: css`
      min-height: 1.5rem;
      font-size: 0.75rem;
      padding: 0 0.5rem;
    `,
    icon: {
      size: 14,
      margin: '2px',
    },
  },
  medium: {
    css: css`
      min-height: 2rem;
      font-size: 0.875rem;
      padding: 0 0.75rem;
    `,
    icon: {
      size: 16,
      margin: '4px',
    },
  },
  large: {
    css: css`
      min-height: 2.5rem;
      font-size: 1rem;
      padding: 0 1rem;
    `,
    icon: {
      size: 20,
      margin: '6px',
    },
  },
  extraLarge: {
    css: css`
      min-height: 3rem;
      font-size: 1.125rem;
      padding: 0 1.25rem;
    `,
    icon: {
      size: 24,
      margin: '8px',
    },
  },
};

export type ButtonProps = {
  /** 버튼 안의 내용 */
  children?: React.ReactText;
  /** 버튼 앞에 추가할 아이콘 이름 */
  icon?: IconType;
  /** 버튼 타입을 설정합니다. `default`는 색상을 설정할 수 없습니다.  */
  variants?: 'default' | 'informative' | 'notice' | 'positive' | 'negative';
  /** 클릭했을 때 호출할 함수 */
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
} & Partial<StyledButtonProps>;

export type StyledButtonProps = {
  /** HTML 클래스 속성 */
  className?: string;
  /** 버튼의 크기를 설정합니다 */
  size: keyof typeof sizes;
  /** 버튼의 활성화 여부 */
  active?: boolean;
  /** 버튼의 바탕색을 칠할지 여부 */
  filled?: boolean;
  /** 버튼의 형태를 둥근 형태로 할지 여부 */
  rounded?: boolean;
  /** 버튼을 비활성화 할지 여부 */
  disabled?: boolean;
  /** 버튼 형태 없이 텍스트만 사용할지 여부 */
  textOnly?: boolean;
  /** 아이콘만 있는 버튼의 경우 너비와 높이를 같게 설정합니다. */
  iconOnly?: boolean;
  /** 정렬 방향 */
  align: 'left' | 'center' | 'right';
  /** 버튼의 너비를 임의로 설정합니다. */
  width?: string | number;
  /** 버튼의 높이를 임의로 설정합니다. */
  height?: string | number;
  /** 버튼의 색상을 변경합니다. (`default`는 설정 불가) */
  color?: BaseColorNamesType;
};

const Default = styled.button<StyledButtonProps>`
  display: flex;
  justify-content: ${({ align }) => flexAlignMap[align]};
  align-items: center;
  ${({ size }) => sizes[size].css}
  ${({ iconOnly, size }) =>
    iconOnly &&
    css`
      min-height: 0;
      padding: ${sizes[size].icon.margin};
    `};
  width: ${({ width }) => validateCssUnitValue(width, 'max-content')};
  height: ${({ height }) => validateCssUnitValue(height, 'max-content')};
  box-sizing: border-box;
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  color: ${({ theme, active }) =>
    active ? theme.colors.Gray50 : theme.colors.Gray600};
  background-color: ${({ theme, textOnly, active }) => {
    if (active) {
      return theme.colors.Blue500;
    }
    if (textOnly) {
      return 'transparent';
    }
    return theme.colors.Gray75;
  }};
  border: 2px solid;
  border-color: ${({ theme, active, textOnly }) =>
    active || textOnly ? 'transparent' : theme.colors.Gray400};
  border-radius: ${({ rounded }) => (rounded ? '9999px' : '4px')};
  cursor: pointer;

  i:first-child {
    margin-right: ${({ size }) => sizes[size].icon.margin};
  }

  i:only-child {
    margin-right: 0;
  }

  path {
    fill: ${({ theme, color, filled, active, textOnly }) =>
      active || (!textOnly && filled)
        ? theme.colors.Gray50
        : theme.colors[`${color}500` as keyof Colors]};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.Gray900};
    background-color: ${({ theme, active }) =>
      active ? theme.colors.Blue400 : theme.colors.Gray50};
    border-color: ${({ theme, textOnly, active }) =>
      active || textOnly ? 'transparent' : theme.colors.Gray500};

    path {
      fill: ${({ theme }) => theme.colors.Gray900};
    }
  }

  &:focus {
    color: ${({ theme }) => theme.colors.Gray900};
    background-color: ${({ theme, textOnly }) =>
      textOnly ? 'transparent' : theme.colors.Gray200};
    border-color: ${({ theme, textOnly }) =>
      textOnly ? 'transparent' : theme.colors.Gray500};
    outline: 1px solid ${({ theme }) => theme.colors.Blue400};

    path {
      fill: ${({ theme }) => theme.colors.Gray900};
    }
  }

  &:active {
    color: ${({ theme, textOnly }) =>
      textOnly ? theme.colors.Blue400 : theme.colors.Gray50};
    background-color: ${({ theme, textOnly }) =>
      textOnly ? 'transparent' : theme.colors.Blue500};
    border-color: ${({ theme, textOnly }) =>
      textOnly ? 'transparent' : theme.colors.Blue500};

    path {
      fill: ${({ theme, textOnly }) =>
        textOnly ? theme.colors.Blue400 : theme.colors.Gray50};
    }
  }

  &:disabled {
    cursor: not-allowed;
    color: ${({ theme }) => theme.colors.Gray400};
    background-color: ${({ theme }) => theme.colors.Gray200};
    border-color: ${({ theme }) => theme.colors.Gray200};

    path {
      fill: ${({ theme }) => theme.colors.Gray400};
    }
  }
`;

const Informative = styled(Default)`
  color: ${({ theme, color, active, filled, textOnly }) =>
    active || (!textOnly && filled)
      ? theme.colors.Gray50
      : theme.colors[`${color}500` as keyof Colors]};
  background-color: ${({ theme, color, active, filled, textOnly }) =>
    active || (!textOnly && filled)
      ? theme.colors[`${color}500` as keyof Colors]
      : 'inherit'};
  border: 2px solid;
  border-color: ${({ theme, color, textOnly }) =>
    textOnly ? 'transparent' : theme.colors[`${color}500` as keyof Colors]};

  path {
    fill: ${({ theme, color, active, filled, textOnly }) =>
      active || (!textOnly && filled)
        ? theme.colors.Gray50
        : theme.colors[`${color}500` as keyof Colors]};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.Gray50};
    background-color: ${({ theme, color }) =>
      theme.colors[`${color}400` as keyof Colors]};
    border-color: ${({ theme, color }) =>
      theme.colors[`${color}400` as keyof Colors]};

    path {
      fill: ${({ theme }) => theme.colors.Gray50};
    }
  }

  &:focus {
    color: ${({ theme }) => theme.colors.Gray50};
    background-color: ${({ theme, color }) =>
      theme.colors[`${color}600` as keyof Colors]};
    border-color: ${({ theme, color }) =>
      theme.colors[`${color}600` as keyof Colors]};

    path {
      fill: ${({ theme }) => theme.colors.Gray50};
    }
  }

  &:active {
    color: ${({ theme }) => theme.colors.Gray50};
    background-color: ${({ theme, color }) =>
      theme.colors[`${color}500` as keyof Colors]};
    border-color: ${({ theme, color }) =>
      theme.colors[`${color}500` as keyof Colors]};

    path {
      fill: ${({ theme }) => theme.colors.Gray50};
    }
  }

  &:disabled {
    cursor: not-allowed;
    color: ${({ theme }) => theme.colors.Gray400};
    background-color: ${({ theme }) => theme.colors.Gray200};
    border-color: ${({ theme }) => theme.colors.Gray200};

    path {
      fill: ${({ theme }) => theme.colors.Gray400};
    }
  }
`;
/**
 * hover, active, focus, disabled 상태가 적용되어 있는 버튼 컴포넌트 입니다.
 *
 * `variants`로 버튼 타입을 설정할 수 있습니다. (`default`는 색상을 설정할 수 없습니다.)
 *
 * `informative` : 정보 전달
 *
 * `notice` : 주의
 *
 * `positive` : 긍정적 행동 버튼
 *
 * `negative` : 부정적 행동 버튼
 */
function Button({
  variants,
  size = 'medium',
  align = 'center',
  children,
  icon,
  iconOnly,
  ...props
}: ButtonProps) {
  switch (variants) {
    case 'informative':
      return (
        <Informative
          iconOnly={iconOnly}
          size={size}
          align={align}
          color="Blue"
          {...props}>
          {icon && <Icon size={sizes[size].icon.size} icon={icon} />}
          {!iconOnly && children && <span>{children}</span>}
        </Informative>
      );
    case 'notice':
      return (
        <Informative
          iconOnly={iconOnly}
          size={size}
          align={align}
          color="Orange"
          {...props}>
          {icon && <Icon size={sizes[size].icon.size} icon={icon} />}
          {!iconOnly && children && <span>{children}</span>}
        </Informative>
      );
    case 'positive':
      return (
        <Informative
          iconOnly={iconOnly}
          size={size}
          align={align}
          color="Green"
          {...props}>
          {icon && <Icon size={sizes[size].icon.size} icon={icon} />}
          {!iconOnly && children && <span>{children}</span>}
        </Informative>
      );
    case 'negative':
      return (
        <Informative
          iconOnly={iconOnly}
          size={size}
          align={align}
          color="Red"
          {...props}>
          {icon && <Icon size={sizes[size].icon.size} icon={icon} />}
          {!iconOnly && children && <span>{children}</span>}
        </Informative>
      );
    default:
      return (
        <Default iconOnly={iconOnly} size={size} align={align} {...props}>
          {icon && <Icon size={sizes[size].icon.size} icon={icon} />}
          {!iconOnly && children && <span>{children}</span>}
        </Default>
      );
  }
}

export default Button;
