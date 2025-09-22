/**
 * BRICKS Design System - Pagination Component
 * 페이지 네비게이션 컴포넌트
 */

import type { AlertOptions, ToastOptions } from '../types/index';

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



(function(global: Window) {
    "use strict";

    global.BRICKS = global.BRICKS || {} as any;

    /**
     * Pagination Component
     * 페이지 네비게이션 컴포넌트
     */
    global.BRICKS.Pagination = {
        init: function(): void {
            // 모든 페이지네이션 초기화
            document.querySelectorAll('[data-pagination]').forEach((pagination: Element) => {
                const paginationEl = pagination as HTMLElement;

                // 이미 초기화된 경우 스킵
                if (paginationEl.hasAttribute('data-bricks-pagination-initialized')) {
                    return;
                }

                paginationEl.setAttribute('data-bricks-pagination-initialized', 'true');

                const paginationInstance = global.BRICKS.Pagination;

                // 페이지 링크들에 이벤트 바인딩
                const links = paginationEl.querySelectorAll('.pagination__link') as NodeListOf<HTMLElement>;
                links.forEach((link: HTMLElement) => {
                    paginationInstance.attachLinkEvents(link, paginationEl);
                });

                if (paginationEl.hasAttribute('data-dynamic')) {
                    const active = paginationEl.querySelector('.pagination__link--active') as HTMLElement | null;
                    const currentPage: number = active ? parseInt(active.getAttribute('data-page') || '1') : 1;
                    paginationInstance.generatePages(paginationEl, currentPage);
                } else {
                    paginationInstance.updateState(paginationEl);
                }

                // ARIA 속성 설정
                paginationEl.setAttribute('role', 'navigation');
                paginationEl.setAttribute('aria-label', '페이지 네비게이션');
            });
        },

        attachLinkEvents: function(link: HTMLElement, pagination: HTMLElement): void {
            if (!link) return;

            const handler = (e: Event): void => {
                e.preventDefault();

                if (link.classList.contains('pagination__link--disabled') || link.getAttribute('aria-disabled') === 'true') {
                    return;
                }

                const pageStr = link.getAttribute('data-page');
                const action = link.getAttribute('data-action');

                if (action) {
                    // 특별 액션 처리
                    if (action === 'prev') {
                        this.prevPage(pagination);
                    } else if (action === 'next') {
                        this.nextPage(pagination);
                    }
                } else if (pageStr) {
                    // 특정 페이지로 이동
                    const page = parseInt(pageStr);
                    this.goToPage(pagination, page);
                }
            };

            // 클릭과 엔터 키 모두 처리
            link.addEventListener('click', handler);
            link.addEventListener('keydown', (e: KeyboardEvent) => {
                if (e.key === 'Enter') {
                    handler(e);
                }
            });
        },

        updateState: function(pagination: HTMLElement): void {
            const currentPage = this.getCurrentPage(pagination);
            const totalPages = this.getTotalPages(pagination);

            const links = pagination.querySelectorAll('.pagination__link') as NodeListOf<HTMLElement>;

            links.forEach((link: HTMLElement) => {
                const action = link.getAttribute('data-action');
                const pageStr = link.getAttribute('data-page');

                // 현재 페이지 표시
                if (pageStr) {
                    const page = parseInt(pageStr);
                    if (page === currentPage) {
                        link.classList.add('pagination__link--active');
                        link.setAttribute('aria-current', 'page');
                    } else {
                        link.classList.remove('pagination__link--active');
                        link.removeAttribute('aria-current');
                    }
                }

                // 이전/다음 버튼 상태
                if (action === 'prev') {
                    if (currentPage <= 1) {
                        link.classList.add('pagination__link--disabled');
                        link.setAttribute('aria-disabled', 'true');
                        link.setAttribute('tabindex', '-1');
                    } else {
                        link.classList.remove('pagination__link--disabled');
                        link.setAttribute('aria-disabled', 'false');
                        link.setAttribute('tabindex', '0');
                    }
                } else if (action === 'next') {
                    if (currentPage >= totalPages) {
                        link.classList.add('pagination__link--disabled');
                        link.setAttribute('aria-disabled', 'true');
                        link.setAttribute('tabindex', '-1');
                    } else {
                        link.classList.remove('pagination__link--disabled');
                        link.setAttribute('aria-disabled', 'false');
                        link.setAttribute('tabindex', '0');
                    }
                }
            });
        },

        generatePages: function(pagination: HTMLElement, currentPage: number): void {
            const totalPagesAttr = pagination.getAttribute('data-total-pages');
            const totalPages: number = totalPagesAttr ? parseInt(totalPagesAttr) : 10;
            const maxVisible: number = parseInt(pagination.getAttribute('data-max-visible') || '5');

            const container = pagination.querySelector('.pagination__list') as HTMLElement | null;
            if (!container) return;

            // 기존 페이지 번호 링크 제거 (prev/next 제외)
            const numberLinks = container.querySelectorAll('.pagination__link:not([data-action])');
            numberLinks.forEach((link: Element) => {
                if (link.parentElement) {
                    link.parentElement.remove();
                }
            });

            // 페이지 범위 계산
            let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
            let endPage = Math.min(totalPages, startPage + maxVisible - 1);

            if (endPage - startPage + 1 < maxVisible) {
                startPage = Math.max(1, endPage - maxVisible + 1);
            }

            // 페이지 번호 생성
            const nextButton = container.querySelector('[data-action="next"]')?.parentElement;

            for (let i = startPage; i <= endPage; i++) {
                const li = document.createElement('li');
                li.className = 'pagination__item';

                const link = document.createElement('a');
                link.href = '#';
                link.className = 'pagination__link';
                link.setAttribute('data-page', i.toString());
                link.textContent = i.toString();

                if (i === currentPage) {
                    link.classList.add('pagination__link--active');
                    link.setAttribute('aria-current', 'page');
                }

                li.appendChild(link);

                // 이벤트 바인딩
                this.attachLinkEvents(link, pagination);

                // next 버튼 앞에 삽입
                if (nextButton) {
                    container.insertBefore(li, nextButton);
                } else {
                    container.appendChild(li);
                }
            }

            this.updateState(pagination);
        },

        setCurrentPage: function(pagination: HTMLElement, page: number): void {
            pagination.setAttribute('data-current-page', page.toString());

            if (pagination.hasAttribute('data-dynamic')) {
                this.generatePages(pagination, page);
            } else {
                this.updateState(pagination);
            }
        },

        goToPage: function(pagination: HTMLElement, page: number): void {
            const currentPage = this.getCurrentPage(pagination);
            const totalPages = this.getTotalPages(pagination);

            if (page < 1 || page > totalPages || page === currentPage) {
                return;
            }

            this.setCurrentPage(pagination, page);

            // 커스텀 이벤트 발생
            const event = new CustomEvent('paginationChange', {
                detail: {
                    currentPage: page,
                    totalPages: totalPages,
                    pagination: pagination
                } as PaginationChangeDetail
            });
            pagination.dispatchEvent(event);
        },

        nextPage: function(pagination: HTMLElement): void {
            const currentPage = this.getCurrentPage(pagination);
            this.goToPage(pagination, currentPage + 1);
        },

        prevPage: function(pagination: HTMLElement): void {
            const currentPage = this.getCurrentPage(pagination);
            this.goToPage(pagination, currentPage - 1);
        },

        getCurrentPage: function(pagination: HTMLElement): number {
            const currentPageAttr = pagination.getAttribute('data-current-page');
            if (currentPageAttr) {
                return parseInt(currentPageAttr);
            }

            // active 링크에서 페이지 번호 찾기
            const activeLink = pagination.querySelector('.pagination__link--active') as HTMLElement | null;
            if (activeLink) {
                const pageStr = activeLink.getAttribute('data-page');
                return pageStr ? parseInt(pageStr) : 1;
            }

            return 1;
        },

        getTotalPages: function(pagination: HTMLElement): number {
            const totalPagesAttr = pagination.getAttribute('data-total-pages');
            if (totalPagesAttr) {
                return parseInt(totalPagesAttr);
            }

            // 링크들에서 최대 페이지 번호 찾기
            const pageLinks = pagination.querySelectorAll('.pagination__link[data-page]') as NodeListOf<HTMLElement>;
            let maxPage = 1;

            pageLinks.forEach((link: HTMLElement) => {
                const pageStr = link.getAttribute('data-page');
                if (pageStr) {
                    const page = parseInt(pageStr);
                    if (page > maxPage) {
                        maxPage = page;
                    }
                }
            });

            return maxPage;
        }
    };

})(window);

export { PaginationComponent, PaginationChangeDetail };