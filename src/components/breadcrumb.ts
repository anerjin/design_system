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



(function(global: Window) {
    "use strict";

    global.BRICKS = global.BRICKS || {} as any;

    /**
     * Breadcrumb Component
     * 탐색 경로 표시 컴포넌트
     */
    global.BRICKS.Breadcrumb = {
        init: function(): void {
            // 모든 브레드크럼 초기화
            document.querySelectorAll('[data-breadcrumb]').forEach((breadcrumb: Element) => {
                const breadcrumbEl = breadcrumb as HTMLElement;

                // 이미 초기화된 경우 스킵
                if (breadcrumbEl.hasAttribute('data-bricks-breadcrumb-initialized')) {
                    return;
                }

                breadcrumbEl.setAttribute('data-bricks-breadcrumb-initialized', 'true');

                // max-items 속성 확인
                const maxItems: string | null = breadcrumbEl.getAttribute('data-max-items');
                if (maxItems) {
                    global.BRICKS.Breadcrumb.collapse(breadcrumbEl, parseInt(maxItems));
                }

                // 링크들에 키보드 접근성 추가
                const links: NodeListOf<HTMLElement> = breadcrumbEl.querySelectorAll('.breadcrumb__link');
                links.forEach((link: HTMLElement) => {
                    // 키보드 접근성
                    link.addEventListener('keydown', (e: KeyboardEvent) => {
                        // 화살표 키로 네비게이션
                        if (e.key === 'ArrowRight') {
                            const currentItem = link.closest('.breadcrumb__item') as HTMLElement;
                            const nextItem = currentItem?.nextElementSibling as HTMLElement | null;
                            if (nextItem) {
                                const nextLink = nextItem.querySelector('.breadcrumb__link') as HTMLElement;
                                if (nextLink) {
                                    nextLink.focus();
                                }
                            }
                        } else if (e.key === 'ArrowLeft') {
                            const currentItem = link.closest('.breadcrumb__item') as HTMLElement;
                            const prevItem = currentItem?.previousElementSibling as HTMLElement | null;
                            if (prevItem) {
                                const prevLink = prevItem.querySelector('.breadcrumb__link') as HTMLElement;
                                if (prevLink) {
                                    prevLink.focus();
                                }
                            }
                        }
                    });

                    // 클릭 이벤트 (필요시 사용)
                    link.addEventListener('click', (e: Event) => {
                        // 커스텀 이벤트 발생
                        const event = new CustomEvent('breadcrumbClick', {
                            detail: {
                                link: link,
                                item: link.closest('.breadcrumb__item'),
                                breadcrumb: breadcrumbEl
                            } as BreadcrumbClickDetail
                        });
                        breadcrumbEl.dispatchEvent(event);
                    });
                });

                // 모바일에서 responsive 클래스 자동 적용
                if (window.innerWidth <= 640 && !breadcrumbEl.classList.contains('breadcrumb--responsive')) {
                    const items: NodeListOf<HTMLElement> = breadcrumbEl.querySelectorAll('.breadcrumb__item');
                    if (items.length > 3) {
                        breadcrumbEl.classList.add('breadcrumb--responsive');
                    }
                }
            });
        },

        // 브레드크럼 아이템 축소
        collapse: function(breadcrumb: HTMLElement, maxItems: number): void {
            const list: HTMLElement | null = breadcrumb.querySelector('.breadcrumb');
            if (!list) return;

            const items: NodeListOf<HTMLElement> = list.querySelectorAll('.breadcrumb__item');
            if (items.length <= maxItems) return;

            // 중간 아이템들을 숨기고 ellipsis 추가
            const itemsToHide: HTMLElement[] = [];
            const startShow: number = 1; // 첫 번째 아이템은 보여줌
            const endShow: number = maxItems - 2; // 마지막 몇 개 아이템 보여줌

            items.forEach((item: HTMLElement, index: number) => {
                if (index >= startShow && index < items.length - endShow) {
                    itemsToHide.push(item);
                }
            });

            if (itemsToHide.length > 0) {
                // Ellipsis 아이템 생성
                const ellipsisItem: HTMLLIElement = document.createElement('li');
                ellipsisItem.className = 'breadcrumb__item breadcrumb__item--ellipsis';

                const ellipsisButton: HTMLButtonElement = document.createElement('button');
                ellipsisButton.className = 'breadcrumb__ellipsis-button';
                ellipsisButton.setAttribute('aria-label', 'Show hidden items');
                ellipsisButton.innerHTML = '...';

                ellipsisItem.appendChild(ellipsisButton);

                // 숨겨진 아이템들을 담을 드롭다운 생성
                const dropdown: HTMLDivElement = document.createElement('div');
                dropdown.className = 'breadcrumb__dropdown';
                dropdown.style.display = 'none';

                itemsToHide.forEach((item: HTMLElement) => {
                    const link = item.querySelector('.breadcrumb__link') as HTMLAnchorElement | null;
                    if (link) {
                        const dropdownItem: HTMLAnchorElement = document.createElement('a');
                        dropdownItem.href = link.href;
                        dropdownItem.className = 'breadcrumb__dropdown-item';
                        dropdownItem.textContent = link.textContent?.trim() || '';
                        dropdown.appendChild(dropdownItem);
                    }
                });

                ellipsisItem.appendChild(dropdown);

                // Ellipsis 클릭 이벤트
                ellipsisButton.addEventListener('click', () => {
                    const isOpen: boolean = dropdown.style.display !== 'none';
                    dropdown.style.display = isOpen ? 'none' : 'block';
                    ellipsisButton.setAttribute('aria-expanded', (!isOpen).toString());
                });

                // 외부 클릭시 드롭다운 닫기
                document.addEventListener('click', (e: Event) => {
                    const target = e.target as HTMLElement;
                    if (!ellipsisItem.contains(target)) {
                        dropdown.style.display = 'none';
                        ellipsisButton.setAttribute('aria-expanded', 'false');
                    }
                });

                // 첫 번째 아이템 다음에 ellipsis 삽입
                const parentNode = itemsToHide[0].parentNode;
                if (parentNode) {
                    parentNode.insertBefore(ellipsisItem, itemsToHide[0]);
                }

                // 중간 아이템들 숨기기
                itemsToHide.forEach((item: HTMLElement) => {
                    item.style.display = 'none';
                });
            }
        },

        // 프로그래밍적으로 항목 추가
        addItem: function(breadcrumb: string | HTMLElement, text: string, href?: string, isActive: boolean = false): void {
            const breadcrumbEl: HTMLElement | null = typeof breadcrumb === 'string'
                ? document.querySelector(breadcrumb)
                : breadcrumb;

            if (!breadcrumbEl) return;

            const list: HTMLElement | null = breadcrumbEl.querySelector('.breadcrumb');
            if (!list) return;

            // 현재 active 아이템 비활성화
            if (isActive) {
                const currentActive: HTMLElement | null = list.querySelector('.breadcrumb__item--active');
                if (currentActive) {
                    currentActive.classList.remove('breadcrumb__item--active');
                    currentActive.removeAttribute('aria-current');

                    // 텍스트를 링크로 변환
                    const itemText: string = currentActive.textContent?.trim() || '';
                    const link: HTMLAnchorElement = document.createElement('a');
                    link.href = '#';
                    link.className = 'breadcrumb__link';
                    link.textContent = itemText;
                    currentActive.innerHTML = '';
                    currentActive.appendChild(link);
                }
            }

            // 새 아이템 생성
            const item: HTMLLIElement = document.createElement('li');
            item.className = 'breadcrumb__item';

            if (isActive) {
                item.classList.add('breadcrumb__item--active');
                item.setAttribute('aria-current', 'page');
                item.textContent = text;
            } else {
                const link: HTMLAnchorElement = document.createElement('a');
                link.href = href || '#';
                link.className = 'breadcrumb__link';
                link.textContent = text;
                item.appendChild(link);
            }

            list.appendChild(item);

            // Max items 확인 후 재정렬
            const maxItems: string | null = breadcrumbEl.getAttribute('data-max-items');
            if (maxItems) {
                global.BRICKS.Breadcrumb.collapse(breadcrumbEl, parseInt(maxItems));
            }
        },

        // 프로그래밍적으로 항목 제거
        removeItem: function(breadcrumb: string | HTMLElement, index: number): void {
            const breadcrumbEl: HTMLElement | null = typeof breadcrumb === 'string'
                ? document.querySelector(breadcrumb)
                : breadcrumb;

            if (!breadcrumbEl) return;

            const items: NodeListOf<HTMLElement> = breadcrumbEl.querySelectorAll('.breadcrumb__item');
            if (index >= 0 && index < items.length) {
                items[index].remove();
            }
        },

        // 브레드크럼 초기화 (모든 항목 제거)
        clear: function(breadcrumb: string | HTMLElement): void {
            const breadcrumbEl: HTMLElement | null = typeof breadcrumb === 'string'
                ? document.querySelector(breadcrumb)
                : breadcrumb;

            if (!breadcrumbEl) return;

            const list: HTMLElement | null = breadcrumbEl.querySelector('.breadcrumb');
            if (list) {
                list.innerHTML = '';
            }
        }
    };

})(window);

export { BreadcrumbComponent, BreadcrumbClickDetail };