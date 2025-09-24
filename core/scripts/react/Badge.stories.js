import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from './Badge';
const meta = {
    title: 'Components/Badge',
    component: Badge,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'],
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
        },
        shape: {
            control: 'select',
            options: ['pill', 'square'],
        },
        type: {
            control: 'select',
            options: ['solid', 'outline', 'soft'],
        },
    },
};
export default meta;
export const Default = {
    args: {
        children: 'Badge',
    },
};
export const Primary = {
    args: {
        variant: 'primary',
        children: 'Primary',
    },
};
export const Success = {
    args: {
        variant: 'success',
        children: 'Success',
    },
};
export const Danger = {
    args: {
        variant: 'danger',
        children: 'Danger',
    },
};
export const Warning = {
    args: {
        variant: 'warning',
        children: 'Warning',
    },
};
export const Info = {
    args: {
        variant: 'info',
        children: 'Info',
    },
};
export const Rounded = {
    args: {
        shape: 'pill',
        children: 'Rounded',
    },
};
export const Outline = {
    args: {
        type: 'outline',
        variant: 'primary',
        children: 'Outline',
    },
};
export const Soft = {
    args: {
        type: 'soft',
        variant: 'primary',
        children: 'Soft',
    },
};
export const Small = {
    args: {
        size: 'sm',
        children: 'Small',
    },
};
export const Large = {
    args: {
        size: 'lg',
        children: 'Large',
    },
};
export const AllSizes = {
    render: () => (_jsxs("div", { style: { display: 'flex', gap: '8px', alignItems: 'center' }, children: [_jsx(Badge, { size: "sm", children: "Small" }), _jsx(Badge, { size: "md", children: "Medium" }), _jsx(Badge, { size: "lg", children: "Large" })] })),
};
export const TypeComparison = {
    render: () => (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '12px' }, children: [_jsxs("div", { style: { display: 'flex', gap: '8px', alignItems: 'center' }, children: [_jsx("span", { style: { width: '80px', fontSize: '14px', color: '#6B7280' }, children: "Primary:" }), _jsx(Badge, { variant: "primary", children: "Solid" }), _jsx(Badge, { variant: "primary", type: "outline", children: "Outline" }), _jsx(Badge, { variant: "primary", type: "soft", children: "Soft" })] }), _jsxs("div", { style: { display: 'flex', gap: '8px', alignItems: 'center' }, children: [_jsx("span", { style: { width: '80px', fontSize: '14px', color: '#6B7280' }, children: "Success:" }), _jsx(Badge, { variant: "success", children: "Solid" }), _jsx(Badge, { variant: "success", type: "outline", children: "Outline" }), _jsx(Badge, { variant: "success", type: "soft", children: "Soft" })] }), _jsxs("div", { style: { display: 'flex', gap: '8px', alignItems: 'center' }, children: [_jsx("span", { style: { width: '80px', fontSize: '14px', color: '#6B7280' }, children: "Danger:" }), _jsx(Badge, { variant: "danger", children: "Solid" }), _jsx(Badge, { variant: "danger", type: "outline", children: "Outline" }), _jsx(Badge, { variant: "danger", type: "soft", children: "Soft" })] }), _jsxs("div", { style: { display: 'flex', gap: '8px', alignItems: 'center' }, children: [_jsx("span", { style: { width: '80px', fontSize: '14px', color: '#6B7280' }, children: "Warning:" }), _jsx(Badge, { variant: "warning", children: "Solid" }), _jsx(Badge, { variant: "warning", type: "outline", children: "Outline" }), _jsx(Badge, { variant: "warning", type: "soft", children: "Soft" })] }), _jsxs("div", { style: { display: 'flex', gap: '8px', alignItems: 'center' }, children: [_jsx("span", { style: { width: '80px', fontSize: '14px', color: '#6B7280' }, children: "Info:" }), _jsx(Badge, { variant: "info", children: "Solid" }), _jsx(Badge, { variant: "info", type: "outline", children: "Outline" }), _jsx(Badge, { variant: "info", type: "soft", children: "Soft" })] })] })),
};
export const WithNumber = {
    args: {
        variant: 'danger',
        shape: 'pill',
        children: '99+',
    },
};
export const StatusBadges = {
    render: () => (_jsxs("div", { style: { display: 'flex', gap: '8px', alignItems: 'center' }, children: [_jsx(Badge, { variant: "success", children: "Active" }), _jsx(Badge, { variant: "warning", children: "Pending" }), _jsx(Badge, { variant: "danger", children: "Inactive" }), _jsx(Badge, { variant: "info", children: "New" })] })),
};
export const NotificationBadges = {
    render: () => (_jsxs("div", { style: { display: 'flex', gap: '16px', alignItems: 'center' }, children: [_jsxs("div", { style: { position: 'relative', display: 'inline-block' }, children: [_jsx("button", { className: "btn btn--primary", children: "Messages" }), _jsx(Badge, { variant: "danger", shape: "pill", size: "sm", style: {
                            position: 'absolute',
                            top: '-8px',
                            right: '-8px',
                        }, children: "5" })] }), _jsxs("div", { style: { position: 'relative', display: 'inline-block' }, children: [_jsx("button", { className: "btn btn--secondary", children: "Notifications" }), _jsx(Badge, { variant: "warning", shape: "pill", size: "sm", style: {
                            position: 'absolute',
                            top: '-8px',
                            right: '-8px',
                        }, children: "12" })] })] })),
};
export const AllVariants = {
    render: () => (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '16px' }, children: [_jsxs("div", { children: [_jsx("h4", { style: { margin: '0 0 8px 0', fontSize: '14px', color: '#6B7280' }, children: "Solid (Default)" }), _jsxs("div", { style: { display: 'flex', gap: '8px', flexWrap: 'wrap' }, children: [_jsx(Badge, { variant: "primary", children: "Primary" }), _jsx(Badge, { variant: "secondary", children: "Secondary" }), _jsx(Badge, { variant: "success", children: "Success" }), _jsx(Badge, { variant: "danger", children: "Danger" }), _jsx(Badge, { variant: "warning", children: "Warning" }), _jsx(Badge, { variant: "info", children: "Info" }), _jsx(Badge, { variant: "light", children: "Light" }), _jsx(Badge, { variant: "dark", children: "Dark" })] })] }), _jsxs("div", { children: [_jsx("h4", { style: { margin: '0 0 8px 0', fontSize: '14px', color: '#6B7280' }, children: "Outline" }), _jsxs("div", { style: { display: 'flex', gap: '8px', flexWrap: 'wrap' }, children: [_jsx(Badge, { variant: "primary", type: "outline", children: "Primary" }), _jsx(Badge, { variant: "secondary", type: "outline", children: "Secondary" }), _jsx(Badge, { variant: "success", type: "outline", children: "Success" }), _jsx(Badge, { variant: "danger", type: "outline", children: "Danger" }), _jsx(Badge, { variant: "warning", type: "outline", children: "Warning" }), _jsx(Badge, { variant: "info", type: "outline", children: "Info" }), _jsx(Badge, { variant: "light", type: "outline", children: "Light" }), _jsx(Badge, { variant: "dark", type: "outline", children: "Dark" })] })] }), _jsxs("div", { children: [_jsx("h4", { style: { margin: '0 0 8px 0', fontSize: '14px', color: '#6B7280' }, children: "Soft" }), _jsxs("div", { style: { display: 'flex', gap: '8px', flexWrap: 'wrap' }, children: [_jsx(Badge, { variant: "primary", type: "soft", children: "Primary" }), _jsx(Badge, { variant: "secondary", type: "soft", children: "Secondary" }), _jsx(Badge, { variant: "success", type: "soft", children: "Success" }), _jsx(Badge, { variant: "danger", type: "soft", children: "Danger" }), _jsx(Badge, { variant: "warning", type: "soft", children: "Warning" }), _jsx(Badge, { variant: "info", type: "soft", children: "Info" }), _jsx(Badge, { variant: "light", type: "soft", children: "Light" }), _jsx(Badge, { variant: "dark", type: "soft", children: "Dark" })] })] })] })),
};
//# sourceMappingURL=Badge.stories.js.map