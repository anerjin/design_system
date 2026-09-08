'use client';

import React from 'react';
import { Button, type ButtonProps } from '../react/Button';

export type ClientButtonProps = ButtonProps;

/**
 * Next.js Client Component용 Button
 *
 * `'use client'` 경계를 여기서 그어 두면, 서버 컴포넌트 페이지에서도
 * `onClick` 같은 핸들러를 붙인 버튼을 쓸 수 있다.
 *
 * @example
 * ```tsx
 * // app/page.tsx — 페이지는 서버 컴포넌트로 두고
 * import { ClientButton } from '@bricks/core/next/ClientButton';
 *
 * export default function Page() {
 *   return <ClientButton color="primary" onClick={() => alert('ok')}>저장</ClientButton>;
 * }
 * ```
 */
export const ClientButton: React.FC<ClientButtonProps> = (props) => <Button {...props} />;

export default ClientButton;
