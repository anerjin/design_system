import { useState } from 'react';
import { registry, type ComponentDoc, type StoryExample } from '../registry';
import { catalogHref, detailHref, docsHref, scrollToSection } from '../router';
import { CodeBlock } from '../components/CodeBlock';
import { InlineCode } from '../components/InlineCode';
import { ExamplePanel } from '../components/ExamplePanel';
import { Glyph } from '../components/Glyph';
import { PageIdentity } from '../components/PageIdentity';

export function Detail({ entry }: { entry: ComponentDoc }) {
  const index = registry.findIndex((item) => item.id === entry.id);
  const previous = registry[index - 1];
  const next = registry[index + 1];
  const first = entry.examples[0];
  return (
    <div className="article-layout">
      <article className="detail-article" data-page-id={entry.pageId}>
        <div className="page-breadcrumb">
          <a href={catalogHref}>Components</a>
          <Glyph name="chevron" size={12} />
          <span>{entry.name}</span>
        </div>
        <header className="page-heading">
          <div className="detail-title-row">
            <h1>{entry.name}</h1>
            <span className="subtle-badge">{entry.category}</span>
          </div>
          <p>{entry.description}</p>
          <PageIdentity pageId={entry.pageId} />
          <div className="detail-meta">
            <span>
              <span className="release-dot" />
              {entry.examples.length} examples
            </span>
            <span>React & TypeScript</span>
          </div>
        </header>
        {first && (
          <section id="preview" className="doc-section">
            <ExamplePanel entry={entry} example={first} />
          </section>
        )}
        <section id="usage" className="doc-section">
          <h2>Usage</h2>
          <p>패키지의 스타일을 한 번 불러온 뒤 컴포넌트를 사용하세요.</p>
          <CodeBlock
            title="앱 엔트리"
            code={"import '@bricks/core/styles';\nimport * as Bricks from '@bricks/core';"}
          />
          <a className="inline-doc-link" href={docsHref}>
            설치 및 프로젝트 설정
            <Glyph name="right" size={14} />
          </a>
        </section>
        <section id="examples" className="doc-section">
          <h2>
            Examples<span className="section-count">{entry.examples.length}</span>
          </h2>
          <p>각 변형의 동작과 실제 스토리 소스를 확인하세요.</p>
          <div className="example-list">
            {entry.examples.map((example) => (
              <ExampleDisclosure key={entry.id + '/' + example.exportName} entry={entry} example={example} />
            ))}
          </div>
        </section>
        {entry.props && entry.props.length > 0 && (
          <section id="api" className="doc-section">
            <h2>API Reference</h2>
            <p>컴포넌트의 주요 속성과 기본값입니다.</p>
            <div className="props-table-wrap">
              <table className="props-table">
                <thead>
                  <tr>
                    <th>Prop</th>
                    <th>Type</th>
                    <th>Default</th>
                  </tr>
                </thead>
                <tbody>
                  {entry.props.map((prop) => (
                    <tr key={prop.name}>
                      <td>
                        <code>{prop.name}</code>
                        {prop.description && <small>{prop.description}</small>}
                      </td>
                      <td>
                        <code>{prop.type}</code>
                      </td>
                      <td>
                        <code>{prop.defaultValue ?? '—'}</code>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
        <nav className="doc-pagination" aria-label="인접 컴포넌트">
          {previous ? (
            <a href={detailHref(previous.id)}>
              <small>Previous</small>
              <span>
                <Glyph name="left" />
                {previous.name}
              </span>
            </a>
          ) : (
            <span />
          )}
          {next && (
            <a href={detailHref(next.id)}>
              <small>Next</small>
              <span>
                {next.name}
                <Glyph name="right" />
              </span>
            </a>
          )}
        </nav>
      </article>
      <aside className="page-toc">
        <p>On this page</p>
        <button onClick={() => scrollToSection('preview')}>미리보기</button>
        <button onClick={() => scrollToSection('usage')}>사용법</button>
        <button onClick={() => scrollToSection('examples')}>예제</button>
        {!!entry.props?.length && <button onClick={() => scrollToSection('api')}>API Reference</button>}
        <div className="toc-callout">
          <Glyph name="grid" size={21} />
          <strong>작은 단위, 무한한 조합.</strong>
          <p>다음 인터페이스에 필요한 컴포넌트를 찾아보세요.</p>
          <a href={catalogHref}>
            컴포넌트 탐색
            <Glyph name="arrow" size={13} />
          </a>
        </div>
      </aside>
    </div>
  );
}
function ExampleDisclosure({ entry, example }: { entry: ComponentDoc; example: StoryExample }) {
  const [open, setOpen] = useState(true);
  return (
    <details className="example-disclosure" open={open} onToggle={(event) => setOpen(event.currentTarget.open)}>
      <summary>
        <span>{example.title}</span>
        <Glyph name="plus" size={16} />
      </summary>
      {open && (
        <div>
          {example.description && (
            <p className="example-description">
              <InlineCode>{example.description}</InlineCode>
            </p>
          )}
          <ExamplePanel entry={entry} example={example} />
        </div>
      )}
    </details>
  );
}
