// Common types for BRICKS components
export interface BricksComponent {
  element: HTMLElement;
  options?: any;
  init(): void;
  destroy?(): void;
}

export interface ComponentOptions {
  theme?: 'light' | 'dark' | 'auto';
  debug?: boolean;
}

// Accordion types
export interface AccordionOptions extends ComponentOptions {
  multiple?: boolean;
  defaultOpen?: number | number[];
  animationDuration?: number;
}

// Alert types
export interface AlertOptions extends ComponentOptions {
  type?: 'info' | 'success' | 'warning' | 'error';
  dismissible?: boolean;
  autoClose?: number;
}

// Chart types
export interface ChartOptions extends ComponentOptions {
  type?: 'bar' | 'line' | 'pie' | 'doughnut' | 'area';
  data?: ChartData;
  width?: number;
  height?: number;
}

export interface ChartData {
  labels: string[];
  datasets: Dataset[];
}

export interface Dataset {
  label: string;
  data: number[];
  backgroundColor?: string | string[];
  borderColor?: string | string[];
  borderWidth?: number;
}

// Modal types
export interface ModalOptions extends ComponentOptions {
  backdrop?: boolean;
  keyboard?: boolean;
  focus?: boolean;
  show?: boolean;
}

// Dropdown types
export interface DropdownOptions extends ComponentOptions {
  placement?: 'top' | 'bottom' | 'left' | 'right';
  trigger?: 'click' | 'hover' | 'focus';
  offset?: number;
}

// Table types
export interface TableOptions extends ComponentOptions {
  sortable?: boolean;
  filterable?: boolean;
  paginated?: boolean;
  pageSize?: number;
}

// Datepicker types
export interface DatepickerOptions extends ComponentOptions {
  format?: string;
  minDate?: Date | string;
  maxDate?: Date | string;
  defaultDate?: Date | string;
  inline?: boolean;
}

// Tabs types
export interface TabsOptions extends ComponentOptions {
  defaultTab?: number;
  animation?: boolean;
  vertical?: boolean;
}

// Pagination types
export interface PaginationOptions extends ComponentOptions {
  currentPage?: number;
  totalPages?: number;
  maxVisible?: number;
  showPrevNext?: boolean;
}

// Global BRICKS namespace
declare global {
  interface Window {
    BRICKS: {
      components: Map<string, any>;
      init(): void;
      destroy(): void;
      register(name: string, component: any): void;
      unregister(name: string): void;
      get(name: string): any;
    };
  }
}