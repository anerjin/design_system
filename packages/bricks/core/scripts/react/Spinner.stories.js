import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Spinner, SpinnerOverlay } from './Spinner';
import { Button } from './Button';
import { Card, CardBody } from './Card';
import { Icon } from './Icon';
const meta = {
    title: 'Feedback/Spinner',
    component: Spinner,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg', 'xl'],
        },
        type: {
            control: 'select',
            options: ['circular', 'dots', 'pulse', 'bars'],
        },
        variant: {
            control: 'select',
            options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'white'],
        },
    },
};
export default meta;
export const Default = {
    args: {},
};
export const Sizes = {
    render: () => (_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '30px' }, children: [_jsxs("div", { style: { textAlign: 'center' }, children: [_jsx(Spinner, { size: "xs", variant: "dark" }), _jsx("p", { style: { marginTop: '10px', fontSize: '12px' }, children: "Extra Small" })] }), _jsxs("div", { style: { textAlign: 'center' }, children: [_jsx(Spinner, { size: "sm", variant: "dark" }), _jsx("p", { style: { marginTop: '10px', fontSize: '12px' }, children: "Small" })] }), _jsxs("div", { style: { textAlign: 'center' }, children: [_jsx(Spinner, { size: "md", variant: "dark" }), _jsx("p", { style: { marginTop: '10px', fontSize: '12px' }, children: "Medium" })] }), _jsxs("div", { style: { textAlign: 'center' }, children: [_jsx(Spinner, { size: "lg", variant: "dark" }), _jsx("p", { style: { marginTop: '10px', fontSize: '12px' }, children: "Large" })] }), _jsxs("div", { style: { textAlign: 'center' }, children: [_jsx(Spinner, { size: "xl", variant: "dark" }), _jsx("p", { style: { marginTop: '10px', fontSize: '12px' }, children: "Extra Large" })] })] })),
};
export const Types = {
    render: () => (_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '40px' }, children: [_jsxs("div", { style: { textAlign: 'center' }, children: [_jsx(Spinner, { type: "circular", variant: "dark" }), _jsx("p", { style: { marginTop: '10px', fontSize: '12px' }, children: "Circular" })] }), _jsxs("div", { style: { textAlign: 'center' }, children: [_jsx(Spinner, { type: "dots", variant: "dark" }), _jsx("p", { style: { marginTop: '10px', fontSize: '12px' }, children: "Dots" })] }), _jsxs("div", { style: { textAlign: 'center' }, children: [_jsx(Spinner, { type: "pulse", variant: "dark" }), _jsx("p", { style: { marginTop: '10px', fontSize: '12px' }, children: "Pulse" })] }), _jsxs("div", { style: { textAlign: 'center' }, children: [_jsx(Spinner, { type: "bars", variant: "dark" }), _jsx("p", { style: { marginTop: '10px', fontSize: '12px' }, children: "Bars" })] })] })),
};
export const Variants = {
    render: () => (_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '30px', flexWrap: 'wrap' }, children: [_jsxs("div", { style: { textAlign: 'center' }, children: [_jsx(Spinner, { variant: "primary" }), _jsx("p", { style: { marginTop: '10px', fontSize: '12px' }, children: "Primary" })] }), _jsxs("div", { style: { textAlign: 'center' }, children: [_jsx(Spinner, { variant: "secondary" }), _jsx("p", { style: { marginTop: '10px', fontSize: '12px' }, children: "Secondary" })] }), _jsxs("div", { style: { textAlign: 'center' }, children: [_jsx(Spinner, { variant: "success" }), _jsx("p", { style: { marginTop: '10px', fontSize: '12px' }, children: "Success" })] }), _jsxs("div", { style: { textAlign: 'center' }, children: [_jsx(Spinner, { variant: "warning" }), _jsx("p", { style: { marginTop: '10px', fontSize: '12px' }, children: "Warning" })] }), _jsxs("div", { style: { textAlign: 'center' }, children: [_jsx(Spinner, { variant: "danger" }), _jsx("p", { style: { marginTop: '10px', fontSize: '12px' }, children: "Danger" })] }), _jsxs("div", { style: { textAlign: 'center' }, children: [_jsx(Spinner, { variant: "info" }), _jsx("p", { style: { marginTop: '10px', fontSize: '12px' }, children: "Info" })] }), _jsxs("div", { style: { textAlign: 'center' }, children: [_jsx(Spinner, { variant: "dark" }), _jsx("p", { style: { marginTop: '10px', fontSize: '12px' }, children: "Dark" })] }), _jsxs("div", { style: { textAlign: 'center', background: '#333', padding: '20px', borderRadius: '8px' }, children: [_jsx(Spinner, { variant: "white" }), _jsx("p", { style: { marginTop: '10px', fontSize: '12px', color: 'white' }, children: "White" })] })] })),
};
export const TypeVariations = {
    render: () => (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '30px' }, children: [_jsxs("div", { children: [_jsx("h4", { style: { marginBottom: '15px' }, children: "Dots Variations" }), _jsxs("div", { style: { display: 'flex', gap: '30px' }, children: [_jsx(Spinner, { type: "dots", variant: "success" }), _jsx(Spinner, { type: "dots", variant: "warning" }), _jsx(Spinner, { type: "dots", variant: "danger" }), _jsx(Spinner, { type: "dots", variant: "info" })] })] }), _jsxs("div", { children: [_jsx("h4", { style: { marginBottom: '15px' }, children: "Pulse Variations" }), _jsxs("div", { style: { display: 'flex', gap: '30px' }, children: [_jsx(Spinner, { type: "pulse", variant: "success" }), _jsx(Spinner, { type: "pulse", variant: "warning" }), _jsx(Spinner, { type: "pulse", variant: "danger" }), _jsx(Spinner, { type: "pulse", variant: "info" })] })] }), _jsxs("div", { children: [_jsx("h4", { style: { marginBottom: '15px' }, children: "Bars Variations" }), _jsxs("div", { style: { display: 'flex', gap: '30px' }, children: [_jsx(Spinner, { type: "bars", variant: "success" }), _jsx(Spinner, { type: "bars", variant: "warning" }), _jsx(Spinner, { type: "bars", variant: "danger" }), _jsx(Spinner, { type: "bars", variant: "info" })] })] })] })),
};
export const WithLabels = {
    render: () => (_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '40px', flexWrap: 'wrap' }, children: [_jsx(Spinner, { size: "sm", variant: "dark", label: "Loading..." }), _jsx(Spinner, { size: "sm", variant: "success", label: "Processing..." }), _jsx(Spinner, { size: "sm", variant: "warning", label: "Please wait..." }), _jsx(Spinner, { size: "sm", variant: "info", label: "Updating..." })] })),
};
export const LabelPositions = {
    render: () => (_jsxs("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '40px' }, children: [_jsx("div", { style: { textAlign: 'center' }, children: _jsx(Spinner, { label: "Top Label", labelPosition: "top" }) }), _jsx("div", { style: { textAlign: 'center' }, children: _jsx(Spinner, { label: "Right Label", labelPosition: "right" }) }), _jsx("div", { style: { textAlign: 'center' }, children: _jsx(Spinner, { label: "Bottom Label", labelPosition: "bottom" }) }), _jsx("div", { style: { textAlign: 'center' }, children: _jsx(Spinner, { label: "Left Label", labelPosition: "left" }) })] })),
};
export const IconBasedSpinner = {
    render: () => (_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '30px' }, children: [_jsx(Spinner, { useIcon: true, size: "sm" }), _jsx(Spinner, { useIcon: true, size: "md" }), _jsx(Spinner, { useIcon: true, size: "lg", variant: "success" }), _jsx(Spinner, { useIcon: true, iconName: "loader", size: "lg", variant: "info" })] })),
};
export const InlineSpinners = {
    render: () => (_jsxs("div", { children: [_jsxs("p", { children: ["This is some text with an inline ", _jsx(Spinner, { size: "xs", inline: true }), " spinner in the middle."] }), _jsxs("p", { style: { marginTop: '10px' }, children: ["Processing your request ", _jsx(Spinner, { size: "xs", inline: true, variant: "success" })] }), _jsxs("p", { style: { marginTop: '10px' }, children: ["Saving changes ", _jsx(Spinner, { size: "xs", inline: true, type: "dots", variant: "info" })] })] })),
};
export const ButtonWithSpinner = {
    render: () => {
        const [loading1, setLoading1] = useState(false);
        const [loading2, setLoading2] = useState(false);
        const [loading3, setLoading3] = useState(false);
        const handleClick = (setter) => {
            setter(true);
            setTimeout(() => setter(false), 2000);
        };
        return (_jsxs("div", { style: { display: 'flex', gap: '10px', flexWrap: 'wrap' }, children: [_jsx(Button, { onClick: () => handleClick(setLoading1), disabled: loading1, children: loading1 ? (_jsxs(_Fragment, { children: [_jsx(Spinner, { size: "xs", variant: "white", inline: true }), "Loading..."] })) : ('Click Me') }), _jsx(Button, { variant: "secondary", onClick: () => handleClick(setLoading2), disabled: loading2, children: loading2 ? (_jsxs(_Fragment, { children: [_jsx(Spinner, { size: "xs", inline: true }), "Processing"] })) : ('Process Data') }), _jsx(Button, { variant: "success", onClick: () => handleClick(setLoading3), disabled: loading3, children: loading3 ? (_jsxs(_Fragment, { children: [_jsx(Spinner, { size: "xs", variant: "white", inline: true }), "Saving..."] })) : (_jsxs(_Fragment, { children: [_jsx(Icon, { name: "save" }), " Save"] })) })] }));
    },
};
export const CardLoading = {
    render: () => (_jsx("div", { style: { width: '300px' }, children: _jsx(Card, { children: _jsx(CardBody, { children: _jsxs("div", { style: {
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '40px 20px'
                    }, children: [_jsx(Spinner, { size: "lg", variant: "dark" }), _jsx("p", { style: { marginTop: '20px', color: '#666' }, children: "Loading content..." })] }) }) }) })),
};
export const Overlay = {
    render: () => {
        const [showOverlay, setShowOverlay] = useState(false);
        const handleShowOverlay = () => {
            setShowOverlay(true);
            setTimeout(() => setShowOverlay(false), 3000);
        };
        return (_jsxs("div", { children: [_jsx(Button, { onClick: handleShowOverlay, children: "Show Overlay (3 seconds)" }), _jsxs("div", { style: {
                        position: 'relative',
                        marginTop: '20px',
                        padding: '40px',
                        background: '#f5f5f5',
                        borderRadius: '8px',
                        minHeight: '200px'
                    }, children: [_jsx("h3", { children: "Content Area" }), _jsx("p", { children: "This content will be covered by the overlay when loading." }), _jsx("p", { children: "Click the button above to see the overlay in action." }), _jsx(SpinnerOverlay, { visible: showOverlay, label: "Loading data...", spinnerProps: { variant: 'primary' } })] })] }));
    },
};
export const FullScreenOverlay = {
    render: () => {
        const [showOverlay, setShowOverlay] = useState(false);
        const handleShowOverlay = () => {
            setShowOverlay(true);
            setTimeout(() => setShowOverlay(false), 3000);
        };
        return (_jsxs("div", { children: [_jsx(Button, { onClick: handleShowOverlay, variant: "danger", children: "Show Full Screen Overlay (3 seconds)" }), _jsx(SpinnerOverlay, { visible: showOverlay, fullScreen: true, label: "Processing your request...", spinnerProps: { variant: 'dark', size: 'xl' }, backgroundColor: "rgba(0, 0, 0, 0.8)" })] }));
    },
};
export const DataTable = {
    render: () => {
        const [loading, setLoading] = useState(true);
        setTimeout(() => setLoading(false), 2000);
        return (_jsx("div", { style: { width: '600px' }, children: _jsxs("div", { style: {
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    overflow: 'hidden'
                }, children: [_jsxs("div", { style: {
                            padding: '15px',
                            background: '#f5f5f5',
                            borderBottom: '1px solid #e0e0e0',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }, children: [_jsx("h3", { style: { margin: 0 }, children: "User Data" }), _jsxs(Button, { size: "sm", onClick: () => setLoading(true), children: [_jsx(Icon, { name: "refresh" }), " Refresh"] })] }), _jsx("div", { style: { position: 'relative', minHeight: '300px' }, children: loading ? (_jsx("div", { style: {
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '300px'
                            }, children: _jsx(Spinner, { size: "lg", label: "Loading users..." }) })) : (_jsxs("table", { style: { width: '100%' }, children: [_jsx("thead", { children: _jsxs("tr", { style: { background: '#fafafa' }, children: [_jsx("th", { style: { padding: '10px', textAlign: 'left' }, children: "Name" }), _jsx("th", { style: { padding: '10px', textAlign: 'left' }, children: "Email" }), _jsx("th", { style: { padding: '10px', textAlign: 'left' }, children: "Status" })] }) }), _jsxs("tbody", { children: [_jsxs("tr", { children: [_jsx("td", { style: { padding: '10px', borderTop: '1px solid #e0e0e0' }, children: "John Doe" }), _jsx("td", { style: { padding: '10px', borderTop: '1px solid #e0e0e0' }, children: "john@example.com" }), _jsx("td", { style: { padding: '10px', borderTop: '1px solid #e0e0e0' }, children: "Active" })] }), _jsxs("tr", { children: [_jsx("td", { style: { padding: '10px', borderTop: '1px solid #e0e0e0' }, children: "Jane Smith" }), _jsx("td", { style: { padding: '10px', borderTop: '1px solid #e0e0e0' }, children: "jane@example.com" }), _jsx("td", { style: { padding: '10px', borderTop: '1px solid #e0e0e0' }, children: "Active" })] }), _jsxs("tr", { children: [_jsx("td", { style: { padding: '10px', borderTop: '1px solid #e0e0e0' }, children: "Bob Wilson" }), _jsx("td", { style: { padding: '10px', borderTop: '1px solid #e0e0e0' }, children: "bob@example.com" }), _jsx("td", { style: { padding: '10px', borderTop: '1px solid #e0e0e0' }, children: "Inactive" })] })] })] })) })] }) }));
    },
};
export const StatusMessages = {
    render: () => (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '20px', width: '400px' }, children: [_jsxs("div", { style: {
                    padding: '15px',
                    background: '#e3f2fd',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                }, children: [_jsx(Spinner, { size: "sm", variant: "info" }), _jsx("span", { children: "Checking for updates..." })] }), _jsxs("div", { style: {
                    padding: '15px',
                    background: '#fff3e0',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                }, children: [_jsx(Spinner, { size: "sm", variant: "warning", type: "dots" }), _jsx("span", { children: "Syncing your data..." })] }), _jsxs("div", { style: {
                    padding: '15px',
                    background: '#e8f5e9',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                }, children: [_jsx(Spinner, { size: "sm", variant: "success", type: "pulse" }), _jsx("span", { children: "Upload in progress..." })] }), _jsxs("div", { style: {
                    padding: '15px',
                    background: '#fce4ec',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                }, children: [_jsx(Spinner, { size: "sm", variant: "danger", type: "bars" }), _jsx("span", { children: "Retrying connection..." })] })] })),
};
//# sourceMappingURL=Spinner.stories.js.map