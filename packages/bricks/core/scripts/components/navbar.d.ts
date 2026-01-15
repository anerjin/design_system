/**
 * BRICKS Design System - Navbar Component
 * 상단 네비게이션 바 컴포넌트
 */
interface NavbarComponent {
    init(): void;
    toggleMobile(navbar: HTMLElement): void;
    toggleDropdown(dropdown: HTMLElement): void;
    closeAllDropdowns(navbar: HTMLElement): void;
    handleOutsideClick(e: Event): void;
    handleEscapeKey(e: KeyboardEvent): void;
}
export { NavbarComponent };
//# sourceMappingURL=navbar.d.ts.map