import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const meta = {
    title: 'Elements/Borders',
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: `
# Borders

BRICKS 디자인 시스템의 테두리 체계는 일관된 UI를 위한 다양한 옵션을 제공합니다.

## 테두리 시스템

### Border Width
0px부터 8px까지 5단계의 테두리 두께를 제공합니다.

### Border Radius
컴포넌트별로 최적화된 모서리 둥글기 옵션입니다.
- **Small (2px)**: 체크박스, 라디오 버튼
- **Base (4px)**: 작은 버튼, 태그
- **Large (8px)**: 기본 버튼, 입력 필드
- **Extra Large (12px)**: 카드, 패널
- **Full (9999px)**: 아바타, 아이콘 버튼

### Border Styles
solid, dashed, dotted, double 등 다양한 스타일을 지원합니다.

### Border Colors
Gray Scale 기반의 테두리 색상 시스템입니다.

## 사용 방법

CSS 변수를 통해 일관된 테두리를 적용할 수 있습니다:

\`\`\`css
.card {
  border: var(--ds-border-width-1) solid var(--ds-color-border);
  border-radius: var(--ds-border-radius-lg);
}
\`\`\`

모든 예제는 클릭하여 변수명을 복사할 수 있습니다.
        `,
            },
        },
    },
    tags: ['autodocs'],
};
export default meta;
const BorderBox = ({ name, variable, value, className = '' }) => {
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    };
    return (_jsxs("div", { style: { textAlign: 'center' }, children: [_jsx("div", { className: className, style: {
                    width: '120px',
                    height: '80px',
                    backgroundColor: className.includes('white') ? '#262626' : 'white',
                    borderRadius: '6px',
                    marginBottom: '12px',
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                }, onClick: () => copyToClipboard(variable), onMouseEnter: (e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                }, onMouseLeave: (e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                } }), _jsxs("div", { children: [_jsx("div", { style: { fontWeight: '500', fontSize: '14px' }, children: name }), _jsx("code", { style: { fontSize: '11px', color: '#666' }, children: variable }), _jsx("div", { style: { fontSize: '11px', color: '#999', marginTop: '4px' }, children: value })] })] }));
};
export const BorderWidth = {
    render: () => (_jsxs("div", { children: [_jsx("h2", { style: { marginBottom: '10px' }, children: "Border Width" }), _jsx("p", { style: { marginBottom: '30px', color: '#666' }, children: "\uC77C\uAD00\uB41C \uD14C\uB450\uB9AC \uB450\uAED8\uB97C \uC704\uD55C 5\uB2E8\uACC4 \uC2DC\uC2A4\uD15C\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uC5EC \uBCC0\uC218\uBA85\uC744 \uBCF5\uC0AC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4." }), _jsxs("div", { style: { display: 'flex', gap: '30px', flexWrap: 'wrap' }, children: [_jsx(BorderBox, { name: "None", variable: "--ds-border-width-0", value: "0px", className: "", style: {
                            border: '0px solid #d4d4d4',
                            backgroundColor: '#fafafa',
                        } }), _jsx(BorderBox, { name: "Default", variable: "--ds-border-width-1", value: "1px", style: {
                            border: '1px solid #d4d4d4',
                        } }), _jsx(BorderBox, { name: "Medium", variable: "--ds-border-width-2", value: "2px", style: {
                            border: '2px solid #d4d4d4',
                        } }), _jsx(BorderBox, { name: "Thick", variable: "--ds-border-width-4", value: "4px", style: {
                            border: '4px solid #d4d4d4',
                        } }), _jsx(BorderBox, { name: "Extra Thick", variable: "--ds-border-width-8", value: "8px", style: {
                            border: '8px solid #d4d4d4',
                        } })] })] })),
};
export const BorderRadius = {
    render: () => (_jsxs("div", { children: [_jsx("h2", { style: { marginBottom: '10px' }, children: "Border Radius" }), _jsx("p", { style: { marginBottom: '30px', color: '#666' }, children: "\uCEF4\uD3EC\uB10C\uD2B8\uBCC4 \uCD5C\uC801\uD654\uB41C \uBAA8\uC11C\uB9AC \uB465\uAE00\uAE30 \uC2DC\uC2A4\uD15C\uC785\uB2C8\uB2E4." }), _jsx("div", { style: {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                    gap: '30px',
                }, children: [
                    { name: 'None', variable: '--ds-border-radius-none', value: '0px' },
                    { name: 'Small', variable: '--ds-border-radius-sm', value: '2px' },
                    { name: 'Base', variable: '--ds-border-radius-base', value: '4px' },
                    { name: 'Medium', variable: '--ds-border-radius-md', value: '6px' },
                    { name: 'Large', variable: '--ds-border-radius-lg', value: '8px' },
                    { name: 'Extra Large', variable: '--ds-border-radius-xl', value: '12px' },
                    { name: '2X Large', variable: '--ds-border-radius-2xl', value: '16px' },
                    { name: '3X Large', variable: '--ds-border-radius-3xl', value: '24px' },
                    { name: 'Full', variable: '--ds-border-radius-full', value: '9999px' },
                ].map(radius => (_jsxs("div", { style: { textAlign: 'center' }, children: [_jsx("div", { style: {
                                width: '120px',
                                height: '80px',
                                backgroundColor: 'white',
                                border: '2px solid #d4d4d4',
                                borderRadius: `var(${radius.variable})`,
                                marginBottom: '12px',
                                cursor: 'pointer',
                                transition: 'transform 0.2s',
                            }, onClick: () => navigator.clipboard.writeText(radius.variable), onMouseEnter: (e) => {
                                e.currentTarget.style.transform = 'scale(1.05)';
                            }, onMouseLeave: (e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                            } }), _jsxs("div", { children: [_jsx("div", { style: { fontWeight: '500', fontSize: '14px' }, children: radius.name }), _jsx("code", { style: { fontSize: '11px', color: '#666' }, children: radius.variable }), _jsx("div", { style: { fontSize: '11px', color: '#999', marginTop: '4px' }, children: radius.value })] })] }, radius.name))) })] })),
};
export const BorderStyles = {
    render: () => (_jsxs("div", { children: [_jsx("h2", { style: { marginBottom: '10px' }, children: "Border Styles" }), _jsx("p", { style: { marginBottom: '30px', color: '#666' }, children: "\uB2E4\uC591\uD55C \uD14C\uB450\uB9AC \uC2A4\uD0C0\uC77C \uC635\uC158\uC785\uB2C8\uB2E4." }), _jsxs("div", { style: { display: 'flex', gap: '30px', flexWrap: 'wrap' }, children: [_jsxs("div", { style: { textAlign: 'center' }, children: [_jsx("div", { style: {
                                    width: '150px',
                                    height: '80px',
                                    backgroundColor: 'white',
                                    border: '2px solid #d4d4d4',
                                    borderRadius: '6px',
                                    marginBottom: '12px',
                                } }), _jsx("div", { style: { fontWeight: '500', fontSize: '14px' }, children: "Solid" }), _jsx("code", { style: { fontSize: '11px', color: '#666' }, children: "border-style: solid" })] }), _jsxs("div", { style: { textAlign: 'center' }, children: [_jsx("div", { style: {
                                    width: '150px',
                                    height: '80px',
                                    backgroundColor: 'white',
                                    border: '2px dashed #d4d4d4',
                                    borderRadius: '6px',
                                    marginBottom: '12px',
                                } }), _jsx("div", { style: { fontWeight: '500', fontSize: '14px' }, children: "Dashed" }), _jsx("code", { style: { fontSize: '11px', color: '#666' }, children: "border-style: dashed" })] }), _jsxs("div", { style: { textAlign: 'center' }, children: [_jsx("div", { style: {
                                    width: '150px',
                                    height: '80px',
                                    backgroundColor: 'white',
                                    border: '2px dotted #d4d4d4',
                                    borderRadius: '6px',
                                    marginBottom: '12px',
                                } }), _jsx("div", { style: { fontWeight: '500', fontSize: '14px' }, children: "Dotted" }), _jsx("code", { style: { fontSize: '11px', color: '#666' }, children: "border-style: dotted" })] }), _jsxs("div", { style: { textAlign: 'center' }, children: [_jsx("div", { style: {
                                    width: '150px',
                                    height: '80px',
                                    backgroundColor: 'white',
                                    border: '4px double #d4d4d4',
                                    borderRadius: '6px',
                                    marginBottom: '12px',
                                } }), _jsx("div", { style: { fontWeight: '500', fontSize: '14px' }, children: "Double" }), _jsx("code", { style: { fontSize: '11px', color: '#666' }, children: "border-style: double" })] })] })] })),
};
export const BorderColors = {
    render: () => (_jsxs("div", { children: [_jsx("h2", { style: { marginBottom: '10px' }, children: "Border Colors" }), _jsx("p", { style: { marginBottom: '30px', color: '#666' }, children: "Black & White \uC2DC\uC2A4\uD15C \uAE30\uBC18 \uD14C\uB450\uB9AC \uC0C9\uC0C1\uC785\uB2C8\uB2E4." }), _jsx("div", { style: {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                    gap: '30px',
                }, children: [
                    { name: 'Default', variable: '--ds-color-border', color: '#e8e8e8' },
                    { name: 'Subtle', variable: '--ds-color-border-subtle', color: '#f5f5f5' },
                    { name: 'Strong', variable: '--ds-color-border-strong', color: '#a1a1a1' },
                    { name: 'Black', variable: '--ds-black', color: '#000000' },
                    { name: 'Primary', variable: '--ds-prime', color: '#000000' },
                    { name: 'Secondary', variable: '--ds-gray-600', color: '#525252' },
                    { name: 'Disabled', variable: '--ds-gray-300', color: '#d4d4d4' },
                    { name: 'White', variable: '--ds-white', color: '#ffffff', darkBg: true },
                ].map(border => (_jsxs("div", { style: { textAlign: 'center' }, children: [_jsx("div", { style: {
                                width: '150px',
                                height: '80px',
                                backgroundColor: border.darkBg ? '#262626' : 'white',
                                border: `2px solid ${border.color}`,
                                borderRadius: '6px',
                                marginBottom: '12px',
                                cursor: 'pointer',
                                transition: 'transform 0.2s',
                            }, onClick: () => navigator.clipboard.writeText(border.variable), onMouseEnter: (e) => {
                                e.currentTarget.style.transform = 'scale(1.05)';
                            }, onMouseLeave: (e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                            } }), _jsxs("div", { children: [_jsx("div", { style: { fontWeight: '500', fontSize: '14px' }, children: border.name }), _jsx("code", { style: { fontSize: '11px', color: '#666' }, children: border.variable }), _jsx("div", { style: { fontSize: '10px', color: '#999', marginTop: '4px' }, children: border.color })] })] }, border.name))) })] })),
};
export const FocusRings = {
    render: () => (_jsxs("div", { children: [_jsx("h2", { style: { marginBottom: '10px' }, children: "Focus Rings" }), _jsx("p", { style: { marginBottom: '30px', color: '#666' }, children: "\uC811\uADFC\uC131\uC744 \uC704\uD55C \uD3EC\uCEE4\uC2A4 \uB9C1 \uC2DC\uC2A4\uD15C\uC785\uB2C8\uB2E4. \uD0ED \uD0A4\uB85C \uD3EC\uCEE4\uC2A4\uB97C \uC774\uB3D9\uD558\uC5EC \uD655\uC778\uD558\uC138\uC694." }), _jsxs("div", { style: { display: 'flex', gap: '20px', flexWrap: 'wrap' }, children: [_jsx("button", { style: {
                            padding: '10px 20px',
                            backgroundColor: 'white',
                            border: '2px solid #d4d4d4',
                            borderRadius: '6px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                        }, onFocus: (e) => {
                            e.currentTarget.style.outline = 'none';
                            e.currentTarget.style.boxShadow = '0 0 0 1px #000000';
                        }, onBlur: (e) => {
                            e.currentTarget.style.boxShadow = 'none';
                        }, children: "Ring 1px" }), _jsx("button", { style: {
                            padding: '10px 20px',
                            backgroundColor: 'white',
                            border: '2px solid #d4d4d4',
                            borderRadius: '6px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                        }, onFocus: (e) => {
                            e.currentTarget.style.outline = 'none';
                            e.currentTarget.style.boxShadow = '0 0 0 2px #000000';
                        }, onBlur: (e) => {
                            e.currentTarget.style.boxShadow = 'none';
                        }, children: "Ring 2px" }), _jsx("button", { style: {
                            padding: '10px 20px',
                            backgroundColor: 'white',
                            border: '2px solid #d4d4d4',
                            borderRadius: '6px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                        }, onFocus: (e) => {
                            e.currentTarget.style.outline = 'none';
                            e.currentTarget.style.boxShadow = '0 0 0 4px #000000';
                        }, onBlur: (e) => {
                            e.currentTarget.style.boxShadow = 'none';
                        }, children: "Ring 4px" }), _jsx("button", { style: {
                            padding: '10px 20px',
                            backgroundColor: '#333',
                            color: 'white',
                            border: '2px solid transparent',
                            borderRadius: '6px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                        }, onFocus: (e) => {
                            e.currentTarget.style.outline = 'none';
                            e.currentTarget.style.boxShadow = '0 0 0 2px #ffffff';
                        }, onBlur: (e) => {
                            e.currentTarget.style.boxShadow = 'none';
                        }, children: "Ring White" })] })] })),
};
export const ComponentExamples = {
    render: () => (_jsxs("div", { children: [_jsx("h2", { style: { marginBottom: '10px' }, children: "Component Examples" }), _jsx("p", { style: { marginBottom: '30px', color: '#666' }, children: "\uC2E4\uC81C \uCEF4\uD3EC\uB10C\uD2B8\uC5D0\uC11C \uD14C\uB450\uB9AC\uAC00 \uC5B4\uB5BB\uAC8C \uC0AC\uC6A9\uB418\uB294\uC9C0 \uBCF4\uC5EC\uC8FC\uB294 \uC608\uC2DC\uC785\uB2C8\uB2E4." }), _jsxs("div", { style: { display: 'grid', gap: '30px' }, children: [_jsxs("div", { children: [_jsx("h3", { style: { fontSize: '16px', marginBottom: '15px' }, children: "Buttons" }), _jsxs("div", { style: { display: 'flex', gap: '10px', flexWrap: 'wrap' }, children: [_jsx("button", { style: {
                                            padding: '8px 16px',
                                            backgroundColor: 'white',
                                            border: '1px solid var(--ds-gray-300)',
                                            borderRadius: 'var(--ds-border-radius-base)',
                                            cursor: 'pointer',
                                        }, children: "Small Radius" }), _jsx("button", { style: {
                                            padding: '10px 20px',
                                            backgroundColor: 'white',
                                            border: '2px solid var(--ds-gray-400)',
                                            borderRadius: 'var(--ds-border-radius-lg)',
                                            fontWeight: '500',
                                            cursor: 'pointer',
                                        }, children: "Medium Radius" }), _jsx("button", { style: {
                                            padding: '10px 24px',
                                            backgroundColor: 'white',
                                            border: '1px solid var(--ds-gray-300)',
                                            borderRadius: 'var(--ds-border-radius-full)',
                                            cursor: 'pointer',
                                        }, children: "Pill Button" }), _jsx("button", { style: {
                                            padding: '12px 24px',
                                            backgroundColor: 'var(--ds-black)',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: 'var(--ds-border-radius-xl)',
                                            fontWeight: '600',
                                            cursor: 'pointer',
                                        }, children: "Primary Button" })] })] }), _jsxs("div", { children: [_jsx("h3", { style: { fontSize: '16px', marginBottom: '15px' }, children: "Cards" }), _jsxs("div", { style: { display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }, children: [_jsxs("div", { style: {
                                            padding: '20px',
                                            backgroundColor: 'white',
                                            border: '1px solid var(--ds-gray-200)',
                                            borderRadius: 'var(--ds-border-radius-lg)',
                                        }, children: [_jsx("h4", { style: { marginBottom: '8px', fontSize: '16px' }, children: "Default Card" }), _jsx("p", { style: { fontSize: '14px', color: '#666', margin: 0 }, children: "\uD14C\uB450\uB9AC\uC640 \uB465\uADFC \uBAA8\uC11C\uB9AC\uAC00 \uC801\uC6A9\uB41C \uCE74\uB4DC" })] }), _jsxs("div", { style: {
                                            padding: '20px',
                                            backgroundColor: 'white',
                                            border: '2px solid var(--ds-gray-600)',
                                            borderRadius: 'var(--ds-border-radius-xl)',
                                        }, children: [_jsx("h4", { style: { marginBottom: '8px', fontSize: '16px' }, children: "Strong Border Card" }), _jsx("p", { style: { fontSize: '14px', color: '#666', margin: 0 }, children: "\uAC15\uC870\uB41C \uD14C\uB450\uB9AC\uC758 \uCE74\uB4DC" })] })] })] }), _jsxs("div", { children: [_jsx("h3", { style: { fontSize: '16px', marginBottom: '15px' }, children: "Form Elements" }), _jsxs("div", { style: { display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'center' }, children: [_jsx("input", { type: "text", placeholder: "Input field", style: {
                                            padding: '8px 12px',
                                            border: '1px solid var(--ds-gray-300)',
                                            borderRadius: 'var(--ds-border-radius-base)',
                                            fontSize: '14px',
                                            width: '200px',
                                        } }), _jsxs("select", { style: {
                                            padding: '8px 12px',
                                            border: '1px solid var(--ds-gray-300)',
                                            borderRadius: 'var(--ds-border-radius-base)',
                                            fontSize: '14px',
                                            backgroundColor: 'white',
                                            cursor: 'pointer',
                                        }, children: [_jsx("option", { children: "Select option" }), _jsx("option", { children: "Option 1" }), _jsx("option", { children: "Option 2" })] }), _jsx("textarea", { placeholder: "Textarea", style: {
                                            padding: '8px 12px',
                                            border: '1px solid var(--ds-gray-300)',
                                            borderRadius: 'var(--ds-border-radius-md)',
                                            fontSize: '14px',
                                            width: '200px',
                                            height: '60px',
                                            resize: 'vertical',
                                        } })] })] })] })] })),
};
export const UsageGuidelines = {
    render: () => (_jsxs("div", { children: [_jsx("h2", { style: { marginBottom: '10px' }, children: "Usage Guidelines" }), _jsx("p", { style: { marginBottom: '30px', color: '#666' }, children: "\uD14C\uB450\uB9AC \uC2DC\uC2A4\uD15C \uC0AC\uC6A9 \uAC00\uC774\uB4DC\uB77C\uC778\uC785\uB2C8\uB2E4." }), _jsxs("div", { style: { display: 'grid', gap: '30px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }, children: [_jsxs("div", { style: {
                            padding: '20px',
                            backgroundColor: 'white',
                            border: '1px solid var(--ds-gray-200)',
                            borderRadius: '8px',
                        }, children: [_jsx("h3", { style: { fontSize: '16px', marginBottom: '15px' }, children: "Border Radius \uC0AC\uC6A9 \uAC00\uC774\uB4DC" }), _jsxs("ul", { style: { margin: 0, paddingLeft: '20px', fontSize: '14px', lineHeight: '1.8' }, children: [_jsxs("li", { children: [_jsx("strong", { children: "rounded-sm (2px):" }), " \uCCB4\uD06C\uBC15\uC2A4, \uB77C\uB514\uC624 \uBC84\uD2BC"] }), _jsxs("li", { children: [_jsx("strong", { children: "rounded-base (4px):" }), " \uC791\uC740 \uBC84\uD2BC, \uD0DC\uADF8"] }), _jsxs("li", { children: [_jsx("strong", { children: "rounded-lg (8px):" }), " \uAE30\uBCF8 \uBC84\uD2BC, \uC785\uB825 \uD544\uB4DC"] }), _jsxs("li", { children: [_jsx("strong", { children: "rounded-xl (12px):" }), " \uCE74\uB4DC, \uD328\uB110"] }), _jsxs("li", { children: [_jsx("strong", { children: "rounded-2xl (16px):" }), " \uBAA8\uB2EC, \uB300\uD615 \uCEE8\uD14C\uC774\uB108"] }), _jsxs("li", { children: [_jsx("strong", { children: "rounded-full:" }), " \uC544\uBC14\uD0C0, \uC544\uC774\uCF58 \uBC84\uD2BC"] })] })] }), _jsxs("div", { style: {
                            padding: '20px',
                            backgroundColor: 'white',
                            border: '1px solid var(--ds-gray-200)',
                            borderRadius: '8px',
                        }, children: [_jsx("h3", { style: { fontSize: '16px', marginBottom: '15px' }, children: "Border Width \uC0AC\uC6A9 \uAC00\uC774\uB4DC" }), _jsxs("ul", { style: { margin: 0, paddingLeft: '20px', fontSize: '14px', lineHeight: '1.8' }, children: [_jsxs("li", { children: [_jsx("strong", { children: "1px:" }), " \uAE30\uBCF8 \uD14C\uB450\uB9AC, \uAD6C\uBD84\uC120"] }), _jsxs("li", { children: [_jsx("strong", { children: "2px:" }), " \uAC15\uC870\uB41C \uD14C\uB450\uB9AC, \uC120\uD0DD\uB41C \uC0C1\uD0DC"] }), _jsxs("li", { children: [_jsx("strong", { children: "4px:" }), " \uD2B9\uBCC4 \uAC15\uC870, \uBE0C\uB79C\uB4DC \uC694\uC18C"] }), _jsxs("li", { children: [_jsx("strong", { children: "8px:" }), " \uC7A5\uC2DD\uC801 \uC694\uC18C, \uD2B9\uC218 \uB514\uC790\uC778"] })] })] })] })] })),
};
export const CSSImplementation = {
    render: () => (_jsxs("div", { children: [_jsx("h2", { style: { marginBottom: '10px' }, children: "CSS Implementation" }), _jsx("p", { style: { marginBottom: '30px', color: '#666' }, children: "CSS\uC5D0\uC11C \uD14C\uB450\uB9AC \uBCC0\uC218\uB97C \uC0AC\uC6A9\uD558\uB294 \uBC29\uBC95\uC785\uB2C8\uB2E4." }), _jsx("pre", { style: {
                    padding: '20px',
                    backgroundColor: '#1e1e1e',
                    color: '#d4d4d4',
                    borderRadius: '8px',
                    fontSize: '13px',
                    lineHeight: '1.6',
                    overflow: 'auto',
                }, children: _jsx("code", { children: `/* Basic border application */
.card {
  border: var(--ds-border-width-1) solid var(--ds-color-border);
  border-radius: var(--ds-border-radius-lg);
}

/* Focus state */
.button:focus {
  outline: none;
  box-shadow: 0 0 0 var(--ds-border-width-2) var(--ds-black);
}

/* Hover state */
.card:hover {
  border-color: var(--ds-color-border-strong);
}

/* Different border sides */
.divider {
  border-top: var(--ds-border-width-1) solid var(--ds-gray-200);
  border-bottom: none;
}

/* Rounded specific corners */
.dropdown {
  border-top-left-radius: var(--ds-border-radius-lg);
  border-top-right-radius: var(--ds-border-radius-lg);
  border-bottom-radius: 0;
}` }) })] })),
};
//# sourceMappingURL=Borders.stories.js.map