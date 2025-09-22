/**
 * BRICKS Design System - Tabs Component
 * 탭 네비게이션 기능을 제공하는 컴포넌트
 */
interface TabChangeDetail {
    tab: string;
    button: HTMLElement;
    panel: HTMLElement;
    container: HTMLElement;
}
interface TabsComponent {
    init(): void;
    activateTab(container: HTMLElement, tabId: string): void;
    setActiveTab(container: HTMLElement, index: number): void;
    updateIndicator(nav: HTMLElement, activeButton: HTMLElement, isVertical: boolean, isPills: boolean): void;
    handleKeyDown(e: KeyboardEvent, buttons: NodeListOf<HTMLElement>, currentIndex: number): void;
}
export { TabsComponent, TabChangeDetail };
//# sourceMappingURL=tabs.d.ts.map