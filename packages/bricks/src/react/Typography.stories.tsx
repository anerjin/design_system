import type { Meta, StoryObj } from '@storybook/react-vite';
import { Typography } from './Typography';
import type {
  TypographyColor,
  TypographyVariant,
  TypographyWeight,
} from './Typography';

const VARIANTS: TypographyVariant[] = [
  'display1', 'display2', 'display3', 'display4',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'subtitle1', 'subtitle2',
  'body1', 'body2',
  'caption', 'overline',
];

const WEIGHTS: TypographyWeight[] = ['light', 'regular', 'medium', 'semibold', 'bold', 'black'];

const COLORS: TypographyColor[] = [
  'primary', 'secondary', 'accent', 'neutral',
  'info', 'success', 'warning', 'error',
  'muted', 'inherit',
];

const meta: Meta<typeof Typography> = {
  title: 'Extras/Typography',
  component: Typography,
  parameters: {
    layout: 'padded',
    gallery: {
      description: 'Tailwind 텍스트 유틸리티를 묶은 컴포넌트. daisyUI에 대응이 없어 DOI INC가 직접 만든다.',
      props: [
        { name: 'variant', type: 'display1-4 | h1-h6 | subtitle1-2 | body1-2 | caption | overline', defaultValue: 'body1' },
        { name: 'as', type: 'ElementType', description: '렌더할 태그를 직접 지정' },
        { name: 'color', type: 'primary | … | error | muted | inherit' },
        { name: 'weight', type: 'light | regular | medium | semibold | bold | black' },
        { name: 'clamp', type: '1 | 2 | 3 | 4 | 5 | 6', description: '지정한 줄 수로 자른다' },
        { name: 'truncate', type: 'boolean', defaultValue: 'false', description: '한 줄로 자르고 말줄임' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: VARIANTS },
    weight: { control: 'select', options: WEIGHTS },
    color: { control: 'select', options: COLORS },
    align: { control: 'select', options: ['left', 'center', 'right', 'justify'] },
    clamp: { control: 'select', options: [undefined, 1, 2, 3, 4, 5, 6] },
    italic: { control: 'boolean' },
    truncate: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { variant: 'body1', children: '본문 텍스트입니다.' },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      {VARIANTS.map((variant) => (
        <div key={variant} className="flex items-baseline gap-4">
          <span className="w-24 shrink-0 text-xs opacity-50">{variant}</span>
          <Typography variant={variant}>다람쥐 헌 쳇바퀴에 타고파</Typography>
        </div>
      ))}
    </div>
  ),
};

export const Weights: Story = {
  render: () => (
    <div className="flex flex-col gap-1">
      {WEIGHTS.map((weight) => (
        <Typography key={weight} variant="h4" weight={weight}>
          {weight} — 다람쥐 헌 쳇바퀴에 타고파
        </Typography>
      ))}
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-1">
      {COLORS.map((color) => (
        <Typography key={color} variant="subtitle1" color={color}>
          {color} — 테마 색상을 따라갑니다
        </Typography>
      ))}
    </div>
  ),
};

export const Alignment: Story = {
  render: () => (
    <div className="flex w-full max-w-96 flex-col gap-3">
      {(['left', 'center', 'right', 'justify'] as const).map((align) => (
        <Typography key={align} variant="body2" align={align} className="border border-base-300 p-2">
          {align} 정렬입니다. 문장을 조금 길게 써야 justify 정렬의 효과가 보입니다.
        </Typography>
      ))}
    </div>
  ),
};

/** 한 줄 자르기와 여러 줄 자르기 */
export const Truncation: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <Typography variant="body2" truncate>
        아주 긴 한 줄 텍스트입니다. 넘치는 부분은 말줄임표로 처리됩니다.
      </Typography>
      {([2, 3] as const).map((n) => (
        <Typography key={n} variant="body2" clamp={n}>
          여러 줄 자르기 예시입니다. 지정한 줄 수를 넘어가면 잘립니다.
          Tailwind 스캐너가 조립된 클래스를 읽지 못하므로 line-clamp-1부터 6까지를
          리터럴 맵에 미리 적어 두었습니다. 그래서 clamp 값은 1~6만 지원합니다.
        </Typography>
      ))}
    </div>
  ),
};

export const Decorations: Story = {
  render: () => (
    <div className="flex flex-col gap-1">
      <Typography italic>기울임</Typography>
      <Typography decoration="underline">밑줄</Typography>
      <Typography decoration="line-through">취소선</Typography>
      <Typography transform="uppercase">uppercase transform</Typography>
      <Typography variant="overline">overline 변형</Typography>
    </div>
  ),
};

/** `as`로 렌더할 태그를 바꾼다 */
export const CustomElement: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Typography variant="h3" as="div">h3 스타일이지만 div로 렌더</Typography>
      <Typography variant="body2" as="span">body2 스타일의 span</Typography>
    </div>
  ),
};
