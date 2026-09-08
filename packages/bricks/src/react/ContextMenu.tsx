import {
  forwardRef,
  type ComponentProps,
  type HTMLAttributes,
  type ForwardRefExoticComponent,
  type RefAttributes,
} from 'react';
import { ContextMenu as Primitive } from '@base-ui/react/context-menu';
import { Icon } from './Icon';
import { cx } from './utils';

type Styled<T> = Omit<T, 'className'> & { className?: string };
export const ContextMenu = Primitive.Root;
export const ContextMenuGroup = Primitive.Group;
export const ContextMenuRadioGroup = Primitive.RadioGroup;
export const ContextMenuSub = Primitive.SubmenuRoot;
export type ContextMenuProps = ComponentProps<typeof Primitive.Root>;
export type ContextMenuTriggerProps = Styled<ComponentProps<typeof Primitive.Trigger>>;
export const ContextMenuTrigger = forwardRef<HTMLDivElement, ContextMenuTriggerProps>(
  ({ className, tabIndex = 0, onKeyDown, ...props }, ref) => (
    <Primitive.Trigger
      ref={ref}
      tabIndex={tabIndex}
      className={cx('doi-context-trigger', className)}
      {...props}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (
          !event.defaultPrevented &&
          (event.key === 'ContextMenu' || (event.shiftKey && event.key === 'F10'))
        ) {
          event.preventDefault();
          const bounds = event.currentTarget.getBoundingClientRect();
          event.currentTarget.dispatchEvent(
            new MouseEvent('contextmenu', {
              bubbles: true,
              cancelable: true,
              clientX: bounds.left + 12,
              clientY: bounds.top + 12,
            }),
          );
        }
      }}
    />
  ),
);
ContextMenuTrigger.displayName = 'ContextMenuTrigger';

export type ContextMenuContentProps = Styled<ComponentProps<typeof Primitive.Popup>> & {
  side?: ComponentProps<typeof Primitive.Positioner>['side'];
  align?: ComponentProps<typeof Primitive.Positioner>['align'];
  sideOffset?: number;
  alignOffset?: number;
};
export const ContextMenuContent = forwardRef<HTMLDivElement, ContextMenuContentProps>(
  ({ className, side, align = 'start', sideOffset = 4, alignOffset = 0, ...props }, ref) => (
    <Primitive.Portal>
      <Primitive.Positioner
        className="doi-context-positioner"
        side={side}
        align={align}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        collisionPadding={8}
      >
        <Primitive.Popup ref={ref} className={cx('doi-context-menu', className)} {...props} />
      </Primitive.Positioner>
    </Primitive.Portal>
  ),
);
ContextMenuContent.displayName = 'ContextMenuContent';
export const ContextMenuSubContent = ContextMenuContent;

export type ContextMenuItemProps = Styled<ComponentProps<typeof Primitive.Item>> & {
  variant?: 'default' | 'destructive';
  inset?: boolean;
};
export const ContextMenuItem = forwardRef<HTMLDivElement, ContextMenuItemProps>(
  ({ className, variant = 'default', inset, ...props }, ref) => (
    <Primitive.Item
      ref={ref}
      className={cx('doi-context-item', inset && 'doi-context-inset', className)}
      data-variant={variant}
      {...props}
    />
  ),
);
ContextMenuItem.displayName = 'ContextMenuItem';
export const ContextMenuSubTrigger = forwardRef<
  HTMLDivElement,
  Styled<ComponentProps<typeof Primitive.SubmenuTrigger>>
>(({ className, children, ...props }, ref) => (
  <Primitive.SubmenuTrigger ref={ref} className={cx('doi-context-item', className)} {...props}>
    {children}
    <Icon name="chevron-right" size={16} className="doi-context-arrow" />
  </Primitive.SubmenuTrigger>
));
ContextMenuSubTrigger.displayName = 'ContextMenuSubTrigger';
export const ContextMenuCheckboxItem = forwardRef<
  HTMLDivElement,
  Styled<ComponentProps<typeof Primitive.CheckboxItem>>
>(({ className, children, ...props }, ref) => (
  <Primitive.CheckboxItem
    ref={ref}
    className={cx('doi-context-item doi-context-inset', className)}
    {...props}
  >
    <Primitive.CheckboxItemIndicator className="doi-context-indicator">
      <Icon name="check" size={14} />
    </Primitive.CheckboxItemIndicator>
    {children}
  </Primitive.CheckboxItem>
));
ContextMenuCheckboxItem.displayName = 'ContextMenuCheckboxItem';
export const ContextMenuRadioItem = forwardRef<
  HTMLDivElement,
  Styled<ComponentProps<typeof Primitive.RadioItem>>
>(({ className, children, ...props }, ref) => (
  <Primitive.RadioItem ref={ref} className={cx('doi-context-item doi-context-inset', className)} {...props}>
    <Primitive.RadioItemIndicator className="doi-context-indicator">
      <span className="doi-context-dot" />
    </Primitive.RadioItemIndicator>
    {children}
  </Primitive.RadioItem>
));
ContextMenuRadioItem.displayName = 'ContextMenuRadioItem';
export const ContextMenuLabel = forwardRef<
  HTMLDivElement,
  Styled<ComponentProps<typeof Primitive.GroupLabel>>
>(({ className, ...props }, ref) => (
  <Primitive.GroupLabel ref={ref} className={cx('doi-context-label', className)} {...props} />
));
ContextMenuLabel.displayName = 'ContextMenuLabel';
export type ContextMenuSeparatorProps = Styled<ComponentProps<typeof Primitive.Separator>>;
export const ContextMenuSeparator: ForwardRefExoticComponent<
  ContextMenuSeparatorProps & RefAttributes<HTMLDivElement>
> = forwardRef<HTMLDivElement, ContextMenuSeparatorProps>(({ className, ...props }, ref) => (
  <Primitive.Separator ref={ref} className={cx('doi-context-separator', className)} {...props} />
));
ContextMenuSeparator.displayName = 'ContextMenuSeparator';
export function ContextMenuShortcut({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cx('doi-context-shortcut', className)} {...props} />;
}
