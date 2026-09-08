import React, { forwardRef } from 'react';
import { cx, type Size } from './utils';
import type { FieldColor } from './Input';

const COLOR: Record<FieldColor, string> = {
  neutral: 'file-input-neutral',
  primary: 'file-input-primary',
  secondary: 'file-input-secondary',
  accent: 'file-input-accent',
  info: 'file-input-info',
  success: 'file-input-success',
  warning: 'file-input-warning',
  error: 'file-input-error',
  ghost: 'file-input-ghost',
};

const SIZE: Record<Size, string> = {
  xs: 'file-input-xs',
  sm: 'file-input-sm',
  md: 'file-input-md',
  lg: 'file-input-lg',
  xl: 'file-input-xl',
};

export interface FileInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** 색상. 검증 결과 표시에도 쓴다 */
  color?: FieldColor;

  /**
   * 크기
   * @default 'md'
   */
  size?: Size;
}

/**
 * DOI INC FileInput — daisyUI `file-input` 기반
 *
 * @example
 * ```tsx
 * <FileInput accept="image/*" />
 * <FileInput color="primary" multiple />
 * ```
 */
export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(({
  color,
  size = 'md',
  className,
  ...props
}, ref) => (
  <input
    ref={ref}
    type="file"
    className={cx('file-input', color && COLOR[color], SIZE[size], className)}
    {...props}
  />
));

FileInput.displayName = 'FileInput';

export default FileInput;
