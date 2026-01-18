import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Breadcrumb } from './Breadcrumb';
const meta = {
    title: 'Navigation/Breadcrumb',
    component: Breadcrumb,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        separator: {
            control: 'select',
            options: ['slash', 'arrow', 'chevron', 'dot', 'pipe'],
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
        },
        background: {
            control: 'boolean',
        },
        dark: {
            control: 'boolean',
        },
        truncate: {
            control: 'boolean',
        },
        responsive: {
            control: 'boolean',
        },
    },
};
export default meta;
const basicItems = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'products', label: 'Products', href: '/products' },
    { id: 'electronics', label: 'Electronics', href: '/products/electronics' },
    { id: 'laptops', label: 'Laptops', active: true },
];
export const Default = {
    args: {
        items: basicItems,
    },
};
export const WithHomeIcon = {
    args: {
        items: [
            { id: 'home', label: '', href: '/' },
            { id: 'docs', label: 'Documentation', href: '/docs' },
            { id: 'components', label: 'Components', href: '/docs/components' },
            { id: 'breadcrumb', label: 'Breadcrumb', active: true },
        ],
        homeIcon: _jsx("i", { className: "bx bx-home" }),
    },
};
export const Separators = {
    render: () => (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '20px', width: '600px' }, children: [_jsx(Breadcrumb, { items: basicItems, separator: "slash" }), _jsx(Breadcrumb, { items: basicItems, separator: "arrow" }), _jsx(Breadcrumb, { items: basicItems, separator: "chevron" }), _jsx(Breadcrumb, { items: basicItems, separator: "dot" }), _jsx(Breadcrumb, { items: basicItems, separator: "pipe" })] })),
};
export const Sizes = {
    render: () => (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '20px', width: '600px' }, children: [_jsx(Breadcrumb, { items: basicItems, size: "sm" }), _jsx(Breadcrumb, { items: basicItems, size: "md" }), _jsx(Breadcrumb, { items: basicItems, size: "lg" })] })),
};
export const WithBackground = {
    args: {
        items: basicItems,
        background: true,
    },
};
export const DarkTheme = {
    render: () => (_jsx("div", { style: { padding: '20px', background: '#1a1a1a', borderRadius: '8px' }, children: _jsx(Breadcrumb, { items: basicItems, dark: true, background: true }) })),
};
export const Truncated = {
    args: {
        items: [
            { id: 'home', label: 'Home', href: '/' },
            { id: 'long1', label: 'Very Long Category Name That Should Be Truncated', href: '/category' },
            { id: 'long2', label: 'Another Extremely Long Subcategory Name', href: '/subcategory' },
            { id: 'product', label: 'Final Product with Long Name', active: true },
        ],
        truncate: true,
        background: true,
    },
};
export const WithIcons = {
    args: {
        items: [
            {
                id: 'home',
                label: 'Dashboard',
                href: '/',
                icon: _jsx("i", { className: "bx bx-home" })
            },
            {
                id: 'settings',
                label: 'Settings',
                href: '/settings',
                icon: _jsx("i", { className: "bx bx-cog" })
            },
            {
                id: 'security',
                label: 'Security',
                href: '/settings/security',
                icon: _jsx("i", { className: "bx bx-lock-alt" })
            },
            {
                id: 'password',
                label: 'Password',
                active: true,
                icon: _jsx("i", { className: "bx bx-key" })
            },
        ],
    },
};
export const CustomSeparator = {
    args: {
        items: basicItems,
        customSeparator: '→',
    },
};
export const ResponsiveExample = {
    args: {
        items: [
            { id: 'home', label: 'Home', href: '/' },
            { id: 'category1', label: 'Main Category', href: '/category1' },
            { id: 'category2', label: 'Sub Category', href: '/category2' },
            { id: 'category3', label: 'Deep Category', href: '/category3' },
            { id: 'product', label: 'Product Name', active: true },
        ],
        responsive: true,
        background: true,
    },
};
export const ECommerce = {
    render: () => (_jsxs("div", { style: { width: '700px' }, children: [_jsx("h3", { style: { marginBottom: '16px' }, children: "E-Commerce Navigation" }), _jsx(Breadcrumb, { items: [
                    { id: 'home', label: '', href: '/' },
                    { id: 'shop', label: 'Shop', href: '/shop' },
                    { id: 'mens', label: "Men's Fashion", href: '/shop/mens' },
                    { id: 'shoes', label: 'Shoes', href: '/shop/mens/shoes' },
                    { id: 'sneakers', label: 'Sneakers', href: '/shop/mens/shoes/sneakers' },
                    { id: 'product', label: 'Nike Air Max 90', active: true },
                ], homeIcon: _jsx("i", { className: "bx bx-store" }), separator: "chevron", background: true })] })),
};
export const Documentation = {
    render: () => (_jsxs("div", { style: { width: '700px' }, children: [_jsx("h3", { style: { marginBottom: '16px' }, children: "Documentation Navigation" }), _jsx(Breadcrumb, { items: [
                    { id: 'docs', label: 'Docs', href: '/docs' },
                    { id: 'guides', label: 'Guides', href: '/docs/guides' },
                    { id: 'advanced', label: 'Advanced', href: '/docs/guides/advanced' },
                    { id: 'performance', label: 'Performance Optimization', active: true },
                ], separator: "arrow", size: "sm" })] })),
};
export const FileSystem = {
    render: () => (_jsxs("div", { style: { width: '700px' }, children: [_jsx("h3", { style: { marginBottom: '16px' }, children: "File System Path" }), _jsx(Breadcrumb, { items: [
                    { id: 'root', label: '/', href: '/' },
                    { id: 'users', label: 'Users', href: '/users' },
                    { id: 'documents', label: 'Documents', href: '/users/documents' },
                    { id: 'projects', label: 'Projects', href: '/users/documents/projects' },
                    { id: 'design', label: 'design-system', active: true },
                ], separator: "slash", background: true, dark: true })] })),
};
export const WithCustomClickHandler = {
    render: () => {
        const handleClick = (label) => (e) => {
            e.preventDefault();
            alert(`Navigating to: ${label}`);
        };
        return (_jsx(Breadcrumb, { items: [
                {
                    id: 'home',
                    label: 'Home',
                    href: '/',
                    onClick: handleClick('Home')
                },
                {
                    id: 'about',
                    label: 'About',
                    href: '/about',
                    onClick: handleClick('About')
                },
                {
                    id: 'team',
                    label: 'Team',
                    href: '/about/team',
                    onClick: handleClick('Team')
                },
                {
                    id: 'member',
                    label: 'John Doe',
                    active: true
                },
            ], separator: "chevron" }));
    },
};
//# sourceMappingURL=Breadcrumb.stories.js.map