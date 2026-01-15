/**
 * BRICKS Design System - Dropdown Component
 * 드롭다운 컴포넌트 모듈
 */
(function (global) {
    "use strict";
    // BRICKS 네임스페이스
    global.BRICKS = global.BRICKS || {};
    /**
     * Dropdown Component
     */
    global.BRICKS.Dropdown = {
        init: function () {
            // 모든 드롭다운 초기화
            document.querySelectorAll(".dropdown").forEach((dropdown) => {
                const dropdownEl = dropdown;
                const toggle = dropdownEl.querySelector(".dropdown__toggle");
                const menu = dropdownEl.querySelector(".dropdown__menu");
                if (toggle && !toggle.hasAttribute("data-bricks-initialized")) {
                    toggle.setAttribute("data-bricks-initialized", "true");
                    // ARIA 속성 초기 설정
                    const dropdownId = dropdownEl.id || "dropdown-" + Math.random().toString(36).substr(2, 9);
                    dropdownEl.id = dropdownId;
                    toggle.setAttribute("aria-expanded", "false");
                    toggle.setAttribute("aria-haspopup", "menu");
                    toggle.setAttribute("aria-controls", dropdownId + "-menu");
                    if (menu) {
                        menu.id = dropdownId + "-menu";
                        menu.setAttribute("role", "menu");
                        menu.setAttribute("aria-labelledby", toggle.id || (toggle.id = dropdownId + "-toggle"));
                        // 메뉴 아이템에 role 설정
                        menu.querySelectorAll(".dropdown__item").forEach((item, index) => {
                            const itemEl = item;
                            itemEl.setAttribute("role", "menuitem");
                            itemEl.setAttribute("tabindex", "-1");
                            if (itemEl.classList.contains("dropdown__item--disabled")) {
                                itemEl.setAttribute("aria-disabled", "true");
                            }
                        });
                    }
                    // 클릭 이벤트 바인딩
                    toggle.addEventListener("click", function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        global.BRICKS.Dropdown.toggle(dropdownEl);
                    });
                    // 키보드 이벤트 추가
                    toggle.addEventListener("keydown", function (e) {
                        global.BRICKS.Dropdown.handleToggleKeydown(e, dropdownEl);
                    });
                    // 메뉴 아이템 키보드 이벤트
                    if (menu) {
                        menu.querySelectorAll(".dropdown__item").forEach((item) => {
                            const itemEl = item;
                            itemEl.addEventListener("keydown", function (e) {
                                global.BRICKS.Dropdown.handleMenuItemKeydown(e, dropdownEl, itemEl);
                            });
                            itemEl.addEventListener("click", function (e) {
                                e.preventDefault(); // # 링크의 기본 동작 방지
                                if (!itemEl.classList.contains("dropdown__item--disabled")) {
                                    global.BRICKS.Dropdown.selectItem(dropdownEl, itemEl);
                                }
                            });
                        });
                    }
                }
            });
            // 외부 클릭 시 드롭다운 닫기
            if (!document.body.hasAttribute("data-bricks-dropdown-listener")) {
                document.body.setAttribute("data-bricks-dropdown-listener", "true");
                document.addEventListener("click", function (e) {
                    const target = e.target;
                    // Fixed 드롭다운 메뉴 체크
                    if (!target.closest(".dropdown") && !target.closest(".dropdown__menu--fixed")) {
                        global.BRICKS.Dropdown.closeAll();
                    }
                });
                // ESC 키로 드롭다운 닫기
                document.addEventListener("keydown", function (e) {
                    if (e.key === "Escape") {
                        const openDropdown = document.querySelector(".dropdown--open");
                        if (openDropdown) {
                            global.BRICKS.Dropdown.close(openDropdown);
                            const toggle = openDropdown.querySelector(".dropdown__toggle");
                            if (toggle)
                                toggle.focus();
                        }
                    }
                });
                // Fixed Dropdown Position Update
                let updateTimer;
                const updateFixedDropdowns = function () {
                    clearTimeout(updateTimer);
                    updateTimer = setTimeout(function () {
                        document.querySelectorAll(".dropdown--fixed.dropdown--open").forEach((dropdown) => {
                            global.BRICKS.Dropdown.updateFixedPosition(dropdown);
                        });
                    }, 10);
                };
                window.addEventListener("scroll", updateFixedDropdowns, true);
                window.addEventListener("resize", updateFixedDropdowns);
            }
        },
        toggle: function (dropdown) {
            if (dropdown.classList.contains("dropdown--open")) {
                this.close(dropdown);
            }
            else {
                this.open(dropdown);
            }
        },
        open: function (dropdown) {
            // 다른 드롭다운 닫기
            this.closeAll();
            dropdown.classList.add("dropdown--open");
            const toggle = dropdown.querySelector(".dropdown__toggle");
            if (toggle) {
                toggle.setAttribute("aria-expanded", "true");
            }
            // Fixed 드롭다운인 경우 위치 계산
            if (dropdown.classList.contains("dropdown--fixed")) {
                this.updateFixedPosition(dropdown);
            }
            // 커스텀 이벤트 발생
            const event = new CustomEvent('dropdownOpen', { detail: { dropdown } });
            dropdown.dispatchEvent(event);
        },
        close: function (dropdown) {
            if (dropdown.classList.contains("dropdown--fixed")) {
                this.cleanupFixedDropdown(dropdown);
            }
            dropdown.classList.remove("dropdown--open");
            const toggle = dropdown.querySelector(".dropdown__toggle");
            if (toggle) {
                toggle.setAttribute("aria-expanded", "false");
            }
            // 커스텀 이벤트 발생
            const event = new CustomEvent('dropdownClose', { detail: { dropdown } });
            dropdown.dispatchEvent(event);
        },
        // 토글 키보드 핸들러
        handleToggleKeydown: function (e, dropdown) {
            // Fixed 드롭다운의 경우 body에서 메뉴를 찾아야 함
            let menu = dropdown.querySelector(".dropdown__menu");
            if (!menu) {
                const menuId = dropdown.getAttribute("data-menu-id");
                if (menuId) {
                    menu = document.querySelector(`.dropdown__menu--fixed[data-dropdown-id="${menuId}"]`);
                }
            }
            const isOpen = dropdown.classList.contains("dropdown--open");
            switch (e.key) {
                case "Enter":
                case " ":
                    e.preventDefault();
                    if (!isOpen) {
                        this.open(dropdown);
                    }
                    else {
                        this.close(dropdown);
                    }
                    break;
                case "ArrowDown":
                    e.preventDefault();
                    if (!isOpen) {
                        this.open(dropdown);
                        // 드롭다운이 열린 후 첫 번째 메뉴 아이템에 포커스
                        setTimeout(() => {
                            if (menu) {
                                const firstItem = menu.querySelector(".dropdown__item:not(.dropdown__item--disabled)");
                                if (firstItem) {
                                    firstItem.focus();
                                }
                            }
                        }, 50);
                    }
                    else if (menu) {
                        const firstItem = menu.querySelector(".dropdown__item:not(.dropdown__item--disabled)");
                        if (firstItem) {
                            firstItem.focus();
                        }
                    }
                    break;
                case "ArrowUp":
                    e.preventDefault();
                    if (!isOpen) {
                        this.open(dropdown);
                        setTimeout(() => {
                            if (menu) {
                                const items = Array.from(menu.querySelectorAll(".dropdown__item:not(.dropdown__item--disabled)"));
                                const lastItem = items[items.length - 1];
                                if (lastItem) {
                                    lastItem.focus();
                                }
                            }
                        }, 50);
                    }
                    else if (menu) {
                        const items = Array.from(menu.querySelectorAll(".dropdown__item:not(.dropdown__item--disabled)"));
                        const lastItem = items[items.length - 1];
                        if (lastItem) {
                            lastItem.focus();
                        }
                    }
                    break;
            }
        },
        // 메뉴 아이템 키보드 핸들러
        handleMenuItemKeydown: function (e, dropdown, item) {
            let menu = dropdown.querySelector(".dropdown__menu");
            if (!menu) {
                const menuId = dropdown.getAttribute("data-menu-id");
                if (menuId) {
                    menu = document.querySelector(`.dropdown__menu--fixed[data-dropdown-id="${menuId}"]`);
                }
            }
            if (!menu)
                return;
            switch (e.key) {
                case "Enter":
                case " ":
                    e.preventDefault();
                    if (!item.classList.contains("dropdown__item--disabled")) {
                        this.selectItem(dropdown, item);
                    }
                    break;
                case "ArrowDown":
                    e.preventDefault();
                    const nextItem = this.getNextItem(menu, item);
                    if (nextItem) {
                        nextItem.focus();
                    }
                    break;
                case "ArrowUp":
                    e.preventDefault();
                    const prevItem = this.getPreviousItem(menu, item);
                    if (prevItem) {
                        prevItem.focus();
                    }
                    break;
                case "Escape":
                    e.preventDefault();
                    this.close(dropdown);
                    const toggle = dropdown.querySelector(".dropdown__toggle");
                    if (toggle) {
                        toggle.focus();
                    }
                    break;
                case "Tab":
                    this.close(dropdown);
                    break;
            }
        },
        selectItem: function (dropdown, item) {
            // 커스텀 이벤트 발생
            const event = new CustomEvent('dropdownItemSelect', {
                detail: { dropdown, item, value: item.textContent?.trim() }
            });
            dropdown.dispatchEvent(event);
            // 드롭다운 닫기
            this.close(dropdown);
            // 토글에 포커스 반환
            const toggle = dropdown.querySelector(".dropdown__toggle");
            if (toggle) {
                toggle.focus();
            }
        },
        getNextItem: function (menu, currentItem) {
            const items = Array.from(menu.querySelectorAll(".dropdown__item:not(.dropdown__item--disabled)"));
            const currentIndex = items.indexOf(currentItem);
            if (currentIndex >= 0 && currentIndex < items.length - 1) {
                return items[currentIndex + 1];
            }
            else if (currentIndex === items.length - 1) {
                return items[0]; // 마지막에서 첫 번째로 순환
            }
            return null;
        },
        getPreviousItem: function (menu, currentItem) {
            const items = Array.from(menu.querySelectorAll(".dropdown__item:not(.dropdown__item--disabled)"));
            const currentIndex = items.indexOf(currentItem);
            if (currentIndex > 0) {
                return items[currentIndex - 1];
            }
            else if (currentIndex === 0) {
                return items[items.length - 1]; // 첫 번째에서 마지막으로 순환
            }
            return null;
        },
        updateFixedPosition: function (dropdown) {
            const toggle = dropdown.querySelector(".dropdown__toggle");
            if (!toggle)
                return;
            const menuId = dropdown.getAttribute("data-menu-id");
            let menu = null;
            if (menuId) {
                menu = document.querySelector(`.dropdown__menu--fixed[data-dropdown-id="${menuId}"]`);
            }
            if (!menu) {
                menu = dropdown.querySelector(".dropdown__menu");
                if (!menu)
                    return;
                // 메뉴를 body로 이동하고 Fixed 클래스 추가
                const newMenuId = "fixed-menu-" + Math.random().toString(36).substr(2, 9);
                dropdown.setAttribute("data-menu-id", newMenuId);
                menu.setAttribute("data-dropdown-id", newMenuId);
                menu.classList.add("dropdown__menu--fixed");
                document.body.appendChild(menu);
            }
            // 위치 계산
            const rect = toggle.getBoundingClientRect();
            const menuRect = menu.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            let top = rect.bottom + 2;
            let left = rect.left;
            // 드롭다운 방향 설정
            const placement = dropdown.getAttribute("data-placement") || "bottom";
            if (placement === "top") {
                top = rect.top - menuRect.height - 2;
            }
            else if (placement === "right") {
                top = rect.top;
                left = rect.right + 2;
            }
            else if (placement === "left") {
                top = rect.top;
                left = rect.left - menuRect.width - 2;
            }
            // 화면 벗어남 방지
            if (top + menuRect.height > viewportHeight) {
                top = rect.top - menuRect.height - 2;
            }
            if (left + menuRect.width > viewportWidth) {
                left = viewportWidth - menuRect.width - 10;
            }
            if (left < 0) {
                left = 10;
            }
            if (top < 0) {
                top = rect.bottom + 2;
            }
            menu.style.position = "fixed";
            menu.style.top = top + "px";
            menu.style.left = left + "px";
            menu.style.zIndex = "9999";
            menu.style.display = "block";
            // 애니메이션
            setTimeout(() => {
                menu.style.opacity = "1";
                menu.style.transform = "translateY(0)";
            }, 10);
        },
        cleanupFixedDropdown: function (dropdown) {
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
                    menu.classList.remove("dropdown__menu--fixed");
                    menu.removeAttribute("data-dropdown-id");
                    dropdown.appendChild(menu);
                    dropdown.removeAttribute("data-menu-id");
                    // 이벤트 리스너 재바인딩
                    const self = this;
                    menu.querySelectorAll(".dropdown__item").forEach((item) => {
                        const itemEl = item;
                        // 기존 리스너 제거를 위해 clone 사용
                        const newItem = itemEl.cloneNode(true);
                        itemEl.parentNode.replaceChild(newItem, itemEl);
                        // 새로운 리스너 추가
                        newItem.addEventListener("click", function (e) {
                            e.preventDefault();
                            if (!newItem.classList.contains("dropdown__item--disabled")) {
                                self.selectItem(dropdown, newItem);
                            }
                        });
                        newItem.addEventListener("keydown", function (e) {
                            self.handleMenuItemKeydown(e, dropdown, newItem);
                        });
                    });
                }, 200);
            }
        },
        closeAll: function () {
            document.querySelectorAll(".dropdown--open").forEach((dropdown) => {
                this.close(dropdown);
            });
            // body에 남아있는 고아 fixed 메뉴들 정리
            document.querySelectorAll(".dropdown__menu--fixed").forEach((menu) => {
                const menuEl = menu;
                menuEl.style.display = "none";
            });
        }
    };
})(window);
export {};
//# sourceMappingURL=dropdown.js.map