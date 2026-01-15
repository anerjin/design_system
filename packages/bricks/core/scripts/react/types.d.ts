/**
 * Common types for BRICKS React components
 */
export interface CommonProps {
    className?: string;
    style?: React.CSSProperties;
    id?: string;
    'data-testid'?: string;
}
export type BaseVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type Position = 'top' | 'right' | 'bottom' | 'left';
export type Theme = 'light' | 'dark' | 'auto';
export type ComponentState = 'default' | 'hover' | 'active' | 'disabled' | 'loading';
export interface FormControlProps extends CommonProps {
    name?: string;
    value?: any;
    defaultValue?: any;
    disabled?: boolean;
    required?: boolean;
    readOnly?: boolean;
    autoFocus?: boolean;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    'aria-describedby'?: string;
    'aria-invalid'?: boolean;
    'aria-required'?: boolean;
}
export type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';
export type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';
export type JustifyContent = 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
export type AlignItems = 'start' | 'end' | 'center' | 'baseline' | 'stretch';
export type AlignContent = 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly' | 'stretch';
export type Spacing = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
export type Color = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'white' | 'black' | 'transparent';
export type Shadow = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type Radius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type TextAlign = 'left' | 'center' | 'right' | 'justify';
export type FontWeight = 'normal' | 'medium' | 'semibold' | 'bold';
export type FontSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
export type AnimationDuration = 'fast' | 'normal' | 'slow';
export type AnimationTiming = 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type ClickHandler<T = HTMLElement> = (event: React.MouseEvent<T>) => void;
export type ChangeHandler<T = HTMLInputElement> = (event: React.ChangeEvent<T>) => void;
export type FocusHandler<T = HTMLElement> = (event: React.FocusEvent<T>) => void;
export type KeyboardHandler<T = HTMLElement> = (event: React.KeyboardEvent<T>) => void;
export type FormHandler<T = HTMLFormElement> = (event: React.FormEvent<T>) => void;
export type PropsWithChildren<P = unknown> = P & {
    children?: React.ReactNode;
};
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type ValueOf<T> = T[keyof T];
//# sourceMappingURL=types.d.ts.map