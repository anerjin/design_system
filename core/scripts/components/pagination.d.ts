/**
 * BRICKS Design System - Pagination Component
 * 페이지 네비게이션 컴포넌트
 */
interface PaginationChangeDetail {
    currentPage: number;
    totalPages: number;
    pagination: HTMLElement;
}
interface PaginationComponent {
    init(): void;
    attachLinkEvents(link: HTMLElement, pagination: HTMLElement): void;
    updateState(pagination: HTMLElement): void;
    generatePages(pagination: HTMLElement, currentPage: number): void;
    setCurrentPage(pagination: HTMLElement, page: number): void;
    goToPage(pagination: HTMLElement, page: number): void;
    nextPage(pagination: HTMLElement): void;
    prevPage(pagination: HTMLElement): void;
    getCurrentPage(pagination: HTMLElement): number;
    getTotalPages(pagination: HTMLElement): number;
}
export { PaginationComponent, PaginationChangeDetail };
//# sourceMappingURL=pagination.d.ts.map