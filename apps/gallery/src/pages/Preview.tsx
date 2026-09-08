import { Component, Suspense, useEffect, useRef, type ReactNode } from 'react';
import { findEntry } from '../registry';

import '../../../../packages/bricks/src/styles/examples.css';

class PreviewBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <p className="preview-error">이 예제를 표시할 수 없습니다. 초기화 후 다시 시도해 주세요.</p>
    ) : (
      this.props.children
    );
  }
}
export function Preview() {
  const match = /^#\/preview\/([\w-]+)\/(\w+)$/.exec(window.location.hash);
  const entry = match ? findEntry(match[1]) : undefined;
  const example = entry?.examples.find((item) => item.exportName === match?.[2]);
  const content = useRef<HTMLDivElement>(null);
  useEffect(() => {
    document.body.classList.add('preview-body');
    document.body.classList.toggle(
      'catalog-preview',
      new URLSearchParams(window.location.search).has('catalog-preview'),
    );
    const syncTheme = () => {
      // Same-origin preview frames isolate dialogs, timers and theme examples from the docs shell.
      if (window.parent !== window)
        document.documentElement.dataset.theme = window.parent.document.documentElement.dataset.theme;
    };
    syncTheme();
    const themeObserver = new MutationObserver(syncTheme);
    if (window.parent !== window)
      themeObserver.observe(window.parent.document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme'],
      });
    let frame = 0;
    const reportHeight = () => {
      const modalOpen = entry?.id === 'modal' && !!content.current?.querySelector('dialog[open]');
      // Give the three modal sections room inside the isolated example frame.
      const modalHeight = modalOpen ? Math.min(640, Math.max(400, window.parent.innerHeight - 180)) : 0;
      window.parent.postMessage(
        { type: 'doi-preview-height', height: Math.max(content.current?.scrollHeight ?? 260, modalHeight) },
        window.location.origin,
      );
    };
    const scheduleHeight = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(reportHeight);
    };
    const resize = new ResizeObserver(scheduleHeight);
    // Absolute menus change the scroll area without resizing their parent box.
    const mutation = new MutationObserver(scheduleHeight);
    if (content.current)
      mutation.observe(content.current, { childList: true, subtree: true, attributes: true });
    const events = ['focusin', 'focusout', 'pointerover', 'pointerout', 'transitionend'];
    events.forEach((event) => content.current?.addEventListener(event, scheduleHeight));
    if (content.current) resize.observe(content.current);
    return () => {
      cancelAnimationFrame(frame);
      mutation.disconnect();
      events.forEach((event) => content.current?.removeEventListener(event, scheduleHeight));
      resize.disconnect();
      themeObserver.disconnect();
    };
  }, []);
  return (
    <div
      ref={content}
      className={'isolated-preview bricks-example-boxes layout-' + (example?.layout ?? 'padded')}
    >
      <PreviewBoundary>
        <Suspense
          fallback={
            <p className="preview-loading" role="status">
              미리보기를 불러오는 중...
            </p>
          }
        >
          {example ? <example.Story /> : <p>예제를 찾을 수 없습니다.</p>}
        </Suspense>
      </PreviewBoundary>
    </div>
  );
}
