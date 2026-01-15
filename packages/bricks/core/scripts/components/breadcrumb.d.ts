/**
 * BRICKS Design System - Breadcrumb Component
 * 탐색 경로 표시 컴포넌트
 */
interface BreadcrumbClickDetail {
    link: HTMLElement;
    item: HTMLElement;
    breadcrumb: HTMLElement;
}
interface BreadcrumbComponent {
    init(): void;
    collapse(breadcrumb: HTMLElement, maxItems: number): void;
    addItem(breadcrumb: string | HTMLElement, text: string, href?: string, isActive?: boolean): void;
    removeItem(breadcrumb: string | HTMLElement, index: number): void;
    clear(breadcrumb: string | HTMLElement): void;
}
export { BreadcrumbComponent, BreadcrumbClickDetail };
//# sourceMappingURL=breadcrumb.d.ts.map