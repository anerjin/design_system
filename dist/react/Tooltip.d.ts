import React, { ReactNode } from 'react';
export interface TooltipProps {
    children: ReactNode;
    content?: string | ReactNode;
    placement?: 'top' | 'bottom' | 'left' | 'right';
    theme?: 'dark' | 'light';
    className?: string;
    disabled?: boolean;
    delay?: number;
    interactive?: boolean;
    onShow?: () => void;
    onHide?: () => void;
}
declare const Tooltip: React.FC<TooltipProps>;
export interface TooltipShortcutProps {
    label: string;
    keys: string[];
}
export declare const TooltipShortcut: React.FC<TooltipShortcutProps>;
export default Tooltip;
//# sourceMappingURL=Tooltip.d.ts.map