/**
 * BRICKS Design System - Navbar Component
 * 상단 네비게이션 바 컴포넌트
 */
(function (global) {
    "use strict";
    global.BRICKS = global.BRICKS || {};
    /**
     * Navbar Component
     * 상단 네비게이션 바 컴포넌트
     */
    global.BRICKS.Navbar = {
        init: function () {
            // 모든 네비게이션 바 초기화
            document.querySelectorAll('[data-navbar]').forEach((navbar) => {
                const navbarEl = navbar;
                // 이미 초기화된 경우 스킵
                if (navbarEl.hasAttribute('data-bricks-navbar-initialized')) {
                    return;
                }
                navbarEl.setAttribute('data-bricks-navbar-initialized', 'true');
                // 모바일 토글 버튼 찾기
                const toggleButton = navbarEl.querySelector('[data-navbar-toggle]');
                if (toggleButton) {
                    toggleButton.setAttribute('aria-expanded', 'false');
                    toggleButton.setAttribute('aria-controls', 'navbar-menu');
                    toggleButton.addEventListener('click', (e) => {
                        e.preventDefault();
                        global.BRICKS.Navbar.toggleMobile(navbarEl);
                    });
                    // 키보드 접근성
                    toggleButton.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            global.BRICKS.Navbar.toggleMobile(navbarEl);
                        }
                    });
                }
                // 메뉴에 ID 설정
                const menu = navbarEl.querySelector('.navbar__menu');
                if (menu && !menu.id) {
                    menu.id = 'navbar-menu';
                }
                // 드롭다운 메뉴 처리
                const dropdowns = navbarEl.querySelectorAll('.navbar__dropdown');
                dropdowns.forEach((dropdown) => {
                    const toggle = dropdown.querySelector('.navbar__dropdown-toggle');
                    const menu = dropdown.querySelector('.navbar__dropdown-menu');
                    if (toggle && menu) {
                        // ARIA 속성 설정
                        const menuId = 'dropdown-menu-' + Math.random().toString(36).substr(2, 9);
                        menu.id = menuId;
                        toggle.setAttribute('aria-expanded', 'false');
                        toggle.setAttribute('aria-haspopup', 'menu');
                        toggle.setAttribute('aria-controls', menuId);
                        // 클릭 이벤트
                        toggle.addEventListener('click', (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            global.BRICKS.Navbar.toggleDropdown(dropdown);
                        });
                        // 키보드 접근성
                        toggle.addEventListener('keydown', (e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                global.BRICKS.Navbar.toggleDropdown(dropdown);
                            }
                            else if (e.key === 'ArrowDown') {
                                e.preventDefault();
                                if (!dropdown.classList.contains('navbar__dropdown--open')) {
                                    global.BRICKS.Navbar.toggleDropdown(dropdown);
                                }
                                // 첫 번째 메뉴 아이템에 포커스
                                const firstItem = menu.querySelector('a, button');
                                if (firstItem) {
                                    firstItem.focus();
                                }
                            }
                        });
                        // 메뉴 아이템 키보드 네비게이션
                        const menuItems = menu.querySelectorAll('a, button');
                        menuItems.forEach((item, index) => {
                            item.addEventListener('keydown', (e) => {
                                switch (e.key) {
                                    case 'ArrowDown':
                                        e.preventDefault();
                                        const nextIndex = (index + 1) % menuItems.length;
                                        menuItems[nextIndex].focus();
                                        break;
                                    case 'ArrowUp':
                                        e.preventDefault();
                                        const prevIndex = index === 0 ? menuItems.length - 1 : index - 1;
                                        menuItems[prevIndex].focus();
                                        break;
                                    case 'Escape':
                                        e.preventDefault();
                                        global.BRICKS.Navbar.toggleDropdown(dropdown);
                                        toggle.focus();
                                        break;
                                    case 'Tab':
                                        // Tab으로 드롭다운 밖으로 나가면 닫기
                                        setTimeout(() => {
                                            if (!dropdown.contains(document.activeElement)) {
                                                dropdown.classList.remove('navbar__dropdown--open');
                                                toggle.setAttribute('aria-expanded', 'false');
                                            }
                                        }, 0);
                                        break;
                                }
                            });
                        });
                    }
                });
                // 외부 클릭 이벤트 리스너 등록 (한 번만)
                if (!document.body.hasAttribute('data-navbar-listeners')) {
                    document.body.setAttribute('data-navbar-listeners', 'true');
                    document.addEventListener('click', this.handleOutsideClick.bind(this));
                    document.addEventListener('keydown', this.handleEscapeKey.bind(this));
                }
            });
        },
        toggleMobile: function (navbar) {
            const menu = navbar.querySelector('.navbar__menu');
            const toggleButton = navbar.querySelector('[data-navbar-toggle]');
            if (!menu || !toggleButton)
                return;
            const isOpen = navbar.classList.contains('navbar--mobile-open');
            if (isOpen) {
                navbar.classList.remove('navbar--mobile-open');
                toggleButton.setAttribute('aria-expanded', 'false');
                menu.setAttribute('aria-hidden', 'true');
            }
            else {
                navbar.classList.add('navbar--mobile-open');
                toggleButton.setAttribute('aria-expanded', 'true');
                menu.setAttribute('aria-hidden', 'false');
            }
            // 커스텀 이벤트 발생
            const event = new CustomEvent('navbarToggle', {
                detail: {
                    navbar: navbar,
                    isOpen: !isOpen
                }
            });
            navbar.dispatchEvent(event);
        },
        toggleDropdown: function (dropdown) {
            const toggle = dropdown.querySelector('.navbar__dropdown-toggle');
            const menu = dropdown.querySelector('.navbar__dropdown-menu');
            if (!toggle || !menu)
                return;
            // 다른 드롭다운 닫기
            const navbar = dropdown.closest('[data-navbar]');
            if (navbar) {
                this.closeAllDropdowns(navbar);
            }
            const isOpen = dropdown.classList.contains('navbar__dropdown--open');
            if (isOpen) {
                dropdown.classList.remove('navbar__dropdown--open');
                toggle.setAttribute('aria-expanded', 'false');
                menu.setAttribute('aria-hidden', 'true');
            }
            else {
                dropdown.classList.add('navbar__dropdown--open');
                toggle.setAttribute('aria-expanded', 'true');
                menu.setAttribute('aria-hidden', 'false');
            }
            // 커스텀 이벤트 발생
            const event = new CustomEvent('navbarDropdownToggle', {
                detail: {
                    dropdown: dropdown,
                    isOpen: !isOpen
                }
            });
            dropdown.dispatchEvent(event);
        },
        closeAllDropdowns: function (navbar) {
            const dropdowns = navbar.querySelectorAll('.navbar__dropdown--open');
            dropdowns.forEach((dropdown) => {
                const toggle = dropdown.querySelector('.navbar__dropdown-toggle');
                const menu = dropdown.querySelector('.navbar__dropdown-menu');
                dropdown.classList.remove('navbar__dropdown--open');
                if (toggle) {
                    toggle.setAttribute('aria-expanded', 'false');
                }
                if (menu) {
                    menu.setAttribute('aria-hidden', 'true');
                }
            });
        },
        handleOutsideClick: function (e) {
            const target = e.target;
            // 모든 네비게이션 바 확인
            document.querySelectorAll('[data-navbar]').forEach((navbar) => {
                const navbarEl = navbar;
                // 클릭이 네비게이션 바 외부인 경우
                if (!navbarEl.contains(target)) {
                    // 모바일 메뉴 닫기
                    if (navbarEl.classList.contains('navbar--mobile-open')) {
                        this.toggleMobile(navbarEl);
                    }
                    // 드롭다운 메뉴 닫기
                    this.closeAllDropdowns(navbarEl);
                }
            });
        },
        handleEscapeKey: function (e) {
            if (e.key === 'Escape') {
                // 모든 네비게이션 바의 열린 요소들 닫기
                document.querySelectorAll('[data-navbar]').forEach((navbar) => {
                    const navbarEl = navbar;
                    // 모바일 메뉴 닫기
                    if (navbarEl.classList.contains('navbar--mobile-open')) {
                        this.toggleMobile(navbarEl);
                    }
                    // 드롭다운 메뉴 닫기
                    this.closeAllDropdowns(navbarEl);
                });
            }
        }
    };
})(window);
export {};
//# sourceMappingURL=navbar.js.map