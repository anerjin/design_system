import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Dropdown } from './Dropdown';
const meta = {
    title: 'Data Entry/Dropdown',
    component: Dropdown,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
        },
        variant: {
            control: 'select',
            options: ['default', 'outlined', 'filled'],
        },
        placement: {
            control: 'select',
            options: ['bottom', 'top'],
        },
        disabled: {
            control: 'boolean',
        },
        searchable: {
            control: 'boolean',
        },
        multiple: {
            control: 'boolean',
        },
    },
};
export default meta;
const basicOptions = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'solid', label: 'SolidJS' },
];
const countryOptions = [
    { value: 'us', label: 'United States', icon: _jsx("i", { className: "bx bx-globe" }) },
    { value: 'kr', label: 'South Korea', icon: _jsx("i", { className: "bx bx-globe" }) },
    { value: 'jp', label: 'Japan', icon: _jsx("i", { className: "bx bx-globe" }) },
    { value: 'cn', label: 'China', icon: _jsx("i", { className: "bx bx-globe" }) },
    { value: 'de', label: 'Germany', icon: _jsx("i", { className: "bx bx-globe" }) },
    { value: 'fr', label: 'France', icon: _jsx("i", { className: "bx bx-globe" }) },
    { value: 'gb', label: 'United Kingdom', icon: _jsx("i", { className: "bx bx-globe" }) },
    { value: 'ca', label: 'Canada', icon: _jsx("i", { className: "bx bx-globe" }) },
];
const DropdownWithState = (args) => {
    const [value, setValue] = useState(args.value || '');
    return (_jsxs("div", { style: { minHeight: '200px', padding: '20px' }, children: [_jsx(Dropdown, { ...args, value: value, onChange: setValue }), value && (_jsxs("p", { style: { marginTop: '16px', fontSize: '14px' }, children: ["Selected: ", _jsx("strong", { children: value })] }))] }));
};
const MultiDropdownWithState = (args) => {
    const [values, setValues] = useState(args.values || []);
    return (_jsxs("div", { style: { minHeight: '200px', padding: '20px' }, children: [_jsx(Dropdown, { ...args, multiple: true, values: values, onMultiChange: setValues }), values.length > 0 && (_jsxs("p", { style: { marginTop: '16px', fontSize: '14px' }, children: ["Selected: ", _jsx("strong", { children: values.join(', ') })] }))] }));
};
export const Default = {
    render: (args) => _jsx(DropdownWithState, { ...args }),
    args: {
        placeholder: 'Select a framework',
        options: basicOptions,
    },
};
export const WithValue = {
    render: (args) => _jsx(DropdownWithState, { ...args }),
    args: {
        placeholder: 'Select a framework',
        options: basicOptions,
        value: 'react',
    },
};
export const Searchable = {
    render: (args) => _jsx(DropdownWithState, { ...args }),
    args: {
        placeholder: 'Search and select a country',
        options: countryOptions,
        searchable: true,
    },
};
export const Multiple = {
    render: (args) => _jsx(MultiDropdownWithState, { ...args }),
    args: {
        placeholder: 'Select multiple frameworks',
        options: basicOptions,
    },
};
export const WithIcons = {
    render: (args) => _jsx(DropdownWithState, { ...args }),
    args: {
        placeholder: 'Select a status',
        options: [
            { value: 'active', label: 'Active', icon: _jsx("i", { className: "bx bx-check-circle" }) },
            { value: 'pending', label: 'Pending', icon: _jsx("i", { className: "bx bx-time" }) },
            { value: 'inactive', label: 'Inactive', icon: _jsx("i", { className: "bx bx-x-circle" }) },
            { value: 'archived', label: 'Archived', icon: _jsx("i", { className: "bx bx-folder" }) },
        ],
    },
};
export const Disabled = {
    render: () => (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '24px', minHeight: '200px' }, children: [_jsxs("div", { children: [_jsx("p", { style: { marginBottom: '8px', fontSize: '12px', color: '#666' }, children: "Disabled dropdown (no value)" }), _jsx(DropdownWithState, { placeholder: "This dropdown is disabled", options: basicOptions, disabled: true })] }), _jsxs("div", { children: [_jsx("p", { style: { marginBottom: '8px', fontSize: '12px', color: '#666' }, children: "Disabled dropdown (with value)" }), _jsx(DropdownWithState, { placeholder: "Select a framework", options: basicOptions, value: "react", disabled: true })] })] })),
};
export const DisabledOptions = {
    render: (args) => _jsx(DropdownWithState, { ...args }),
    args: {
        placeholder: 'Some options are disabled',
        options: [
            { value: 'option1', label: 'Option 1' },
            { value: 'option2', label: 'Option 2 (Disabled)', disabled: true },
            { value: 'option3', label: 'Option 3' },
            { value: 'option4', label: 'Option 4 (Disabled)', disabled: true },
            { value: 'option5', label: 'Option 5' },
        ],
    },
};
export const Sizes = {
    render: () => (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '24px', minHeight: '300px' }, children: [_jsx(DropdownWithState, { placeholder: "Small dropdown", options: basicOptions, size: "sm" }), _jsx(DropdownWithState, { placeholder: "Medium dropdown", options: basicOptions, size: "md" }), _jsx(DropdownWithState, { placeholder: "Large dropdown", options: basicOptions, size: "lg" })] })),
};
export const Variants = {
    render: () => (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '24px', minHeight: '300px' }, children: [_jsx(DropdownWithState, { placeholder: "Default variant", options: basicOptions, variant: "default" }), _jsx(DropdownWithState, { placeholder: "Outlined variant", options: basicOptions, variant: "outlined" }), _jsx(DropdownWithState, { placeholder: "Filled variant", options: basicOptions, variant: "filled" })] })),
};
export const LongList = {
    render: (args) => _jsx(DropdownWithState, { ...args }),
    args: {
        placeholder: 'Select a timezone',
        searchable: true,
        options: [
            { value: 'utc-12', label: 'UTC-12:00 Baker Island' },
            { value: 'utc-11', label: 'UTC-11:00 American Samoa' },
            { value: 'utc-10', label: 'UTC-10:00 Hawaii' },
            { value: 'utc-9', label: 'UTC-09:00 Alaska' },
            { value: 'utc-8', label: 'UTC-08:00 Pacific Time (US & Canada)' },
            { value: 'utc-7', label: 'UTC-07:00 Mountain Time (US & Canada)' },
            { value: 'utc-6', label: 'UTC-06:00 Central Time (US & Canada)' },
            { value: 'utc-5', label: 'UTC-05:00 Eastern Time (US & Canada)' },
            { value: 'utc-4', label: 'UTC-04:00 Atlantic Time (Canada)' },
            { value: 'utc-3', label: 'UTC-03:00 Buenos Aires' },
            { value: 'utc-2', label: 'UTC-02:00 Mid-Atlantic' },
            { value: 'utc-1', label: 'UTC-01:00 Azores' },
            { value: 'utc0', label: 'UTC+00:00 London, Dublin' },
            { value: 'utc1', label: 'UTC+01:00 Paris, Berlin' },
            { value: 'utc2', label: 'UTC+02:00 Cairo, Athens' },
            { value: 'utc3', label: 'UTC+03:00 Moscow, Istanbul' },
            { value: 'utc4', label: 'UTC+04:00 Dubai, Baku' },
            { value: 'utc5', label: 'UTC+05:00 Karachi, Tashkent' },
            { value: 'utc5-30', label: 'UTC+05:30 Mumbai, New Delhi' },
            { value: 'utc6', label: 'UTC+06:00 Dhaka, Almaty' },
            { value: 'utc7', label: 'UTC+07:00 Bangkok, Jakarta' },
            { value: 'utc8', label: 'UTC+08:00 Beijing, Singapore' },
            { value: 'utc9', label: 'UTC+09:00 Tokyo, Seoul' },
            { value: 'utc10', label: 'UTC+10:00 Sydney, Melbourne' },
            { value: 'utc11', label: 'UTC+11:00 Solomon Islands' },
            { value: 'utc12', label: 'UTC+12:00 Auckland, Fiji' },
        ],
    },
};
export const FormExample = {
    render: () => {
        const [country, setCountry] = useState('');
        const [language, setLanguage] = useState('');
        const [timezone, setTimezone] = useState('');
        return (_jsxs("div", { style: { width: '400px', padding: '24px', background: '#f8f9fa', borderRadius: '8px' }, children: [_jsx("h3", { style: { marginBottom: '20px', fontSize: '18px', fontWeight: 600 }, children: "User Preferences" }), _jsxs("div", { style: { marginBottom: '20px' }, children: [_jsx("label", { style: { display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }, children: "Country" }), _jsx(Dropdown, { placeholder: "Select your country", options: countryOptions, value: country, onChange: setCountry })] }), _jsxs("div", { style: { marginBottom: '20px' }, children: [_jsx("label", { style: { display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }, children: "Language" }), _jsx(Dropdown, { placeholder: "Select your language", options: [
                                { value: 'en', label: 'English' },
                                { value: 'ko', label: '한국어' },
                                { value: 'ja', label: '日本語' },
                                { value: 'zh', label: '中文' },
                                { value: 'es', label: 'Español' },
                                { value: 'fr', label: 'Français' },
                                { value: 'de', label: 'Deutsch' },
                            ], value: language, onChange: setLanguage })] }), _jsxs("div", { style: { marginBottom: '24px' }, children: [_jsx("label", { style: { display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }, children: "Timezone" }), _jsx(Dropdown, { placeholder: "Select your timezone", searchable: true, options: [
                                { value: 'utc-8', label: 'UTC-08:00 Pacific Time' },
                                { value: 'utc-5', label: 'UTC-05:00 Eastern Time' },
                                { value: 'utc0', label: 'UTC+00:00 London' },
                                { value: 'utc1', label: 'UTC+01:00 Paris' },
                                { value: 'utc9', label: 'UTC+09:00 Seoul' },
                            ], value: timezone, onChange: setTimezone })] }), _jsx("button", { style: {
                        width: '100%',
                        padding: '10px',
                        background: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '14px',
                        fontWeight: 500,
                        cursor: 'pointer',
                    }, onClick: () => {
                        alert(`Preferences saved!\nCountry: ${country}\nLanguage: ${language}\nTimezone: ${timezone}`);
                    }, children: "Save Preferences" })] }));
    },
};
//# sourceMappingURL=Dropdown.stories.js.map