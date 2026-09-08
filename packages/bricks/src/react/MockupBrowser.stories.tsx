import type { Meta, StoryObj } from '@storybook/react-vite';
import { MockupBrowser } from './Mockup';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { Button } from './Button';
import { Typography } from './Typography';

const meta: Meta<typeof MockupBrowser> = {
  title: 'Mockup/Browser',
  component: MockupBrowser,
  parameters: {
    layout: 'padded',
    gallery: {
      description: '브라우저 창 틀. 안에 실제 화면을 넣어 스크린샷처럼 보여준다.',
      daisyui: 'mockup-browser',
      props: [
        { name: 'url', type: 'string', description: '주소 표시줄 내용' },
        { name: 'bordered', type: 'boolean', defaultValue: 'true' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    bordered: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <MockupBrowser url="https://bricks.example.com" className="w-full max-w-2xl">
      <div className="grid h-64 place-content-center bg-base-200">안녕하세요</div>
    </MockupBrowser>
  ),
};

export const WithoutUrl: Story = {
  render: () => (
    <MockupBrowser className="w-full max-w-2xl">
      <div className="grid h-64 place-content-center bg-base-200">주소 표시줄 없음</div>
    </MockupBrowser>
  ),
};

/** 실제 컴포넌트를 안에 넣어 화면을 보여준다 */
export const WithContent: Story = {
  render: () => (
    <MockupBrowser url="https://bricks.example.com" className="w-full max-w-3xl">
      <Navbar
        brand="DOI INC"
        collapsible={false}
        items={[
          { id: 'home', label: '홈', href: '#', active: true },
          { id: 'docs', label: '문서', href: '#' },
        ]}
        actions={<Button size="sm" color="primary">시작하기</Button>}
      />
      <Hero className="min-h-56 bg-base-200">
        <div className="max-w-md">
          <Typography variant="h3" gutterBottom>daisyUI 위의 디자인 시스템</Typography>
          <Button color="primary" size="sm">둘러보기</Button>
        </div>
      </Hero>
    </MockupBrowser>
  ),
};
