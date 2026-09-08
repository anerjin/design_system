import React, { forwardRef } from 'react';
import { cx } from './utils';

export type HeroAlign = 'center' | 'start' | 'end';

const ALIGN: Record<HeroAlign, string> = {
  center: 'text-center',
  start: 'text-start',
  end: 'text-end',
};

export interface HeroProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 배경 이미지 주소. 주면 어두운 오버레이가 함께 깔린다 */
  backgroundImage?: string;

  /**
   * 배경 이미지 위 오버레이 표시. `backgroundImage`가 있을 때만 의미가 있다.
   * @default true
   */
  overlay?: boolean;

  /**
   * 내용 정렬
   * @default 'center'
   */
  align?: HeroAlign;

  /** 내용 영역에 적용할 추가 클래스 */
  contentClassName?: string;

  children: React.ReactNode;
}

/**
 * DOI INC Hero — daisyUI `hero` 기반
 *
 * 높이는 지정하지 않는다. `className`으로 `min-h-screen` 등을 준다.
 *
 * @example
 * ```tsx
 * <Hero className="min-h-96 bg-base-200">
 *   <Typography variant="h1">안녕하세요</Typography>
 *   <Button color="primary">시작하기</Button>
 * </Hero>
 * ```
 */
export const Hero = forwardRef<HTMLDivElement, HeroProps>(({
  backgroundImage,
  overlay = true,
  align = 'center',
  className,
  contentClassName,
  style,
  children,
  ...props
}, ref) => (
  <div
    ref={ref}
    className={cx('hero', className)}
    style={backgroundImage ? { backgroundImage: `url(${backgroundImage})`, ...style } : style}
    {...props}
  >
    {backgroundImage && overlay && <div className="hero-overlay" />}
    <div className={cx('hero-content', ALIGN[align], contentClassName)}>
      {children}
    </div>
  </div>
));

Hero.displayName = 'Hero';

export default Hero;
