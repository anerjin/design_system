/**
 * BRICKS Design System - Breadcrumb Component
 * 탐색 경로 표시 컴포넌트
 */

(function(global) {
    "use strict";

    global.BRICKS = global.BRICKS || {};

    /**
     * Breadcrumb Component
     * 탐색 경로 표시 컴포넌트
     */
    global.BRICKS.Breadcrumb = {
        init: function() {
            // 모든 브레드크럼 초기화
            document.querySelectorAll('[data-breadcrumb]').forEach(breadcrumb => {
                // 이미 초기화된 경우 스킵
                if (breadcrumb.hasAttribute('data-bricks-breadcrumb-initialized')) {
                    return;
                }

                breadcrumb.setAttribute('data-bricks-breadcrumb-initialized', 'true');

                // max-items 속성 확인
                const maxItems = breadcrumb.getAttribute('data-max-items');
                if (maxItems) {
                    global.BRICKS.Breadcrumb.collapse(breadcrumb, parseInt(maxItems));
                }

                // 링크들에 키보드 접근성 추가
                const links = breadcrumb.querySelectorAll('.breadcrumb__link');
                links.forEach(link => {
                    // 키보드 접근성
                    link.addEventListener('keydown', (e) => {
                        // 화살표 키로 네비게이션
                        if (e.key === 'ArrowRight') {
                            const nextItem = link.closest('.breadcrumb__item').nextElementSibling;
                            if (nextItem) {
                                const nextLink = nextItem.querySelector('.breadcrumb__link');
                                if (nextLink) {
                                    nextLink.focus();
                                }
                            }
                        } else if (e.key === 'ArrowLeft') {
                            const prevItem = link.closest('.breadcrumb__item').previousElementSibling;
                            if (prevItem) {
                                const prevLink = prevItem.querySelector('.breadcrumb__link');
                                if (prevLink) {
                                    prevLink.focus();
                                }
                            }
                        }
                    });

                    // 클릭 이벤트 (필요시 사용)
                    link.addEventListener('click', (e) => {
                        // 커스텀 이벤트 발생
                        const event = new CustomEvent('breadcrumbClick', {
                            detail: {
                                link: link,
                                item: link.closest('.breadcrumb__item'),
                                breadcrumb: breadcrumb
                            }
                        });
                        breadcrumb.dispatchEvent(event);
                    });
                });

                // 모바일에서 responsive 클래스 자동 적용
                if (window.innerWidth <= 640 && !breadcrumb.classList.contains('breadcrumb--responsive')) {
                    const items = breadcrumb.querySelectorAll('.breadcrumb__item');
                    if (items.length > 3) {
                        breadcrumb.classList.add('breadcrumb--responsive');
                    }
                }
            });
        },

        // 브레드크럼 아이템 축소
        collapse: function(breadcrumb, maxItems) {
            const list = breadcrumb.querySelector('.breadcrumb');
            if (!list) return;

            const items = list.querySelectorAll('.breadcrumb__item');
            if (items.length <= maxItems) return;

            // 중간 아이템들을 숨기고 ellipsis 추가
            const itemsToHide = [];
            const startShow = 1; // 첫 번째 아이템은 보여줌
            const endShow = maxItems - 2; // 마지막 몇 개 아이템 보여줌

            items.forEach((item, index) => {
                if (index >= startShow && index < items.length - endShow) {
                    itemsToHide.push(item);
                }
            });

            if (itemsToHide.length > 0) {
                // Ellipsis 아이템 생성
                const ellipsisItem = document.createElement('li');
                ellipsisItem.className = 'breadcrumb__item breadcrumb__item--ellipsis';

                const ellipsisButton = document.createElement('button');
                ellipsisButton.className = 'breadcrumb__ellipsis-button';
                ellipsisButton.setAttribute('aria-label', 'Show hidden items');
                ellipsisButton.innerHTML = '...';

                ellipsisItem.appendChild(ellipsisButton);

                // 숨겨진 아이템들을 담을 드롭다운 생성
                const dropdown = document.createElement('div');
                dropdown.className = 'breadcrumb__dropdown';
                dropdown.style.display = 'none';

                itemsToHide.forEach(item => {
                    const link = item.querySelector('.breadcrumb__link');
                    if (link) {
                        const dropdownItem = document.createElement('a');
                        dropdownItem.href = link.href;
                        dropdownItem.className = 'breadcrumb__dropdown-item';
                        dropdownItem.textContent = link.textContent.trim();
                        dropdown.appendChild(dropdownItem);
                    }
                });

                ellipsisItem.appendChild(dropdown);

                // Ellipsis 클릭 이벤트
                ellipsisButton.addEventListener('click', () => {
                    const isOpen = dropdown.style.display !== 'none';
                    dropdown.style.display = isOpen ? 'none' : 'block';
                    ellipsisButton.setAttribute('aria-expanded', !isOpen);
                });

                // 외부 클릭시 드롭다운 닫기
                document.addEventListener('click', (e) => {
                    if (!ellipsisItem.contains(e.target)) {
                        dropdown.style.display = 'none';
                        ellipsisButton.setAttribute('aria-expanded', 'false');
                    }
                });

                // 첫 번째 아이템 다음에 ellipsis 삽입
                itemsToHide[0].parentNode.insertBefore(ellipsisItem, itemsToHide[0]);

                // 중간 아이템들 숨기기
                itemsToHide.forEach(item => {
                    item.style.display = 'none';
                });
            }
        },

        // 프로그래밍적으로 항목 추가
        addItem: function(breadcrumb, text, href, isActive = false) {
            const breadcrumbEl = typeof breadcrumb === 'string'
                ? document.querySelector(breadcrumb)
                : breadcrumb;

            if (!breadcrumbEl) return;

            const list = breadcrumbEl.querySelector('.breadcrumb');
            if (!list) return;

            // 현재 active 아이템 비활성화
            if (isActive) {
                const currentActive = list.querySelector('.breadcrumb__item--active');
                if (currentActive) {
                    currentActive.classList.remove('breadcrumb__item--active');
                    currentActive.removeAttribute('aria-current');

                    // 텍스트를 링크로 변환
                    const text = currentActive.textContent.trim();
                    const link = document.createElement('a');
                    link.href = '#';
                    link.className = 'breadcrumb__link';
                    link.textContent = text;
                    currentActive.innerHTML = '';
                    currentActive.appendChild(link);
                }
            }

            // 새 아이템 생성
            const item = document.createElement('li');
            item.className = 'breadcrumb__item';

            if (isActive) {
                item.classList.add('breadcrumb__item--active');
                item.setAttribute('aria-current', 'page');
                item.textContent = text;
            } else {
                const link = document.createElement('a');
                link.href = href || '#';
                link.className = 'breadcrumb__link';
                link.textContent = text;
                item.appendChild(link);
            }

            list.appendChild(item);

            // Max items 확인 후 재정렬
            const maxItems = breadcrumbEl.getAttribute('data-max-items');
            if (maxItems) {
                global.BRICKS.Breadcrumb.collapse(breadcrumbEl, parseInt(maxItems));
            }
        },

        // 프로그래밍적으로 항목 제거
        removeItem: function(breadcrumb, index) {
            const breadcrumbEl = typeof breadcrumb === 'string'
                ? document.querySelector(breadcrumb)
                : breadcrumb;

            if (!breadcrumbEl) return;

            const items = breadcrumbEl.querySelectorAll('.breadcrumb__item');
            if (index >= 0 && index < items.length) {
                items[index].remove();
            }
        },

        // 브레드크럼 초기화 (모든 항목 제거)
        clear: function(breadcrumb) {
            const breadcrumbEl = typeof breadcrumb === 'string'
                ? document.querySelector(breadcrumb)
                : breadcrumb;

            if (!breadcrumbEl) return;

            const list = breadcrumbEl.querySelector('.breadcrumb');
            if (list) {
                list.innerHTML = '';
            }
        }
    };

})(window);