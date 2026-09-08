import { Icon } from './Icon';
import React, { forwardRef } from 'react';
import { cx } from './utils';

export type TimelineDirection = 'vertical' | 'horizontal';

const DIRECTION: Record<TimelineDirection, string> = {
  vertical: 'timeline-vertical',
  horizontal: 'timeline-horizontal',
};

export interface TimelineItem {
  /** 고유 식별자 */
  id: string;

  /** 시작 쪽 내용 (보통 시각·날짜) */
  start?: React.ReactNode;

  /** 끝 쪽 내용 (보통 사건 설명) */
  end?: React.ReactNode;

  /** 가운데 표식. 생략하면 기본 체크 아이콘이 들어간다 */
  icon?: React.ReactNode;

  /**
   * 이 항목까지 완료된 것으로 표시한다 (선이 강조된다)
   * @default false
   */
  done?: boolean;

  /**
   * 내용을 상자로 감싼다
   * @default true
   */
  box?: boolean;
}

export interface TimelineProps extends React.HTMLAttributes<HTMLUListElement> {
  /** 타임라인 항목 */
  items: TimelineItem[];

  /**
   * 진행 방향
   * @default 'vertical'
   */
  direction?: TimelineDirection;

  /**
   * 좁은 폭에 맞춰 한쪽으로 몰아 붙인다
   * @default false
   */
  compact?: boolean;

  /**
   * 표식을 선 시작점에 붙인다
   * @default false
   */
  snapIcon?: boolean;
}

const DEFAULT_ICON = <Icon name="circle-check" size="1em" className="text-lg" />;

/**
 * DOI INC Timeline — daisyUI `timeline` 기반
 *
 * @example
 * ```tsx
 * <Timeline
 *   items={[
 *     { id: '1', start: '1984', end: '매킨토시 출시', done: true },
 *     { id: '2', start: '1998', end: 'iMac 출시', done: true },
 *     { id: '3', start: '2007', end: 'iPhone 출시' },
 *   ]}
 * />
 * ```
 */
export const Timeline = forwardRef<HTMLUListElement, TimelineProps>(
  ({ items, direction = 'vertical', compact = false, snapIcon = false, className, ...props }, ref) => (
    <ul
      ref={ref}
      tabIndex={direction === 'horizontal' ? 0 : undefined}
      className={cx(
        'timeline',
        DIRECTION[direction],
        direction === 'horizontal' && 'max-w-full overflow-x-auto',
        compact && 'timeline-compact',
        snapIcon && 'timeline-snap-icon',
        className,
      )}
      {...props}
    >
      {items.map((item, index) => {
        const box = item.box ?? true;
        const nextDone = items[index + 1]?.done;

        return (
          <li key={item.id}>
            {index > 0 && <hr className={cx(item.done && 'bg-primary')} />}

            {item.start && <div className={cx('timeline-start', box && 'timeline-box')}>{item.start}</div>}

            <div className="timeline-middle">{item.icon ?? DEFAULT_ICON}</div>

            {item.end && <div className={cx('timeline-end', box && 'timeline-box')}>{item.end}</div>}

            {index < items.length - 1 && <hr className={cx(nextDone && 'bg-primary')} />}
          </li>
        );
      })}
    </ul>
  ),
);

Timeline.displayName = 'Timeline';

export default Timeline;
