import { CodeBlock } from '../components/CodeBlock';
import { Glyph } from '../components/Glyph';
import { catalogHref, detailHref, scrollToSection } from '../router';
export function Guide() {
  return (
    <div className="article-layout">
      <article className="detail-article guide-article">
        <div className="page-breadcrumb">
          Documentation
          <Glyph name="chevron" size={12} />
          <span>Introduction</span>
        </div>
        <header className="page-heading">
          <span className="eyebrow">LET'S BUILD SOMETHING</span>
          <h1>좋은 시작을 위한 도구.</h1>
          <p>
            DOI는 DOI INC 컴포넌트 라이브러리를 탐색하고 활용하는 공간입니다. 일관된 디자인과 실제 동작하는
            예제로 제품을 만들어 보세요.
          </p>
        </header>
        <div className="guide-note">
          <Glyph name="book" size={20} />
          <p>
            React 18·19와 TypeScript를 지원합니다. 아래 안내는 현재 저장소의 npm workspaces 구성을 기준으로
            합니다.
          </p>
        </div>
        <section id="installation" className="doc-section">
          <h2>Installation</h2>
          <div className="guide-step">
            <span>1</span>
            <div>
              <h3>의존성 설치</h3>
              <p>저장소 루트에서 필요한 패키지를 설치하세요.</p>
              <CodeBlock title="Terminal · 저장소 루트" code="npm install" />
            </div>
          </div>
          <div className="guide-step">
            <span>2</span>
            <div>
              <h3>컴포넌트와 스타일 빌드</h3>
              <p>JavaScript, 타입 선언과 CSS 번들을 생성합니다.</p>
              <CodeBlock title="Terminal" code="npm run build:all" />
            </div>
          </div>
          <div className="guide-step">
            <span>3</span>
            <div>
              <h3>앱에서 사용하기</h3>
              <p>
                현재 갤러리는 워크스페이스의 소스를 직접 참조합니다. 빌드한 패키지를 사용하는 앱에서는 아래와
                같이 불러옵니다.
              </p>
              <CodeBlock
                title="App.tsx"
                code={
                  'import \'@bricks/core/styles\';\nimport { Button, Card } from \'@bricks/core\';\n\nexport function App() {\n  return (\n    <Card variant="border">\n      <Card.Body>\n        <Card.Title>Hello, DOI.</Card.Title>\n        <p>새로운 아이디어를 시작하세요.</p>\n        <Button color="primary">시작하기</Button>\n      </Card.Body>\n    </Card>\n  );\n}'
                }
              />
            </div>
          </div>
        </section>
        <section id="development" className="doc-section">
          <h2>Development</h2>
          <p>갤러리와 Storybook을 각각 실행할 수 있습니다.</p>
          <CodeBlock title="Gallery · localhost:5180" code="npm run gallery" />
          <CodeBlock title="Storybook · localhost:6006" code="npm run storybook" />
          <p>
            다른 저장소에서 사용하려면 빌드 후 packages/bricks에서 npm pack으로 패키지를 만들고 생성된 파일을
            설치하세요.
          </p>
        </section>
        <section id="theming" className="doc-section">
          <h2>Theming</h2>
          <p>
            bricks-light와 bricks-dark는 같은 의미의 색상 토큰을 공유합니다. 루트 요소의 data-theme 속성으로
            전환합니다.
          </p>
          <p>
            화이트·다크 바탕과 회색 단계로 표면, 박스, 테두리를 구분합니다. 프라임 컬러는 검정이며 다크
            모드에서는 밝은 무채색으로 전환됩니다. 프라임 컬러는 핵심 동작과 선택 상태에, 서브 바이올렛은 보조
            강조와 중요한 지표에 사용합니다.
          </p>
          <CodeBlock
            title="index.html"
            code={
              '<html lang="ko" data-theme="bricks-light">\n  <!-- Use bricks-dark for dark mode. -->\n</html>'
            }
          />
          <div className="token-swatches">
            {['base-100', 'base-200', 'base-300', 'primary', 'secondary'].map((token) => (
              <div key={token}>
                <span style={{ background: 'var(--color-' + token + ')' }} />
                <code>{token}</code>
              </div>
            ))}
          </div>
          <p>
            공통 rem 기준은 16px이며, 일반 UI 본문·버튼·라벨은 14px, 보조 문구는 12px, 카드 제목은 16px입니다.
            버튼과 입력 필드는 0.5rem, 카드는 0.75rem 모서리를 사용하고, 명시적인 circle 변형은 원형을
            유지합니다.
          </p>
        </section>
        <section id="next" className="doc-section">
          <h2>What's next?</h2>
          <div className="guide-next">
            <a href={catalogHref}>
              <Glyph name="grid" />
              <strong>컴포넌트 둘러보기</strong>
              <Glyph name="arrow" />
            </a>
            <a href={detailHref('button')}>
              <Glyph name="code" />
              <strong>첫 번째 버튼 만들기</strong>
              <Glyph name="arrow" />
            </a>
          </div>
        </section>
      </article>
      <aside className="page-toc">
        <p>On this page</p>
        {[
          ['installation', '설치'],
          ['development', '개발 환경'],
          ['theming', '테마'],
          ['next', '다음 단계'],
        ].map(([id, title]) => (
          <button key={id} onClick={() => scrollToSection(id)}>
            {title}
          </button>
        ))}
      </aside>
    </div>
  );
}
