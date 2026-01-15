import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Input, Textarea } from './Input';
const meta = {
    title: 'Components/Input',
    component: Input,
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
        type: {
            control: 'select',
            options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search', 'date', 'time'],
        },
        disabled: {
            control: 'boolean',
        },
        readOnly: {
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
        placeholder: 'Enter text...',
    },
};
export const Sizes = {
    render: () => (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '300px' }, children: [_jsx(Input, { size: "xs", placeholder: "Extra small input" }), _jsx(Input, { size: "sm", placeholder: "Small input" }), _jsx(Input, { size: "md", placeholder: "Medium input (default)" }), _jsx(Input, { size: "lg", placeholder: "Large input" }), _jsx(Input, { size: "xl", placeholder: "Extra large input" })] })),
};
export const States = {
    render: () => (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '300px' }, children: [_jsx(Input, { placeholder: "Default state" }), _jsx(Input, { state: "success", placeholder: "Success state", defaultValue: "Valid input" }), _jsx(Input, { state: "warning", placeholder: "Warning state", defaultValue: "Check this" }), _jsx(Input, { state: "error", placeholder: "Error state", defaultValue: "Invalid input" })] })),
};
export const WithIcons = {
    render: () => (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '300px' }, children: [_jsx(Input, { leftIcon: _jsx("i", { className: "bx bx-search" }), type: "search", placeholder: "Search..." }), _jsx(Input, { rightIcon: _jsx("i", { className: "bx bx-check" }), placeholder: "Verified input" }), _jsx(Input, { leftIcon: _jsx("i", { className: "bx bx-envelope" }), rightIcon: _jsx("i", { className: "bx bx-right-arrow-alt" }), type: "email", placeholder: "Email with icons" })] })),
};
export const InputGroup = {
    render: () => (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '400px' }, children: [_jsx(Input, { prepend: "https://", placeholder: "website.com" }), _jsx(Input, { append: ".com", placeholder: "domain" }), _jsx(Input, { prepend: "$", append: ".00", type: "number", placeholder: "0" }), _jsx(Input, { prepend: _jsx("button", { className: "btn btn--sm btn--secondary", children: "Search" }), placeholder: "Search with button" })] })),
};
export const Disabled = {
    args: {
        disabled: true,
        defaultValue: 'Cannot edit',
    },
};
export const ReadOnly = {
    args: {
        readOnly: true,
        defaultValue: 'Read only value',
    },
};
export const Required = {
    args: {
        required: true,
        placeholder: 'This field is required',
    },
};
export const PasswordInput = {
    args: {
        type: 'password',
        placeholder: 'Enter password',
    },
};
export const EmailInput = {
    args: {
        type: 'email',
        leftIcon: _jsx("i", { className: "bx bx-envelope" }),
        placeholder: 'john@example.com',
    },
};
export const NumberInput = {
    args: {
        type: 'number',
        placeholder: 'Enter a number',
        min: 0,
        max: 100,
    },
};
export const DateInput = {
    args: {
        type: 'date',
    },
};
export const TimeInput = {
    args: {
        type: 'time',
    },
};
export const SearchInput = {
    args: {
        type: 'search',
        leftIcon: _jsx("i", { className: "bx bx-search" }),
        placeholder: 'Search...',
    },
};
export const TextareaDefault = {
    render: () => (_jsx("div", { style: { minWidth: '300px' }, children: _jsx(Textarea, { placeholder: "Enter your message...", rows: 4 }) })),
};
export const TextareaStates = {
    render: () => (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '300px' }, children: [_jsx(Textarea, { placeholder: "Default textarea", rows: 3 }), _jsx(Textarea, { state: "success", placeholder: "Success state", rows: 3, defaultValue: "Valid input" }), _jsx(Textarea, { state: "warning", placeholder: "Warning state", rows: 3, defaultValue: "Check this" }), _jsx(Textarea, { state: "error", placeholder: "Error state", rows: 3, defaultValue: "Invalid input" })] })),
};
export const CompleteForm = {
    render: () => (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '16px', minWidth: '400px' }, children: [_jsxs("div", { children: [_jsx("label", { style: { display: 'block', marginBottom: '4px', fontSize: '14px' }, children: "Name" }), _jsx(Input, { placeholder: "John Doe", required: true })] }), _jsxs("div", { children: [_jsx("label", { style: { display: 'block', marginBottom: '4px', fontSize: '14px' }, children: "Email" }), _jsx(Input, { type: "email", leftIcon: _jsx("i", { className: "bx bx-envelope" }), placeholder: "john@example.com", state: "success" })] }), _jsxs("div", { children: [_jsx("label", { style: { display: 'block', marginBottom: '4px', fontSize: '14px' }, children: "Password" }), _jsx(Input, { type: "password", placeholder: "Enter password" })] }), _jsxs("div", { children: [_jsx("label", { style: { display: 'block', marginBottom: '4px', fontSize: '14px' }, children: "Website" }), _jsx(Input, { prepend: "https://", placeholder: "example.com" })] }), _jsxs("div", { children: [_jsx("label", { style: { display: 'block', marginBottom: '4px', fontSize: '14px' }, children: "Message" }), _jsx(Textarea, { placeholder: "Enter your message...", rows: 4 })] })] })),
};
//# sourceMappingURL=Input.stories.js.map