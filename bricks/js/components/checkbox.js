/**
 * BRICKS Design System - Checkbox Component
 * Native checkbox의 접근성을 활용한 최소한의 향상 기능
 */

(function(global) {
    "use strict";

    global.BRICKS = global.BRICKS || {};

    global.BRICKS.Checkbox = {
        init: function() {
            // Indeterminate 상태 체크박스 처리
            document.querySelectorAll('[data-indeterminate], #indeterminate-checkbox').forEach(checkbox => {
                checkbox.indeterminate = true;
                checkbox.setAttribute('aria-checked', 'mixed');
            });

            // Select All 패턴 초기화
            document.querySelectorAll('[data-checkbox-select-all]').forEach(selectAll => {
                this.initSelectAll(selectAll);
            });

            // Required 그룹 초기화
            document.querySelectorAll('[data-required]').forEach(group => {
                this.initRequiredGroup(group);
            });

            // aria-describedby 자동 연결 (설명 텍스트가 있는 경우)
            document.querySelectorAll('.checkbox__description').forEach(desc => {
                if (!desc.id) {
                    desc.id = 'desc-' + Math.random().toString(36).substr(2, 9);
                }
                const checkbox = desc.closest('.checkbox')?.querySelector('.checkbox__input');
                if (checkbox && !checkbox.hasAttribute('aria-describedby')) {
                    checkbox.setAttribute('aria-describedby', desc.id);
                }
            });
        },

        initSelectAll: function(selectAllCheckbox) {
            const self = this;  // this 컨텍스트 저장
            const group = selectAllCheckbox.closest('.checkbox-group, fieldset');
            if (!group) return;

            // Select All과 하위 항목을 명확히 구분
            const checkboxes = Array.from(group.querySelectorAll('.checkbox__input')).filter(cb =>
                cb !== selectAllCheckbox && !cb.hasAttribute('data-checkbox-select-all')
            );

            // Select All 상태 업데이트
            const updateSelectAllState = () => {
                const total = checkboxes.length;
                const checked = Array.from(checkboxes).filter(cb => cb.checked).length;

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
                });
            };

            // Select All 클릭 처리
            selectAllCheckbox.addEventListener('change', (e) => {
                // indeterminate 상태에서 클릭 시 checked로 변경
                if (selectAllCheckbox.indeterminate) {
                    selectAllCheckbox.indeterminate = false;
                    selectAllCheckbox.checked = true;
                }

                const isChecked = selectAllCheckbox.checked;
                checkboxes.forEach(checkbox => {
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
            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('change', (e) => {
                    // Select All에 의한 변경이 아닌 경우만 상태 업데이트
                    if (!e.isTrusted || e.target !== selectAllCheckbox) {
                        updateSelectAllState();
                    }
                });
            });

            // 초기 상태 설정
            updateSelectAllState();
        },

        initRequiredGroup: function(group) {
            const self = this;  // this 컨텍스트 저장
            const checkboxes = group.querySelectorAll('.checkbox__input');
            const errorMessage = group.querySelector('.checkbox-group__error');

            // 그룹에 aria-required 설정
            group.setAttribute('aria-required', 'true');

            const validate = () => {
                const hasChecked = Array.from(checkboxes).some(cb => cb.checked);

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
                });
            };

            // 각 체크박스에 change 이벤트 리스너 추가
            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('change', validate);
            });

            // 초기 검증
            validate();
        },

        // 커스텀 이벤트 발생
        triggerEvent: function(element, eventName, detail) {
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
         * @param {string|HTMLElement} selector - 선택자 또는 요소
         * @param {boolean} checked - 체크 상태
         */
        setChecked: function(selector, checked) {
            const checkbox = typeof selector === 'string'
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
         * @param {string|HTMLElement} selector - 선택자 또는 요소
         * @param {boolean} indeterminate - indeterminate 상태
         */
        setIndeterminate: function(selector, indeterminate) {
            const checkbox = typeof selector === 'string'
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
                });
            }
        },

        /**
         * 체크된 값들 가져오기
         * @param {string} groupSelector - 그룹 선택자
         * @returns {Array} 체크된 값들의 배열
         */
        getCheckedValues: function(groupSelector) {
            const group = document.querySelector(groupSelector);
            if (!group) return [];

            return Array.from(group.querySelectorAll('.checkbox__input:checked'))
                .map(cb => cb.value)
                .filter(Boolean);
        },

        /**
         * 값으로 체크박스 설정
         * @param {string} groupSelector - 그룹 선택자
         * @param {Array} values - 체크할 값들의 배열
         */
        setCheckedValues: function(groupSelector, values) {
            const group = document.querySelector(groupSelector);
            if (!group) return;

            group.querySelectorAll('.checkbox__input').forEach(checkbox => {
                checkbox.checked = values.includes(checkbox.value);
                checkbox.dispatchEvent(new Event('change', { bubbles: true }));
            });
        },

        /**
         * 모든 체크박스 선택/해제
         * @param {string} groupSelector - 그룹 선택자
         * @param {boolean} checked - 체크 상태
         */
        setAllChecked: function(groupSelector, checked) {
            const group = document.querySelector(groupSelector);
            if (!group) return;

            group.querySelectorAll('.checkbox__input').forEach(checkbox => {
                if (!checkbox.disabled) {
                    checkbox.checked = checked;
                    checkbox.dispatchEvent(new Event('change', { bubbles: true }));
                }
            });
        },

        /**
         * 체크박스 활성화/비활성화
         * @param {string|HTMLElement} selector - 선택자 또는 요소
         * @param {boolean} disabled - 비활성화 상태
         */
        setDisabled: function(selector, disabled) {
            const checkbox = typeof selector === 'string'
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