import React, { forwardRef } from 'react';
import { cx, type Size } from './utils';

const SIZE: Record<Size, string> = {
  xs: 'kbd-xs',
  sm: 'kbd-sm',
  md: 'kbd-md',
  lg: 'kbd-lg',
  xl: 'kbd-xl',
};

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * 크기
   * @default 'md'
   */
  size?: Size;

  children: React.ReactNode;
}

/**
 * DOI INC Kbd — daisyUI `kbd` 기반
 *
 * 키보드 키 하나를 표현한다. 조합은 `KbdGroup`을 쓴다.
 *
 * @example
 * ```tsx
 * <Kbd>⌘</Kbd>
 * ```
 */
export const Kbd = forwardRef<HTMLElement, KbdProps>(({
  size = 'md',
  className,
  children,
  ...props
}, ref) => (
  <kbd ref={ref} className={cx('kbd', SIZE[size], className)} {...props}>
    {children}
  </kbd>
));

Kbd.displayName = 'Kbd';

export interface KbdGroupProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** 키 목록 */
  keys: React.ReactNode[];

  /**
   * 키 크기
   * @default 'md'
   */
  size?: Size;

  /**
   * 키 사이에 넣을 구분자
   * @default '+'
   */
  separator?: React.ReactNode;
}

/**
 * DOI INC KbdGroup — 단축키 조합
 *
 * @example
 * ```tsx
 * <KbdGroup keys={['⌘', 'K']} />
 * <KbdGroup keys={['Ctrl', 'Shift', 'P']} size="sm" />
 * ```
 */
export const KbdGroup = forwardRef<HTMLSpanElement, KbdGroupProps>(({
  keys,
  size = 'md',
  separator = '+',
  className,
  ...props
}, ref) => (
  <span ref={ref} className={cx('inline-flex items-center gap-1', className)} {...props}>
    {keys.map((key, index) => (
      <React.Fragment key={index}>
        {index > 0 && <span className="text-xs opacity-50">{separator}</span>}
        <Kbd size={size}>{key}</Kbd>
      </React.Fragment>
    ))}
  </span>
));

KbdGroup.displayName = 'KbdGroup';

export default Kbd;
