import React, { forwardRef, useEffect, useState } from 'react';
import { cx } from './utils';

export type AccordionVariant = 'bordered' | 'ghost' | 'filled';
export type AccordionIcon = 'arrow' | 'plus' | 'none';

const VARIANT: Record<AccordionVariant, string> = {
  bordered: 'bg-base-100 border border-base-300',
  ghost: '',
  filled: 'bg-base-200',
};

const ICON: Record<AccordionIcon, string> = {
  arrow: 'collapse-arrow',
  plus: 'collapse-plus',
  none: '',
};

export interface AccordionItem {
  id: string;
  title: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** 아코디언 항목 목록 */
  items: AccordionItem[];

  /** 처음에 열려 있을 항목 id 목록 (비제어) */
  defaultActiveIds?: string[];

  /** 열려 있는 항목 id 목록 (제어) */
  activeIds?: string[];

  /**
   * 한 번에 하나만 열리게 한다
   * @default false
   */
  exclusive?: boolean;

  /**
   * 항목 외형
   * @default 'bordered'
   */
  variant?: AccordionVariant;

  /**
   * 펼침 표시 아이콘
   * @default 'arrow'
   */
  icon?: AccordionIcon;

  /** 열린 항목이 바뀔 때 호출된다 */
  onChange?: (activeIds: string[]) => void;
}

/**
 * DOI INC Accordion — daisyUI `collapse` 기반
 *
 * daisyUI의 checkbox/radio 방식 대신 `collapse-open` / `collapse-close`를 직접 붙여
 * React가 열림 상태를 온전히 제어한다. 높이를 재는 JS는 필요 없다.
 *
 * @example
 * ```tsx
 * <Accordion
 *   exclusive
 *   defaultActiveIds={['a']}
 *   items={[
 *     { id: 'a', title: '계정은 어떻게 만드나요?', content: '가입 버튼을 누르세요.' },
 *     { id: 'b', title: '비밀번호를 잊었어요', content: '재설정 링크를 보내드립니다.' },
 *   ]}
 * />
 * ```
 */
export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(({
  items,
  defaultActiveIds = [],
  activeIds,
  exclusive = false,
  variant = 'bordered',
  icon = 'arrow',
  onChange,
  className,
  ...props
}, ref) => {
  const isControlled = activeIds !== undefined;
  const [openIds, setOpenIds] = useState<string[]>(activeIds ?? defaultActiveIds);

  useEffect(() => {
    if (isControlled && activeIds) setOpenIds(activeIds);
  }, [activeIds, isControlled]);

  const toggle = (id: string) => {
    const isOpen = openIds.includes(id);
    const next = exclusive
      ? (isOpen ? [] : [id])
      : (isOpen ? openIds.filter((v) => v !== id) : [...openIds, id]);

    if (!isControlled) setOpenIds(next);
    onChange?.(next);
  };

  return (
    <div ref={ref} className={cx('flex flex-col gap-2', className)} {...props}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);

        return (
          <div
            key={item.id}
            className={cx(
              'collapse',
              ICON[icon],
              VARIANT[variant],
              isOpen ? 'collapse-open' : 'collapse-close',
              item.disabled && 'opacity-50',
            )}
          >
            <div
              className="collapse-title font-semibold"
              role="button"
              tabIndex={item.disabled ? -1 : 0}
              aria-expanded={isOpen}
              aria-controls={`accordion-panel-${item.id}`}
              aria-disabled={item.disabled}
              onClick={() => !item.disabled && toggle(item.id)}
              onKeyDown={(event) => {
                if (item.disabled) return;
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  toggle(item.id);
                }
              }}
            >
              {item.title}
            </div>
            <div
              id={`accordion-panel-${item.id}`}
              className="collapse-content text-sm"
              role="region"
            >
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
});

Accordion.displayName = 'Accordion';

export default Accordion;
