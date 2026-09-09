import {
  Badge,
  Button,
  Card,
  Icon,
  Textarea,
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@bricks/core';
import { LayoutOptions } from './LayoutOptions';
import { useLayoutDocument } from './useLayoutDocument';
import { useLayoutPanels } from './useLayoutPanels';
import { LayoutChat } from './LayoutChat';

export function ThreeColumnLayout() {
  const {
    workspace,
    contentHeader,
    chatColumn,
    chatPanel,
    panelId,
    chatDocked,
    setChatDocked,
    desktop,
    initialChatWidth,
    rememberChatWidth,
  } = useLayoutPanels();
  const { documents, document, display, selectDocument, updateDocument, updateDisplay, resetDisplay } =
    useLayoutDocument();
  const { compact, showGuide, showCount, fontSize, lineHeight, alignment } = display;
  const { status, priority, readOnly } = document;

  return (
    <Card
      ref={workspace}
      variant="border"
      className="three-column-demo"
      data-compact={compact}
      data-chat-docked={chatDocked}
    >
      <nav className="three-column-menu" aria-label="예제 문서 메뉴">
        <div className="three-column-brand" aria-label="DOI LABS">
          <span className="three-column-brand-mark">
            <Icon name="blocks" size={18} />
          </span>
          <span>DOI LABS</span>
        </div>
        <div className="three-column-region-title">
          <Icon name="file" size={16} />
          메뉴
        </div>
        <p className="three-column-caption">워크스페이스</p>
        {documents.map((item) => (
          <Button
            key={item.id}
            size="sm"
            variant={document.id === item.id ? 'soft' : 'ghost'}
            color={document.id === item.id ? 'primary' : undefined}
            aria-pressed={document.id === item.id}
            onClick={() => selectDocument(item.id)}
          >
            <Icon name="file" size={14} />
            {item.name}
          </Button>
        ))}
        <div className="three-column-menu-note">
          DOI INC
          <br />
          <span>팀의 작업을 한곳에서</span>
        </div>
      </nav>

      <ResizablePanelGroup
        className="three-column-content-panels"
        disabled={!chatDocked || !desktop}
        onLayoutChanged={rememberChatWidth}
      >
        <ResizablePanel
          id={`${panelId}-editor`}
          minSize={desktop ? 240 : 0}
          className="three-column-editor-panel"
        >
          <section className="three-column-content" aria-label="예제 콘텐츠 영역">
            <div className="three-column-content-scroll">
              <div ref={contentHeader} className="three-column-content-top">
                <span className="three-column-caption">워크스페이스 / {document.name}</span>
                <div className="three-column-badges">
                  {priority === 'high' && (
                    <Badge color="secondary" variant="soft">
                      우선 처리
                    </Badge>
                  )}
                  <Badge variant="outline">{status === 'draft' ? '작성 중' : '검토 준비'}</Badge>
                  {readOnly && <Badge variant="outline">읽기 전용</Badge>}
                </div>
              </div>
              <div className="three-column-editor">
                <span className="eyebrow">CONTENT</span>
                <h2>{document.title || '제목 없는 문서'}</h2>
                <p className="three-column-caption">아이디어를 정리하고 내용을 자유롭게 작성해 보세요.</p>
                <label className="three-column-field">
                  <span>문서 내용</span>
                  <Textarea
                    aria-label="문서 내용"
                    value={document.body}
                    rows={9}
                    readOnly={readOnly}
                    style={{ fontSize, lineHeight, textAlign: alignment }}
                    onChange={(event) => updateDocument({ body: event.target.value })}
                  />
                </label>
                {showGuide && (
                  <div className="three-column-guide">
                    <Icon name="sliders-horizontal" size={18} />
                    <div>
                      <strong>화면에 맞게 조정하세요</strong>
                      <p>오른쪽 옵션에서 제목, 상태, 콘텐츠 간격을 바꿀 수 있습니다.</p>
                    </div>
                  </div>
                )}
              </div>
              <footer className="three-column-content-footer">
                <span>{showCount ? `${document.body.length}자` : '문서 편집기'}</span>
                <span>이 화면에서만 유지됩니다.</span>
              </footer>
            </div>
            <LayoutChat dockContainer={chatColumn} onDockChange={setChatDocked} />
          </section>
        </ResizablePanel>
        {chatDocked && desktop && (
          <ResizableHandle
            withHandle
            className="three-column-chat-divider"
            aria-label="채팅 컬럼 너비 조절"
          />
        )}
        <ResizablePanel
          id={`${panelId}-chat`}
          panelRef={chatPanel}
          defaultSize={chatDocked ? initialChatWidth : 0}
          minSize={chatDocked && desktop ? 280 : 0}
          maxSize={chatDocked ? undefined : 0}
          className="three-column-chat-panel"
        >
          <div
            ref={chatColumn}
            className="three-column-chat-slot"
            role="complementary"
            aria-label="채팅 사이드 컬럼"
            hidden={!chatDocked}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
      <LayoutOptions
        document={document}
        display={display}
        onDocumentChange={updateDocument}
        onDisplayChange={updateDisplay}
        onResetDisplay={resetDisplay}
      />
    </Card>
  );
}
