import { forwardRef } from 'react';
import type { LucideProps } from 'lucide-react';
import { ICONS, type IconName } from './icon-registry';

export type { IconName } from './icon-registry';
export interface IconProps extends Omit<LucideProps, 'ref'> {
  /** Lucide name from the project's shared icon vocabulary. */
  name: IconName;
}

/** Official DOI INC icon: Lucide SVG, currentColor and a 2px stroke by default.
 * Decorative icons are hidden from assistive technology. Supply aria-label for standalone meaning.
 * @example <Icon name="house" size={20} />
 */
export const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ name, size = 20, color = 'currentColor', strokeWidth = 2, className = '', ...props }, ref) => {
    const Component = ICONS[name];
    if (!Component) return null;
    const labelled = !!(props['aria-label'] || props['aria-labelledby']);
    return (
      <Component
        ref={ref}
        size={size}
        color={color}
        strokeWidth={strokeWidth}
        aria-hidden={labelled ? undefined : true}
        role={labelled ? 'img' : undefined}
        className={`doi-icon ${className}`.trim()}
        {...props}
      />
    );
  },
);
Icon.displayName = 'Icon';
export default Icon;
