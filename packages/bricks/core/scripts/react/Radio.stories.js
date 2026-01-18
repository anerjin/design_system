import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Radio, RadioGroup } from './Radio';
const meta = {
    title: 'Data Entry/Radio',
    component: Radio,
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
            options: [undefined, 'primary', 'success', 'danger', 'warning', 'info', 'dark'],
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
export const Default = {
    args: {
        label: 'Radio Button',
        name: 'default',
        value: 'option1',
    },
};
export const WithDescription = {
    args: {
        label: 'Option with description',
        description: 'This option includes additional information',
        name: 'description',
        value: 'option1',
    },
};
export const Disabled = {
    args: {
        label: 'Disabled option',
        disabled: true,
        name: 'disabled',
        value: 'option1',
    },
};
export const Required = {
    args: {
        label: 'Required option',
        required: true,
        name: 'required',
        value: 'option1',
    },
};
export const Small = {
    args: {
        size: 'sm',
        label: 'Small radio',
        name: 'small',
        value: 'option1',
    },
};
export const Large = {
    args: {
        size: 'lg',
        label: 'Large radio',
        name: 'large',
        value: 'option1',
    },
};
export const Variants = {
    render: () => (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '12px' }, children: [_jsx(Radio, { label: "Default", name: "variants", value: "default", defaultChecked: true }), _jsx(Radio, { label: "Primary", variant: "primary", name: "variants", value: "primary" }), _jsx(Radio, { label: "Success", variant: "success", name: "variants", value: "success" }), _jsx(Radio, { label: "Danger", variant: "danger", name: "variants", value: "danger" }), _jsx(Radio, { label: "Warning", variant: "warning", name: "variants", value: "warning" }), _jsx(Radio, { label: "Info", variant: "info", name: "variants", value: "info" }), _jsx(Radio, { label: "Dark", variant: "dark", name: "variants", value: "dark" })] })),
};
export const Sizes = {
    render: () => (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '12px' }, children: [_jsx(Radio, { size: "sm", label: "Small radio", name: "sizes", value: "small" }), _jsx(Radio, { size: "md", label: "Medium radio (default)", name: "sizes", value: "medium", defaultChecked: true }), _jsx(Radio, { size: "lg", label: "Large radio", name: "sizes", value: "large" })] })),
};
export const RadioGroupExample = {
    render: () => {
        const [selectedValue, setSelectedValue] = useState('option1');
        const options = [
            { value: 'option1', label: 'Option 1', description: 'First choice' },
            { value: 'option2', label: 'Option 2', description: 'Second choice' },
            { value: 'option3', label: 'Option 3', description: 'Third choice' },
            { value: 'option4', label: 'Option 4', description: 'Fourth choice', disabled: true },
        ];
        return (_jsxs("div", { children: [_jsx("h4", { style: { marginBottom: '12px' }, children: "Select an option:" }), _jsx("div", { style: { display: 'flex', flexDirection: 'column', gap: '12px' }, children: options.map(option => (_jsx(Radio, { name: "group", value: option.value, label: option.label, description: option.description, disabled: option.disabled, checked: selectedValue === option.value, onChange: (e) => setSelectedValue(e.target.value) }, option.value))) }), _jsxs("p", { style: { marginTop: '16px', fontSize: '14px', color: '#666' }, children: ["Selected: ", selectedValue] })] }));
    },
};
export const PaymentMethods = {
    render: () => {
        const [selectedMethod, setSelectedMethod] = useState('credit');
        const methods = [
            {
                value: 'credit',
                label: (_jsxs(_Fragment, { children: [_jsx("i", { className: "bx bx-credit-card" }), " Credit Card"] })),
                description: 'Pay with Visa, MasterCard, or American Express',
            },
            {
                value: 'paypal',
                label: (_jsxs(_Fragment, { children: [_jsx("i", { className: "bx bxl-paypal" }), " PayPal"] })),
                description: 'Fast and secure payment with PayPal',
            },
            {
                value: 'bank',
                label: (_jsxs(_Fragment, { children: [_jsx("i", { className: "bx bx-building" }), " Bank Transfer"] })),
                description: 'Direct transfer from your bank account',
            },
            {
                value: 'crypto',
                label: (_jsxs(_Fragment, { children: [_jsx("i", { className: "bx bxl-bitcoin" }), " Cryptocurrency"] })),
                description: 'Pay with Bitcoin, Ethereum, or other cryptocurrencies',
            },
        ];
        return (_jsxs("div", { style: { width: '350px' }, children: [_jsx("h3", { style: { marginBottom: '16px' }, children: "Payment Method" }), _jsx("div", { style: { display: 'flex', flexDirection: 'column', gap: '16px' }, children: methods.map(method => (_jsx("div", { style: {
                            padding: '12px',
                            border: selectedMethod === method.value ? '2px solid #007bff' : '1px solid #ddd',
                            borderRadius: '8px',
                            cursor: 'pointer',
                        }, onClick: () => setSelectedMethod(method.value), children: _jsx(Radio, { name: "payment", value: method.value, label: method.label, description: method.description, checked: selectedMethod === method.value, onChange: (e) => setSelectedMethod(e.target.value), variant: "primary" }) }, method.value))) })] }));
    },
};
export const RadioGroupVertical = {
    render: () => {
        const [value, setValue] = useState('option1');
        return (_jsxs(RadioGroup, { name: "vertical-group", label: "Select your preference", value: value, onChange: (newValue) => setValue(newValue), required: true, children: [_jsx(Radio, { value: "option1", label: "Option 1", description: "First choice" }), _jsx(Radio, { value: "option2", label: "Option 2", description: "Second choice" }), _jsx(Radio, { value: "option3", label: "Option 3", description: "Third choice" }), _jsx(Radio, { value: "option4", label: "Option 4", description: "Fourth choice", disabled: true })] }));
    },
};
export const RadioGroupInline = {
    render: () => {
        const [value, setValue] = useState('small');
        return (_jsxs(RadioGroup, { name: "inline-group", label: "Select size", value: value, onChange: (newValue) => setValue(newValue), inline: true, children: [_jsx(Radio, { value: "small", label: "S" }), _jsx(Radio, { value: "medium", label: "M" }), _jsx(Radio, { value: "large", label: "L" }), _jsx(Radio, { value: "xlarge", label: "XL" })] }));
    },
};
export const RadioStates = {
    render: () => (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '12px' }, children: [_jsx(Radio, { name: "states", value: "unchecked", label: "Unchecked" }), _jsx(Radio, { name: "states2", value: "checked", label: "Checked", defaultChecked: true }), _jsx(Radio, { name: "states", value: "disabled", label: "Disabled", disabled: true }), _jsx(Radio, { name: "states2", value: "disabled-checked", label: "Disabled Checked", disabled: true, defaultChecked: true })] })),
};
export const CompleteExample = {
    render: () => {
        const [shirtSize, setShirtSize] = useState('medium');
        const [deliverySpeed, setDeliverySpeed] = useState('standard');
        return (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '24px', minWidth: '400px' }, children: [_jsxs(RadioGroup, { name: "shirt-size", label: "T-Shirt Size", value: shirtSize, onChange: (value) => setShirtSize(value), inline: true, required: true, children: [_jsx(Radio, { value: "xsmall", label: "XS" }), _jsx(Radio, { value: "small", label: "S" }), _jsx(Radio, { value: "medium", label: "M" }), _jsx(Radio, { value: "large", label: "L" }), _jsx(Radio, { value: "xlarge", label: "XL" }), _jsx(Radio, { value: "xxlarge", label: "XXL" })] }), _jsxs(RadioGroup, { name: "delivery", label: "Delivery Speed", value: deliverySpeed, onChange: (value) => setDeliverySpeed(value), children: [_jsx(Radio, { value: "express", label: "Express Delivery", description: "Get your order in 1-2 business days (+$15)", variant: "primary" }), _jsx(Radio, { value: "standard", label: "Standard Delivery", description: "Get your order in 5-7 business days (Free)" }), _jsx(Radio, { value: "economy", label: "Economy Delivery", description: "Get your order in 10-14 business days (-$5)" })] }), _jsxs("div", { style: { padding: '12px', background: '#f3f4f6', borderRadius: '8px' }, children: [_jsx("p", { style: { margin: 0, fontSize: '14px' }, children: "Selected Options:" }), _jsxs("p", { style: { margin: '4px 0 0', fontSize: '12px', color: '#6b7280' }, children: ["Size: ", shirtSize.toUpperCase(), " | Delivery: ", deliverySpeed] })] })] }));
    },
};
//# sourceMappingURL=Radio.stories.js.map