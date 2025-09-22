/**
 * BRICKS Design System - Toggle Component
 * 토글 스위치 컴포넌트 모듈
 */

interface ToggleChangeDetail {
    element: HTMLElement;
    checked: boolean;
}

interface ToggleComponent {
    init(): void;
    toggle(element: HTMLElement): void;
    handleKeydown(e: KeyboardEvent, toggle: HTMLElement): void;
    announceToScreenReader(message: string): void;
}



(function(global: Window) {
    "use strict";

    // BRICKS 네임스페이스
    global.BRICKS = global.BRICKS || {} as any;

    /**
     * Toggle Component
     */
    global.BRICKS.Toggle = {
        init: function(): void {
            // 모든 토글 스위치 초기화
            document.querySelectorAll(".toggle").forEach((toggle: Element) => {
                const toggleEl = toggle as HTMLElement;

                if (toggleEl.hasAttribute("data-bricks-initialized")) return;
                toggleEl.setAttribute("data-bricks-initialized", "true");

                // ARIA 속성 초기 설정
                const isActive: boolean = toggleEl.classList.contains("toggle--active");
                const isDisabled: boolean = (toggleEl as any).disabled;

                toggleEl.setAttribute("role", "switch");
                toggleEl.setAttribute("aria-checked", isActive ? "true" : "false");
                toggleEl.setAttribute("aria-disabled", isDisabled ? "true" : "false");

                // 레이블이 있는 경우 연결
                const label = toggleEl.nextElementSibling as HTMLElement | null;
                if (label && label.classList.contains("toggle__label")) {
                    const toggleId: string = toggleEl.id || "toggle-" + Math.random().toString(36).substr(2, 9);
                    toggleEl.id = toggleId;
                    label.setAttribute("for", toggleId);
                }

                // 클릭 이벤트 (기존 onclick과 별도로)
                toggleEl.addEventListener("click", function(this: HTMLElement, e: Event) {
                    if (!(this as any).disabled) {
                        global.BRICKS.Toggle.toggle(this);
                    }
                });

                // 키보드 이벤트
                toggleEl.addEventListener("keydown", function(this: HTMLElement, e: KeyboardEvent) {
                    if (!(this as any).disabled) {
                        global.BRICKS.Toggle.handleKeydown(e, this);
                    }
                });

                // 포커스 스타일
                toggleEl.addEventListener("focus", function(this: HTMLElement) {
                    if (!(this as any).disabled) {
                        this.classList.add("toggle--focus");
                    }
                });

                toggleEl.addEventListener("blur", function(this: HTMLElement) {
                    this.classList.remove("toggle--focus");
                });
            });
        },

        toggle: function(element: HTMLElement): void {
            if (!element || (element as any).disabled) return;

            const isActive: boolean = element.classList.contains("toggle--active");
            const newState: boolean = !isActive;

            if (newState) {
                element.classList.add("toggle--active");
                element.setAttribute("aria-checked", "true");
            } else {
                element.classList.remove("toggle--active");
                element.setAttribute("aria-checked", "false");
            }

            // 스크린 리더 알림
            this.announceToScreenReader(newState ? "켜짐" : "꺼짐");

            // 커스텀 이벤트 발생
            const event = new CustomEvent("toggleChange", {
                detail: {
                    element: element,
                    checked: newState
                } as ToggleChangeDetail
            });
            element.dispatchEvent(event);
        },

        handleKeydown: function(e: KeyboardEvent, toggle: HTMLElement): void {
            switch(e.key) {
                case " ":
                case "Enter":
                    e.preventDefault();
                    this.toggle(toggle);
                    break;
                case "ArrowRight":
                    e.preventDefault();
                    if (!toggle.classList.contains("toggle--active")) {
                        this.toggle(toggle);
                    }
                    break;
                case "ArrowLeft":
                    e.preventDefault();
                    if (toggle.classList.contains("toggle--active")) {
                        this.toggle(toggle);
                    }
                    break;
            }
        },

        // 스크린 리더 알림
        announceToScreenReader: function(message: string): void {
            const announcement: HTMLDivElement = document.createElement("div");
            announcement.className = "sr-only";
            announcement.setAttribute("role", "status");
            announcement.setAttribute("aria-live", "polite");
            announcement.textContent = message;

            document.body.appendChild(announcement);

            setTimeout(() => {
                if (announcement.parentElement) {
                    document.body.removeChild(announcement);
                }
            }, 1000);
        }
    };

})(window);

export { ToggleComponent, ToggleChangeDetail };