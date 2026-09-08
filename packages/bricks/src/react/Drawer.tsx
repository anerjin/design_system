import React, { forwardRef, useId } from 'react';
import { cx } from './utils';

export type DrawerSide = 'start' | 'end';

export interface DrawerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 열림 여부 (제어). 주지 않으면 비제어로 동작한다 */
  open?: boolean;

  /** 열림 상태가 바뀔 때 호출된다 */
  onOpenChange?: (open: boolean) => void;

  /**
   * 서랍이 나오는 쪽
   * @default 'start'
   */
  side?: DrawerSide;

  /**
   * 넓은 화면에서 항상 펼쳐 둔다 (`lg` 이상).
   * 사이드바 레이아웃을 만들 때 쓴다.
   * @default false
   */
  alwaysOpenOnDesktop?: boolean;

  /** 서랍 안에 들어갈 내용 (보통 `Menu`) */
  sidebar: React.ReactNode;

  /** 서랍에 적용할 추가 클래스 (폭 지정 등) */
  sidebarClassName?: string;

  /** 본문 내용 */
  children: React.ReactNode;
}

/**
 * DOI INC Drawer — daisyUI `drawer` 기반
 *
 * daisyUI 서랍은 숨은 체크박스로 열고 닫는다. React에서는 그 체크박스를
 * 제어 컴포넌트로 다뤄 `open` / `onOpenChange`로 노출한다.
 *
 * 서랍을 여는 버튼은 본문 안에 두고 `htmlFor`로 토글을 가리키게 하거나,
 * `onOpenChange(true)`를 직접 호출하면 된다.
 *
 * @example
 * ```tsx
 * const [open, setOpen] = useState(false);
 *
 * <Drawer
 *   open={open}
 *   onOpenChange={setOpen}
 *   sidebar={<Menu items={navItems} />}
 * >
 *   <Button onClick={() => setOpen(true)}>메뉴 열기</Button>
 * </Drawer>
 * ```
 */
export const Drawer = forwardRef<HTMLDivElement, DrawerProps>(({
  open,
  onOpenChange,
  side = 'start',
  alwaysOpenOnDesktop = false,
  sidebar,
  sidebarClassName,
  className,
  children,
  ...props
}, ref) => {
  const toggleId = useId();
  const isControlled = open !== undefined;

  return (
    <div
      ref={ref}
      className={cx(
        'drawer',
        side === 'end' && 'drawer-end',
        alwaysOpenOnDesktop && 'lg:drawer-open',
        className,
      )}
      {...props}
    >
      <input
        id={toggleId}
        type="checkbox"
        className="drawer-toggle"
        checked={isControlled ? open : undefined}
        onChange={(event) => onOpenChange?.(event.target.checked)}
      />

      <div className="drawer-content">{children}</div>

      <div className="drawer-side">
        {/* 배경을 누르면 닫힌다 */}
        <label htmlFor={toggleId} aria-label="닫기" className="drawer-overlay" />
        <div className={cx('min-h-full w-72 bg-base-200', sidebarClassName)}>
          {sidebar}
        </div>
      </div>
    </div>
  );
});

Drawer.displayName = 'Drawer';

export default Drawer;
