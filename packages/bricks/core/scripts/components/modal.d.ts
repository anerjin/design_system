/**
 * BRICKS Design System - Modal Component
 * 모달 다이얼로그 컴포넌트 모듈
 */
interface ModalComponent {
    activeModal: HTMLElement | null;
    lastFocusedElement: Element | null;
    init(): void;
    open(modalId: string): void;
    close(modalId: string): void;
    setupFocusTrap(modal: HTMLElement): void;
    removeFocusTrap(): void;
    getFocusableElements(container: HTMLElement): HTMLElement[];
    announceToScreenReader(message: string): void;
}
export { ModalComponent };
//# sourceMappingURL=modal.d.ts.map