/**
 * BRICKS Design System - Tabs Component
 * 탭 네비게이션 기능을 제공하는 컴포넌트
 */

(function(global) {
    "use strict";

    global.BRICKS = global.BRICKS || {};

    /**
     * Tabs Component
     * 탭 네비게이션 기능을 제공하는 컴포넌트
     */
    global.BRICKS.Tabs = {
        init: function() {
            // 모든 탭 컨테이너 초기화
            document.querySelectorAll('[data-tabs]').forEach(tabContainer => {
                // 이미 초기화된 경우 스킵
                if (tabContainer.hasAttribute('data-bricks-tabs-initialized')) {
                    return;
                }

                tabContainer.setAttribute('data-bricks-tabs-initialized', 'true');

                const nav = tabContainer.querySelector('.tabs__nav');
                const buttons = tabContainer.querySelectorAll('.tabs__button');
                const panels = tabContainer.querySelectorAll('.tabs__panel');
                const isVertical = tabContainer.classList.contains('tabs--vertical');
                const isPills = tabContainer.classList.contains('tabs--pills');

                // 인디케이터 바 생성 및 추가 (모든 탭 스타일에 적용)
                if (nav && !nav.querySelector('.tabs__indicator')) {
                    const indicator = document.createElement('div');
                    indicator.className = 'tabs__indicator';
                    nav.appendChild(indicator);

                    // 초기 위치 설정
                    const activeButton = nav.querySelector('.tabs__button--active');
                    if (activeButton) {
                        // 약간의 지연 후 초기 위치 설정 (DOM 렌더링 대기)
                        setTimeout(() => {
                            this.updateIndicator(nav, activeButton, isVertical, isPills);
                        }, 10);
                    }
                }

                buttons.forEach((button, index) => {
                    // data-tab 속성이 없는 경우 인덱스 기반으로 설정
                    if (!button.hasAttribute('data-tab')) {
                        button.setAttribute('data-tab', 'tab-' + index);
                        if (panels[index]) {
                            panels[index].setAttribute('id', 'tab-' + index);
                        }
                    }

                    button.addEventListener('click', (e) => {
                        e.preventDefault();

                        // disabled 버튼은 무시
                        if (button.disabled) return;

                        const targetTab = button.getAttribute('data-tab');
                        const targetPanel = tabContainer.querySelector('#' + targetTab);

                        if (!targetPanel) return;

                        // 모든 버튼과 패널 비활성화
                        buttons.forEach(btn => btn.classList.remove('tabs__button--active'));
                        panels.forEach(panel => panel.classList.remove('tabs__panel--active'));

                        // 선택된 탭 활성화
                        button.classList.add('tabs__button--active');
                        targetPanel.classList.add('tabs__panel--active');

                        // ARIA 속성 업데이트
                        buttons.forEach(btn => {
                            btn.setAttribute('aria-selected', btn === button ? 'true' : 'false');
                            btn.setAttribute('tabindex', btn === button ? '0' : '-1');
                        });

                        // 인디케이터 업데이트 (모든 탭 스타일에 적용)
                        const nav = tabContainer.querySelector('.tabs__nav');
                        const isVertical = tabContainer.classList.contains('tabs--vertical');
                        const isPills = tabContainer.classList.contains('tabs--pills');
                        if (nav) {
                            global.BRICKS.Tabs.updateIndicator(nav, button, isVertical, isPills);
                        }

                        // 커스텀 이벤트 발생
                        const event = new CustomEvent('tabChange', {
                            detail: {
                                tab: targetTab,
                                button: button,
                                panel: targetPanel,
                                container: tabContainer
                            }
                        });
                        tabContainer.dispatchEvent(event);
                    });

                    // 키보드 네비게이션 지원
                    button.addEventListener('keydown', (e) => {
                        let targetButton = null;
                        const currentIndex = Array.from(buttons).indexOf(button);

                        switch(e.key) {
                            case 'ArrowLeft':
                            case 'ArrowUp':
                                e.preventDefault();
                                // 이전 활성 버튼 찾기
                                for (let i = currentIndex - 1; i >= 0; i--) {
                                    if (!buttons[i].disabled) {
                                        targetButton = buttons[i];
                                        break;
                                    }
                                }
                                // 순환: 마지막 활성 버튼으로
                                if (!targetButton) {
                                    for (let i = buttons.length - 1; i > currentIndex; i--) {
                                        if (!buttons[i].disabled) {
                                            targetButton = buttons[i];
                                            break;
                                        }
                                    }
                                }
                                break;

                            case 'ArrowRight':
                            case 'ArrowDown':
                                e.preventDefault();
                                // 다음 활성 버튼 찾기
                                for (let i = currentIndex + 1; i < buttons.length; i++) {
                                    if (!buttons[i].disabled) {
                                        targetButton = buttons[i];
                                        break;
                                    }
                                }
                                // 순환: 첫 번째 활성 버튼으로
                                if (!targetButton) {
                                    for (let i = 0; i < currentIndex; i++) {
                                        if (!buttons[i].disabled) {
                                            targetButton = buttons[i];
                                            break;
                                        }
                                    }
                                }
                                break;

                            case 'Home':
                                e.preventDefault();
                                // 첫 번째 활성 버튼
                                for (let i = 0; i < buttons.length; i++) {
                                    if (!buttons[i].disabled) {
                                        targetButton = buttons[i];
                                        break;
                                    }
                                }
                                break;

                            case 'End':
                                e.preventDefault();
                                // 마지막 활성 버튼
                                for (let i = buttons.length - 1; i >= 0; i--) {
                                    if (!buttons[i].disabled) {
                                        targetButton = buttons[i];
                                        break;
                                    }
                                }
                                break;
                        }

                        if (targetButton) {
                            targetButton.focus();
                            targetButton.click();
                        }
                    });
                });

                // ARIA 속성 설정
                if (nav) {
                    nav.setAttribute('role', 'tablist');
                    nav.setAttribute('aria-orientation', isVertical ? 'vertical' : 'horizontal');
                }

                buttons.forEach((button, index) => {
                    button.setAttribute('role', 'tab');
                    const isActive = button.classList.contains('tabs__button--active');
                    button.setAttribute('aria-selected', isActive ? 'true' : 'false');
                    button.setAttribute('tabindex', isActive ? '0' : '-1');

                    const tabId = button.getAttribute('data-tab');
                    if (tabId) {
                        button.setAttribute('aria-controls', tabId);
                        if (!button.hasAttribute('id')) {
                            button.setAttribute('id', tabId + '-button');
                        }
                    }
                });

                panels.forEach(panel => {
                    panel.setAttribute('role', 'tabpanel');
                    panel.setAttribute('tabindex', '0');
                    const isActive = panel.classList.contains('tabs__panel--active');
                    panel.setAttribute('aria-hidden', !isActive ? 'true' : 'false');

                    const panelId = panel.getAttribute('id');
                    if (panelId) {
                        const associatedButton = tabContainer.querySelector(`[data-tab="${panelId}"]`);
                        if (associatedButton && associatedButton.getAttribute('id')) {
                            panel.setAttribute('aria-labelledby', associatedButton.getAttribute('id'));
                        }
                    }
                });

                // Window resize 이벤트로 인디케이터 위치 재조정 (모든 탭 스타일에 적용)
                const resizeHandler = () => {
                    const activeButton = nav.querySelector('.tabs__button--active');
                    if (activeButton && nav) {
                        this.updateIndicator(nav, activeButton, isVertical, isPills);
                    }
                };
                window.addEventListener('resize', resizeHandler);
                // ResizeObserver가 지원되는 경우 사용
                if (typeof ResizeObserver !== 'undefined') {
                    const resizeObserver = new ResizeObserver(resizeHandler);
                    resizeObserver.observe(nav);
                }
            });
        },

        // 인디케이터 위치 업데이트
        updateIndicator: function(nav, activeButton, isVertical, isPills) {
            const indicator = nav.querySelector('.tabs__indicator');
            if (!indicator || !activeButton) return;

            // 버튼의 위치와 크기 계산
            const navRect = nav.getBoundingClientRect();
            const buttonRect = activeButton.getBoundingClientRect();

            if (isVertical) {
                // 수직 탭: top과 height 설정
                const top = buttonRect.top - navRect.top;
                const height = buttonRect.height;

                indicator.style.top = top + 'px';
                indicator.style.height = height + 'px';
            } else if (isPills) {
                // Pills 탭: 백그라운드 박스 애니메이션
                // nav의 padding과 gap을 고려한 정확한 위치 계산
                const left = buttonRect.left - navRect.left;
                const width = buttonRect.width;

                indicator.style.left = left + 'px';
                indicator.style.width = width + 'px';
            } else {
                // 기본 수평 탭: left와 width 설정
                const left = buttonRect.left - navRect.left;
                const width = buttonRect.width;

                indicator.style.left = left + 'px';
                indicator.style.width = width + 'px';
            }
        },

        // 프로그래밍적으로 탭 전환
        switchTo: function(container, tabId) {
            const tabContainer = typeof container === 'string'
                ? document.querySelector(container)
                : container;

            if (!tabContainer) return;

            const button = tabContainer.querySelector(`[data-tab="${tabId}"]`);
            if (button && !button.disabled) {
                button.click();
            }
        },

        // 탭 활성/비활성 설정
        enableTab: function(container, tabId, enable = true) {
            const tabContainer = typeof container === 'string'
                ? document.querySelector(container)
                : container;

            if (!tabContainer) return;

            const button = tabContainer.querySelector(`[data-tab="${tabId}"]`);
            if (button) {
                button.disabled = !enable;
                button.setAttribute('aria-disabled', !enable ? 'true' : 'false');
            }
        }
    };

})(window);