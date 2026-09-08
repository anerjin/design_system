import React from 'react';
import { Button, type ButtonProps } from '../react/Button';

/** 서버 컴포넌트에서 넘길 수 없는 값들 */
export type ServerButtonProps = Omit<
  ButtonProps,
  'onClick' | 'onChange' | 'onFocus' | 'onBlur' | 'onKeyDown' | 'onKeyUp'
>;

/**
 * Next.js Server Component용 Button
 *
 * DOI INC의 `Button`은 훅도 상태도 쓰지 않으므로 서버 컴포넌트에서 그대로 쓸 수 있다.
 * 이 래퍼가 하는 일은 **이벤트 핸들러를 타입 수준에서 막는 것**뿐이다.
 * 서버 컴포넌트에 함수를 넘기면 런타임에 가서야 터지는데, 그걸 컴파일 때 잡아준다.
 *
 * 클릭 처리가 필요하면 `ClientButton`을 쓴다.
 *
 * @example
 * ```tsx
 * // app/page.tsx — 'use client' 없이
 * import { ServerButton } from '@bricks/core/next/ServerButton';
 *
 * export default function Page() {
 *   return <ServerButton color="primary">자세히 보기</ServerButton>;
 * }
 * ```
 */
export const ServerButton: React.FC<ServerButtonProps> = (props) => <Button {...props} />;

export default ServerButton;
