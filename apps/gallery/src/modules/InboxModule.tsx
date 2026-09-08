import { useEffect, useRef, useState } from 'react';
import { Popover } from '@base-ui/react/popover';
import {
  Avatar,
  Badge,
  Button,
  Card,
  ChatBubble,
  FileInput,
  Icon,
  Textarea,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@bricks/core';
const contacts = [
  {
    id: 'lee',
    name: '이서연',
    subject: '프로젝트 초대 문의',
    question: '새로운 팀원을 프로젝트에 초대하려면 어떻게 해야 하나요?',
  },
  {
    id: 'kim',
    name: '김도현',
    subject: '파일 업로드 문의',
    question: '업로드할 수 있는 파일 형식을 알려주세요.',
  },
  { id: 'park', name: '박지우', subject: '계정 설정 문의', question: '프로필 이름을 변경하고 싶어요.' },
];
const emojis = [
  { value: '😊', label: '미소' },
  { value: '👍', label: '좋아요' },
  { value: '🙏', label: '감사' },
  { value: '❤️', label: '하트' },
  { value: '🎉', label: '축하' },
  { value: '👋', label: '인사' },
  { value: '✅', label: '완료' },
  { value: '✨', label: '반짝임' },
];
type Attachment = { id: string; name: string; size: number };
type Reply = { id: string; text: string; attachments: Attachment[] };
const fileSize = (bytes: number) =>
  bytes < 1024 * 1024
    ? `${Math.max(1, Math.ceil(bytes / 1024))} KB`
    : `${(bytes / 1024 / 1024).toFixed(1)} MB`;

export function InboxModule() {
  const root = useRef<HTMLDivElement>(null);
  const log = useRef<HTMLDivElement>(null);
  const textarea = useRef<HTMLTextAreaElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [vertical, setVertical] = useState(false);
  const [selected, setSelected] = useState('lee');
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [attachments, setAttachments] = useState<Record<string, Attachment[]>>({});
  const [replies, setReplies] = useState<Record<string, Reply[]>>({});
  const [resolved, setResolved] = useState<string[]>([]);
  const contact = contacts.find((item) => item.id === selected)!;
  const thread = replies[selected] ?? [];
  const pendingFiles = attachments[selected] ?? [];
  const draft = drafts[selected] ?? '';

  function insertEmoji(value: string) {
    const start = textarea.current?.selectionStart ?? draft.length;
    const end = textarea.current?.selectionEnd ?? draft.length;
    const next = draft.slice(0, start) + value + draft.slice(end);
    if (next.length > 500) return;
    setDrafts((current) => ({ ...current, [selected]: next }));
    setEmojiOpen(false);
    requestAnimationFrame(() => {
      textarea.current?.focus();
      textarea.current?.setSelectionRange(start + value.length, start + value.length);
    });
  }
  useEffect(() => {
    const node = root.current;
    if (!node) return;
    const observer = new ResizeObserver(() => setVertical(node.clientWidth < 560));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (log.current) log.current.scrollTop = log.current.scrollHeight;
  }, [selected, thread.length]);
  return (
    <>
      <div className="module-row">
        <Badge variant="outline">미해결 {contacts.length - resolved.length}건</Badge>
        <span className="module-small">구분선을 드래그해 보세요</span>
      </div>
      <div ref={root}>
        <Card variant="border" className="module-inbox-shell">
          <ResizablePanelGroup
            orientation={vertical ? 'vertical' : 'horizontal'}
            style={{ height: vertical ? 640 : 540 }}
          >
            <ResizablePanel defaultSize="32%" minSize="25%" maxSize="45%">
              <div className="module-inbox-list" role="group" aria-label="문의 선택">
                {contacts.map((item) => (
                  <Button
                    key={item.id}
                    variant={selected === item.id ? 'soft' : 'ghost'}
                    color={selected === item.id ? 'primary' : undefined}
                    className="module-inbox-contact"
                    aria-pressed={selected === item.id}
                    onClick={() => {
                      setSelected(item.id);
                      setEmojiOpen(false);
                    }}
                  >
                    <Avatar size="xs" initials={item.name.slice(1)} />
                    <span className="module-member">
                      <strong>{item.name}</strong>
                      <span className="module-small">{item.subject}</span>
                    </span>
                    {resolved.includes(item.id) && <Icon name="check" size={14} />}
                  </Button>
                ))}
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle aria-label="문의 목록과 대화 영역 크기 조절" />
            <ResizablePanel minSize="55%">
              <div className="module-inbox-thread">
                <div className="module-row">
                  <strong className="text-sm">{contact.name}</strong>
                  <Button
                    size="xs"
                    variant="surface"
                    onClick={() =>
                      setResolved((current) =>
                        current.includes(selected)
                          ? current.filter((id) => id !== selected)
                          : [...current, selected],
                      )
                    }
                  >
                    {resolved.includes(selected) ? '다시 열기' : '해결 완료'}
                  </Button>
                </div>
                <div
                  className="module-inbox-log"
                  ref={log}
                  role="log"
                  aria-label={`${contact.name} 대화`}
                  aria-live="polite"
                >
                  <ChatBubble side="start" header={contact.name}>
                    {contact.question}
                  </ChatBubble>
                  {thread.map((reply) => (
                    <ChatBubble key={reply.id} side="end" color="primary" header="나" footer="전송됨">
                      {reply.text && <div className="module-reply-text">{reply.text}</div>}
                      {reply.attachments.map((file) => (
                        <div key={file.id} className="module-reply-sent-file">
                          <Icon name="file" size={16} />
                          <span>
                            {file.name} <small>· {fileSize(file.size)}</small>
                          </span>
                        </div>
                      ))}
                    </ChatBubble>
                  ))}
                </div>
                <form
                  className="module-reply-form"
                  onSubmit={(event) => {
                    event.preventDefault();
                    const text = draft.trim();
                    if (!text && !pendingFiles.length) return;
                    setReplies((current) => ({
                      ...current,
                      [selected]: [
                        ...(current[selected] ?? []),
                        { id: crypto.randomUUID(), text, attachments: pendingFiles },
                      ],
                    }));
                    setDrafts((current) => ({ ...current, [selected]: '' }));
                    setAttachments((current) => ({ ...current, [selected]: [] }));
                    textarea.current?.focus();
                  }}
                >
                  <Textarea
                    ref={textarea}
                    size="sm"
                    rows={4}
                    aria-label="문의 답변"
                    placeholder="답변을 입력하세요"
                    maxLength={500}
                    value={draft}
                    onChange={(event) =>
                      setDrafts((current) => ({ ...current, [selected]: event.target.value }))
                    }
                  />
                  {pendingFiles.length > 0 && (
                    <ul className="module-reply-attachments" aria-label="첨부 대기 파일">
                      {pendingFiles.map((file) => (
                        <li key={file.id}>
                          <Icon name="file" size={14} />
                          <span title={file.name}>{file.name}</span>
                          <small>{fileSize(file.size)}</small>
                          <Button
                            type="button"
                            size="xs"
                            shape="circle"
                            variant="ghost"
                            aria-label={`${file.name} 첨부 취소`}
                            onClick={() =>
                              setAttachments((current) => ({
                                ...current,
                                [selected]: (current[selected] ?? []).filter((item) => item.id !== file.id),
                              }))
                            }
                          >
                            <Icon name="x" size={12} />
                          </Button>
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="module-reply-toolbar">
                    <div className="module-reply-tools">
                      <FileInput
                        ref={fileInput}
                        hidden
                        multiple
                        aria-label="답변 첨부파일"
                        onChange={(event) => {
                          const files = Array.from(event.target.files ?? []).map((file) => ({
                            id: crypto.randomUUID(),
                            name: file.name,
                            size: file.size,
                          }));
                          setAttachments((current) => ({
                            ...current,
                            [selected]: [...(current[selected] ?? []), ...files],
                          }));
                          event.target.value = '';
                        }}
                      />
                      <Button
                        type="button"
                        size="sm"
                        shape="circle"
                        variant="ghost"
                        aria-label="파일 첨부"
                        title="파일 첨부"
                        onClick={() => fileInput.current?.click()}
                      >
                        <Icon name="paperclip" size={18} />
                      </Button>
                      <Popover.Root open={emojiOpen} onOpenChange={setEmojiOpen}>
                        <Popover.Trigger
                          render={<Button type="button" size="sm" shape="circle" variant="ghost" />}
                          aria-label="이모지 선택"
                          title="이모지 선택"
                        >
                          <Icon name="smile" size={18} />
                        </Popover.Trigger>
                        <Popover.Portal>
                          <Popover.Positioner
                            side="top"
                            align="start"
                            sideOffset={8}
                            className="module-emoji-positioner"
                          >
                            <Popover.Popup className="module-emoji-picker" finalFocus={textarea}>
                              <Popover.Title className="module-emoji-title">이모지</Popover.Title>
                              <div className="module-emoji-grid">
                                {emojis.map((emoji) => (
                                  <Button
                                    key={emoji.label}
                                    type="button"
                                    size="sm"
                                    shape="circle"
                                    variant="ghost"
                                    aria-label={emoji.label}
                                    onClick={() => insertEmoji(emoji.value)}
                                  >
                                    <span className="module-emoji-symbol">{emoji.value}</span>
                                  </Button>
                                ))}
                              </div>
                            </Popover.Popup>
                          </Popover.Positioner>
                        </Popover.Portal>
                      </Popover.Root>
                    </div>
                    <Button
                      type="submit"
                      size="sm"
                      shape="circle"
                      color="primary"
                      aria-label="답변 전송"
                      title="답변 전송"
                      disabled={!draft.trim() && !pendingFiles.length}
                    >
                      <Icon name="send" size={16} />
                    </Button>
                  </div>
                </form>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </Card>
      </div>
    </>
  );
}
