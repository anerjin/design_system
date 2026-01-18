/**
 * BRICKS Design System - Tooltip Component TypeScript
 */
let tooltipId = 0;
export class Tooltip {
    constructor(trigger, options = {}) {
        this.visible = false;
        this.trigger = trigger;
        // Create or find wrapper
        this.wrapper = trigger.closest('.tooltip') || (() => {
            const span = document.createElement('span');
            span.className = 'tooltip';
            trigger.parentNode?.insertBefore(span, trigger);
            span.appendChild(trigger);
            return span;
        })();
        // Get text content
        this.text = options.text || trigger.getAttribute('data-tooltip') || '';
        const templateId = options.templateId || trigger.getAttribute('data-tooltip-template');
        if (templateId) {
            const template = document.getElementById(templateId);
            if (template) {
                this.text = template.innerHTML.trim();
            }
        }
        this.placement = options.placement || trigger.getAttribute('data-tooltip-placement') || 'top';
        this.theme = options.theme || trigger.getAttribute('data-tooltip-theme') || 'dark';
        this.id = `tooltip-${++tooltipId}`;
        this.bubble = this.createBubble();
        this.handlePointerEnter = () => this.show();
        this.handlePointerLeave = () => this.hide();
        this.handleFocus = () => this.show();
        this.handleBlur = () => this.hide();
        this.handleKeydown = (event) => {
            if (event.key === 'Escape') {
                this.hide();
                this.trigger.blur();
            }
        };
        this.repositionHandler = () => {
            if (this.visible) {
                this.positionBubble();
            }
        };
        this.bindEvents();
    }
    createBubble() {
        const bubble = document.createElement('div');
        bubble.className = 'tooltip__bubble';
        bubble.setAttribute('role', 'tooltip');
        bubble.setAttribute('id', this.id);
        bubble.setAttribute('aria-hidden', 'true');
        bubble.dataset.placement = this.placement;
        bubble.innerHTML = this.text;
        if (this.theme === 'light') {
            this.wrapper.classList.add('tooltip--light');
        }
        this.wrapper.appendChild(bubble);
        return bubble;
    }
    bindEvents() {
        this.trigger.addEventListener('mouseenter', this.handlePointerEnter);
        this.trigger.addEventListener('mouseleave', this.handlePointerLeave);
        this.trigger.addEventListener('focus', this.handleFocus);
        this.trigger.addEventListener('blur', this.handleBlur);
        this.trigger.addEventListener('keydown', this.handleKeydown);
        window.addEventListener('scroll', this.repositionHandler, true);
        window.addEventListener('resize', this.repositionHandler);
    }
    show() {
        if (!this.text)
            return;
        this.visible = true;
        this.trigger.setAttribute('aria-describedby', this.id);
        this.bubble.setAttribute('aria-hidden', 'false');
        this.positionBubble();
    }
    hide() {
        this.visible = false;
        this.bubble.setAttribute('aria-hidden', 'true');
        this.trigger.removeAttribute('aria-describedby');
    }
    positionBubble() {
        if (!this.bubble)
            return;
        const triggerRect = this.trigger.getBoundingClientRect();
        const wrapperRect = this.wrapper.getBoundingClientRect();
        const centerX = triggerRect.left + triggerRect.width / 2 - wrapperRect.left;
        const centerY = triggerRect.top + triggerRect.height / 2 - wrapperRect.top;
        this.bubble.dataset.placement = this.placement;
        switch (this.placement) {
            case 'bottom':
                this.bubble.style.left = `${centerX}px`;
                this.bubble.style.top = `${triggerRect.bottom - wrapperRect.top}px`;
                break;
            case 'left':
                this.bubble.style.left = `${triggerRect.left - wrapperRect.left}px`;
                this.bubble.style.top = `${centerY}px`;
                break;
            case 'right':
                this.bubble.style.left = `${triggerRect.right - wrapperRect.left}px`;
                this.bubble.style.top = `${centerY}px`;
                break;
            case 'top':
            default:
                this.bubble.style.left = `${centerX}px`;
                this.bubble.style.top = `${triggerRect.top - wrapperRect.top}px`;
                break;
        }
    }
    destroy() {
        this.trigger.removeEventListener('mouseenter', this.handlePointerEnter);
        this.trigger.removeEventListener('mouseleave', this.handlePointerLeave);
        this.trigger.removeEventListener('focus', this.handleFocus);
        this.trigger.removeEventListener('blur', this.handleBlur);
        this.trigger.removeEventListener('keydown', this.handleKeydown);
        window.removeEventListener('scroll', this.repositionHandler, true);
        window.removeEventListener('resize', this.repositionHandler);
        this.bubble.remove();
    }
    updateText(text) {
        this.text = text;
        this.bubble.innerHTML = text;
    }
    updatePlacement(placement) {
        this.placement = placement;
        this.bubble.dataset.placement = placement;
        if (this.visible) {
            this.positionBubble();
        }
    }
    static init() {
        document.querySelectorAll('[data-tooltip]').forEach(trigger => {
            if (!trigger.__bricksTooltip) {
                trigger.__bricksTooltip = new Tooltip(trigger);
            }
        });
    }
}
// Auto-initialize when DOM is ready
if (typeof window !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => Tooltip.init());
    }
    else {
        Tooltip.init();
    }
}
// Register in global BRICKS namespace
if (typeof window !== 'undefined') {
    window.BRICKS = window.BRICKS || {};
    window.BRICKS.Tooltip = Tooltip;
}
//# sourceMappingURL=Tooltip.js.map