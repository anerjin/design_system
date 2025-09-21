'use client';

import { ButtonProps, Button } from '../react/Button';

/**
 * Next.js App Router용 Client Component Button
 * use client 디렉티브가 적용된 버튼
 */
export const ClientButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />;
};

export default ClientButton;