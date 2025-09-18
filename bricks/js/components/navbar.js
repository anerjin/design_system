/**
 * BRICKS Design System - Navbar Component
 * 상단 네비게이션 바 컴포넌트
 */

(function(global) {
    "use strict";

    global.BRICKS = global.BRICKS || {};

    /**
     * Navbar Component
     * 상단 네비게이션 바 컴포넌트
     */
    global.BRICKS.Navbar = {
        init: function() {
            // 모든 네비게이션 바 초기화
            document.querySelectorAll('[data-navbar]').forEach(navbar => {
                // 이미 초기화된 경우 스킵
                if (navbar.hasAttribute('data-bricks-navbar-initialized')) {
                    return;
                }

                navbar.setAttribute('data-bricks-navbar-initialized', 'true');

                // 모바일 토글 버튼 찾기
                const toggleButton = navbar.querySelector('[data-navbar-toggle]');
                if (toggleButton) {
                    toggleButton.addEventListener('click', (e) => {
                        e.preventDefault();
                        global.BRICKS.Navbar.toggleMobile(navbar);
                    });
                }

                // 드롭다운 메뉴 처리
                const dropdowns = navbar.querySelectorAll('.navbar__dropdown');
                dropdowns.forEach(dropdown => {
                    const toggle = dropdown.querySelector('.navbar__dropdown-toggle');
                    const menu = dropdown.querySelector('.navbar__dropdown-menu');

                    if (toggle && menu) {
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
                            } else if (e.key === 'Escape') {
                                global.BRICKS.Navbar.closeDropdown(dropdown);
                            }
                        });

                        // 드롭다운 아이템 키보드 네비게이션
                        const items = menu.querySelectorAll('.navbar__dropdown-item');
                        items.forEach((item, index) => {
                            item.setAttribute('tabindex', '0');
                            item.addEventListener('keydown', (e) => {
                                if (e.key === 'ArrowDown') {
                                    e.preventDefault();
                                    const nextItem = items[index + 1];
                                    if (nextItem) nextItem.focus();
                                } else if (e.key === 'ArrowUp') {
                                    e.preventDefault();
                                    const prevItem = items[index - 1];
                                    if (prevItem) prevItem.focus();
                                    else toggle.focus();
                                } else if (e.key === 'Escape') {
                                    global.BRICKS.Navbar.closeDropdown(dropdown);
                                    toggle.focus();
                                }
                            });
                        });
                    }
                });

                // 링크 활성 상태 처리
                const links = navbar.querySelectorAll('.navbar__link');
                links.forEach(link => {
                    link.addEventListener('click', function() {
                        // 현재 활성 링크 제거
                        navbar.querySelectorAll('.navbar__link--active').forEach(active => {
                            active.classList.remove('navbar__link--active');
                        });
                        // 새 활성 링크 설정
                        this.classList.add('navbar__link--active');
                    });
                });

                // 스크롤 시 navbar 스타일 변경 (sticky/fixed navbar용)
                if (navbar.classList.contains('navbar--sticky') || navbar.classList.contains('navbar--fixed')) {
                    let lastScroll = 0;
                    window.addEventListener('scroll', () => {
                        const currentScroll = window.pageYOffset;

                        if (currentScroll > 50) {
                            navbar.classList.add('navbar--scrolled');
                        } else {
                            navbar.classList.remove('navbar--scrolled');
                        }

                        // 스크롤 방향 감지
                        if (currentScroll > lastScroll && currentScroll > 100) {
                            navbar.classList.add('navbar--hidden');
                        } else {
                            navbar.classList.remove('navbar--hidden');
                        }
                        lastScroll = currentScroll;
                    });
                }

                // 외부 클릭 시 드롭다운 닫기
                document.addEventListener('click', (e) => {
                    if (!navbar.contains(e.target)) {
                        global.BRICKS.Navbar.closeAllDropdowns(navbar);
                    }
                });

                // ESC 키로 모바일 메뉴 닫기
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape' && navbar.classList.contains('navbar--mobile-open')) {
                        global.BRICKS.Navbar.closeMobile(navbar);
                    }
                });
            });
        },

        // 모바일 메뉴 토글
        toggleMobile: function(navbar) {
            if (navbar.classList.contains('navbar--mobile-open')) {
                global.BRICKS.Navbar.closeMobile(navbar);
            } else {
                global.BRICKS.Navbar.openMobile(navbar);
            }
        },

        // 모바일 메뉴 열기
        openMobile: function(navbar) {
            navbar.classList.add('navbar--mobile-open');
            const toggle = navbar.querySelector('[data-navbar-toggle]');
            if (toggle) {
                toggle.setAttribute('aria-expanded', 'true');
            }

            // 커스텀 이벤트 발생
            const event = new CustomEvent('navbarMobileOpen', {
                detail: { navbar: navbar }
            });
            navbar.dispatchEvent(event);
        },

        // 모바일 메뉴 닫기
        closeMobile: function(navbar) {
            navbar.classList.remove('navbar--mobile-open');
            const toggle = navbar.querySelector('[data-navbar-toggle]');
            if (toggle) {
                toggle.setAttribute('aria-expanded', 'false');
            }

            // 커스텀 이벤트 발생
            const event = new CustomEvent('navbarMobileClose', {
                detail: { navbar: navbar }
            });
            navbar.dispatchEvent(event);
        },

        // 드롭다운 토글
        toggleDropdown: function(dropdown) {
            const menu = dropdown.querySelector('.navbar__dropdown-menu');
            const toggle = dropdown.querySelector('.navbar__dropdown-toggle');
            const isOpen = dropdown.classList.contains('navbar__dropdown--open');

            if (isOpen) {
                global.BRICKS.Navbar.closeDropdown(dropdown);
            } else {
                // 다른 드롭다운 닫기
                const navbar = dropdown.closest('.navbar');
                global.BRICKS.Navbar.closeAllDropdowns(navbar);

                // 현재 드롭다운 열기
                dropdown.classList.add('navbar__dropdown--open');
                if (menu) {
                    menu.style.visibility = 'visible';
                    menu.style.opacity = '1';
                    menu.style.transform = 'translateY(0)';
                }
                if (toggle) {
                    toggle.setAttribute('aria-expanded', 'true');
                }
            }
        },

        // 드롭다운 닫기
        closeDropdown: function(dropdown) {
            const menu = dropdown.querySelector('.navbar__dropdown-menu');
            const toggle = dropdown.querySelector('.navbar__dropdown-toggle');

            dropdown.classList.remove('navbar__dropdown--open');
            if (menu) {
                menu.style.visibility = 'hidden';
                menu.style.opacity = '0';
                menu.style.transform = 'translateY(-10px)';
            }
            if (toggle) {
                toggle.setAttribute('aria-expanded', 'false');
            }
        },

        // 모든 드롭다운 닫기
        closeAllDropdowns: function(navbar) {
            const dropdowns = navbar.querySelectorAll('.navbar__dropdown');
            dropdowns.forEach(dropdown => {
                global.BRICKS.Navbar.closeDropdown(dropdown);
            });
        },

        // 프로그래밍적으로 링크 활성화
        setActive: function(navbar, linkSelector) {
            const navbarEl = typeof navbar === 'string'
                ? document.querySelector(navbar)
                : navbar;

            if (!navbarEl) return;

            // 현재 활성 링크 제거
            navbarEl.querySelectorAll('.navbar__link--active').forEach(active => {
                active.classList.remove('navbar__link--active');
            });

            // 새 활성 링크 설정
            const targetLink = navbarEl.querySelector(linkSelector);
            if (targetLink) {
                targetLink.classList.add('navbar__link--active');
            }
        },

        // 검색 입력 포커스
        focusSearch: function(navbar) {
            const navbarEl = typeof navbar === 'string'
                ? document.querySelector(navbar)
                : navbar;

            if (!navbarEl) return;

            const searchInput = navbarEl.querySelector('.navbar__search-input');
            if (searchInput) {
                searchInput.focus();
            }
        }
    };

})(window);