import React from 'react';
import { ButtonProps } from '../react/Button';
/**
 * Next.js Server Component Button
 * 서버 사이드에서 렌더링되는 정적 버튼
 *
 * @note onClick 등 클라이언트 이벤트는 지원하지 않음
 */
export declare const ServerButton: React.FC<Omit<ButtonProps, 'onClick' | 'loading'>>;
export default ServerButton;
//# sourceMappingURL=ServerButton.d.ts.map