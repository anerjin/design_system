import React, { forwardRef } from 'react';
import { cx } from './utils';

export interface ListItem {
  /** 고유 식별자 */
  id: string;

  /** 왼쪽 영역 (아바타·아이콘·번호) */
  leading?: React.ReactNode;

  /** 본문. 남는 폭을 차지한다 */
  content: React.ReactNode;

  /** 본문 아래로 줄바꿈되는 보조 내용 */
  wrapped?: React.ReactNode;

  /** 오른쪽 영역 (버튼 등) */
  trailing?: React.ReactNode;
}

// `title`은 HTML의 툴팁 속성과 이름이 겹치므로 걷어내고 새로 정의한다
export interface ListProps extends Omit<React.HTMLAttributes<HTMLUListElement>, 'title'> {
  /** 항목 목록. 주지 않으면 `children`을 그대로 렌더한다 */
  items?: ListItem[];

  /** 목록 위에 붙일 제목 */
  title?: React.ReactNode;

  children?: React.ReactNode;
}

/**
 * DOI INC List — daisyUI `list` 기반
 *
 * `list-row` 안의 자식은 순서대로 배치되고, `list-col-grow`가 붙은 칸이
 * 남는 폭을 차지한다. `list-col-wrap`은 다음 줄로 넘어간다.
 *
 * @example
 * ```tsx
 * <List
 *   title="최근 재생"
 *   items={[
 *     {
 *       id: '1',
 *       leading: <Avatar src="/a.jpg" size="xs" />,
 *       content: <><div>Dio Lupa</div><div className="text-xs opacity-60">Remaining Reason</div></>,
 *       trailing: <Button variant="ghost" shape="circle" size="sm"><Icon name="play" size="1em"  /></Button>,
 *     },
 *   ]}
 * />
 * ```
 */
export const List = forwardRef<HTMLUListElement, ListProps>(({
  items,
  title,
  className,
  children,
  ...props
}, ref) => (
  <ul
    ref={ref}
    className={cx('list rounded-box bg-base-100 shadow-md', className)}
    {...props}
  >
    {title && (
      <li className="p-4 pb-2 text-xs tracking-wide opacity-60">{title}</li>
    )}

    {items
      ? items.map((item) => (
        <li key={item.id} className="list-row">
          {item.leading}
          <div className="list-col-grow">{item.content}</div>
          {item.wrapped && <div className="list-col-wrap text-xs">{item.wrapped}</div>}
          {item.trailing}
        </li>
      ))
      : children}
  </ul>
));

List.displayName = 'List';

export default List;
