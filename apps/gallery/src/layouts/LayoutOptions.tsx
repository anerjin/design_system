import { Button, Icon, Input, Range, Select, Toggle } from '@bricks/core';
import type { LayoutDocument, DocumentChanges, DisplaySettings } from './useLayoutDocument';

export function LayoutOptions({
  document,
  display,
  onDocumentChange,
  onDisplayChange,
  onResetDisplay,
}: {
  document: LayoutDocument;
  display: DisplaySettings;
  onDocumentChange: (changes: DocumentChanges) => void;
  onDisplayChange: (changes: Partial<DisplaySettings>) => void;
  onResetDisplay: () => void;
}) {
  const { status, priority, readOnly } = document;
  const { fontSize, lineHeight, alignment, showCount, compact, showGuide } = display;
  return (
    <aside className="three-column-options" aria-label="예제 옵션 영역">
      <div className="three-column-region-title">
        <Icon name="sliders-horizontal" size={16} />
        옵션
      </div>
      <fieldset className="three-column-option-group">
        <legend>문서 설정</legend>
        <label className="three-column-field">
          <span>문서 제목</span>
          <Input
            size="sm"
            value={document.title}
            maxLength={80}
            readOnly={readOnly}
            onChange={(event) => onDocumentChange({ title: event.target.value })}
          />
        </label>
        <label className="three-column-field">
          <span>문서 상태</span>
          <Select
            size="sm"
            value={status}
            onChange={(event) => onDocumentChange({ status: event.target.value as LayoutDocument['status'] })}
            options={[
              { value: 'draft', label: '작성 중' },
              { value: 'review', label: '검토 준비' },
            ]}
          />
        </label>
        <label className="three-column-field">
          <span>우선순위</span>
          <Select
            size="sm"
            value={priority}
            onChange={(event) =>
              onDocumentChange({ priority: event.target.value as LayoutDocument['priority'] })
            }
            options={[
              { value: 'normal', label: '보통' },
              { value: 'high', label: '높음 · 우선 처리' },
            ]}
          />
        </label>
        <label className="three-column-switch">
          <span>읽기 전용</span>
          <Toggle
            size="sm"
            checked={readOnly}
            onChange={(event) => onDocumentChange({ readOnly: event.target.checked })}
          />
        </label>
      </fieldset>
      <fieldset className="three-column-option-group">
        <legend>텍스트 스타일</legend>
        <label className="three-column-field">
          <span className="three-column-option-label">
            글자 크기 <span>{fontSize}px</span>
          </span>
          <Range
            size="xs"
            min={12}
            max={20}
            step={1}
            value={fontSize}
            aria-label="글자 크기"
            onChange={(event) => onDisplayChange({ fontSize: Number(event.target.value) })}
          />
        </label>
        <label className="three-column-field">
          <span>줄 간격</span>
          <Select
            size="sm"
            value={lineHeight}
            onChange={(event) => onDisplayChange({ lineHeight: event.target.value })}
            options={[
              { value: '1.5', label: '좁게 · 1.5' },
              { value: '1.8', label: '기본 · 1.8' },
              { value: '2.2', label: '넓게 · 2.2' },
            ]}
          />
        </label>
        <div className="three-column-field">
          <span>텍스트 정렬</span>
          <div className="three-column-alignment" role="group" aria-label="텍스트 정렬">
            {(
              [
                { value: 'left', label: '왼쪽' },
                { value: 'center', label: '가운데' },
                { value: 'right', label: '오른쪽' },
              ] as const
            ).map((item) => (
              <Button
                key={item.value}
                size="sm"
                variant={alignment === item.value ? 'solid' : 'surface'}
                color={alignment === item.value ? 'primary' : undefined}
                aria-pressed={alignment === item.value}
                onClick={() => onDisplayChange({ alignment: item.value })}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      </fieldset>
      <fieldset className="three-column-option-group">
        <legend>화면 표시</legend>
        <label className="three-column-switch">
          <span>글자 수 표시</span>
          <Toggle
            size="sm"
            checked={showCount}
            onChange={(event) => onDisplayChange({ showCount: event.target.checked })}
          />
        </label>
        <label className="three-column-switch">
          <span>좁은 간격</span>
          <Toggle
            size="sm"
            checked={compact}
            onChange={(event) => onDisplayChange({ compact: event.target.checked })}
          />
        </label>
        <label className="three-column-switch">
          <span>도움말 표시</span>
          <Toggle
            size="sm"
            checked={showGuide}
            onChange={(event) => onDisplayChange({ showGuide: event.target.checked })}
          />
        </label>
        <Button size="sm" variant="surface" onClick={onResetDisplay}>
          화면 설정 초기화
        </Button>
      </fieldset>
    </aside>
  );
}
