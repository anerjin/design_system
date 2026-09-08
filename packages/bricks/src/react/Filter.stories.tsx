import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Filter } from './Filter';

const frameworks = [
  { value: 'svelte', label: 'Svelte' },
  { value: 'vue', label: 'Vue' },
  { value: 'react', label: 'React' },
  { value: 'solid', label: 'Solid' },
];

const meta: Meta<typeof Filter> = {
  title: 'Data Input/Filter',
  component: Filter,
  parameters: {
    layout: 'padded',
    gallery: {
      description: '하나를 고르면 나머지가 접히는 선택지. 라디오라 JS 없이도 동작한다.',
      daisyui: 'filter',
      props: [
        { name: 'options', type: 'FilterOption[]', description: 'value · label' },
        { name: 'value', type: 'string', description: '제어 컴포넌트로 쓸 때' },
        { name: 'onChange', type: '(value: string) => void', description: '해제하면 빈 문자열' },
        { name: 'resetLabel', type: 'string', defaultValue: "'×'" },
      ],
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/** 하나를 고르면 나머지가 접히고 해제 버튼만 남는다 */
export const Default: Story = {
  args: { options: frameworks },
};

export const Preselected: Story = {
  args: { options: frameworks, defaultValue: 'react', name: 'preselected' },
};

export const Controlled: Story = {
  render: function ControlledStory() {
    const [value, setValue] = useState('');

    return (
      <div className="flex flex-col gap-3">
        <Filter options={frameworks} value={value} onChange={setValue} name="controlled" />
        <p className="text-sm opacity-60">
          선택: {value || '없음'}
        </p>
      </div>
    );
  },
};

export const ManyOptions: Story = {
  args: {
    name: 'many',
    options: [
      { value: 'all', label: '전체' },
      { value: 'design', label: '디자인' },
      { value: 'frontend', label: '프론트엔드' },
      { value: 'backend', label: '백엔드' },
      { value: 'devops', label: 'DevOps' },
      { value: 'data', label: '데이터' },
    ],
  },
};
