/**
 * BRICKS Design System - Accordion Component
 * 접고 펼칠 수 있는 콘텐츠 패널 컴포넌트
 */

(function(global) {
    "use strict";

    global.BRICKS = global.BRICKS || {};

    /**
     * Accordion Component
     * 접고 펼칠 수 있는 콘텐츠 패널 컴포넌트
     */
    global.BRICKS.Accordion = {
        init: function() {
            // 모든 아코디언 초기화
            document.querySelectorAll('[data-accordion]').forEach(accordion => {
                // 이미 초기화된 경우 스킵
                if (accordion.hasAttribute('data-bricks-accordion-initialized')) {
                    return;
                }

                accordion.setAttribute('data-bricks-accordion-initialized', 'true');

                // 다중 열기 허용 여부 확인
                const allowMultiple = accordion.getAttribute('data-accordion-multiple') === 'true';

                // 각 헤더에 이벤트 바인딩
                const headers = accordion.querySelectorAll('.accordion__header');

                headers.forEach(header => {
                    header.addEventListener('click', (e) => {
                        e.preventDefault();

                        const item = header.closest('.accordion__item');
                        if (!item) return;

                        const content = item.querySelector('.accordion__content');
                        if (!content) return;

                        const isOpen = item.classList.contains('accordion__item--open');

                        // 다중 열기가 허용되지 않으면 다른 아이템 닫기
                        if (!allowMultiple) {
                            accordion.querySelectorAll('.accordion__item').forEach(otherItem => {
                                if (otherItem !== item) {
                                    otherItem.classList.remove('accordion__item--open');
                                    const otherHeader = otherItem.querySelector('.accordion__header');
                                    const otherContent = otherItem.querySelector('.accordion__content');
                                    if (otherHeader) {
                                        otherHeader.classList.remove('accordion__header--active');
                                    }
                                    if (otherContent) {
                                        otherContent.classList.remove('accordion__content--open');
                                        // 애니메이션을 위한 max-height 설정
                                        otherContent.style.maxHeight = null;
                                    }
                                }
                            });
                        }

                        // 현재 아이템 토글
                        if (isOpen) {
                            // 닫기
                            item.classList.remove('accordion__item--open');
                            header.classList.remove('accordion__header--active');
                            content.classList.remove('accordion__content--open');
                            content.style.maxHeight = null;
                        } else {
                            // 열기
                            item.classList.add('accordion__item--open');
                            header.classList.add('accordion__header--active');
                            content.classList.add('accordion__content--open');
                            // 부드러운 애니메이션을 위한 max-height 계산
                            content.style.maxHeight = content.scrollHeight + "px";
                        }

                        // 커스텀 이벤트 발생
                        const event = new CustomEvent('accordionToggle', {
                            detail: {
                                item: item,
                                header: header,
                                content: content,
                                isOpen: !isOpen,
                                accordion: accordion
                            }
                        });
                        accordion.dispatchEvent(event);
                    });

                    // 키보드 접근성 지원
                    header.addEventListener('keydown', (e) => {
                        switch(e.key) {
                            case 'Enter':
                            case ' ':
                                e.preventDefault();
                                header.click();
                                break;

                            case 'ArrowUp':
                                e.preventDefault();
                                const prevHeader = global.BRICKS.Accordion.getPreviousHeader(header, accordion);
                                if (prevHeader) prevHeader.focus();
                                break;

                            case 'ArrowDown':
                                e.preventDefault();
                                const nextHeader = global.BRICKS.Accordion.getNextHeader(header, accordion);
                                if (nextHeader) nextHeader.focus();
                                break;

                            case 'Home':
                                e.preventDefault();
                                const firstHeader = accordion.querySelector('.accordion__header');
                                if (firstHeader) firstHeader.focus();
                                break;

                            case 'End':
                                e.preventDefault();
                                const allHeaders = accordion.querySelectorAll('.accordion__header');
                                const lastHeader = allHeaders[allHeaders.length - 1];
                                if (lastHeader) lastHeader.focus();
                                break;
                        }
                    });

                    // ARIA 속성 설정
                    const item = header.closest('.accordion__item');
                    const content = item ? item.querySelector('.accordion__content') : null;

                    if (content) {
                        // 고유 ID 생성
                        const id = 'accordion-' + Math.random().toString(36).substr(2, 9);
                        content.setAttribute('id', id);
                        header.setAttribute('aria-controls', id);
                    }

                    header.setAttribute('role', 'button');
                    header.setAttribute('tabindex', '0');
                    header.setAttribute('aria-expanded',
                        item && item.classList.contains('accordion__item--open') ? 'true' : 'false'
                    );
                });

                // 초기 열린 아이템의 max-height 설정
                accordion.querySelectorAll('.accordion__item--open').forEach(item => {
                    const content = item.querySelector('.accordion__content');
                    if (content) {
                        content.style.maxHeight = content.scrollHeight + "px";
                    }
                });
            });
        },

        // 이전 헤더 찾기
        getPreviousHeader: function(currentHeader, accordion) {
            const headers = Array.from(accordion.querySelectorAll('.accordion__header'));
            const currentIndex = headers.indexOf(currentHeader);

            if (currentIndex > 0) {
                return headers[currentIndex - 1];
            }
            return null;
        },

        // 다음 헤더 찾기
        getNextHeader: function(currentHeader, accordion) {
            const headers = Array.from(accordion.querySelectorAll('.accordion__header'));
            const currentIndex = headers.indexOf(currentHeader);

            if (currentIndex < headers.length - 1) {
                return headers[currentIndex + 1];
            }
            return null;
        },

        // 프로그래밍적으로 아이템 열기/닫기
        toggle: function(accordion, itemIndex) {
            const accordionEl = typeof accordion === 'string'
                ? document.querySelector(accordion)
                : accordion;

            if (!accordionEl) return;

            const items = accordionEl.querySelectorAll('.accordion__item');
            if (items[itemIndex]) {
                const header = items[itemIndex].querySelector('.accordion__header');
                if (header) {
                    header.click();
                }
            }
        },

        // 모든 아이템 열기
        openAll: function(accordion) {
            const accordionEl = typeof accordion === 'string'
                ? document.querySelector(accordion)
                : accordion;

            if (!accordionEl) return;

            accordionEl.querySelectorAll('.accordion__item').forEach(item => {
                if (!item.classList.contains('accordion__item--open')) {
                    const header = item.querySelector('.accordion__header');
                    if (header) header.click();
                }
            });
        },

        // 모든 아이템 닫기
        closeAll: function(accordion) {
            const accordionEl = typeof accordion === 'string'
                ? document.querySelector(accordion)
                : accordion;

            if (!accordionEl) return;

            accordionEl.querySelectorAll('.accordion__item').forEach(item => {
                if (item.classList.contains('accordion__item--open')) {
                    const header = item.querySelector('.accordion__header');
                    if (header) header.click();
                }
            });
        }
    };

})(window);