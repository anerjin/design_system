/**
 * BRICKS Design System - Toggle Component
 * 토글 스위치 컴포넌트 모듈
 */

(function(global) {
    "use strict";

    // BRICKS 네임스페이스
    global.BRICKS = global.BRICKS || {};

    /**
     * Toggle Component
     */
    global.BRICKS.Toggle = {
        init: function() {
            // 모든 토글 스위치 초기화
            document.querySelectorAll(".toggle").forEach(toggle => {
                if (toggle.hasAttribute("data-bricks-initialized")) return;
                toggle.setAttribute("data-bricks-initialized", "true");

                // ARIA 속성 초기 설정
                const isActive = toggle.classList.contains("toggle--active");
                const isDisabled = toggle.disabled;

                toggle.setAttribute("role", "switch");
                toggle.setAttribute("aria-checked", isActive ? "true" : "false");
                toggle.setAttribute("aria-disabled", isDisabled ? "true" : "false");

                // 레이블이 있는 경우 연결
                const label = toggle.nextElementSibling;
                if (label && label.classList.contains("toggle__label")) {
                    const toggleId = toggle.id || "toggle-" + Math.random().toString(36).substr(2, 9);
                    toggle.id = toggleId;
                    label.setAttribute("for", toggleId);
                }

                // 클릭 이벤트 (기존 onclick과 별도로)
                toggle.addEventListener("click", function(e) {
                    if (!this.disabled) {
                        BRICKS.Toggle.toggle(this);
                    }
                });

                // 키보드 이벤트
                toggle.addEventListener("keydown", function(e) {
                    if (!this.disabled) {
                        BRICKS.Toggle.handleKeydown(e, this);
                    }
                });

                // 포커스 스타일
                toggle.addEventListener("focus", function() {
                    if (!this.disabled) {
                        this.classList.add("toggle--focus");
                    }
                });

                toggle.addEventListener("blur", function() {
                    this.classList.remove("toggle--focus");
                });
            });
        },

        toggle: function(element) {
            if (!element || element.disabled) return;

            const isActive = element.classList.contains("toggle--active");
            const newState = !isActive;

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
                }
            });
            element.dispatchEvent(event);
        },

        handleKeydown: function(e, toggle) {
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
        announceToScreenReader: function(message) {
            const announcement = document.createElement("div");
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