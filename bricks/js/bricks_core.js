/**
 * BRICKS Design System - Core JavaScript
 * 공통 컴포넌트 동작을 위한 핵심 스크립트
 */

(function() {
    "use strict";

    // BRICKS 네임스페이스
    window.BRICKS = window.BRICKS || {};

    /**
     * Dropdown Component
     */
    BRICKS.Dropdown = {
        init: function() {
            // 모든 드롭다운 초기화
            document.querySelectorAll(".dropdown").forEach(dropdown => {
                const toggle = dropdown.querySelector(".dropdown__toggle");
                if (toggle && !toggle.hasAttribute("data-bricks-initialized")) {
                    toggle.setAttribute("data-bricks-initialized", "true");

                    // 클릭 이벤트 바인딩
                    toggle.addEventListener("click", function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        BRICKS.Dropdown.toggle(dropdown);
                    });
                }
            });

            // 외부 클릭 시 드롭다운 닫기
            if (!document.body.hasAttribute("data-bricks-dropdown-listener")) {
                document.body.setAttribute("data-bricks-dropdown-listener", "true");

                document.addEventListener("click", function(e) {
                    if (!e.target.closest(".dropdown")) {
                        BRICKS.Dropdown.closeAll();
                    }
                });

                // ESC 키로 드롭다운 닫기
                document.addEventListener("keydown", function(e) {
                    if (e.key === "Escape") {
                        BRICKS.Dropdown.closeAll();
                    }
                });
            }
        },

        toggle: function(dropdown) {
            if (!dropdown) return;

            const isOpen = dropdown.classList.contains("dropdown--open");

            // 다른 열린 드롭다운 닫기
            this.closeAll();

            // 현재 드롭다운 토글
            if (!isOpen) {
                dropdown.classList.add("dropdown--open");
            }
        },

        closeAll: function() {
            document.querySelectorAll(".dropdown--open").forEach(dropdown => {
                dropdown.classList.remove("dropdown--open");
            });
        }
    };

    /**
     * Modal Component
     */
    BRICKS.Modal = {
        init: function() {
            // 백드롭 클릭으로 모달 닫기
            document.addEventListener("click", function(e) {
                if (e.target.classList.contains("modal") && e.target.classList.contains("modal--open")) {
                    // static 모달이 아닌 경우에만 닫기
                    if (!e.target.classList.contains("modal--static")) {
                        BRICKS.Modal.close(e.target.id);
                    }
                }
            });

            // ESC 키로 모달 닫기
            document.addEventListener("keydown", function(e) {
                if (e.key === "Escape") {
                    const openModal = document.querySelector(".modal--open");
                    if (openModal && !openModal.classList.contains("modal--static")) {
                        BRICKS.Modal.close(openModal.id);
                    }
                }
            });
        },

        open: function(modalId) {
            const modal = document.getElementById(modalId);
            if (!modal) return;

            modal.classList.add("modal--open");
            document.body.style.overflow = "hidden";
        },

        close: function(modalId) {
            const modal = document.getElementById(modalId);
            if (!modal) return;

            modal.classList.remove("modal--open");
            document.body.style.overflow = "";
        }
    };

    /**
     * Toast Component
     */
    BRICKS.Toast = {
        show: function(message, options) {
            // 기본 옵션 설정
            const defaults = {
                type: 'success',
                title: null,
                description: message,
                position: 'top-right',
                duration: 5000,
                dismissible: true
            };

            const config = Object.assign({}, defaults, options);

            // 기존 토스트 제거 (옵션에 따라)
            if (config.clearExisting !== false) {
                document.querySelectorAll('.alert--toast').forEach(el => el.remove());
            }

            // 토스트 엘리먼트 생성
            const toast = document.createElement('div');
            toast.className = `alert alert--${config.type} alert--toast`;

            if (config.dismissible) {
                toast.classList.add('alert--dismissible');
            }

            // 위치 클래스 설정
            const positionParts = config.position.split('-');
            positionParts.forEach(part => {
                toast.classList.add(`alert--toast-${part}`);
            });

            // 아이콘 타입 매핑
            const iconTypes = {
                'success': 'success',
                'warning': 'warning',
                'danger': 'danger',
                'error': 'danger',
                'info': 'info'
            };

            const iconType = iconTypes[config.type] || 'info';

            // HTML 구성
            let html = `<span class="alert__icon icon-${iconType}"></span>`;
            html += '<div class="alert__content">';

            if (config.title) {
                html += `<div class="alert__title">${config.title}</div>`;
            }

            if (config.description) {
                html += `<div class="alert__description">${config.description}</div>`;
            }

            html += '</div>';

            if (config.dismissible) {
                html += `<button type="button" class="alert__close" aria-label="Close" onclick="this.parentElement.remove()">`;
                html += '<span class="icon-close"></span>';
                html += '</button>';
            }

            toast.innerHTML = html;

            // 문서에 추가
            document.body.appendChild(toast);

            // 자동 제거 타이머 설정
            if (config.duration > 0) {
                setTimeout(() => {
                    if (toast && toast.parentElement) {
                        toast.classList.add('alert--fade-out');
                        setTimeout(() => {
                            if (toast && toast.parentElement) {
                                toast.remove();
                            }
                        }, 300);
                    }
                }, config.duration);
            }

            return toast;
        },

        // 간편 메서드들
        success: function(message, options) {
            return this.show(message, Object.assign({type: 'success'}, options));
        },

        error: function(message, options) {
            return this.show(message, Object.assign({type: 'danger'}, options));
        },

        warning: function(message, options) {
            return this.show(message, Object.assign({type: 'warning'}, options));
        },

        info: function(message, options) {
            return this.show(message, Object.assign({type: 'info'}, options));
        },

        // 모든 토스트 제거
        clearAll: function() {
            document.querySelectorAll('.alert--toast').forEach(el => el.remove());
        }
    };

    /**
     * Alert Component
     */
    BRICKS.Alert = {
        dismiss: function(element) {
            // element가 문자열(ID)인 경우
            if (typeof element === 'string') {
                element = document.getElementById(element);
            }

            // 가장 가까운 alert 엘리먼트 찾기
            const alert = element.closest('.alert');
            if (alert) {
                alert.style.display = 'none';
            }
        },

        init: function() {
            // dismissible alert의 close 버튼에 이벤트 바인딩
            document.addEventListener('click', function(e) {
                if (e.target.closest('.alert__close')) {
                    const alert = e.target.closest('.alert');
                    if (alert) {
                        BRICKS.Alert.dismiss(alert);
                    }
                }
            });
        }
    };

    /**
     * 초기화
     */
    BRICKS.init = function() {
        BRICKS.Dropdown.init();
        BRICKS.Modal.init();
        BRICKS.Alert.init();
    };

    // DOM 로드 시 초기화
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", BRICKS.init);
    } else {
        BRICKS.init();
    }

    // MutationObserver로 동적 콘텐츠 감지
    const observer = new MutationObserver(function() {
        BRICKS.init();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

})();
