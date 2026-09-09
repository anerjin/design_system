import { CATEGORIES, type ComponentDoc } from '../registry';
import { catalogHref, detailHref, docsHref, modulesHref, layoutHref } from '../router';
import { Glyph } from './Glyph';
import { moduleCatalog, moduleCategories } from '../modules/catalog';
import { layoutCatalog } from '../layouts/catalog';
export function Sidebar({
  entries,
  activeId,
  docs = false,
  page,
  onNavigate,
  moduleCategory = '전체',
  onModuleCategoryChange,
  activeLayoutId,
}: {
  entries: ComponentDoc[];
  activeId?: string;
  docs?: boolean;
  page?: 'home' | 'layout';
  onNavigate?: () => void;
  moduleCategory?: string;
  onModuleCategoryChange?: (category: string) => void;
  activeLayoutId?: string;
}) {
  return (
    <nav
      className="docs-sidebar"
      aria-label={page === 'home' ? '모듈 탐색' : page === 'layout' ? '레이아웃 탐색' : '문서 탐색'}
    >
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
      {page === 'home' ? (
        <div className="sidebar-group" role="group" aria-label="모듈 분류">
          <p className="sidebar-label">카테고리</p>
          {moduleCategories.map((category) => (
            <button
              key={category}
              type="button"
              aria-pressed={moduleCategory === category}
              onClick={() => {
                onModuleCategoryChange?.(category);
                onNavigate?.();
                window.scrollTo({ top: 0 });
              }}
            >
              {category}
              <span className="sidebar-count">
                {category === '전체'
                  ? moduleCatalog.length
                  : moduleCatalog.filter((module) => module.category === category).length}
              </span>
            </button>
          ))}
        </div>
      ) : page === 'layout' ? (
        <div className="sidebar-group">
          <p className="sidebar-label">레이아웃</p>
          <a href={layoutHref} aria-current={!activeLayoutId ? 'page' : undefined} onClick={onNavigate}>
            전체 레이아웃
            <span className="sidebar-count">{layoutCatalog.length}</span>
          </a>
          {layoutCatalog.map((layout) => (
            <a
              key={layout.id}
              href={`${layoutHref}?layout=${layout.pageId}`}
              aria-current={activeLayoutId === layout.pageId ? 'page' : undefined}
              onClick={onNavigate}
            >
              {layout.title}
            </a>
          ))}
        </div>
      ) : (
        CATEGORIES.map((category) => (
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
        ))
      )}
    </nav>
  );
}
