import React, { forwardRef } from 'react';
import { cx, type Color } from './utils';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

const PLACEMENT: Record<TooltipPlacement, string> = {
  top: 'tooltip-top',
  bottom: 'tooltip-bottom',
  left: 'tooltip-left',
  right: 'tooltip-right',
};

const COLOR: Record<Color, string> = {
  neutral: 'tooltip-neutral',
  primary: 'tooltip-primary',
  secondary: 'tooltip-secondary',
  accent: 'tooltip-accent',
  info: 'tooltip-info',
  success: 'tooltip-success',
  warning: 'tooltip-warning',
  error: 'tooltip-error',
};

// `content`는 HTML의 메타데이터 속성과 이름이 겹치므로 걷어내고 새로 정의한다
export interface TooltipProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'> {
  /**
   * 툴팁 내용.
   * 문자열이면 `data-tip`으로, 그 외 노드면 `tooltip-content` 영역으로 렌더된다.
   */
  content?: React.ReactNode;

  /**
   * 표시 방향
   * @default 'top'
   */
  placement?: TooltipPlacement;

  /** 툴팁 색상 */
  color?: Color;

  /**
   * 항상 열어 둔다
   * @default false
   */
  open?: boolean;

  /**
   * 툴팁을 끈다. 자식만 그대로 렌더된다.
   * @default false
   */
  disabled?: boolean;

  children: React.ReactNode;
}

/**
 * DOI INC Tooltip — daisyUI `tooltip` 기반
 *
 * 이전 구현은 `getBoundingClientRect()`로 위치를 계산하고 scroll/resize를 구독했다.
 * daisyUI 툴팁은 순수 CSS라 그 코드가 전부 사라졌다.
 *
 * 그 대신 CSS로 표현할 수 없는 `delay` / `interactive` / `onShow` / `onHide`는 없어졌다.
 * 마우스를 올려 안쪽을 클릭해야 하는 UI라면 `Dropdown`을 쓴다.
 *
 * @example
 * ```tsx
 * <Tooltip content="저장합니다">
 *   <Button>저장</Button>
 * </Tooltip>
 * ```
 */
export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(({
  content,
  placement = 'top',
  color,
  open = false,
  disabled = false,
  className,
  children,
  ...props
}, ref) => {
  if (disabled || content === undefined || content === null) {
    return <>{children}</>;
  }

  const isPlainText = typeof content === 'string' || typeof content === 'number';

  return (
    <div
      ref={ref}
      className={cx(
        'tooltip',
        PLACEMENT[placement],
        color && COLOR[color],
        open && 'tooltip-open',
        className,
      )}
      data-tip={isPlainText ? String(content) : undefined}
      {...props}
    >
      {!isPlainText && <div className="tooltip-content">{content}</div>}
      {children}
    </div>
  );
});

Tooltip.displayName = 'Tooltip';

export interface TooltipShortcutProps {
  /** 설명 문구 */
  label: string;

  /** 단축키 조합 */
  keys: string[];
}

/**
 * 툴팁 안에 단축키를 보여줄 때 쓰는 보조 컴포넌트
 *
 * @example
 * ```tsx
 * <Tooltip content={<TooltipShortcut label="저장" keys={['⌘', 'S']} />}>
 *   <Button>저장</Button>
 * </Tooltip>
 * ```
 */
export const TooltipShortcut: React.FC<TooltipShortcutProps> = ({ label, keys }) => (
  <span className="flex items-center gap-1.5 whitespace-nowrap">
    {label}
    {keys.map((key, index) => <kbd key={index} className="kbd kbd-xs">{key}</kbd>)}
  </span>
);

TooltipShortcut.displayName = 'TooltipShortcut';

export default Tooltip;
