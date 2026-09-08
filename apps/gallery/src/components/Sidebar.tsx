import { CATEGORIES, type ComponentDoc } from '../registry';
import { catalogHref, detailHref, docsHref, modulesHref, layoutHref } from '../router';
import { Glyph } from './Glyph';
export function Sidebar({
  entries,
  activeId,
  docs = false,
  page,
  onNavigate,
}: {
  entries: ComponentDoc[];
  activeId?: string;
  docs?: boolean;
  page?: 'home' | 'layout';
  onNavigate?: () => void;
}) {
  return (
    <nav className="docs-sidebar" aria-label="문서 탐색">
      <div className="sidebar-group">
        <p className="sidebar-label">Getting started</p>
        <a href={docsHref} aria-current={docs ? 'page' : undefined} onClick={onNavigate}>
          <Glyph name="book" />
          소개 및 설치
        </a>
        <a
          href={catalogHref}
          aria-current={!activeId && !docs && !page ? 'page' : undefined}
          onClick={onNavigate}
        >
          <Glyph name="grid" />
          컴포넌트<span className="sidebar-count">{entries.length}</span>
        </a>
        <a href={modulesHref} aria-current={page === 'home' ? 'page' : undefined} onClick={onNavigate}>
          <Glyph name="grid" />
          모듈
        </a>
        <a href={layoutHref} aria-current={page === 'layout' ? 'page' : undefined} onClick={onNavigate}>
          <Glyph name="monitor" />
          레이아웃
        </a>
      </div>
      {CATEGORIES.map((category) => (
        <div className="sidebar-group" key={category}>
          <p className="sidebar-label">{category}</p>
          {entries
            .filter((entry) => entry.category === category)
            .map((entry) => (
              <a
                key={entry.id}
                href={detailHref(entry.id)}
                aria-current={activeId === entry.id ? 'page' : undefined}
                onClick={onNavigate}
              >
                {entry.name}
              </a>
            ))}
        </div>
      ))}
    </nav>
  );
}
