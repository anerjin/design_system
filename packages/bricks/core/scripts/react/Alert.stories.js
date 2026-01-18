import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Alert } from './Alert';
import { Button } from './Button';
import { Icon } from './Icon';
const meta = {
    title: 'Feedback/Alert',
    component: Alert,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'],
        },
        solid: {
            control: 'boolean',
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
        },
        dismissible: {
            control: 'boolean',
        },
        autoClose: {
            control: 'number',
        },
        accent: {
            control: 'select',
            options: [undefined, 'left', 'top'],
        },
        toast: {
            control: 'boolean',
        },
        position: {
            control: 'select',
            options: ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'],
        },
    },
};
export default meta;
export const Default = {
    args: {
        variant: 'primary',
        title: 'Default Alert',
        children: 'This is a default alert message.',
    },
};
export const WithTitleAndDescription = {
    args: {
        variant: 'info',
        title: 'Information',
        description: 'Here is some important information you should know.',
    },
};
export const Variants = {
    render: () => (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '500px' }, children: [_jsx(Alert, { variant: "primary", title: "Primary Alert", children: "This is a primary alert message." }), _jsx(Alert, { variant: "secondary", title: "Secondary Alert", children: "This is a secondary alert message." }), _jsx(Alert, { variant: "success", title: "Success Alert", children: "Your operation completed successfully." }), _jsx(Alert, { variant: "danger", title: "Danger Alert", children: "An error occurred while processing your request." }), _jsx(Alert, { variant: "warning", title: "Warning Alert", children: "Please review your input before continuing." }), _jsx(Alert, { variant: "info", title: "Info Alert", children: "This is an informational message." }), _jsx(Alert, { variant: "light", title: "Light Alert", children: "This is a light alert message." }), _jsx(Alert, { variant: "dark", title: "Dark Alert", children: "This is a dark alert message." })] })),
};
export const SolidVariants = {
    render: () => (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '500px' }, children: [_jsx(Alert, { variant: "primary", solid: true, title: "Primary Solid", children: "Solid background primary alert." }), _jsx(Alert, { variant: "secondary", solid: true, title: "Secondary Solid", children: "Solid background secondary alert." }), _jsx(Alert, { variant: "success", solid: true, title: "Success Solid", children: "Solid background success alert." }), _jsx(Alert, { variant: "danger", solid: true, title: "Danger Solid", children: "Solid background danger alert." }), _jsx(Alert, { variant: "warning", solid: true, title: "Warning Solid", children: "Solid background warning alert." }), _jsx(Alert, { variant: "info", solid: true, title: "Info Solid", children: "Solid background info alert." }), _jsx(Alert, { variant: "light", solid: true, title: "Light Solid", children: "Solid background light alert." }), _jsx(Alert, { variant: "dark", solid: true, title: "Dark Solid", children: "Solid background dark alert." })] })),
};
export const Sizes = {
    render: () => (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '500px' }, children: [_jsx(Alert, { size: "sm", variant: "info", title: "Small Alert", children: "This is a small sized alert." }), _jsx(Alert, { size: "md", variant: "info", title: "Medium Alert (Default)", children: "This is a medium sized alert." }), _jsx(Alert, { size: "lg", variant: "info", title: "Large Alert", children: "This is a large sized alert." })] })),
};
export const WithAccent = {
    render: () => (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '500px' }, children: [_jsx(Alert, { variant: "success", accent: "left", title: "Left Accent", children: "Alert with left accent border." }), _jsx(Alert, { variant: "danger", accent: "top", title: "Top Accent", children: "Alert with top accent border." }), _jsx(Alert, { variant: "warning", accent: "left", solid: true, title: "Solid with Accent", children: "Solid alert with left accent." })] })),
};
export const WithIcon = {
    render: () => (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '500px' }, children: [_jsx(Alert, { variant: "success", title: "Success", icon: _jsx(Icon, { name: "check-circle", size: 20, color: "currentColor" }), children: "Operation completed successfully." }), _jsx(Alert, { variant: "danger", title: "Error", icon: _jsx(Icon, { name: "x-circle", size: 20, color: "currentColor" }), children: "An error has occurred." }), _jsx(Alert, { variant: "warning", title: "Warning", icon: _jsx(Icon, { name: "error", size: 20, color: "currentColor" }), children: "Please proceed with caution." }), _jsx(Alert, { variant: "info", title: "Information", icon: _jsx(Icon, { name: "info-circle", size: 20, color: "currentColor" }), children: "Here's some helpful information." })] })),
};
export const WithList = {
    args: {
        variant: 'warning',
        title: 'Please fix the following errors:',
        icon: _jsx(Icon, { name: "error", size: 20, color: "currentColor" }),
        list: [
            'Password must be at least 8 characters',
            'Password must contain at least one uppercase letter',
            'Password must contain at least one number',
            'Password must contain at least one special character'
        ],
    },
};
export const WithActions = {
    render: () => {
        const [visible, setVisible] = useState(true);
        if (!visible) {
            return (_jsx(Button, { onClick: () => setVisible(true), children: "Show Alert" }));
        }
        return (_jsx(Alert, { variant: "info", title: "Update Available", description: "A new version of the application is available.", dismissible: true, onClose: () => setVisible(false), actions: _jsxs("div", { style: { display: 'flex', gap: '8px', marginTop: '12px' }, children: [_jsx(Button, { size: "sm", variant: "primary", children: "Update Now" }), _jsx(Button, { size: "sm", variant: "secondary", children: "Remind Me Later" })] }) }));
    },
};
export const Dismissible = {
    render: () => {
        const [visible, setVisible] = useState(true);
        if (!visible) {
            return (_jsx(Button, { onClick: () => setVisible(true), children: "Show Dismissible Alert" }));
        }
        return (_jsx(Alert, { variant: "info", title: "Dismissible Alert", dismissible: true, visible: visible, onClose: () => setVisible(false), children: "You can close this alert by clicking the X button." }));
    },
};
export const AutoClose = {
    render: () => {
        const [visible, setVisible] = useState(false);
        return (_jsxs("div", { children: [_jsx(Button, { onClick: () => setVisible(true), children: "Show Auto-Close Alert" }), visible && (_jsx("div", { style: { marginTop: '12px' }, children: _jsx(Alert, { variant: "success", title: "Auto-closing Alert", autoClose: 3000, dismissible: true, onClose: () => setVisible(false), children: "This alert will close automatically in 3 seconds." }) }))] }));
    },
};
export const ToastPositions = {
    render: () => {
        const [toasts, setToasts] = useState([]);
        const showToast = (position) => {
            const id = `${position}-${Date.now()}`;
            setToasts(prev => [...prev, id]);
            setTimeout(() => {
                setToasts(prev => prev.filter(t => t !== id));
            }, 5000);
        };
        return (_jsxs("div", { children: [_jsxs("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }, children: [_jsx(Button, { size: "sm", onClick: () => showToast('top-left'), children: "Top Left" }), _jsx(Button, { size: "sm", onClick: () => showToast('top-center'), children: "Top Center" }), _jsx(Button, { size: "sm", onClick: () => showToast('top-right'), children: "Top Right" }), _jsx(Button, { size: "sm", onClick: () => showToast('bottom-left'), children: "Bottom Left" }), _jsx(Button, { size: "sm", onClick: () => showToast('bottom-center'), children: "Bottom Center" }), _jsx(Button, { size: "sm", onClick: () => showToast('bottom-right'), children: "Bottom Right" })] }), toasts.map(id => {
                    const position = id.split('-').slice(0, 2).join('-');
                    return (_jsxs(Alert, { toast: true, position: position, variant: "success", title: "Toast Notification", dismissible: true, autoClose: 4000, children: ["This is a toast at ", position] }, id));
                })] }));
    },
};
export const ComplexExample = {
    render: () => {
        const [visible, setVisible] = useState(true);
        if (!visible) {
            return _jsx(Button, { onClick: () => setVisible(true), children: "Show Complex Alert" });
        }
        return (_jsx(Alert, { variant: "danger", solid: true, size: "lg", accent: "left", dismissible: true, icon: _jsx(Icon, { name: "lock-alt", size: 24, color: "currentColor" }), title: "Security Alert", description: "We've detected unusual activity on your account", onClose: () => setVisible(false), actions: _jsxs("div", { style: { display: 'flex', gap: '8px', marginTop: '16px' }, children: [_jsx(Button, { size: "sm", variant: "light", children: "Review Activity" }), _jsx(Button, { size: "sm", variant: "danger", children: "Secure Account" })] }), children: _jsxs("div", { style: { marginTop: '12px' }, children: [_jsx("p", { style: { margin: '8px 0' }, children: "Suspicious login attempts detected from:" }), _jsxs("ul", { style: { marginLeft: '20px', marginTop: '8px' }, children: [_jsx("li", { children: "Unknown device in New York, USA" }), _jsx("li", { children: "Unknown device in London, UK" }), _jsx("li", { children: "Unknown device in Tokyo, Japan" })] })] }) }));
    },
};
export const NotificationExamples = {
    render: () => (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '600px' }, children: [_jsx(Alert, { variant: "success", icon: _jsx(Icon, { name: "check-circle", size: 20, color: "currentColor" }), title: "Payment Successful", description: "Your payment of $99.99 has been processed successfully.", dismissible: true }), _jsx(Alert, { variant: "warning", icon: _jsx(Icon, { name: "error", size: 20, color: "currentColor" }), title: "Low Storage Space", description: "You have less than 10% storage space remaining. Consider deleting unused files.", actions: _jsxs("div", { style: { display: 'flex', gap: '8px', marginTop: '8px' }, children: [_jsx(Button, { size: "sm", variant: "warning", children: "Manage Storage" }), _jsx(Button, { size: "sm", variant: "secondary", children: "Ignore" })] }), dismissible: true }), _jsx(Alert, { variant: "info", solid: true, icon: _jsx(Icon, { name: "bell", size: 20, color: "currentColor" }), title: "New Feature Available", description: "Dark mode is now available! You can enable it in settings.", actions: _jsx(Button, { size: "sm", variant: "light", children: "Go to Settings" }), dismissible: true }), _jsx(Alert, { variant: "danger", accent: "left", icon: _jsx(Icon, { name: "error-circle", size: 20, color: "currentColor" }), title: "Action Required", description: "Your subscription will expire in 3 days. Update your payment method to continue.", actions: _jsxs("div", { style: { display: 'flex', gap: '8px', marginTop: '8px' }, children: [_jsx(Button, { size: "sm", variant: "danger", children: "Update Payment" }), _jsx(Button, { size: "sm", variant: "secondary", children: "Cancel Subscription" })] }) })] })),
};
//# sourceMappingURL=Alert.stories.js.map