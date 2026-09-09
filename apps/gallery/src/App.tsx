import { useEffect, useRef, useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { BrandMark, Glyph } from './components/Glyph';
import { SearchDialog } from './components/SearchDialog';
import { Catalog } from './pages/Catalog';
import { Detail } from './pages/Detail';
import { Modules } from './pages/Modules';
import { Layout } from './pages/Layout';
import { Guide } from './pages/Guide';
import { catalogHref, docsHref, homeHref, modulesHref, layoutHref, useRoute } from './router';
import { findEntry, registry } from './registry';
import { findLayout } from './layouts/catalog';

export function App() {
  const route = useRoute();
  const [searchOpen, setSearchOpen] = useState(false);
  const [moduleCategory, setModuleCategory] = useState('전체');
  const [dark, setDark] = useState(() => document.documentElement.dataset.theme === 'bricks-dark');
  const menu = useRef<HTMLDialogElement>(null);
  const entry = route.name === 'detail' ? findEntry(route.id) : undefined;
  const isHome = route.name === 'home';
  const isLayout = route.name === 'layout';
  const layout = route.name === 'layout' ? findLayout(route.id) : undefined;
  useEffect(() => {
    const keydown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setSearchOpen((open) => !open);
      }
    };
    window.addEventListener('keydown', keydown);
    return () => window.removeEventListener('keydown', keydown);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'bricks-dark' : 'bricks-light';
    try {
      localStorage.setItem('doi-appearance', dark ? 'dark' : 'light');
    } catch {
      /* Storage may be unavailable. */
    }
  }, [dark]);
  useEffect(() => {
    document.title =
      (entry?.name ??
        (isHome ? '모듈' : layout ? layout.title : route.name === 'docs' ? '시작하기' : '컴포넌트')) +
      ' — doi ui/ux';
    menu.current?.close();
  }, [route.name, entry, isHome, layout]);
  return (
    <>
      <a
        href="#main-content"
        className="skip-link"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById('main-content')?.focus();
        }}
      >
        본문으로 건너뛰기
      </a>
      <header className="site-header is-fluid">
        <div className="header-inner">
          <button
            className="icon-button mobile-menu"
            aria-label="메뉴 열기"
            onClick={() => menu.current?.showModal()}
          >
            <Glyph name="menu" size={20} />
          </button>
          <a href={homeHref} className="brand" aria-label="doi ui/ux 홈">
            <BrandMark />
            <span>doi ui/ux</span>
          </a>
          <nav className="top-nav" aria-label="주요 메뉴">
            <a href={docsHref} aria-current={route.name === 'docs' ? 'page' : undefined}>
              문서
            </a>
            <a
              href={catalogHref}
              aria-current={route.name === 'catalog' || route.name === 'detail' ? 'page' : undefined}
            >
              컴포넌트
            </a>
            <a href={modulesHref} aria-current={isHome ? 'page' : undefined}>
              모듈
            </a>
            <a href={layoutHref} aria-current={isLayout ? 'page' : undefined}>
              레이아웃
            </a>
          </nav>
          <div className="header-actions">
            <button className="search-trigger" aria-label="컴포넌트 검색" onClick={() => setSearchOpen(true)}>
              <Glyph name="search" />
              <span>컴포넌트 검색...</span>
              <kbd>Ctrl K</kbd>
            </button>
            <span className="header-divider" />
            <button
              className="icon-button"
              aria-label={dark ? '라이트 모드로 전환' : '다크 모드로 전환'}
              onClick={() => setDark((value) => !value)}
            >
              <Glyph name={dark ? 'moon' : 'sun'} size={19} />
            </button>
            <a href={docsHref} className="ui-button primary header-start">
              시작하기
              <Glyph name="right" size={14} />
            </a>
          </div>
        </div>
      </header>
      <div className={'site-container docs-layout docs-fluid' + (isLayout ? ' layout-workspace' : '')}>
        <aside className="desktop-sidebar">
          <Sidebar
            entries={registry}
            activeId={entry?.id}
            docs={route.name === 'docs'}
            page={isHome ? 'home' : isLayout ? 'layout' : undefined}
            activeLayoutId={route.name === 'layout' && route.id ? layout?.pageId : undefined}
            moduleCategory={moduleCategory}
            onModuleCategoryChange={setModuleCategory}
          />
        </aside>
        <main id="main-content" tabIndex={-1} className={isLayout || isHome ? 'module-main' : 'docs-main'}>
          {isHome ? (
            <Modules category={moduleCategory} onCategoryChange={setModuleCategory} />
          ) : isLayout ? (
            <Layout layoutId={layout?.pageId} />
          ) : route.name === 'docs' ? (
            <Guide />
          ) : route.name === 'catalog' ? (
            <Catalog />
          ) : entry ? (
            <Detail key={entry.id} entry={entry} />
          ) : (
            <div className="empty-state">
              <Glyph name="search" size={28} />
              <h1>컴포넌트를 찾을 수 없습니다</h1>
              <a className="ui-button" href={catalogHref}>
                전체 컴포넌트 보기
              </a>
            </div>
          )}
        </main>
      </div>
      <footer className="site-footer is-fluid">
        <div>
          <a href={homeHref} className="footer-brand">
            <BrandMark />
            doi ui/ux
          </a>
          <p>좋은 인터페이스를 만드는 작은 단위들.</p>
          <span>Built with DOI INC · React & TypeScript</span>
        </div>
      </footer>
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
      <dialog
        ref={menu}
        className="mobile-dialog"
        aria-label="탐색 메뉴"
        onClick={(event) => {
          if (event.target === menu.current) menu.current?.close();
        }}
      >
        <div className="mobile-dialog-heading">
          <a href={homeHref} className="brand" onClick={() => menu.current?.close()}>
            <BrandMark />
            doi ui/ux
          </a>
          <button className="icon-button" aria-label="메뉴 닫기" onClick={() => menu.current?.close()}>
            <Glyph name="close" />
          </button>
        </div>
        <Sidebar
          entries={registry}
          activeId={entry?.id}
          docs={route.name === 'docs'}
          page={isHome ? 'home' : isLayout ? 'layout' : undefined}
          activeLayoutId={route.name === 'layout' && route.id ? layout?.pageId : undefined}
          moduleCategory={moduleCategory}
          onModuleCategoryChange={setModuleCategory}
          onNavigate={() => menu.current?.close()}
        />
      </dialog>
    </>
  );
}
