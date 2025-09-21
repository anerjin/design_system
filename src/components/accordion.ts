import { BricksComponent, AccordionOptions } from '../types';

export class Accordion implements BricksComponent {
  public element: HTMLElement;
  public options: AccordionOptions;
  private items: NodeListOf<HTMLElement>;
  private activeItems: Set<number> = new Set();

  constructor(element: HTMLElement, options: AccordionOptions = {}) {
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

  public init(): void {
    this.setupAccordion();
    this.bindEvents();
    this.openDefaultItems();
  }

  private setupAccordion(): void {
    this.element.setAttribute('role', 'region');
    this.element.classList.add('bricks-accordion');

    this.items.forEach((item, index) => {
      const header = item.querySelector('.accordion-header') as HTMLElement;
      const content = item.querySelector('.accordion-content') as HTMLElement;

      if (!header || !content) return;

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

  private bindEvents(): void {
    this.items.forEach((item, index) => {
      const header = item.querySelector('.accordion-header') as HTMLElement;

      if (!header) return;

      header.addEventListener('click', () => this.toggle(index));

      header.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.toggle(index);
        }
      });
    });
  }

  private toggle(index: number): void {
    const item = this.items[index];
    if (!item) return;

    const header = item.querySelector('.accordion-header') as HTMLElement;
    const content = item.querySelector('.accordion-content') as HTMLElement;

    if (!header || !content) return;

    const isOpen = this.activeItems.has(index);

    if (!this.options.multiple && !isOpen) {
      this.closeAll();
    }

    if (isOpen) {
      this.close(index);
    } else {
      this.open(index);
    }
  }

  private open(index: number): void {
    const item = this.items[index];
    if (!item) return;

    const header = item.querySelector('.accordion-header') as HTMLElement;
    const content = item.querySelector('.accordion-content') as HTMLElement;

    if (!header || !content) return;

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

  private close(index: number): void {
    const item = this.items[index];
    if (!item) return;

    const header = item.querySelector('.accordion-header') as HTMLElement;
    const content = item.querySelector('.accordion-content') as HTMLElement;

    if (!header || !content) return;

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

  private closeAll(): void {
    this.activeItems.forEach(index => this.close(index));
  }

  private openDefaultItems(): void {
    const defaultOpen = Array.isArray(this.options.defaultOpen)
      ? this.options.defaultOpen
      : [this.options.defaultOpen];

    defaultOpen.forEach(index => {
      if (typeof index === 'number' && index >= 0 && index < this.items.length) {
        this.open(index);
      }
    });
  }

  public destroy(): void {
    this.items.forEach(item => {
      const header = item.querySelector('.accordion-header') as HTMLElement;
      if (header) {
        header.replaceWith(header.cloneNode(true));
      }
    });

    this.activeItems.clear();
  }
}

// Export for use with BRICKS loader
export default Accordion;