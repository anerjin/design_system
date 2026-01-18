import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import Modal from './Modal';
import { Button } from './Button';
const meta = {
    title: 'Feedback/Modal',
    component: Modal,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg', 'xl', 'fullscreen'],
        },
        closable: {
            control: 'boolean',
        },
        centered: {
            control: 'boolean',
        },
        scrollable: {
            control: 'boolean',
        },
        staticBackdrop: {
            control: 'boolean',
        },
        disableEscapeKeyDown: {
            control: 'boolean',
        },
    },
};
export default meta;
const ModalWithButton = (args) => {
    const [open, setOpen] = useState(false);
    return (_jsxs(_Fragment, { children: [_jsx(Button, { onClick: () => setOpen(true), children: "Open Modal" }), _jsx(Modal, { ...args, open: open, onClose: () => setOpen(false) })] }));
};
export const Default = {
    render: (args) => _jsx(ModalWithButton, { ...args }),
    args: {
        title: 'Default Modal',
        children: (_jsx("div", { children: _jsx("p", { children: "This is the modal content. You can add any content here." }) })),
        footer: (_jsxs("div", { style: { display: 'flex', gap: '8px', justifyContent: 'flex-end' }, children: [_jsx(Button, { variant: "secondary", size: "sm", children: "Cancel" }), _jsx(Button, { variant: "primary", size: "sm", children: "Confirm" })] })),
    },
};
export const Small = {
    render: (args) => _jsx(ModalWithButton, { ...args }),
    args: {
        size: 'sm',
        title: 'Small Modal',
        children: _jsx("p", { children: "This is a small modal dialog. Perfect for simple confirmations." }),
        footer: (_jsxs("div", { style: { display: 'flex', gap: '8px', justifyContent: 'flex-end' }, children: [_jsx(Button, { variant: "secondary", size: "sm", children: "Cancel" }), _jsx(Button, { variant: "primary", size: "sm", children: "OK" })] })),
    },
};
export const Large = {
    render: (args) => _jsx(ModalWithButton, { ...args }),
    args: {
        size: 'lg',
        title: 'Large Modal',
        children: (_jsxs("div", { children: [_jsx("p", { children: "This is a large modal with more content." }), _jsx("p", { children: "It can contain multiple paragraphs and other elements." }), _jsx("p", { children: "The modal will adjust its size accordingly." })] })),
    },
};
export const ExtraLarge = {
    render: (args) => _jsx(ModalWithButton, { ...args }),
    args: {
        size: 'xl',
        title: 'Extra Large Modal',
        children: (_jsxs("div", { children: [_jsx("p", { children: "This is an extra large modal." }), _jsx("p", { children: "It provides more space for complex content while still maintaining modal behavior." })] })),
        footer: (_jsxs("div", { style: { display: 'flex', gap: '8px', justifyContent: 'flex-end' }, children: [_jsx(Button, { variant: "secondary", size: "sm", children: "Close" }), _jsx(Button, { variant: "primary", size: "sm", children: "Save Changes" })] })),
    },
};
export const FullScreen = {
    render: (args) => _jsx(ModalWithButton, { ...args }),
    args: {
        size: 'fullscreen',
        title: 'Full Screen Modal',
        children: (_jsxs("div", { children: [_jsx("h3", { children: "Full Screen Experience" }), _jsx("p", { children: "This modal takes up the full screen." }), _jsx("p", { children: "It's useful for complex forms, detailed content, or immersive experiences." }), _jsx("p", { children: "The fullscreen mode removes the backdrop and makes the modal fill the entire viewport." })] })),
        footer: (_jsxs("div", { style: { display: 'flex', gap: '8px', justifyContent: 'flex-end' }, children: [_jsx(Button, { variant: "secondary", children: "Cancel" }), _jsx(Button, { variant: "primary", children: "Apply" })] })),
    },
};
export const Centered = {
    render: (args) => _jsx(ModalWithButton, { ...args }),
    args: {
        centered: true,
        title: 'Centered Modal',
        children: _jsx("p", { children: "This modal is vertically centered." }),
    },
};
export const WithoutCloseButton = {
    render: () => {
        const [open, setOpen] = useState(false);
        return (_jsxs(_Fragment, { children: [_jsx(Button, { onClick: () => setOpen(true), children: "Open Modal" }), _jsx(Modal, { open: open, closable: false, title: "Required Action", onClose: () => setOpen(false), footer: _jsx(Button, { variant: "primary", size: "sm", onClick: () => setOpen(false), children: "I Understand" }), children: _jsx("p", { children: "This modal has no close button. You must click the button below to proceed." }) })] }));
    },
};
export const StaticBackdrop = {
    render: () => {
        const [open, setOpen] = useState(false);
        return (_jsxs(_Fragment, { children: [_jsx(Button, { onClick: () => setOpen(true), children: "Open Static Modal" }), _jsxs(Modal, { open: open, staticBackdrop: true, title: "Important Notice", onClose: () => setOpen(false), footer: _jsxs("div", { style: { display: 'flex', gap: '8px', justifyContent: 'flex-end' }, children: [_jsx(Button, { variant: "secondary", size: "sm", onClick: () => setOpen(false), children: "Cancel" }), _jsx(Button, { variant: "primary", size: "sm", onClick: () => setOpen(false), children: "Accept" })] }), children: [_jsx("p", { children: "This modal has a static backdrop. Clicking outside won't close it." }), _jsx("p", { children: "You must use the buttons or close icon to dismiss this modal." })] })] }));
    },
};
export const DisableEscapeKey = {
    render: () => {
        const [open, setOpen] = useState(false);
        return (_jsxs(_Fragment, { children: [_jsx(Button, { onClick: () => setOpen(true), children: "Open Modal" }), _jsxs(Modal, { open: open, disableEscapeKeyDown: true, title: "Escape Key Disabled", onClose: () => setOpen(false), children: [_jsx("p", { children: "Pressing the ESC key won't close this modal." }), _jsx("p", { children: "Use the close button or click outside to dismiss." })] })] }));
    },
};
export const ScrollableContent = {
    render: () => {
        const [open, setOpen] = useState(false);
        return (_jsxs(_Fragment, { children: [_jsx(Button, { onClick: () => setOpen(true), children: "Open Scrollable Modal" }), _jsx(Modal, { open: open, scrollable: true, title: "Terms and Conditions", onClose: () => setOpen(false), footer: _jsxs("div", { style: { display: 'flex', gap: '8px', justifyContent: 'flex-end' }, children: [_jsx(Button, { variant: "secondary", size: "sm", onClick: () => setOpen(false), children: "Decline" }), _jsx(Button, { variant: "primary", size: "sm", onClick: () => setOpen(false), children: "Accept" })] }), children: _jsxs("div", { children: [_jsx("p", { children: "This modal has scrollable content." }), Array.from({ length: 20 }, (_, i) => (_jsxs("p", { children: [i + 1, ". Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."] }, i)))] }) })] }));
    },
};
export const Sizes = {
    render: () => {
        const [openSm, setOpenSm] = useState(false);
        const [openMd, setOpenMd] = useState(false);
        const [openLg, setOpenLg] = useState(false);
        const [openXl, setOpenXl] = useState(false);
        const [openFullscreen, setOpenFullscreen] = useState(false);
        return (_jsxs("div", { style: { display: 'flex', gap: '12px', flexWrap: 'wrap' }, children: [_jsx(Button, { onClick: () => setOpenSm(true), children: "Small" }), _jsx(Button, { onClick: () => setOpenMd(true), children: "Medium" }), _jsx(Button, { onClick: () => setOpenLg(true), children: "Large" }), _jsx(Button, { onClick: () => setOpenXl(true), children: "Extra Large" }), _jsx(Button, { onClick: () => setOpenFullscreen(true), children: "Fullscreen" }), _jsx(Modal, { open: openSm, size: "sm", title: "Small Modal", onClose: () => setOpenSm(false), children: _jsx("p", { children: "This is a small modal (sm)." }) }), _jsx(Modal, { open: openMd, size: "md", title: "Medium Modal", onClose: () => setOpenMd(false), children: _jsx("p", { children: "This is a medium modal (md). This is the default size." }) }), _jsx(Modal, { open: openLg, size: "lg", title: "Large Modal", onClose: () => setOpenLg(false), children: _jsx("p", { children: "This is a large modal (lg)." }) }), _jsx(Modal, { open: openXl, size: "xl", title: "Extra Large Modal", onClose: () => setOpenXl(false), children: _jsx("p", { children: "This is an extra large modal (xl)." }) }), _jsx(Modal, { open: openFullscreen, size: "fullscreen", title: "Fullscreen Modal", onClose: () => setOpenFullscreen(false), children: _jsx("p", { children: "This is a fullscreen modal." }) })] }));
    },
};
export const CompoundComponents = {
    render: () => {
        const [open, setOpen] = useState(false);
        return (_jsxs(_Fragment, { children: [_jsx(Button, { onClick: () => setOpen(true), children: "Open Compound Modal" }), _jsxs(Modal, { open: open, onClose: () => setOpen(false), children: [_jsxs(Modal.Header, { children: [_jsx(Modal.Title, { children: "Custom Modal with Compound Components" }), _jsx("button", { type: "button", className: "modal__close", "aria-label": "Close", onClick: () => setOpen(false), children: "\u00D7" })] }), _jsxs(Modal.Body, { children: [_jsx("p", { children: "This modal uses the Compound Component pattern." }), _jsx("p", { children: "You can use Modal.Header, Modal.Title, Modal.Body, and Modal.Footer components." })] }), _jsxs(Modal.Footer, { children: [_jsx(Button, { variant: "secondary", onClick: () => setOpen(false), children: "Cancel" }), _jsx(Button, { variant: "primary", onClick: () => setOpen(false), children: "Confirm" })] })] })] }));
    },
};
export const ConfirmationModal = {
    render: () => {
        const [open, setOpen] = useState(false);
        const [loading, setLoading] = useState(false);
        const handleDelete = () => {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                setOpen(false);
            }, 1500);
        };
        return (_jsxs(_Fragment, { children: [_jsx(Button, { variant: "danger", onClick: () => setOpen(true), children: "Delete Item" }), _jsxs(Modal, { open: open, size: "sm", centered: true, title: "Confirm Deletion", onClose: () => !loading && setOpen(false), closable: !loading, staticBackdrop: loading, footer: _jsxs("div", { style: { display: 'flex', gap: '8px', justifyContent: 'flex-end' }, children: [_jsx(Button, { variant: "secondary", size: "sm", onClick: () => setOpen(false), disabled: loading, children: "Cancel" }), _jsx(Button, { variant: "danger", size: "sm", onClick: handleDelete, disabled: loading, children: loading ? 'Deleting...' : 'Delete' })] }), children: [_jsx("p", { children: "Are you sure you want to delete this item?" }), _jsx("p", { style: { fontSize: '14px', color: '#666' }, children: "This action cannot be undone." })] })] }));
    },
};
export const FormModal = {
    render: () => {
        const [open, setOpen] = useState(false);
        return (_jsxs(_Fragment, { children: [_jsx(Button, { onClick: () => setOpen(true), children: "Open Form" }), _jsx(Modal, { open: open, size: "lg", title: "User Registration", onClose: () => setOpen(false), footer: _jsxs("div", { style: { display: 'flex', gap: '8px', justifyContent: 'flex-end' }, children: [_jsx(Button, { variant: "secondary", onClick: () => setOpen(false), children: "Cancel" }), _jsx(Button, { variant: "primary", onClick: () => setOpen(false), children: "Submit" })] }), children: _jsxs("form", { style: { display: 'flex', flexDirection: 'column', gap: '16px' }, children: [_jsxs("div", { children: [_jsx("label", { style: { display: 'block', marginBottom: '4px', fontSize: '14px' }, children: "Name" }), _jsx("input", { type: "text", placeholder: "Enter your name", style: { width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' } })] }), _jsxs("div", { children: [_jsx("label", { style: { display: 'block', marginBottom: '4px', fontSize: '14px' }, children: "Email" }), _jsx("input", { type: "email", placeholder: "Enter your email", style: { width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' } })] }), _jsxs("div", { children: [_jsx("label", { style: { display: 'block', marginBottom: '4px', fontSize: '14px' }, children: "Message" }), _jsx("textarea", { rows: 4, placeholder: "Enter your message", style: { width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', resize: 'vertical' } })] })] }) })] }));
    },
};
//# sourceMappingURL=Modal.stories.js.map