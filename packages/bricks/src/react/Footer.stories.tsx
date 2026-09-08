import { Icon } from './Icon';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Footer } from './Footer';
import { Link } from './Link';

const meta: Meta<typeof Footer> = {
  title: 'Layout/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
    gallery: {
      description: '페이지 하단. 열 단위로 링크를 묶거나 한 줄 저작권 표시로 쓴다.',
      daisyui: 'footer',
      props: [
        { name: 'direction', type: 'horizontal | vertical', defaultValue: 'horizontal' },
        { name: 'center', type: 'boolean', defaultValue: 'false', description: '한 줄 저작권 표시용' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    direction: { control: 'select', options: ['horizontal', 'vertical'] },
    center: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Footer className="bg-base-200 p-10">
      <nav>
        <Footer.Title>서비스</Footer.Title>
        <Link hoverOnly href="#">
          브랜딩
        </Link>
        <Link hoverOnly href="#">
          디자인
        </Link>
        <Link hoverOnly href="#">
          마케팅
        </Link>
      </nav>
      <nav>
        <Footer.Title>회사</Footer.Title>
        <Link hoverOnly href="#">
          소개
        </Link>
        <Link hoverOnly href="#">
          채용
        </Link>
        <Link hoverOnly href="#">
          문의
        </Link>
      </nav>
      <nav>
        <Footer.Title>약관</Footer.Title>
        <Link hoverOnly href="#">
          이용약관
        </Link>
        <Link hoverOnly href="#">
          개인정보 처리방침
        </Link>
      </nav>
    </Footer>
  ),
};

export const Dark: Story = {
  render: () => (
    <Footer className="bg-neutral p-10 text-neutral-content">
      <nav>
        <Footer.Title>제품</Footer.Title>
        <Link hoverOnly href="#">
          컴포넌트
        </Link>
        <Link hoverOnly href="#">
          테마
        </Link>
      </nav>
      <nav>
        <Footer.Title>지원</Footer.Title>
        <Link hoverOnly href="#">
          문서
        </Link>
        <Link hoverOnly href="#">
          GitHub
        </Link>
      </nav>
    </Footer>
  ),
};

/** 저작권 한 줄짜리 푸터 */
export const Centered: Story = {
  render: () => (
    <Footer center className="bg-base-300 p-4">
      <aside className="flex items-center gap-2">
        <Icon name="box" size="1em" className="text-xl" />
        <p>DOI INC — © 2026 모든 권리 보유</p>
      </aside>
    </Footer>
  ),
};

export const Vertical: Story = {
  render: () => (
    <Footer direction="vertical" className="bg-base-200 p-10">
      <nav>
        <Footer.Title>링크</Footer.Title>
        <Link hoverOnly href="#">
          문서
        </Link>
        <Link hoverOnly href="#">
          블로그
        </Link>
      </nav>
    </Footer>
  ),
};

/** 위쪽에 링크 묶음, 아래쪽에 저작권을 두는 흔한 구성 */
export const TwoRows: Story = {
  render: () => (
    <div>
      <Footer className="bg-neutral p-10 text-neutral-content">
        <nav>
          <Footer.Title>서비스</Footer.Title>
          <Link hoverOnly href="#">
            브랜딩
          </Link>
          <Link hoverOnly href="#">
            디자인
          </Link>
        </nav>
        <nav>
          <Footer.Title>회사</Footer.Title>
          <Link hoverOnly href="#">
            소개
          </Link>
          <Link hoverOnly href="#">
            채용
          </Link>
        </nav>
      </Footer>
      <Footer center className="bg-neutral px-10 py-4 text-neutral-content">
        <p>© 2026 DOI INC</p>
      </Footer>
    </div>
  ),
};
