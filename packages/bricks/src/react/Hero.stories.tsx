import type { Meta, StoryObj } from '@storybook/react-vite';
import { Hero } from './Hero';
import { Button } from './Button';
import { Typography } from './Typography';

/**
 * 사진 자리표시자.
 *
 * `backgroundImage`는 `background-image: url()`을 쓰므로 CSS 변수를 넣을 수 없다.
 * 사진은 테마 색을 따르지 않는 것이 정상이라 중립 회색으로 둔다.
 * 테마 색 배경이 필요하면 아래 SolidBackground 예제처럼 클래스로 칠한다.
 */
const PHOTO = 'data:image/svg+xml,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400">'
  + '<rect width="800" height="400" fill="#6b7280"/>'
  + '<circle cx="640" cy="90" r="46" fill="#9ca3af"/>'
  + '<path d="M0 400 L230 190 L420 400z" fill="#4b5563"/>'
  + '<path d="M300 400 L560 150 L800 400z" fill="#374151"/></svg>',
);

const meta: Meta<typeof Hero> = {
  title: 'Layout/Hero',
  component: Hero,
  parameters: {
    layout: 'fullscreen',
    gallery: {
      description: '페이지 첫 화면. 배경 이미지를 주면 어두운 오버레이가 함께 깔린다.',
      daisyui: 'hero',
      props: [
        { name: 'backgroundImage', type: 'string', description: '주면 오버레이가 함께 깔린다' },
        { name: 'overlay', type: 'boolean', defaultValue: 'true' },
        { name: 'align', type: 'center | start | end', defaultValue: 'center' },
        { name: 'contentClassName', type: 'string', description: '내용 영역 배치 조절' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    align: { control: 'select', options: ['center', 'start', 'end'] },
    overlay: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Hero className="min-h-96 bg-base-200">
      <div className="max-w-md">
        <Typography variant="h1" gutterBottom>안녕하세요</Typography>
        <Typography variant="body1" color="muted" gutterBottom>
          DOI INC는 daisyUI 위에 올린 React 디자인 시스템입니다.
        </Typography>
        <Button color="primary">시작하기</Button>
      </div>
    </Hero>
  ),
};

export const WithBackgroundImage: Story = {
  render: () => (
    <Hero backgroundImage={PHOTO} className="min-h-96 bg-cover bg-center">
      <div className="max-w-md text-neutral-content">
        <Typography variant="h1" gutterBottom>배경 위의 문구</Typography>
        <Typography variant="body1" gutterBottom>
          배경 이미지를 주면 어두운 오버레이가 함께 깔려 글자가 읽힙니다.
        </Typography>
        <Button color="primary">둘러보기</Button>
      </div>
    </Hero>
  ),
};

/** 사진 없이 테마 색만으로 배경을 만든다 — 테마를 바꾸면 함께 바뀐다 */
export const SolidBackground: Story = {
  render: () => (
    <Hero className="min-h-96 bg-primary">
      <div className="max-w-md text-primary-content">
        <Typography variant="h1" gutterBottom>테마 색 배경</Typography>
        <Typography variant="body1" gutterBottom>
          `backgroundImage` 대신 클래스로 칠하면 테마를 그대로 따라갑니다.
        </Typography>
        <Button color="neutral">시작하기</Button>
      </div>
    </Hero>
  ),
};

/** 이미지와 글을 나란히 놓는 배치 */
export const SideBySide: Story = {
  render: () => (
    <Hero className="min-h-96 bg-base-200" contentClassName="flex-col lg:flex-row">
      <div className="h-48 w-full max-w-sm rounded-box bg-primary shadow-2xl" />
      <div>
        <Typography variant="h2" gutterBottom>제품 소개</Typography>
        <Typography variant="body2" color="muted" gutterBottom>
          `contentClassName`으로 내용 영역의 배치를 바꿀 수 있습니다.
        </Typography>
        <Button color="primary">자세히 보기</Button>
      </div>
    </Hero>
  ),
};

export const Alignments: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      {(['start', 'center', 'end'] as const).map((align) => (
        <Hero key={align} align={align} className="min-h-32 bg-base-200">
          <div className="w-full max-w-96">
            <Typography variant="h5">align=&quot;{align}&quot;</Typography>
          </div>
        </Hero>
      ))}
    </div>
  ),
};
