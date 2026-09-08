import type { CSSProperties } from 'react';
import { Icon, type IconName } from '../../../../packages/bricks/src/react/Icon';
const names = {
  arrow: 'arrow-up-right',
  right: 'arrow-right',
  left: 'arrow-left',
  search: 'search',
  sun: 'sun',
  moon: 'moon',
  menu: 'menu',
  close: 'x',
  check: 'check',
  copy: 'copy',
  code: 'code-xml',
  grid: 'layout-grid',
  book: 'book-open',
  plus: 'plus',
  monitor: 'monitor',
  phone: 'smartphone',
  refresh: 'refresh-cw',
  chevron: 'chevron-right',
  down: 'chevron-down',
  chart: 'chart-line',
  users: 'users',
  bell: 'bell',
  mail: 'mail',
  card: 'credit-card',
  spark: 'sparkles',
} as const satisfies Record<string, IconName>;
export function Glyph({
  name,
  size = 16,
  style,
}: {
  name: keyof typeof names;
  size?: number;
  style?: CSSProperties;
}) {
  return <Icon name={names[name]} size={size} style={style} />;
}
export function BrandMark() {
  return <Icon name="blocks" size={25} />;
}
