export class Accordion {
    constructor(element, options = {}) {
        this.activeItems = new Set();
        this.element = element;
        this.options = {
            multiple: false,
            defaultOpen: [],
            animationDuration: 300,
            ...options
        };
        this.items = element.querySelectorAll('.accordion-item');
        this.init();
    }
    init() {
        this.setupAccordion();
        this.bindEvents();
        this.openDefaultItems();
    }
    setupAccordion() {
        this.element.setAttribute('role', 'region');
        this.element.classList.add('bricks-accordion');
        this.items.forEach((item, index) => {
            const header = item.querySelector('.accordion-header');
            const content = item.querySelector('.accordion-content');
            if (!header || !content)
                return;
            // Set ARIA attributes
            header.setAttribute('role', 'button');
            header.setAttribute('tabindex', '0');
            header.setAttribute('aria-expanded', 'false');
            header.setAttribute('aria-controls', `accordion-content-${index}`);
            content.setAttribute('id', `accordion-content-${index}`);
            content.setAttribute('role', 'region');
            content.setAttribute('aria-labelledby', `accordion-header-${index}`);
            header.setAttribute('id', `accordion-header-${index}`);
            // Hide content initially
            content.style.height = '0';
            content.style.overflow = 'hidden';
            content.style.transition = `height ${this.options.animationDuration}ms ease`;
        });
    }
    bindEvents() {
        this.items.forEach((item, index) => {
            const header = item.querySelector('.accordion-header');
            if (!header)
                return;
            header.addEventListener('click', () => this.toggle(index));
            header.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggle(index);
                }
            });
        });
    }
    toggle(index) {
        const item = this.items[index];
        if (!item)
            return;
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');
        if (!header || !content)
            return;
        const isOpen = this.activeItems.has(index);
        if (!this.options.multiple && !isOpen) {
            this.closeAll();
        }
        if (isOpen) {
            this.close(index);
        }
        else {
            this.open(index);
        }
    }
    open(index) {
        const item = this.items[index];
        if (!item)
            return;
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');
        if (!header || !content)
            return;
        // Calculate height
        content.style.height = 'auto';
        const height = content.scrollHeight;
        content.style.height = '0';
        // Force reflow
        content.offsetHeight;
        // Animate
        content.style.height = `${height}px`;
        header.setAttribute('aria-expanded', 'true');
        item.classList.add('active');
        this.activeItems.add(index);
        // Clean up after animation
        setTimeout(() => {
            if (this.activeItems.has(index)) {
                content.style.height = 'auto';
            }
        }, this.options.animationDuration);
    }
    close(index) {
        const item = this.items[index];
        if (!item)
            return;
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');
        if (!header || !content)
            return;
        // Set explicit height
        content.style.height = `${content.scrollHeight}px`;
        // Force reflow
        content.offsetHeight;
        // Animate
        content.style.height = '0';
        header.setAttribute('aria-expanded', 'false');
        item.classList.remove('active');
        this.activeItems.delete(index);
    }
    closeAll() {
        this.activeItems.forEach(index => this.close(index));
    }
    openDefaultItems() {
        const defaultOpen = Array.isArray(this.options.defaultOpen)
            ? this.options.defaultOpen
            : [this.options.defaultOpen];
        defaultOpen.forEach(index => {
            if (typeof index === 'number' && index >= 0 && index < this.items.length) {
                this.open(index);
            }
        });
    }
    destroy() {
        this.items.forEach(item => {
            const header = item.querySelector('.accordion-header');
            if (header) {
                header.replaceWith(header.cloneNode(true));
            }
        });
        this.activeItems.clear();
    }
}
// Export for use with BRICKS loader
export default Accordion;
//# sourceMappingURL=accordion.js.map