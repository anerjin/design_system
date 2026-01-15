import React from 'react';
export interface TabItem {
    /**
     * 탭 식별자
     */
    key: string;
    /**
     * 탭 레이블
     */
    label: React.ReactNode;
    /**
     * 탭 내용
     */
    content: React.ReactNode;
    /**
     * 비활성화 여부
     */
    disabled?: boolean;
    /**
     * 아이콘
     */
    icon?: React.ReactNode;
    /**
     * 뱃지
     */
    badge?: React.ReactNode;
}
export interface TabsProps {
    /**
     * 탭 목록
     */
    items: TabItem[];
    /**
     * 활성 탭 키
     */
    activeKey?: string;
    /**
     * 기본 활성 탭 키
     */
    defaultActiveKey?: string;
    /**
     * 탭 스타일
     * @default 'default'
     */
    variant?: 'default' | 'pills' | 'vertical';
    /**
     * 탭 크기
     * @default 'md'
     */
    size?: 'sm' | 'md' | 'lg';
    /**
     * 균등 분할
     * @default false
     */
    justified?: boolean;
    /**
     * 탭 변경 이벤트
     */
    onChange?: (activeKey: string) => void;
    /**
     * 추가 CSS 클래스
     */
    className?: string;
    /**
     * 탭 네비게이션 추가 CSS 클래스
     */
    navClassName?: string;
    /**
     * 탭 내용 추가 CSS 클래스
     */
    contentClassName?: string;
}
export interface TabNavProps {
    /**
     * 탭 목록
     */
    items: TabItem[];
    /**
     * 활성 탭 키
     */
    activeKey: string;
    /**
     * 탭 스타일
     */
    variant?: 'default' | 'pills' | 'vertical';
    /**
     * 탭 크기
     */
    size?: 'sm' | 'md' | 'lg';
    /**
     * 균등 분할
     */
    justified?: boolean;
    /**
     * 탭 클릭 이벤트
     */
    onTabClick?: (key: string) => void;
    /**
     * 추가 CSS 클래스
     */
    className?: string;
    /**
     * 인디케이터 스타일
     */
    indicatorStyle?: React.CSSProperties;
}
export interface TabPanelProps {
    /**
     * 패널 키
     */
    tabKey: string;
    /**
     * 활성 탭 키
     */
    activeKey: string;
    /**
     * 패널 내용
     */
    children: React.ReactNode;
    /**
     * 추가 CSS 클래스
     */
    className?: string;
}
/**
 * BRICKS 디자인 시스템 Tabs 컴포넌트
 *
 * @example
 * ```tsx
 * <Tabs
 *   items={[
 *     {
 *       key: 'tab1',
 *       label: '첫 번째 탭',
 *       content: <div>첫 번째 탭 내용</div>,
 *       icon: <HomeIcon />
 *     },
 *     {
 *       key: 'tab2',
 *       label: '두 번째 탭',
 *       content: <div>두 번째 탭 내용</div>,
 *       badge: <Badge>3</Badge>
 *     }
 *   ]}
 *   activeKey={activeTab}
 *   onChange={setActiveTab}
 *   variant="pills"
 * />
 * ```
 */
export declare const Tabs: React.ForwardRefExoticComponent<TabsProps & React.RefAttributes<HTMLDivElement>>;
/**
 * TabNav 컴포넌트 - 탭 네비게이션
 */
export declare const TabNav: React.ForwardRefExoticComponent<TabNavProps & React.RefAttributes<HTMLDivElement>>;
/**
 * TabPanel 컴포넌트 - 탭 내용 패널
 */
export declare const TabPanel: React.ForwardRefExoticComponent<TabPanelProps & React.RefAttributes<HTMLDivElement>>;
export declare const TabsComponent: React.ForwardRefExoticComponent<TabsProps & React.RefAttributes<HTMLDivElement>> & {
    Nav: React.ForwardRefExoticComponent<TabNavProps & React.RefAttributes<HTMLDivElement>>;
    Panel: React.ForwardRefExoticComponent<TabPanelProps & React.RefAttributes<HTMLDivElement>>;
};
export default Tabs;
//# sourceMappingURL=Tabs.d.ts.map