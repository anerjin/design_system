import React, { useState, useRef, useEffect, forwardRef } from 'react';

export interface DropdownOption {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface DropdownProps {
  /**
   * 드롭다운 옵션 목록
   */
  options: DropdownOption[];

  /**
   * 선택된 값
   */
  value?: string;

  /**
   * 플레이스홀더
   */
  placeholder?: string;

  /**
   * 드롭다운 크기
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * 드롭다운 변형
   * @default 'default'
   */
  variant?: 'default' | 'outlined' | 'filled';

  /**
   * 비활성화 여부
   */
  disabled?: boolean;

  /**
   * 값 변경 이벤트
   */
  onChange?: (value: string) => void;

  /**
   * 추가 CSS 클래스
   */
  className?: string;

  /**
   * 드롭다운 방향
   * @default 'bottom'
   */
  placement?: 'bottom' | 'top';

  /**
   * 검색 가능 여부
   */
  searchable?: boolean;

  /**
   * 다중 선택 가능 여부
   */
  multiple?: boolean;

  /**
   * 선택된 값들 (다중 선택 시)
   */
  values?: string[];

  /**
   * 다중 선택 시 값 변경 이벤트
   */
  onMultiChange?: (values: string[]) => void;
}

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
export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(({
  options,
  value,
  placeholder = 'Select...',
  size = 'md',
  variant = 'default',
  disabled = false,
  onChange,
  className,
  placement = 'bottom',
  searchable = false,
  multiple = false,
  values = [],
  onMultiChange,
  ...props
}, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedValues, setSelectedValues] = useState<string[]>(values);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (multiple && values) {
      setSelectedValues(values);
    }
  }, [values, multiple]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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

  const handleSelect = (optionValue: string) => {
    if (multiple) {
      const newValues = selectedValues.includes(optionValue)
        ? selectedValues.filter(v => v !== optionValue)
        : [...selectedValues, optionValue];

      setSelectedValues(newValues);
      onMultiChange?.(newValues);
    } else {
      onChange?.(optionValue);
      setIsOpen(false);
      setSearchTerm('');
    }
  };

  const filteredOptions = searchable
    ? options.filter(option =>
        typeof option.label === 'string' &&
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  const getSelectedLabel = () => {
    if (multiple) {
      if (selectedValues.length === 0) return placeholder;
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

  return (
    <div ref={ref} className={dropdownClasses} {...props}>
      <div ref={dropdownRef}>
        <button
          type="button"
          className="dropdown__toggle"
          onClick={handleToggle}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          {searchable && isOpen ? (
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              onClick={(e) => e.stopPropagation()}
              style={{ border: 'none', outline: 'none', background: 'transparent', flex: 1 }}
            />
          ) : (
            <span style={{ flex: 1 }}>
              {getSelectedLabel()}
            </span>
          )}
        </button>

        <div className={menuClasses} role="listbox">
          {filteredOptions.map((option) => {
            const isSelected = multiple
              ? selectedValues.includes(option.value)
              : option.value === value;

            return (
              <button
                key={option.value}
                className={[
                  'dropdown__item',
                  isSelected ? 'dropdown__item--active' : '',
                  option.disabled ? 'dropdown__item--disabled' : ''
                ].filter(Boolean).join(' ')}
                onClick={() => !option.disabled && handleSelect(option.value)}
                role="option"
                aria-selected={isSelected}
                aria-disabled={option.disabled}
                type="button"
              >
                {multiple && (
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => {}}
                    disabled={option.disabled}
                    style={{ marginRight: '8px' }}
                  />
                )}
                {option.icon && (
                  <span style={{ marginRight: '8px' }}>{option.icon}</span>
                )}
                {option.label}
              </button>
            );
          })}
          {filteredOptions.length === 0 && (
            <div className="dropdown__item dropdown__item--disabled">
              No options found
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

Dropdown.displayName = 'Dropdown';

export default Dropdown;