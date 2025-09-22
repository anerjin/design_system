import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Icon } from '../react/Icon';

const meta: Meta = {
  title: 'Elements/Colors',
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const ColorSwatch: React.FC<{
  name: string;
  variable: string;
  value: string;
  textColor?: string;
}> = ({ name, variable, value, textColor = 'white' }) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
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
        }}
        onClick={() => copyToClipboard(variable)}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        <div style={{ fontWeight: '600', marginBottom: '4px' }}>{value}</div>
        <Icon name="copy" size={16} />
      </div>
      <div style={{ marginTop: '8px' }}>
        <div style={{ fontWeight: '500', fontSize: '14px' }}>{name}</div>
        <code style={{ fontSize: '11px', color: '#666' }}>{variable}</code>
      </div>
    </div>
  );
};

export const CorePalette: Story = {
  render: () => (
    <div>
      <h2 style={{ marginBottom: '10px' }}>Core Palette</h2>
      <p style={{ marginBottom: '30px', color: '#666' }}>
        핵심 브랜드 컬러와 베이스 컬러입니다.
      </p>
      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        <ColorSwatch name="Prime" variable="--ds-prime" value="#000000" />
        <ColorSwatch name="Black" variable="--ds-black" value="#000000" />
        <ColorSwatch name="White" variable="--ds-white" value="#FFFFFF" textColor="#000" />
      </div>
    </div>
  ),
};

export const GrayScale: Story = {
  render: () => (
    <div>
      <h2 style={{ marginBottom: '10px' }}>Gray Scale</h2>
      <p style={{ marginBottom: '30px', color: '#666' }}>
        레이어, 텍스트 계층, 보더에 활용하는 13단계 중립 팔레트입니다.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '30px' }}>
        <ColorSwatch name="Gray 0" variable="--ds-gray-0" value="#FFFFFF" textColor="#000" />
        <ColorSwatch name="Gray 50" variable="--ds-gray-50" value="#FAFAFA" textColor="#000" />
        <ColorSwatch name="Gray 100" variable="--ds-gray-100" value="#F5F5F5" textColor="#000" />
        <ColorSwatch name="Gray 200" variable="--ds-gray-200" value="#E8E8E8" textColor="#000" />
        <ColorSwatch name="Gray 300" variable="--ds-gray-300" value="#D4D4D4" textColor="#000" />
        <ColorSwatch name="Gray 400" variable="--ds-gray-400" value="#A1A1A1" textColor="#000" />
        <ColorSwatch name="Gray 500" variable="--ds-gray-500" value="#787878" />
        <ColorSwatch name="Gray 600" variable="--ds-gray-600" value="#525252" />
        <ColorSwatch name="Gray 700" variable="--ds-gray-700" value="#393939" />
        <ColorSwatch name="Gray 800" variable="--ds-gray-800" value="#262626" />
        <ColorSwatch name="Gray 900" variable="--ds-gray-900" value="#171717" />
        <ColorSwatch name="Gray 950" variable="--ds-gray-950" value="#0A0A0A" />
        <ColorSwatch name="Gray 1000" variable="--ds-gray-1000" value="#000000" />
      </div>
    </div>
  ),
};

export const SemanticColors: Story = {
  render: () => (
    <div>
      <h2 style={{ marginBottom: '10px' }}>Semantic UI Colors</h2>
      <p style={{ marginBottom: '30px', color: '#666' }}>
        상태와 의미를 전달하는 시맨틱 컬러입니다.
      </p>

      <h3 style={{ marginBottom: '20px', fontSize: '16px' }}>Status Colors</h3>
      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', marginBottom: '40px' }}>
        <ColorSwatch name="Success" variable="--ds-color-success" value="#64a644" />
        <ColorSwatch name="Warning" variable="--ds-color-warning" value="#fc6e51" />
        <ColorSwatch name="Danger" variable="--ds-color-danger" value="#ed5565" />
        <ColorSwatch name="Info" variable="--ds-color-info" value="#1cb6ed" />
      </div>

      <h3 style={{ marginBottom: '20px', fontSize: '16px' }}>Extended Palette</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '30px' }}>
        <ColorSwatch name="Pink" variable="--ds-color-pink" value="#ec87c0" />
        <ColorSwatch name="Purple" variable="--ds-color-purple" value="#ac92ec" />
        <ColorSwatch name="Yellow" variable="--ds-color-yellow" value="#ffce54" textColor="#000" />
        <ColorSwatch name="Green" variable="--ds-color-green" value="#a0d468" textColor="#000" />
        <ColorSwatch name="Mint" variable="--ds-color-mint" value="#48cfad" />
        <ColorSwatch name="Light Blue" variable="--ds-color-lightblue" value="#4fc1e9" />
        <ColorSwatch name="Blue" variable="--ds-color-blue" value="#5d9cec" />
        <ColorSwatch name="Dark" variable="--ds-color-dark" value="#434a54" />
        <ColorSwatch name="Light" variable="--ds-color-light" value="#aab2bd" textColor="#000" />
      </div>
    </div>
  ),
};

