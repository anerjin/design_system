import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Icon } from '../react/Icon';
const meta = {
    title: 'Elements/Colors',
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: `
# Colors

BRICKS 디자인 시스템의 색상 체계는 일관성과 접근성을 고려하여 설계되었습니다.

## 색상 시스템

### Core Palette
기본 브랜드 색상과 베이스 색상입니다.

### Gray Scale
13단계의 중립 색상으로 텍스트, 배경, 테두리에 사용됩니다.

### Semantic Colors
상태와 의미를 전달하는 색상입니다.

### Alpha Colors
투명도가 적용된 색상으로 오버레이나 배경에 사용됩니다.

## 사용 방법

CSS 변수로 정의되어 있어 쉽게 사용할 수 있습니다:

\`\`\`css
.element {
  color: var(--ds-gray-900);
  background-color: var(--ds-gray-50);
  border-color: var(--ds-gray-300);
}
\`\`\`

색상 칩을 클릭하면 변수명이 클립보드에 복사됩니다.
        `,
            },
        },
    },
    tags: ['autodocs'],
};
export default meta;
const ColorSwatch = ({ name, variable, value, textColor = 'white' }) => {
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    };
    return (_jsxs("div", { style: { textAlign: 'center' }, children: [_jsxs("div", { style: {
                    width: '120px',
                    height: '120px',
                    backgroundColor: `var(${variable})`,
                    borderRadius: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: textColor,
                    fontSize: '12px',
                    border: '1px solid rgba(0,0,0,0.1)',
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                }, onClick: () => copyToClipboard(variable), onMouseEnter: (e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                }, onMouseLeave: (e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                }, children: [_jsx("div", { style: { fontWeight: '600', marginBottom: '4px' }, children: value }), _jsx(Icon, { name: "copy", size: 16 })] }), _jsxs("div", { style: { marginTop: '8px' }, children: [_jsx("div", { style: { fontWeight: '500', fontSize: '14px' }, children: name }), _jsx("code", { style: { fontSize: '11px', color: '#666' }, children: variable })] })] }));
};
export const CorePalette = {
    render: () => (_jsxs("div", { children: [_jsx("h2", { style: { marginBottom: '10px' }, children: "Core Palette" }), _jsx("p", { style: { marginBottom: '30px', color: '#666' }, children: "\uD575\uC2EC \uBE0C\uB79C\uB4DC \uCEEC\uB7EC\uC640 \uBCA0\uC774\uC2A4 \uCEEC\uB7EC\uC785\uB2C8\uB2E4." }), _jsxs("div", { style: { display: 'flex', gap: '30px', flexWrap: 'wrap' }, children: [_jsx(ColorSwatch, { name: "Prime", variable: "--ds-prime", value: "#000000" }), _jsx(ColorSwatch, { name: "Black", variable: "--ds-black", value: "#000000" }), _jsx(ColorSwatch, { name: "White", variable: "--ds-white", value: "#FFFFFF", textColor: "#000" })] })] })),
};
export const GrayScale = {
    render: () => (_jsxs("div", { children: [_jsx("h2", { style: { marginBottom: '10px' }, children: "Gray Scale" }), _jsx("p", { style: { marginBottom: '30px', color: '#666' }, children: "\uB808\uC774\uC5B4, \uD14D\uC2A4\uD2B8 \uACC4\uCE35, \uBCF4\uB354\uC5D0 \uD65C\uC6A9\uD558\uB294 13\uB2E8\uACC4 \uC911\uB9BD \uD314\uB808\uD2B8\uC785\uB2C8\uB2E4." }), _jsxs("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '30px' }, children: [_jsx(ColorSwatch, { name: "Gray 0", variable: "--ds-gray-0", value: "#FFFFFF", textColor: "#000" }), _jsx(ColorSwatch, { name: "Gray 50", variable: "--ds-gray-50", value: "#FAFAFA", textColor: "#000" }), _jsx(ColorSwatch, { name: "Gray 100", variable: "--ds-gray-100", value: "#F5F5F5", textColor: "#000" }), _jsx(ColorSwatch, { name: "Gray 200", variable: "--ds-gray-200", value: "#E8E8E8", textColor: "#000" }), _jsx(ColorSwatch, { name: "Gray 300", variable: "--ds-gray-300", value: "#D4D4D4", textColor: "#000" }), _jsx(ColorSwatch, { name: "Gray 400", variable: "--ds-gray-400", value: "#A1A1A1", textColor: "#000" }), _jsx(ColorSwatch, { name: "Gray 500", variable: "--ds-gray-500", value: "#787878" }), _jsx(ColorSwatch, { name: "Gray 600", variable: "--ds-gray-600", value: "#525252" }), _jsx(ColorSwatch, { name: "Gray 700", variable: "--ds-gray-700", value: "#393939" }), _jsx(ColorSwatch, { name: "Gray 800", variable: "--ds-gray-800", value: "#262626" }), _jsx(ColorSwatch, { name: "Gray 900", variable: "--ds-gray-900", value: "#171717" }), _jsx(ColorSwatch, { name: "Gray 950", variable: "--ds-gray-950", value: "#0A0A0A" }), _jsx(ColorSwatch, { name: "Gray 1000", variable: "--ds-gray-1000", value: "#000000" })] })] })),
};
export const SemanticColors = {
    render: () => (_jsxs("div", { children: [_jsx("h2", { style: { marginBottom: '10px' }, children: "Semantic UI Colors" }), _jsx("p", { style: { marginBottom: '30px', color: '#666' }, children: "\uC0C1\uD0DC\uC640 \uC758\uBBF8\uB97C \uC804\uB2EC\uD558\uB294 \uC2DC\uB9E8\uD2F1 \uCEEC\uB7EC\uC785\uB2C8\uB2E4." }), _jsx("h3", { style: { marginBottom: '20px', fontSize: '16px' }, children: "Status Colors" }), _jsxs("div", { style: { display: 'flex', gap: '30px', flexWrap: 'wrap', marginBottom: '40px' }, children: [_jsx(ColorSwatch, { name: "Success", variable: "--ds-color-success", value: "#64a644" }), _jsx(ColorSwatch, { name: "Warning", variable: "--ds-color-warning", value: "#fc6e51" }), _jsx(ColorSwatch, { name: "Danger", variable: "--ds-color-danger", value: "#ed5565" }), _jsx(ColorSwatch, { name: "Info", variable: "--ds-color-info", value: "#1cb6ed" })] }), _jsx("h3", { style: { marginBottom: '20px', fontSize: '16px' }, children: "Extended Palette" }), _jsxs("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '30px' }, children: [_jsx(ColorSwatch, { name: "Pink", variable: "--ds-color-pink", value: "#ec87c0" }), _jsx(ColorSwatch, { name: "Purple", variable: "--ds-color-purple", value: "#ac92ec" }), _jsx(ColorSwatch, { name: "Yellow", variable: "--ds-color-yellow", value: "#ffce54", textColor: "#000" }), _jsx(ColorSwatch, { name: "Green", variable: "--ds-color-green", value: "#a0d468", textColor: "#000" }), _jsx(ColorSwatch, { name: "Mint", variable: "--ds-color-mint", value: "#48cfad" }), _jsx(ColorSwatch, { name: "Light Blue", variable: "--ds-color-lightblue", value: "#4fc1e9" }), _jsx(ColorSwatch, { name: "Blue", variable: "--ds-color-blue", value: "#5d9cec" }), _jsx(ColorSwatch, { name: "Dark", variable: "--ds-color-dark", value: "#434a54" }), _jsx(ColorSwatch, { name: "Light", variable: "--ds-color-light", value: "#aab2bd", textColor: "#000" })] })] })),
};
export const AlphaColors = {
    render: () => (_jsxs("div", { children: [_jsx("h2", { style: { marginBottom: '10px' }, children: "Alpha Transparency Colors" }), _jsx("p", { style: { marginBottom: '30px', color: '#666' }, children: "\uD22C\uBA85\uB3C4\uAC00 \uC801\uC6A9\uB41C \uCEEC\uB7EC\uC785\uB2C8\uB2E4. \uC624\uBC84\uB808\uC774\uB098 \uBC30\uACBD\uC5D0 \uD65C\uC6A9\uD569\uB2C8\uB2E4." }), _jsxs("div", { style: { display: 'flex', gap: '40px', flexWrap: 'wrap' }, children: [_jsxs("div", { children: [_jsx("h3", { style: { marginBottom: '20px', fontSize: '16px' }, children: "White Alpha" }), _jsx("div", { style: { display: 'flex', gap: '10px', flexWrap: 'wrap' }, children: [10, 20, 30, 50, 80, 90].map(alpha => (_jsxs("div", { style: { textAlign: 'center' }, children: [_jsx("div", { style: {
                                                width: '80px',
                                                height: '80px',
                                                backgroundColor: '#333',
                                                borderRadius: '8px',
                                                position: 'relative',
                                                overflow: 'hidden',
                                            }, children: _jsx("div", { style: {
                                                    width: '100%',
                                                    height: '100%',
                                                    backgroundColor: `var(--ds-white-alpha-${alpha})`,
                                                } }) }), _jsxs("div", { style: { marginTop: '8px', fontSize: '12px' }, children: [alpha, "%"] })] }, alpha))) })] }), _jsxs("div", { children: [_jsx("h3", { style: { marginBottom: '20px', fontSize: '16px' }, children: "Black Alpha" }), _jsx("div", { style: { display: 'flex', gap: '10px', flexWrap: 'wrap' }, children: [10, 20, 30, 50, 80, 90].map(alpha => (_jsxs("div", { style: { textAlign: 'center' }, children: [_jsx("div", { style: {
                                                width: '80px',
                                                height: '80px',
                                                backgroundColor: '#f5f5f5',
                                                borderRadius: '8px',
                                                position: 'relative',
                                                overflow: 'hidden',
                                            }, children: _jsx("div", { style: {
                                                    width: '100%',
                                                    height: '100%',
                                                    backgroundColor: `var(--ds-black-alpha-${alpha})`,
                                                } }) }), _jsxs("div", { style: { marginTop: '8px', fontSize: '12px' }, children: [alpha, "%"] })] }, alpha))) })] })] })] })),
};
export const ColorUsageExamples = {
    render: () => (_jsxs("div", { children: [_jsx("h2", { style: { marginBottom: '10px' }, children: "Color Usage Examples" }), _jsx("p", { style: { marginBottom: '30px', color: '#666' }, children: "\uC2E4\uC81C \uCEF4\uD3EC\uB10C\uD2B8\uC5D0\uC11C \uC0C9\uC0C1\uC774 \uC5B4\uB5BB\uAC8C \uC0AC\uC6A9\uB418\uB294\uC9C0 \uBCF4\uC5EC\uC8FC\uB294 \uC608\uC2DC\uC785\uB2C8\uB2E4." }), _jsxs("div", { style: { display: 'grid', gap: '30px' }, children: [_jsxs("div", { children: [_jsx("h3", { style: { fontSize: '16px', marginBottom: '15px' }, children: "Status Messages" }), _jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '10px' }, children: [_jsxs("div", { style: {
                                            padding: '12px 16px',
                                            backgroundColor: 'rgba(100, 166, 68, 0.1)',
                                            borderLeft: '4px solid var(--ds-color-success)',
                                            borderRadius: '4px',
                                            color: 'var(--ds-color-success)',
                                        }, children: [_jsx(Icon, { name: "check-circle", size: 16, style: { marginRight: '8px' } }), "Success message using --ds-color-success"] }), _jsxs("div", { style: {
                                            padding: '12px 16px',
                                            backgroundColor: 'rgba(252, 110, 81, 0.1)',
                                            borderLeft: '4px solid var(--ds-color-warning)',
                                            borderRadius: '4px',
                                            color: 'var(--ds-color-warning)',
                                        }, children: [_jsx(Icon, { name: "error", size: 16, style: { marginRight: '8px' } }), "Warning message using --ds-color-warning"] }), _jsxs("div", { style: {
                                            padding: '12px 16px',
                                            backgroundColor: 'rgba(237, 85, 101, 0.1)',
                                            borderLeft: '4px solid var(--ds-color-danger)',
                                            borderRadius: '4px',
                                            color: 'var(--ds-color-danger)',
                                        }, children: [_jsx(Icon, { name: "x-circle", size: 16, style: { marginRight: '8px' } }), "Danger message using --ds-color-danger"] }), _jsxs("div", { style: {
                                            padding: '12px 16px',
                                            backgroundColor: 'rgba(28, 182, 237, 0.1)',
                                            borderLeft: '4px solid var(--ds-color-info)',
                                            borderRadius: '4px',
                                            color: 'var(--ds-color-info)',
                                        }, children: [_jsx(Icon, { name: "info-circle", size: 16, style: { marginRight: '8px' } }), "Info message using --ds-color-info"] })] })] }), _jsxs("div", { children: [_jsx("h3", { style: { fontSize: '16px', marginBottom: '15px' }, children: "Text Hierarchy" }), _jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '8px' }, children: [_jsx("div", { style: { color: 'var(--ds-gray-900)' }, children: "Primary Text (--ds-gray-900)" }), _jsx("div", { style: { color: 'var(--ds-gray-700)' }, children: "Secondary Text (--ds-gray-700)" }), _jsx("div", { style: { color: 'var(--ds-gray-600)' }, children: "Tertiary Text (--ds-gray-600)" }), _jsx("div", { style: { color: 'var(--ds-gray-500)' }, children: "Placeholder Text (--ds-gray-500)" }), _jsx("div", { style: { color: 'var(--ds-gray-400)' }, children: "Disabled Text (--ds-gray-400)" })] })] }), _jsxs("div", { children: [_jsx("h3", { style: { fontSize: '16px', marginBottom: '15px' }, children: "Backgrounds" }), _jsxs("div", { style: { display: 'flex', gap: '10px', flexWrap: 'wrap' }, children: [_jsxs("div", { style: {
                                            padding: '20px',
                                            backgroundColor: 'var(--ds-gray-50)',
                                            borderRadius: '8px',
                                            border: '1px solid var(--ds-gray-200)',
                                        }, children: ["Light Background", _jsx("br", {}), _jsx("code", { style: { fontSize: '11px' }, children: "--ds-gray-50" })] }), _jsxs("div", { style: {
                                            padding: '20px',
                                            backgroundColor: 'var(--ds-gray-100)',
                                            borderRadius: '8px',
                                            border: '1px solid var(--ds-gray-200)',
                                        }, children: ["Card Background", _jsx("br", {}), _jsx("code", { style: { fontSize: '11px' }, children: "--ds-gray-100" })] }), _jsxs("div", { style: {
                                            padding: '20px',
                                            backgroundColor: 'var(--ds-gray-800)',
                                            color: 'white',
                                            borderRadius: '8px',
                                        }, children: ["Dark Background", _jsx("br", {}), _jsx("code", { style: { fontSize: '11px' }, children: "--ds-gray-800" })] })] })] })] })] })),
};
//# sourceMappingURL=Colors.stories.js.map