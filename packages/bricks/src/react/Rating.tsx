import React, { forwardRef, useId } from 'react';
import { cx, type Size } from './utils';

export type RatingShape = 'star' | 'star-2' | 'heart' | 'squircle' | 'circle' | 'diamond';

const SHAPE: Record<RatingShape, string> = {
  star: 'mask-star',
  'star-2': 'mask-star-2',
  heart: 'mask-heart',
  squircle: 'mask-squircle',
  circle: 'mask-circle',
  diamond: 'mask-diamond',
};

const SIZE: Record<Size, string> = {
  xs: 'rating-xs',
  sm: 'rating-sm',
  md: 'rating-md',
  lg: 'rating-lg',
  xl: 'rating-xl',
};

export interface RatingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** 선택된 점수 (제어) */
  value?: number;

  /** 처음 선택될 점수 (비제어) */
  defaultValue?: number;

  /**
   * 항목 개수
   * @default 5
   */
  max?: number;

  /**
   * 모양
   * @default 'star'
   */
  shape?: RatingShape;

  /**
   * 크기
   * @default 'md'
   */
  size?: Size;

  /** 채워진 항목의 색 (Tailwind 클래스). 예: `bg-warning`, `bg-primary` */
  color?: string;

  /**
   * 반 칸 단위로 선택할 수 있게 한다
   * @default false
   */
  half?: boolean;

  /**
   * 점수만 보여주고 바꿀 수 없게 한다
   * @default false
   */
  readOnly?: boolean;

  /** 라디오 그룹 이름. 한 화면에 여러 개 둘 때 겹치지 않게 한다 */
  name?: string;

  /** 점수가 바뀔 때 호출된다 */
  onChange?: (value: number) => void;
}

/**
 * DOI INC Rating — daisyUI `rating` 기반
 *
 * 라디오 버튼 묶음이라 키보드로도 조작할 수 있다.
 *
 * @example
 * ```tsx
 * <Rating defaultValue={4} color="bg-warning" />
 * <Rating value={3} onChange={setScore} shape="heart" color="bg-error" />
 * <Rating value={4.5} half readOnly color="bg-warning" />
 * ```
 */
export const Rating = forwardRef<HTMLDivElement, RatingProps>(({
  value,
  defaultValue,
  max = 5,
  shape = 'star',
  size = 'md',
  color = 'bg-warning',
  half = false,
  readOnly = false,
  name,
  onChange,
  className,
  ...props
}, ref) => {
  const autoName = useId();
  const groupName = name ?? autoName;
  const isControlled = value !== undefined;

  // 반 칸 모드에서는 항목마다 왼쪽/오른쪽 두 개의 라디오가 들어간다
  const steps = half ? max * 2 : max;
  const unit = half ? 0.5 : 1;

  return (
    <div
      ref={ref}
      className={cx('rating', half && 'rating-half', SIZE[size], className)}
      role={readOnly ? 'img' : undefined}
      aria-label={readOnly ? `${value ?? defaultValue ?? 0}점 / ${max}점` : undefined}
      {...props}
    >
      {/* 점수를 지울 수 있는 숨은 항목 */}
      <input
        type="radio"
        name={groupName}
        className="rating-hidden"
        aria-label="점수 없음"
        checked={isControlled ? value === 0 : undefined}
        defaultChecked={isControlled ? undefined : (defaultValue ?? 0) === 0}
        disabled={readOnly}
        onChange={() => onChange?.(0)}
      />

      {Array.from({ length: steps }, (_, index) => {
        const itemValue = (index + 1) * unit;

        return (
          <input
            key={itemValue}
            type="radio"
            name={groupName}
            className={cx(
              'mask',
              SHAPE[shape],
              half && (index % 2 === 0 ? 'mask-half-1' : 'mask-half-2'),
              color,
            )}
            aria-label={`${itemValue}점`}
            checked={isControlled ? value === itemValue : undefined}
            defaultChecked={isControlled ? undefined : defaultValue === itemValue}
            disabled={readOnly}
            onChange={() => onChange?.(itemValue)}
          />
        );
      })}
    </div>
  );
});

Rating.displayName = 'Rating';

export default Rating;
