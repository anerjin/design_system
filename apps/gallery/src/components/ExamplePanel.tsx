import { useEffect, useRef, useState } from 'react';
import type { ComponentDoc, StoryExample } from '../registry';
import { CodeBlock } from './CodeBlock';
import { Glyph } from './Glyph';

export function ExamplePanel({ entry, example }: { entry: ComponentDoc; example: StoryExample }) {
  const [code, setCode] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [revision, setRevision] = useState(0);
  const [height, setHeight] = useState(260);
  const frame = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    const listener = (event: MessageEvent) => {
      if (
        event.origin !== window.location.origin ||
        event.source !== frame.current?.contentWindow ||
        event.data?.type !== 'doi-preview-height'
      )
        return;
      if (typeof event.data.height === 'number' && Number.isFinite(event.data.height))
        setHeight(Math.max(260, Math.ceil(event.data.height)));
    };
    window.addEventListener('message', listener);
    return () => window.removeEventListener('message', listener);
  }, []);
  return (
    <div className="example-panel">
      <div className="example-toolbar">
        <div role="group" aria-label="예제 표시 방식" className="example-tabs">
          <button aria-pressed={!code} onClick={() => setCode(false)}>
            미리보기
          </button>
          <button aria-pressed={code} onClick={() => setCode(true)}>
            코드
          </button>
        </div>
        <div className="preview-tools">
          <button
            className="icon-button"
            aria-label="데스크톱 미리보기"
            aria-pressed={!mobile}
            onClick={() => setMobile(false)}
            disabled={code}
          >
            <Glyph name="monitor" />
          </button>
          <button
            className="icon-button"
            aria-label="모바일 미리보기"
            aria-pressed={mobile}
            onClick={() => setMobile(true)}
            disabled={code}
          >
            <Glyph name="phone" />
          </button>
          <span className="header-divider" />
          <button
            className="icon-button"
            aria-label="예제 초기화"
            onClick={() => setRevision((value) => value + 1)}
            disabled={code}
          >
            <Glyph name="refresh" size={14} />
          </button>
        </div>
      </div>
      {code ? (
        <CodeBlock
          code={example.code || '// 이 예제에는 별도의 소스가 없습니다.'}
          title={entry.name + '.stories.tsx'}
        />
      ) : (
        <div className={'example-surface' + (mobile ? ' mobile-preview' : '')}>
          <iframe
            key={revision}
            ref={frame}
            title={entry.name + ' — ' + example.title}
            src={'#/preview/' + entry.id + '/' + example.exportName}
            style={{ height }}
          />
        </div>
      )}
      <div className="example-caption">
        <span>{example.title}</span>
        <span>
          React
          <Glyph name="code" size={12} />
        </span>
      </div>
    </div>
  );
}
