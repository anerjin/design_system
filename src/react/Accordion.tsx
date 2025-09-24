import React, { useState, useRef, useEffect, forwardRef } from 'react';

export interface AccordionItem {
  id: string;
  title: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  /**
   * 아코디언 아이템 목록
   */
  items: AccordionItem[];

  /**
   * 기본으로 열려있을 아이템 ID 목록
   */
  defaultActiveIds?: string[];

  /**
   * 제어 컴포넌트용 열려있는 아이템 ID 목록
   */
  activeIds?: string[];

  /**
   * 단일 아이템만 열기 허용 (다른 아이템 열면 기존 아이템 닫힘)
   * @default false
   */
  exclusive?: boolean;

  /**
   * 아코디언 스타일
   * @default 'default'
   */
  variant?: 'default' | 'flush';

  /**
   * 아코디언 색상 테마
   */
  color?: 'primary' | 'success' | 'warning' | 'danger';

  /**
   * 아코디언 크기
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * 아이콘 위치
   * @default 'right'
   */
  iconPosition?: 'left' | 'right';

  /**
   * 아이템 상태 변경 이벤트
   */
  onChange?: (activeIds: string[]) => void;

  /**
   * 추가 CSS 클래스
   */
  className?: string;

  /**
   * 커스텀 아이콘 (열린 상태)
   */
  openIcon?: React.ReactNode;

  /**
   * 커스텀 아이콘 (닫힌 상태)
   */
  closeIcon?: React.ReactNode;
}

/**
 * BRICKS 디자인 시스템 Accordion 컴포넌트
 *
 * @example
 * ```tsx
 * <Accordion
 *   items={[
 *     {
 *       id: 'item1',
 *       title: 'Section 1',
 *       content: 'Content for section 1'
 *     },
 *     {
 *       id: 'item2',
 *       title: 'Section 2',
 *       content: 'Content for section 2'
 *     }
 *   ]}
 *   defaultActiveIds={['item1']}
 *   exclusive
 * />
 * ```
 */
export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(({
  items,
  defaultActiveIds = [],
  activeIds,
  exclusive = false,
  variant = 'default',
  color,
  size = 'md',
  iconPosition = 'right',
  onChange,
  className,
  openIcon,
  closeIcon,
  ...props
}, ref) => {
  const [openItems, setOpenItems] = useState<string[]>(activeIds || defaultActiveIds);
  const isControlled = activeIds !== undefined;
  const contentRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    if (isControlled && activeIds) {
      setOpenItems(activeIds);
    }
  }, [activeIds, isControlled]);

  const handleToggle = (itemId: string) => {
    let newOpenItems: string[];

    if (exclusive) {
      newOpenItems = openItems.includes(itemId) ? [] : [itemId];
    } else {
      newOpenItems = openItems.includes(itemId)
        ? openItems.filter(id => id !== itemId)
        : [...openItems, itemId];
    }

    if (!isControlled) {
      setOpenItems(newOpenItems);
    }

    onChange?.(newOpenItems);
  };

  const accordionClasses = [
    'accordion',
    variant === 'flush' ? 'accordion--flush' : '',
    color ? `accordion--${color}` : '',
    size !== 'md' ? `accordion--${size}` : '',
    iconPosition === 'left' ? 'accordion--icon-left' : '',
    className
  ].filter(Boolean).join(' ');

  const defaultChevron = (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );

  return (
    <div ref={ref} className={accordionClasses} {...props}>
      {items.map((item) => {
        const isOpen = openItems.includes(item.id);

        return (
          <div key={item.id} className="accordion__item">
            <button
              type="button"
              className={`accordion__header ${isOpen ? 'accordion__header--active' : ''}`}
              onClick={() => !item.disabled && handleToggle(item.id)}
              disabled={item.disabled}
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${item.id}`}
            >
              <span>{item.title}</span>
              <span className="accordion__icon">
                {isOpen
                  ? (openIcon || defaultChevron)
                  : (closeIcon || defaultChevron)
                }
              </span>
            </button>
            <div
              id={`accordion-content-${item.id}`}
              className={`accordion__content ${isOpen ? 'accordion__content--open' : ''}`}
              ref={el => { if (el) contentRefs.current[item.id] = el; }}
              aria-hidden={!isOpen}
            >
              <div className="accordion__body">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
});

Accordion.displayName = 'Accordion';

export default Accordion;