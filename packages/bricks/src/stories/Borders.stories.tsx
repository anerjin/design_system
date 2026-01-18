import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

const meta: Meta = {
  title: 'Foundation/Borders',
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
type Story = StoryObj<typeof meta>;

const BorderBox: React.FC<{
  name: string;
  variable: string;
  value: string;
  className?: string;
}> = ({ name, variable, value, className = '' }) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div
        className={className}
        style={{
          width: '120px',
          height: '80px',
          backgroundColor: className.includes('white') ? '#262626' : 'white',
          borderRadius: '6px',
          marginBottom: '12px',
          cursor: 'pointer',
          transition: 'transform 0.2s',
        }}
        onClick={() => copyToClipboard(variable)}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
      />
      <div>
        <div style={{ fontWeight: '500', fontSize: '14px' }}>{name}</div>
        <code style={{ fontSize: '11px', color: '#666' }}>{variable}</code>
        <div style={{ fontSize: '11px', color: '#999', marginTop: '4px' }}>{value}</div>
      </div>
    </div>
  );
};

export const BorderWidth: Story = {
  render: () => (
    <div>
      <h2 style={{ marginBottom: '10px' }}>Border Width</h2>
      <p style={{ marginBottom: '30px', color: '#666' }}>
        일관된 테두리 두께를 위한 5단계 시스템입니다. 클릭하여 변수명을 복사할 수 있습니다.
      </p>
      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        <BorderBox
          name="None"
          variable="--ds-border-width-0"
          value="0px"
          className=""
          style={{
            border: '0px solid #d4d4d4',
            backgroundColor: '#fafafa',
          }}
        />
        <BorderBox
          name="Default"
          variable="--ds-border-width-1"
          value="1px"
          style={{
            border: '1px solid #d4d4d4',
          }}
        />
        <BorderBox
          name="Medium"
          variable="--ds-border-width-2"
          value="2px"
          style={{
            border: '2px solid #d4d4d4',
          }}
        />
        <BorderBox
          name="Thick"
          variable="--ds-border-width-4"
          value="4px"
          style={{
            border: '4px solid #d4d4d4',
          }}
        />
        <BorderBox
          name="Extra Thick"
          variable="--ds-border-width-8"
          value="8px"
          style={{
            border: '8px solid #d4d4d4',
          }}
        />
      </div>
    </div>
  ),
};

