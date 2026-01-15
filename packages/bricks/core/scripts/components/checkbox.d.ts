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
export { CheckboxComponent, SelectAllChangeDetail, RequiredGroupValidateDetail, IndeterminateChangeDetail };
//# sourceMappingURL=checkbox.d.ts.map