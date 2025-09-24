import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect, forwardRef } from 'react';
/**
 * BRICKS 디자인 시스템 Dropdown 컴포넌트
 *
 * @example
 * ```tsx
 * <Dropdown
 *   placeholder="Select an option"
 *   options={[
 *     { value: 'option1', label: 'Option 1' },
 *     { value: 'option2', label: 'Option 2' },
 *   ]}
 *   value={selectedValue}
 *   onChange={setSelectedValue}
 * />
 * ```
 */
export const Dropdown = forwardRef(({ options, value, placeholder = 'Select...', size = 'md', variant = 'default', disabled = false, onChange, className, placement = 'bottom', searchable = false, multiple = false, values = [], onMultiChange, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedValues, setSelectedValues] = useState(values);
    const dropdownRef = useRef(null);
    const inputRef = useRef(null);
    useEffect(() => {
        if (multiple && values) {
            setSelectedValues(values);
        }
    }, [values, multiple]);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
                setSearchTerm('');
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    const handleToggle = () => {
        if (!disabled) {
            setIsOpen(!isOpen);
            if (!isOpen && searchable) {
                setTimeout(() => inputRef.current?.focus(), 0);
            }
        }
    };
    const handleSelect = (optionValue) => {
        if (multiple) {
            const newValues = selectedValues.includes(optionValue)
                ? selectedValues.filter(v => v !== optionValue)
                : [...selectedValues, optionValue];
            setSelectedValues(newValues);
            onMultiChange?.(newValues);
        }
        else {
            onChange?.(optionValue);
            setIsOpen(false);
            setSearchTerm('');
        }
    };
    const filteredOptions = searchable
        ? options.filter(option => typeof option.label === 'string' &&
            option.label.toLowerCase().includes(searchTerm.toLowerCase()))
        : options;
    const getSelectedLabel = () => {
        if (multiple) {
            if (selectedValues.length === 0)
                return placeholder;
            if (selectedValues.length === 1) {
                const option = options.find(opt => opt.value === selectedValues[0]);
                return option?.label || selectedValues[0];
            }
            return `${selectedValues.length} selected`;
        }
        const selected = options.find(opt => opt.value === value);
        return selected?.label || placeholder;
    };
    const dropdownClasses = [
        'dropdown',
        `dropdown--${size}`,
        isOpen ? 'dropdown--open' : '',
        disabled ? 'dropdown--disabled' : '',
        className
    ].filter(Boolean).join(' ');
    const menuClasses = [
        'dropdown__menu',
        placement === 'top' ? 'dropdown--dropup' : '',
    ].filter(Boolean).join(' ');
    return (_jsx("div", { ref: ref, className: dropdownClasses, ...props, children: _jsxs("div", { ref: dropdownRef, children: [_jsx("button", { type: "button", className: "dropdown__toggle", onClick: handleToggle, disabled: disabled, "aria-haspopup": "listbox", "aria-expanded": isOpen, children: searchable && isOpen ? (_jsx("input", { ref: inputRef, type: "text", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), placeholder: "Search...", onClick: (e) => e.stopPropagation(), style: { border: 'none', outline: 'none', background: 'transparent', flex: 1 } })) : (_jsx("span", { style: { flex: 1 }, children: getSelectedLabel() })) }), _jsxs("div", { className: menuClasses, role: "listbox", children: [filteredOptions.map((option) => {
                            const isSelected = multiple
                                ? selectedValues.includes(option.value)
                                : option.value === value;
                            return (_jsxs("button", { className: [
                                    'dropdown__item',
                                    isSelected ? 'dropdown__item--active' : '',
                                    option.disabled ? 'dropdown__item--disabled' : ''
                                ].filter(Boolean).join(' '), onClick: () => !option.disabled && handleSelect(option.value), role: "option", "aria-selected": isSelected, "aria-disabled": option.disabled, type: "button", children: [multiple && (_jsx("input", { type: "checkbox", checked: isSelected, onChange: () => { }, disabled: option.disabled, style: { marginRight: '8px' } })), option.icon && (_jsx("span", { style: { marginRight: '8px' }, children: option.icon })), option.label] }, option.value));
                        }), filteredOptions.length === 0 && (_jsx("div", { className: "dropdown__item dropdown__item--disabled", children: "No options found" }))] })] }) }));
});
Dropdown.displayName = 'Dropdown';
export default Dropdown;
//# sourceMappingURL=Dropdown.js.map