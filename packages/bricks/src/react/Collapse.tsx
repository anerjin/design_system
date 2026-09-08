import React, { forwardRef, useState } from 'react';
import { cx } from './utils';

export type CollapseIcon = 'arrow' | 'plus' | 'none';
export type CollapseVariant = 'bordered' | 'ghost' | 'filled';

const ICON: Record<CollapseIcon, string> = {
  arrow: 'collapse-arrow',
  plus: 'collapse-plus',
  none: '',
};

const VARIANT: Record<CollapseVariant, string> = {
  bordered: 'bg-base-100 border border-base-300',
  ghost: '',
  filled: 'bg-base-200',
};

// `title`은 HTML의 툴팁 속성과 이름이 겹치므로 걷어내고 새로 정의한다
export interface CollapseProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** 제목 줄 */
  title: React.ReactNode;

  /**
   * 펼침 표시 아이콘
   * @default 'arrow'
   */
  icon?: CollapseIcon;

  /**
   * 외형
   * @default 'bordered'
   */
  variant?: CollapseVariant;

  /** 열림 여부 (제어) */
  open?: boolean;

  /** 처음 열려 있을지 (비제어) */
  defaultOpen?: boolean;

  /** 열림 상태가 바뀔 때 호출된다 */
  onOpenChange?: (open: boolean) => void;

  children: React.ReactNode;
}

/**
 * DOI INC Collapse — daisyUI `collapse` 기반
 *
 * 하나만 접었다 펴는 단순한 경우에 쓴다.
 * 여러 항목을 묶어 관리하려면 `Accordion`을 쓴다.
 *
 * @example
 * ```tsx
 * <Collapse title="자세히 보기">
 *   숨겨져 있던 내용입니다.
 * </Collapse>
 * ```
 */
export const Collapse = forwardRef<HTMLDivElement, CollapseProps>(({
  title,
  icon = 'arrow',
  variant = 'bordered',
  open,
  defaultOpen = false,
  onOpenChange,
  className,
  children,
  ...props
}, ref) => {
  const isControlled = open !== undefined;
  const [innerOpen, setInnerOpen] = useState(defaultOpen);
  const isOpen = isControlled ? open : innerOpen;

  const toggle = () => {
    if (!isControlled) setInnerOpen(!isOpen);
    onOpenChange?.(!isOpen);
  };

  return (
    <div
      ref={ref}
      className={cx(
        'collapse',
        ICON[icon],
        VARIANT[variant],
        isOpen ? 'collapse-open' : 'collapse-close',
        className,
      )}
      {...props}
    >
      <div
        className="collapse-title font-semibold"
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        onClick={toggle}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggle();
          }
        }}
      >
        {title}
      </div>
      <div className="collapse-content text-sm">{children}</div>
    </div>
  );
});

Collapse.displayName = 'Collapse';

export default Collapse;
