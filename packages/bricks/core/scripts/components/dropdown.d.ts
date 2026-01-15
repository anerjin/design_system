/**
 * BRICKS Design System - Dropdown Component
 * 드롭다운 컴포넌트 모듈
 */
interface DropdownComponent {
    init(): void;
    toggle(dropdown: HTMLElement): void;
    open(dropdown: HTMLElement): void;
    close(dropdown: HTMLElement): void;
    handleToggleKeydown(e: KeyboardEvent, dropdown: HTMLElement): void;
    handleMenuItemKeydown(e: KeyboardEvent, dropdown: HTMLElement, item: HTMLElement): void;
    selectItem(dropdown: HTMLElement, item: HTMLElement): void;
    getNextItem(menu: HTMLElement, currentItem: HTMLElement): HTMLElement | null;
    getPreviousItem(menu: HTMLElement, currentItem: HTMLElement): HTMLElement | null;
    updateFixedPosition(dropdown: HTMLElement): void;
    cleanupFixedDropdown(dropdown: HTMLElement): void;
    closeAll(): void;
}
export { DropdownComponent };
//# sourceMappingURL=dropdown.d.ts.map