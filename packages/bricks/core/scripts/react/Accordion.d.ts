import React from 'react';
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
export declare const Accordion: React.ForwardRefExoticComponent<AccordionProps & React.RefAttributes<HTMLDivElement>>;
export default Accordion;
//# sourceMappingURL=Accordion.d.ts.map