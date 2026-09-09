import { useState } from 'react';

export interface LayoutDocument {
  id: string;
  name: string;
  title: string;
  body: string;
  status: 'draft' | 'review';
  priority: 'normal' | 'high';
  readOnly: boolean;
}
export type DocumentChanges = Partial<
  Pick<LayoutDocument, 'title' | 'body' | 'status' | 'priority' | 'readOnly'>
>;
export interface DisplaySettings {
  compact: boolean;
  showGuide: boolean;
  showCount: boolean;
  fontSize: number;
  lineHeight: string;
  alignment: 'left' | 'center' | 'right';
}
const defaultDisplay: DisplaySettings = {
  compact: false,
  showGuide: true,
  showCount: true,
  fontSize: 14,
  lineHeight: '1.8',
  alignment: 'left',
};

const initialDocuments: LayoutDocument[] = [
  {
    status: 'draft',
    priority: 'normal',
    readOnly: false,
    id: 'overview',
    name: '프로젝트 개요',
    title: '새로운 프로젝트를 시작해 보세요',
    body: '팀이 함께 만들어 갈 프로젝트의 목표와 방향을 정리하세요.\n\n왼쪽에서 문서를 선택하고, 이 영역에서 내용을 작성할 수 있습니다.',
  },
  {
    status: 'draft',
    priority: 'normal',
    readOnly: false,
    id: 'plan',
    name: '작업 계획',
    title: '작업 계획',
    body: '1. 목표와 요구 사항 정리\n2. 화면 구성 및 디자인\n3. 개발과 검토',
  },
  {
    status: 'draft',
    priority: 'normal',
    readOnly: false,
    id: 'notes',
    name: '회의 노트',
    title: '회의 노트',
    body: '논의한 내용과 다음에 진행할 일을 기록하세요.',
  },
];

export function useLayoutDocument() {
  const [documents, setDocuments] = useState(initialDocuments);
  const [selected, setSelected] = useState(initialDocuments[0].id);
  const [display, setDisplay] = useState(defaultDisplay);
  const document = documents.find((item) => item.id === selected) ?? documents[0];

  function selectDocument(id: string) {
    if (documents.some((item) => item.id === id)) setSelected(id);
  }
  function updateDocument(changes: DocumentChanges) {
    setDocuments((current) => current.map((item) => (item.id === selected ? { ...item, ...changes } : item)));
  }
  function updateDisplay(changes: Partial<DisplaySettings>) {
    setDisplay((current) => ({ ...current, ...changes }));
  }
  function resetDisplay() {
    setDisplay(defaultDisplay);
  }
  return { documents, document, display, selectDocument, updateDocument, updateDisplay, resetDisplay };
}
