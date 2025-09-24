import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta: Meta = {
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
type Story = StoryObj<typeof meta>;

const SpacingBox: React.FC<{
  name: string;
  variable: string;
  value: string;
  size: number;
}> = ({ name, variable, value, size }) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '12px',
        cursor: 'pointer',
        padding: '8px',
        borderRadius: '4px',
        transition: 'background-color 0.2s',
      }}
      onClick={() => copyToClipboard(variable)}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#f5f5f5';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
      }}
    >
      <div
        style={{
          width: `${Math.min(size, 160)}px`,
          height: '32px',
          backgroundColor: 'var(--ds-black)',
          borderRadius: '4px',
          marginRight: '16px',
        }}
      />
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontWeight: '500', minWidth: '80px' }}>{name}</span>
          <code style={{ fontSize: '12px', color: '#666' }}>{variable}</code>
          <span style={{ fontSize: '12px', color: '#999' }}>{value}</span>
        </div>
      </div>
    </div>
  );
};

export const SpacingScale: Story = {
  render: () => (
    <div>
      <h2 style={{ marginBottom: '10px' }}>Spacing Scale</h2>
      <p style={{ marginBottom: '30px', color: '#666' }}>
        일관된 레이아웃을 위한 간격 시스템입니다. 클릭하여 변수명을 복사할 수 있습니다.
      </p>

      <div style={{ maxWidth: '600px' }}>
        <SpacingBox name="space-0" variable="--ds-space-0" value="0" size={0} />
        <SpacingBox name="space-px" variable="--ds-space-px" value="1px" size={1} />
        <SpacingBox name="space-0.5" variable="--ds-space-0-5" value="2px" size={2} />
        <SpacingBox name="space-1" variable="--ds-space-1" value="4px" size={4} />
        <SpacingBox name="space-1.5" variable="--ds-space-1-5" value="6px" size={6} />
        <SpacingBox name="space-2" variable="--ds-space-2" value="8px" size={8} />
        <SpacingBox name="space-2.5" variable="--ds-space-2-5" value="10px" size={10} />
        <SpacingBox name="space-3" variable="--ds-space-3" value="12px" size={12} />
        <SpacingBox name="space-3.5" variable="--ds-space-3-5" value="14px" size={14} />
        <SpacingBox name="space-4" variable="--ds-space-4" value="16px" size={16} />
        <SpacingBox name="space-5" variable="--ds-space-5" value="20px" size={20} />
        <SpacingBox name="space-6" variable="--ds-space-6" value="24px" size={24} />
        <SpacingBox name="space-7" variable="--ds-space-7" value="28px" size={28} />
        <SpacingBox name="space-8" variable="--ds-space-8" value="32px" size={32} />
        <SpacingBox name="space-9" variable="--ds-space-9" value="36px" size={36} />
        <SpacingBox name="space-10" variable="--ds-space-10" value="40px" size={40} />
        <SpacingBox name="space-11" variable="--ds-space-11" value="44px" size={44} />
        <SpacingBox name="space-12" variable="--ds-space-12" value="48px" size={48} />
        <SpacingBox name="space-14" variable="--ds-space-14" value="56px" size={56} />
        <SpacingBox name="space-16" variable="--ds-space-16" value="64px" size={64} />
        <SpacingBox name="space-20" variable="--ds-space-20" value="80px" size={80} />
        <SpacingBox name="space-24" variable="--ds-space-24" value="96px" size={96} />
        <SpacingBox name="space-28" variable="--ds-space-28" value="112px" size={112} />
        <SpacingBox name="space-32" variable="--ds-space-32" value="128px" size={128} />
        <SpacingBox name="space-36" variable="--ds-space-36" value="144px" size={144} />
        <SpacingBox name="space-40" variable="--ds-space-40" value="160px" size={160} />
      </div>
    </div>
  ),
};

