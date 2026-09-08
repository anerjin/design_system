import { useEffect, useRef, useState } from 'react';
import { Glyph } from './Glyph';

export function CodeBlock({ code, title = 'TypeScript / React' }: { code: string; title?: string }) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle');
  const timer = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => () => clearTimeout(timer.current), []);
  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setStatus('copied');
    } catch {
      setStatus('error');
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus('idle'), 2200);
  }
  return (
    <div className="code-block">
      <div className="code-heading">
        <span>
          <Glyph name="code" size={14} />
          {title}
        </span>
        <button onClick={copy} className="code-copy" aria-label="코드 복사">
          <Glyph name={status === 'copied' ? 'check' : 'copy'} size={14} />
          <span role="status">
            {status === 'copied' ? '복사됨' : status === 'error' ? '직접 선택하여 복사해 주세요' : '복사'}
          </span>
        </button>
      </div>
      <pre tabIndex={0}>
        <code>
          {code
            .split(
              /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|\b(?:import|from|export|const|return|function|type|true|false)\b)/g,
            )
            .map((part, index) => (
              <span
                key={index}
                className={
                  /^["']/.test(part)
                    ? 'syntax-string'
                    : /^(import|from|export|const|return|function|type|true|false)$/.test(part)
                      ? 'syntax-keyword'
                      : undefined
                }
              >
                {part}
              </span>
            ))}
        </code>
      </pre>
    </div>
  );
}
