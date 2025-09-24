import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Tabs } from './Tabs';
import { Badge } from './Badge';
const meta = {
    title: 'Components/Tabs',
    component: Tabs,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'pills', 'vertical'],
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
        },
        justified: {
            control: 'boolean',
        },
    },
};
export default meta;
const defaultTabs = [
    {
        key: 'tab1',
        label: 'Tab 1',
        content: (_jsxs("div", { style: { padding: '20px' }, children: [_jsx("h3", { children: "Tab 1 Content" }), _jsx("p", { children: "This is the content for the first tab." })] })),
    },
    {
        key: 'tab2',
        label: 'Tab 2',
        content: (_jsxs("div", { style: { padding: '20px' }, children: [_jsx("h3", { children: "Tab 2 Content" }), _jsx("p", { children: "This is the content for the second tab." })] })),
    },
    {
        key: 'tab3',
        label: 'Tab 3',
        content: (_jsxs("div", { style: { padding: '20px' }, children: [_jsx("h3", { children: "Tab 3 Content" }), _jsx("p", { children: "This is the content for the third tab." })] })),
    },
];
export const Default = {
    args: {
        items: defaultTabs,
        defaultActiveKey: 'tab1',
    },
};
export const Pills = {
    args: {
        variant: 'pills',
        items: defaultTabs,
        defaultActiveKey: 'tab1',
    },
};
export const Vertical = {
    args: {
        variant: 'vertical',
        items: [
            {
                key: 'general',
                label: 'General',
                content: (_jsxs("div", { style: { padding: '20px', minHeight: '200px' }, children: [_jsx("h3", { children: "General Settings" }), _jsx("p", { children: "Configure your general preferences here." })] })),
            },
            {
                key: 'security',
                label: 'Security',
                content: (_jsxs("div", { style: { padding: '20px', minHeight: '200px' }, children: [_jsx("h3", { children: "Security Settings" }), _jsx("p", { children: "Manage your security and privacy settings." })] })),
            },
            {
                key: 'notifications',
                label: 'Notifications',
                content: (_jsxs("div", { style: { padding: '20px', minHeight: '200px' }, children: [_jsx("h3", { children: "Notification Preferences" }), _jsx("p", { children: "Control how and when you receive notifications." })] })),
            },
            {
                key: 'advanced',
                label: 'Advanced',
                content: (_jsxs("div", { style: { padding: '20px', minHeight: '200px' }, children: [_jsx("h3", { children: "Advanced Settings" }), _jsx("p", { children: "Advanced configuration options for power users." })] })),
            },
        ],
        defaultActiveKey: 'general',
    },
};
export const Sizes = {
    render: () => (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '32px' }, children: [_jsxs("div", { children: [_jsx("h4", { style: { marginBottom: '12px' }, children: "Small" }), _jsx(Tabs, { size: "sm", items: defaultTabs, defaultActiveKey: "tab1" })] }), _jsxs("div", { children: [_jsx("h4", { style: { marginBottom: '12px' }, children: "Medium (Default)" }), _jsx(Tabs, { size: "md", items: defaultTabs, defaultActiveKey: "tab1" })] }), _jsxs("div", { children: [_jsx("h4", { style: { marginBottom: '12px' }, children: "Large" }), _jsx(Tabs, { size: "lg", items: defaultTabs, defaultActiveKey: "tab1" })] })] })),
};
export const Justified = {
    args: {
        justified: true,
        items: [
            {
                key: 'short',
                label: 'Short',
                content: _jsx("div", { style: { padding: '20px' }, children: "Short label tab" }),
            },
            {
                key: 'medium',
                label: 'Medium Label',
                content: _jsx("div", { style: { padding: '20px' }, children: "Medium length label tab" }),
            },
            {
                key: 'long',
                label: 'Very Long Label Here',
                content: _jsx("div", { style: { padding: '20px' }, children: "Long label tab" }),
            },
        ],
        defaultActiveKey: 'short',
    },
};
export const WithIcons = {
    args: {
        items: [
            {
                key: 'home',
                label: 'Home',
                icon: _jsx("span", { style: { marginRight: '6px' }, children: "\uD83C\uDFE0" }),
                content: (_jsxs("div", { style: { padding: '20px' }, children: [_jsx("h3", { children: "Home" }), _jsx("p", { children: "Welcome to the home tab." })] })),
            },
            {
                key: 'profile',
                label: 'Profile',
                icon: _jsx("span", { style: { marginRight: '6px' }, children: _jsx("i", { className: "bx bx-user" }) }),
                content: (_jsxs("div", { style: { padding: '20px' }, children: [_jsx("h3", { children: "Profile" }), _jsx("p", { children: "View and edit your profile information." })] })),
            },
            {
                key: 'settings',
                label: 'Settings',
                icon: _jsx("span", { style: { marginRight: '6px' }, children: "\u2699\uFE0F" }),
                content: (_jsxs("div", { style: { padding: '20px' }, children: [_jsx("h3", { children: "Settings" }), _jsx("p", { children: "Manage your application settings." })] })),
            },
        ],
        defaultActiveKey: 'home',
    },
};
export const WithBadges = {
    args: {
        variant: 'pills',
        items: [
            {
                key: 'inbox',
                label: 'Inbox',
                badge: _jsx(Badge, { variant: "danger", size: "sm", children: "24" }),
                content: (_jsxs("div", { style: { padding: '20px' }, children: [_jsx("h3", { children: "Inbox" }), _jsx("p", { children: "You have 24 unread messages." })] })),
            },
            {
                key: 'sent',
                label: 'Sent',
                content: (_jsxs("div", { style: { padding: '20px' }, children: [_jsx("h3", { children: "Sent Messages" }), _jsx("p", { children: "View your sent messages." })] })),
            },
            {
                key: 'drafts',
                label: 'Drafts',
                badge: _jsx(Badge, { variant: "secondary", size: "sm", children: "3" }),
                content: (_jsxs("div", { style: { padding: '20px' }, children: [_jsx("h3", { children: "Drafts" }), _jsx("p", { children: "You have 3 draft messages." })] })),
            },
            {
                key: 'spam',
                label: 'Spam',
                badge: _jsx(Badge, { variant: "warning", size: "sm", children: "!" }),
                content: (_jsxs("div", { style: { padding: '20px' }, children: [_jsx("h3", { children: "Spam" }), _jsx("p", { children: "Spam messages are kept here." })] })),
            },
        ],
        defaultActiveKey: 'inbox',
    },
};
export const WithDisabled = {
    args: {
        items: [
            {
                key: 'active',
                label: 'Active Tab',
                content: (_jsx("div", { style: { padding: '20px' }, children: _jsx("p", { children: "This tab is active and clickable." }) })),
            },
            {
                key: 'disabled',
                label: 'Disabled Tab',
                disabled: true,
                content: (_jsx("div", { style: { padding: '20px' }, children: _jsx("p", { children: "This content is not accessible." }) })),
            },
            {
                key: 'another',
                label: 'Another Tab',
                content: (_jsx("div", { style: { padding: '20px' }, children: _jsx("p", { children: "This is another active tab." }) })),
            },
        ],
        defaultActiveKey: 'active',
    },
};
export const Controlled = {
    render: () => {
        const [activeKey, setActiveKey] = useState('tab1');
        return (_jsxs("div", { children: [_jsxs("div", { style: { marginBottom: '16px' }, children: [_jsx("button", { onClick: () => setActiveKey('tab1'), style: { marginRight: '8px', padding: '4px 12px' }, children: "Go to Tab 1" }), _jsx("button", { onClick: () => setActiveKey('tab2'), style: { marginRight: '8px', padding: '4px 12px' }, children: "Go to Tab 2" }), _jsx("button", { onClick: () => setActiveKey('tab3'), style: { padding: '4px 12px' }, children: "Go to Tab 3" })] }), _jsx(Tabs, { items: defaultTabs, activeKey: activeKey, onChange: setActiveKey }), _jsxs("p", { style: { marginTop: '16px', fontSize: '14px', color: '#666' }, children: ["Active tab: ", activeKey] })] }));
    },
};
export const ComplexContent = {
    args: {
        variant: 'pills',
        size: 'lg',
        items: [
            {
                key: 'overview',
                label: 'Overview',
                icon: _jsx("span", { style: { marginRight: '6px' }, children: "\uD83D\uDCCA" }),
                content: (_jsxs("div", { style: { padding: '20px' }, children: [_jsx("h3", { children: "Project Overview" }), _jsx("p", { children: "This is a comprehensive overview of your project." }), _jsxs("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginTop: '20px' }, children: [_jsxs("div", { style: { padding: '16px', background: '#f8f9fa', borderRadius: '8px', textAlign: 'center' }, children: [_jsx("div", { style: { fontSize: '24px', fontWeight: 'bold' }, children: "42" }), _jsx("div", { style: { fontSize: '14px', color: '#666' }, children: "Total Tasks" })] }), _jsxs("div", { style: { padding: '16px', background: '#d4edda', borderRadius: '8px', textAlign: 'center' }, children: [_jsx("div", { style: { fontSize: '24px', fontWeight: 'bold', color: '#155724' }, children: "28" }), _jsx("div", { style: { fontSize: '14px', color: '#155724' }, children: "Completed" })] }), _jsxs("div", { style: { padding: '16px', background: '#cce5ff', borderRadius: '8px', textAlign: 'center' }, children: [_jsx("div", { style: { fontSize: '24px', fontWeight: 'bold', color: '#004085' }, children: "10" }), _jsx("div", { style: { fontSize: '14px', color: '#004085' }, children: "In Progress" })] }), _jsxs("div", { style: { padding: '16px', background: '#fff3cd', borderRadius: '8px', textAlign: 'center' }, children: [_jsx("div", { style: { fontSize: '24px', fontWeight: 'bold', color: '#856404' }, children: "4" }), _jsx("div", { style: { fontSize: '14px', color: '#856404' }, children: "Pending" })] })] })] })),
            },
            {
                key: 'analytics',
                label: 'Analytics',
                icon: _jsx("span", { style: { marginRight: '6px' }, children: "\uD83D\uDCC8" }),
                badge: _jsx(Badge, { variant: "success", size: "sm", children: "New" }),
                content: (_jsxs("div", { style: { padding: '20px' }, children: [_jsx("h3", { children: "Analytics Dashboard" }), _jsx("p", { children: "View your project metrics and performance." }), _jsxs("div", { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }, children: [_jsxs("div", { style: { padding: '20px', background: '#f0f0f0', borderRadius: '8px' }, children: [_jsx("strong", { children: "Total Views" }), _jsx("p", { style: { fontSize: '32px', margin: '8px 0' }, children: "12,543" }), _jsx("small", { style: { color: '#666' }, children: "+23% from last month" })] }), _jsxs("div", { style: { padding: '20px', background: '#f0f0f0', borderRadius: '8px' }, children: [_jsx("strong", { children: "Engagement Rate" }), _jsx("p", { style: { fontSize: '32px', margin: '8px 0' }, children: "87%" }), _jsx("small", { style: { color: '#666' }, children: "+5% from last month" })] })] })] })),
            },
            {
                key: 'reports',
                label: 'Reports',
                icon: _jsx("span", { style: { marginRight: '6px' }, children: "\uD83D\uDCD1" }),
                content: (_jsxs("div", { style: { padding: '20px' }, children: [_jsx("h3", { children: "Monthly Reports" }), _jsx("p", { children: "Download and view your monthly reports." }), _jsx("div", { style: { marginTop: '16px' }, children: _jsxs("table", { style: { width: '100%', borderCollapse: 'collapse' }, children: [_jsx("thead", { children: _jsxs("tr", { style: { borderBottom: '2px solid #dee2e6' }, children: [_jsx("th", { style: { padding: '8px', textAlign: 'left' }, children: "Report" }), _jsx("th", { style: { padding: '8px', textAlign: 'left' }, children: "Date" }), _jsx("th", { style: { padding: '8px', textAlign: 'left' }, children: "Status" }), _jsx("th", { style: { padding: '8px', textAlign: 'left' }, children: "Action" })] }) }), _jsxs("tbody", { children: [_jsxs("tr", { style: { borderBottom: '1px solid #dee2e6' }, children: [_jsx("td", { style: { padding: '8px' }, children: "Q1 Performance" }), _jsx("td", { style: { padding: '8px' }, children: "Apr 1, 2024" }), _jsx("td", { style: { padding: '8px' }, children: _jsx(Badge, { variant: "success", size: "sm", children: "Ready" }) }), _jsx("td", { style: { padding: '8px' }, children: _jsx("a", { href: "#", children: "Download" }) })] }), _jsxs("tr", { style: { borderBottom: '1px solid #dee2e6' }, children: [_jsx("td", { style: { padding: '8px' }, children: "March Summary" }), _jsx("td", { style: { padding: '8px' }, children: "Mar 31, 2024" }), _jsx("td", { style: { padding: '8px' }, children: _jsx(Badge, { variant: "success", size: "sm", children: "Ready" }) }), _jsx("td", { style: { padding: '8px' }, children: _jsx("a", { href: "#", children: "Download" }) })] }), _jsxs("tr", { style: { borderBottom: '1px solid #dee2e6' }, children: [_jsx("td", { style: { padding: '8px' }, children: "February Summary" }), _jsx("td", { style: { padding: '8px' }, children: "Feb 29, 2024" }), _jsx("td", { style: { padding: '8px' }, children: _jsx(Badge, { variant: "success", size: "sm", children: "Ready" }) }), _jsx("td", { style: { padding: '8px' }, children: _jsx("a", { href: "#", children: "Download" }) })] })] })] }) })] })),
            },
            {
                key: 'settings',
                label: 'Settings',
                icon: _jsx("span", { style: { marginRight: '6px' }, children: "\u2699\uFE0F" }),
                content: (_jsxs("div", { style: { padding: '20px' }, children: [_jsx("h3", { children: "Project Settings" }), _jsxs("form", { style: { marginTop: '16px', maxWidth: '500px' }, children: [_jsxs("div", { style: { marginBottom: '16px' }, children: [_jsx("label", { style: { display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }, children: "Project Name" }), _jsx("input", { type: "text", defaultValue: "My Project", style: { width: '100%', padding: '8px 12px', border: '1px solid #dee2e6', borderRadius: '4px' } })] }), _jsxs("div", { style: { marginBottom: '16px' }, children: [_jsx("label", { style: { display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }, children: "Description" }), _jsx("textarea", { rows: 3, defaultValue: "Project description...", style: { width: '100%', padding: '8px 12px', border: '1px solid #dee2e6', borderRadius: '4px', resize: 'vertical' } })] }), _jsxs("div", { style: { marginBottom: '16px' }, children: [_jsx("label", { style: { display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }, children: "Visibility" }), _jsxs("select", { style: { width: '100%', padding: '8px 12px', border: '1px solid #dee2e6', borderRadius: '4px' }, children: [_jsx("option", { children: "Public" }), _jsx("option", { children: "Private" }), _jsx("option", { children: "Team Only" })] })] }), _jsx("button", { type: "button", style: { padding: '8px 16px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }, children: "Save Changes" })] })] })),
            },
        ],
        defaultActiveKey: 'overview',
    },
};
export const NavigationTabs = {
    render: () => {
        const [activeTab, setActiveTab] = useState('products');
        const navigationTabs = [
            {
                key: 'products',
                label: 'Products',
                badge: _jsx(Badge, { variant: "primary", size: "sm", children: "120" }),
                content: (_jsxs("div", { style: { padding: '20px' }, children: [_jsx("h3", { children: "Product Catalog" }), _jsx("p", { children: "Browse through our extensive product collection." }), _jsx("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginTop: '16px' }, children: ['Product A', 'Product B', 'Product C'].map(product => (_jsxs("div", { style: { padding: '12px', border: '1px solid #dee2e6', borderRadius: '4px' }, children: [_jsx("h4", { children: product }), _jsx("p", { style: { fontSize: '14px', color: '#666' }, children: "Sample product description" }), _jsx("button", { style: { marginTop: '8px', padding: '4px 12px', fontSize: '12px' }, children: "View Details" })] }, product))) })] })),
            },
            {
                key: 'customers',
                label: 'Customers',
                badge: _jsx(Badge, { variant: "success", size: "sm", children: "1.2K" }),
                content: (_jsxs("div", { style: { padding: '20px' }, children: [_jsx("h3", { children: "Customer Management" }), _jsx("p", { children: "Manage your customer relationships and data." })] })),
            },
            {
                key: 'orders',
                label: 'Orders',
                badge: _jsx(Badge, { variant: "warning", size: "sm", children: "45" }),
                content: (_jsxs("div", { style: { padding: '20px' }, children: [_jsx("h3", { children: "Order Management" }), _jsx("p", { children: "Track and manage customer orders." })] })),
            },
            {
                key: 'analytics',
                label: 'Analytics',
                content: (_jsxs("div", { style: { padding: '20px' }, children: [_jsx("h3", { children: "Business Analytics" }), _jsx("p", { children: "View insights and performance metrics." })] })),
            },
        ];
        return (_jsx("div", { style: { width: '800px' }, children: _jsx(Tabs, { variant: "default", size: "lg", items: navigationTabs, activeKey: activeTab, onChange: setActiveTab, justified: true }) }));
    },
};
//# sourceMappingURL=Tabs.stories.js.map