import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const meta = {
    title: 'Elements/Spacing',
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: `
# Spacing

BRICKS 디자인 시스템의 간격 체계는 일관되고 조화로운 레이아웃을 만듭니다.

## 간격 시스템

### Spacing Scale
4px를 기준으로 한 일관된 간격 시스템입니다.
- 0부터 40까지의 세밀한 단계
- px 단위로 정밀한 제어
- 반응형 디자인 지원

### Border Radius
모서리 둥글기를 정의하는 반지름 값입니다.
- none부터 full까지 9단계
- 컴포넌트 유형별 최적화
- 일관된 시각적 스타일

### Container Widths
반응형 레이아웃을 위한 컨테이너 너비입니다.
- xs부터 7xl까지 12단계
- 브레이크포인트별 최적화
- 유연한 그리드 시스템

### Z-Index Scale
레이어 순서를 관리하는 z-index 값입니다.
- 기본 0-50 스케일
- 컴포넌트별 전용 값
- 모달, 툴팁, 드롭다운 등

## 사용 방법

CSS 변수로 정의되어 있어 쉽게 사용할 수 있습니다:

\`\`\`css
.element {
  padding: var(--ds-space-4);
  margin-bottom: var(--ds-space-8);
  gap: var(--ds-space-2);
  border-radius: var(--ds-radius-md);
}

.container {
  max-width: var(--ds-container-5xl);
  z-index: var(--ds-z-modal);
}
\`\`\`

각 간격 요소를 클릭하면 변수명이 클립보드에 복사됩니다.
        `,
            },
        },
    },
    tags: ['autodocs'],
};
export default meta;
const SpacingBox = ({ name, variable, value, size }) => {
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    };
    return (_jsxs("div", { style: {
            display: 'flex',
            alignItems: 'center',
            marginBottom: '12px',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '4px',
            transition: 'background-color 0.2s',
        }, onClick: () => copyToClipboard(variable), onMouseEnter: (e) => {
            e.currentTarget.style.backgroundColor = '#f5f5f5';
        }, onMouseLeave: (e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
        }, children: [_jsx("div", { style: {
                    width: `${Math.min(size, 160)}px`,
                    height: '32px',
                    backgroundColor: 'var(--ds-black)',
                    borderRadius: '4px',
                    marginRight: '16px',
                } }), _jsx("div", { style: { flex: 1 }, children: _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '12px' }, children: [_jsx("span", { style: { fontWeight: '500', minWidth: '80px' }, children: name }), _jsx("code", { style: { fontSize: '12px', color: '#666' }, children: variable }), _jsx("span", { style: { fontSize: '12px', color: '#999' }, children: value })] }) })] }));
};
export const SpacingScale = {
    render: () => (_jsxs("div", { children: [_jsx("h2", { style: { marginBottom: '10px' }, children: "Spacing Scale" }), _jsx("p", { style: { marginBottom: '30px', color: '#666' }, children: "\uC77C\uAD00\uB41C \uB808\uC774\uC544\uC6C3\uC744 \uC704\uD55C \uAC04\uACA9 \uC2DC\uC2A4\uD15C\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uC5EC \uBCC0\uC218\uBA85\uC744 \uBCF5\uC0AC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4." }), _jsxs("div", { style: { maxWidth: '600px' }, children: [_jsx(SpacingBox, { name: "space-0", variable: "--ds-space-0", value: "0", size: 0 }), _jsx(SpacingBox, { name: "space-px", variable: "--ds-space-px", value: "1px", size: 1 }), _jsx(SpacingBox, { name: "space-0.5", variable: "--ds-space-0-5", value: "2px", size: 2 }), _jsx(SpacingBox, { name: "space-1", variable: "--ds-space-1", value: "4px", size: 4 }), _jsx(SpacingBox, { name: "space-1.5", variable: "--ds-space-1-5", value: "6px", size: 6 }), _jsx(SpacingBox, { name: "space-2", variable: "--ds-space-2", value: "8px", size: 8 }), _jsx(SpacingBox, { name: "space-2.5", variable: "--ds-space-2-5", value: "10px", size: 10 }), _jsx(SpacingBox, { name: "space-3", variable: "--ds-space-3", value: "12px", size: 12 }), _jsx(SpacingBox, { name: "space-3.5", variable: "--ds-space-3-5", value: "14px", size: 14 }), _jsx(SpacingBox, { name: "space-4", variable: "--ds-space-4", value: "16px", size: 16 }), _jsx(SpacingBox, { name: "space-5", variable: "--ds-space-5", value: "20px", size: 20 }), _jsx(SpacingBox, { name: "space-6", variable: "--ds-space-6", value: "24px", size: 24 }), _jsx(SpacingBox, { name: "space-7", variable: "--ds-space-7", value: "28px", size: 28 }), _jsx(SpacingBox, { name: "space-8", variable: "--ds-space-8", value: "32px", size: 32 }), _jsx(SpacingBox, { name: "space-9", variable: "--ds-space-9", value: "36px", size: 36 }), _jsx(SpacingBox, { name: "space-10", variable: "--ds-space-10", value: "40px", size: 40 }), _jsx(SpacingBox, { name: "space-11", variable: "--ds-space-11", value: "44px", size: 44 }), _jsx(SpacingBox, { name: "space-12", variable: "--ds-space-12", value: "48px", size: 48 }), _jsx(SpacingBox, { name: "space-14", variable: "--ds-space-14", value: "56px", size: 56 }), _jsx(SpacingBox, { name: "space-16", variable: "--ds-space-16", value: "64px", size: 64 }), _jsx(SpacingBox, { name: "space-20", variable: "--ds-space-20", value: "80px", size: 80 }), _jsx(SpacingBox, { name: "space-24", variable: "--ds-space-24", value: "96px", size: 96 }), _jsx(SpacingBox, { name: "space-28", variable: "--ds-space-28", value: "112px", size: 112 }), _jsx(SpacingBox, { name: "space-32", variable: "--ds-space-32", value: "128px", size: 128 }), _jsx(SpacingBox, { name: "space-36", variable: "--ds-space-36", value: "144px", size: 144 }), _jsx(SpacingBox, { name: "space-40", variable: "--ds-space-40", value: "160px", size: 160 })] })] })),
};
export const BorderRadius = {
    render: () => (_jsxs("div", { children: [_jsx("h2", { style: { marginBottom: '10px' }, children: "Border Radius" }), _jsx("p", { style: { marginBottom: '30px', color: '#666' }, children: "\uBAA8\uC11C\uB9AC \uB465\uAE00\uAE30\uB97C \uC815\uC758\uD558\uB294 \uBC18\uC9C0\uB984 \uAC12\uC785\uB2C8\uB2E4." }), _jsx("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '20px' }, children: [
                    { name: 'none', variable: '--ds-radius-none', value: '0' },
                    { name: 'sm', variable: '--ds-radius-sm', value: '2px' },
                    { name: 'base', variable: '--ds-radius-base', value: '4px' },
                    { name: 'md', variable: '--ds-radius-md', value: '6px' },
                    { name: 'lg', variable: '--ds-radius-lg', value: '8px' },
                    { name: 'xl', variable: '--ds-radius-xl', value: '12px' },
                    { name: '2xl', variable: '--ds-radius-2xl', value: '16px' },
                    { name: '3xl', variable: '--ds-radius-3xl', value: '24px' },
                    { name: 'full', variable: '--ds-radius-full', value: '9999px' },
                ].map(radius => (_jsxs("div", { style: { textAlign: 'center' }, children: [_jsx("div", { style: {
                                width: '100px',
                                height: '100px',
                                backgroundColor: 'var(--ds-gray-200)',
                                borderRadius: `var(${radius.variable})`,
                                margin: '0 auto 8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '12px',
                                fontWeight: '500',
                            }, children: radius.value }), _jsx("div", { style: { fontWeight: '500' }, children: radius.name }), _jsx("code", { style: { fontSize: '11px', color: '#666' }, children: radius.variable })] }, radius.name))) })] })),
};
export const ContainerWidths = {
    render: () => (_jsxs("div", { children: [_jsx("h2", { style: { marginBottom: '10px' }, children: "Container Widths" }), _jsx("p", { style: { marginBottom: '30px', color: '#666' }, children: "\uBC18\uC751\uD615 \uB808\uC774\uC544\uC6C3\uC744 \uC704\uD55C \uCEE8\uD14C\uC774\uB108 \uB108\uBE44 \uAC12\uC785\uB2C8\uB2E4." }), _jsx("div", { style: { display: 'flex', flexDirection: 'column', gap: '12px' }, children: [
                    { name: 'xs', variable: '--ds-container-xs', value: '320px' },
                    { name: 'sm', variable: '--ds-container-sm', value: '384px' },
                    { name: 'md', variable: '--ds-container-md', value: '448px' },
                    { name: 'lg', variable: '--ds-container-lg', value: '512px' },
                    { name: 'xl', variable: '--ds-container-xl', value: '576px' },
                    { name: '2xl', variable: '--ds-container-2xl', value: '672px' },
                    { name: '3xl', variable: '--ds-container-3xl', value: '768px' },
                    { name: '4xl', variable: '--ds-container-4xl', value: '896px' },
                    { name: '5xl', variable: '--ds-container-5xl', value: '1024px' },
                    { name: '6xl', variable: '--ds-container-6xl', value: '1152px' },
                    { name: '7xl', variable: '--ds-container-7xl', value: '1280px' },
                    { name: 'full', variable: '--ds-container-full', value: '100%' },
                ].map(container => (_jsxs("div", { style: {
                        padding: '12px',
                        backgroundColor: '#f5f5f5',
                        borderRadius: '4px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }, children: [_jsxs("div", { children: [_jsxs("span", { style: { fontWeight: '500', marginRight: '12px' }, children: ["container-", container.name] }), _jsx("code", { style: { fontSize: '12px', color: '#666' }, children: container.variable })] }), _jsx("span", { style: { fontSize: '14px', color: '#999' }, children: container.value })] }, container.name))) })] })),
};
export const ZIndex = {
    render: () => (_jsxs("div", { children: [_jsx("h2", { style: { marginBottom: '10px' }, children: "Z-Index Scale" }), _jsx("p", { style: { marginBottom: '30px', color: '#666' }, children: "\uB808\uC774\uC5B4 \uC21C\uC11C\uB97C \uAD00\uB9AC\uD558\uB294 z-index \uAC12\uC785\uB2C8\uB2E4." }), _jsxs("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', maxWidth: '600px' }, children: [_jsxs("div", { children: [_jsx("h3", { style: { fontSize: '14px', marginBottom: '12px' }, children: "Base Scale" }), _jsx("div", { style: { display: 'flex', flexDirection: 'column', gap: '8px' }, children: [
                                    { name: 'z-0', value: '0' },
                                    { name: 'z-10', value: '10' },
                                    { name: 'z-20', value: '20' },
                                    { name: 'z-30', value: '30' },
                                    { name: 'z-40', value: '40' },
                                    { name: 'z-50', value: '50' },
                                    { name: 'z-auto', value: 'auto' },
                                ].map(z => (_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', padding: '6px 12px', backgroundColor: '#f9f9f9', borderRadius: '4px' }, children: [_jsxs("code", { style: { fontSize: '12px' }, children: ["--ds-", z.name] }), _jsx("span", { style: { fontSize: '12px', color: '#666' }, children: z.value })] }, z.name))) })] }), _jsxs("div", { children: [_jsx("h3", { style: { fontSize: '14px', marginBottom: '12px' }, children: "Component Specific" }), _jsx("div", { style: { display: 'flex', flexDirection: 'column', gap: '8px' }, children: [
                                    { name: 'z-dropdown', value: '1000' },
                                    { name: 'z-sticky', value: '1020' },
                                    { name: 'z-fixed', value: '1030' },
                                    { name: 'z-modal-backdrop', value: '1040' },
                                    { name: 'z-modal', value: '1050' },
                                    { name: 'z-popover', value: '1060' },
                                    { name: 'z-tooltip', value: '1070' },
                                ].map(z => (_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', padding: '6px 12px', backgroundColor: '#f9f9f9', borderRadius: '4px' }, children: [_jsxs("code", { style: { fontSize: '12px' }, children: ["--ds-", z.name] }), _jsx("span", { style: { fontSize: '12px', color: '#666' }, children: z.value })] }, z.name))) })] })] }), _jsxs("div", { style: { marginTop: '30px', position: 'relative', height: '200px' }, children: [_jsx("h3", { style: { fontSize: '14px', marginBottom: '12px' }, children: "Z-Index Visual Example" }), _jsxs("div", { style: { position: 'relative', height: '150px' }, children: [_jsx("div", { style: {
                                    position: 'absolute',
                                    top: '20px',
                                    left: '20px',
                                    width: '120px',
                                    height: '80px',
                                    backgroundColor: '#e3f2fd',
                                    border: '2px solid #2196f3',
                                    padding: '8px',
                                    zIndex: 10,
                                }, children: "z-index: 10" }), _jsx("div", { style: {
                                    position: 'absolute',
                                    top: '40px',
                                    left: '60px',
                                    width: '120px',
                                    height: '80px',
                                    backgroundColor: '#fce4ec',
                                    border: '2px solid #e91e63',
                                    padding: '8px',
                                    zIndex: 20,
                                }, children: "z-index: 20" }), _jsx("div", { style: {
                                    position: 'absolute',
                                    top: '60px',
                                    left: '100px',
                                    width: '120px',
                                    height: '80px',
                                    backgroundColor: '#e8f5e9',
                                    border: '2px solid #4caf50',
                                    padding: '8px',
                                    zIndex: 30,
                                }, children: "z-index: 30" })] })] })] })),
};
export const SpacingExamples = {
    render: () => (_jsxs("div", { children: [_jsx("h2", { style: { marginBottom: '10px' }, children: "Spacing Usage Examples" }), _jsx("p", { style: { marginBottom: '30px', color: '#666' }, children: "\uC2E4\uC81C \uCEF4\uD3EC\uB10C\uD2B8\uC5D0\uC11C \uAC04\uACA9\uC774 \uC5B4\uB5BB\uAC8C \uC0AC\uC6A9\uB418\uB294\uC9C0 \uBCF4\uC5EC\uC8FC\uB294 \uC608\uC2DC\uC785\uB2C8\uB2E4." }), _jsxs("div", { style: { display: 'grid', gap: '30px' }, children: [_jsxs("div", { children: [_jsx("h3", { style: { fontSize: '16px', marginBottom: '15px' }, children: "Card Padding" }), _jsxs("div", { style: { display: 'flex', gap: '16px', flexWrap: 'wrap' }, children: [_jsxs("div", { style: {
                                            padding: 'var(--ds-space-3)',
                                            backgroundColor: '#f5f5f5',
                                            borderRadius: 'var(--ds-radius-md)',
                                            width: '150px',
                                        }, children: [_jsx("div", { style: { fontSize: '12px', marginBottom: '4px' }, children: "Small Card" }), _jsx("code", { style: { fontSize: '10px', color: '#666' }, children: "padding: space-3 (12px)" })] }), _jsxs("div", { style: {
                                            padding: 'var(--ds-space-4)',
                                            backgroundColor: '#f5f5f5',
                                            borderRadius: 'var(--ds-radius-md)',
                                            width: '150px',
                                        }, children: [_jsx("div", { style: { fontSize: '12px', marginBottom: '4px' }, children: "Default Card" }), _jsx("code", { style: { fontSize: '10px', color: '#666' }, children: "padding: space-4 (16px)" })] }), _jsxs("div", { style: {
                                            padding: 'var(--ds-space-6)',
                                            backgroundColor: '#f5f5f5',
                                            borderRadius: 'var(--ds-radius-md)',
                                            width: '150px',
                                        }, children: [_jsx("div", { style: { fontSize: '12px', marginBottom: '4px' }, children: "Large Card" }), _jsx("code", { style: { fontSize: '10px', color: '#666' }, children: "padding: space-6 (24px)" })] })] })] }), _jsxs("div", { children: [_jsx("h3", { style: { fontSize: '16px', marginBottom: '15px' }, children: "Component Gap" }), _jsxs("div", { children: [_jsxs("div", { style: { display: 'flex', gap: 'var(--ds-space-2)', marginBottom: '12px' }, children: [_jsx("div", { style: { padding: '8px 16px', backgroundColor: '#e3f2fd', borderRadius: '4px' }, children: "Item 1" }), _jsx("div", { style: { padding: '8px 16px', backgroundColor: '#e3f2fd', borderRadius: '4px' }, children: "Item 2" }), _jsx("div", { style: { padding: '8px 16px', backgroundColor: '#e3f2fd', borderRadius: '4px' }, children: "Item 3" })] }), _jsx("code", { style: { fontSize: '12px', color: '#666' }, children: "gap: space-2 (8px)" })] }), _jsxs("div", { style: { marginTop: '20px' }, children: [_jsxs("div", { style: { display: 'flex', gap: 'var(--ds-space-4)', marginBottom: '12px' }, children: [_jsx("div", { style: { padding: '8px 16px', backgroundColor: '#fce4ec', borderRadius: '4px' }, children: "Item 1" }), _jsx("div", { style: { padding: '8px 16px', backgroundColor: '#fce4ec', borderRadius: '4px' }, children: "Item 2" }), _jsx("div", { style: { padding: '8px 16px', backgroundColor: '#fce4ec', borderRadius: '4px' }, children: "Item 3" })] }), _jsx("code", { style: { fontSize: '12px', color: '#666' }, children: "gap: space-4 (16px)" })] })] }), _jsxs("div", { children: [_jsx("h3", { style: { fontSize: '16px', marginBottom: '15px' }, children: "Section Spacing" }), _jsxs("div", { style: { backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px' }, children: [_jsxs("div", { style: { marginBottom: 'var(--ds-space-8)' }, children: [_jsx("h4", { style: { marginBottom: 'var(--ds-space-2)' }, children: "Section Title" }), _jsx("p", { style: { color: '#666' }, children: "Section content with proper spacing between elements." })] }), _jsxs("div", { style: { marginBottom: 'var(--ds-space-8)' }, children: [_jsx("h4", { style: { marginBottom: 'var(--ds-space-2)' }, children: "Another Section" }), _jsx("p", { style: { color: '#666' }, children: "Using consistent spacing creates visual hierarchy." })] }), _jsx("div", { children: _jsx("code", { style: { fontSize: '11px', color: '#666' }, children: "margin-bottom: space-8 (32px) for sections, space-2 (8px) for titles" }) })] })] })] })] })),
};
//# sourceMappingURL=Spacing.stories.js.map