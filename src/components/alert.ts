/**
 * BRICKS Design System - Alert & Toast Components
 * 알림 및 토스트 메시지 컴포넌트 모듈
 */

import type { AlertOptions, ToastOptions } from '../types/index';

interface ToastComponent {
    show(message: string, options?: ToastOptions): HTMLElement;
    success(message: string, options?: ToastOptions): HTMLElement;
    error(message: string, options?: ToastOptions): HTMLElement;
    warning(message: string, options?: ToastOptions): HTMLElement;
    info(message: string, options?: ToastOptions): HTMLElement;
    clearAll(): void;
}

interface AlertComponent {
    dismiss(element: string | HTMLElement): void;
    init(): void;
}



(function(global: Window) {
    "use strict";

    // BRICKS 네임스페이스
    global.BRICKS = global.BRICKS || {} as any;

    /**
     * Toast Component
     */
    global.BRICKS.Toast = {
        show: function(message: string, options?: ToastOptions): HTMLElement {
            // 기본 옵션 설정
            const defaults: Required<ToastOptions> = {
                type: 'success',
                title: null,
                description: message,
                position: 'top-right',
                duration: 5000,
                dismissible: true,
                clearExisting: true
            };

            const config: Required<ToastOptions> = Object.assign({}, defaults, options);

            // 기존 토스트 제거 (옵션에 따라)
            if (config.clearExisting !== false) {
                document.querySelectorAll('.alert--toast').forEach(el => el.remove());
            }

            // 토스트 엘리먼트 생성
            const toast: HTMLElement = document.createElement('div');
            toast.className = `alert alert--${config.type} alert--toast`;

            if (config.dismissible) {
                toast.classList.add('alert--dismissible');
            }

            // 위치 클래스 설정
            const positionParts: string[] = config.position.split('-');
            positionParts.forEach(part => {
                toast.classList.add(`alert--toast-${part}`);
            });

            // 아이콘 타입 매핑
            const iconTypes: Record<string, string> = {
                'success': 'success',
                'warning': 'warning',
                'danger': 'danger',
                'error': 'danger',
                'info': 'info'
            };

            const iconType: string = iconTypes[config.type] || 'info';

            // HTML 구성
            let html: string = `<span class="alert__icon icon-${iconType}"></span>`;
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
        success: function(message: string, options?: ToastOptions): HTMLElement {
            return this.show(message, Object.assign({type: 'success'}, options));
        },

        error: function(message: string, options?: ToastOptions): HTMLElement {
            return this.show(message, Object.assign({type: 'danger'}, options));
        },

        warning: function(message: string, options?: ToastOptions): HTMLElement {
            return this.show(message, Object.assign({type: 'warning'}, options));
        },

        info: function(message: string, options?: ToastOptions): HTMLElement {
            return this.show(message, Object.assign({type: 'info'}, options));
        },

        // 모든 토스트 제거
        clearAll: function(): void {
            document.querySelectorAll('.alert--toast').forEach(el => el.remove());
        }
    };

    /**
     * Alert Component
     */
    global.BRICKS.Alert = {
        dismiss: function(element: string | HTMLElement): void {
            let alertElement: HTMLElement | null = null;

            // element가 문자열(ID)인 경우
            if (typeof element === 'string') {
                alertElement = document.getElementById(element);
            } else {
                alertElement = element;
            }

            if (!alertElement) return;

            // 가장 가까운 alert 엘리먼트 찾기
            const alert: HTMLElement | null = alertElement.closest('.alert');
            if (alert) {
                alert.style.display = 'none';
            }
        },

        init: function(): void {
            // dismissible alert의 close 버튼에 이벤트 바인딩
            document.addEventListener('click', function(e: Event) {
                const target = e.target as HTMLElement;
                if (target.closest('.alert__close')) {
                    const alert: HTMLElement | null = target.closest('.alert');
                    if (alert) {
                        global.BRICKS.Alert.dismiss(alert);
                    }
                }
            });
        }
    };

})(window);

export { ToastOptions, ToastComponent, AlertComponent };