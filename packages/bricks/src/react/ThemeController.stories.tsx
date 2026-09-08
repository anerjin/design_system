import type { Meta, StoryObj } from '@storybook/react-vite';
import { ThemeController } from './ThemeController';
import { Button } from './Button';
import { Card } from './Card';
import { Badge } from './Badge';
import { Alert } from './Alert';

const meta: Meta<typeof ThemeController> = {
  title: 'Actions/ThemeController',
  component: ThemeController,
  parameters: {
    layout: 'padded',
    gallery: {
      description: 'DOI INC 라이트·다크와 daisyUI 내장 테마를 전환한다. 선택한 테마를 저장해 다음 방문에도 유지한다.',
      props: [
        { name: 'variant', type: 'select | dropdown | toggle', defaultValue: 'select' },
        { name: 'themes', type: 'readonly string[]', defaultValue: 'DOI INC 2종 + 내장 35종', description: '고를 수 있는 테마' },
        { name: 'storageKey', type: 'string | null', defaultValue: "'bricks-theme'", description: 'null이면 저장하지 않는다' },
        { name: 'onChange', type: '(theme: string) => void' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['select', 'dropdown', 'toggle'] },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * daisyUI의 `.theme-controller` 클래스는 CSS만으로 동작하지만, daisyUI가
 * `:has()` 셀렉터를 기본 테마와 prefersdark 테마 두 개에만 내보낸다.
 * 35종 전부를 고르려면 `data-theme`을 직접 세팅해야 해서 이 컴포넌트는 JS로 동작한다.
 *
 * 참고: Storybook 툴바의 Theme과 이 컴포넌트는 같은 `data-theme` 속성을 건드린다.
 */
export const Default: Story = {
  args: { variant: 'select' },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-8">
      {(['select', 'dropdown', 'toggle'] as const).map((variant) => (
        <div key={variant} className="flex flex-col items-center gap-2">
          <ThemeController variant={variant} storageKey={null} />
          <span className="text-xs opacity-60">{variant}</span>
        </div>
      ))}
    </div>
  ),
};

/** 고를 수 있는 테마를 좁힌다 */
export const LimitedThemes: Story = {
  args: {
    variant: 'dropdown',
    themes: ['light', 'dark', 'nord', 'dracula', 'retro', 'cyberpunk'],
    storageKey: null,
  },
};

/** 밝은 테마와 어두운 테마 둘만 오간다 */
export const LightDarkToggle: Story = {
  args: { variant: 'toggle', storageKey: null },
};

/** 테마를 바꾸면 아래 컴포넌트들이 함께 바뀐다 */
export const Preview: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <ThemeController variant="dropdown" storageKey={null} />

      <div className="flex flex-wrap gap-2">
        <Button color="primary">primary</Button>
        <Button color="secondary">secondary</Button>
        <Button color="accent">accent</Button>
        <Button variant="outline">outline</Button>
      </div>

      <div className="flex flex-wrap gap-2">
        <Badge color="primary">primary</Badge>
        <Badge color="success" variant="soft">success</Badge>
        <Badge color="error" variant="outline">error</Badge>
      </div>

      <Alert color="info" description="테마를 바꾸면 색이 함께 바뀝니다." />

      <Card variant="border" className="w-72">
        <Card.Body>
          <Card.Title>카드 제목</Card.Title>
          <p className="text-sm opacity-70">표면 색과 모서리도 테마를 따릅니다.</p>
        </Card.Body>
      </Card>
    </div>
  ),
};
