/**
 * BRICKS Design System - Tooltip Component TypeScript
 */
export interface TooltipOptions {
    text?: string;
    templateId?: string;
    placement?: 'top' | 'bottom' | 'left' | 'right';
    theme?: 'dark' | 'light';
}
export declare class Tooltip {
    private trigger;
    private wrapper;
    private bubble;
    private text;
    private placement;
    private theme;
    private id;
    private visible;
    private handlePointerEnter;
    private handlePointerLeave;
    private handleFocus;
    private handleBlur;
    private handleKeydown;
    private repositionHandler;
    constructor(trigger: HTMLElement, options?: TooltipOptions);
    private createBubble;
    private bindEvents;
    show(): void;
    hide(): void;
    private positionBubble;
    destroy(): void;
    updateText(text: string): void;
    updatePlacement(placement: 'top' | 'bottom' | 'left' | 'right'): void;
    static init(): void;
}
//# sourceMappingURL=Tooltip.d.ts.map