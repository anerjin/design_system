/**
 * BRICKS Design System - Dropdown Component
 * 드롭다운 컴포넌트 모듈
 */

(function(global) {
    "use strict";

    // BRICKS 네임스페이스
    global.BRICKS = global.BRICKS || {};

    /**
     * Dropdown Component
     */
    global.BRICKS.Dropdown = {
        init: function() {
            // 모든 드롭다운 초기화
            document.querySelectorAll(".dropdown").forEach(dropdown => {
                const toggle = dropdown.querySelector(".dropdown__toggle");
                const menu = dropdown.querySelector(".dropdown__menu");

                if (toggle && !toggle.hasAttribute("data-bricks-initialized")) {
                    toggle.setAttribute("data-bricks-initialized", "true");

                    // ARIA 속성 초기 설정
                    const dropdownId = dropdown.id || "dropdown-" + Math.random().toString(36).substr(2, 9);
                    dropdown.id = dropdownId;

                    toggle.setAttribute("aria-expanded", "false");
                    toggle.setAttribute("aria-haspopup", "menu");
                    toggle.setAttribute("aria-controls", dropdownId + "-menu");

                    if (menu) {
                        menu.id = dropdownId + "-menu";
                        menu.setAttribute("role", "menu");
                        menu.setAttribute("aria-labelledby", toggle.id || (toggle.id = dropdownId + "-toggle"));

                        // 메뉴 아이템에 role 설정
                        menu.querySelectorAll(".dropdown__item").forEach((item, index) => {
                            item.setAttribute("role", "menuitem");
                            item.setAttribute("tabindex", "-1");
                            if (item.classList.contains("dropdown__item--disabled")) {
                                item.setAttribute("aria-disabled", "true");
                            }
                        });
                    }

                    // 클릭 이벤트 바인딩
                    toggle.addEventListener("click", function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        BRICKS.Dropdown.toggle(dropdown);
                    });

                    // 키보드 이벤트 추가
                    toggle.addEventListener("keydown", function(e) {
                        BRICKS.Dropdown.handleToggleKeydown(e, dropdown);
                    });

                    // 메뉴 아이템 키보드 이벤트
                    if (menu) {
                        menu.querySelectorAll(".dropdown__item").forEach(item => {
                            item.addEventListener("keydown", function(e) {
                                BRICKS.Dropdown.handleMenuItemKeydown(e, dropdown, item);
                            });

                            item.addEventListener("click", function(e) {
                                e.preventDefault(); // # 링크의 기본 동작 방지
                                if (!item.classList.contains("dropdown__item--disabled")) {
                                    BRICKS.Dropdown.selectItem(dropdown, item);
                                }
                            });
                        });
                    }
                }
            });

            // 외부 클릭 시 드롭다운 닫기
            if (!document.body.hasAttribute("data-bricks-dropdown-listener")) {
                document.body.setAttribute("data-bricks-dropdown-listener", "true");

                document.addEventListener("click", function(e) {
                    // Fixed 드롭다운 메뉴 체크
                    if (!e.target.closest(".dropdown") && !e.target.closest(".dropdown__menu--fixed")) {
                        BRICKS.Dropdown.closeAll();
                    }
                });

                // ESC 키로 드롭다운 닫기
                document.addEventListener("keydown", function(e) {
                    if (e.key === "Escape") {
                        const openDropdown = document.querySelector(".dropdown--open");
                        if (openDropdown) {
                            BRICKS.Dropdown.close(openDropdown);
                            const toggle = openDropdown.querySelector(".dropdown__toggle");
                            if (toggle) toggle.focus();
                        }
                    }
                });

                // ==================== Fixed Dropdown Position Update ====================
                // 스크롤이나 리사이즈 시 Fixed 드롭다운 위치 업데이트
                let updateTimer;
                const updateFixedDropdowns = function() {
                    clearTimeout(updateTimer);
                    updateTimer = setTimeout(function() {
                        document.querySelectorAll(".dropdown--fixed.dropdown--open").forEach(dropdown => {
                            BRICKS.Dropdown.updateFixedPosition(dropdown);
                        });
                    }, 10);
                };

                window.addEventListener("scroll", updateFixedDropdowns, true);
                window.addEventListener("resize", updateFixedDropdowns);
                // ========================================================================
            }
        },

        // 토글 키보드 핸들러
        handleToggleKeydown: function(e, dropdown) {
            // Fixed 드롭다운의 경우 body에서 메뉴를 찾아야 함
            let menu = dropdown.querySelector(".dropdown__menu");
            if (!menu) {
                const menuId = dropdown.getAttribute("data-menu-id");
                if (menuId) {
                    menu = document.querySelector(`.dropdown__menu--fixed[data-dropdown-id="${menuId}"]`);
                }
            }

            const isOpen = dropdown.classList.contains("dropdown--open");

            switch(e.key) {
                case "Enter":
                case " ":
                    e.preventDefault();
                    if (!isOpen) {
                        this.open(dropdown);
                    } else {
                        this.close(dropdown);
                    }
                    break;

                case "ArrowDown":
                    e.preventDefault();
                    if (!isOpen) {
                        this.open(dropdown);
                        // 드롭다운이 열린 후 첫 번째 메뉴 아이템에 포커스
                        setTimeout(() => {
                            const firstItem = menu.querySelector(".dropdown__item:not(.dropdown__item--disabled)");
                            if (firstItem) {
                                firstItem.focus();
                                firstItem.setAttribute("tabindex", "0");
                            }
                        }, 100);
                    } else {
                        // 이미 열려있으면 첫 번째 아이템으로 포커스 이동
                        const firstItem = menu.querySelector(".dropdown__item:not(.dropdown__item--disabled)");
                        if (firstItem) {
                            firstItem.focus();
                            firstItem.setAttribute("tabindex", "0");
                        }
                    }
                    break;

                case "ArrowUp":
                    e.preventDefault();
                    if (!isOpen) {
                        this.open(dropdown);
                        // 드롭다운이 열린 후 마지막 메뉴 아이템에 포커스
                        setTimeout(() => {
                            const lastItem = Array.from(menu.querySelectorAll(".dropdown__item:not(.dropdown__item--disabled)")).pop();
                            if (lastItem) {
                                lastItem.focus();
                                lastItem.setAttribute("tabindex", "0");
                            }
                        }, 100);
                    } else {
                        // 이미 열려있으면 마지막 아이템으로 포커스 이동
                        const lastItem = Array.from(menu.querySelectorAll(".dropdown__item:not(.dropdown__item--disabled)")).pop();
                        if (lastItem) {
                            lastItem.focus();
                            lastItem.setAttribute("tabindex", "0");
                        }
                    }
                    break;

                case "Escape":
                    if (isOpen) {
                        e.preventDefault();
                        this.close(dropdown);
                    }
                    break;
            }
        },

        // 메뉴 아이템 키보드 핸들러
        handleMenuItemKeydown: function(e, dropdown, currentItem) {
            // Fixed 드롭다운의 경우 body에서 메뉴를 찾아야 함
            let menu = dropdown.querySelector(".dropdown__menu");
            if (!menu) {
                const menuId = dropdown.getAttribute("data-menu-id");
                if (menuId) {
                    menu = document.querySelector(`.dropdown__menu--fixed[data-dropdown-id="${menuId}"]`);
                }
            }

            if (!menu) return;

            const items = Array.from(menu.querySelectorAll(".dropdown__item:not(.dropdown__item--disabled)"));
            const currentIndex = items.indexOf(currentItem);

            let targetItem = null;

            switch(e.key) {
                case "ArrowDown":
                    e.preventDefault();
                    targetItem = items[currentIndex + 1] || items[0];
                    break;

                case "ArrowUp":
                    e.preventDefault();
                    targetItem = items[currentIndex - 1] || items[items.length - 1];
                    break;

                case "Home":
                    e.preventDefault();
                    targetItem = items[0];
                    break;

                case "End":
                    e.preventDefault();
                    targetItem = items[items.length - 1];
                    break;

                case "Enter":
                case " ":
                    e.preventDefault();
                    this.selectItem(dropdown, currentItem);
                    break;

                case "Escape":
                    e.preventDefault();
                    this.close(dropdown);
                    const toggle = dropdown.querySelector(".dropdown__toggle");
                    if (toggle) toggle.focus();
                    break;

                case "Tab":
                    // Tab 키로 드롭다운 닫기
                    this.close(dropdown);
                    break;
            }

            if (targetItem) {
                // 모든 아이템의 tabindex를 -1로 설정
                items.forEach(item => item.setAttribute("tabindex", "-1"));
                // 타겟 아이템에 포커스와 tabindex 0 설정
                targetItem.setAttribute("tabindex", "0");
                targetItem.focus();
            }
        },

        // 아이템 선택
        selectItem: function(dropdown, item) {
            if (!item || item.classList.contains("dropdown__item--disabled")) return;

            const toggle = dropdown.querySelector(".dropdown__toggle");

            // Fixed 드롭다운의 경우 body에서 메뉴를 찾아야 함
            let menu = dropdown.querySelector(".dropdown__menu");
            if (!menu) {
                const menuId = dropdown.getAttribute("data-menu-id");
                if (menuId) {
                    menu = document.querySelector(`.dropdown__menu--fixed[data-dropdown-id="${menuId}"]`);
                }
            }

            // menu가 null인 경우 처리
            if (!menu) return;

            // 이전 선택 제거
            menu.querySelectorAll(".dropdown__item--active").forEach(activeItem => {
                activeItem.classList.remove("dropdown__item--active");
                activeItem.setAttribute("aria-selected", "false");
            });

            // 새 선택 추가
            item.classList.add("dropdown__item--active");
            item.setAttribute("aria-selected", "true");

            // 토글 버튼 텍스트 업데이트 (선택 가능한 드롭다운의 경우)
            if (dropdown.classList.contains("dropdown--select") && toggle) {
                const text = item.textContent.trim();
                const icons = toggle.querySelectorAll("svg");
                toggle.textContent = text;
                // 모든 SVG 아이콘을 다시 추가 (여러 개 있을 수 있음)
                icons.forEach(icon => toggle.appendChild(icon));
            }

            // 드롭다운 닫기
            this.close(dropdown);

            // 포커스를 토글 버튼으로
            if (toggle) toggle.focus();

            // 커스텀 이벤트 발생
            const event = new CustomEvent("dropdownSelect", {
                detail: {
                    dropdown: dropdown,
                    item: item,
                    value: item.textContent.trim()
                }
            });
            dropdown.dispatchEvent(event);
        },

        open: function(dropdown) {
            if (!dropdown) return;

            const toggle = dropdown.querySelector(".dropdown__toggle");
            const menu = dropdown.querySelector(".dropdown__menu");

            // 다른 열린 드롭다운 닫기
            this.closeAll();

            dropdown.classList.add("dropdown--open");

            if (toggle) {
                toggle.setAttribute("aria-expanded", "true");
            }

            if (menu) {
                // 스크린 리더 알림
                this.announceToScreenReader("드롭다운 메뉴가 열렸습니다");
            }

            // Fixed 모드인 경우 특별 처리
            if (dropdown.classList.contains("dropdown--fixed")) {
                this.setupFixedDropdown(dropdown);
            }
        },

        close: function(dropdown) {
            if (!dropdown) return;

            const toggle = dropdown.querySelector(".dropdown__toggle");

            // Fixed 드롭다운의 경우 body에서 메뉴를 찾아야 함
            let menu = dropdown.querySelector(".dropdown__menu");
            if (!menu) {
                const menuId = dropdown.getAttribute("data-menu-id");
                if (menuId) {
                    menu = document.querySelector(`.dropdown__menu--fixed[data-dropdown-id="${menuId}"]`);
                }
            }

            dropdown.classList.remove("dropdown--open");

            if (toggle) {
                toggle.setAttribute("aria-expanded", "false");
            }

            if (menu) {
                // 모든 메뉴 아이템의 tabindex를 -1로 재설정
                menu.querySelectorAll(".dropdown__item").forEach(item => {
                    item.setAttribute("tabindex", "-1");
                });
            }

            // Fixed 드롭다운 정리
            if (dropdown.classList.contains("dropdown--fixed")) {
                this.cleanupFixedDropdown(dropdown);
            }
        },

        toggle: function(dropdown) {
            if (!dropdown) return;

            const isOpen = dropdown.classList.contains("dropdown--open");

            if (isOpen) {
                this.close(dropdown);
            } else {
                this.open(dropdown);
            }
        },

        // 스크린 리더 알림
        announceToScreenReader: function(message) {
            const announcement = document.createElement("div");
            announcement.className = "sr-only";
            announcement.setAttribute("role", "status");
            announcement.setAttribute("aria-live", "polite");
            announcement.textContent = message;

            document.body.appendChild(announcement);

            setTimeout(() => {
                if (announcement.parentElement) {
                    document.body.removeChild(announcement);
                }
            }, 1000);
        },

        // ==================== Fixed Dropdown Helper Methods ====================
        setupFixedDropdown: function(dropdown) {
            const menu = dropdown.querySelector(".dropdown__menu");
            const toggle = dropdown.querySelector(".dropdown__toggle");

            if (!menu || !toggle) return;

            // 이미 fixed 처리가 되어있으면 리턴
            if (menu.classList.contains("dropdown__menu--fixed")) {
                this.updateFixedPosition(dropdown);
                return;
            }

            // 메뉴를 body로 이동
            menu.classList.add("dropdown__menu--fixed");
            menu.style.position = "fixed";
            menu.style.zIndex = "9999";

            // 애니메이션을 위한 초기 설정
            menu.style.opacity = "0";
            menu.style.transform = "translateY(-8px)";
            menu.style.transition = "opacity 0.2s ease, transform 0.2s ease";

            // data attribute로 원래 부모 저장
            const dropdownId = dropdown.getAttribute("id") || "dropdown-" + Math.random().toString(36).substr(2, 9);
            dropdown.setAttribute("id", dropdownId);
            menu.setAttribute("data-dropdown-id", dropdownId);
            dropdown.setAttribute("data-menu-id", dropdownId);

            // ARIA 속성 유지
            if (menu.id) {
                toggle.setAttribute("aria-controls", menu.id);
            }

            // 메뉴 아이템 이벤트 리스너 다시 바인딩
            menu.querySelectorAll(".dropdown__item").forEach(item => {
                // 기존 리스너 제거를 위해 clone 사용
                const newItem = item.cloneNode(true);
                item.parentNode.replaceChild(newItem, item);

                // 새로운 리스너 추가
                newItem.addEventListener("click", (e) => {
                    e.preventDefault();
                    if (!newItem.classList.contains("dropdown__item--disabled")) {
                        this.selectItem(dropdown, newItem);
                    }
                });

                newItem.addEventListener("keydown", (e) => {
                    this.handleMenuItemKeydown(e, dropdown, newItem);
                });
            });

            document.body.appendChild(menu);

            // 위치 업데이트
            this.updateFixedPosition(dropdown);
        },

        updateFixedPosition: function(dropdown) {
            const toggle = dropdown.querySelector(".dropdown__toggle");
            const menuId = dropdown.getAttribute("data-menu-id");
            const menu = document.querySelector(`.dropdown__menu--fixed[data-dropdown-id="${menuId}"]`);

            if (!toggle || !menu) return;

            const rect = toggle.getBoundingClientRect();
            const menuHeight = menu.offsetHeight;
            const menuWidth = menu.offsetWidth;
            const viewportHeight = window.innerHeight;
            const viewportWidth = window.innerWidth;

            // 기본 위치 (아래쪽)
            let top = rect.bottom + 2;
            let left = rect.left;

            // Dropup 체크
            if (dropdown.classList.contains("dropdown--dropup")) {
                top = rect.top - menuHeight - 2;
            }

            // Dropright 체크
            if (dropdown.classList.contains("dropdown--dropright")) {
                left = rect.right + 2;
                top = rect.top;
            }


            // 오른쪽 정렬 체크
            if (menu.classList.contains("dropdown__menu--right")) {
                left = rect.right - menuWidth;
            }

            // 중앙 정렬 체크
            if (menu.classList.contains("dropdown__menu--center")) {
                left = rect.left + (rect.width / 2) - (menuWidth / 2);
            }

            // 화면 벗어남 방지
            if (top + menuHeight > viewportHeight) {
                top = rect.top - menuHeight - 2;
            }
            if (left + menuWidth > viewportWidth) {
                left = viewportWidth - menuWidth - 10;
            }
            if (left < 0) {
                left = 10;
            }
            if (top < 0) {
                top = rect.bottom + 2;
            }

            menu.style.top = top + "px";
            menu.style.left = left + "px";
            menu.style.display = "block";

            // 애니메이션 실행
            setTimeout(() => {
                menu.style.opacity = "1";
                menu.style.transform = "translateY(0)";
            }, 10);
        },

        cleanupFixedDropdown: function(dropdown) {
            const menuId = dropdown.getAttribute("data-menu-id");
            const menu = document.querySelector(`.dropdown__menu--fixed[data-dropdown-id="${menuId}"]`);

            if (menu && menu.parentElement === document.body) {
                // 애니메이션 초기화
                menu.style.opacity = "0";
                menu.style.transform = "translateY(-8px)";

                setTimeout(() => {
                    // 메뉴를 원래 위치로 되돌리기
                    menu.style.position = "";
                    menu.style.top = "";
                    menu.style.left = "";
                    menu.style.zIndex = "";
                    menu.style.display = "";
                    menu.style.opacity = "";
                    menu.style.transform = "";
                    menu.style.transition = "";
                    menu.classList.remove("dropdown__menu--fixed");
                    menu.removeAttribute("data-dropdown-id");

                    dropdown.appendChild(menu);
                    dropdown.removeAttribute("data-menu-id");

                    // 이벤트 리스너 재바인딩
                    const self = this;
                    menu.querySelectorAll(".dropdown__item").forEach(item => {
                        // 기존 리스너 제거를 위해 clone 사용
                        const newItem = item.cloneNode(true);
                        item.parentNode.replaceChild(newItem, item);

                        // 새로운 리스너 추가
                        newItem.addEventListener("click", function(e) {
                            e.preventDefault();
                            if (!newItem.classList.contains("dropdown__item--disabled")) {
                                self.selectItem(dropdown, newItem);
                            }
                        });

                        newItem.addEventListener("keydown", function(e) {
                            self.handleMenuItemKeydown(e, dropdown, newItem);
                        });
                    });
                }, 200);
            }
        },
        // ========================================================================

        closeAll: function() {
            document.querySelectorAll(".dropdown--open").forEach(dropdown => {
                this.close(dropdown);
            });

            // ==================== Orphaned Fixed Menus Cleanup ====================
            // body에 남아있는 고아 fixed 메뉴들 정리
            document.querySelectorAll(".dropdown__menu--fixed").forEach(menu => {
                menu.style.display = "none";
            });
            // ========================================================================
        }
    };

})(window);