export const BorderRadius: Story = {
  render: () => (
    <div>
      <h2 style={{ marginBottom: '10px' }}>Border Radius</h2>
      <p style={{ marginBottom: '30px', color: '#666' }}>
        컴포넌트별 최적화된 모서리 둥글기 시스템입니다.
      </p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
        gap: '30px',
      }}>
        {[
          { name: 'None', variable: '--ds-border-radius-none', value: '0px' },
          { name: 'Small', variable: '--ds-border-radius-sm', value: '2px' },
          { name: 'Base', variable: '--ds-border-radius-base', value: '4px' },
          { name: 'Medium', variable: '--ds-border-radius-md', value: '6px' },
          { name: 'Large', variable: '--ds-border-radius-lg', value: '8px' },
          { name: 'Extra Large', variable: '--ds-border-radius-xl', value: '12px' },
          { name: '2X Large', variable: '--ds-border-radius-2xl', value: '16px' },
          { name: '3X Large', variable: '--ds-border-radius-3xl', value: '24px' },
          { name: 'Full', variable: '--ds-border-radius-full', value: '9999px' },
        ].map(radius => (
          <div key={radius.name} style={{ textAlign: 'center' }}>
            <div
              style={{
                width: '120px',
                height: '80px',
                backgroundColor: 'white',
                border: '2px solid #d4d4d4',
                borderRadius: `var(${radius.variable})`,
                marginBottom: '12px',
                cursor: 'pointer',
                transition: 'transform 0.2s',
              }}
              onClick={() => navigator.clipboard.writeText(radius.variable)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            />
            <div>
              <div style={{ fontWeight: '500', fontSize: '14px' }}>{radius.name}</div>
              <code style={{ fontSize: '11px', color: '#666' }}>{radius.variable}</code>
              <div style={{ fontSize: '11px', color: '#999', marginTop: '4px' }}>{radius.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const BorderStyles: Story = {
  render: () => (
    <div>
      <h2 style={{ marginBottom: '10px' }}>Border Styles</h2>
      <p style={{ marginBottom: '30px', color: '#666' }}>
        다양한 테두리 스타일 옵션입니다.
      </p>
      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: '150px',
              height: '80px',
              backgroundColor: 'white',
              border: '2px solid #d4d4d4',
              borderRadius: '6px',
              marginBottom: '12px',
            }}
          />
          <div style={{ fontWeight: '500', fontSize: '14px' }}>Solid</div>
          <code style={{ fontSize: '11px', color: '#666' }}>border-style: solid</code>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: '150px',
              height: '80px',
              backgroundColor: 'white',
              border: '2px dashed #d4d4d4',
              borderRadius: '6px',
              marginBottom: '12px',
            }}
          />
          <div style={{ fontWeight: '500', fontSize: '14px' }}>Dashed</div>
          <code style={{ fontSize: '11px', color: '#666' }}>border-style: dashed</code>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: '150px',
              height: '80px',
              backgroundColor: 'white',
              border: '2px dotted #d4d4d4',
              borderRadius: '6px',
              marginBottom: '12px',
            }}
          />
          <div style={{ fontWeight: '500', fontSize: '14px' }}>Dotted</div>
          <code style={{ fontSize: '11px', color: '#666' }}>border-style: dotted</code>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: '150px',
              height: '80px',
              backgroundColor: 'white',
              border: '4px double #d4d4d4',
              borderRadius: '6px',
              marginBottom: '12px',
            }}
          />
          <div style={{ fontWeight: '500', fontSize: '14px' }}>Double</div>
          <code style={{ fontSize: '11px', color: '#666' }}>border-style: double</code>
        </div>
      </div>
    </div>
  ),
};

