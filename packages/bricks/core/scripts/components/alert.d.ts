/**
 * BRICKS Design System - Alert & Toast Components
 * 알림 및 토스트 메시지 컴포넌트 모듈
 */
import type { ToastOptions } from '../types/index';
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
export { ToastOptions, ToastComponent, AlertComponent };
//# sourceMappingURL=alert.d.ts.map