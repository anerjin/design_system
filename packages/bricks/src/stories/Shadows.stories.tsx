import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta: Meta = {
  title: 'Elements/Shadows',
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
type Story = StoryObj<typeof meta>;

const ShadowBox: React.FC<{
  name: string;
  variable: string;
  description?: string;
}> = ({ name, variable, description }) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
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
        }}
        onClick={() => copyToClipboard(variable)}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        <span style={{ fontSize: '14px', fontWeight: '500' }}>{name}</span>
      </div>
      <div>
        <code style={{ fontSize: '11px', color: '#666' }}>{variable}</code>
        {description && <p style={{ fontSize: '11px', color: '#999', marginTop: '4px' }}>{description}</p>}
      </div>
    </div>
  );
};

export const BoxShadows: Story = {
  render: () => (
    <div>
      <h2 style={{ marginBottom: '10px' }}>Box Shadows</h2>
      <p style={{ marginBottom: '30px', color: '#666' }}>
        요소에 깊이감을 주는 그림자 효과입니다. 클릭하여 변수명을 복사할 수 있습니다.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
        gap: '30px',
        backgroundColor: '#f5f5f5',
        padding: '30px',
        borderRadius: '12px',
      }}>
        <ShadowBox name="none" variable="--ds-shadow-none" description="No shadow" />
        <ShadowBox name="xs" variable="--ds-shadow-xs" description="Extra small" />
        <ShadowBox name="sm" variable="--ds-shadow-sm" description="Small" />
        <ShadowBox name="md" variable="--ds-shadow-md" description="Medium" />
        <ShadowBox name="lg" variable="--ds-shadow-lg" description="Large" />
        <ShadowBox name="xl" variable="--ds-shadow-xl" description="Extra large" />
        <ShadowBox name="2xl" variable="--ds-shadow-2xl" description="2X large" />
      </div>
    </div>
  ),
};

