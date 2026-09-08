import { useMemo, useState } from 'react';
import { CatalogPreview } from '../components/CatalogPreview';
import { CATEGORIES, registry, search } from '../registry';
import { detailHref } from '../router';
import { Glyph } from '../components/Glyph';

export function Catalog() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const entries = useMemo(
    () => search(query).filter((entry) => category === 'All' || entry.category === category),
    [query, category],
  );
  return (
    <div className="catalog-page">
      <div className="page-breadcrumb">
        Documentation
        <Glyph name="chevron" size={12} />
        <span>Components</span>
      </div>
      <header className="page-heading">
        <span className="eyebrow">THE BUILDING BLOCKS</span>
        <h1>Components</h1>
        <p>
          작은 버튼부터 복잡한 화면까지.
          <br />
          제품에 필요한 컴포넌트를 찾고, 직접 사용해 보세요.
        </p>
      </header>
      <div className="catalog-filter">
        <label className="catalog-search">
          <Glyph name="search" />
          <input
            aria-label="목록에서 컴포넌트 검색"
            placeholder="이름, 기능으로 검색..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          {query && (
            <button className="icon-button" aria-label="검색어 지우기" onClick={() => setQuery('')}>
              <Glyph name="close" size={14} />
            </button>
          )}
        </label>
        <span>
          {entries.length} / {registry.length} components
        </span>
      </div>
      <div className="category-filters" role="group" aria-label="카테고리 필터">
        {['All', ...CATEGORIES].map((item) => (
          <button key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>
            {item === 'All' ? '전체' : item}
          </button>
        ))}
      </div>
      <div className="component-grid">
        {entries.map((entry) => (
          <article key={entry.id} className="component-tile" data-page-id={entry.pageId}>
            <CatalogPreview entry={entry} />
            <a className="component-tile-details" href={detailHref(entry.id)}>
              <div className="component-tile-heading">
                <h2>{entry.name}</h2>
                <Glyph name="arrow" />
              </div>
              <p>{entry.description}</p>
              <footer>
                <span>{entry.category}</span>
                <span>{entry.examples.length} examples</span>
              </footer>
            </a>
          </article>
        ))}
      </div>
      {!entries.length && (
        <div className="empty-state">
          <Glyph name="search" size={28} />
          <h2>검색 결과가 없습니다</h2>
          <p>다른 검색어나 카테고리를 선택해 주세요.</p>
          <button
            className="ui-button"
            onClick={() => {
              setQuery('');
              setCategory('All');
            }}
          >
            필터 초기화
          </button>
        </div>
      )}
    </div>
  );
}
