import React, { forwardRef } from 'react';
import { cx } from './utils';

export interface FabAction {
  /** 고유 식별자 */
  id: string;

  /** 버튼 안 아이콘 */
  icon: React.ReactNode;

  /** 버튼 옆에 붙는 설명 */
  label?: React.ReactNode;

  /** 클릭 핸들러 */
  onClick?: () => void;
}

export interface FabProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 접혀 있을 때 보이는 메인 버튼의 아이콘 */
  icon: React.ReactNode;

  /** 펼쳤을 때 나오는 버튼들 */
  actions?: FabAction[];

  /**
   * 펼쳤을 때 메인 버튼 자리에 놓일 주요 동작.
   * 주면 그 자리에서 바로 실행할 수 있다.
   */
  mainAction?: FabAction;

  /** 펼쳤을 때 메인 버튼 자리에 놓일 닫기 버튼 */
  closeIcon?: React.ReactNode;

  /**
   * 부채꼴로 펼친다
   * @default false
   */
  flower?: boolean;

  /** 스크린리더용 설명 */
  label?: string;
}

/**
 * DOI INC Fab — daisyUI `fab` 기반
 *
 * `:focus-within`으로 펼쳐지므로 JS 상태가 없다.
 * 위치는 스스로 잡지 않으니 `className`에 `fixed bottom-6 end-6` 같은 값을 준다.
 *
 * @example
 * ```tsx
 * <Fab
 *   className="fixed bottom-6 end-6"
 *   label="빠른 작업"
 *   icon={<Icon name="plus" size="1em" className="text-2xl"  />}
 *   closeIcon={<Icon name="x" size="1em" className="text-2xl"  />}
 *   actions={[
 *     { id: 'note', icon: <Icon name="sticky-note" size="1em"  />, label: '메모' },
 *     { id: 'photo', icon: <Icon name="image" size="1em"  />, label: '사진' },
 *   ]}
 * />
 * ```
 */
export const Fab = forwardRef<HTMLDivElement, FabProps>(({
  icon,
  actions = [],
  mainAction,
  closeIcon,
  flower = false,
  label,
  className,
  ...props
}, ref) => (
  <div ref={ref} className={cx('fab', flower && 'fab-flower', className)} {...props}>
    {/* 첫 자식은 반드시 tabindex를 가져야 daisyUI가 펼침을 인식한다 */}
    <div tabIndex={0} role="button" aria-label={label} className="btn btn-lg btn-circle">
      {icon}
    </div>

    {closeIcon && (
      <div className="fab-close">
        <span className="btn btn-lg btn-circle btn-error">{closeIcon}</span>
      </div>
    )}

    {mainAction && (
      <div className="fab-main-action">
        <button
          type="button"
          className="btn btn-lg btn-circle btn-primary"
          aria-label={typeof mainAction.label === 'string' ? mainAction.label : undefined}
          onClick={mainAction.onClick}
        >
          {mainAction.icon}
        </button>
      </div>
    )}

    {actions.map((action) => (
      <div key={action.id}>
        {action.label}
        <button
          type="button"
          className="btn btn-lg btn-circle"
          aria-label={typeof action.label === 'string' ? action.label : undefined}
          onClick={action.onClick}
        >
          {action.icon}
        </button>
      </div>
    ))}
  </div>
));

Fab.displayName = 'Fab';

export default Fab;
