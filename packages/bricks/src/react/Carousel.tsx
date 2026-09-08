import { Icon } from './Icon';
import React, { forwardRef } from 'react';
import { cx } from './utils';

export type CarouselDirection = 'horizontal' | 'vertical';
export type CarouselSnap = 'start' | 'center' | 'end';

const DIRECTION: Record<CarouselDirection, string> = {
  horizontal: 'carousel-horizontal',
  vertical: 'carousel-vertical',
};

const SNAP: Record<CarouselSnap, string> = {
  start: 'carousel-start',
  center: 'carousel-center',
  end: 'carousel-end',
};

export interface CarouselItem {
  /** 슬라이드의 고유 식별자 */
  id: string;

  /** 슬라이드 내용 */
  content: React.ReactNode;
}

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 슬라이드 목록 */
  items: CarouselItem[];

  /**
   * 스크롤 방향
   * @default 'horizontal'
   */
  direction?: CarouselDirection;

  /**
   * 슬라이드가 멈추는 기준점
   * @default 'start'
   */
  snap?: CarouselSnap;

  /**
   * 앞뒤로 넘기는 화살표를 표시한다. 페이지 이동 없이 내부 슬라이드만 스크롤한다.
   * @default false
   */
  showControls?: boolean;

  /** 각 슬라이드에 적용할 추가 클래스 (폭 지정 등) */
  itemClassName?: string;
}

/**
 * DOI INC Carousel — daisyUI `carousel` 기반
 *
 * CSS 스크롤 스냅으로 동작한다. 자동 재생은 없다.
 *
 * @example
 * ```tsx
 * <Carousel
 *   showControls
 *   className="w-full rounded-box"
 *   itemClassName="w-full"
 *   items={slides.map((s) => ({ id: s.id, content: <img src={s.src} alt="" /> }))}
 * />
 * ```
 */
export const Carousel = forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      items,
      direction = 'horizontal',
      snap = 'start',
      showControls = false,
      itemClassName,
      className,
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      role="region"
      aria-roledescription="캐러셀"
      aria-label="슬라이드"
      className={cx('carousel', DIRECTION[direction], SNAP[snap], className)}
      {...props}
    >
      {items.map((item, index) => {
        const move = (event: React.MouseEvent<HTMLButtonElement>, offset: number) => {
          const container = event.currentTarget.closest<HTMLElement>('.carousel');
          const target = container?.children[(index + offset + items.length) % items.length];
          if (!container || !(target instanceof HTMLElement)) return;
          const frame = container.getBoundingClientRect();
          const slide = target.getBoundingClientRect();
          const alignment = snap === 'center' ? 0.5 : snap === 'end' ? 1 : 0;
          const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
          container.scrollTo({
            ...(direction === 'vertical'
              ? {
                  top:
                    container.scrollTop +
                    slide.top -
                    frame.top -
                    container.clientTop -
                    (container.clientHeight - slide.height) * alignment,
                }
              : {
                  left:
                    container.scrollLeft +
                    slide.left -
                    frame.left -
                    container.clientLeft -
                    (container.clientWidth - slide.width) * alignment,
                }),
            behavior,
          });
        };

        return (
          <div
            key={item.id}
            id={item.id}
            role="group"
            aria-roledescription="슬라이드"
            aria-label={`${index + 1} / ${items.length}`}
            className={cx('carousel-item relative', itemClassName)}
          >
            {item.content}

            {showControls && items.length > 1 && (
              <div className="absolute left-3 right-3 top-1/2 flex -translate-y-1/2 justify-between">
                <button
                  type="button"
                  onClick={(event) => move(event, -1)}
                  className="btn btn-circle btn-sm btn-surface"
                  aria-label="이전 슬라이드"
                >
                  <Icon name="chevron-left" size="1em" />
                </button>
                <button
                  type="button"
                  onClick={(event) => move(event, 1)}
                  className="btn btn-circle btn-sm btn-surface"
                  aria-label="다음 슬라이드"
                >
                  <Icon name="chevron-right" size="1em" />
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  ),
);

Carousel.displayName = 'Carousel';

export default Carousel;
