import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar, AvatarGroup } from './Avatar';
import { Icon } from './Icon';
import { Badge } from './Badge';
const meta = {
    title: 'Components/Avatar',
    component: Avatar,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg', 'xl'],
        },
        shape: {
            control: 'select',
            options: ['circle', 'rounded', 'square'],
        },
        variant: {
            control: 'select',
            options: ['default', 'primary', 'secondary', 'success', 'danger', 'warning', 'info'],
        },
        status: {
            control: 'select',
            options: [undefined, 'online', 'away', 'busy', 'offline'],
        },
    },
};
export default meta;
export const Default = {
    args: {
        src: 'https://i.pravatar.cc/150?img=1',
        alt: 'John Doe',
    },
};
export const Sizes = {
    render: () => (_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '16px' }, children: [_jsx(Avatar, { src: "https://i.pravatar.cc/150?img=2", alt: "User", size: "xs" }), _jsx(Avatar, { src: "https://i.pravatar.cc/150?img=3", alt: "User", size: "sm" }), _jsx(Avatar, { src: "https://i.pravatar.cc/150?img=4", alt: "User", size: "md" }), _jsx(Avatar, { src: "https://i.pravatar.cc/150?img=5", alt: "User", size: "lg" }), _jsx(Avatar, { src: "https://i.pravatar.cc/150?img=6", alt: "User", size: "xl" })] })),
};
export const Shapes = {
    render: () => (_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '16px' }, children: [_jsx(Avatar, { src: "https://i.pravatar.cc/150?img=7", alt: "Circle", shape: "circle" }), _jsx(Avatar, { src: "https://i.pravatar.cc/150?img=8", alt: "Rounded", shape: "rounded" }), _jsx(Avatar, { src: "https://i.pravatar.cc/150?img=9", alt: "Square", shape: "square" })] })),
};
export const Initials = {
    render: () => (_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '16px' }, children: [_jsx(Avatar, { initials: "JD", variant: "default" }), _jsx(Avatar, { initials: "AB", variant: "primary" }), _jsx(Avatar, { initials: "CD", variant: "success" }), _jsx(Avatar, { initials: "EF", variant: "warning" }), _jsx(Avatar, { initials: "GH", variant: "danger" }), _jsx(Avatar, { initials: "IJ", variant: "info" }), _jsx(Avatar, { initials: "KL", variant: "secondary" })] })),
};
export const WithStatus = {
    render: () => (_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '24px' }, children: [_jsxs("div", { style: { textAlign: 'center' }, children: [_jsx(Avatar, { src: "https://i.pravatar.cc/150?img=10", alt: "Online", status: "online", size: "lg" }), _jsx("p", { style: { marginTop: '8px', fontSize: '12px' }, children: "Online" })] }), _jsxs("div", { style: { textAlign: 'center' }, children: [_jsx(Avatar, { src: "https://i.pravatar.cc/150?img=11", alt: "Away", status: "away", size: "lg" }), _jsx("p", { style: { marginTop: '8px', fontSize: '12px' }, children: "Away" })] }), _jsxs("div", { style: { textAlign: 'center' }, children: [_jsx(Avatar, { src: "https://i.pravatar.cc/150?img=12", alt: "Busy", status: "busy", size: "lg" }), _jsx("p", { style: { marginTop: '8px', fontSize: '12px' }, children: "Busy" })] }), _jsxs("div", { style: { textAlign: 'center' }, children: [_jsx(Avatar, { src: "https://i.pravatar.cc/150?img=13", alt: "Offline", status: "offline", size: "lg" }), _jsx("p", { style: { marginTop: '8px', fontSize: '12px' }, children: "Offline" })] })] })),
};
export const Clickable = {
    render: () => (_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '16px' }, children: [_jsx(Avatar, { src: "https://i.pravatar.cc/150?img=14", alt: "Click me", onClick: () => alert('Avatar clicked!') }), _jsx(Avatar, { initials: "CL", variant: "primary", onClick: () => alert('Initials avatar clicked!') })] })),
};
export const WithBadge = {
    render: () => (_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '24px' }, children: [_jsx(Avatar, { src: "https://i.pravatar.cc/150?img=15", alt: "User", badge: _jsx(Badge, { size: "sm", variant: "danger", children: "5" }), badgePosition: "top-right" }), _jsx(Avatar, { src: "https://i.pravatar.cc/150?img=16", alt: "User", badge: _jsx(Icon, { name: "check-circle", size: 16, color: "green" }), badgePosition: "bottom-right" }), _jsx(Avatar, { initials: "NB", variant: "primary", badge: _jsx(Badge, { size: "sm", variant: "warning", children: "!" }), badgePosition: "top-left" })] })),
};
export const CustomContent = {
    render: () => (_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '16px' }, children: [_jsx(Avatar, { children: _jsx(Icon, { name: "user", size: 24 }) }), _jsx(Avatar, { variant: "primary", children: _jsx(Icon, { name: "star", size: 24, color: "white" }) }), _jsx(Avatar, { variant: "success", shape: "square", children: _jsx(Icon, { name: "check", size: 24, color: "white" }) })] })),
};
export const Loading = {
    render: () => (_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '16px' }, children: [_jsx(Avatar, { loading: true, size: "xs" }), _jsx(Avatar, { loading: true, size: "sm" }), _jsx(Avatar, { loading: true, size: "md" }), _jsx(Avatar, { loading: true, size: "lg" }), _jsx(Avatar, { loading: true, size: "xl" })] })),
};
export const Fallback = {
    render: () => (_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '16px' }, children: [_jsx(Avatar, { src: "invalid-url.jpg", alt: "Broken image" }), _jsx(Avatar, { alt: "No src or initials" }), _jsx(Avatar, {})] })),
};
export const Group = {
    render: () => (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '24px' }, children: [_jsxs(AvatarGroup, { max: 3, children: [_jsx(Avatar, { src: "https://i.pravatar.cc/150?img=17", alt: "User 1" }), _jsx(Avatar, { src: "https://i.pravatar.cc/150?img=18", alt: "User 2" }), _jsx(Avatar, { src: "https://i.pravatar.cc/150?img=19", alt: "User 3" }), _jsx(Avatar, { src: "https://i.pravatar.cc/150?img=20", alt: "User 4" }), _jsx(Avatar, { src: "https://i.pravatar.cc/150?img=21", alt: "User 5" })] }), _jsxs(AvatarGroup, { max: 4, size: "sm", children: [_jsx(Avatar, { src: "https://i.pravatar.cc/150?img=22", alt: "User 1" }), _jsx(Avatar, { src: "https://i.pravatar.cc/150?img=23", alt: "User 2" }), _jsx(Avatar, { src: "https://i.pravatar.cc/150?img=24", alt: "User 3" }), _jsx(Avatar, { src: "https://i.pravatar.cc/150?img=25", alt: "User 4" }), _jsx(Avatar, { src: "https://i.pravatar.cc/150?img=26", alt: "User 5" }), _jsx(Avatar, { src: "https://i.pravatar.cc/150?img=27", alt: "User 6" })] }), _jsxs(AvatarGroup, { max: 5, size: "lg", spacing: -12, children: [_jsx(Avatar, { initials: "JD", variant: "primary" }), _jsx(Avatar, { initials: "AS", variant: "success" }), _jsx(Avatar, { initials: "BW", variant: "warning" }), _jsx(Avatar, { initials: "CL", variant: "danger" }), _jsx(Avatar, { initials: "DM", variant: "info" }), _jsx(Avatar, { initials: "EK", variant: "secondary" }), _jsx(Avatar, { initials: "FG" })] })] })),
};
export const GroupWithCustomMore = {
    render: () => (_jsxs(AvatarGroup, { max: 3, renderMore: (count) => (_jsx(Avatar, { variant: "secondary", children: _jsxs("span", { style: { fontSize: '12px', fontWeight: 'bold' }, children: ["+", count] }) })), children: [_jsx(Avatar, { src: "https://i.pravatar.cc/150?img=28", alt: "User 1" }), _jsx(Avatar, { src: "https://i.pravatar.cc/150?img=29", alt: "User 2" }), _jsx(Avatar, { src: "https://i.pravatar.cc/150?img=30", alt: "User 3" }), _jsx(Avatar, { src: "https://i.pravatar.cc/150?img=31", alt: "User 4" }), _jsx(Avatar, { src: "https://i.pravatar.cc/150?img=32", alt: "User 5" })] })),
};
export const UserCards = {
    render: () => (_jsxs("div", { style: { display: 'flex', gap: '24px', flexWrap: 'wrap' }, children: [_jsxs("div", { style: {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    minWidth: '250px'
                }, children: [_jsx(Avatar, { src: "https://i.pravatar.cc/150?img=33", alt: "John Doe", size: "lg", status: "online" }), _jsxs("div", { children: [_jsx("div", { style: { fontWeight: '600' }, children: "John Doe" }), _jsx("div", { style: { fontSize: '13px', color: '#666' }, children: "Product Designer" })] })] }), _jsxs("div", { style: {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    minWidth: '250px'
                }, children: [_jsx(Avatar, { initials: "JS", variant: "primary", size: "lg", status: "away" }), _jsxs("div", { children: [_jsx("div", { style: { fontWeight: '600' }, children: "Jane Smith" }), _jsx("div", { style: { fontSize: '13px', color: '#666' }, children: "Frontend Developer" })] })] }), _jsxs("div", { style: {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    minWidth: '250px'
                }, children: [_jsx(Avatar, { size: "lg", badge: _jsx(Badge, { size: "sm", variant: "success", children: "Pro" }), badgePosition: "bottom-right", children: _jsx(Icon, { name: "user-circle", size: 32 }) }), _jsxs("div", { children: [_jsx("div", { style: { fontWeight: '600' }, children: "Guest User" }), _jsx("div", { style: { fontSize: '13px', color: '#666' }, children: "Premium Member" })] })] })] })),
};
export const TeamList = {
    render: () => {
        const team = [
            { id: 1, name: 'Alice Cooper', role: 'Team Lead', status: 'online', avatar: 'https://i.pravatar.cc/150?img=34' },
            { id: 2, name: 'Bob Wilson', role: 'Developer', status: 'online', initials: 'BW' },
            { id: 3, name: 'Charlie Brown', role: 'Designer', status: 'away', avatar: 'https://i.pravatar.cc/150?img=35' },
            { id: 4, name: 'Diana Prince', role: 'QA Engineer', status: 'busy', initials: 'DP' },
            { id: 5, name: 'Edward Norton', role: 'DevOps', status: 'offline', avatar: 'https://i.pravatar.cc/150?img=36' },
        ];
        return (_jsxs("div", { style: { width: '400px' }, children: [_jsx("h3", { style: { marginBottom: '16px' }, children: "Team Members" }), _jsx("div", { style: { display: 'flex', flexDirection: 'column', gap: '8px' }, children: team.map(member => (_jsxs("div", { style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '12px',
                            background: '#f5f5f5',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            transition: 'background 0.2s'
                        }, onMouseEnter: (e) => {
                            e.currentTarget.style.background = '#e8e8e8';
                        }, onMouseLeave: (e) => {
                            e.currentTarget.style.background = '#f5f5f5';
                        }, children: [_jsx(Avatar, { src: member.avatar, initials: member.initials, alt: member.name, status: member.status, variant: member.initials ? 'primary' : 'default' }), _jsxs("div", { style: { flex: 1 }, children: [_jsx("div", { style: { fontWeight: '500' }, children: member.name }), _jsx("div", { style: { fontSize: '12px', color: '#666' }, children: member.role })] }), _jsx(Icon, { name: "chevron-right", size: 20, color: "#999" })] }, member.id))) })] }));
    },
};
//# sourceMappingURL=Avatar.stories.js.map