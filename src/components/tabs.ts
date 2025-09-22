/**
 * BRICKS Design System - Tabs Component
 * 탭 네비게이션 기능을 제공하는 컴포넌트
 */

import type { AlertOptions, ToastOptions } from '../types/index';

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



(function(global: Window) {
    "use strict";

    global.BRICKS = global.BRICKS || {} as any;

    /**
     * Tabs Component
     * 탭 네비게이션 기능을 제공하는 컴포넌트
     */
    global.BRICKS.Tabs = {
        init: function(): void {
            // 모든 탭 컨테이너 초기화
            document.querySelectorAll('[data-tabs]').forEach((tabContainer: Element) => {
                const container = tabContainer as HTMLElement;

                // 이미 초기화된 경우 스킵
                if (container.hasAttribute('data-bricks-tabs-initialized')) {
                    return;
                }

                container.setAttribute('data-bricks-tabs-initialized', 'true');

                const nav = container.querySelector('.tabs__nav') as HTMLElement | null;
                const buttons = container.querySelectorAll('.tabs__button') as NodeListOf<HTMLElement>;
                const panels = container.querySelectorAll('.tabs__panel') as NodeListOf<HTMLElement>;
                const isVertical: boolean = container.classList.contains('tabs--vertical');
                const isPills: boolean = container.classList.contains('tabs--pills');

                // 인디케이터 바 생성 및 추가 (모든 탭 스타일에 적용)
                if (nav && !nav.querySelector('.tabs__indicator')) {
                    const indicator: HTMLDivElement = document.createElement('div');
                    indicator.className = 'tabs__indicator';
                    nav.appendChild(indicator);

                    // 초기 위치 설정
                    const activeButton = nav.querySelector('.tabs__button--active') as HTMLElement | null;
                    if (activeButton) {
                        // 약간의 지연 후 초기 위치 설정 (DOM 렌더링 대기)
                        setTimeout(() => {
                            this.updateIndicator(nav, activeButton, isVertical, isPills);
                        }, 10);
                    }
                }

                buttons.forEach((button: HTMLElement, index: number) => {
                    // data-tab 속성이 없는 경우 인덱스 기반으로 설정
                    if (!button.hasAttribute('data-tab')) {
                        button.setAttribute('data-tab', 'tab-' + index);
                        if (panels[index]) {
                            panels[index].setAttribute('id', 'tab-' + index);
                        }
                    }

                    // ARIA 속성 설정
                    button.setAttribute('role', 'tab');
                    button.setAttribute('aria-controls', button.getAttribute('data-tab') || '');

                    button.addEventListener('click', (e: Event) => {
                        e.preventDefault();

                        // disabled 버튼은 무시
                        if (button.hasAttribute('disabled') || button.classList.contains('disabled')) return;

                        const targetTab: string | null = button.getAttribute('data-tab');
                        const targetPanel = container.querySelector('#' + targetTab) as HTMLElement | null;

                        if (!targetPanel || !targetTab) return;

                        // 모든 버튼과 패널 비활성화
                        buttons.forEach((btn: HTMLElement) => btn.classList.remove('tabs__button--active'));
                        panels.forEach((panel: HTMLElement) => panel.classList.remove('tabs__panel--active'));

                        // 선택된 탭 활성화
                        button.classList.add('tabs__button--active');
                        targetPanel.classList.add('tabs__panel--active');

                        // ARIA 속성 업데이트
                        buttons.forEach((btn: HTMLElement) => {
                            btn.setAttribute('aria-selected', btn === button ? 'true' : 'false');
                            btn.setAttribute('tabindex', btn === button ? '0' : '-1');
                        });

                        // 패널 ARIA 속성
                        panels.forEach((panel: HTMLElement) => {
                            panel.setAttribute('aria-hidden', panel === targetPanel ? 'false' : 'true');
                        });

                        // 인디케이터 업데이트 (모든 탭 스타일에 적용)
                        if (nav) {
                            global.BRICKS.Tabs.updateIndicator(nav, button, isVertical, isPills);
                        }

                        // 커스텀 이벤트 발생
                        const event = new CustomEvent('tabChange', {
                            detail: {
                                tab: targetTab,
                                button: button,
                                panel: targetPanel,
                                container: container
                            } as TabChangeDetail
                        });
                        container.dispatchEvent(event);
                    });

                    // 키보드 네비게이션
                    button.addEventListener('keydown', (e: KeyboardEvent) => {
                        this.handleKeyDown(e, buttons, index);
                    });
                });

                // 초기 ARIA 설정
                buttons.forEach((btn: HTMLElement, idx: number) => {
                    const isActive = btn.classList.contains('tabs__button--active');
                    btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
                    btn.setAttribute('tabindex', isActive ? '0' : '-1');
                });

                panels.forEach((panel: HTMLElement) => {
                    const isActive = panel.classList.contains('tabs__panel--active');
                    panel.setAttribute('role', 'tabpanel');
                    panel.setAttribute('aria-hidden', isActive ? 'false' : 'true');
                });

                // Tablist role 설정
                if (nav) {
                    nav.setAttribute('role', 'tablist');
                    if (isVertical) {
                        nav.setAttribute('aria-orientation', 'vertical');
                    }
                }
            });
        },

        activateTab: function(container: HTMLElement, tabId: string): void {
            const button = container.querySelector(`[data-tab="${tabId}"]`) as HTMLElement | null;
            if (button) {
                button.click();
            }
        },

        setActiveTab: function(container: HTMLElement, index: number): void {
            const buttons = container.querySelectorAll('.tabs__button') as NodeListOf<HTMLElement>;
            if (buttons[index]) {
                buttons[index].click();
            }
        },

        updateIndicator: function(nav: HTMLElement, activeButton: HTMLElement, isVertical: boolean, isPills: boolean): void {
            const indicator = nav.querySelector('.tabs__indicator') as HTMLElement | null;
            if (!indicator) return;

            const rect = activeButton.getBoundingClientRect();
            const navRect = nav.getBoundingClientRect();

            if (isVertical) {
                // 세로형 탭
                indicator.style.top = (activeButton.offsetTop) + 'px';
                indicator.style.height = rect.height + 'px';
                indicator.style.width = '';
                indicator.style.left = '';
            } else {
                // 가로형 탭
                indicator.style.left = (activeButton.offsetLeft) + 'px';
                indicator.style.width = rect.width + 'px';
                indicator.style.height = '';
                indicator.style.top = '';
            }

            // Pills 스타일인 경우 border-radius 적용
            if (isPills) {
                indicator.style.borderRadius = '9999px';
            } else {
                indicator.style.borderRadius = '';
            }
        },

        handleKeyDown: function(e: KeyboardEvent, buttons: NodeListOf<HTMLElement>, currentIndex: number): void {
            let targetIndex: number = currentIndex;

            switch (e.key) {
                case 'ArrowLeft':
                case 'ArrowUp':
                    e.preventDefault();
                    targetIndex = currentIndex > 0 ? currentIndex - 1 : buttons.length - 1;
                    break;
                case 'ArrowRight':
                case 'ArrowDown':
                    e.preventDefault();
                    targetIndex = currentIndex < buttons.length - 1 ? currentIndex + 1 : 0;
                    break;
                case 'Home':
                    e.preventDefault();
                    targetIndex = 0;
                    break;
                case 'End':
                    e.preventDefault();
                    targetIndex = buttons.length - 1;
                    break;
                case 'Enter':
                case ' ':
                    e.preventDefault();
                    buttons[currentIndex].click();
                    return;
                default:
                    return;
            }

            // 포커스 이동
            if (buttons[targetIndex] && !buttons[targetIndex].hasAttribute('disabled')) {
                buttons[targetIndex].focus();
                // 자동으로 탭 활성화
                buttons[targetIndex].click();
            }
        }
    };

})(window);

export { TabsComponent, TabChangeDetail };