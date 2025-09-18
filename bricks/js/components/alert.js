/**
 * BRICKS Design System - Alert & Toast Components
 * 알림 및 토스트 메시지 컴포넌트 모듈
 */

(function(global) {
    "use strict";

    // BRICKS 네임스페이스
    global.BRICKS = global.BRICKS || {};

    /**
     * Toast Component
     */
    global.BRICKS.Toast = {
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
    global.BRICKS.Alert = {
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

})(window);