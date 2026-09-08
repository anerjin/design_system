import React, { forwardRef } from 'react';
import { cx } from './utils';

export type StatsDirection = 'horizontal' | 'vertical';

const DIRECTION: Record<StatsDirection, string> = {
  horizontal: 'stats-horizontal',
  vertical: 'stats-vertical',
};

export interface StatItem {
  /** 고유 식별자 */
  id: string;

  /** 지표 이름 */
  title: React.ReactNode;

  /** 지표 값 */
  value: React.ReactNode;

  /** 값 아래 보조 설명 */
  description?: React.ReactNode;

  /** 왼쪽/오른쪽에 놓을 아이콘 */
  figure?: React.ReactNode;

  /** 아래쪽 액션 영역 */
  actions?: React.ReactNode;
}

export interface StatProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 지표 목록 */
  items: StatItem[];

  /**
   * 배치 방향
   * @default 'horizontal'
   */
  direction?: StatsDirection;

  /**
   * 그림자
   * @default true
   */
  shadow?: boolean;
}

/**
 * DOI INC Stat — daisyUI `stats` / `stat` 기반
 *
 * @example
 * ```tsx
 * <Stat
 *   items={[
 *     { id: 'v', title: '방문자', value: '31K', description: '지난달 대비 +12%' },
 *     { id: 'o', title: '주문', value: '4,200', description: '오늘 +38' },
 *   ]}
 * />
 * ```
 */
export const Stat = forwardRef<HTMLDivElement, StatProps>(({
  items,
  direction = 'horizontal',
  shadow = true,
  className,
  ...props
}, ref) => (
  <div
    ref={ref}
    className={cx('stats', DIRECTION[direction], shadow && 'shadow', className)}
    {...props}
  >
    {items.map((item) => (
      <div key={item.id} className="stat">
        {item.figure && <div className="stat-figure">{item.figure}</div>}
        <div className="stat-title">{item.title}</div>
        <div className="stat-value">{item.value}</div>
        {item.description && <div className="stat-desc">{item.description}</div>}
        {item.actions && <div className="stat-actions">{item.actions}</div>}
      </div>
    ))}
  </div>
));

Stat.displayName = 'Stat';

export default Stat;
