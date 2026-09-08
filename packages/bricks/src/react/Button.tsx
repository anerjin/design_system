import React, { forwardRef } from 'react';

export type ButtonColor =
  | 'neutral'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'info'
  | 'success'
  | 'warning'
  | 'error';

export type ButtonVariant = 'solid' | 'surface' | 'outline' | 'dash' | 'soft' | 'ghost' | 'link';

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type ButtonShape = 'square' | 'circle';

/**
 * 클래스는 반드시 리터럴 문자열이어야 한다.
 * Tailwind v4 스캐너는 `btn-${color}` 같은 템플릿 리터럴을 읽지 못하므로,
 * 템플릿으로 조립하면 해당 클래스가 빌드 산출 CSS에서 통째로 빠진다.
 */
const COLOR: Record<ButtonColor, string> = {
  neutral: 'btn-neutral',
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  accent: 'btn-accent',
  info: 'btn-info',
  success: 'btn-success',
  warning: 'btn-warning',
  error: 'btn-error',
};

const VARIANT: Record<ButtonVariant, string> = {
  solid: '',
  surface: 'btn-surface',
  outline: 'btn-outline',
  dash: 'btn-dash',
  soft: 'btn-soft',
  ghost: 'btn-ghost',
  link: 'btn-link',
};

const SIZE: Record<ButtonSize, string> = {
  xs: 'btn-xs',
  sm: 'btn-sm',
  md: 'btn-md',
  lg: 'btn-lg',
  xl: 'btn-xl',
};

const SHAPE: Record<ButtonShape, string> = {
  square: 'btn-square',
  circle: 'btn-circle',
};

/** 버튼 크기별 로딩 스피너 크기 */
const LOADING_SIZE: Record<ButtonSize, string> = {
  xs: 'loading-xs',
  sm: 'loading-sm',
  md: 'loading-md',
  lg: 'loading-lg',
  xl: 'loading-xl',
};

/**
 * `as`로 어떤 태그든 렌더할 수 있으므로 속성도 넓게 받는다.
 * `color`·`size`는 HTML에도 같은 이름이 있어 걷어내고 아래에서 새로 정의한다.
 */
type ButtonBaseProps = Omit<React.AllHTMLAttributes<HTMLElement>, 'as' | 'color' | 'size' | 'type'>;

export interface ButtonProps extends ButtonBaseProps {
  /**
   * 렌더할 태그. daisyUI의 `btn`은 `<a>`에도 정식으로 쓰이므로
   * 링크에 버튼 모양을 입힐 때 `as="a"`를 준다.
   * @default 'button'
   */
  as?: React.ElementType;

  /**
   * 버튼 타입. `as`가 `button`일 때만 붙는다.
   * @default 'button'
   */
  type?: 'button' | 'submit' | 'reset';

  /**
   * 시맨틱 색상. 생략하면 daisyUI 기본 버튼(base 색상)으로 렌더된다.
   */
  color?: ButtonColor;

  /**
   * 버튼 스타일. `color`와 조합해서 쓴다 (예: variant="outline" color="primary").
   * `surface`는 취소·닫기에 사용하는 무채색 표면 버튼이며 `color`보다 우선한다.
   * @default 'solid'
   */
  variant?: ButtonVariant;

  /**
   * 버튼 크기
   * @default 'md'
   */
  size?: ButtonSize;

  /**
   * 정사각형 / 원형 아이콘 전용 버튼
   */
  shape?: ButtonShape;

  /**
   * 좌우 여백을 넓힌 버튼
   * @default false
   */
  wide?: boolean;

  /**
   * 부모 너비를 꽉 채우는 버튼
   * @default false
   */
  block?: boolean;

  /**
   * 눌린 상태로 고정
   * @default false
   */
  active?: boolean;

  /**
   * 로딩 상태. 스피너를 표시하고 버튼을 비활성화한다.
   * @default false
   */
  loading?: boolean;

  /**
   * 왼쪽 아이콘
   */
  leftIcon?: React.ReactNode;

  /**
   * 오른쪽 아이콘
   */
  rightIcon?: React.ReactNode;

  children?: React.ReactNode;
}

/**
 * DOI INC Button — daisyUI `btn` 기반
 *
 * @example
 * ```tsx
 * <Button color="primary">저장</Button>
 * <Button variant="surface">취소</Button>
 * <Button color="primary" size="sm">삭제</Button>
 * <Button shape="circle" aria-label="닫기"><Icon name="x" /></Button>
 * <Button as="a" href="/docs" variant="outline">문서 보기</Button>
 * ```
 */
export const Button = forwardRef<HTMLElement, ButtonProps>(({
  as: Component = 'button',
  type = 'button',
  color,
  variant = 'solid',
  size = 'md',
  shape,
  wide = false,
  block = false,
  active = false,
  loading = false,
  leftIcon,
  rightIcon,
  disabled = false,
  children,
  className,
  ...props
}, ref) => {
  const classes = [
    'btn',
    color ? COLOR[color] : '',
    VARIANT[variant],
    SIZE[size],
    shape ? SHAPE[shape] : '',
    wide ? 'btn-wide' : '',
    block ? 'btn-block' : '',
    active ? 'btn-active' : '',
    // <a>에는 disabled 속성이 없으므로 클래스로 대신 막는다
    Component !== 'button' && (disabled || loading) ? 'btn-disabled' : '',
    className,
  ].filter(Boolean).join(' ');

  /** button이 아닐 때는 button 전용 속성을 붙이지 않는다 */
  const elementProps = Component === 'button'
    ? { type, disabled: disabled || loading }
    : { 'aria-disabled': disabled || loading || undefined };

  return (
    <Component
      ref={ref}
      className={classes}
      aria-busy={loading || undefined}
      {...elementProps}
      {...props}
    >
      {loading && <span className={['loading', 'loading-spinner', LOADING_SIZE[size]].join(' ')} />}
      {!loading && leftIcon}
      {children}
      {!loading && rightIcon}
    </Component>
  );
});

Button.displayName = 'Button';

export default Button;