export const BorderRadius: Story = {
  render: () => (
    <div>
      <h2 style={{ marginBottom: '10px' }}>Border Radius</h2>
      <p style={{ marginBottom: '30px', color: '#666' }}>
        모서리 둥글기를 정의하는 반지름 값입니다.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '20px' }}>
        {[
          { name: 'none', variable: '--ds-radius-none', value: '0' },
          { name: 'sm', variable: '--ds-radius-sm', value: '2px' },
          { name: 'base', variable: '--ds-radius-base', value: '4px' },
          { name: 'md', variable: '--ds-radius-md', value: '6px' },
          { name: 'lg', variable: '--ds-radius-lg', value: '8px' },
          { name: 'xl', variable: '--ds-radius-xl', value: '12px' },
          { name: '2xl', variable: '--ds-radius-2xl', value: '16px' },
          { name: '3xl', variable: '--ds-radius-3xl', value: '24px' },
          { name: 'full', variable: '--ds-radius-full', value: '9999px' },
        ].map(radius => (
          <div key={radius.name} style={{ textAlign: 'center' }}>
            <div
              style={{
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
              }}
            >
              {radius.value}
            </div>
            <div style={{ fontWeight: '500' }}>{radius.name}</div>
            <code style={{ fontSize: '11px', color: '#666' }}>{radius.variable}</code>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const ContainerWidths: Story = {
  render: () => (
    <div>
      <h2 style={{ marginBottom: '10px' }}>Container Widths</h2>
      <p style={{ marginBottom: '30px', color: '#666' }}>
        반응형 레이아웃을 위한 컨테이너 너비 값입니다.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {[
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
        ].map(container => (
          <div
            key={container.name}
            style={{
              padding: '12px',
              backgroundColor: '#f5f5f5',
              borderRadius: '4px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <span style={{ fontWeight: '500', marginRight: '12px' }}>container-{container.name}</span>
              <code style={{ fontSize: '12px', color: '#666' }}>{container.variable}</code>
            </div>
            <span style={{ fontSize: '14px', color: '#999' }}>{container.value}</span>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const ZIndex: Story = {
  render: () => (
    <div>
      <h2 style={{ marginBottom: '10px' }}>Z-Index Scale</h2>
      <p style={{ marginBottom: '30px', color: '#666' }}>
        레이어 순서를 관리하는 z-index 값입니다.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', maxWidth: '600px' }}>
        <div>
          <h3 style={{ fontSize: '14px', marginBottom: '12px' }}>Base Scale</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { name: 'z-0', value: '0' },
              { name: 'z-10', value: '10' },
              { name: 'z-20', value: '20' },
              { name: 'z-30', value: '30' },
              { name: 'z-40', value: '40' },
              { name: 'z-50', value: '50' },
              { name: 'z-auto', value: 'auto' },
            ].map(z => (
              <div key={z.name} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 12px', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
                <code style={{ fontSize: '12px' }}>--ds-{z.name}</code>
                <span style={{ fontSize: '12px', color: '#666' }}>{z.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: '14px', marginBottom: '12px' }}>Component Specific</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { name: 'z-dropdown', value: '1000' },
              { name: 'z-sticky', value: '1020' },
              { name: 'z-fixed', value: '1030' },
              { name: 'z-modal-backdrop', value: '1040' },
              { name: 'z-modal', value: '1050' },
              { name: 'z-popover', value: '1060' },
              { name: 'z-tooltip', value: '1070' },
            ].map(z => (
              <div key={z.name} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 12px', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
                <code style={{ fontSize: '12px' }}>--ds-{z.name}</code>
                <span style={{ fontSize: '12px', color: '#666' }}>{z.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: '30px', position: 'relative', height: '200px' }}>
        <h3 style={{ fontSize: '14px', marginBottom: '12px' }}>Z-Index Visual Example</h3>
        <div style={{ position: 'relative', height: '150px' }}>
          <div style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            width: '120px',
            height: '80px',
            backgroundColor: '#e3f2fd',
            border: '2px solid #2196f3',
            padding: '8px',
            zIndex: 10,
          }}>
            z-index: 10
          </div>
          <div style={{
            position: 'absolute',
            top: '40px',
            left: '60px',
            width: '120px',
            height: '80px',
            backgroundColor: '#fce4ec',
            border: '2px solid #e91e63',
            padding: '8px',
            zIndex: 20,
          }}>
            z-index: 20
          </div>
          <div style={{
            position: 'absolute',
            top: '60px',
            left: '100px',
            width: '120px',
            height: '80px',
            backgroundColor: '#e8f5e9',
            border: '2px solid #4caf50',
            padding: '8px',
            zIndex: 30,
          }}>
            z-index: 30
          </div>
        </div>
      </div>
    </div>
  ),
};

export const SpacingExamples: Story = {
  render: () => (
    <div>
      <h2 style={{ marginBottom: '10px' }}>Spacing Usage Examples</h2>
      <p style={{ marginBottom: '30px', color: '#666' }}>
        실제 컴포넌트에서 간격이 어떻게 사용되는지 보여주는 예시입니다.
      </p>

      <div style={{ display: 'grid', gap: '30px' }}>
        <div>
          <h3 style={{ fontSize: '16px', marginBottom: '15px' }}>Card Padding</h3>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{
              padding: 'var(--ds-space-3)',
              backgroundColor: '#f5f5f5',
              borderRadius: 'var(--ds-radius-md)',
              width: '150px',
            }}>
              <div style={{ fontSize: '12px', marginBottom: '4px' }}>Small Card</div>
              <code style={{ fontSize: '10px', color: '#666' }}>padding: space-3 (12px)</code>
            </div>
            <div style={{
              padding: 'var(--ds-space-4)',
              backgroundColor: '#f5f5f5',
              borderRadius: 'var(--ds-radius-md)',
              width: '150px',
            }}>
              <div style={{ fontSize: '12px', marginBottom: '4px' }}>Default Card</div>
              <code style={{ fontSize: '10px', color: '#666' }}>padding: space-4 (16px)</code>
            </div>
            <div style={{
              padding: 'var(--ds-space-6)',
              backgroundColor: '#f5f5f5',
              borderRadius: 'var(--ds-radius-md)',
              width: '150px',
            }}>
              <div style={{ fontSize: '12px', marginBottom: '4px' }}>Large Card</div>
              <code style={{ fontSize: '10px', color: '#666' }}>padding: space-6 (24px)</code>
            </div>
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: '16px', marginBottom: '15px' }}>Component Gap</h3>
          <div>
            <div style={{ display: 'flex', gap: 'var(--ds-space-2)', marginBottom: '12px' }}>
              <div style={{ padding: '8px 16px', backgroundColor: '#e3f2fd', borderRadius: '4px' }}>Item 1</div>
              <div style={{ padding: '8px 16px', backgroundColor: '#e3f2fd', borderRadius: '4px' }}>Item 2</div>
              <div style={{ padding: '8px 16px', backgroundColor: '#e3f2fd', borderRadius: '4px' }}>Item 3</div>
            </div>
            <code style={{ fontSize: '12px', color: '#666' }}>gap: space-2 (8px)</code>
          </div>

          <div style={{ marginTop: '20px' }}>
            <div style={{ display: 'flex', gap: 'var(--ds-space-4)', marginBottom: '12px' }}>
              <div style={{ padding: '8px 16px', backgroundColor: '#fce4ec', borderRadius: '4px' }}>Item 1</div>
              <div style={{ padding: '8px 16px', backgroundColor: '#fce4ec', borderRadius: '4px' }}>Item 2</div>
              <div style={{ padding: '8px 16px', backgroundColor: '#fce4ec', borderRadius: '4px' }}>Item 3</div>
            </div>
            <code style={{ fontSize: '12px', color: '#666' }}>gap: space-4 (16px)</code>
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: '16px', marginBottom: '15px' }}>Section Spacing</h3>
          <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px' }}>
            <div style={{ marginBottom: 'var(--ds-space-8)' }}>
              <h4 style={{ marginBottom: 'var(--ds-space-2)' }}>Section Title</h4>
              <p style={{ color: '#666' }}>Section content with proper spacing between elements.</p>
            </div>
            <div style={{ marginBottom: 'var(--ds-space-8)' }}>
              <h4 style={{ marginBottom: 'var(--ds-space-2)' }}>Another Section</h4>
              <p style={{ color: '#666' }}>Using consistent spacing creates visual hierarchy.</p>
            </div>
            <div>
              <code style={{ fontSize: '11px', color: '#666' }}>
                margin-bottom: space-8 (32px) for sections, space-2 (8px) for titles
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};