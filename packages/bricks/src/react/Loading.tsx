import React, { forwardRef } from 'react';
import { cx, type Color, type Size } from './utils';

export type LoadingVariant = 'spinner' | 'dots' | 'ring' | 'ball' | 'bars' | 'infinity';
export type LabelPosition = 'top' | 'right' | 'bottom' | 'left';

const VARIANT: Record<LoadingVariant, string> = {
  spinner: 'loading-spinner',
  dots: 'loading-dots',
  ring: 'loading-ring',
  ball: 'loading-ball',
  bars: 'loading-bars',
  infinity: 'loading-infinity',
};

const SIZE: Record<Size, string> = {
  xs: 'loading-xs',
  sm: 'loading-sm',
  md: 'loading-md',
  lg: 'loading-lg',
  xl: 'loading-xl',
};

/** daisyUI 로딩 표시는 글자색을 따라간다 */
const COLOR: Record<Color, string> = {
  neutral: 'text-neutral',
  primary: 'text-primary',
  secondary: 'text-secondary',
  accent: 'text-accent',
  info: 'text-info',
  success: 'text-success',
  warning: 'text-warning',
  error: 'text-error',
};

const LABEL_DIRECTION: Record<LabelPosition, string> = {
  top: 'flex-col-reverse',
  right: 'flex-row',
  bottom: 'flex-col',
  left: 'flex-row-reverse',
};

export interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 표시 형태
   * @default 'spinner'
   */
  variant?: LoadingVariant;

  /**
   * 크기
   * @default 'md'
   */
  size?: Size;

  /** 색상 */
  color?: Color;

  /** 함께 보여줄 문구 */
  label?: React.ReactNode;

  /**
   * 문구 위치
   * @default 'bottom'
   */
  labelPosition?: LabelPosition;
}

/**
 * DOI INC Loading — daisyUI `loading` 기반
 *
 * 이전 `Spinner`를 대체한다. daisyUI 이름을 따라 `Loading`으로 바뀌었고,
 * `type` 속성은 `variant`가 되었으며 `ring` / `ball` / `infinity`가 추가됐다.
 *
 * @example
 * ```tsx
 * <Loading />
 * <Loading variant="dots" color="primary" size="lg" />
 * <Loading label="불러오는 중" />
 * ```
 */
export const Loading = forwardRef<HTMLDivElement, LoadingProps>(({
  variant = 'spinner',
  size = 'md',
  color,
  label,
  labelPosition = 'bottom',
  className,
  ...props
}, ref) => {
  const indicator = (
    <span className={cx('loading', VARIANT[variant], SIZE[size], color && COLOR[color])} />
  );

  return (
    <div
      ref={ref}
      role="status"
      aria-live="polite"
      aria-label={typeof label === 'string' ? label : '불러오는 중'}
      className={cx(
        'inline-flex items-center gap-2',
        label && LABEL_DIRECTION[labelPosition],
        className,
      )}
      {...props}
    >
      {indicator}
      {label && <span className="text-sm opacity-70">{label}</span>}
    </div>
  );
});

Loading.displayName = 'Loading';

export interface LoadingOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 표시 여부
   * @default true
   */
  visible?: boolean;

  /**
   * 화면 전체를 덮는다. 끄면 `position: relative`인 부모를 덮는다.
   * @default false
   */
  fullScreen?: boolean;

  /** 함께 보여줄 문구 */
  label?: React.ReactNode;

  /** 안쪽 Loading에 전달할 속성 */
  loadingProps?: LoadingProps;
}

/**
 * DOI INC LoadingOverlay — 영역을 덮는 로딩 표시
 *
 * daisyUI에 대응 컴포넌트가 없어 DOI INC 고유로 남긴다.
 * 다만 별도 CSS 없이 Tailwind 유틸리티와 daisyUI 토큰만으로 구성한다.
 *
 * @example
 * ```tsx
 * <div className="relative">
 *   …내용…
 *   <LoadingOverlay visible={loading} label="처리 중" />
 * </div>
 * ```
 */
export const LoadingOverlay = forwardRef<HTMLDivElement, LoadingOverlayProps>(({
  visible = true,
  fullScreen = false,
  label,
  loadingProps,
  className,
  ...props
}, ref) => {
  if (!visible) return null;

  return (
    <div
      ref={ref}
      aria-busy="true"
      className={cx(
        'z-50 flex items-center justify-center bg-base-100/80 backdrop-blur-xs',
        fullScreen ? 'fixed inset-0' : 'absolute inset-0',
        className,
      )}
      {...props}
    >
      <Loading size="lg" label={label} {...loadingProps} />
    </div>
  );
});

LoadingOverlay.displayName = 'LoadingOverlay';

export default Loading;
