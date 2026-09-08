import React, { forwardRef } from 'react';
import { cx } from './utils';

export type MaskShape =
  | 'squircle' | 'heart' | 'hexagon' | 'hexagon-2'
  | 'decagon' | 'pentagon' | 'diamond' | 'circle'
  | 'star' | 'star-2'
  | 'triangle' | 'triangle-2' | 'triangle-3' | 'triangle-4';

export type MaskHalf = 1 | 2;

const SHAPE: Record<MaskShape, string> = {
  squircle: 'mask-squircle',
  heart: 'mask-heart',
  hexagon: 'mask-hexagon',
  'hexagon-2': 'mask-hexagon-2',
  decagon: 'mask-decagon',
  pentagon: 'mask-pentagon',
  diamond: 'mask-diamond',
  circle: 'mask-circle',
  star: 'mask-star',
  'star-2': 'mask-star-2',
  triangle: 'mask-triangle',
  'triangle-2': 'mask-triangle-2',
  'triangle-3': 'mask-triangle-3',
  'triangle-4': 'mask-triangle-4',
};

const HALF: Record<MaskHalf, string> = {
  1: 'mask-half-1',
  2: 'mask-half-2',
};

// `as`로 어떤 태그든 렌더할 수 있으므로 속성도 넓게 받는다.
// HTMLAttributes만 쓰면 `as="img"`일 때 src/alt를 넘길 수 없다.
// AllHTMLAttributes에도 `as`(=<link as>)가 있어 이름이 겹치므로 걷어낸다.
export interface MaskProps extends Omit<React.AllHTMLAttributes<HTMLElement>, 'as'> {
  /** 잘라낼 모양 */
  shape: MaskShape;

  /** 모양의 절반만 보여준다 (1 = 위/왼쪽, 2 = 아래/오른쪽) */
  half?: MaskHalf;

  /**
   * 렌더할 태그
   * @default 'div'
   */
  as?: React.ElementType;

  children?: React.ReactNode;
}

/**
 * DOI INC Mask — daisyUI `mask` 기반
 *
 * 요소를 지정한 모양으로 잘라낸다. 이미지에 가장 많이 쓴다.
 *
 * @example
 * ```tsx
 * <Mask shape="squircle" as="img" src="/user.jpg" alt="" className="w-24" />
 * <Mask shape="heart" className="w-24 h-24 bg-primary" />
 * ```
 */
export const Mask = forwardRef<HTMLElement, MaskProps>(({
  shape,
  half,
  as: Component = 'div',
  className,
  children,
  ...props
}, ref) => (
  <Component
    ref={ref}
    className={cx('mask', SHAPE[shape], half && HALF[half], className)}
    {...props}
  >
    {children}
  </Component>
));

Mask.displayName = 'Mask';

export default Mask;