export const InnerShadows: Story = {
  render: () => (
    <div>
      <h2 style={{ marginBottom: '10px' }}>Inner Shadows</h2>
      <p style={{ marginBottom: '30px', color: '#666' }}>
        요소 내부로 들어간 그림자 효과입니다. 입력 필드나 눌린 버튼에 사용됩니다.
      </p>

      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        {[
          { name: 'inner-xs', variable: '--ds-shadow-inner-xs' },
          { name: 'inner-sm', variable: '--ds-shadow-inner-sm' },
          { name: 'inner-md', variable: '--ds-shadow-inner-md' },
          { name: 'inner-lg', variable: '--ds-shadow-inner-lg' },
        ].map(shadow => (
          <div key={shadow.name} style={{ textAlign: 'center' }}>
            <div
              style={{
                width: '150px',
                height: '100px',
                backgroundColor: '#f5f5f5',
                borderRadius: '8px',
                boxShadow: `var(${shadow.variable})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '12px',
              }}
            >
              <span style={{ fontSize: '14px', fontWeight: '500', color: '#666' }}>{shadow.name}</span>
            </div>
            <code style={{ fontSize: '11px', color: '#666' }}>{shadow.variable}</code>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const ElevationLevels: Story = {
  render: () => (
    <div>
      <h2 style={{ marginBottom: '10px' }}>Elevation Levels</h2>
      <p style={{ marginBottom: '30px', color: '#666' }}>
        일관된 높이 시스템을 위한 복합 그림자입니다. Material Design에서 영감을 받았습니다.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
        gap: '30px',
        backgroundColor: '#f9f9f9',
        padding: '30px',
        borderRadius: '12px',
      }}>
        {[0, 1, 2, 3, 4, 5].map(level => (
          <div key={level} style={{ textAlign: 'center' }}>
            <div
              style={{
                width: '150px',
                height: '100px',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: `var(--ds-shadow-elevation-${level})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '12px',
              }}
            >
              <span style={{ fontSize: '14px', fontWeight: '500' }}>Level {level}</span>
            </div>
            <code style={{ fontSize: '11px', color: '#666' }}>--ds-shadow-elevation-{level}</code>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const FocusShadows: Story = {
  render: () => (
    <div>
      <h2 style={{ marginBottom: '10px' }}>Focus Shadows</h2>
      <p style={{ marginBottom: '30px', color: '#666' }}>
        포커스 상태를 나타내는 그림자입니다. 접근성을 위해 사용됩니다.
      </p>

      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        <div style={{ textAlign: 'center' }}>
          <button
            style={{
              width: '150px',
              height: '50px',
              backgroundColor: 'white',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              boxShadow: 'var(--ds-shadow-focus)',
              cursor: 'pointer',
              marginBottom: '12px',
            }}
          >
            Focus
          </button>
          <code style={{ fontSize: '11px', color: '#666', display: 'block' }}>--ds-shadow-focus</code>
        </div>

        <div style={{ textAlign: 'center' }}>
          <button
            style={{
              width: '150px',
              height: '50px',
              backgroundColor: 'white',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              boxShadow: 'var(--ds-shadow-focus-strong)',
              cursor: 'pointer',
              marginBottom: '12px',
            }}
          >
            Focus Strong
          </button>
          <code style={{ fontSize: '11px', color: '#666', display: 'block' }}>--ds-shadow-focus-strong</code>
        </div>

        <div style={{ textAlign: 'center' }}>
          <button
            style={{
              width: '150px',
              height: '50px',
              backgroundColor: '#333',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              boxShadow: 'var(--ds-shadow-focus-invert)',
              cursor: 'pointer',
              marginBottom: '12px',
            }}
          >
            Focus Invert
          </button>
          <code style={{ fontSize: '11px', color: '#666', display: 'block' }}>--ds-shadow-focus-invert</code>
        </div>
      </div>
    </div>
  ),
};

export const TextShadows: Story = {
  render: () => (
    <div>
      <h2 style={{ marginBottom: '10px' }}>Text Shadows</h2>
      <p style={{ marginBottom: '30px', color: '#666' }}>
        텍스트에 적용되는 그림자 효과입니다.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {[
          { name: 'Extra Small', variable: '--ds-text-shadow-xs' },
          { name: 'Small', variable: '--ds-text-shadow-sm' },
          { name: 'Medium', variable: '--ds-text-shadow-md' },
          { name: 'Large', variable: '--ds-text-shadow-lg' },
        ].map(shadow => (
          <div key={shadow.name}>
            <h3
              style={{
                fontSize: '24px',
                fontWeight: '600',
                textShadow: `var(${shadow.variable})`,
                marginBottom: '8px',
              }}
            >
              {shadow.name} Text Shadow
            </h3>
            <code style={{ fontSize: '11px', color: '#666' }}>{shadow.variable}</code>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const UsageExamples: Story = {
  render: () => (
    <div>
      <h2 style={{ marginBottom: '10px' }}>Shadow Usage Examples</h2>
      <p style={{ marginBottom: '30px', color: '#666' }}>
        실제 컴포넌트에서 그림자가 어떻게 사용되는지 보여주는 예시입니다.
      </p>

      <div style={{ display: 'grid', gap: '30px' }}>
        <div>
          <h3 style={{ fontSize: '16px', marginBottom: '15px' }}>Card Elevations</h3>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{
              padding: '20px',
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: 'var(--ds-shadow-sm)',
              width: '200px',
            }}>
              <h4 style={{ marginBottom: '8px' }}>Default Card</h4>
              <p style={{ fontSize: '12px', color: '#666' }}>Using shadow-sm for subtle depth</p>
            </div>
            <div style={{
              padding: '20px',
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: 'var(--ds-shadow-md)',
              width: '200px',
            }}>
              <h4 style={{ marginBottom: '8px' }}>Hover Card</h4>
              <p style={{ fontSize: '12px', color: '#666' }}>Using shadow-md on hover</p>
            </div>
            <div style={{
              padding: '20px',
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: 'var(--ds-shadow-lg)',
              width: '200px',
            }}>
              <h4 style={{ marginBottom: '8px' }}>Active Card</h4>
              <p style={{ fontSize: '12px', color: '#666' }}>Using shadow-lg for emphasis</p>
            </div>
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: '16px', marginBottom: '15px' }}>Interactive Elements</h3>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
            <button style={{
              padding: '10px 20px',
              backgroundColor: 'white',
              border: '1px solid #e0e0e0',
              borderRadius: '6px',
              boxShadow: 'var(--ds-shadow-xs)',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = 'var(--ds-shadow-md)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'var(--ds-shadow-xs)';
            }}>
              Hover me
            </button>

            <input
              type="text"
              placeholder="Focus input"
              style={{
                padding: '10px',
                border: '1px solid #e0e0e0',
                borderRadius: '6px',
                outline: 'none',
                transition: 'all 0.2s',
              }}
              onFocus={(e) => {
                e.currentTarget.style.boxShadow = 'var(--ds-shadow-focus)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.boxShadow = 'none';
              }}
            />

            <div style={{
              padding: '10px 20px',
              backgroundColor: '#f5f5f5',
              borderRadius: '6px',
              boxShadow: 'var(--ds-shadow-inner-sm)',
            }}>
              Pressed State
            </div>
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: '16px', marginBottom: '15px' }}>Modal/Dropdown</h3>
          <div style={{
            position: 'relative',
            height: '200px',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
            padding: '20px',
          }}>
            <div style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              right: '20px',
              padding: '20px',
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: 'var(--ds-shadow-elevation-4)',
            }}>
              <h4 style={{ marginBottom: '8px' }}>Modal Dialog</h4>
              <p style={{ fontSize: '12px', color: '#666' }}>
                Using elevation-4 for modal overlays
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};