export const BorderColors: Story = {
  render: () => (
    <div>
      <h2 style={{ marginBottom: '10px' }}>Border Colors</h2>
      <p style={{ marginBottom: '30px', color: '#666' }}>
        Black & White 시스템 기반 테두리 색상입니다.
      </p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
        gap: '30px',
      }}>
        {[
          { name: 'Default', variable: '--ds-color-border', color: '#e8e8e8' },
          { name: 'Subtle', variable: '--ds-color-border-subtle', color: '#f5f5f5' },
          { name: 'Strong', variable: '--ds-color-border-strong', color: '#a1a1a1' },
          { name: 'Black', variable: '--ds-black', color: '#000000' },
          { name: 'Primary', variable: '--ds-prime', color: '#000000' },
          { name: 'Secondary', variable: '--ds-gray-600', color: '#525252' },
          { name: 'Disabled', variable: '--ds-gray-300', color: '#d4d4d4' },
          { name: 'White', variable: '--ds-white', color: '#ffffff', darkBg: true },
        ].map(border => (
          <div key={border.name} style={{ textAlign: 'center' }}>
            <div
              style={{
                width: '150px',
                height: '80px',
                backgroundColor: border.darkBg ? '#262626' : 'white',
                border: `2px solid ${border.color}`,
                borderRadius: '6px',
                marginBottom: '12px',
                cursor: 'pointer',
                transition: 'transform 0.2s',
              }}
              onClick={() => navigator.clipboard.writeText(border.variable)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            />
            <div>
              <div style={{ fontWeight: '500', fontSize: '14px' }}>{border.name}</div>
              <code style={{ fontSize: '11px', color: '#666' }}>{border.variable}</code>
              <div style={{ fontSize: '10px', color: '#999', marginTop: '4px' }}>{border.color}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const FocusRings: Story = {
  render: () => (
    <div>
      <h2 style={{ marginBottom: '10px' }}>Focus Rings</h2>
      <p style={{ marginBottom: '30px', color: '#666' }}>
        접근성을 위한 포커스 링 시스템입니다. 탭 키로 포커스를 이동하여 확인하세요.
      </p>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        <button
          style={{
            padding: '10px 20px',
            backgroundColor: 'white',
            border: '2px solid #d4d4d4',
            borderRadius: '6px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onFocus={(e) => {
            e.currentTarget.style.outline = 'none';
            e.currentTarget.style.boxShadow = '0 0 0 1px #000000';
          }}
          onBlur={(e) => {
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          Ring 1px
        </button>
        <button
          style={{
            padding: '10px 20px',
            backgroundColor: 'white',
            border: '2px solid #d4d4d4',
            borderRadius: '6px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onFocus={(e) => {
            e.currentTarget.style.outline = 'none';
            e.currentTarget.style.boxShadow = '0 0 0 2px #000000';
          }}
          onBlur={(e) => {
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          Ring 2px
        </button>
        <button
          style={{
            padding: '10px 20px',
            backgroundColor: 'white',
            border: '2px solid #d4d4d4',
            borderRadius: '6px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onFocus={(e) => {
            e.currentTarget.style.outline = 'none';
            e.currentTarget.style.boxShadow = '0 0 0 4px #000000';
          }}
          onBlur={(e) => {
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          Ring 4px
        </button>
        <button
          style={{
            padding: '10px 20px',
            backgroundColor: '#333',
            color: 'white',
            border: '2px solid transparent',
            borderRadius: '6px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onFocus={(e) => {
            e.currentTarget.style.outline = 'none';
            e.currentTarget.style.boxShadow = '0 0 0 2px #ffffff';
          }}
          onBlur={(e) => {
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          Ring White
        </button>
      </div>
    </div>
  ),
};

export const ComponentExamples: Story = {
  render: () => (
    <div>
      <h2 style={{ marginBottom: '10px' }}>Component Examples</h2>
      <p style={{ marginBottom: '30px', color: '#666' }}>
        실제 컴포넌트에서 테두리가 어떻게 사용되는지 보여주는 예시입니다.
      </p>

      <div style={{ display: 'grid', gap: '30px' }}>
        <div>
          <h3 style={{ fontSize: '16px', marginBottom: '15px' }}>Buttons</h3>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button style={{
              padding: '8px 16px',
              backgroundColor: 'white',
              border: '1px solid var(--ds-gray-300)',
              borderRadius: 'var(--ds-border-radius-base)',
              cursor: 'pointer',
            }}>
              Small Radius
            </button>
            <button style={{
              padding: '10px 20px',
              backgroundColor: 'white',
              border: '2px solid var(--ds-gray-400)',
              borderRadius: 'var(--ds-border-radius-lg)',
              fontWeight: '500',
              cursor: 'pointer',
            }}>
              Medium Radius
            </button>
            <button style={{
              padding: '10px 24px',
              backgroundColor: 'white',
              border: '1px solid var(--ds-gray-300)',
              borderRadius: 'var(--ds-border-radius-full)',
              cursor: 'pointer',
            }}>
              Pill Button
            </button>
            <button style={{
              padding: '12px 24px',
              backgroundColor: 'var(--ds-black)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--ds-border-radius-xl)',
              fontWeight: '600',
              cursor: 'pointer',
            }}>
              Primary Button
            </button>
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: '16px', marginBottom: '15px' }}>Cards</h3>
          <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
            <div style={{
              padding: '20px',
              backgroundColor: 'white',
              border: '1px solid var(--ds-gray-200)',
              borderRadius: 'var(--ds-border-radius-lg)',
            }}>
              <h4 style={{ marginBottom: '8px', fontSize: '16px' }}>Default Card</h4>
              <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
                테두리와 둥근 모서리가 적용된 카드
              </p>
            </div>
            <div style={{
              padding: '20px',
              backgroundColor: 'white',
              border: '2px solid var(--ds-gray-600)',
              borderRadius: 'var(--ds-border-radius-xl)',
            }}>
              <h4 style={{ marginBottom: '8px', fontSize: '16px' }}>Strong Border Card</h4>
              <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
                강조된 테두리의 카드
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: '16px', marginBottom: '15px' }}>Form Elements</h3>
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Input field"
              style={{
                padding: '8px 12px',
                border: '1px solid var(--ds-gray-300)',
                borderRadius: 'var(--ds-border-radius-base)',
                fontSize: '14px',
                width: '200px',
              }}
            />
            <select style={{
              padding: '8px 12px',
              border: '1px solid var(--ds-gray-300)',
              borderRadius: 'var(--ds-border-radius-base)',
              fontSize: '14px',
              backgroundColor: 'white',
              cursor: 'pointer',
            }}>
              <option>Select option</option>
              <option>Option 1</option>
              <option>Option 2</option>
            </select>
            <textarea
              placeholder="Textarea"
              style={{
                padding: '8px 12px',
                border: '1px solid var(--ds-gray-300)',
                borderRadius: 'var(--ds-border-radius-md)',
                fontSize: '14px',
                width: '200px',
                height: '60px',
                resize: 'vertical',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  ),
};

export const UsageGuidelines: Story = {
  render: () => (
    <div>
      <h2 style={{ marginBottom: '10px' }}>Usage Guidelines</h2>
      <p style={{ marginBottom: '30px', color: '#666' }}>
        테두리 시스템 사용 가이드라인입니다.
      </p>

      <div style={{ display: 'grid', gap: '30px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        <div style={{
          padding: '20px',
          backgroundColor: 'white',
          border: '1px solid var(--ds-gray-200)',
          borderRadius: '8px',
        }}>
          <h3 style={{ fontSize: '16px', marginBottom: '15px' }}>Border Radius 사용 가이드</h3>
          <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', lineHeight: '1.8' }}>
            <li><strong>rounded-sm (2px):</strong> 체크박스, 라디오 버튼</li>
            <li><strong>rounded-base (4px):</strong> 작은 버튼, 태그</li>
            <li><strong>rounded-lg (8px):</strong> 기본 버튼, 입력 필드</li>
            <li><strong>rounded-xl (12px):</strong> 카드, 패널</li>
            <li><strong>rounded-2xl (16px):</strong> 모달, 대형 컨테이너</li>
            <li><strong>rounded-full:</strong> 아바타, 아이콘 버튼</li>
          </ul>
        </div>

        <div style={{
          padding: '20px',
          backgroundColor: 'white',
          border: '1px solid var(--ds-gray-200)',
          borderRadius: '8px',
        }}>
          <h3 style={{ fontSize: '16px', marginBottom: '15px' }}>Border Width 사용 가이드</h3>
          <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', lineHeight: '1.8' }}>
            <li><strong>1px:</strong> 기본 테두리, 구분선</li>
            <li><strong>2px:</strong> 강조된 테두리, 선택된 상태</li>
            <li><strong>4px:</strong> 특별 강조, 브랜드 요소</li>
            <li><strong>8px:</strong> 장식적 요소, 특수 디자인</li>
          </ul>
        </div>
      </div>
    </div>
  ),
};

export const CSSImplementation: Story = {
  render: () => (
    <div>
      <h2 style={{ marginBottom: '10px' }}>CSS Implementation</h2>
      <p style={{ marginBottom: '30px', color: '#666' }}>
        CSS에서 테두리 변수를 사용하는 방법입니다.
      </p>

      <pre style={{
        padding: '20px',
        backgroundColor: '#1e1e1e',
        color: '#d4d4d4',
        borderRadius: '8px',
        fontSize: '13px',
        lineHeight: '1.6',
        overflow: 'auto',
      }}>
        <code>{`/* Basic border application */
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
}`}</code>
      </pre>
    </div>
  ),
};