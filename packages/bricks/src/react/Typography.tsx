import React, { forwardRef } from 'react';
import { cx } from './utils';

export type TypographyVariant =
  | 'display1' | 'display2' | 'display3' | 'display4'
  | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  | 'subtitle1' | 'subtitle2'
  | 'body1' | 'body2'
  | 'caption' | 'overline';

export type TypographyAlign = 'left' | 'center' | 'right' | 'justify';
export type TypographyWeight = 'light' | 'regular' | 'medium' | 'semibold' | 'bold' | 'black';
export type TypographyColor =
  | 'primary' | 'secondary' | 'accent' | 'neutral'
  | 'info' | 'success' | 'warning' | 'error'
  | 'muted' | 'inherit';
export type TypographyTransform = 'none' | 'capitalize' | 'uppercase' | 'lowercase';
export type TypographyDecoration = 'none' | 'underline' | 'line-through' | 'overline';
export type TypographyDisplay = 'inline' | 'inline-block' | 'block';

const VARIANT: Record<TypographyVariant, string> = {
  display1: 'text-7xl font-black tracking-tight',
  display2: 'text-6xl font-extrabold tracking-tight',
  display3: 'text-5xl font-bold tracking-tight',
  display4: 'text-4xl font-bold tracking-tight',
  h1: 'text-4xl font-bold',
  h2: 'text-3xl font-bold',
  h3: 'text-2xl font-semibold',
  h4: 'text-xl font-semibold',
  h5: 'text-lg font-semibold',
  h6: 'text-base font-semibold',
  subtitle1: 'text-base font-medium',
  subtitle2: 'text-sm font-medium',
  body1: 'text-base',
  body2: 'text-sm',
  caption: 'text-xs opacity-70',
  overline: 'text-xs uppercase tracking-widest',
};

/** 변형별 기본 태그 */
const ELEMENT: Record<TypographyVariant, React.ElementType> = {
  display1: 'h1',
  display2: 'h1',
  display3: 'h2',
  display4: 'h2',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subtitle1: 'h6',
  subtitle2: 'h6',
  body1: 'p',
  body2: 'p',
  caption: 'span',
  overline: 'span',
};

const ALIGN: Record<TypographyAlign, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
  justify: 'text-justify',
};

const WEIGHT: Record<TypographyWeight, string> = {
  light: 'font-light',
  regular: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  black: 'font-black',
};

const COLOR: Record<TypographyColor, string> = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  accent: 'text-accent',
  neutral: 'text-neutral',
  info: 'text-info',
  success: 'text-success',
  warning: 'text-warning',
  error: 'text-error',
  muted: 'opacity-60',
  inherit: '',
};

const TRANSFORM: Record<TypographyTransform, string> = {
  none: 'normal-case',
  capitalize: 'capitalize',
  uppercase: 'uppercase',
  lowercase: 'lowercase',
};

const DECORATION: Record<TypographyDecoration, string> = {
  none: 'no-underline',
  underline: 'underline',
  'line-through': 'line-through',
  overline: 'overline',
};

const DISPLAY: Record<TypographyDisplay, string> = {
  inline: 'inline',
  'inline-block': 'inline-block',
  block: 'block',
};

/**
 * 줄 수 제한.
 *
 * Tailwind 스캐너는 `line-clamp-${n}` 같은 조립 문자열을 읽지 못하므로
 * 지원하는 값을 여기에 모두 적어 둔다.
 */
const CLAMP: Record<1 | 2 | 3 | 4 | 5 | 6, string> = {
  1: 'line-clamp-1',
  2: 'line-clamp-2',
  3: 'line-clamp-3',
  4: 'line-clamp-4',
  5: 'line-clamp-5',
  6: 'line-clamp-6',
};

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * 텍스트 역할
   * @default 'body1'
   */
  variant?: TypographyVariant;

  /** 렌더할 태그를 직접 지정한다 */
  as?: React.ElementType;

  /** 정렬 */
  align?: TypographyAlign;

  /** 굵기. 지정하면 변형의 기본 굵기를 덮어쓴다 */
  weight?: TypographyWeight;

  /** 색상 */
  color?: TypographyColor;

  /** 대소문자 변환 */
  transform?: TypographyTransform;

  /** 밑줄·취소선 */
  decoration?: TypographyDecoration;

  /** 표시 방식 */
  display?: TypographyDisplay;

  /** 기울임 */
  italic?: boolean;

  /** 한 줄로 자르고 말줄임표 */
  truncate?: boolean;

  /** 지정한 줄 수로 자른다 (1~6) */
  clamp?: 1 | 2 | 3 | 4 | 5 | 6;

  /** 드래그 선택 방지 */
  noSelect?: boolean;

  /** 아래쪽 여백 추가 */
  gutterBottom?: boolean;

  children?: React.ReactNode;
}

/**
 * DOI INC Typography — Tailwind 텍스트 유틸리티 조합
 *
 * daisyUI에 대응 컴포넌트가 없다. 자체 `--ds-*` 타이포 토큰 대신
 * Tailwind 유틸리티를 리터럴 맵으로 묶어 같은 API를 유지한다.
 *
 * @example
 * ```tsx
 * <Typography variant="h2">제목</Typography>
 * <Typography variant="body2" color="muted" clamp={2}>긴 설명…</Typography>
 * ```
 */
export const Typography = forwardRef<HTMLElement, TypographyProps>(({
  variant = 'body1',
  as,
  align,
  weight,
  color,
  transform,
  decoration,
  display,
  italic = false,
  truncate = false,
  clamp,
  noSelect = false,
  gutterBottom = false,
  className,
  children,
  ...props
}, ref) => {
  const Component = (as ?? ELEMENT[variant]) as React.ElementType;

  return (
    <Component
      ref={ref}
      className={cx(
        VARIANT[variant],
        align && ALIGN[align],
        weight && WEIGHT[weight],
        color && COLOR[color],
        transform && TRANSFORM[transform],
        decoration && DECORATION[decoration],
        display && DISPLAY[display],
        italic && 'italic',
        truncate && 'truncate',
        clamp && CLAMP[clamp],
        noSelect && 'select-none',
        gutterBottom && 'mb-4',
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
});

Typography.displayName = 'Typography';

export default Typography;
