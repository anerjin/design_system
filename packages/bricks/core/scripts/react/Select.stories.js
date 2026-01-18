import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Select } from './Select';
const meta = {
    title: 'Data Entry/Select',
    component: Select,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg', 'xl'],
        },
        state: {
            control: 'select',
            options: [undefined, 'success', 'warning', 'error'],
        },
        multiple: {
            control: 'boolean',
        },
        disabled: {
            control: 'boolean',
        },
        required: {
            control: 'boolean',
        },
    },
};
export default meta;
const defaultOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4' },
];
export const Default = {
    args: {
        options: defaultOptions,
        placeholder: 'Select an option',
    },
};
export const Sizes = {
    render: () => (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '250px' }, children: [_jsx(Select, { size: "xs", options: defaultOptions, placeholder: "Extra small select" }), _jsx(Select, { size: "sm", options: defaultOptions, placeholder: "Small select" }), _jsx(Select, { size: "md", options: defaultOptions, placeholder: "Medium select (default)" }), _jsx(Select, { size: "lg", options: defaultOptions, placeholder: "Large select" }), _jsx(Select, { size: "xl", options: defaultOptions, placeholder: "Extra large select" })] })),
};
export const States = {
    render: () => (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '250px' }, children: [_jsx(Select, { options: defaultOptions, placeholder: "Normal state", defaultValue: "option1" }), _jsx(Select, { state: "success", options: defaultOptions, placeholder: "Success state", defaultValue: "option2" }), _jsx(Select, { state: "warning", options: defaultOptions, placeholder: "Warning state", defaultValue: "option3" }), _jsx(Select, { state: "error", options: defaultOptions, placeholder: "Error state", defaultValue: "option4" })] })),
};
export const WithPrependAppend = {
    render: () => (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '350px' }, children: [_jsx(Select, { prepend: _jsx("span", { style: { padding: '0 12px', color: '#666' }, children: "Country:" }), options: [
                    { value: 'us', label: 'United States' },
                    { value: 'uk', label: 'United Kingdom' },
                    { value: 'ca', label: 'Canada' },
                    { value: 'au', label: 'Australia' },
                ], placeholder: "Select a country" }), _jsx(Select, { append: _jsx("span", { style: { padding: '0 12px', color: '#666' }, children: ".com" }), options: [
                    { value: 'www', label: 'www' },
                    { value: 'blog', label: 'blog' },
                    { value: 'shop', label: 'shop' },
                    { value: 'api', label: 'api' },
                ], placeholder: "Select subdomain" }), _jsx(Select, { prepend: _jsx("span", { style: { padding: '0 12px', color: '#666' }, children: "$" }), append: _jsx("span", { style: { padding: '0 12px', color: '#666' }, children: "USD" }), options: [
                    { value: '10', label: '10' },
                    { value: '25', label: '25' },
                    { value: '50', label: '50' },
                    { value: '100', label: '100' },
                ], placeholder: "Select amount" })] })),
};
export const Disabled = {
    render: () => (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '250px' }, children: [_jsx(Select, { options: defaultOptions, disabled: true, placeholder: "Disabled select" }), _jsx(Select, { options: defaultOptions, disabled: true, value: "option1" }), _jsx(Select, { options: defaultOptions, disabled: true, multiple: true, value: ['option1', 'option2'] })] })),
};
export const Multiple = {
    render: () => {
        const [selected, setSelected] = useState([]);
        return (_jsxs("div", { style: { minWidth: '300px' }, children: [_jsx(Select, { options: [
                        { value: 'react', label: 'React' },
                        { value: 'vue', label: 'Vue' },
                        { value: 'angular', label: 'Angular' },
                        { value: 'svelte', label: 'Svelte' },
                        { value: 'solid', label: 'Solid' },
                        { value: 'qwik', label: 'Qwik' },
                    ], multiple: true, value: selected, onChange: (e) => {
                        const options = e.target.options;
                        const values = [];
                        for (let i = 0; i < options.length; i++) {
                            if (options[i].selected) {
                                values.push(options[i].value);
                            }
                        }
                        setSelected(values);
                    } }), _jsxs("p", { style: { marginTop: '12px', fontSize: '14px', color: '#666' }, children: ["Selected: ", selected.length > 0 ? selected.join(', ') : 'None'] })] }));
    },
};
export const WithDisabledOptions = {
    args: {
        options: [
            { value: 'option1', label: 'Available Option 1' },
            { value: 'option2', label: 'Available Option 2', disabled: false },
            { value: 'option3', label: 'Disabled Option 3', disabled: true },
            { value: 'option4', label: 'Available Option 4' },
            { value: 'option5', label: 'Disabled Option 5', disabled: true },
        ],
        placeholder: 'Some options are disabled',
    },
};
export const Required = {
    render: () => (_jsx("form", { onSubmit: (e) => { e.preventDefault(); alert('Form submitted!'); }, children: _jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '16px', minWidth: '300px' }, children: [_jsxs("label", { style: { display: 'flex', flexDirection: 'column', gap: '4px' }, children: [_jsxs("span", { style: { fontSize: '14px', fontWeight: '500' }, children: ["Department ", _jsx("span", { style: { color: 'red' }, children: "*" })] }), _jsx(Select, { options: [
                                { value: '', label: '-- Select Department --' },
                                { value: 'eng', label: 'Engineering' },
                                { value: 'sales', label: 'Sales' },
                                { value: 'marketing', label: 'Marketing' },
                                { value: 'hr', label: 'Human Resources' },
                            ], required: true })] }), _jsx("button", { type: "submit", style: { padding: '8px 16px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }, children: "Submit" })] }) })),
};
export const CountrySelect = {
    render: () => {
        const [country, setCountry] = useState('');
        const countries = [
            { value: 'us', label: 'United States' },
            { value: 'uk', label: 'United Kingdom' },
            { value: 'ca', label: 'Canada' },
            { value: 'au', label: 'Australia' },
            { value: 'de', label: 'Germany' },
            { value: 'fr', label: 'France' },
            { value: 'jp', label: 'Japan' },
            { value: 'kr', label: 'South Korea' },
            { value: 'cn', label: 'China' },
            { value: 'in', label: 'India' },
        ];
        return (_jsxs("div", { style: { minWidth: '300px' }, children: [_jsxs("label", { style: { display: 'flex', flexDirection: 'column', gap: '8px' }, children: [_jsx("span", { style: { fontSize: '14px', fontWeight: '500' }, children: "Select Your Country" }), _jsx(Select, { options: countries, placeholder: "Choose a country", value: country, onChange: (e) => setCountry(e.target.value) })] }), country && (_jsxs("p", { style: { marginTop: '12px', fontSize: '14px', color: '#666' }, children: ["Selected: ", countries.find(c => c.value === country)?.label] }))] }));
    },
};
export const UsingOptionElements = {
    render: () => (_jsx("div", { style: { display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '300px' }, children: _jsxs(Select, { placeholder: "Select a fruit", children: [_jsxs("optgroup", { label: "Citrus", children: [_jsx("option", { value: "orange", children: "Orange" }), _jsx("option", { value: "lemon", children: "Lemon" }), _jsx("option", { value: "lime", children: "Lime" })] }), _jsxs("optgroup", { label: "Berries", children: [_jsx("option", { value: "strawberry", children: "Strawberry" }), _jsx("option", { value: "blueberry", children: "Blueberry" }), _jsx("option", { value: "raspberry", children: "Raspberry" })] }), _jsxs("optgroup", { label: "Tropical", children: [_jsx("option", { value: "mango", children: "Mango" }), _jsx("option", { value: "pineapple", children: "Pineapple" }), _jsx("option", { value: "coconut", children: "Coconut" })] })] }) })),
};
export const FormExample = {
    render: () => {
        const [formData, setFormData] = useState({
            size: 'md',
            priority: '',
            assignee: '',
        });
        return (_jsxs("form", { style: { display: 'flex', flexDirection: 'column', gap: '16px', minWidth: '350px' }, children: [_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '4px' }, children: [_jsx("label", { style: { fontSize: '14px', fontWeight: '500' }, children: "T-Shirt Size" }), _jsxs(Select, { size: "sm", value: formData.size, onChange: (e) => setFormData({ ...formData, size: e.target.value }), children: [_jsx("option", { value: "xs", children: "XS - Extra Small" }), _jsx("option", { value: "sm", children: "S - Small" }), _jsx("option", { value: "md", children: "M - Medium" }), _jsx("option", { value: "lg", children: "L - Large" }), _jsx("option", { value: "xl", children: "XL - Extra Large" })] })] }), _jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '4px' }, children: [_jsx("label", { style: { fontSize: '14px', fontWeight: '500' }, children: "Priority Level" }), _jsxs(Select, { state: !formData.priority ? 'error' : undefined, value: formData.priority, onChange: (e) => setFormData({ ...formData, priority: e.target.value }), placeholder: "Select priority", children: [_jsx("option", { value: "", children: "-- Select Priority --" }), _jsx("option", { value: "low", children: "\uD83D\uDFE2 Low" }), _jsx("option", { value: "medium", children: "\uD83D\uDFE1 Medium" }), _jsx("option", { value: "high", children: "\uD83D\uDFE0 High" }), _jsx("option", { value: "critical", children: "\uD83D\uDD34 Critical" })] }), !formData.priority && (_jsx("span", { style: { fontSize: '12px', color: '#dc3545' }, children: "Priority is required" }))] }), _jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '4px' }, children: [_jsx("label", { style: { fontSize: '14px', fontWeight: '500' }, children: "Assign To" }), _jsxs(Select, { prepend: _jsx("span", { style: { padding: '0 8px' }, children: _jsx("i", { className: "bx bx-user" }) }), value: formData.assignee, onChange: (e) => setFormData({ ...formData, assignee: e.target.value }), placeholder: "Select team member", children: [_jsx("option", { value: "", children: "-- Unassigned --" }), _jsxs("optgroup", { label: "Development Team", children: [_jsx("option", { value: "john", children: "John Doe" }), _jsx("option", { value: "jane", children: "Jane Smith" }), _jsx("option", { value: "bob", children: "Bob Johnson" })] }), _jsxs("optgroup", { label: "Design Team", children: [_jsx("option", { value: "alice", children: "Alice Brown" }), _jsx("option", { value: "charlie", children: "Charlie Wilson" })] }), _jsxs("optgroup", { label: "QA Team", children: [_jsx("option", { value: "david", children: "David Lee" }), _jsx("option", { value: "emma", children: "Emma Davis" })] })] })] }), _jsxs("div", { style: { padding: '12px', background: '#f8f9fa', borderRadius: '4px' }, children: [_jsx("p", { style: { margin: 0, fontSize: '14px', fontWeight: '500' }, children: "Form Data:" }), _jsx("pre", { style: { margin: '8px 0 0', fontSize: '12px' }, children: JSON.stringify(formData, null, 2) })] })] }));
    },
};
//# sourceMappingURL=Select.stories.js.map