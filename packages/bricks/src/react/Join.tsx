import React, { forwardRef } from 'react';
import { cx } from './utils';

export type JoinDirection = 'horizontal' | 'vertical';

const DIRECTION: Record<JoinDirection, string> = {
  horizontal: 'join-horizontal',
  vertical: 'join-vertical',
};

export interface JoinProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 이어붙이는 방향
   * @default 'horizontal'
   */
  direction?: JoinDirection;

  children: React.ReactNode;
}

export interface JoinItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 렌더할 태그. 기본은 `div`이며, 버튼·입력을 감싸지 않고 직접 쓰려면
   * 자식에 `join-item` 클래스를 붙이는 편이 낫다.
   */
  as?: React.ElementType;

  children: React.ReactNode;
}

/**
 * DOI INC Join — daisyUI `join` 기반
 *
 * 여러 요소를 붙여서 하나의 덩어리로 보이게 한다.
 * **자식에는 `join-item` 클래스가 있어야 한다.** `Join.Item`을 쓰거나
 * 자식 컴포넌트의 `className`에 직접 넣는다.
 *
 * @example
 * ```tsx
 * <Join>
 *   <Button className="join-item">이전</Button>
 *   <Button className="join-item">다음</Button>
 * </Join>
 *
 * <Join direction="vertical">
 *   <Join.Item as="button" className="btn">위</Join.Item>
 *   <Join.Item as="button" className="btn">아래</Join.Item>
 * </Join>
 * ```
 */
const Join = forwardRef<HTMLDivElement, JoinProps>(({
  direction = 'horizontal',
  className,
  children,
  ...props
}, ref) => (
  <div ref={ref} className={cx('join', DIRECTION[direction], className)} {...props}>
    {children}
  </div>
));

Join.displayName = 'Join';

/** Join.Item — `join-item` 클래스를 붙여주는 얇은 래퍼 */
export const JoinItem = forwardRef<HTMLDivElement, JoinItemProps>(({
  as: Component = 'div',
  className,
  children,
  ...props
}, ref) => (
  <Component ref={ref} className={cx('join-item', className)} {...props}>
    {children}
  </Component>
));

JoinItem.displayName = 'JoinItem';

export interface JoinComponent
  extends React.ForwardRefExoticComponent<JoinProps & React.RefAttributes<HTMLDivElement>> {
  Item: typeof JoinItem;
}

const JoinWithSubcomponents = Join as JoinComponent;
JoinWithSubcomponents.Item = JoinItem;

export { JoinWithSubcomponents as Join };
export default JoinWithSubcomponents;
