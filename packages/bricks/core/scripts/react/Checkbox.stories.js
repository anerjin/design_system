import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Checkbox, CheckboxGroup } from './Checkbox';
const meta = {
    title: 'Components/Checkbox',
    component: Checkbox,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg', 'xl'],
        },
        variant: {
            control: 'select',
            options: [undefined, 'primary', 'success', 'danger', 'warning', 'info', 'dark'],
        },
        disabled: {
            control: 'boolean',
        },
        indeterminate: {
            control: 'boolean',
        },
        required: {
            control: 'boolean',
        },
    },
};
export default meta;
const CheckboxWithState = (args) => {
    const [checked, setChecked] = useState(args.checked || false);
    return (_jsx(Checkbox, { ...args, checked: checked, onChange: (e) => {
            setChecked(e.target.checked);
            args.onChange?.(e);
        } }));
};
export const Default = {
    render: (args) => _jsx(CheckboxWithState, { ...args }),
    args: {
        label: 'Default Checkbox',
    },
};
export const Checked = {
    render: (args) => _jsx(CheckboxWithState, { ...args }),
    args: {
        label: 'Checked by default',
        checked: true,
    },
};
export const WithDescription = {
    render: (args) => _jsx(CheckboxWithState, { ...args }),
    args: {
        label: 'Accept terms and conditions',
        description: 'You must accept the terms to continue',
    },
};
export const Required = {
    render: (args) => _jsx(CheckboxWithState, { ...args }),
    args: {
        label: 'Required checkbox',
        required: true,
    },
};
export const Disabled = {
    args: {
        label: 'Disabled checkbox',
        disabled: true,
    },
};
export const DisabledChecked = {
    args: {
        label: 'Disabled checked',
        disabled: true,
        checked: true,
    },
};
export const Indeterminate = {
    args: {
        label: 'Indeterminate state',
        indeterminate: true,
    },
};
export const Sizes = {
    render: () => (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '12px' }, children: [_jsx(Checkbox, { size: "xs", label: "Extra small checkbox", defaultChecked: true }), _jsx(Checkbox, { size: "sm", label: "Small checkbox", defaultChecked: true }), _jsx(Checkbox, { size: "md", label: "Medium checkbox (default)", defaultChecked: true }), _jsx(Checkbox, { size: "lg", label: "Large checkbox", defaultChecked: true }), _jsx(Checkbox, { size: "xl", label: "Extra large checkbox", defaultChecked: true })] })),
};
export const Variants = {
    render: () => (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '12px' }, children: [_jsx(Checkbox, { label: "Default", defaultChecked: true }), _jsx(Checkbox, { label: "Primary", variant: "primary", defaultChecked: true }), _jsx(Checkbox, { label: "Success", variant: "success", defaultChecked: true }), _jsx(Checkbox, { label: "Danger", variant: "danger", defaultChecked: true }), _jsx(Checkbox, { label: "Warning", variant: "warning", defaultChecked: true }), _jsx(Checkbox, { label: "Info", variant: "info", defaultChecked: true }), _jsx(Checkbox, { label: "Dark", variant: "dark", defaultChecked: true })] })),
};
export const Group = {
    render: () => {
        const [selectedItems, setSelectedItems] = useState([]);
        const items = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
        const handleChange = (item) => (e) => {
            if (e.target.checked) {
                setSelectedItems([...selectedItems, item]);
            }
            else {
                setSelectedItems(selectedItems.filter(i => i !== item));
            }
        };
        return (_jsxs("div", { children: [_jsx("h4", { style: { marginBottom: '12px' }, children: "Select multiple options:" }), _jsx("div", { style: { display: 'flex', flexDirection: 'column', gap: '8px' }, children: items.map(item => (_jsx(Checkbox, { label: item, checked: selectedItems.includes(item), onChange: handleChange(item) }, item))) }), _jsxs("p", { style: { marginTop: '16px', fontSize: '14px', color: '#666' }, children: ["Selected: ", selectedItems.join(', ') || 'None'] })] }));
    },
};
export const CheckboxGroupDefault = {
    render: () => (_jsxs(CheckboxGroup, { label: "Select your interests", required: true, children: [_jsx(Checkbox, { label: "Frontend Development", value: "frontend" }), _jsx(Checkbox, { label: "Backend Development", value: "backend" }), _jsx(Checkbox, { label: "UI/UX Design", value: "design" }), _jsx(Checkbox, { label: "DevOps", value: "devops" })] })),
};
export const CheckboxGroupInline = {
    render: () => (_jsxs(CheckboxGroup, { label: "Select options", inline: true, children: [_jsx(Checkbox, { label: "Option A" }), _jsx(Checkbox, { label: "Option B" }), _jsx(Checkbox, { label: "Option C" }), _jsx(Checkbox, { label: "Option D" })] })),
};
export const CheckboxGroupError = {
    render: () => (_jsxs(CheckboxGroup, { label: "Terms and Conditions", error: true, errorMessage: "You must accept at least one condition", required: true, children: [_jsx(Checkbox, { label: "I accept the Terms of Service" }), _jsx(Checkbox, { label: "I accept the Privacy Policy" }), _jsx(Checkbox, { label: "I agree to receive marketing emails" })] })),
};
export const CheckboxStates = {
    render: () => (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '12px' }, children: [_jsx(Checkbox, { label: "Unchecked" }), _jsx(Checkbox, { label: "Checked", defaultChecked: true }), _jsx(Checkbox, { label: "Indeterminate", indeterminate: true }), _jsx(Checkbox, { label: "Disabled", disabled: true }), _jsx(Checkbox, { label: "Disabled Checked", disabled: true, defaultChecked: true })] })),
};
export const WithDescriptions = {
    render: () => (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '16px' }, children: [_jsx(Checkbox, { label: "Email notifications", description: "Receive email updates about your account activity" }), _jsx(Checkbox, { label: "SMS notifications", description: "Get text messages for important security alerts" }), _jsx(Checkbox, { label: "Push notifications", description: "Allow browser push notifications for real-time updates", defaultChecked: true })] })),
};
export const CompleteExample = {
    render: () => {
        const [selectAll, setSelectAll] = useState(false);
        const [selected, setSelected] = useState([]);
        const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
        const handleSelectAll = (e) => {
            if (e.target.checked) {
                setSelected(options);
                setSelectAll(true);
            }
            else {
                setSelected([]);
                setSelectAll(false);
            }
        };
        const handleOptionChange = (option) => (e) => {
            if (e.target.checked) {
                const newSelected = [...selected, option];
                setSelected(newSelected);
                setSelectAll(newSelected.length === options.length);
            }
            else {
                const newSelected = selected.filter(item => item !== option);
                setSelected(newSelected);
                setSelectAll(false);
            }
        };
        return (_jsxs("div", { style: { minWidth: '300px' }, children: [_jsx(Checkbox, { label: "Select All", checked: selectAll, indeterminate: selected.length > 0 && selected.length < options.length, onChange: handleSelectAll, variant: "primary" }), _jsx("hr", { style: { margin: '12px 0', border: 'none', borderTop: '1px solid #e5e7eb' } }), _jsx(CheckboxGroup, { children: options.map(option => (_jsx(Checkbox, { label: option, checked: selected.includes(option), onChange: handleOptionChange(option) }, option))) })] }));
    },
};
//# sourceMappingURL=Checkbox.stories.js.map