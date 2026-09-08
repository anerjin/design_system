import React, { forwardRef } from 'react';
import { cx, type Color } from './utils';

export type ChatSide = 'start' | 'end';

const SIDE: Record<ChatSide, string> = {
  start: 'chat-start',
  end: 'chat-end',
};

const COLOR: Record<Color, string> = {
  neutral: 'chat-bubble-neutral',
  primary: 'chat-bubble-primary',
  secondary: 'chat-bubble-secondary',
  accent: 'chat-bubble-accent',
  info: 'chat-bubble-info',
  success: 'chat-bubble-success',
  warning: 'chat-bubble-warning',
  error: 'chat-bubble-error',
};

export interface ChatBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 말풍선이 놓이는 쪽. 보통 상대는 `start`, 나는 `end`.
   * @default 'start'
   */
  side?: ChatSide;

  /** 말풍선 색상 */
  color?: Color;

  /** 왼쪽/오른쪽 아바타 */
  avatar?: React.ReactNode;

  /** 말풍선 위 정보 (이름·시각) */
  header?: React.ReactNode;

  /** 말풍선 아래 정보 (읽음·전송 상태) */
  footer?: React.ReactNode;

  /** 말풍선 내용 */
  children: React.ReactNode;
}

/**
 * DOI INC ChatBubble — daisyUI `chat` 기반
 *
 * @example
 * ```tsx
 * <ChatBubble side="start" avatar={<Avatar src="/a.jpg" size="xs" />} header="김서준">
 *   안녕하세요!
 * </ChatBubble>
 * <ChatBubble side="end" color="primary" footer="읽음">
 *   네, 반갑습니다.
 * </ChatBubble>
 * ```
 */
export const ChatBubble = forwardRef<HTMLDivElement, ChatBubbleProps>(({
  side = 'start',
  color,
  avatar,
  header,
  footer,
  className,
  children,
  ...props
}, ref) => (
  <div ref={ref} className={cx('chat', SIDE[side], className)} {...props}>
    {avatar && <div className="chat-image">{avatar}</div>}
    {header && <div className="chat-header">{header}</div>}
    <div className={cx('chat-bubble', color && COLOR[color])}>{children}</div>
    {footer && <div className="chat-footer opacity-60">{footer}</div>}
  </div>
));

ChatBubble.displayName = 'ChatBubble';

export default ChatBubble;
