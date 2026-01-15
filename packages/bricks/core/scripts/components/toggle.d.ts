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
export { ToggleComponent, ToggleChangeDetail };
//# sourceMappingURL=toggle.d.ts.map