import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Tooltip, { TooltipShortcut } from '../react/Tooltip';
const meta = {
    title: 'Feedback/Tooltip',
    component: Tooltip,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Tooltip은 마우스 오버나 키보드 포커스 시 추가 정보를 제공하는 보조 컴포넌트입니다. 접근성을 고려한 ARIA 속성과 다양한 위치, 테마를 지원합니다.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        content: {
            control: 'text',
            description: 'Tooltip 내용',
        },
        placement: {
            control: 'select',
            options: ['top', 'bottom', 'left', 'right'],
            description: 'Tooltip 위치',
        },
        theme: {
            control: 'radio',
            options: ['dark', 'light'],
            description: '테마 스타일',
        },
        disabled: {
            control: 'boolean',
            description: 'Tooltip 비활성화 여부',
        },
        delay: {
            control: 'number',
            description: '표시 지연 시간 (ms)',
        },
        interactive: {
            control: 'boolean',
            description: 'Tooltip에 마우스 오버 시 유지 여부',
        },
    },
};
export default meta;
export const Default = {
    args: {
        content: '계정 설정을 열어 프로필과 보안 옵션을 확인하세요.',
        placement: 'top',
        theme: 'dark',
        children: (_jsxs("button", { className: "btn btn--ghost", children: [_jsx("i", { className: 'bx bx-cog', "aria-hidden": "true" }), "\uACC4\uC815 \uC124\uC815"] })),
    },
};
export const Placements = {
    render: () => (_jsxs("div", { style: { display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(2, 1fr)', minWidth: '300px' }, children: [_jsx(Tooltip, { content: "Top placement", placement: "top", children: _jsx("button", { className: "btn btn--ghost", children: "Top" }) }), _jsx(Tooltip, { content: "Bottom placement", placement: "bottom", children: _jsx("button", { className: "btn btn--ghost", children: "Bottom" }) }), _jsx(Tooltip, { content: "Left placement", placement: "left", children: _jsx("button", { className: "btn btn--ghost", children: "Left" }) }), _jsx(Tooltip, { content: "Right placement", placement: "right", children: _jsx("button", { className: "btn btn--ghost", children: "Right" }) })] })),
};
export const Themes = {
    render: () => (_jsxs("div", { style: { display: 'flex', gap: '2rem' }, children: [_jsx(Tooltip, { content: "Dark theme tooltip", theme: "dark", children: _jsx("button", { className: "btn btn--ghost", children: "Dark Theme" }) }), _jsx(Tooltip, { content: "Light theme tooltip", theme: "light", children: _jsx("button", { className: "btn btn--ghost", children: "Light Theme" }) })] })),
};
export const WithIcons = {
    render: () => (_jsxs("div", { style: { display: 'flex', gap: '2rem' }, children: [_jsx(Tooltip, { content: "\uACC4\uC815 \uC124\uC815\uC744 \uC5F4\uC5B4 \uD504\uB85C\uD544\uACFC \uBCF4\uC548 \uC635\uC158\uC744 \uD655\uC778\uD558\uC138\uC694.", children: _jsxs("button", { className: "btn btn--ghost", children: [_jsx("i", { className: 'bx bx-cog', "aria-hidden": "true" }), "\uACC4\uC815 \uC124\uC815"] }) }), _jsx(Tooltip, { content: "\uC2E0\uADDC \uACF5\uC9C0\uB97C \uD655\uC778\uD558\uC138\uC694.", children: _jsxs("a", { href: "#", className: "btn btn--ghost", children: [_jsx("i", { className: 'bx bx-bell', "aria-hidden": "true" }), "\uC54C\uB9BC"] }) }), _jsx(Tooltip, { content: "\uB3C4\uC6C0\uB9D0 \uBB38\uC11C\uB97C \uD655\uC778\uD558\uC138\uC694.", children: _jsxs("button", { className: "btn btn--ghost", children: [_jsx("i", { className: 'bx bx-help-circle', "aria-hidden": "true" }), "\uB3C4\uC6C0\uB9D0"] }) })] })),
};
export const WithShortcut = {
    args: {
        content: _jsx(TooltipShortcut, { label: "\uC0C8 \uBA54\uBAA8", keys: ['⌘', 'Shift', 'N'] }),
        theme: 'light',
        children: (_jsxs("button", { className: "btn btn--ghost", children: [_jsx("i", { className: 'bx bx-command', "aria-hidden": "true" }), "\uB2E8\uCD95\uD0A4"] })),
    },
};
export const WithDelay = {
    args: {
        content: '500ms 후에 표시됩니다',
        delay: 500,
        children: _jsx("button", { className: "btn btn--primary", children: "Hover me (500ms delay)" }),
    },
};
export const Interactive = {
    args: {
        content: (_jsxs("div", { children: [_jsx("p", { children: "\uC774 Tooltip\uC740 \uB9C8\uC6B0\uC2A4\uB97C \uC62C\uB824\uB3C4 \uC0AC\uB77C\uC9C0\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4." }), _jsx("a", { href: "#", style: { color: 'var(--ds-prime-400)' }, children: "\uD074\uB9AD \uAC00\uB2A5\uD55C \uB9C1\uD06C" })] })),
        interactive: true,
        theme: 'light',
        children: _jsx("button", { className: "btn btn--secondary", children: "Interactive Tooltip" }),
    },
};
export const Disabled = {
    args: {
        content: '이 Tooltip은 비활성화되어 있습니다',
        disabled: true,
        children: _jsx("button", { className: "btn btn--ghost", children: "Disabled Tooltip" }),
    },
};
export const LongContent = {
    args: {
        content: '이것은 매우 긴 Tooltip 내용입니다. Tooltip은 최대 너비가 제한되어 있어 긴 텍스트는 자동으로 줄바꿈됩니다. 모바일에서는 더 작은 최대 너비가 적용됩니다.',
        placement: 'bottom',
        children: _jsx("button", { className: "btn btn--primary", children: "Long Content" }),
    },
};
export const CustomContent = {
    args: {
        content: (_jsxs("div", { style: { textAlign: 'center' }, children: [_jsx("div", { style: { fontSize: '1.5rem', marginBottom: '0.5rem' }, children: "\uD83C\uDFAF" }), _jsx("strong", { children: "\uCEE4\uC2A4\uD140 \uCF58\uD150\uCE20" }), _jsx("p", { style: { margin: '0.5rem 0 0' }, children: "React \uB178\uB4DC\uB97C \uC0AC\uC6A9\uD55C \uD48D\uBD80\uD55C \uCF58\uD150\uCE20" })] })),
        theme: 'light',
        placement: 'right',
        children: _jsx("button", { className: "btn btn--secondary", children: "Custom Content" }),
    },
};
export const OnLinks = {
    render: () => (_jsxs("div", { style: { display: 'flex', gap: '2rem', alignItems: 'center' }, children: [_jsx(Tooltip, { content: "\uD648\uC73C\uB85C \uC774\uB3D9", children: _jsx("a", { href: "#", className: "link", children: "\uD648" }) }), _jsx(Tooltip, { content: "\uD504\uB85C\uD544 \uD398\uC774\uC9C0\uB85C \uC774\uB3D9", children: _jsx("a", { href: "#", className: "link", children: "\uD504\uB85C\uD544" }) }), _jsx(Tooltip, { content: "\uC124\uC815 \uD398\uC774\uC9C0\uB85C \uC774\uB3D9", children: _jsx("a", { href: "#", className: "link", children: "\uC124\uC815" }) })] })),
};
export const AccessibilityExample = {
    render: () => (_jsxs("div", { style: { padding: '2rem' }, children: [_jsx("h3", { style: { marginBottom: '1rem' }, children: "\uC811\uADFC\uC131 \uAE30\uB2A5" }), _jsxs("ul", { style: { marginBottom: '2rem', textAlign: 'left' }, children: [_jsx("li", { children: "\uD0A4\uBCF4\uB4DC Tab\uC73C\uB85C \uD3EC\uCEE4\uC2A4 \uC774\uB3D9 \uC2DC Tooltip \uD45C\uC2DC" }), _jsx("li", { children: "Escape \uD0A4\uB85C Tooltip \uB2EB\uAE30" }), _jsx("li", { children: "aria-describedby\uB85C \uC2A4\uD06C\uB9B0 \uB9AC\uB354 \uC9C0\uC6D0" }), _jsx("li", { children: "role=\"tooltip\"\uC73C\uB85C \uC5ED\uD560 \uBA85\uC2DC" })] }), _jsxs("div", { style: { display: 'flex', gap: '1rem' }, children: [_jsx(Tooltip, { content: "Tab \uD0A4\uB85C \uD3EC\uCEE4\uC2A4\uD558\uBA74 \uD45C\uC2DC\uB429\uB2C8\uB2E4", children: _jsx("button", { className: "btn btn--primary", children: "\uD3EC\uCEE4\uC2A4 \uAC00\uB2A5" }) }), _jsx(Tooltip, { content: "Escape \uD0A4\uB97C \uB204\uB974\uBA74 \uB2EB\uD799\uB2C8\uB2E4", children: _jsx("button", { className: "btn btn--secondary", children: "Esc\uB85C \uB2EB\uAE30" }) })] })] })),
};
//# sourceMappingURL=Tooltip.stories.js.map