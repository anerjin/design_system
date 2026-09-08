import { useEffect, useRef, useState } from 'react';
import type { ComponentDoc } from '../registry';

export function CatalogPreview({ entry }: { entry: ComponentDoc }) {
  const container = useRef<HTMLDivElement>(null);
  const [nearViewport, setNearViewport] = useState(false);
  const example = entry.examples[0];

  useEffect(() => {
    const observer = new IntersectionObserver(([item]) => setNearViewport(item.isIntersecting), {
      rootMargin: '300px',
    });
    if (container.current) observer.observe(container.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={container} className="component-preview">
      {nearViewport && example ? (
        <iframe
          title={entry.name + ' 미리보기'}
          src={'?catalog-preview=1#/preview/' + entry.id + '/' + example.exportName}
        />
      ) : (
        <span className="component-preview-placeholder" aria-hidden="true">
          미리보기
        </span>
      )}
    </div>
  );
}
