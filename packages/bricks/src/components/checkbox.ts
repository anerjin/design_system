/**
 * BRICKS Design System - Checkbox Component
 * Native checkbox의 접근성을 활용한 최소한의 향상 기능
 */

interface SelectAllChangeDetail {
    checked: boolean;
    indeterminate: boolean;
}

interface RequiredGroupValidateDetail {
    valid: boolean;
}

interface IndeterminateChangeDetail {
    indeterminate: boolean;
}

interface CheckboxComponent {
    init(): void;
    initSelectAll(selectAllCheckbox: HTMLInputElement): void;
    initRequiredGroup(group: HTMLElement): void;
    triggerEvent(element: HTMLElement, eventName: string, detail: any): void;
    setChecked(selector: string | HTMLInputElement, checked: boolean): void;
    setIndeterminate(selector: string | HTMLInputElement, indeterminate: boolean): void;
    getCheckedValues(groupSelector: string): string[];
    setCheckedValues(groupSelector: string, values: string[]): void;
    setAllChecked(groupSelector: string, checked: boolean): void;
    setDisabled(selector: string | HTMLInputElement, disabled: boolean): void;
}



(function(global: Window) {
    "use strict";

    global.BRICKS = global.BRICKS || {} as any;

    global.BRICKS.Checkbox = {
        init: function(): void {
            // Indeterminate 상태 체크박스 처리
            document.querySelectorAll('[data-indeterminate], #indeterminate-checkbox').forEach((checkbox: Element) => {
                const checkboxInput = checkbox as HTMLInputElement;
                checkboxInput.indeterminate = true;
                checkboxInput.setAttribute('aria-checked', 'mixed');
            });

            // Select All 패턴 초기화
            document.querySelectorAll('[data-checkbox-select-all]').forEach((selectAll: Element) => {
                this.initSelectAll(selectAll as HTMLInputElement);
            });

            // Required 그룹 초기화
            document.querySelectorAll('[data-required]').forEach((group: Element) => {
                this.initRequiredGroup(group as HTMLElement);
            });

            // aria-describedby 자동 연결 (설명 텍스트가 있는 경우)
            document.querySelectorAll('.checkbox__description').forEach((desc: Element) => {
                const descElement = desc as HTMLElement;
                if (!descElement.id) {
                    descElement.id = 'desc-' + Math.random().toString(36).substr(2, 9);
                }
                const checkboxContainer = descElement.closest('.checkbox');
                const checkbox = checkboxContainer?.querySelector('.checkbox__input') as HTMLInputElement | null;
                if (checkbox && !checkbox.hasAttribute('aria-describedby')) {
                    checkbox.setAttribute('aria-describedby', descElement.id);
                }
            });
        },

        initSelectAll: function(selectAllCheckbox: HTMLInputElement): void {
            const self = this;  // this 컨텍스트 저장
            const group: HTMLElement | null = selectAllCheckbox.closest('.checkbox-group, fieldset');
            if (!group) return;

            // Select All과 하위 항목을 명확히 구분
            const checkboxes: HTMLInputElement[] = Array.from(group.querySelectorAll('.checkbox__input')).filter((cb: Element) => {
                const checkbox = cb as HTMLInputElement;
                return checkbox !== selectAllCheckbox && !checkbox.hasAttribute('data-checkbox-select-all');
            }) as HTMLInputElement[];

            // Select All 상태 업데이트
            const updateSelectAllState = (): void => {
                const total: number = checkboxes.length;
                const checked: number = Array.from(checkboxes).filter((cb: HTMLInputElement) => cb.checked).length;

                if (checked === 0) {
                    selectAllCheckbox.checked = false;
                    selectAllCheckbox.indeterminate = false;
                    selectAllCheckbox.removeAttribute('aria-checked');
                } else if (checked === total) {
                    selectAllCheckbox.checked = true;
                    selectAllCheckbox.indeterminate = false;
                    selectAllCheckbox.removeAttribute('aria-checked');
                } else {
                    selectAllCheckbox.checked = false;
                    selectAllCheckbox.indeterminate = true;
                    selectAllCheckbox.setAttribute('aria-checked', 'mixed');
                }

                // 커스텀 이벤트 발생
                self.triggerEvent(selectAllCheckbox, 'selectAllChange', {
                    checked: selectAllCheckbox.checked,
                    indeterminate: selectAllCheckbox.indeterminate
                } as SelectAllChangeDetail);
            };

            // Select All 클릭 처리
            selectAllCheckbox.addEventListener('change', (e: Event) => {
                // indeterminate 상태에서 클릭 시 checked로 변경
                if (selectAllCheckbox.indeterminate) {
                    selectAllCheckbox.indeterminate = false;
                    selectAllCheckbox.checked = true;
                }

                const isChecked: boolean = selectAllCheckbox.checked;
                checkboxes.forEach((checkbox: HTMLInputElement) => {
                    if (!checkbox.disabled) {
                        checkbox.checked = isChecked;
                        // change 이벤트 발생시켜 다른 리스너들이 반응하도록 함
                        const changeEvent = new Event('change', { bubbles: true });
                        checkbox.dispatchEvent(changeEvent);
                    }
                });

                // Select All 상태 업데이트 (indeterminate 해제)
                selectAllCheckbox.indeterminate = false;
                selectAllCheckbox.removeAttribute('aria-checked');
            });

            // 개별 체크박스 변경 감지
            checkboxes.forEach((checkbox: HTMLInputElement) => {
                checkbox.addEventListener('change', (e: Event) => {
                    // Select All에 의한 변경이 아닌 경우만 상태 업데이트
                    if (!e.isTrusted || e.target !== selectAllCheckbox) {
                        updateSelectAllState();
                    }
                });
            });

            // 초기 상태 설정
            updateSelectAllState();
        },

        initRequiredGroup: function(group: HTMLElement): void {
            const self = this;  // this 컨텍스트 저장
            const checkboxes: NodeListOf<HTMLInputElement> = group.querySelectorAll('.checkbox__input');
            const errorMessage: HTMLElement | null = group.querySelector('.checkbox-group__error');

            // 그룹에 aria-required 설정
            group.setAttribute('aria-required', 'true');

            const validate = (): void => {
                const hasChecked: boolean = Array.from(checkboxes).some((cb: HTMLInputElement) => cb.checked);

                if (hasChecked) {
                    group.setAttribute('aria-invalid', 'false');
                    group.classList.remove('checkbox-group--error');
                    if (errorMessage) {
                        errorMessage.hidden = true;
                        errorMessage.setAttribute('aria-hidden', 'true');
                    }
                } else {
                    group.setAttribute('aria-invalid', 'true');
                    group.classList.add('checkbox-group--error');
                    if (errorMessage) {
                        errorMessage.hidden = false;
                        errorMessage.setAttribute('aria-hidden', 'false');
                    }
                }

                // 커스텀 이벤트 발생
                self.triggerEvent(group, 'requiredGroupValidate', {
                    valid: hasChecked
                } as RequiredGroupValidateDetail);
            };

            // 각 체크박스에 change 이벤트 리스너 추가
            checkboxes.forEach((checkbox: HTMLInputElement) => {
                checkbox.addEventListener('change', validate);
            });

            // 초기 검증
            validate();
        },

        // 커스텀 이벤트 발생
        triggerEvent: function(element: HTMLElement, eventName: string, detail: any): void {
            const event = new CustomEvent(eventName, {
                bubbles: true,
                cancelable: true,
                detail: detail
            });
            element.dispatchEvent(event);
        },

        // === 유틸리티 함수들 (프로그래밍적 제어용) ===

        /**
         * 체크박스 체크/해제
         * @param {string|HTMLInputElement} selector - 선택자 또는 요소
         * @param {boolean} checked - 체크 상태
         */
        setChecked: function(selector: string | HTMLInputElement, checked: boolean): void {
            const checkbox: HTMLInputElement | null = typeof selector === 'string'
                ? document.querySelector(selector)
                : selector;

            if (checkbox && !checkbox.disabled) {
                checkbox.checked = checked;
                checkbox.indeterminate = false;
                checkbox.removeAttribute('aria-checked');
                checkbox.dispatchEvent(new Event('change', { bubbles: true }));
            }
        },

        /**
         * Indeterminate 상태 설정
         * @param {string|HTMLInputElement} selector - 선택자 또는 요소
         * @param {boolean} indeterminate - indeterminate 상태
         */
        setIndeterminate: function(selector: string | HTMLInputElement, indeterminate: boolean): void {
            const checkbox: HTMLInputElement | null = typeof selector === 'string'
                ? document.querySelector(selector)
                : selector;

            if (checkbox && !checkbox.disabled) {
                checkbox.indeterminate = indeterminate;
                if (indeterminate) {
                    checkbox.setAttribute('aria-checked', 'mixed');
                } else {
                    checkbox.removeAttribute('aria-checked');
                }

                this.triggerEvent(checkbox, 'indeterminateChange', {
                    indeterminate: indeterminate
                } as IndeterminateChangeDetail);
            }
        },

        /**
         * 체크된 값들 가져오기
         * @param {string} groupSelector - 그룹 선택자
         * @returns {Array} 체크된 값들의 배열
         */
        getCheckedValues: function(groupSelector: string): string[] {
            const group: HTMLElement | null = document.querySelector(groupSelector);
            if (!group) return [];

            return Array.from(group.querySelectorAll('.checkbox__input:checked'))
                .map((cb: Element) => (cb as HTMLInputElement).value)
                .filter(Boolean);
        },

        /**
         * 값으로 체크박스 설정
         * @param {string} groupSelector - 그룹 선택자
         * @param {Array} values - 체크할 값들의 배열
         */
        setCheckedValues: function(groupSelector: string, values: string[]): void {
            const group: HTMLElement | null = document.querySelector(groupSelector);
            if (!group) return;

            group.querySelectorAll('.checkbox__input').forEach((checkbox: Element) => {
                const checkboxInput = checkbox as HTMLInputElement;
                checkboxInput.checked = values.includes(checkboxInput.value);
                checkboxInput.dispatchEvent(new Event('change', { bubbles: true }));
            });
        },

        /**
         * 모든 체크박스 선택/해제
         * @param {string} groupSelector - 그룹 선택자
         * @param {boolean} checked - 체크 상태
         */
        setAllChecked: function(groupSelector: string, checked: boolean): void {
            const group: HTMLElement | null = document.querySelector(groupSelector);
            if (!group) return;

            group.querySelectorAll('.checkbox__input').forEach((checkbox: Element) => {
                const checkboxInput = checkbox as HTMLInputElement;
                if (!checkboxInput.disabled) {
                    checkboxInput.checked = checked;
                    checkboxInput.dispatchEvent(new Event('change', { bubbles: true }));
                }
            });
        },

        /**
         * 체크박스 활성화/비활성화
         * @param {string|HTMLInputElement} selector - 선택자 또는 요소
         * @param {boolean} disabled - 비활성화 상태
         */
        setDisabled: function(selector: string | HTMLInputElement, disabled: boolean): void {
            const checkbox: HTMLInputElement | null = typeof selector === 'string'
                ? document.querySelector(selector)
                : selector;

            if (checkbox) {
                checkbox.disabled = disabled;
            }
        }
    };

})(window);

// DOM이 완전히 로드된 후 초기화
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        window.BRICKS.Checkbox.init();
    });
} else {
    // 이미 DOM이 로드된 경우 즉시 실행
    window.BRICKS.Checkbox.init();
}

export { CheckboxComponent, SelectAllChangeDetail, RequiredGroupValidateDetail, IndeterminateChangeDetail };