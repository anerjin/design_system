import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Typography } from './Typography';
const meta = {
    title: 'Elements/Typography',
    component: Typography,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: [
                'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
                'subtitle1', 'subtitle2',
                'body1', 'body2',
                'caption', 'overline',
                'display1', 'display2', 'display3', 'display4'
            ],
        },
        align: {
            control: 'select',
            options: ['left', 'center', 'right', 'justify'],
        },
        weight: {
            control: 'select',
            options: [undefined, 'light', 'regular', 'medium', 'semibold', 'bold', 'black'],
        },
        color: {
            control: 'select',
            options: [undefined, 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'muted', 'inherit'],
        },
        transform: {
            control: 'select',
            options: [undefined, 'none', 'capitalize', 'uppercase', 'lowercase'],
        },
        decoration: {
            control: 'select',
            options: [undefined, 'none', 'underline', 'line-through', 'overline'],
        },
        display: {
            control: 'select',
            options: ['inline', 'inline-block', 'block'],
        },
    },
};
export default meta;
export const Default = {
    args: {
        children: 'This is a typography component with default settings.',
    },
};
export const Headings = {
    render: () => (_jsxs("div", { style: { maxWidth: '600px', textAlign: 'left' }, children: [_jsx(Typography, { variant: "h1", gutterBottom: true, children: "Heading 1" }), _jsx(Typography, { variant: "h2", gutterBottom: true, children: "Heading 2" }), _jsx(Typography, { variant: "h3", gutterBottom: true, children: "Heading 3" }), _jsx(Typography, { variant: "h4", gutterBottom: true, children: "Heading 4" }), _jsx(Typography, { variant: "h5", gutterBottom: true, children: "Heading 5" }), _jsx(Typography, { variant: "h6", gutterBottom: true, children: "Heading 6" })] })),
};
export const DisplayVariants = {
    render: () => (_jsxs("div", { style: { maxWidth: '800px', textAlign: 'left' }, children: [_jsx(Typography, { variant: "display1", gutterBottom: true, children: "Display 1" }), _jsx(Typography, { variant: "display2", gutterBottom: true, children: "Display 2" }), _jsx(Typography, { variant: "display3", gutterBottom: true, children: "Display 3" }), _jsx(Typography, { variant: "display4", gutterBottom: true, children: "Display 4" })] })),
};
export const BodyText = {
    render: () => (_jsxs("div", { style: { maxWidth: '600px', textAlign: 'left' }, children: [_jsx(Typography, { variant: "subtitle1", gutterBottom: true, children: "Subtitle 1" }), _jsx(Typography, { variant: "subtitle2", gutterBottom: true, children: "Subtitle 2" }), _jsx(Typography, { variant: "body1", gutterBottom: true, children: "Body 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." }), _jsx(Typography, { variant: "body2", gutterBottom: true, children: "Body 2: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." }), _jsx(Typography, { variant: "caption", display: "block", gutterBottom: true, children: "Caption: This is a caption text" }), _jsx(Typography, { variant: "overline", display: "block", children: "Overline Text" })] })),
};
export const Colors = {
    render: () => (_jsxs("div", { style: { maxWidth: '600px', textAlign: 'left' }, children: [_jsx(Typography, { variant: "h5", color: "primary", gutterBottom: true, children: "Primary Color" }), _jsx(Typography, { variant: "h5", color: "secondary", gutterBottom: true, children: "Secondary Color" }), _jsx(Typography, { variant: "h5", color: "success", gutterBottom: true, children: "Success Color" }), _jsx(Typography, { variant: "h5", color: "danger", gutterBottom: true, children: "Danger Color" }), _jsx(Typography, { variant: "h5", color: "warning", gutterBottom: true, children: "Warning Color" }), _jsx(Typography, { variant: "h5", color: "info", gutterBottom: true, children: "Info Color" }), _jsx(Typography, { variant: "h5", color: "light", gutterBottom: true, style: { background: '#333', padding: '8px' }, children: "Light Color" }), _jsx(Typography, { variant: "h5", color: "dark", gutterBottom: true, children: "Dark Color" }), _jsx(Typography, { variant: "h5", color: "muted", gutterBottom: true, children: "Muted Color" })] })),
};
export const Weights = {
    render: () => (_jsxs("div", { style: { maxWidth: '600px', textAlign: 'left' }, children: [_jsx(Typography, { variant: "h4", weight: "light", gutterBottom: true, children: "Light Weight" }), _jsx(Typography, { variant: "h4", weight: "regular", gutterBottom: true, children: "Regular Weight" }), _jsx(Typography, { variant: "h4", weight: "medium", gutterBottom: true, children: "Medium Weight" }), _jsx(Typography, { variant: "h4", weight: "semibold", gutterBottom: true, children: "Semibold Weight" }), _jsx(Typography, { variant: "h4", weight: "bold", gutterBottom: true, children: "Bold Weight" }), _jsx(Typography, { variant: "h4", weight: "black", gutterBottom: true, children: "Black Weight" })] })),
};
export const Alignment = {
    render: () => (_jsxs("div", { style: { maxWidth: '600px' }, children: [_jsx(Typography, { variant: "body1", align: "left", gutterBottom: true, children: "Left aligned text: Lorem ipsum dolor sit amet, consectetur adipiscing elit." }), _jsx(Typography, { variant: "body1", align: "center", gutterBottom: true, children: "Center aligned text: Lorem ipsum dolor sit amet, consectetur adipiscing elit." }), _jsx(Typography, { variant: "body1", align: "right", gutterBottom: true, children: "Right aligned text: Lorem ipsum dolor sit amet, consectetur adipiscing elit." }), _jsx(Typography, { variant: "body1", align: "justify", gutterBottom: true, children: "Justified text: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris." })] })),
};
export const TextTransform = {
    render: () => (_jsxs("div", { style: { maxWidth: '600px', textAlign: 'left' }, children: [_jsx(Typography, { variant: "h5", transform: "none", gutterBottom: true, children: "No transformation" }), _jsx(Typography, { variant: "h5", transform: "capitalize", gutterBottom: true, children: "capitalize text" }), _jsx(Typography, { variant: "h5", transform: "uppercase", gutterBottom: true, children: "uppercase text" }), _jsx(Typography, { variant: "h5", transform: "lowercase", gutterBottom: true, children: "LOWERCASE TEXT" })] })),
};
export const TextDecoration = {
    render: () => (_jsxs("div", { style: { maxWidth: '600px', textAlign: 'left' }, children: [_jsx(Typography, { variant: "body1", decoration: "none", gutterBottom: true, children: "No decoration" }), _jsx(Typography, { variant: "body1", decoration: "underline", gutterBottom: true, children: "Underlined text" }), _jsx(Typography, { variant: "body1", decoration: "line-through", gutterBottom: true, children: "Line-through text" }), _jsx(Typography, { variant: "body1", decoration: "overline", gutterBottom: true, children: "Overline text" })] })),
};
export const Truncation = {
    render: () => (_jsxs("div", { style: { maxWidth: '400px', textAlign: 'left' }, children: [_jsx(Typography, { variant: "body1", truncate: true, gutterBottom: true, children: "This is a very long text that will be truncated with an ellipsis when it exceeds the container width. Lorem ipsum dolor sit amet, consectetur adipiscing elit." }), _jsx("div", { style: { marginTop: '20px' }, children: _jsx(Typography, { variant: "body1", clamp: 2, children: "This text will be clamped to 2 lines. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris." }) }), _jsx("div", { style: { marginTop: '20px' }, children: _jsx(Typography, { variant: "body1", clamp: 3, children: "This text will be clamped to 3 lines. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit." }) })] })),
};
export const Italic = {
    render: () => (_jsxs("div", { style: { maxWidth: '600px', textAlign: 'left' }, children: [_jsx(Typography, { variant: "h4", italic: true, gutterBottom: true, children: "Italic Heading" }), _jsx(Typography, { variant: "body1", italic: true, children: "This is italic body text. Lorem ipsum dolor sit amet, consectetur adipiscing elit." })] })),
};
export const InlineDisplay = {
    render: () => (_jsxs("div", { style: { maxWidth: '600px', textAlign: 'left' }, children: [_jsx(Typography, { variant: "body1", display: "inline", color: "primary", children: "This is inline " }), _jsx(Typography, { variant: "body1", display: "inline", color: "secondary", children: "text that flows " }), _jsx(Typography, { variant: "body1", display: "inline", color: "success", children: "together on the " }), _jsx(Typography, { variant: "body1", display: "inline", color: "danger", children: "same line." })] })),
};
export const NoSelect = {
    render: () => (_jsxs("div", { style: { maxWidth: '600px', textAlign: 'left' }, children: [_jsx(Typography, { variant: "body1", noSelect: true, gutterBottom: true, children: "This text cannot be selected. Try selecting it with your mouse." }), _jsx(Typography, { variant: "body1", children: "This text can be selected normally." })] })),
};
export const CustomElement = {
    render: () => (_jsxs("div", { style: { maxWidth: '600px', textAlign: 'left' }, children: [_jsx(Typography, { variant: "h1", as: "div", gutterBottom: true, children: "H1 styled text rendered as a div" }), _jsx(Typography, { variant: "body1", as: "span", display: "block", gutterBottom: true, children: "Body text rendered as a span" }), _jsx(Typography, { variant: "caption", as: "h3", display: "block", children: "Caption styled text rendered as an h3" })] })),
};
export const Article = {
    render: () => (_jsxs("article", { style: { maxWidth: '800px' }, children: [_jsx(Typography, { variant: "display2", gutterBottom: true, children: "The Future of Web Development" }), _jsx(Typography, { variant: "subtitle1", color: "muted", gutterBottom: true, children: "Published on December 1, 2024 \u2022 5 min read" }), _jsx(Typography, { variant: "body1", gutterBottom: true, children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." }), _jsx(Typography, { variant: "h3", gutterBottom: true, children: "Introduction" }), _jsx(Typography, { variant: "body1", gutterBottom: true, children: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." }), _jsx(Typography, { variant: "h4", gutterBottom: true, children: "Key Technologies" }), _jsx(Typography, { variant: "body2", gutterBottom: true, children: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo." }), _jsx(Typography, { variant: "caption", color: "muted", display: "block", children: "Note: This is a sample article demonstrating various typography styles." })] })),
};
export const PricingCard = {
    render: () => (_jsxs("div", { style: {
            padding: '32px',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            maxWidth: '300px',
            textAlign: 'center'
        }, children: [_jsx(Typography, { variant: "overline", color: "primary", display: "block", gutterBottom: true, children: "MOST POPULAR" }), _jsx(Typography, { variant: "h3", weight: "bold", gutterBottom: true, children: "Pro Plan" }), _jsxs("div", { style: { margin: '24px 0' }, children: [_jsx(Typography, { variant: "display3", weight: "bold", display: "inline", children: "$29" }), _jsx(Typography, { variant: "subtitle1", color: "muted", display: "inline", children: "/month" })] }), _jsx(Typography, { variant: "body2", color: "muted", gutterBottom: true, children: "Perfect for growing businesses" }), _jsxs("div", { style: { marginTop: '24px', textAlign: 'left' }, children: [_jsxs(Typography, { variant: "body2", gutterBottom: true, children: [_jsx("i", { className: "bx bx-check" }), " Unlimited projects"] }), _jsxs(Typography, { variant: "body2", gutterBottom: true, children: [_jsx("i", { className: "bx bx-check" }), " Advanced analytics"] }), _jsxs(Typography, { variant: "body2", gutterBottom: true, children: [_jsx("i", { className: "bx bx-check" }), " Priority support"] }), _jsxs(Typography, { variant: "body2", gutterBottom: true, children: [_jsx("i", { className: "bx bx-check" }), " Custom integrations"] })] })] })),
};
//# sourceMappingURL=Typography.stories.js.map