export const AlphaColors: Story = {
  render: () => (
    <div>
      <h2 style={{ marginBottom: '10px' }}>Alpha Transparency Colors</h2>
      <p style={{ marginBottom: '30px', color: '#666' }}>
        투명도가 적용된 컬러입니다. 오버레이나 배경에 활용합니다.
      </p>

      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
        <div>
          <h3 style={{ marginBottom: '20px', fontSize: '16px' }}>White Alpha</h3>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {[10, 20, 30, 50, 80, 90].map(alpha => (
              <div key={alpha} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    width: '80px',
                    height: '80px',
                    backgroundColor: '#333',
                    borderRadius: '8px',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      backgroundColor: `var(--ds-white-alpha-${alpha})`,
                    }}
                  />
                </div>
                <div style={{ marginTop: '8px', fontSize: '12px' }}>{alpha}%</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 style={{ marginBottom: '20px', fontSize: '16px' }}>Black Alpha</h3>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {[10, 20, 30, 50, 80, 90].map(alpha => (
              <div key={alpha} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    width: '80px',
                    height: '80px',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '8px',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      backgroundColor: `var(--ds-black-alpha-${alpha})`,
                    }}
                  />
                </div>
                <div style={{ marginTop: '8px', fontSize: '12px' }}>{alpha}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ),
};

export const ColorUsageExamples: Story = {
  render: () => (
    <div>
      <h2 style={{ marginBottom: '10px' }}>Color Usage Examples</h2>
      <p style={{ marginBottom: '30px', color: '#666' }}>
        실제 컴포넌트에서 색상이 어떻게 사용되는지 보여주는 예시입니다.
      </p>

      <div style={{ display: 'grid', gap: '30px' }}>
        <div>
          <h3 style={{ fontSize: '16px', marginBottom: '15px' }}>Status Messages</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{
              padding: '12px 16px',
              backgroundColor: 'rgba(100, 166, 68, 0.1)',
              borderLeft: '4px solid var(--ds-color-success)',
              borderRadius: '4px',
              color: 'var(--ds-color-success)',
            }}>
              <Icon name="check-circle" size={16} style={{ marginRight: '8px' }} />
              Success message using --ds-color-success
            </div>
            <div style={{
              padding: '12px 16px',
              backgroundColor: 'rgba(252, 110, 81, 0.1)',
              borderLeft: '4px solid var(--ds-color-warning)',
              borderRadius: '4px',
              color: 'var(--ds-color-warning)',
            }}>
              <Icon name="error" size={16} style={{ marginRight: '8px' }} />
              Warning message using --ds-color-warning
            </div>
            <div style={{
              padding: '12px 16px',
              backgroundColor: 'rgba(237, 85, 101, 0.1)',
              borderLeft: '4px solid var(--ds-color-danger)',
              borderRadius: '4px',
              color: 'var(--ds-color-danger)',
            }}>
              <Icon name="x-circle" size={16} style={{ marginRight: '8px' }} />
              Danger message using --ds-color-danger
            </div>
            <div style={{
              padding: '12px 16px',
              backgroundColor: 'rgba(28, 182, 237, 0.1)',
              borderLeft: '4px solid var(--ds-color-info)',
              borderRadius: '4px',
              color: 'var(--ds-color-info)',
            }}>
              <Icon name="info-circle" size={16} style={{ marginRight: '8px' }} />
              Info message using --ds-color-info
            </div>
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: '16px', marginBottom: '15px' }}>Text Hierarchy</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ color: 'var(--ds-gray-900)' }}>Primary Text (--ds-gray-900)</div>
            <div style={{ color: 'var(--ds-gray-700)' }}>Secondary Text (--ds-gray-700)</div>
            <div style={{ color: 'var(--ds-gray-600)' }}>Tertiary Text (--ds-gray-600)</div>
            <div style={{ color: 'var(--ds-gray-500)' }}>Placeholder Text (--ds-gray-500)</div>
            <div style={{ color: 'var(--ds-gray-400)' }}>Disabled Text (--ds-gray-400)</div>
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: '16px', marginBottom: '15px' }}>Backgrounds</h3>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <div style={{
              padding: '20px',
              backgroundColor: 'var(--ds-gray-50)',
              borderRadius: '8px',
              border: '1px solid var(--ds-gray-200)',
            }}>
              Light Background<br />
              <code style={{ fontSize: '11px' }}>--ds-gray-50</code>
            </div>
            <div style={{
              padding: '20px',
              backgroundColor: 'var(--ds-gray-100)',
              borderRadius: '8px',
              border: '1px solid var(--ds-gray-200)',
            }}>
              Card Background<br />
              <code style={{ fontSize: '11px' }}>--ds-gray-100</code>
            </div>
            <div style={{
              padding: '20px',
              backgroundColor: 'var(--ds-gray-800)',
              color: 'white',
              borderRadius: '8px',
            }}>
              Dark Background<br />
              <code style={{ fontSize: '11px' }}>--ds-gray-800</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};