import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const meta = {
    title: 'Foundation/Shadows',
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: `
# Shadows

BRICKS 디자인 시스템의 그림자 효과는 깊이감과 계층 구조를 표현합니다.

## 그림자 시스템

### Box Shadows
기본적인 그림자 효과로 요소에 깊이감을 더합니다.
- xs부터 2xl까지 7단계 제공
- 호버, 포커스 등 인터랙션에 활용

### Inner Shadows
요소 내부로 들어간 그림자 효과입니다.
- 입력 필드나 눌린 버튼 상태 표현
- 4단계의 깊이 제공

### Elevation Levels
Material Design에서 영감을 받은 일관된 높이 시스템입니다.
- 0부터 5까지 6단계
- 모달, 드롭다운 등 떠있는 요소에 사용

### Focus Shadows
접근성을 위한 포커스 상태 표시입니다.
- 키보드 네비게이션 지원
- 명확한 시각적 피드백

### Text Shadows
텍스트에 적용되는 그림자 효과입니다.
- 가독성 향상
- 시각적 강조

## 사용 방법

CSS 변수로 정의되어 있어 쉽게 사용할 수 있습니다:

\`\`\`css
.element {
  box-shadow: var(--ds-shadow-md);
}

.element:hover {
  box-shadow: var(--ds-shadow-lg);
}

.element:focus {
  box-shadow: var(--ds-shadow-focus);
}
\`\`\`

각 그림자 박스를 클릭하면 변수명이 클립보드에 복사됩니다.
        `,
            },
        },
    },
    tags: ['autodocs'],
};
export default meta;
const ShadowBox = ({ name, variable, description }) => {
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    };
    return (_jsxs("div", { style: { textAlign: 'center' }, children: [_jsx("div", { style: {
                    width: '150px',
                    height: '100px',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: `var(${variable})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    marginBottom: '12px',
                }, onClick: () => copyToClipboard(variable), onMouseEnter: (e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                }, onMouseLeave: (e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                }, children: _jsx("span", { style: { fontSize: '14px', fontWeight: '500' }, children: name }) }), _jsxs("div", { children: [_jsx("code", { style: { fontSize: '11px', color: '#666' }, children: variable }), description && _jsx("p", { style: { fontSize: '11px', color: '#999', marginTop: '4px' }, children: description })] })] }));
};
export const BoxShadows = {
    render: () => (_jsxs("div", { children: [_jsx("h2", { style: { marginBottom: '10px' }, children: "Box Shadows" }), _jsx("p", { style: { marginBottom: '30px', color: '#666' }, children: "\uC694\uC18C\uC5D0 \uAE4A\uC774\uAC10\uC744 \uC8FC\uB294 \uADF8\uB9BC\uC790 \uD6A8\uACFC\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uC5EC \uBCC0\uC218\uBA85\uC744 \uBCF5\uC0AC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4." }), _jsxs("div", { style: {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                    gap: '30px',
                    backgroundColor: '#f5f5f5',
                    padding: '30px',
                    borderRadius: '12px',
                }, children: [_jsx(ShadowBox, { name: "none", variable: "--ds-shadow-none", description: "No shadow" }), _jsx(ShadowBox, { name: "xs", variable: "--ds-shadow-xs", description: "Extra small" }), _jsx(ShadowBox, { name: "sm", variable: "--ds-shadow-sm", description: "Small" }), _jsx(ShadowBox, { name: "md", variable: "--ds-shadow-md", description: "Medium" }), _jsx(ShadowBox, { name: "lg", variable: "--ds-shadow-lg", description: "Large" }), _jsx(ShadowBox, { name: "xl", variable: "--ds-shadow-xl", description: "Extra large" }), _jsx(ShadowBox, { name: "2xl", variable: "--ds-shadow-2xl", description: "2X large" })] })] })),
};
export const InnerShadows = {
    render: () => (_jsxs("div", { children: [_jsx("h2", { style: { marginBottom: '10px' }, children: "Inner Shadows" }), _jsx("p", { style: { marginBottom: '30px', color: '#666' }, children: "\uC694\uC18C \uB0B4\uBD80\uB85C \uB4E4\uC5B4\uAC04 \uADF8\uB9BC\uC790 \uD6A8\uACFC\uC785\uB2C8\uB2E4. \uC785\uB825 \uD544\uB4DC\uB098 \uB20C\uB9B0 \uBC84\uD2BC\uC5D0 \uC0AC\uC6A9\uB429\uB2C8\uB2E4." }), _jsx("div", { style: { display: 'flex', gap: '30px', flexWrap: 'wrap' }, children: [
                    { name: 'inner-xs', variable: '--ds-shadow-inner-xs' },
                    { name: 'inner-sm', variable: '--ds-shadow-inner-sm' },
                    { name: 'inner-md', variable: '--ds-shadow-inner-md' },
                    { name: 'inner-lg', variable: '--ds-shadow-inner-lg' },
                ].map(shadow => (_jsxs("div", { style: { textAlign: 'center' }, children: [_jsx("div", { style: {
                                width: '150px',
                                height: '100px',
                                backgroundColor: '#f5f5f5',
                                borderRadius: '8px',
                                boxShadow: `var(${shadow.variable})`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '12px',
                            }, children: _jsx("span", { style: { fontSize: '14px', fontWeight: '500', color: '#666' }, children: shadow.name }) }), _jsx("code", { style: { fontSize: '11px', color: '#666' }, children: shadow.variable })] }, shadow.name))) })] })),
};
export const ElevationLevels = {
    render: () => (_jsxs("div", { children: [_jsx("h2", { style: { marginBottom: '10px' }, children: "Elevation Levels" }), _jsx("p", { style: { marginBottom: '30px', color: '#666' }, children: "\uC77C\uAD00\uB41C \uB192\uC774 \uC2DC\uC2A4\uD15C\uC744 \uC704\uD55C \uBCF5\uD569 \uADF8\uB9BC\uC790\uC785\uB2C8\uB2E4. Material Design\uC5D0\uC11C \uC601\uAC10\uC744 \uBC1B\uC558\uC2B5\uB2C8\uB2E4." }), _jsx("div", { style: {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                    gap: '30px',
                    backgroundColor: '#f9f9f9',
                    padding: '30px',
                    borderRadius: '12px',
                }, children: [0, 1, 2, 3, 4, 5].map(level => (_jsxs("div", { style: { textAlign: 'center' }, children: [_jsx("div", { style: {
                                width: '150px',
                                height: '100px',
                                backgroundColor: 'white',
                                borderRadius: '8px',
                                boxShadow: `var(--ds-shadow-elevation-${level})`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '12px',
                            }, children: _jsxs("span", { style: { fontSize: '14px', fontWeight: '500' }, children: ["Level ", level] }) }), _jsxs("code", { style: { fontSize: '11px', color: '#666' }, children: ["--ds-shadow-elevation-", level] })] }, level))) })] })),
};
export const FocusShadows = {
    render: () => (_jsxs("div", { children: [_jsx("h2", { style: { marginBottom: '10px' }, children: "Focus Shadows" }), _jsx("p", { style: { marginBottom: '30px', color: '#666' }, children: "\uD3EC\uCEE4\uC2A4 \uC0C1\uD0DC\uB97C \uB098\uD0C0\uB0B4\uB294 \uADF8\uB9BC\uC790\uC785\uB2C8\uB2E4. \uC811\uADFC\uC131\uC744 \uC704\uD574 \uC0AC\uC6A9\uB429\uB2C8\uB2E4." }), _jsxs("div", { style: { display: 'flex', gap: '30px', flexWrap: 'wrap' }, children: [_jsxs("div", { style: { textAlign: 'center' }, children: [_jsx("button", { style: {
                                    width: '150px',
                                    height: '50px',
                                    backgroundColor: 'white',
                                    border: '1px solid #e0e0e0',
                                    borderRadius: '8px',
                                    boxShadow: 'var(--ds-shadow-focus)',
                                    cursor: 'pointer',
                                    marginBottom: '12px',
                                }, children: "Focus" }), _jsx("code", { style: { fontSize: '11px', color: '#666', display: 'block' }, children: "--ds-shadow-focus" })] }), _jsxs("div", { style: { textAlign: 'center' }, children: [_jsx("button", { style: {
                                    width: '150px',
                                    height: '50px',
                                    backgroundColor: 'white',
                                    border: '1px solid #e0e0e0',
                                    borderRadius: '8px',
                                    boxShadow: 'var(--ds-shadow-focus-strong)',
                                    cursor: 'pointer',
                                    marginBottom: '12px',
                                }, children: "Focus Strong" }), _jsx("code", { style: { fontSize: '11px', color: '#666', display: 'block' }, children: "--ds-shadow-focus-strong" })] }), _jsxs("div", { style: { textAlign: 'center' }, children: [_jsx("button", { style: {
                                    width: '150px',
                                    height: '50px',
                                    backgroundColor: '#333',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    boxShadow: 'var(--ds-shadow-focus-invert)',
                                    cursor: 'pointer',
                                    marginBottom: '12px',
                                }, children: "Focus Invert" }), _jsx("code", { style: { fontSize: '11px', color: '#666', display: 'block' }, children: "--ds-shadow-focus-invert" })] })] })] })),
};
export const TextShadows = {
    render: () => (_jsxs("div", { children: [_jsx("h2", { style: { marginBottom: '10px' }, children: "Text Shadows" }), _jsx("p", { style: { marginBottom: '30px', color: '#666' }, children: "\uD14D\uC2A4\uD2B8\uC5D0 \uC801\uC6A9\uB418\uB294 \uADF8\uB9BC\uC790 \uD6A8\uACFC\uC785\uB2C8\uB2E4." }), _jsx("div", { style: { display: 'flex', flexDirection: 'column', gap: '24px' }, children: [
                    { name: 'Extra Small', variable: '--ds-text-shadow-xs' },
                    { name: 'Small', variable: '--ds-text-shadow-sm' },
                    { name: 'Medium', variable: '--ds-text-shadow-md' },
                    { name: 'Large', variable: '--ds-text-shadow-lg' },
                ].map(shadow => (_jsxs("div", { children: [_jsxs("h3", { style: {
                                fontSize: '24px',
                                fontWeight: '600',
                                textShadow: `var(${shadow.variable})`,
                                marginBottom: '8px',
                            }, children: [shadow.name, " Text Shadow"] }), _jsx("code", { style: { fontSize: '11px', color: '#666' }, children: shadow.variable })] }, shadow.name))) })] })),
};
export const UsageExamples = {
    render: () => (_jsxs("div", { children: [_jsx("h2", { style: { marginBottom: '10px' }, children: "Shadow Usage Examples" }), _jsx("p", { style: { marginBottom: '30px', color: '#666' }, children: "\uC2E4\uC81C \uCEF4\uD3EC\uB10C\uD2B8\uC5D0\uC11C \uADF8\uB9BC\uC790\uAC00 \uC5B4\uB5BB\uAC8C \uC0AC\uC6A9\uB418\uB294\uC9C0 \uBCF4\uC5EC\uC8FC\uB294 \uC608\uC2DC\uC785\uB2C8\uB2E4." }), _jsxs("div", { style: { display: 'grid', gap: '30px' }, children: [_jsxs("div", { children: [_jsx("h3", { style: { fontSize: '16px', marginBottom: '15px' }, children: "Card Elevations" }), _jsxs("div", { style: { display: 'flex', gap: '20px', flexWrap: 'wrap' }, children: [_jsxs("div", { style: {
                                            padding: '20px',
                                            backgroundColor: 'white',
                                            borderRadius: '8px',
                                            boxShadow: 'var(--ds-shadow-sm)',
                                            width: '200px',
                                        }, children: [_jsx("h4", { style: { marginBottom: '8px' }, children: "Default Card" }), _jsx("p", { style: { fontSize: '12px', color: '#666' }, children: "Using shadow-sm for subtle depth" })] }), _jsxs("div", { style: {
                                            padding: '20px',
                                            backgroundColor: 'white',
                                            borderRadius: '8px',
                                            boxShadow: 'var(--ds-shadow-md)',
                                            width: '200px',
                                        }, children: [_jsx("h4", { style: { marginBottom: '8px' }, children: "Hover Card" }), _jsx("p", { style: { fontSize: '12px', color: '#666' }, children: "Using shadow-md on hover" })] }), _jsxs("div", { style: {
                                            padding: '20px',
                                            backgroundColor: 'white',
                                            borderRadius: '8px',
                                            boxShadow: 'var(--ds-shadow-lg)',
                                            width: '200px',
                                        }, children: [_jsx("h4", { style: { marginBottom: '8px' }, children: "Active Card" }), _jsx("p", { style: { fontSize: '12px', color: '#666' }, children: "Using shadow-lg for emphasis" })] })] })] }), _jsxs("div", { children: [_jsx("h3", { style: { fontSize: '16px', marginBottom: '15px' }, children: "Interactive Elements" }), _jsxs("div", { style: { display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }, children: [_jsx("button", { style: {
                                            padding: '10px 20px',
                                            backgroundColor: 'white',
                                            border: '1px solid #e0e0e0',
                                            borderRadius: '6px',
                                            boxShadow: 'var(--ds-shadow-xs)',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s',
                                        }, onMouseEnter: (e) => {
                                            e.currentTarget.style.boxShadow = 'var(--ds-shadow-md)';
                                        }, onMouseLeave: (e) => {
                                            e.currentTarget.style.boxShadow = 'var(--ds-shadow-xs)';
                                        }, children: "Hover me" }), _jsx("input", { type: "text", placeholder: "Focus input", style: {
                                            padding: '10px',
                                            border: '1px solid #e0e0e0',
                                            borderRadius: '6px',
                                            outline: 'none',
                                            transition: 'all 0.2s',
                                        }, onFocus: (e) => {
                                            e.currentTarget.style.boxShadow = 'var(--ds-shadow-focus)';
                                        }, onBlur: (e) => {
                                            e.currentTarget.style.boxShadow = 'none';
                                        } }), _jsx("div", { style: {
                                            padding: '10px 20px',
                                            backgroundColor: '#f5f5f5',
                                            borderRadius: '6px',
                                            boxShadow: 'var(--ds-shadow-inner-sm)',
                                        }, children: "Pressed State" })] })] }), _jsxs("div", { children: [_jsx("h3", { style: { fontSize: '16px', marginBottom: '15px' }, children: "Modal/Dropdown" }), _jsx("div", { style: {
                                    position: 'relative',
                                    height: '200px',
                                    backgroundColor: '#f9f9f9',
                                    borderRadius: '8px',
                                    padding: '20px',
                                }, children: _jsxs("div", { style: {
                                        position: 'absolute',
                                        top: '20px',
                                        left: '20px',
                                        right: '20px',
                                        padding: '20px',
                                        backgroundColor: 'white',
                                        borderRadius: '8px',
                                        boxShadow: 'var(--ds-shadow-elevation-4)',
                                    }, children: [_jsx("h4", { style: { marginBottom: '8px' }, children: "Modal Dialog" }), _jsx("p", { style: { fontSize: '12px', color: '#666' }, children: "Using elevation-4 for modal overlays" })] }) })] })] })] })),
};
//# sourceMappingURL=Shadows.stories.js.map