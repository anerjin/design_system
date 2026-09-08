import {
  Group,
  Panel,
  Separator,
  type GroupProps,
  type PanelProps,
  type SeparatorProps,
} from 'react-resizable-panels';
import { GripVertical } from 'lucide-react';
import { cx } from './utils';

export type ResizablePanelGroupProps = GroupProps;
export type ResizablePanelProps = PanelProps;
export type ResizableHandleProps = SeparatorProps & { withHandle?: boolean };
export function ResizablePanelGroup({ className, ...props }: ResizablePanelGroupProps) {
  return <Group className={cx('doi-resizable-group', className)} {...props} />;
}
export function ResizablePanel({ className, ...props }: ResizablePanelProps) {
  return <Panel className={cx('doi-resizable-panel', className)} {...props} />;
}
export function ResizableHandle({ className, withHandle = false, children, ...props }: ResizableHandleProps) {
  return (
    <Separator className={cx('doi-resizable-handle', className)} aria-label="패널 크기 조절" {...props}>
      {withHandle && (
        <span className="doi-resizable-grip">
          <GripVertical size={12} aria-hidden="true" />
        </span>
      )}
      {children}
    </Separator>
  );
}
export { useGroupRef, usePanelRef } from 'react-resizable-panels';
export type { GroupImperativeHandle, PanelImperativeHandle } from 'react-resizable-panels';
