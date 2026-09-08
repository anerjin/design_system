import type { ReactNode } from 'react';

/**
 * 스토리가 지정한 배치.
 *
 * Storybook의 `parameters.layout`을 그대로 쓴다 — 스토리는 그 배치를 전제로
 * 작성돼 있으므로, 갤러리가 임의로 다르게 감싸면 예제가 의도와 다르게 보인다.
 */
export type PreviewLayout = 'centered' | 'padded' | 'fullscreen';

const LAYOUT: Record<PreviewLayout, string> = {
  /** 작은 컴포넌트를 판 가운데로 모은다 */
  centered: 'p-6 flex flex-wrap items-center justify-center gap-3',
  /** 여백을 두고 전체 폭을 쓴다. 스토리가 스스로 배치를 정한다 */
  padded: 'p-6',
  /** Navbar·Hero처럼 폭을 꽉 채우는 것은 여백 없이 판 끝까지 */
  fullscreen: 'overflow-hidden',
};

export interface PreviewFrameProps {
  children: ReactNode;

  /** @default 'padded' */
  layout?: PreviewLayout;

  /** 최소 높이 (Tailwind 클래스) */
  minHeight?: string;

  className?: string;
}

/**
 * 컴포넌트를 얹어 보여주는 판.
 *
 * 배경을 `base-100`으로 두어 어떤 테마에서도 컴포넌트가 실제 표면 위에
 * 놓인 것처럼 보이게 한다.
 */
export function PreviewFrame({
  children,
  layout = 'padded',
  minHeight = 'min-h-32',
  className,
}: PreviewFrameProps) {
  return (
    <div
      className={[
        'rounded-box border border-base-300 bg-base-100',
        LAYOUT[layout],
        minHeight,
        className ?? '',
      ].filter(Boolean).join(' ')}
    >
      {children}
    </div>
  );
}
