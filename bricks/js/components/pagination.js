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

                // 페이지 링크들에 이벤트 바인딩
                const links = pagination.querySelectorAll('.pagination__link:not(.pagination__link--disabled)');

                links.forEach(link => {
                    link.addEventListener('click', (e) => {
                        e.preventDefault();

                        const page = link.getAttribute('data-page');
                        if (!page) return;

                        // 현재 활성 페이지 찾기
                        const currentActive = pagination.querySelector('.pagination__link--active');
                        let currentPage = 1;

                        if (currentActive) {
                            const currentPageAttr = currentActive.getAttribute('data-page');
                            currentPage = currentPageAttr ? parseInt(currentPageAttr) : 1;
                        }

                        // 총 페이지 수 가져오기
                        const totalPages = parseInt(pagination.getAttribute('data-total-pages')) || 0;

                        // 새 페이지 번호 계산
                        let newPage = currentPage;

                        if (page === 'prev') {
                            newPage = Math.max(1, currentPage - 1);
                        } else if (page === 'next') {
                            newPage = totalPages ? Math.min(totalPages, currentPage + 1) : currentPage + 1;
                        } else {
                            newPage = parseInt(page);
                        }

                        // 같은 페이지면 무시
                        if (newPage === currentPage) {
                            return;
                        }

                        // 페이지 변경
                        global.BRICKS.Pagination.changePage(pagination, newPage, currentPage);

                        // 커스텀 이벤트 발생
                        const event = new CustomEvent('pageChange', {
                            detail: {
                                page: newPage,
                                previousPage: currentPage,
                                pagination: pagination
                            }
                        });
                        pagination.dispatchEvent(event);
                    });

                    // 키보드 접근성
                    link.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            link.click();
                        }
                    });
                });

                // 초기 상태 설정
                global.BRICKS.Pagination.updateState(pagination);
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

            // 이전/다음 버튼 상태 업데이트
            global.BRICKS.Pagination.updateState(pagination);

            // 동적 페이지네이션인 경우 페이지 번호 재생성
            if (pagination.hasAttribute('data-dynamic')) {
                global.BRICKS.Pagination.generatePages(pagination, newPage);
            }
        },

        // 상태 업데이트 (이전/다음 버튼 활성/비활성)
        updateState: function(pagination) {
            const currentActive = pagination.querySelector('.pagination__link--active');
            if (!currentActive) return;

            const currentPage = parseInt(currentActive.getAttribute('data-page')) || 1;
            const totalPages = parseInt(pagination.getAttribute('data-total-pages')) || 0;

            // 이전 버튼
            const prevButton = pagination.querySelector('.pagination__link--prev');
            if (prevButton) {
                if (currentPage <= 1) {
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
            if (nextButton && totalPages > 0) {
                if (currentPage >= totalPages) {
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
            const items = list.querySelectorAll('.pagination__item');
            items.forEach(item => {
                const link = item.querySelector('.pagination__link');
                if (link && !link.classList.contains('pagination__link--prev') &&
                    !link.classList.contains('pagination__link--next')) {
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

                    // 이벤트 리스너 추가
                    link.addEventListener('click', (e) => {
                        e.preventDefault();
                        const newPage = parseInt(link.getAttribute('data-page'));
                        global.BRICKS.Pagination.changePage(pagination, newPage, currentPage);

                        const event = new CustomEvent('pageChange', {
                            detail: {
                                page: newPage,
                                previousPage: currentPage,
                                pagination: pagination
                            }
                        });
                        pagination.dispatchEvent(event);
                    });
                }

                if (nextButton) {
                    list.insertBefore(item, nextButton);
                } else {
                    list.appendChild(item);
                }
            });
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

            if (page !== currentPage) {
                global.BRICKS.Pagination.changePage(paginationEl, page, currentPage);
            }
        }
    };

})(window);