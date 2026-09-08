import { useEffect, useRef, useState } from 'react';
import { registry, search } from '../registry';
import { detailHref } from '../router';
import { Glyph } from './Glyph';
export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const results = query.trim()
    ? search(query).slice(0, 12)
    : registry.filter((entry) => ['button', 'card', 'input', 'modal', 'tabs', 'table'].includes(entry.id));
  useEffect(() => {
    if (open) {
      setQuery('');
      setSelected(0);
      dialog.current?.showModal();
    } else dialog.current?.close();
  }, [open]);
  useEffect(() => {
    document.getElementById('search-result-' + selected)?.scrollIntoView({ block: 'nearest' });
  }, [selected]);
  function navigate(index: number) {
    if (!results[index]) return;
    window.location.hash = detailHref(results[index].id);
    onClose();
  }
  return (
    <dialog
      ref={dialog}
      className="search-dialog"
      aria-label="컴포넌트 검색"
      onCancel={onClose}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialog.current) onClose();
      }}
    >
      <div className="search-dialog-input">
        <Glyph name="search" size={20} />
        <input
          autoFocus
          role="combobox"
          aria-label="컴포넌트 검색"
          aria-expanded="true"
          aria-controls="search-results"
          aria-autocomplete="list"
          aria-activedescendant={results.length ? 'search-result-' + selected : undefined}
          placeholder="컴포넌트 이름 또는 페이지 ID 검색"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setSelected(0);
          }}
          onKeyDown={(event) => {
            if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
              event.preventDefault();
              setSelected((index) =>
                Math.max(0, Math.min(results.length - 1, index + (event.key === 'ArrowDown' ? 1 : -1))),
              );
            }
            if (event.key === 'Enter') {
              event.preventDefault();
              navigate(selected);
            }
          }}
        />
        <button className="icon-button" aria-label="검색 닫기" onClick={onClose}>
          <Glyph name="close" />
        </button>
      </div>
      <p className="search-caption">
        {query ? '검색 결과 ' + results.length + '개' : '자주 사용하는 컴포넌트'}
      </p>
      <div id="search-results" role="listbox" aria-label="검색 결과" className="search-results">
        {results.map((entry, index) => (
          <div
            key={entry.id}
            id={'search-result-' + index}
            role="option"
            aria-selected={selected === index}
            className="search-result"
            onMouseMove={() => setSelected(index)}
            onClick={() => navigate(index)}
          >
            <Glyph name="grid" />
            <span>
              {entry.name}
              <code className="search-page-id">{entry.pageId}</code>
              <small>{entry.description}</small>
            </span>
            <Glyph name="right" />
          </div>
        ))}
      </div>
      {!results.length && (
        <div className="empty-state">
          <p>검색 결과가 없습니다.</p>
          <small>이름 또는 카테고리로 다시 검색해 주세요.</small>
        </div>
      )}
      <div className="search-footer">
        <span>
          <kbd>↑</kbd>
          <kbd>↓</kbd> 이동
        </span>
        <span>
          <kbd>↵</kbd> 열기
        </span>
        <span>
          <kbd>esc</kbd> 닫기
        </span>
      </div>
    </dialog>
  );
}
