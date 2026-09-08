import { useLayoutEffect, type RefObject } from 'react';

/** Keep an inline popup inside the viewport without moving its trigger. */
export function usePopupBounds(ref: RefObject<HTMLElement | null>, enabled = true, placement?: string) {
  useLayoutEffect(() => {
    const popup = ref.current;
    const root = popup?.parentElement;
    if (!popup || !root || !enabled) return;
    let frame = 0;
    const update = () => {
      popup.style.transform = '';
      popup.style.translate = '';
      popup.style.insetInlineStart = '';
      popup.style.insetInlineEnd = '';
      popup.style.top = '';
      popup.style.bottom = '';
      if (getComputedStyle(popup).visibility === 'hidden') return;
      let rect = popup.getBoundingClientRect();
      const edge = 12;
      const width = document.documentElement.clientWidth;
      if (!rect.width) return;
      if (
        (placement === 'left' || placement === 'right') &&
        (rect.left < edge || rect.right > width - edge)
      ) {
        popup.style.insetInlineStart = '0';
        popup.style.insetInlineEnd = 'auto';
        popup.style.top = '100%';
        popup.style.bottom = 'auto';
        popup.style.translate = '0';
        rect = popup.getBoundingClientRect();
      }
      const shift = Math.min(Math.max(0, edge - rect.left), width - edge - rect.right);
      popup.style.transform = `translate(${shift}px, ${Math.max(0, edge - rect.top)}px)`;
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    const resize = new ResizeObserver(schedule);
    resize.observe(popup);
    const mutation = new MutationObserver(schedule);
    mutation.observe(root, { attributes: true, attributeFilter: ['class'] });
    const events = ['focusin', 'focusout', 'pointerenter', 'pointerleave'];
    events.forEach((event) => root.addEventListener(event, schedule));
    window.addEventListener('resize', schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      mutation.disconnect();
      events.forEach((event) => root.removeEventListener(event, schedule));
      window.removeEventListener('resize', schedule);
    };
  }, [ref, enabled, placement]);
}
