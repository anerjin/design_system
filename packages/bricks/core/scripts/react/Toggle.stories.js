import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Toggle } from './Toggle';
const meta = {
    title: 'Data Entry/Toggle',
    component: Toggle,
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
            options: ['primary', 'success', 'danger', 'warning', 'info', 'purple', 'pink', 'mint', 'yellow', 'green', 'lightblue', 'blue', 'dark'],
        },
        disabled: {
            control: 'boolean',
        },
        checked: {
            control: 'boolean',
        },
    },
};
export default meta;
const ToggleWithState = (args) => {
    const [checked, setChecked] = useState(args.checked || false);
    return (_jsx(Toggle, { ...args, checked: checked, onChange: (newChecked) => {
            setChecked(newChecked);
            args.onChange?.(newChecked);
        } }));
};
export const Default = {
    render: (args) => _jsx(ToggleWithState, { ...args }),
    args: {
        label: 'Toggle Switch',
    },
};
export const Checked = {
    render: (args) => _jsx(ToggleWithState, { ...args }),
    args: {
        label: 'Enabled by default',
        checked: true,
    },
};
export const WithDescription = {
    render: (args) => _jsx(ToggleWithState, { ...args }),
    args: {
        label: 'Enable notifications',
        description: 'Receive email notifications for important updates',
    },
};
export const Disabled = {
    args: {
        label: 'Disabled toggle',
        disabled: true,
    },
};
export const DisabledOn = {
    args: {
        label: 'Disabled (On)',
        disabled: true,
        checked: true,
    },
};
export const Small = {
    render: (args) => _jsx(ToggleWithState, { ...args }),
    args: {
        size: 'sm',
        label: 'Small toggle',
    },
};
export const Large = {
    render: (args) => _jsx(ToggleWithState, { ...args }),
    args: {
        size: 'lg',
        label: 'Large toggle',
    },
};
export const ColorVariants = {
    render: () => (_jsx("div", { style: { display: 'flex', flexDirection: 'column', gap: '12px' }, children: _jsxs("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }, children: [_jsx(Toggle, { label: "Default", defaultChecked: true }), _jsx(Toggle, { label: "Primary", variant: "primary", defaultChecked: true }), _jsx(Toggle, { label: "Success", variant: "success", defaultChecked: true }), _jsx(Toggle, { label: "Danger", variant: "danger", defaultChecked: true }), _jsx(Toggle, { label: "Warning", variant: "warning", defaultChecked: true }), _jsx(Toggle, { label: "Info", variant: "info", defaultChecked: true }), _jsx(Toggle, { label: "Purple", variant: "purple", defaultChecked: true }), _jsx(Toggle, { label: "Pink", variant: "pink", defaultChecked: true }), _jsx(Toggle, { label: "Mint", variant: "mint", defaultChecked: true }), _jsx(Toggle, { label: "Yellow", variant: "yellow", defaultChecked: true }), _jsx(Toggle, { label: "Green", variant: "green", defaultChecked: true }), _jsx(Toggle, { label: "Light Blue", variant: "lightblue", defaultChecked: true }), _jsx(Toggle, { label: "Blue", variant: "blue", defaultChecked: true }), _jsx(Toggle, { label: "Dark", variant: "dark", defaultChecked: true })] }) })),
};
export const WithIcons = {
    render: () => (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '12px' }, children: [_jsx(Toggle, { label: "Default Icons", showIcons: true, defaultChecked: true }), _jsx(Toggle, { label: "Custom Icons", showIcons: true, onIcon: "\u2713", offIcon: "\u2715", variant: "success", defaultChecked: true })] })),
};
export const Sizes = {
    render: () => (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '12px' }, children: [_jsx(Toggle, { size: "sm", label: "Small toggle", defaultChecked: true }), _jsx(Toggle, { size: "md", label: "Medium toggle (default)", defaultChecked: true }), _jsx(Toggle, { size: "lg", label: "Large toggle", defaultChecked: true })] })),
};
export const States = {
    render: () => (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '12px' }, children: [_jsx(Toggle, { label: "Unchecked" }), _jsx(Toggle, { label: "Checked", defaultChecked: true }), _jsx(Toggle, { label: "Disabled", disabled: true }), _jsx(Toggle, { label: "Disabled Checked", disabled: true, defaultChecked: true })] })),
};
export const Settings = {
    render: () => {
        const [darkMode, setDarkMode] = useState(false);
        const [autoSave, setAutoSave] = useState(true);
        const [notifications, setNotifications] = useState(true);
        const [analytics, setAnalytics] = useState(false);
        return (_jsxs("div", { style: { width: '300px' }, children: [_jsx("h3", { style: { marginBottom: '16px' }, children: "Application Settings" }), _jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '16px' }, children: [_jsx(Toggle, { label: "Dark Mode", checked: darkMode, onChange: setDarkMode }), _jsx(Toggle, { label: "Auto-save", checked: autoSave, onChange: setAutoSave, variant: "success" }), _jsx(Toggle, { label: "Notifications", checked: notifications, onChange: setNotifications, variant: "info" }), _jsx(Toggle, { label: "Analytics", checked: analytics, onChange: setAnalytics, variant: "warning" })] })] }));
    },
};
//# sourceMappingURL=Toggle.stories.js.map