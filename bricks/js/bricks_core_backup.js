/**
 * BRICKS Design System - Core JavaScript
 * 공통 컴포넌트 동작을 위한 핵심 스크립트
 */

(function() {
    "use strict";

    // BRICKS 네임스페이스
    window.BRICKS = window.BRICKS || {};

    /**
     * Dropdown Component
     */
    BRICKS.Dropdown = {
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
                    toggle.setAttribute("aria-haspopup", "true");
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

            // Dropleft 체크
            if (dropdown.classList.contains("dropdown--dropleft")) {
                left = rect.left - menuWidth - 2;
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

    /**
     * Modal Component
     */
    BRICKS.Modal = {
        activeModal: null,
        lastFocusedElement: null,

        init: function() {
            // 백드롭 클릭으로 모달 닫기
            document.addEventListener("click", function(e) {
                if (e.target.classList.contains("modal") && e.target.classList.contains("modal--open")) {
                    // static 모달이 아닌 경우에만 닫기
                    if (!e.target.classList.contains("modal--static")) {
                        BRICKS.Modal.close(e.target.id);
                    }
                }
            });

            // ESC 키로 모달 닫기
            document.addEventListener("keydown", function(e) {
                if (e.key === "Escape") {
                    const openModal = document.querySelector(".modal--open");
                    if (openModal && !openModal.classList.contains("modal--static")) {
                        BRICKS.Modal.close(openModal.id);
                    }
                }
            });
        },

        open: function(modalId) {
            const modal = document.getElementById(modalId);
            if (!modal) return;

            // 이전 포커스 저장
            this.lastFocusedElement = document.activeElement;

            // 모달 열기
            modal.classList.add("modal--open");
            document.body.style.overflow = "hidden";

            // ARIA 속성 설정
            modal.setAttribute("aria-hidden", "false");
            modal.setAttribute("role", "dialog");
            modal.setAttribute("aria-modal", "true");

            // 모달 다이얼로그에 aria-labelledby 설정
            const dialog = modal.querySelector(".modal__dialog");
            const title = modal.querySelector(".modal__title");
            if (dialog && title) {
                const titleId = title.id || "modal-title-" + modalId;
                title.id = titleId;
                dialog.setAttribute("aria-labelledby", titleId);
            }

            // 모달 body에 aria-describedby 설정
            const body = modal.querySelector(".modal__body");
            if (dialog && body) {
                const bodyId = body.id || "modal-body-" + modalId;
                body.id = bodyId;
                dialog.setAttribute("aria-describedby", bodyId);
            }

            // 포커스 트랩 설정
            this.activeModal = modal;
            this.setupFocusTrap(modal);

            // 첫 번째 포커스 가능한 요소에 포커스
            const firstFocusable = this.getFocusableElements(modal)[0];
            if (firstFocusable) {
                setTimeout(() => firstFocusable.focus(), 100);
            }

            // 스크린 리더에 알림
            this.announceToScreenReader("대화 상자가 열렸습니다");
        },

        close: function(modalId) {
            const modal = document.getElementById(modalId);
            if (!modal) return;

            // 모달 닫기
            modal.classList.remove("modal--open");
            document.body.style.overflow = "";

            // ARIA 속성 업데이트
            modal.setAttribute("aria-hidden", "true");

            // 포커스 트랩 제거
            this.removeFocusTrap();
            this.activeModal = null;

            // 이전 포커스로 복원
            if (this.lastFocusedElement) {
                this.lastFocusedElement.focus();
                this.lastFocusedElement = null;
            }

            // 스크린 리더에 알림
            this.announceToScreenReader("대화 상자가 닫혔습니다");
        },

        // 포커스 트랩 설정
        setupFocusTrap: function(modal) {
            const focusHandler = (e) => {
                if (!modal.contains(e.target)) {
                    e.stopPropagation();
                    const focusableElements = this.getFocusableElements(modal);
                    if (focusableElements.length > 0) {
                        focusableElements[0].focus();
                    }
                }
            };

            const tabHandler = (e) => {
                if (e.key !== "Tab") return;

                const focusableElements = this.getFocusableElements(modal);
                const firstFocusable = focusableElements[0];
                const lastFocusable = focusableElements[focusableElements.length - 1];

                if (e.shiftKey) {
                    // Shift + Tab
                    if (document.activeElement === firstFocusable) {
                        e.preventDefault();
                        lastFocusable.focus();
                    }
                } else {
                    // Tab
                    if (document.activeElement === lastFocusable) {
                        e.preventDefault();
                        firstFocusable.focus();
                    }
                }
            };

            // 이벤트 리스너 저장
            modal._focusHandler = focusHandler;
            modal._tabHandler = tabHandler;

            document.addEventListener("focus", focusHandler, true);
            modal.addEventListener("keydown", tabHandler);
        },

        // 포커스 트랩 제거
        removeFocusTrap: function() {
            if (!this.activeModal) return;

            if (this.activeModal._focusHandler) {
                document.removeEventListener("focus", this.activeModal._focusHandler, true);
            }
            if (this.activeModal._tabHandler) {
                this.activeModal.removeEventListener("keydown", this.activeModal._tabHandler);
            }
        },

        // 포커스 가능한 요소 가져오기
        getFocusableElements: function(container) {
            const focusableSelectors = [
                'a[href]',
                'button:not([disabled])',
                'input:not([disabled])',
                'textarea:not([disabled])',
                'select:not([disabled])',
                '[tabindex]:not([tabindex="-1"])'
            ];

            return Array.from(container.querySelectorAll(focusableSelectors.join(', ')))
                .filter(el => {
                    // 숨겨진 요소 제외
                    const style = window.getComputedStyle(el);
                    return style.display !== 'none' && style.visibility !== 'hidden';
                });
        },

        // 스크린 리더 알림
        announceToScreenReader: function(message) {
            const announcement = document.createElement('div');
            announcement.className = 'sr-only';
            announcement.setAttribute('role', 'status');
            announcement.setAttribute('aria-live', 'polite');
            announcement.textContent = message;

            document.body.appendChild(announcement);

            setTimeout(() => {
                document.body.removeChild(announcement);
            }, 1000);
        }
    };

    /**
     * Toggle Component
     */
    BRICKS.Toggle = {
        init: function() {
            // 모든 토글 스위치 초기화
            document.querySelectorAll(".toggle").forEach(toggle => {
                if (toggle.hasAttribute("data-bricks-initialized")) return;
                toggle.setAttribute("data-bricks-initialized", "true");

                // ARIA 속성 초기 설정
                const isActive = toggle.classList.contains("toggle--active");
                const isDisabled = toggle.disabled;

                toggle.setAttribute("role", "switch");
                toggle.setAttribute("aria-checked", isActive ? "true" : "false");
                toggle.setAttribute("aria-disabled", isDisabled ? "true" : "false");

                // 레이블이 있는 경우 연결
                const label = toggle.nextElementSibling;
                if (label && label.classList.contains("toggle__label")) {
                    const toggleId = toggle.id || "toggle-" + Math.random().toString(36).substr(2, 9);
                    toggle.id = toggleId;
                    label.setAttribute("for", toggleId);
                }

                // 클릭 이벤트 (기존 onclick과 별도로)
                toggle.addEventListener("click", function(e) {
                    if (!this.disabled) {
                        BRICKS.Toggle.toggle(this);
                    }
                });

                // 키보드 이벤트
                toggle.addEventListener("keydown", function(e) {
                    if (!this.disabled) {
                        BRICKS.Toggle.handleKeydown(e, this);
                    }
                });

                // 포커스 스타일
                toggle.addEventListener("focus", function() {
                    if (!this.disabled) {
                        this.classList.add("toggle--focus");
                    }
                });

                toggle.addEventListener("blur", function() {
                    this.classList.remove("toggle--focus");
                });
            });
        },

        toggle: function(element) {
            if (!element || element.disabled) return;

            const isActive = element.classList.contains("toggle--active");
            const newState = !isActive;

            if (newState) {
                element.classList.add("toggle--active");
                element.setAttribute("aria-checked", "true");
            } else {
                element.classList.remove("toggle--active");
                element.setAttribute("aria-checked", "false");
            }

            // 스크린 리더 알림
            this.announceToScreenReader(newState ? "켜짐" : "꺼짐");

            // 커스텀 이벤트 발생
            const event = new CustomEvent("toggleChange", {
                detail: {
                    element: element,
                    checked: newState
                }
            });
            element.dispatchEvent(event);
        },

        handleKeydown: function(e, toggle) {
            switch(e.key) {
                case " ":
                case "Enter":
                    e.preventDefault();
                    this.toggle(toggle);
                    break;
                case "ArrowRight":
                    e.preventDefault();
                    if (!toggle.classList.contains("toggle--active")) {
                        this.toggle(toggle);
                    }
                    break;
                case "ArrowLeft":
                    e.preventDefault();
                    if (toggle.classList.contains("toggle--active")) {
                        this.toggle(toggle);
                    }
                    break;
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
        }
    };

    /**
     * Toast Component
     */
    BRICKS.Toast = {
        show: function(message, options) {
            // 기본 옵션 설정
            const defaults = {
                type: 'success',
                title: null,
                description: message,
                position: 'top-right',
                duration: 5000,
                dismissible: true
            };

            const config = Object.assign({}, defaults, options);

            // 기존 토스트 제거 (옵션에 따라)
            if (config.clearExisting !== false) {
                document.querySelectorAll('.alert--toast').forEach(el => el.remove());
            }

            // 토스트 엘리먼트 생성
            const toast = document.createElement('div');
            toast.className = `alert alert--${config.type} alert--toast`;

            if (config.dismissible) {
                toast.classList.add('alert--dismissible');
            }

            // 위치 클래스 설정
            const positionParts = config.position.split('-');
            positionParts.forEach(part => {
                toast.classList.add(`alert--toast-${part}`);
            });

            // 아이콘 타입 매핑
            const iconTypes = {
                'success': 'success',
                'warning': 'warning',
                'danger': 'danger',
                'error': 'danger',
                'info': 'info'
            };

            const iconType = iconTypes[config.type] || 'info';

            // HTML 구성
            let html = `<span class="alert__icon icon-${iconType}"></span>`;
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
        success: function(message, options) {
            return this.show(message, Object.assign({type: 'success'}, options));
        },

        error: function(message, options) {
            return this.show(message, Object.assign({type: 'danger'}, options));
        },

        warning: function(message, options) {
            return this.show(message, Object.assign({type: 'warning'}, options));
        },

        info: function(message, options) {
            return this.show(message, Object.assign({type: 'info'}, options));
        },

        // 모든 토스트 제거
        clearAll: function() {
            document.querySelectorAll('.alert--toast').forEach(el => el.remove());
        }
    };

    /**
     * Alert Component
     */
    BRICKS.Alert = {
        dismiss: function(element) {
            // element가 문자열(ID)인 경우
            if (typeof element === 'string') {
                element = document.getElementById(element);
            }

            // 가장 가까운 alert 엘리먼트 찾기
            const alert = element.closest('.alert');
            if (alert) {
                alert.style.display = 'none';
            }
        },

        init: function() {
            // dismissible alert의 close 버튼에 이벤트 바인딩
            document.addEventListener('click', function(e) {
                if (e.target.closest('.alert__close')) {
                    const alert = e.target.closest('.alert');
                    if (alert) {
                        BRICKS.Alert.dismiss(alert);
                    }
                }
            });
        }
    };

    // ==================== Tabs Component ====================
    /**
     * Tabs Component
     * 탭 네비게이션 기능을 제공하는 컴포넌트
     */
    BRICKS.Tabs = {
        init: function() {
            // 모든 탭 컨테이너 초기화
            document.querySelectorAll('[data-tabs]').forEach(tabContainer => {
                // 이미 초기화된 경우 스킵
                if (tabContainer.hasAttribute('data-bricks-tabs-initialized')) {
                    return;
                }

                tabContainer.setAttribute('data-bricks-tabs-initialized', 'true');

                const nav = tabContainer.querySelector('.tabs__nav');
                const buttons = tabContainer.querySelectorAll('.tabs__button');
                const panels = tabContainer.querySelectorAll('.tabs__panel');
                const isVertical = tabContainer.classList.contains('tabs--vertical');
                const isPills = tabContainer.classList.contains('tabs--pills');

                // 인디케이터 바 생성 및 추가 (vertical과 pills 스타일 제외)
                if (nav && !nav.querySelector('.tabs__indicator') && !isVertical && !isPills) {
                    const indicator = document.createElement('div');
                    indicator.className = 'tabs__indicator';
                    nav.appendChild(indicator);

                    // 초기 위치 설정
                    const activeButton = nav.querySelector('.tabs__button--active');
                    if (activeButton) {
                        // 약간의 지연 후 초기 위치 설정 (DOM 렌더링 대기)
                        setTimeout(() => {
                            this.updateIndicator(nav, activeButton);
                        }, 10);
                    }
                }

                buttons.forEach((button, index) => {
                    // data-tab 속성이 없는 경우 인덱스 기반으로 설정
                    if (!button.hasAttribute('data-tab')) {
                        button.setAttribute('data-tab', 'tab-' + index);
                        if (panels[index]) {
                            panels[index].setAttribute('id', 'tab-' + index);
                        }
                    }

                    button.addEventListener('click', (e) => {
                        e.preventDefault();

                        // disabled 버튼은 무시
                        if (button.disabled) return;

                        const targetTab = button.getAttribute('data-tab');
                        const targetPanel = tabContainer.querySelector('#' + targetTab);

                        if (!targetPanel) return;

                        // 모든 버튼과 패널 비활성화
                        buttons.forEach(btn => btn.classList.remove('tabs__button--active'));
                        panels.forEach(panel => panel.classList.remove('tabs__panel--active'));

                        // 선택된 탭 활성화
                        button.classList.add('tabs__button--active');
                        targetPanel.classList.add('tabs__panel--active');

                        // ARIA 속성 업데이트
                        buttons.forEach(btn => {
                            btn.setAttribute('aria-selected', btn === button ? 'true' : 'false');
                            btn.setAttribute('tabindex', btn === button ? '0' : '-1');
                        });

                        // 인디케이터 업데이트 (vertical과 pills 스타일 제외)
                        const nav = tabContainer.querySelector('.tabs__nav');
                        const isVertical = tabContainer.classList.contains('tabs--vertical');
                        const isPills = tabContainer.classList.contains('tabs--pills');
                        if (nav && !isVertical && !isPills) {
                            BRICKS.Tabs.updateIndicator(nav, button);
                        }

                        // 커스텀 이벤트 발생
                        const event = new CustomEvent('tabChange', {
                            detail: {
                                tab: targetTab,
                                button: button,
                                panel: targetPanel,
                                container: tabContainer
                            }
                        });
                        tabContainer.dispatchEvent(event);
                    });

                    // 키보드 네비게이션 지원
                    button.addEventListener('keydown', (e) => {
                        let targetButton = null;
                        const currentIndex = Array.from(buttons).indexOf(button);

                        switch(e.key) {
                            case 'ArrowLeft':
                            case 'ArrowUp':
                                e.preventDefault();
                                // 이전 활성 버튼 찾기
                                for (let i = currentIndex - 1; i >= 0; i--) {
                                    if (!buttons[i].disabled) {
                                        targetButton = buttons[i];
                                        break;
                                    }
                                }
                                // 순환: 마지막 활성 버튼으로
                                if (!targetButton) {
                                    for (let i = buttons.length - 1; i > currentIndex; i--) {
                                        if (!buttons[i].disabled) {
                                            targetButton = buttons[i];
                                            break;
                                        }
                                    }
                                }
                                break;

                            case 'ArrowRight':
                            case 'ArrowDown':
                                e.preventDefault();
                                // 다음 활성 버튼 찾기
                                for (let i = currentIndex + 1; i < buttons.length; i++) {
                                    if (!buttons[i].disabled) {
                                        targetButton = buttons[i];
                                        break;
                                    }
                                }
                                // 순환: 첫 번째 활성 버튼으로
                                if (!targetButton) {
                                    for (let i = 0; i < currentIndex; i++) {
                                        if (!buttons[i].disabled) {
                                            targetButton = buttons[i];
                                            break;
                                        }
                                    }
                                }
                                break;

                            case 'Home':
                                e.preventDefault();
                                // 첫 번째 활성 버튼
                                for (let i = 0; i < buttons.length; i++) {
                                    if (!buttons[i].disabled) {
                                        targetButton = buttons[i];
                                        break;
                                    }
                                }
                                break;

                            case 'End':
                                e.preventDefault();
                                // 마지막 활성 버튼
                                for (let i = buttons.length - 1; i >= 0; i--) {
                                    if (!buttons[i].disabled) {
                                        targetButton = buttons[i];
                                        break;
                                    }
                                }
                                break;
                        }

                        if (targetButton) {
                            targetButton.focus();
                            targetButton.click();
                        }
                    });
                });

                // ARIA 속성 설정
                if (nav) {
                    nav.setAttribute('role', 'tablist');
                    nav.setAttribute('aria-orientation', isVertical ? 'vertical' : 'horizontal');
                }

                buttons.forEach((button, index) => {
                    button.setAttribute('role', 'tab');
                    const isActive = button.classList.contains('tabs__button--active');
                    button.setAttribute('aria-selected', isActive ? 'true' : 'false');
                    button.setAttribute('tabindex', isActive ? '0' : '-1');

                    const tabId = button.getAttribute('data-tab');
                    if (tabId) {
                        button.setAttribute('aria-controls', tabId);
                        if (!button.hasAttribute('id')) {
                            button.setAttribute('id', tabId + '-button');
                        }
                    }
                });

                panels.forEach(panel => {
                    panel.setAttribute('role', 'tabpanel');
                    panel.setAttribute('tabindex', '0');
                    const isActive = panel.classList.contains('tabs__panel--active');
                    panel.setAttribute('aria-hidden', !isActive ? 'true' : 'false');

                    const panelId = panel.getAttribute('id');
                    if (panelId) {
                        const associatedButton = tabContainer.querySelector(`[data-tab="${panelId}"]`);
                        if (associatedButton && associatedButton.getAttribute('id')) {
                            panel.setAttribute('aria-labelledby', associatedButton.getAttribute('id'));
                        }
                    }
                });

                // Window resize 이벤트로 인디케이터 위치 재조정
                if (!isVertical && !isPills) {
                    const resizeHandler = () => {
                        const activeButton = nav.querySelector('.tabs__button--active');
                        if (activeButton && nav) {
                            this.updateIndicator(nav, activeButton);
                        }
                    };
                    window.addEventListener('resize', resizeHandler);
                    // ResizeObserver가 지원되는 경우 사용
                    if (typeof ResizeObserver !== 'undefined') {
                        const resizeObserver = new ResizeObserver(resizeHandler);
                        resizeObserver.observe(nav);
                    }
                }
            });
        },

        // 인디케이터 위치 업데이트
        updateIndicator: function(nav, activeButton) {
            const indicator = nav.querySelector('.tabs__indicator');
            if (!indicator || !activeButton) return;

            // 버튼의 위치와 크기 계산
            const navRect = nav.getBoundingClientRect();
            const buttonRect = activeButton.getBoundingClientRect();

            const left = buttonRect.left - navRect.left;
            const width = buttonRect.width;

            // 인디케이터 위치 설정
            indicator.style.left = left + 'px';
            indicator.style.width = width + 'px';
        },

        // 프로그래밍적으로 탭 전환
        switchTo: function(container, tabId) {
            const tabContainer = typeof container === 'string'
                ? document.querySelector(container)
                : container;

            if (!tabContainer) return;

            const button = tabContainer.querySelector(`[data-tab="${tabId}"]`);
            if (button && !button.disabled) {
                button.click();
            }
        },

        // 탭 활성/비활성 설정
        enableTab: function(container, tabId, enable = true) {
            const tabContainer = typeof container === 'string'
                ? document.querySelector(container)
                : container;

            if (!tabContainer) return;

            const button = tabContainer.querySelector(`[data-tab="${tabId}"]`);
            if (button) {
                button.disabled = !enable;
                button.setAttribute('aria-disabled', !enable ? 'true' : 'false');
            }
        }
    };
    // ========================================================================

    // ==================== Accordion Component ====================
    /**
     * Accordion Component
     * 접고 펼칠 수 있는 콘텐츠 패널 컴포넌트
     */
    BRICKS.Accordion = {
        init: function() {
            // 모든 아코디언 초기화
            document.querySelectorAll('[data-accordion]').forEach(accordion => {
                // 이미 초기화된 경우 스킵
                if (accordion.hasAttribute('data-bricks-accordion-initialized')) {
                    return;
                }

                accordion.setAttribute('data-bricks-accordion-initialized', 'true');

                // 다중 열기 허용 여부 확인
                const allowMultiple = accordion.getAttribute('data-accordion-multiple') === 'true';

                // 각 헤더에 이벤트 바인딩
                const headers = accordion.querySelectorAll('.accordion__header');

                headers.forEach(header => {
                    header.addEventListener('click', (e) => {
                        e.preventDefault();

                        const item = header.closest('.accordion__item');
                        if (!item) return;

                        const content = item.querySelector('.accordion__content');
                        if (!content) return;

                        const isOpen = item.classList.contains('accordion__item--open');

                        // 다중 열기가 허용되지 않으면 다른 아이템 닫기
                        if (!allowMultiple) {
                            accordion.querySelectorAll('.accordion__item').forEach(otherItem => {
                                if (otherItem !== item) {
                                    otherItem.classList.remove('accordion__item--open');
                                    const otherHeader = otherItem.querySelector('.accordion__header');
                                    const otherContent = otherItem.querySelector('.accordion__content');
                                    if (otherHeader) {
                                        otherHeader.classList.remove('accordion__header--active');
                                    }
                                    if (otherContent) {
                                        otherContent.classList.remove('accordion__content--open');
                                        // 애니메이션을 위한 max-height 설정
                                        otherContent.style.maxHeight = null;
                                    }
                                }
                            });
                        }

                        // 현재 아이템 토글
                        if (isOpen) {
                            // 닫기
                            item.classList.remove('accordion__item--open');
                            header.classList.remove('accordion__header--active');
                            content.classList.remove('accordion__content--open');
                            content.style.maxHeight = null;
                        } else {
                            // 열기
                            item.classList.add('accordion__item--open');
                            header.classList.add('accordion__header--active');
                            content.classList.add('accordion__content--open');
                            // 부드러운 애니메이션을 위한 max-height 계산
                            content.style.maxHeight = content.scrollHeight + "px";
                        }

                        // 커스텀 이벤트 발생
                        const event = new CustomEvent('accordionToggle', {
                            detail: {
                                item: item,
                                header: header,
                                content: content,
                                isOpen: !isOpen,
                                accordion: accordion
                            }
                        });
                        accordion.dispatchEvent(event);
                    });

                    // 키보드 접근성 지원
                    header.addEventListener('keydown', (e) => {
                        switch(e.key) {
                            case 'Enter':
                            case ' ':
                                e.preventDefault();
                                header.click();
                                break;

                            case 'ArrowUp':
                                e.preventDefault();
                                const prevHeader = BRICKS.Accordion.getPreviousHeader(header, accordion);
                                if (prevHeader) prevHeader.focus();
                                break;

                            case 'ArrowDown':
                                e.preventDefault();
                                const nextHeader = BRICKS.Accordion.getNextHeader(header, accordion);
                                if (nextHeader) nextHeader.focus();
                                break;

                            case 'Home':
                                e.preventDefault();
                                const firstHeader = accordion.querySelector('.accordion__header');
                                if (firstHeader) firstHeader.focus();
                                break;

                            case 'End':
                                e.preventDefault();
                                const allHeaders = accordion.querySelectorAll('.accordion__header');
                                const lastHeader = allHeaders[allHeaders.length - 1];
                                if (lastHeader) lastHeader.focus();
                                break;
                        }
                    });

                    // ARIA 속성 설정
                    const item = header.closest('.accordion__item');
                    const content = item ? item.querySelector('.accordion__content') : null;

                    if (content) {
                        // 고유 ID 생성
                        const id = 'accordion-' + Math.random().toString(36).substr(2, 9);
                        content.setAttribute('id', id);
                        header.setAttribute('aria-controls', id);
                    }

                    header.setAttribute('role', 'button');
                    header.setAttribute('tabindex', '0');
                    header.setAttribute('aria-expanded',
                        item && item.classList.contains('accordion__item--open') ? 'true' : 'false'
                    );
                });

                // 초기 열린 아이템의 max-height 설정
                accordion.querySelectorAll('.accordion__item--open').forEach(item => {
                    const content = item.querySelector('.accordion__content');
                    if (content) {
                        content.style.maxHeight = content.scrollHeight + "px";
                    }
                });
            });
        },

        // 이전 헤더 찾기
        getPreviousHeader: function(currentHeader, accordion) {
            const headers = Array.from(accordion.querySelectorAll('.accordion__header'));
            const currentIndex = headers.indexOf(currentHeader);

            if (currentIndex > 0) {
                return headers[currentIndex - 1];
            }
            return null;
        },

        // 다음 헤더 찾기
        getNextHeader: function(currentHeader, accordion) {
            const headers = Array.from(accordion.querySelectorAll('.accordion__header'));
            const currentIndex = headers.indexOf(currentHeader);

            if (currentIndex < headers.length - 1) {
                return headers[currentIndex + 1];
            }
            return null;
        },

        // 프로그래밍적으로 아이템 열기/닫기
        toggle: function(accordion, itemIndex) {
            const accordionEl = typeof accordion === 'string'
                ? document.querySelector(accordion)
                : accordion;

            if (!accordionEl) return;

            const items = accordionEl.querySelectorAll('.accordion__item');
            if (items[itemIndex]) {
                const header = items[itemIndex].querySelector('.accordion__header');
                if (header) {
                    header.click();
                }
            }
        },

        // 모든 아이템 열기
        openAll: function(accordion) {
            const accordionEl = typeof accordion === 'string'
                ? document.querySelector(accordion)
                : accordion;

            if (!accordionEl) return;

            accordionEl.querySelectorAll('.accordion__item').forEach(item => {
                if (!item.classList.contains('accordion__item--open')) {
                    const header = item.querySelector('.accordion__header');
                    if (header) header.click();
                }
            });
        },

        // 모든 아이템 닫기
        closeAll: function(accordion) {
            const accordionEl = typeof accordion === 'string'
                ? document.querySelector(accordion)
                : accordion;

            if (!accordionEl) return;

            accordionEl.querySelectorAll('.accordion__item').forEach(item => {
                if (item.classList.contains('accordion__item--open')) {
                    const header = item.querySelector('.accordion__header');
                    if (header) header.click();
                }
            });
        }
    };
    // ========================================================================

    // ==================== Pagination Component ====================
    /**
     * Pagination Component
     * 페이지 네비게이션 컴포넌트
     */
    BRICKS.Pagination = {
        init: function() {
            // 모든 페이지네이션 초기화
            document.querySelectorAll('[data-pagination]').forEach(pagination => {
                // 이미 초기화된 경우 스킵
                if (pagination.hasAttribute('data-bricks-pagination-initialized')) {
                    return;
                }

                pagination.setAttribute('data-bricks-pagination-initialized', 'true');

                // 페이지 링크들에 이벤트 바인딩
                const links = pagination.querySelectorAll('.pagination__link:not(.pagination__link--disabled)');

                links.forEach(link => {
                    link.addEventListener('click', (e) => {
                        e.preventDefault();

                        const page = link.getAttribute('data-page');
                        if (!page) return;

                        // 현재 활성 페이지 찾기
                        const currentActive = pagination.querySelector('.pagination__link--active');
                        let currentPage = 1;

                        if (currentActive) {
                            const currentPageAttr = currentActive.getAttribute('data-page');
                            currentPage = currentPageAttr ? parseInt(currentPageAttr) : 1;
                        }

                        // 총 페이지 수 가져오기
                        const totalPages = parseInt(pagination.getAttribute('data-total-pages')) || 0;

                        // 새 페이지 번호 계산
                        let newPage = currentPage;

                        if (page === 'prev') {
                            newPage = Math.max(1, currentPage - 1);
                        } else if (page === 'next') {
                            newPage = totalPages ? Math.min(totalPages, currentPage + 1) : currentPage + 1;
                        } else {
                            newPage = parseInt(page);
                        }

                        // 같은 페이지면 무시
                        if (newPage === currentPage) {
                            return;
                        }

                        // 페이지 변경
                        BRICKS.Pagination.changePage(pagination, newPage, currentPage);

                        // 커스텀 이벤트 발생
                        const event = new CustomEvent('pageChange', {
                            detail: {
                                page: newPage,
                                previousPage: currentPage,
                                pagination: pagination
                            }
                        });
                        pagination.dispatchEvent(event);
                    });

                    // 키보드 접근성
                    link.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            link.click();
                        }
                    });
                });

                // 초기 상태 설정
                BRICKS.Pagination.updateState(pagination);
            });
        },

        // 페이지 변경
        changePage: function(pagination, newPage, currentPage) {
            // 모든 활성 상태 제거
            pagination.querySelectorAll('.pagination__link--active').forEach(link => {
                link.classList.remove('pagination__link--active');
                link.removeAttribute('aria-current');
            });

            // 새 페이지 활성화
            const newActiveLink = pagination.querySelector(`[data-page="${newPage}"]`);
            if (newActiveLink) {
                newActiveLink.classList.add('pagination__link--active');
                newActiveLink.setAttribute('aria-current', 'page');
            }

            // 이전/다음 버튼 상태 업데이트
            BRICKS.Pagination.updateState(pagination);

            // 동적 페이지네이션인 경우 페이지 번호 재생성
            if (pagination.hasAttribute('data-dynamic')) {
                BRICKS.Pagination.generatePages(pagination, newPage);
            }
        },

        // 상태 업데이트 (이전/다음 버튼 활성/비활성)
        updateState: function(pagination) {
            const currentActive = pagination.querySelector('.pagination__link--active');
            if (!currentActive) return;

            const currentPage = parseInt(currentActive.getAttribute('data-page')) || 1;
            const totalPages = parseInt(pagination.getAttribute('data-total-pages')) || 0;

            // 이전 버튼
            const prevButton = pagination.querySelector('.pagination__link--prev');
            if (prevButton) {
                if (currentPage <= 1) {
                    prevButton.classList.add('pagination__link--disabled');
                    prevButton.setAttribute('aria-disabled', 'true');
                    prevButton.setAttribute('tabindex', '-1');
                } else {
                    prevButton.classList.remove('pagination__link--disabled');
                    prevButton.removeAttribute('aria-disabled');
                    prevButton.removeAttribute('tabindex');
                }
            }

            // 다음 버튼
            const nextButton = pagination.querySelector('.pagination__link--next');
            if (nextButton && totalPages > 0) {
                if (currentPage >= totalPages) {
                    nextButton.classList.add('pagination__link--disabled');
                    nextButton.setAttribute('aria-disabled', 'true');
                    nextButton.setAttribute('tabindex', '-1');
                } else {
                    nextButton.classList.remove('pagination__link--disabled');
                    nextButton.removeAttribute('aria-disabled');
                    nextButton.removeAttribute('tabindex');
                }
            }
        },

        // 동적 페이지 번호 생성 (ellipsis 포함)
        generatePages: function(pagination, currentPage) {
            const totalPages = parseInt(pagination.getAttribute('data-total-pages')) || 0;
            if (totalPages <= 0) return;

            const list = pagination.querySelector('.pagination__list');
            if (!list) return;

            // 기존 페이지 번호 제거 (이전/다음 버튼 제외)
            const items = list.querySelectorAll('.pagination__item');
            items.forEach(item => {
                const link = item.querySelector('.pagination__link');
                if (link && !link.classList.contains('pagination__link--prev') &&
                    !link.classList.contains('pagination__link--next')) {
                    item.remove();
                }
            });

            // 페이지 번호 생성 로직
            const pages = [];
            const maxVisible = 7; // 최대 표시 페이지 수

            if (totalPages <= maxVisible) {
                // 모든 페이지 표시
                for (let i = 1; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                // ellipsis 포함 표시
                if (currentPage <= 4) {
                    // 시작 부분
                    for (let i = 1; i <= 5; i++) {
                        pages.push(i);
                    }
                    pages.push('...');
                    pages.push(totalPages);
                } else if (currentPage >= totalPages - 3) {
                    // 끝 부분
                    pages.push(1);
                    pages.push('...');
                    for (let i = totalPages - 4; i <= totalPages; i++) {
                        pages.push(i);
                    }
                } else {
                    // 중간 부분
                    pages.push(1);
                    pages.push('...');
                    pages.push(currentPage - 1);
                    pages.push(currentPage);
                    pages.push(currentPage + 1);
                    pages.push('...');
                    pages.push(totalPages);
                }
            }

            // DOM에 추가
            const nextButton = list.querySelector('.pagination__item:last-child');
            pages.forEach(page => {
                const item = document.createElement('li');
                item.className = 'pagination__item';

                if (page === '...') {
                    item.innerHTML = '<span class="pagination__ellipsis">...</span>';
                } else {
                    const link = document.createElement('a');
                    link.href = '#';
                    link.className = 'pagination__link';
                    if (page === currentPage) {
                        link.classList.add('pagination__link--active');
                        link.setAttribute('aria-current', 'page');
                    }
                    link.setAttribute('data-page', page);
                    link.textContent = page;
                    item.appendChild(link);

                    // 이벤트 리스너 추가
                    link.addEventListener('click', (e) => {
                        e.preventDefault();
                        const newPage = parseInt(link.getAttribute('data-page'));
                        BRICKS.Pagination.changePage(pagination, newPage, currentPage);

                        const event = new CustomEvent('pageChange', {
                            detail: {
                                page: newPage,
                                previousPage: currentPage,
                                pagination: pagination
                            }
                        });
                        pagination.dispatchEvent(event);
                    });
                }

                if (nextButton) {
                    list.insertBefore(item, nextButton);
                } else {
                    list.appendChild(item);
                }
            });
        },

        // 프로그래밍적으로 페이지 설정
        setPage: function(pagination, page) {
            const paginationEl = typeof pagination === 'string'
                ? document.querySelector(pagination)
                : pagination;

            if (!paginationEl) return;

            const currentActive = paginationEl.querySelector('.pagination__link--active');
            const currentPage = currentActive
                ? (parseInt(currentActive.getAttribute('data-page')) || 1)
                : 1;

            if (page !== currentPage) {
                BRICKS.Pagination.changePage(paginationEl, page, currentPage);
            }
        }
    };
    // ========================================================================

    // ==================== Breadcrumb Component ====================
    /**
     * Breadcrumb Component
     * 탐색 경로 표시 컴포넌트
     */
    BRICKS.Breadcrumb = {
        init: function() {
            // 모든 브레드크럼 초기화
            document.querySelectorAll('[data-breadcrumb]').forEach(breadcrumb => {
                // 이미 초기화된 경우 스킵
                if (breadcrumb.hasAttribute('data-bricks-breadcrumb-initialized')) {
                    return;
                }

                breadcrumb.setAttribute('data-bricks-breadcrumb-initialized', 'true');

                // max-items 속성 확인
                const maxItems = breadcrumb.getAttribute('data-max-items');
                if (maxItems) {
                    BRICKS.Breadcrumb.collapse(breadcrumb, parseInt(maxItems));
                }

                // 링크들에 키보드 접근성 추가
                const links = breadcrumb.querySelectorAll('.breadcrumb__link');
                links.forEach(link => {
                    // 키보드 접근성
                    link.addEventListener('keydown', (e) => {
                        // 화살표 키로 네비게이션
                        if (e.key === 'ArrowRight') {
                            const nextItem = link.closest('.breadcrumb__item').nextElementSibling;
                            if (nextItem) {
                                const nextLink = nextItem.querySelector('.breadcrumb__link');
                                if (nextLink) {
                                    nextLink.focus();
                                }
                            }
                        } else if (e.key === 'ArrowLeft') {
                            const prevItem = link.closest('.breadcrumb__item').previousElementSibling;
                            if (prevItem) {
                                const prevLink = prevItem.querySelector('.breadcrumb__link');
                                if (prevLink) {
                                    prevLink.focus();
                                }
                            }
                        }
                    });

                    // 클릭 이벤트 (필요시 사용)
                    link.addEventListener('click', (e) => {
                        // 커스텀 이벤트 발생
                        const event = new CustomEvent('breadcrumbClick', {
                            detail: {
                                link: link,
                                item: link.closest('.breadcrumb__item'),
                                breadcrumb: breadcrumb
                            }
                        });
                        breadcrumb.dispatchEvent(event);
                    });
                });

                // 모바일에서 responsive 클래스 자동 적용
                if (window.innerWidth <= 640 && !breadcrumb.classList.contains('breadcrumb--responsive')) {
                    const items = breadcrumb.querySelectorAll('.breadcrumb__item');
                    if (items.length > 3) {
                        breadcrumb.classList.add('breadcrumb--responsive');
                    }
                }
            });
        },

        // 브레드크럼 아이템 축소
        collapse: function(breadcrumb, maxItems) {
            const list = breadcrumb.querySelector('.breadcrumb');
            if (!list) return;

            const items = list.querySelectorAll('.breadcrumb__item');
            if (items.length <= maxItems) return;

            // 중간 아이템들을 숨기고 ellipsis 추가
            const itemsToHide = [];
            const startShow = 1; // 첫 번째 아이템은 보여줌
            const endShow = maxItems - 2; // 마지막 몇 개 아이템 보여줌

            items.forEach((item, index) => {
                if (index >= startShow && index < items.length - endShow) {
                    itemsToHide.push(item);
                }
            });

            if (itemsToHide.length > 0) {
                // Ellipsis 아이템 생성
                const ellipsisItem = document.createElement('li');
                ellipsisItem.className = 'breadcrumb__item breadcrumb__item--ellipsis';

                const ellipsisButton = document.createElement('button');
                ellipsisButton.className = 'breadcrumb__ellipsis-button';
                ellipsisButton.setAttribute('aria-label', 'Show hidden items');
                ellipsisButton.innerHTML = '...';

                ellipsisItem.appendChild(ellipsisButton);

                // 숨겨진 아이템들을 담을 드롭다운 생성
                const dropdown = document.createElement('div');
                dropdown.className = 'breadcrumb__dropdown';
                dropdown.style.display = 'none';

                itemsToHide.forEach(item => {
                    const link = item.querySelector('.breadcrumb__link');
                    if (link) {
                        const dropdownItem = document.createElement('a');
                        dropdownItem.href = link.href;
                        dropdownItem.className = 'breadcrumb__dropdown-item';
                        dropdownItem.textContent = link.textContent.trim();
                        dropdown.appendChild(dropdownItem);
                    }
                });

                ellipsisItem.appendChild(dropdown);

                // Ellipsis 클릭 이벤트
                ellipsisButton.addEventListener('click', () => {
                    const isOpen = dropdown.style.display !== 'none';
                    dropdown.style.display = isOpen ? 'none' : 'block';
                    ellipsisButton.setAttribute('aria-expanded', !isOpen);
                });

                // 외부 클릭시 드롭다운 닫기
                document.addEventListener('click', (e) => {
                    if (!ellipsisItem.contains(e.target)) {
                        dropdown.style.display = 'none';
                        ellipsisButton.setAttribute('aria-expanded', 'false');
                    }
                });

                // 첫 번째 아이템 다음에 ellipsis 삽입
                itemsToHide[0].parentNode.insertBefore(ellipsisItem, itemsToHide[0]);

                // 중간 아이템들 숨기기
                itemsToHide.forEach(item => {
                    item.style.display = 'none';
                });
            }
        },

        // 프로그래밍적으로 항목 추가
        addItem: function(breadcrumb, text, href, isActive = false) {
            const breadcrumbEl = typeof breadcrumb === 'string'
                ? document.querySelector(breadcrumb)
                : breadcrumb;

            if (!breadcrumbEl) return;

            const list = breadcrumbEl.querySelector('.breadcrumb');
            if (!list) return;

            // 현재 active 아이템 비활성화
            if (isActive) {
                const currentActive = list.querySelector('.breadcrumb__item--active');
                if (currentActive) {
                    currentActive.classList.remove('breadcrumb__item--active');
                    currentActive.removeAttribute('aria-current');

                    // 텍스트를 링크로 변환
                    const text = currentActive.textContent.trim();
                    const link = document.createElement('a');
                    link.href = '#';
                    link.className = 'breadcrumb__link';
                    link.textContent = text;
                    currentActive.innerHTML = '';
                    currentActive.appendChild(link);
                }
            }

            // 새 아이템 생성
            const item = document.createElement('li');
            item.className = 'breadcrumb__item';

            if (isActive) {
                item.classList.add('breadcrumb__item--active');
                item.setAttribute('aria-current', 'page');
                item.textContent = text;
            } else {
                const link = document.createElement('a');
                link.href = href || '#';
                link.className = 'breadcrumb__link';
                link.textContent = text;
                item.appendChild(link);
            }

            list.appendChild(item);

            // Max items 확인 후 재정렬
            const maxItems = breadcrumbEl.getAttribute('data-max-items');
            if (maxItems) {
                BRICKS.Breadcrumb.collapse(breadcrumbEl, parseInt(maxItems));
            }
        },

        // 프로그래밍적으로 항목 제거
        removeItem: function(breadcrumb, index) {
            const breadcrumbEl = typeof breadcrumb === 'string'
                ? document.querySelector(breadcrumb)
                : breadcrumb;

            if (!breadcrumbEl) return;

            const items = breadcrumbEl.querySelectorAll('.breadcrumb__item');
            if (index >= 0 && index < items.length) {
                items[index].remove();
            }
        },

        // 브레드크럼 초기화 (모든 항목 제거)
        clear: function(breadcrumb) {
            const breadcrumbEl = typeof breadcrumb === 'string'
                ? document.querySelector(breadcrumb)
                : breadcrumb;

            if (!breadcrumbEl) return;

            const list = breadcrumbEl.querySelector('.breadcrumb');
            if (list) {
                list.innerHTML = '';
            }
        }
    };
    // ========================================================================

    // ==================== Navbar Component ====================
    /**
     * Navbar Component
     * 상단 네비게이션 바 컴포넌트
     */
    BRICKS.Navbar = {
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
                        BRICKS.Navbar.toggleMobile(navbar);
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
                            BRICKS.Navbar.toggleDropdown(dropdown);
                        });

                        // 키보드 접근성
                        toggle.addEventListener('keydown', (e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                BRICKS.Navbar.toggleDropdown(dropdown);
                            } else if (e.key === 'Escape') {
                                BRICKS.Navbar.closeDropdown(dropdown);
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
                                    BRICKS.Navbar.closeDropdown(dropdown);
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
                        BRICKS.Navbar.closeAllDropdowns(navbar);
                    }
                });

                // ESC 키로 모바일 메뉴 닫기
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape' && navbar.classList.contains('navbar--mobile-open')) {
                        BRICKS.Navbar.closeMobile(navbar);
                    }
                });
            });
        },

        // 모바일 메뉴 토글
        toggleMobile: function(navbar) {
            if (navbar.classList.contains('navbar--mobile-open')) {
                BRICKS.Navbar.closeMobile(navbar);
            } else {
                BRICKS.Navbar.openMobile(navbar);
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
                BRICKS.Navbar.closeDropdown(dropdown);
            } else {
                // 다른 드롭다운 닫기
                const navbar = dropdown.closest('.navbar');
                BRICKS.Navbar.closeAllDropdowns(navbar);

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
                BRICKS.Navbar.closeDropdown(dropdown);
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
    // ========================================================================

    /**
     * Table Component
     */
    BRICKS.Table = {
        // 초기화
        init: function() {
            // Sortable 테이블 초기화
            document.querySelectorAll('[data-sortable="true"]').forEach(table => {
                if (!table.hasAttribute('data-table-initialized')) {
                    this.initSortable(table);
                    table.setAttribute('data-table-initialized', 'true');
                }
            });
        },

        // Sortable 테이블 초기화
        initSortable: function(table) {
            const headers = table.querySelectorAll('thead th');

            headers.forEach((header, index) => {
                // 이미 sort 클래스가 있으면 클릭 가능하게 설정
                if (header.classList.contains('table__sort')) {
                    header.style.cursor = 'pointer';
                    header.addEventListener('click', () => this.sortTable(table, index, header));
                }
            });
        },

        // 테이블 정렬
        sortTable: function(table, columnIndex, header) {
            const tbody = table.querySelector('tbody');
            const rows = Array.from(tbody.querySelectorAll('tr'));
            const isAscending = header.classList.contains('table__sort--asc');

            // 현재 헤더의 정렬 상태 토글
            table.querySelectorAll('.table__sort').forEach(th => {
                th.classList.remove('table__sort--asc', 'table__sort--desc');
            });

            if (isAscending) {
                header.classList.add('table__sort--desc');
            } else {
                header.classList.add('table__sort--asc');
            }

            // 행 정렬
            rows.sort((a, b) => {
                const aValue = a.children[columnIndex].textContent.trim();
                const bValue = b.children[columnIndex].textContent.trim();

                // 숫자 체크
                const aNum = parseFloat(aValue.replace(/[^0-9.-]/g, ''));
                const bNum = parseFloat(bValue.replace(/[^0-9.-]/g, ''));

                if (!isNaN(aNum) && !isNaN(bNum)) {
                    return isAscending ? bNum - aNum : aNum - bNum;
                }

                // 문자열 비교
                return isAscending
                    ? bValue.localeCompare(aValue)
                    : aValue.localeCompare(bValue);
            });

            // DOM에 재배치
            rows.forEach(row => tbody.appendChild(row));

            // 커스텀 이벤트 발생
            const event = new CustomEvent('table:sorted', {
                detail: {
                    table: table,
                    column: columnIndex,
                    direction: isAscending ? 'desc' : 'asc'
                }
            });
            table.dispatchEvent(event);
        },

        // 행 선택 기능 추가
        enableRowSelection: function(table, options = {}) {
            const config = Object.assign({
                multiple: false,
                className: 'table__row--selected'
            }, options);

            const tbody = table.querySelector('tbody');
            const rows = tbody.querySelectorAll('tr');

            rows.forEach(row => {
                row.style.cursor = 'pointer';
                row.addEventListener('click', (e) => {
                    // 체크박스나 버튼 클릭 시 무시
                    if (e.target.matches('input, button, a')) return;

                    if (!config.multiple) {
                        // 단일 선택
                        rows.forEach(r => r.classList.remove(config.className));
                    }

                    row.classList.toggle(config.className);

                    // 커스텀 이벤트 발생
                    const event = new CustomEvent('table:rowSelected', {
                        detail: {
                            row: row,
                            selected: row.classList.contains(config.className),
                            selectedRows: tbody.querySelectorAll('.' + config.className)
                        }
                    });
                    table.dispatchEvent(event);
                });
            });
        },

        // 필터링 기능
        filter: function(table, searchTerm, columnIndexes = null) {
            const tbody = table.querySelector('tbody');
            const rows = tbody.querySelectorAll('tr');
            const term = searchTerm.toLowerCase();
            let visibleCount = 0;

            rows.forEach(row => {
                let shouldShow = false;
                const cells = row.querySelectorAll('td');

                if (columnIndexes) {
                    // 특정 컬럼만 검색
                    columnIndexes.forEach(index => {
                        if (cells[index] && cells[index].textContent.toLowerCase().includes(term)) {
                            shouldShow = true;
                        }
                    });
                } else {
                    // 모든 컬럼 검색
                    cells.forEach(cell => {
                        if (cell.textContent.toLowerCase().includes(term)) {
                            shouldShow = true;
                        }
                    });
                }

                row.style.display = shouldShow ? '' : 'none';
                if (shouldShow) visibleCount++;
            });

            // 결과가 없으면 빈 상태 표시
            this.toggleEmptyState(table, visibleCount === 0);

            return visibleCount;
        },

        // 빈 상태 토글
        toggleEmptyState: function(table, isEmpty) {
            let emptyRow = table.querySelector('.table__empty-row');
            const tbody = table.querySelector('tbody');

            if (isEmpty) {
                if (!emptyRow) {
                    const columnCount = table.querySelectorAll('thead th').length;
                    emptyRow = document.createElement('tr');
                    emptyRow.className = 'table__empty-row';
                    emptyRow.innerHTML = `
                        <td colspan="${columnCount}" class="table__empty">
                            <div>데이터가 없습니다</div>
                        </td>
                    `;
                    tbody.appendChild(emptyRow);
                }
                emptyRow.style.display = '';
            } else if (emptyRow) {
                emptyRow.style.display = 'none';
            }
        },

        // 페이지네이션 지원
        paginate: function(table, options = {}) {
            const config = Object.assign({
                rowsPerPage: 10,
                currentPage: 1
            }, options);

            const tbody = table.querySelector('tbody');
            const rows = Array.from(tbody.querySelectorAll('tr')).filter(row =>
                !row.classList.contains('table__empty-row')
            );

            const totalPages = Math.ceil(rows.length / config.rowsPerPage);
            const start = (config.currentPage - 1) * config.rowsPerPage;
            const end = start + config.rowsPerPage;

            // 모든 행 숨기기
            rows.forEach((row, index) => {
                row.style.display = (index >= start && index < end) ? '' : 'none';
            });

            return {
                currentPage: config.currentPage,
                totalPages: totalPages,
                totalRows: rows.length,
                rowsPerPage: config.rowsPerPage
            };
        },

        // CSV 내보내기
        exportToCSV: function(table, filename = 'table.csv') {
            const rows = [];

            // 헤더
            const headers = Array.from(table.querySelectorAll('thead th'))
                .map(th => th.textContent.trim());
            rows.push(headers);

            // 데이터 행
            table.querySelectorAll('tbody tr').forEach(tr => {
                if (tr.style.display !== 'none' && !tr.classList.contains('table__empty-row')) {
                    const cells = Array.from(tr.querySelectorAll('td'))
                        .map(td => td.textContent.trim());
                    rows.push(cells);
                }
            });

            // CSV 문자열 생성
            const csvContent = rows.map(row =>
                row.map(cell => `"${cell.replace(/"/g, '""')}"`).join(',')
            ).join('\n');

            // 다운로드
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = filename;
            link.click();
        }
    };
    // ========================================================================

    /**
     * 초기화
     */
    BRICKS.init = function() {
        BRICKS.Dropdown.init();
        BRICKS.Modal.init();
        BRICKS.Toggle.init();
        BRICKS.Alert.init();
        BRICKS.Tabs.init();
        BRICKS.Accordion.init();
        BRICKS.Pagination.init();
        BRICKS.Breadcrumb.init();
        BRICKS.Navbar.init();
        BRICKS.Table.init();
    };

    // DOM 로드 시 초기화
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", BRICKS.init);
    } else {
        BRICKS.init();
    }

    // MutationObserver로 동적 콘텐츠 감지
    const observer = new MutationObserver(function() {
        BRICKS.init();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

})();
