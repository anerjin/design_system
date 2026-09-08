import { useEffect, useRef, useState } from 'react';
import { Glyph } from './Glyph';

export function PageIdentity({ pageId }: { pageId: string }) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle');
  const field = useRef<HTMLInputElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(pageId);
      setStatus('copied');
    } catch {
      field.current?.focus();
      field.current?.select();
      setStatus('error');
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus('idle'), 2500);
  }

  return (
    <div className="page-identity">
      <div className="page-identity-control">
        <label htmlFor="current-page-id">PAGE ID</label>
        <input
          ref={field}
          id="current-page-id"
          readOnly
          value={pageId}
          aria-label="현재 페이지 ID"
          style={{ width: Math.min(pageId.length + 1, 32) + 'ch' }}
          onFocus={(event) => event.currentTarget.select()}
        />
        <button type="button" className="page-id-copy" onClick={copy} aria-label="페이지 ID 복사">
          <Glyph name={status === 'copied' ? 'check' : 'copy'} size={15} />
          {status === 'copied' ? '복사됨' : '복사'}
        </button>
      </div>
      <span className="page-id-help" role="status" aria-live="polite">
        {status === 'copied'
          ? '복사했습니다. 이 ID로 페이지를 정확히 전달할 수 있어요.'
          : status === 'error'
            ? 'ID를 선택했습니다. Ctrl/Cmd+C로 복사해 주세요.'
            : '수정할 페이지를 전달할 때 이 ID를 함께 보내주세요.'}
      </span>
    </div>
  );
}
