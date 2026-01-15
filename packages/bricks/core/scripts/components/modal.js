/**
 * BRICKS Design System - Modal Component
 * 모달 다이얼로그 컴포넌트 모듈
 */
(function (global) {
    "use strict";
    // BRICKS 네임스페이스
    global.BRICKS = global.BRICKS || {};
    /**
     * Modal Component
     */
    global.BRICKS.Modal = {
        activeModal: null,
        lastFocusedElement: null,
        init: function () {
            // 백드롭 클릭으로 모달 닫기
            document.addEventListener("click", function (e) {
                const target = e.target;
                if (target.classList.contains("modal") && target.classList.contains("modal--open")) {
                    // static 모달이 아닌 경우에만 닫기
                    if (!target.classList.contains("modal--static")) {
                        global.BRICKS.Modal.close(target.id);
                    }
                }
            });
            // ESC 키로 모달 닫기
            document.addEventListener("keydown", function (e) {
                if (e.key === "Escape") {
                    const openModal = document.querySelector(".modal--open");
                    if (openModal && !openModal.classList.contains("modal--static")) {
                        global.BRICKS.Modal.close(openModal.id);
                    }
                }
            });
        },
        open: function (modalId) {
            const modal = document.getElementById(modalId);
            if (!modal)
                return;
            // 이전 포커스 저장
            this.lastFocusedElement = document.activeElement;
            // 모달 열기
            modal.classList.add("modal--open");
            document.body.style.overflow = "hidden";
            // ARIA 속성 설정
            modal.setAttribute("aria-hidden", "false");
            modal.setAttribute("role", "dialog");
            modal.setAttribute("aria-modal", "true");
            // 모달 다이얼로그에 aria-labelledby 설정
            const dialog = modal.querySelector(".modal__dialog");
            const title = modal.querySelector(".modal__title");
            if (dialog && title) {
                const titleId = title.id || "modal-title-" + modalId;
                title.id = titleId;
                dialog.setAttribute("aria-labelledby", titleId);
            }
            // 모달 body에 aria-describedby 설정
            const body = modal.querySelector(".modal__body");
            if (dialog && body) {
                const bodyId = body.id || "modal-body-" + modalId;
                body.id = bodyId;
                dialog.setAttribute("aria-describedby", bodyId);
            }
            // 포커스 트랩 설정
            this.activeModal = modal;
            this.setupFocusTrap(modal);
            // 첫 번째 포커스 가능한 요소에 포커스
            const firstFocusable = this.getFocusableElements(modal)[0];
            if (firstFocusable) {
                setTimeout(() => firstFocusable.focus(), 100);
            }
            // 스크린 리더에 알림
            this.announceToScreenReader("대화 상자가 열렸습니다");
        },
        close: function (modalId) {
            const modal = document.getElementById(modalId);
            if (!modal)
                return;
            // 모달 닫기
            modal.classList.remove("modal--open");
            document.body.style.overflow = "";
            // ARIA 속성 업데이트
            modal.setAttribute("aria-hidden", "true");
            // 포커스 트랩 제거
            this.removeFocusTrap();
            this.activeModal = null;
            // 이전 포커스로 복원
            if (this.lastFocusedElement) {
                this.lastFocusedElement.focus();
                this.lastFocusedElement = null;
            }
            // 스크린 리더에 알림
            this.announceToScreenReader("대화 상자가 닫혔습니다");
        },
        // 포커스 트랩 설정
        setupFocusTrap: function (modal) {
            const focusHandler = (e) => {
                const target = e.target;
                if (!modal.contains(target)) {
                    e.stopPropagation();
                    const focusableElements = this.getFocusableElements(modal);
                    if (focusableElements.length > 0) {
                        focusableElements[0].focus();
                    }
                }
            };
            const tabHandler = (e) => {
                if (e.key !== "Tab")
                    return;
                const focusableElements = this.getFocusableElements(modal);
                const firstFocusable = focusableElements[0];
                const lastFocusable = focusableElements[focusableElements.length - 1];
                if (e.shiftKey) {
                    // Shift + Tab
                    if (document.activeElement === firstFocusable) {
                        e.preventDefault();
                        lastFocusable.focus();
                    }
                }
                else {
                    // Tab
                    if (document.activeElement === lastFocusable) {
                        e.preventDefault();
                        firstFocusable.focus();
                    }
                }
            };
            // 이벤트 리스너 저장
            modal._focusHandler = focusHandler;
            modal._tabHandler = tabHandler;
            document.addEventListener("focus", focusHandler, true);
            modal.addEventListener("keydown", tabHandler);
        },
        // 포커스 트랩 제거
        removeFocusTrap: function () {
            if (!this.activeModal)
                return;
            if (this.activeModal._focusHandler) {
                document.removeEventListener("focus", this.activeModal._focusHandler, true);
            }
            if (this.activeModal._tabHandler) {
                this.activeModal.removeEventListener("keydown", this.activeModal._tabHandler);
            }
        },
        // 포커스 가능한 요소 가져오기
        getFocusableElements: function (container) {
            const focusableSelectors = [
                'a[href]',
                'button:not([disabled])',
                'input:not([disabled])',
                'textarea:not([disabled])',
                'select:not([disabled])',
                '[tabindex]:not([tabindex="-1"])'
            ];
            return Array.from(container.querySelectorAll(focusableSelectors.join(', ')))
                .filter((el) => {
                // 숨겨진 요소 제외
                const style = window.getComputedStyle(el);
                return style.display !== 'none' && style.visibility !== 'hidden';
            });
        },
        // 스크린 리더 알림
        announceToScreenReader: function (message) {
            const announcement = document.createElement('div');
            announcement.className = 'sr-only';
            announcement.setAttribute('role', 'status');
            announcement.setAttribute('aria-live', 'polite');
            announcement.textContent = message;
            document.body.appendChild(announcement);
            setTimeout(() => {
                document.body.removeChild(announcement);
            }, 1000);
        }
    };
})(window);
export {};
//# sourceMappingURL=modal.js.map