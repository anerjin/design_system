import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Navbar } from './Navbar';
import { Button } from './Button';
import { Icon } from './Icon';
const meta = {
    title: 'Components/Navbar',
    component: Navbar,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'dark', 'light', 'transparent'],
        },
        fixed: {
            control: 'select',
            options: [false, 'top', 'bottom'],
        },
        align: {
            control: 'select',
            options: ['left', 'center', 'right'],
        },
        sticky: {
            control: 'boolean',
        },
        shadow: {
            control: 'boolean',
        },
        showMobileMenu: {
            control: 'boolean',
        },
    },
};
export default meta;
const basicItems = [
    { id: 'home', label: 'Home', href: '/', active: true },
    { id: 'about', label: 'About', href: '/about' },
    { id: 'services', label: 'Services', href: '/services' },
    { id: 'contact', label: 'Contact', href: '/contact' },
];
const itemsWithIcons = [
    {
        id: 'home',
        label: 'Home',
        href: '/',
        icon: _jsx(Icon, { name: "home" }),
        active: true
    },
    {
        id: 'products',
        label: 'Products',
        href: '/products',
        icon: _jsx(Icon, { name: "shopping-bag" })
    },
    {
        id: 'services',
        label: 'Services',
        href: '/services',
        icon: _jsx(Icon, { name: "cog" })
    },
    {
        id: 'contact',
        label: 'Contact',
        href: '/contact',
        icon: _jsx(Icon, { name: "envelope" })
    },
];
const itemsWithDropdown = [
    { id: 'home', label: 'Home', href: '/', active: true },
    {
        id: 'products',
        label: 'Products',
        icon: _jsx(Icon, { name: "shopping-bag" }),
        children: [
            { id: 'electronics', label: 'Electronics', href: '/products/electronics', icon: _jsx(Icon, { name: "laptop" }) },
            { id: 'clothing', label: 'Clothing', href: '/products/clothing', icon: _jsx(Icon, { name: "t-shirt" }) },
            { id: 'books', label: 'Books', href: '/products/books', icon: _jsx(Icon, { name: "book" }) },
            { id: 'sports', label: 'Sports', href: '/products/sports', icon: _jsx(Icon, { name: "football" }) },
        ],
    },
    {
        id: 'services',
        label: 'Services',
        icon: _jsx(Icon, { name: "cog" }),
        children: [
            { id: 'consulting', label: 'Consulting', href: '/services/consulting' },
            { id: 'support', label: 'Support', href: '/services/support' },
            { id: 'training', label: 'Training', href: '/services/training' },
        ],
    },
    { id: 'about', label: 'About', href: '/about' },
    { id: 'contact', label: 'Contact', href: '/contact' },
];
export const Default = {
    args: {
        brand: 'BRICKS',
        items: basicItems,
    },
};
export const WithIcons = {
    args: {
        brand: _jsxs(_Fragment, { children: [_jsx(Icon, { name: "cube" }), " BRICKS"] }),
        items: itemsWithIcons,
    },
};
export const WithDropdowns = {
    args: {
        brand: 'BRICKS',
        items: itemsWithDropdown,
    },
};
export const DarkVariant = {
    args: {
        brand: 'BRICKS',
        items: basicItems,
        variant: 'dark',
    },
};
export const LightVariant = {
    render: () => (_jsx("div", { style: { background: '#333', minHeight: '200px' }, children: _jsx(Navbar, { brand: "BRICKS", items: basicItems, variant: "light" }) })),
};
export const TransparentVariant = {
    render: () => (_jsx("div", { style: {
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            minHeight: '200px'
        }, children: _jsx(Navbar, { brand: _jsx("span", { style: { color: 'white', fontWeight: 'bold' }, children: "BRICKS" }), items: basicItems.map(item => ({ ...item, style: { color: 'white' } })), variant: "transparent" }) })),
};
export const CenterAligned = {
    args: {
        brand: 'BRICKS',
        items: basicItems,
        align: 'center',
    },
};
export const RightAligned = {
    args: {
        brand: 'BRICKS',
        items: basicItems,
        align: 'right',
    },
};
export const FixedTop = {
    render: () => (_jsxs("div", { children: [_jsx(Navbar, { brand: "BRICKS", items: basicItems, fixed: "top" }), _jsx("div", { style: { paddingTop: '80px', height: '1000px', background: '#f5f5f5' }, children: _jsxs("div", { style: { padding: '20px' }, children: [_jsx("h2", { children: "Fixed Top Navbar" }), _jsx("p", { children: "Scroll down to see the navbar stay at the top." }), [...Array(50)].map((_, i) => (_jsxs("p", { children: ["Content line ", i + 1] }, i)))] }) })] })),
};
export const Sticky = {
    render: () => (_jsxs("div", { children: [_jsxs("div", { style: { height: '100px', background: '#e0e0e0', padding: '20px' }, children: [_jsx("h2", { children: "Header Content" }), _jsx("p", { children: "Scroll down and the navbar will stick to the top" })] }), _jsx(Navbar, { brand: "BRICKS", items: basicItems, sticky: true }), _jsx("div", { style: { height: '1000px', background: '#f5f5f5', padding: '20px' }, children: [...Array(50)].map((_, i) => (_jsxs("p", { children: ["Content line ", i + 1] }, i))) })] })),
};
export const WithRightContent = {
    args: {
        brand: 'BRICKS',
        items: basicItems,
        rightContent: (_jsxs(_Fragment, { children: [_jsxs("div", { className: "navbar__search", children: [_jsx("input", { type: "text", className: "navbar__search-input", placeholder: "Search..." }), _jsx(Icon, { name: "search", className: "navbar__search-icon" })] }), _jsx("button", { className: "navbar__icon-btn", children: _jsx(Icon, { name: "bell" }) }), _jsx("div", { className: "navbar__user", children: _jsx("img", { src: "https://via.placeholder.com/32", alt: "User", className: "navbar__avatar" }) })] })),
    },
};
export const NoShadow = {
    args: {
        brand: 'BRICKS',
        items: basicItems,
        shadow: false,
    },
};
export const WithDisabledItems = {
    args: {
        brand: 'BRICKS',
        items: [
            { id: 'home', label: 'Home', href: '/', active: true },
            { id: 'about', label: 'About', href: '/about' },
            { id: 'services', label: 'Services (Coming Soon)', disabled: true },
            {
                id: 'products',
                label: 'Products (Disabled)',
                icon: _jsx(Icon, { name: "shopping-bag" }),
                disabled: true,
                children: [
                    { id: 'electronics', label: 'Electronics', href: '/products/electronics' },
                    { id: 'clothing', label: 'Clothing', href: '/products/clothing' },
                ],
            },
            {
                id: 'resources',
                label: 'Resources',
                icon: _jsx(Icon, { name: "book-open" }),
                children: [
                    { id: 'docs', label: 'Documentation', href: '/docs' },
                    { id: 'api', label: 'API (Coming Soon)', disabled: true },
                    { id: 'blog', label: 'Blog', href: '/blog' },
                ],
            },
            { id: 'contact', label: 'Contact', href: '/contact' },
        ],
    },
};
export const ComplexNavbar = {
    args: {
        brand: (_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '8px' }, children: [_jsx(Icon, { name: "cube", size: 28 }), _jsx("span", { style: { fontWeight: 'bold', fontSize: '20px' }, children: "BRICKS" })] })),
        items: [
            {
                id: 'home',
                label: 'Home',
                href: '/',
                icon: _jsx(Icon, { name: "home" }),
                active: true,
            },
            {
                id: 'products',
                label: 'Products',
                icon: _jsx(Icon, { name: "shopping-bag" }),
                children: [
                    {
                        id: 'all',
                        label: 'All Products',
                        href: '/products',
                        icon: _jsx(Icon, { name: "grid-alt" })
                    },
                    {
                        id: 'featured',
                        label: 'Featured',
                        href: '/products/featured',
                        icon: _jsx(Icon, { name: "star" })
                    },
                    {
                        id: 'new',
                        label: 'New Arrivals',
                        href: '/products/new',
                        icon: _jsx(Icon, { name: "badge" })
                    },
                    {
                        id: 'sale',
                        label: 'On Sale',
                        href: '/products/sale',
                        icon: _jsx(Icon, { name: "purchase-tag" })
                    },
                ],
            },
            {
                id: 'solutions',
                label: 'Solutions',
                icon: _jsx(Icon, { name: "bulb" }),
                children: [
                    {
                        id: 'enterprise',
                        label: 'Enterprise',
                        href: '/solutions/enterprise',
                        icon: _jsx(Icon, { name: "building" }),
                    },
                    {
                        id: 'small-business',
                        label: 'Small Business',
                        href: '/solutions/small-business',
                        icon: _jsx(Icon, { name: "store" }),
                    },
                    {
                        id: 'startup',
                        label: 'Startups',
                        href: '/solutions/startup',
                        icon: _jsx(Icon, { name: "rocket" }),
                    },
                ],
            },
            {
                id: 'resources',
                label: 'Resources',
                icon: _jsx(Icon, { name: "book-open" }),
                children: [
                    { id: 'docs', label: 'Documentation', href: '/docs', icon: _jsx(Icon, { name: "file" }) },
                    { id: 'blog', label: 'Blog', href: '/blog', icon: _jsx(Icon, { name: "news" }) },
                    { id: 'tutorials', label: 'Tutorials', href: '/tutorials', icon: _jsx(Icon, { name: "video" }) },
                    { id: 'api', label: 'API Reference', href: '/api', icon: _jsx(Icon, { name: "code-alt" }) },
                ],
            },
            {
                id: 'pricing',
                label: 'Pricing',
                href: '/pricing',
                icon: _jsx(Icon, { name: "dollar" }),
            },
        ],
        rightContent: (_jsxs(_Fragment, { children: [_jsxs("div", { className: "navbar__search", children: [_jsx("input", { type: "text", className: "navbar__search-input", placeholder: "Search..." }), _jsx(Icon, { name: "search", className: "navbar__search-icon" })] }), _jsx("button", { className: "navbar__icon-btn", children: _jsx(Icon, { name: "bell" }) }), _jsx("div", { className: "navbar__user", children: _jsx("img", { src: "https://via.placeholder.com/32", alt: "User", className: "navbar__avatar" }) }), _jsx(Button, { variant: "primary", size: "sm", children: "Get Started" })] })),
        variant: 'default',
    },
};
export const ECommerce = {
    args: {
        brand: (_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '8px' }, children: [_jsx(Icon, { name: "store", size: 24 }), _jsx("span", { style: { fontWeight: 'bold', fontSize: '18px' }, children: "Shop" })] })),
        items: [
            {
                id: 'shop',
                label: 'Shop',
                children: [
                    { id: 'men', label: "Men's", href: '/shop/men', icon: _jsx(Icon, { name: "male" }) },
                    { id: 'women', label: "Women's", href: '/shop/women', icon: _jsx(Icon, { name: "female" }) },
                    { id: 'kids', label: "Kids", href: '/shop/kids', icon: _jsx(Icon, { name: "child" }) },
                    { id: 'accessories', label: 'Accessories', href: '/shop/accessories', icon: _jsx(Icon, { name: "glasses" }) },
                ],
            },
            { id: 'new', label: 'New Arrivals', href: '/new' },
            { id: 'sale', label: 'Sale', href: '/sale' },
            { id: 'brands', label: 'Brands', href: '/brands' },
        ],
        rightContent: (_jsxs("div", { style: { display: 'flex', gap: '16px', alignItems: 'center' }, children: [_jsx(Button, { variant: "ghost", size: "sm", children: _jsx(Icon, { name: "search" }) }), _jsx(Button, { variant: "ghost", size: "sm", children: _jsx(Icon, { name: "heart" }) }), _jsxs(Button, { variant: "ghost", size: "sm", children: [_jsx(Icon, { name: "cart" }), _jsx("span", { style: { marginLeft: '4px' }, children: "3" })] }), _jsx(Button, { variant: "ghost", size: "sm", children: _jsx(Icon, { name: "user" }) })] })),
    },
};
export const Documentation = {
    args: {
        brand: (_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '8px' }, children: [_jsx(Icon, { name: "book", size: 24 }), _jsx("span", { style: { fontWeight: 'bold' }, children: "Docs" })] })),
        items: [
            {
                id: 'getting-started',
                label: 'Getting Started',
                href: '/docs/getting-started',
                icon: _jsx(Icon, { name: "rocket" })
            },
            {
                id: 'components',
                label: 'Components',
                icon: _jsx(Icon, { name: "cube" }),
                children: [
                    { id: 'buttons', label: 'Buttons', href: '/docs/components/buttons' },
                    { id: 'forms', label: 'Forms', href: '/docs/components/forms' },
                    { id: 'navigation', label: 'Navigation', href: '/docs/components/navigation' },
                    { id: 'layout', label: 'Layout', href: '/docs/components/layout' },
                ],
            },
            {
                id: 'guides',
                label: 'Guides',
                icon: _jsx(Icon, { name: "compass" }),
                children: [
                    { id: 'installation', label: 'Installation', href: '/guides/installation' },
                    { id: 'customization', label: 'Customization', href: '/guides/customization' },
                    { id: 'migration', label: 'Migration', href: '/guides/migration' },
                ],
            },
            {
                id: 'api',
                label: 'API',
                href: '/api',
                icon: _jsx(Icon, { name: "code-alt" })
            },
        ],
        rightContent: (_jsxs("div", { style: { display: 'flex', gap: '8px', alignItems: 'center' }, children: [_jsx(Button, { variant: "ghost", size: "sm", children: _jsx(Icon, { name: "search" }) }), _jsx(Button, { variant: "ghost", size: "sm", children: _jsx(Icon, { name: "moon" }) }), _jsx(Button, { variant: "ghost", size: "sm", children: _jsx(Icon, { name: "github", "name-type": "logo" }) })] })),
        variant: 'light',
    },
};
//# sourceMappingURL=Navbar.stories.js.map