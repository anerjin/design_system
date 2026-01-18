import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Accordion } from './Accordion';
const meta = {
    title: 'General/Accordion',
    component: Accordion,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'flush'],
        },
        color: {
            control: 'select',
            options: [undefined, 'primary', 'success', 'warning', 'danger'],
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
        },
        iconPosition: {
            control: 'select',
            options: ['left', 'right'],
        },
        exclusive: {
            control: 'boolean',
        },
    },
};
export default meta;
const defaultItems = [
    {
        id: 'item1',
        title: 'What is BRICKS Design System?',
        content: 'BRICKS is a modern, accessible, and flexible design system built for creating consistent user interfaces across all platforms.',
    },
    {
        id: 'item2',
        title: 'How do I get started?',
        content: 'Getting started with BRICKS is easy! Simply install the package via npm or yarn, import the components you need, and start building your application.',
    },
    {
        id: 'item3',
        title: 'Is BRICKS accessible?',
        content: 'Yes! BRICKS is built with accessibility in mind. All components follow WCAG 2.1 AA standards and include proper ARIA attributes, keyboard navigation, and screen reader support.',
    },
];
export const Default = {
    args: {
        items: defaultItems,
    },
};
export const DefaultOpen = {
    args: {
        items: defaultItems,
        defaultActiveIds: ['item1'],
    },
};
export const Exclusive = {
    args: {
        items: defaultItems,
        exclusive: true,
        defaultActiveIds: ['item1'],
    },
};
export const MultipleOpen = {
    args: {
        items: defaultItems,
        defaultActiveIds: ['item1', 'item2'],
    },
};
export const Flush = {
    args: {
        items: defaultItems,
        variant: 'flush',
        defaultActiveIds: ['item1'],
    },
};
export const Colored = {
    render: () => (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '20px', width: '600px' }, children: [_jsx(Accordion, { items: [
                    {
                        id: 'primary',
                        title: 'Primary Color',
                        content: 'This accordion uses the primary color theme.',
                    },
                ], color: "primary", defaultActiveIds: ['primary'] }), _jsx(Accordion, { items: [
                    {
                        id: 'success',
                        title: 'Success Color',
                        content: 'This accordion uses the success color theme.',
                    },
                ], color: "success", defaultActiveIds: ['success'] }), _jsx(Accordion, { items: [
                    {
                        id: 'warning',
                        title: 'Warning Color',
                        content: 'This accordion uses the warning color theme.',
                    },
                ], color: "warning", defaultActiveIds: ['warning'] }), _jsx(Accordion, { items: [
                    {
                        id: 'danger',
                        title: 'Danger Color',
                        content: 'This accordion uses the danger color theme.',
                    },
                ], color: "danger", defaultActiveIds: ['danger'] })] })),
};
export const Sizes = {
    render: () => (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '20px', width: '600px' }, children: [_jsx(Accordion, { items: [
                    {
                        id: 'small',
                        title: 'Small Size Accordion',
                        content: 'This is a small sized accordion with compact padding.',
                    },
                ], size: "sm", defaultActiveIds: ['small'] }), _jsx(Accordion, { items: [
                    {
                        id: 'medium',
                        title: 'Medium Size Accordion (Default)',
                        content: 'This is a medium sized accordion, which is the default size.',
                    },
                ], size: "md", defaultActiveIds: ['medium'] }), _jsx(Accordion, { items: [
                    {
                        id: 'large',
                        title: 'Large Size Accordion',
                        content: 'This is a large sized accordion with more spacious padding.',
                    },
                ], size: "lg", defaultActiveIds: ['large'] })] })),
};
export const WithDisabled = {
    args: {
        items: [
            {
                id: 'item1',
                title: 'Enabled Item',
                content: 'This item can be toggled.',
            },
            {
                id: 'item2',
                title: 'Disabled Item',
                content: 'This content cannot be accessed.',
                disabled: true,
            },
            {
                id: 'item3',
                title: 'Another Enabled Item',
                content: 'This item can also be toggled.',
            },
        ],
    },
};
export const IconLeft = {
    args: {
        items: defaultItems,
        iconPosition: 'left',
        defaultActiveIds: ['item1'],
    },
};
export const Controlled = {
    render: () => {
        const [activeIds, setActiveIds] = useState(['item1']);
        return (_jsxs("div", { style: { width: '600px' }, children: [_jsxs("div", { style: { marginBottom: '20px', display: 'flex', gap: '10px' }, children: [_jsx("button", { onClick: () => setActiveIds(['item1', 'item2', 'item3']), style: {
                                padding: '8px 16px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                                cursor: 'pointer',
                            }, children: "Open All" }), _jsx("button", { onClick: () => setActiveIds([]), style: {
                                padding: '8px 16px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                                cursor: 'pointer',
                            }, children: "Close All" }), _jsx("button", { onClick: () => setActiveIds(['item2']), style: {
                                padding: '8px 16px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                                cursor: 'pointer',
                            }, children: "Open Second Only" })] }), _jsx(Accordion, { items: defaultItems, activeIds: activeIds, onChange: setActiveIds })] }));
    },
};
export const FAQ = {
    render: () => (_jsxs("div", { style: { width: '700px' }, children: [_jsx("h2", { style: { marginBottom: '24px', fontSize: '24px', fontWeight: '600' }, children: "Frequently Asked Questions" }), _jsx(Accordion, { items: [
                    {
                        id: 'faq1',
                        title: _jsxs(_Fragment, { children: [_jsx("i", { className: "bx bx-book" }), " How do I install BRICKS?"] }),
                        content: (_jsxs("div", { children: [_jsx("p", { children: "You can install BRICKS using npm or yarn:" }), _jsx("pre", { style: { background: '#f5f5f5', padding: '12px', borderRadius: '4px', marginTop: '12px' }, children: "npm install @bricks/design-system" })] })),
                    },
                    {
                        id: 'faq2',
                        title: _jsxs(_Fragment, { children: [_jsx("i", { className: "bx bx-palette" }), " Can I customize the theme?"] }),
                        content: (_jsxs("div", { children: [_jsx("p", { children: "Yes! BRICKS supports extensive theming options:" }), _jsxs("ul", { style: { marginTop: '12px', paddingLeft: '20px' }, children: [_jsx("li", { children: "Custom color palettes" }), _jsx("li", { children: "Typography scales" }), _jsx("li", { children: "Spacing systems" }), _jsx("li", { children: "Border radius values" }), _jsx("li", { children: "Shadow presets" })] })] })),
                    },
                    {
                        id: 'faq3',
                        title: _jsxs(_Fragment, { children: [_jsx("i", { className: "bx bx-accessibility" }), " Is BRICKS accessible?"] }),
                        content: (_jsxs("div", { children: [_jsx("p", { children: "Absolutely! All components are built with accessibility as a priority:" }), _jsxs("ul", { style: { marginTop: '12px', paddingLeft: '20px' }, children: [_jsx("li", { children: "WCAG 2.1 AA compliance" }), _jsx("li", { children: "Keyboard navigation support" }), _jsx("li", { children: "Screen reader friendly" }), _jsx("li", { children: "Focus management" }), _jsx("li", { children: "ARIA attributes" })] })] })),
                    },
                    {
                        id: 'faq4',
                        title: _jsxs(_Fragment, { children: [_jsx("i", { className: "bx bx-rocket" }), " What frameworks are supported?"] }),
                        content: (_jsxs("div", { children: [_jsx("p", { children: "BRICKS currently supports:" }), _jsxs("ul", { style: { marginTop: '12px', paddingLeft: '20px' }, children: [_jsx("li", { children: "React (16.8+)" }), _jsx("li", { children: "Vue (3.0+)" }), _jsx("li", { children: "Angular (12+)" }), _jsx("li", { children: "Vanilla JavaScript" })] }), _jsx("p", { style: { marginTop: '12px' }, children: "Support for other frameworks is coming soon!" })] })),
                    },
                    {
                        id: 'faq5',
                        title: _jsxs(_Fragment, { children: [_jsx("i", { className: "bx bx-briefcase" }), " Is BRICKS free for commercial use?"] }),
                        content: (_jsx("div", { children: _jsx("p", { children: "BRICKS is licensed under the MIT License, which means it's free for both personal and commercial use. You can use it in your projects without any restrictions." }) })),
                    },
                ], exclusive: true, variant: "flush" })] })),
};
//# sourceMappingURL=Accordion.stories.js.map