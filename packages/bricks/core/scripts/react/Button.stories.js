import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from './Button';
const meta = {
    title: 'General/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'link', 'ghost', 'outline-primary', 'outline-secondary', 'outline-success', 'outline-danger'],
        },
        size: {
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg', 'xl'],
        },
        pill: {
            control: 'boolean',
        },
        fullWidth: {
            control: 'boolean',
        },
        iconOnly: {
            control: 'boolean',
        },
        loading: {
            control: 'boolean',
        },
        disabled: {
            control: 'boolean',
        },
    },
};
export default meta;
export const Primary = {
    args: {
        variant: 'primary',
        children: 'Primary Button',
    },
};
export const Secondary = {
    args: {
        variant: 'secondary',
        children: 'Secondary Button',
    },
};
export const Success = {
    args: {
        variant: 'success',
        children: 'Success Button',
    },
};
export const Danger = {
    args: {
        variant: 'danger',
        children: 'Danger Button',
    },
};
export const Small = {
    args: {
        size: 'sm',
        children: 'Small Button',
    },
};
export const Large = {
    args: {
        size: 'lg',
        children: 'Large Button',
    },
};
export const FullWidth = {
    args: {
        fullWidth: true,
        children: 'Full Width Button',
    },
};
export const Loading = {
    args: {
        loading: true,
        children: 'Loading...',
    },
};
export const Disabled = {
    args: {
        disabled: true,
        children: 'Disabled Button',
    },
};
export const WithIcon = {
    args: {
        leftIcon: _jsx("i", { className: "bx bx-rocket" }),
        children: 'Launch',
    },
};
export const IconOnly = {
    args: {
        iconOnly: true,
        children: _jsx("i", { className: "bx bx-cog" }),
    },
};
export const Warning = {
    args: {
        variant: 'warning',
        children: 'Warning Button',
    },
};
export const Info = {
    args: {
        variant: 'info',
        children: 'Info Button',
    },
};
export const Light = {
    args: {
        variant: 'light',
        children: 'Light Button',
    },
};
export const Dark = {
    args: {
        variant: 'dark',
        children: 'Dark Button',
    },
};
export const Link = {
    args: {
        variant: 'link',
        children: 'Link Button',
    },
};
export const Ghost = {
    args: {
        variant: 'ghost',
        children: 'Ghost Button',
    },
};
export const OutlinePrimary = {
    args: {
        variant: 'outline-primary',
        children: 'Outline Primary',
    },
};
export const OutlineSecondary = {
    args: {
        variant: 'outline-secondary',
        children: 'Outline Secondary',
    },
};
export const OutlineSuccess = {
    args: {
        variant: 'outline-success',
        children: 'Outline Success',
    },
};
export const OutlineDanger = {
    args: {
        variant: 'outline-danger',
        children: 'Outline Danger',
    },
};
export const Pill = {
    args: {
        variant: 'primary',
        pill: true,
        children: 'Pill Button',
    },
};
export const ExtraSmall = {
    args: {
        size: 'xs',
        children: 'XS Button',
    },
};
export const ExtraLarge = {
    args: {
        size: 'xl',
        children: 'XL Button',
    },
};
export const AllVariants = {
    render: () => (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '16px' }, children: [_jsxs("div", { children: [_jsx("h4", { style: { margin: '0 0 8px 0', fontSize: '14px', color: '#6B7280' }, children: "Solid Variants" }), _jsxs("div", { style: { display: 'flex', gap: '8px', flexWrap: 'wrap' }, children: [_jsx(Button, { variant: "primary", children: "Primary" }), _jsx(Button, { variant: "secondary", children: "Secondary" }), _jsx(Button, { variant: "success", children: "Success" }), _jsx(Button, { variant: "danger", children: "Danger" }), _jsx(Button, { variant: "warning", children: "Warning" }), _jsx(Button, { variant: "info", children: "Info" }), _jsx(Button, { variant: "light", children: "Light" }), _jsx(Button, { variant: "dark", children: "Dark" })] })] }), _jsxs("div", { children: [_jsx("h4", { style: { margin: '0 0 8px 0', fontSize: '14px', color: '#6B7280' }, children: "Outline Variants" }), _jsxs("div", { style: { display: 'flex', gap: '8px', flexWrap: 'wrap' }, children: [_jsx(Button, { variant: "outline-primary", children: "Primary" }), _jsx(Button, { variant: "outline-secondary", children: "Secondary" }), _jsx(Button, { variant: "outline-success", children: "Success" }), _jsx(Button, { variant: "outline-danger", children: "Danger" })] })] }), _jsxs("div", { children: [_jsx("h4", { style: { margin: '0 0 8px 0', fontSize: '14px', color: '#6B7280' }, children: "Special Variants" }), _jsxs("div", { style: { display: 'flex', gap: '8px', flexWrap: 'wrap' }, children: [_jsx(Button, { variant: "ghost", children: "Ghost" }), _jsx(Button, { variant: "link", children: "Link" })] })] })] })),
};
export const AllSizes = {
    render: () => (_jsxs("div", { style: { display: 'flex', gap: '8px', alignItems: 'center' }, children: [_jsx(Button, { size: "xs", children: "XS Size" }), _jsx(Button, { size: "sm", children: "Small" }), _jsx(Button, { size: "md", children: "Medium" }), _jsx(Button, { size: "lg", children: "Large" }), _jsx(Button, { size: "xl", children: "XL Size" })] })),
};
export const RoundedVariations = {
    render: () => (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '16px' }, children: [_jsxs("div", { children: [_jsx("h4", { style: { margin: '0 0 8px 0', fontSize: '14px', color: '#6B7280' }, children: "Rounded Variations" }), _jsxs("div", { style: { display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }, children: [_jsx(Button, { rounded: "none", children: "No Rounding" }), _jsx(Button, { rounded: "sm", children: "Small Rounded" }), _jsx(Button, { rounded: "md", children: "Medium Rounded (Default)" }), _jsx(Button, { rounded: "lg", children: "Large Rounded" }), _jsx(Button, { rounded: "xl", children: "Extra Large Rounded" }), _jsx(Button, { rounded: "full", children: "Full Rounded" }), _jsx(Button, { pill: true, children: "Pill Button" })] })] }), _jsxs("div", { children: [_jsx("h4", { style: { margin: '0 0 8px 0', fontSize: '14px', color: '#6B7280' }, children: "Different Sizes with Rounding" }), _jsxs("div", { style: { display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }, children: [_jsx(Button, { size: "sm", rounded: "none", children: "Small None" }), _jsx(Button, { size: "sm", rounded: "sm", children: "Small SM" }), _jsx(Button, { size: "md", rounded: "lg", children: "Medium LG" }), _jsx(Button, { size: "lg", rounded: "xl", children: "Large XL" }), _jsx(Button, { size: "lg", rounded: "full", children: "Large Full" })] })] }), _jsxs("div", { children: [_jsx("h4", { style: { margin: '0 0 8px 0', fontSize: '14px', color: '#6B7280' }, children: "Different Variants with Rounding" }), _jsxs("div", { style: { display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }, children: [_jsx(Button, { variant: "primary", rounded: "none", children: "Primary None" }), _jsx(Button, { variant: "secondary", rounded: "lg", children: "Secondary LG" }), _jsx(Button, { variant: "success", rounded: "full", children: "Success Full" }), _jsx(Button, { variant: "danger", rounded: "xl", children: "Danger XL" }), _jsx(Button, { variant: "outline-primary", rounded: "full", children: "Outline Full" })] })] })] })),
};
export const ButtonStates = {
    render: () => (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '12px' }, children: [_jsxs("div", { style: { display: 'flex', gap: '8px', alignItems: 'center' }, children: [_jsx(Button, { children: "Normal" }), _jsx(Button, { disabled: true, children: "Disabled" }), _jsx(Button, { loading: true, children: "Loading" })] }), _jsxs("div", { style: { display: 'flex', gap: '8px', alignItems: 'center' }, children: [_jsx(Button, { variant: "secondary", children: "Normal" }), _jsx(Button, { variant: "secondary", disabled: true, children: "Disabled" }), _jsx(Button, { variant: "secondary", loading: true, children: "Loading" })] }), _jsxs("div", { style: { display: 'flex', gap: '8px', alignItems: 'center' }, children: [_jsx(Button, { variant: "outline-primary", children: "Normal" }), _jsx(Button, { variant: "outline-primary", disabled: true, children: "Disabled" }), _jsx(Button, { variant: "outline-primary", loading: true, children: "Loading" })] })] })),
};
export const ButtonShapes = {
    render: () => (_jsxs("div", { style: { display: 'flex', gap: '8px', alignItems: 'center' }, children: [_jsx(Button, { children: "Default Shape" }), _jsx(Button, { pill: true, children: "Pill Shape" }), _jsx(Button, { iconOnly: true, children: _jsx("i", { className: "bx bx-rocket" }) }), _jsx(Button, { iconOnly: true, pill: true, children: _jsx("i", { className: "bx bx-heart" }) })] })),
};
//# sourceMappingURL=Button.stories.js.map