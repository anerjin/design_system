import { Fragment } from 'react';

export interface InlineCodeProps {
  /** 백틱으로 감싼 부분이 코드로 렌더된다 */
  children: string;
}

/**
 * 설명 문장 안의 `백틱`을 코드로 바꿔준다.
 *
 * 마크다운 파서를 들이지 않는다 — 필요한 문법이 인라인 코드 하나뿐인데
 * 파서 하나가 번들에 수십 KB를 더한다.
 */
export function InlineCode({ children }: InlineCodeProps) {
  const parts = children.split('`');

  return (
    <>
      {parts.map((part, index) => (
        <Fragment key={index}>
          {index % 2 === 1
            ? <code className="rounded bg-base-300 px-1.5 py-0.5 font-mono text-[0.9em]">{part}</code>
            : part}
        </Fragment>
      ))}
    </>
  );
}
