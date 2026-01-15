import { BricksComponent, AccordionOptions } from '../types';
export declare class Accordion implements BricksComponent {
    element: HTMLElement;
    options: AccordionOptions;
    private items;
    private activeItems;
    constructor(element: HTMLElement, options?: AccordionOptions);
    init(): void;
    private setupAccordion;
    private bindEvents;
    private toggle;
    private open;
    private close;
    private closeAll;
    private openDefaultItems;
    destroy(): void;
}
export default Accordion;
//# sourceMappingURL=accordion.d.ts.map