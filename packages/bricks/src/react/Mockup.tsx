import React, { forwardRef } from 'react';
import { cx } from './utils';

export interface MockupBrowserProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 주소 표시줄에 넣을 주소 */
  url?: string;

  /**
   * 테두리를 그린다
   * @default true
   */
  bordered?: boolean;

  children: React.ReactNode;
}

/**
 * DOI INC MockupBrowser — daisyUI `mockup-browser` 기반
 *
 * @example
 * ```tsx
 * <MockupBrowser url="https://example.com" className="w-full">
 *   <div className="grid h-64 place-content-center">안녕하세요</div>
 * </MockupBrowser>
 * ```
 */
export const MockupBrowser = forwardRef<HTMLDivElement, MockupBrowserProps>(({
  url,
  bordered = true,
  className,
  children,
  ...props
}, ref) => (
  <div
    ref={ref}
    className={cx('mockup-browser bg-base-100', bordered && 'border border-base-300', className)}
    {...props}
  >
    <div className="mockup-browser-toolbar">
      {url && <div className="input">{url}</div>}
    </div>
    <div className={cx(bordered && 'border-t border-base-300')}>{children}</div>
  </div>
));

MockupBrowser.displayName = 'MockupBrowser';

export interface MockupCodeLine {
  /** 줄 앞에 붙는 표식 (`$`, `>`, 줄 번호 등) */
  prefix?: string;

  /** 줄 내용 */
  content: React.ReactNode;

  /** 줄에 줄 색 (Tailwind 클래스). 예: `text-warning`, `bg-success text-success-content` */
  className?: string;
}

export interface MockupCodeProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 코드 줄 목록 */
  lines: MockupCodeLine[];
}

/**
 * DOI INC MockupCode — daisyUI `mockup-code` 기반
 *
 * 터미널 출력이나 코드 조각을 보여준다.
 *
 * @example
 * ```tsx
 * <MockupCode
 *   lines={[
 *     { prefix: '$', content: 'npm i @bricks/core' },
 *     { prefix: '>', content: '설치 중…', className: 'text-warning' },
 *     { prefix: '>', content: '완료', className: 'text-success' },
 *   ]}
 * />
 * ```
 */
export const MockupCode = forwardRef<HTMLDivElement, MockupCodeProps>(({
  lines,
  className,
  ...props
}, ref) => (
  <div ref={ref} className={cx('mockup-code', className)} {...props}>
    {lines.map((line, index) => (
      <pre key={index} data-prefix={line.prefix} className={line.className}>
        <code>{line.content}</code>
      </pre>
    ))}
  </div>
));

MockupCode.displayName = 'MockupCode';

export interface MockupPhoneProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * DOI INC MockupPhone — daisyUI `mockup-phone` 기반
 *
 * @example
 * ```tsx
 * <MockupPhone>
 *   <div className="grid h-full place-content-center bg-base-200">앱 화면</div>
 * </MockupPhone>
 * ```
 */
export const MockupPhone = forwardRef<HTMLDivElement, MockupPhoneProps>(({
  className,
  children,
  ...props
}, ref) => (
  <div ref={ref} className={cx('mockup-phone', className)} {...props}>
    <div className="mockup-phone-camera" />
    <div className="mockup-phone-display">{children}</div>
  </div>
));

MockupPhone.displayName = 'MockupPhone';

export interface MockupWindowProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 테두리를 그린다
   * @default true
   */
  bordered?: boolean;

  children: React.ReactNode;
}

/**
 * DOI INC MockupWindow — daisyUI `mockup-window` 기반
 *
 * @example
 * ```tsx
 * <MockupWindow className="w-full">
 *   <div className="grid h-64 place-content-center">창 안의 내용</div>
 * </MockupWindow>
 * ```
 */
export const MockupWindow = forwardRef<HTMLDivElement, MockupWindowProps>(({
  bordered = true,
  className,
  children,
  ...props
}, ref) => (
  <div
    ref={ref}
    className={cx('mockup-window bg-base-100', bordered && 'border border-base-300', className)}
    {...props}
  >
    <div className={cx(bordered && 'border-t border-base-300')}>{children}</div>
  </div>
));

MockupWindow.displayName = 'MockupWindow';
