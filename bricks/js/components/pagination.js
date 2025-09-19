/**
 * BRICKS Design System - Pagination Component
 * 페이지 네비게이션 컴포넌트
 */

(function(global) {
    "use strict";

    global.BRICKS = global.BRICKS || {};

    /**
     * Pagination Component
     * 페이지 네비게이션 컴포넌트
     */
    global.BRICKS.Pagination = {
        init: function() {
            // 모든 페이지네이션 초기화
            document.querySelectorAll('[data-pagination]').forEach(pagination => {
                // 이미 초기화된 경우 스킵
                if (pagination.hasAttribute('data-bricks-pagination-initialized')) {
                    return;
                }

                pagination.setAttribute('data-bricks-pagination-initialized', 'true');

                const paginationInstance = global.BRICKS.Pagination;

                // 페이지 링크들에 이벤트 바인딩
                const links = pagination.querySelectorAll('.pagination__link');
                links.forEach(link => {
                    paginationInstance.attachLinkEvents(link, pagination);
                });

                if (pagination.hasAttribute('data-dynamic')) {
                    const active = pagination.querySelector('.pagination__link--active');
                    const currentPage = active ? parseInt(active.getAttribute('data-page')) || 1 : 1;
                    paginationInstance.generatePages(pagination, currentPage);
                } else {
                    paginationInstance.updateState(pagination);
                }
            });
        },

        attachLinkEvents: function(link, pagination) {
            if (!link) return;

            const handler = (e) => {
                e.preventDefault();

                if (link.classList.contains('pagination__link--disabled') || link.getAttribute('aria-disabled') === 'true') {
                    return;
                }

                const pageAttr = link.getAttribute('data-page');
                if (!pageAttr) return;

                const currentActive = pagination.querySelector('.pagination__link--active');
                let currentPage = currentActive ? parseInt(currentActive.getAttribute('data-page')) || 1 : 1;
                const bounds = global.BRICKS.Pagination.getPageBounds(pagination);

                let newPage = currentPage;

                if (pageAttr === 'prev') {
                    newPage = Math.max(bounds.min, currentPage - 1);
                } else if (pageAttr === 'next') {
                    newPage = Math.min(bounds.max, currentPage + 1);
                } else {
                    const parsed = parseInt(pageAttr, 10);
                    if (!isNaN(parsed)) {
                        newPage = parsed;
                    }
                }

                newPage = Math.min(Math.max(newPage, bounds.min), bounds.max);

                if (newPage === currentPage) {
                    return;
                }

                if (!pagination.hasAttribute('data-dynamic')) {
                    const candidate = pagination.querySelector(`[data-page="${newPage}"]`);
                    if (!candidate) {
                        return;
                    }
                }

                global.BRICKS.Pagination.changePage(pagination, newPage, currentPage);

                const event = new CustomEvent('pageChange', {
                    detail: {
                        page: newPage,
                        previousPage: currentPage,
                        pagination: pagination
                    }
                });
                pagination.dispatchEvent(event);
            };

            link.addEventListener('click', handler);
            link.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handler(e);
                }
            });
        },

        // 페이지 변경
        changePage: function(pagination, newPage, currentPage) {
            // 모든 활성 상태 제거
            pagination.querySelectorAll('.pagination__link--active').forEach(link => {
                link.classList.remove('pagination__link--active');
                link.removeAttribute('aria-current');
            });

            // 새 페이지 활성화
            const newActiveLink = pagination.querySelector(`[data-page="${newPage}"]`);
            if (newActiveLink) {
                newActiveLink.classList.add('pagination__link--active');
                newActiveLink.setAttribute('aria-current', 'page');
            }

            // 동적 페이지네이션인 경우 페이지 번호 재생성
            if (pagination.hasAttribute('data-dynamic')) {
                global.BRICKS.Pagination.generatePages(pagination, newPage);
            } else {
                global.BRICKS.Pagination.updateState(pagination);
            }
        },

        // 상태 업데이트 (이전/다음 버튼 활성/비활성)
        updateState: function(pagination) {
            const currentActive = pagination.querySelector('.pagination__link--active');
            if (!currentActive) return;

            const bounds = this.getPageBounds(pagination);
            const currentPage = parseInt(currentActive.getAttribute('data-page')) || bounds.min;

            // 이전 버튼
            const prevButton = pagination.querySelector('.pagination__link--prev');
            if (prevButton) {
                if (currentPage <= bounds.min) {
                    prevButton.classList.add('pagination__link--disabled');
                    prevButton.setAttribute('aria-disabled', 'true');
                    prevButton.setAttribute('tabindex', '-1');
                } else {
                    prevButton.classList.remove('pagination__link--disabled');
                    prevButton.removeAttribute('aria-disabled');
                    prevButton.removeAttribute('tabindex');
                }
            }

            // 다음 버튼
            const nextButton = pagination.querySelector('.pagination__link--next');
            if (nextButton) {
                if (currentPage >= bounds.max) {
                    nextButton.classList.add('pagination__link--disabled');
                    nextButton.setAttribute('aria-disabled', 'true');
                    nextButton.setAttribute('tabindex', '-1');
                } else {
                    nextButton.classList.remove('pagination__link--disabled');
                    nextButton.removeAttribute('aria-disabled');
                    nextButton.removeAttribute('tabindex');
                }
            }
        },

        // 동적 페이지 번호 생성 (ellipsis 포함)
        generatePages: function(pagination, currentPage) {
            const totalPages = parseInt(pagination.getAttribute('data-total-pages')) || 0;
            if (totalPages <= 0) return;

            const list = pagination.querySelector('.pagination__list');
            if (!list) return;

            // 기존 페이지 번호 제거 (이전/다음 버튼 제외)
            const items = Array.from(list.querySelectorAll('.pagination__item'));
            items.forEach(item => {
                const link = item.querySelector('.pagination__link');
                const isPrev = link && link.classList.contains('pagination__link--prev');
                const isNext = link && link.classList.contains('pagination__link--next');

                if (!isPrev && !isNext) {
                    item.remove();
                }
            });

            // 페이지 번호 생성 로직
            const pages = [];
            const maxVisible = 7; // 최대 표시 페이지 수

            if (totalPages <= maxVisible) {
                // 모든 페이지 표시
                for (let i = 1; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                // ellipsis 포함 표시
                if (currentPage <= 4) {
                    // 시작 부분
                    for (let i = 1; i <= 5; i++) {
                        pages.push(i);
                    }
                    pages.push('...');
                    pages.push(totalPages);
                } else if (currentPage >= totalPages - 3) {
                    // 끝 부분
                    pages.push(1);
                    pages.push('...');
                    for (let i = totalPages - 4; i <= totalPages; i++) {
                        pages.push(i);
                    }
                } else {
                    // 중간 부분
                    pages.push(1);
                    pages.push('...');
                    pages.push(currentPage - 1);
                    pages.push(currentPage);
                    pages.push(currentPage + 1);
                    pages.push('...');
                    pages.push(totalPages);
                }
            }

            // DOM에 추가
            const nextButton = list.querySelector('.pagination__item:last-child');
            pages.forEach(page => {
                const item = document.createElement('li');
                item.className = 'pagination__item';

                if (page === '...') {
                    item.innerHTML = '<span class="pagination__ellipsis">...</span>';
                } else {
                    const link = document.createElement('a');
                    link.href = '#';
                    link.className = 'pagination__link';
                    if (page === currentPage) {
                        link.classList.add('pagination__link--active');
                        link.setAttribute('aria-current', 'page');
                    }
                    link.setAttribute('data-page', page);
                    link.textContent = page;
                    item.appendChild(link);

                    global.BRICKS.Pagination.attachLinkEvents(link, pagination);
                }

                if (nextButton) {
                    list.insertBefore(item, nextButton);
                } else {
                    list.appendChild(item);
                }
            });

            global.BRICKS.Pagination.updateState(pagination);
        },

        // 프로그래밍적으로 페이지 설정
        setPage: function(pagination, page) {
            const paginationEl = typeof pagination === 'string'
                ? document.querySelector(pagination)
                : pagination;

            if (!paginationEl) return;

            const currentActive = paginationEl.querySelector('.pagination__link--active');
            const currentPage = currentActive
                ? (parseInt(currentActive.getAttribute('data-page')) || 1)
                : 1;

            const bounds = this.getPageBounds(paginationEl);
            const targetPage = Math.min(Math.max(page, bounds.min), bounds.max);

            if (targetPage !== currentPage) {
                global.BRICKS.Pagination.changePage(paginationEl, targetPage, currentPage);
            }
        },

        getPageBounds: function(pagination) {
            const totalPagesAttr = parseInt(pagination.getAttribute('data-total-pages'), 10);
            if (!isNaN(totalPagesAttr) && totalPagesAttr > 0) {
                return { min: 1, max: totalPagesAttr };
            }

            const numericPages = Array.from(pagination.querySelectorAll('.pagination__link'))
                .map(link => link.getAttribute('data-page'))
                .filter(value => value && value !== 'prev' && value !== 'next')
                .map(value => parseInt(value, 10))
                .filter(value => !isNaN(value));

            if (numericPages.length === 0) {
                return { min: 1, max: 1 };
            }

            const min = Math.min(...numericPages);
            const max = Math.max(...numericPages);
            return { min, max };
        }
    };

})(window);
