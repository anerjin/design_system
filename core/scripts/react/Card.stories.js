import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Card } from './Card';
import { Button } from './Button';
import { Badge } from './Badge';
const meta = {
    title: 'Components/Card',
    component: Card,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'gray', 'flat', 'outlined', 'elevated'],
        },
        radius: {
            control: 'select',
            options: ['none', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full'],
        },
        clickable: {
            control: 'boolean',
        },
        horizontal: {
            control: 'boolean',
        },
    },
};
export default meta;
export const Default = {
    args: {
        children: (_jsxs(_Fragment, { children: [_jsxs(Card.Header, { children: [_jsx(Card.Title, { children: "Default Card" }), _jsx(Card.Subtitle, { children: "This is a default card example" })] }), _jsx(Card.Body, { children: "This is the card body content. You can put any content here." }), _jsxs(Card.Footer, { align: "right", children: [_jsx(Button, { variant: "secondary", size: "sm", children: "Cancel" }), _jsx(Button, { variant: "primary", size: "sm", style: { marginLeft: '8px' }, children: "Save" })] })] })),
    },
};
export const WithImage = {
    args: {
        variant: 'elevated',
        children: (_jsxs(_Fragment, { children: [_jsx(Card.Image, { src: "https://via.placeholder.com/400x200", alt: "" }), _jsxs(Card.Header, { children: [_jsx(Card.Title, { children: "Card with Image" }), _jsx(Card.Subtitle, { children: "Beautiful image card" })] }), _jsx(Card.Body, { children: "This card includes an image at the top. Perfect for showcasing products, articles, or any visual content." }), _jsxs(Card.Footer, { align: "between", children: [_jsx("span", { style: { fontSize: '14px', color: '#666' }, children: "2 hours ago" }), _jsx(Button, { variant: "primary", size: "sm", children: "View Details" })] })] })),
    },
};
export const Clickable = {
    args: {
        clickable: true,
        variant: 'outlined',
        onCardClick: () => alert('Card clicked!'),
        children: (_jsxs(_Fragment, { children: [_jsxs(Card.Header, { children: [_jsx(Card.Title, { children: "Clickable Card" }), _jsx(Card.Subtitle, { children: "Click anywhere on this card" })] }), _jsx(Card.Body, { children: "This entire card is clickable. Hover over it to see the interactive effect." })] })),
    },
};
export const Horizontal = {
    args: {
        horizontal: true,
        variant: 'elevated',
        children: (_jsxs(_Fragment, { children: [_jsx(Card.Image, { src: "https://via.placeholder.com/200x200", alt: "", style: { width: '200px', height: '100%', objectFit: 'cover' } }), _jsxs("div", { style: { flex: 1 }, children: [_jsxs(Card.Header, { children: [_jsx(Card.Title, { children: "Horizontal Card" }), _jsx(Card.Subtitle, { children: "Side-by-side layout" })] }), _jsx(Card.Body, { children: "This card uses a horizontal layout, perfect for list views or when you need to display content side by side." })] })] })),
    },
};
export const Variants = {
    render: () => (_jsxs("div", { style: { display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(2, 300px)' }, children: [_jsx(Card, { variant: "default", children: _jsxs(Card.Body, { children: [_jsx(Card.Title, { children: "Default" }), _jsx("p", { children: "Default card style" })] }) }), _jsx(Card, { variant: "gray", children: _jsxs(Card.Body, { children: [_jsx(Card.Title, { children: "Gray" }), _jsx("p", { children: "Gray background card" })] }) }), _jsx(Card, { variant: "flat", children: _jsxs(Card.Body, { children: [_jsx(Card.Title, { children: "Flat" }), _jsx("p", { children: "Flat card without shadow" })] }) }), _jsx(Card, { variant: "outlined", children: _jsxs(Card.Body, { children: [_jsx(Card.Title, { children: "Outlined" }), _jsx("p", { children: "Card with border" })] }) }), _jsx(Card, { variant: "elevated", children: _jsxs(Card.Body, { children: [_jsx(Card.Title, { children: "Elevated" }), _jsx("p", { children: "Card with elevation shadow" })] }) })] })),
};
export const BorderRadius = {
    render: () => (_jsxs("div", { style: { display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(3, 200px)' }, children: [_jsx(Card, { radius: "none", variant: "outlined", children: _jsxs(Card.Body, { children: [_jsx(Card.Title, { level: "h6", children: "None" }), _jsx("p", { style: { fontSize: '14px' }, children: "Sharp corners" })] }) }), _jsx(Card, { radius: "sm", variant: "outlined", children: _jsxs(Card.Body, { children: [_jsx(Card.Title, { level: "h6", children: "Small" }), _jsx("p", { style: { fontSize: '14px' }, children: "Slight rounding" })] }) }), _jsx(Card, { radius: "md", variant: "outlined", children: _jsxs(Card.Body, { children: [_jsx(Card.Title, { level: "h6", children: "Medium" }), _jsx("p", { style: { fontSize: '14px' }, children: "Medium rounding" })] }) }), _jsx(Card, { radius: "lg", variant: "outlined", children: _jsxs(Card.Body, { children: [_jsx(Card.Title, { level: "h6", children: "Large" }), _jsx("p", { style: { fontSize: '14px' }, children: "Large rounding" })] }) }), _jsx(Card, { radius: "xl", variant: "outlined", children: _jsxs(Card.Body, { children: [_jsx(Card.Title, { level: "h6", children: "XL (Default)" }), _jsx("p", { style: { fontSize: '14px' }, children: "Extra large" })] }) }), _jsx(Card, { radius: "2xl", variant: "outlined", children: _jsxs(Card.Body, { children: [_jsx(Card.Title, { level: "h6", children: "2XL" }), _jsx("p", { style: { fontSize: '14px' }, children: "2X large" })] }) }), _jsx(Card, { radius: "3xl", variant: "outlined", children: _jsxs(Card.Body, { children: [_jsx(Card.Title, { level: "h6", children: "3XL" }), _jsx("p", { style: { fontSize: '14px' }, children: "3X large" })] }) }), _jsx(Card, { radius: "full", variant: "outlined", children: _jsxs(Card.Body, { children: [_jsx(Card.Title, { level: "h6", children: "Full" }), _jsx("p", { style: { fontSize: '14px' }, children: "Maximum" })] }) })] })),
};
export const WithBadge = {
    args: {
        variant: 'elevated',
        children: (_jsxs(_Fragment, { children: [_jsx(Card.Badge, { position: "right", children: _jsx(Badge, { variant: "danger", shape: "pill", children: "NEW" }) }), _jsxs(Card.Header, { children: [_jsx(Card.Title, { children: "Featured Product" }), _jsx(Card.Subtitle, { children: "Limited time offer" })] }), _jsx(Card.Body, { children: "This card has a badge to highlight important information or status." }), _jsx(Card.Footer, { align: "right", children: _jsx(Button, { variant: "primary", children: "Shop Now" }) })] })),
    },
};
export const ProductCard = {
    render: () => (_jsxs(Card, { variant: "elevated", style: { width: '300px' }, children: [_jsx(Card.Badge, { children: _jsx(Badge, { variant: "success", size: "sm", children: "20% OFF" }) }), _jsx(Card.Image, { src: "https://via.placeholder.com/300x200", alt: "" }), _jsxs(Card.Header, { children: [_jsx(Card.Title, { level: "h4", children: "Premium Headphones" }), _jsx(Card.Subtitle, { children: "Wireless Bluetooth 5.0" })] }), _jsxs(Card.Body, { children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }, children: [_jsx("span", { style: { fontSize: '24px', fontWeight: 'bold' }, children: "$79.99" }), _jsx("span", { style: { fontSize: '16px', textDecoration: 'line-through', color: '#999' }, children: "$99.99" })] }), _jsx("p", { style: { fontSize: '14px', color: '#666' }, children: "High-quality wireless headphones with noise cancellation and 30-hour battery life." })] }), _jsxs(Card.Footer, { align: "between", children: [_jsxs(Button, { variant: "ghost", size: "sm", children: [_jsx("i", { className: "bx bx-heart" }), " Save"] }), _jsx(Button, { variant: "primary", size: "sm", children: "Add to Cart" })] })] })),
};
export const BlogCard = {
    render: () => (_jsxs(Card, { variant: "flat", clickable: true, style: { width: '400px' }, children: [_jsx(Card.Image, { src: "https://via.placeholder.com/400x200", alt: "", overlay: true, overlayContent: _jsx("div", { style: { padding: '16px', color: 'white' }, children: _jsx(Badge, { variant: "primary", type: "soft", children: "Technology" }) }) }), _jsxs(Card.Header, { dense: true, children: [_jsx(Card.Title, { level: "h3", children: "The Future of Web Development" }), _jsx(Card.Subtitle, { children: "Understanding modern web frameworks" })] }), _jsx(Card.Body, { children: _jsx("p", { style: { fontSize: '14px', lineHeight: '1.6' }, children: "Explore the latest trends in web development, from server components to edge computing. Learn how modern frameworks are shaping the future of web applications..." }) }), _jsxs(Card.Footer, { dense: true, align: "between", children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#666' }, children: [_jsx("span", { children: "John Doe" }), _jsx("span", { children: "\u2022" }), _jsx("span", { children: "5 min read" })] }), _jsx(Button, { variant: "link", size: "sm", children: "Read More \u2192" })] })] })),
};
export const FooterAlignments = {
    render: () => (_jsxs("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }, children: [_jsxs(Card, { variant: "outlined", children: [_jsx(Card.Header, { children: _jsx(Card.Title, { level: "h5", children: "Left Alignment (Default)" }) }), _jsx(Card.Body, { children: _jsx("p", { children: "Footer content aligned to the left." }) }), _jsxs(Card.Footer, { align: "left", children: [_jsx(Button, { variant: "secondary", size: "sm", children: "Cancel" }), _jsx(Button, { variant: "primary", size: "sm", style: { marginLeft: '8px' }, children: "Submit" })] })] }), _jsxs(Card, { variant: "outlined", children: [_jsx(Card.Header, { children: _jsx(Card.Title, { level: "h5", children: "Center Alignment" }) }), _jsx(Card.Body, { children: _jsx("p", { children: "Footer content centered." }) }), _jsxs(Card.Footer, { align: "center", children: [_jsx(Button, { variant: "secondary", size: "sm", children: "Cancel" }), _jsx(Button, { variant: "primary", size: "sm", style: { marginLeft: '8px' }, children: "Submit" })] })] }), _jsxs(Card, { variant: "outlined", children: [_jsx(Card.Header, { children: _jsx(Card.Title, { level: "h5", children: "Right Alignment" }) }), _jsx(Card.Body, { children: _jsx("p", { children: "Footer content aligned to the right." }) }), _jsxs(Card.Footer, { align: "right", children: [_jsx(Button, { variant: "secondary", size: "sm", children: "Cancel" }), _jsx(Button, { variant: "primary", size: "sm", style: { marginLeft: '8px' }, children: "Submit" })] })] }), _jsxs(Card, { variant: "outlined", children: [_jsx(Card.Header, { children: _jsx(Card.Title, { level: "h5", children: "Between Alignment" }) }), _jsx(Card.Body, { children: _jsx("p", { children: "Footer content spaced between edges." }) }), _jsxs(Card.Footer, { align: "between", children: [_jsx(Button, { variant: "ghost", size: "sm", children: "\u2190 Back" }), _jsx(Button, { variant: "primary", size: "sm", children: "Next \u2192" })] })] })] })),
};
export const StatsCard = {
    render: () => (_jsxs("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }, children: [_jsx(Card, { variant: "gray", children: _jsx(Card.Body, { children: _jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'start' }, children: [_jsxs("div", { children: [_jsx("p", { style: { fontSize: '14px', color: '#666', margin: '0' }, children: "Total Users" }), _jsx("p", { style: { fontSize: '32px', fontWeight: 'bold', margin: '4px 0' }, children: "2,543" }), _jsx("p", { style: { fontSize: '14px', color: '#10b981', margin: '0' }, children: "\u2191 12% from last month" })] }), _jsx(Badge, { variant: "success", type: "soft", children: "Active" })] }) }) }), _jsx(Card, { variant: "gray", children: _jsx(Card.Body, { children: _jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'start' }, children: [_jsxs("div", { children: [_jsx("p", { style: { fontSize: '14px', color: '#666', margin: '0' }, children: "Revenue" }), _jsx("p", { style: { fontSize: '32px', fontWeight: 'bold', margin: '4px 0' }, children: "$45,231" }), _jsx("p", { style: { fontSize: '14px', color: '#10b981', margin: '0' }, children: "\u2191 8% from last month" })] }), _jsx(Badge, { variant: "info", type: "soft", children: "Monthly" })] }) }) }), _jsx(Card, { variant: "gray", children: _jsx(Card.Body, { children: _jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'start' }, children: [_jsxs("div", { children: [_jsx("p", { style: { fontSize: '14px', color: '#666', margin: '0' }, children: "Orders" }), _jsx("p", { style: { fontSize: '32px', fontWeight: 'bold', margin: '4px 0' }, children: "439" }), _jsx("p", { style: { fontSize: '14px', color: '#ef4444', margin: '0' }, children: "\u2193 3% from last month" })] }), _jsx(Badge, { variant: "warning", type: "soft", children: "Pending" })] }) }) })] })),
};
//# sourceMappingURL=Card.stories.js.map