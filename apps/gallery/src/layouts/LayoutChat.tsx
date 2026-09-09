import { useEffect, useId, useMemo, useRef, useState, type RefObject } from 'react';
import { Dialog } from '@base-ui/react/dialog';
import { createPortal } from 'react-dom';
import { Avatar, Button, ChatBubble, Icon, Textarea } from '@bricks/core';
import { useChatWindow } from './useChatWindow';
import './layout-chat.css';
import { ChatModelPicker } from './ChatModelPicker';
import { exampleChatModels, readModelPreferences, saveModelPreferences, type ChatModel } from './chatModels';

export function LayoutChat({
  models = exampleChatModels,
  modelSourceLabel = '예시 모델 목록',
  dockContainer,
  onDockChange,
}: {
  models?: ChatModel[];
  modelSourceLabel?: string;
  dockContainer?: RefObject<HTMLDivElement>;
  onDockChange?: (docked: boolean) => void;
} = {}) {
  const {
    open,
    minimized,
    docked,
    rect,
    iconRect,
    interaction,
    input,
    trigger,
    popup,
    iconButton,
    openChat,
    onOpenChange,
    toggleDock,
    minimizeChat,
    interactionProps,
    onIconClick,
  } = useChatWindow({ dockContainer, onDockChange });
  const popupId = useId();
  const log = useRef<HTMLDivElement>(null);
  const [draft, setDraft] = useState('');
  const [model, setModel] = useState(() => {
    const saved = readModelPreferences('doi-chat-selected-model')[0];
    return saved ?? models[0]?.id ?? '';
  });
  const [messages, setMessages] = useState<{ id: string; text: string; model: string; modelId: string }[]>(
    [],
  );
  const selectedModel = useMemo(() => models.find((item) => item.id === model), [models, model]);
  useEffect(() => {
    // An API catalog can arrive after mount; retain an explicitly selected or saved ID.
    if (!model && models.length) setModel(models[0].id);
  }, [models, model]);
  useEffect(() => {
    if (open && !minimized && log.current) log.current.scrollTop = log.current.scrollHeight;
  }, [open, minimized, docked, messages.length]);

  function send() {
    const text = draft.trim();
    if (!text) return;
    if (!selectedModel) return;
    setMessages((current) => [
      ...current,
      { id: crypto.randomUUID(), text, model: selectedModel.name, modelId: selectedModel.id },
    ]);
    setDraft('');
    input.current?.focus();
  }

  return (
    <Dialog.Root modal={false} disablePointerDismissal open={open && !minimized} onOpenChange={onOpenChange}>
      <Button
        ref={trigger}
        className="layout-chat-launcher"
        hidden={open}
        shape="circle"
        color="primary"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? popupId : undefined}
        onClick={openChat}
        aria-label="채팅 열기"
        title="채팅 열기"
      >
        <Icon name="messages-square" size={22} />
      </Button>
      {open &&
        minimized &&
        iconRect &&
        createPortal(
          <Button
            ref={iconButton}
            className="layout-chat-minimized"
            shape="circle"
            color="primary"
            style={iconRect}
            aria-label="채팅창 다시 열기"
            aria-haspopup="dialog"
            title="클릭하여 채팅 열기 · 드래그 또는 방향키로 이동"
            {...interactionProps('icon')}
            onClick={onIconClick}
          >
            <Icon name="messages-square" size={22} />
          </Button>,
          document.body,
        )}
      <Dialog.Portal container={docked ? dockContainer : undefined}>
        <Dialog.Popup
          ref={popup}
          id={popupId}
          className="layout-chat-popup"
          initialFocus={input}
          finalFocus={minimized ? iconButton : trigger}
          style={docked ? undefined : (rect ?? undefined)}
          data-docked={docked}
          data-interaction={interaction ?? undefined}
        >
          <header className="layout-chat-header">
            <div
              className="layout-chat-drag-handle"
              role={docked ? undefined : 'button'}
              tabIndex={docked ? undefined : 0}
              aria-label={docked ? undefined : '채팅창 이동'}
              title={docked ? undefined : '드래그하여 이동 · 방향키로 이동'}
              {...interactionProps('move')}
            >
              <Icon name="messages-square" size={18} />
              <Dialog.Title>DOI LABS 채팅</Dialog.Title>
            </div>
            {dockContainer && (
              <Button
                variant="ghost"
                size="sm"
                shape="circle"
                aria-label={docked ? '채팅창 띄우기' : '채팅창 사이드에 배치'}
                title={docked ? '채팅창 띄우기' : '사이드 컬럼으로 배치'}
                aria-pressed={docked}
                onClick={toggleDock}
              >
                <Icon name={docked ? 'panels-top-left' : 'panel-right'} size={16} />
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              shape="circle"
              aria-label="채팅창 아이콘으로 접기"
              title="아이콘으로 접기"
              onClick={minimizeChat}
            >
              <Icon name="minus" size={16} />
            </Button>
            <Dialog.Close
              render={<Button variant="ghost" size="sm" shape="circle" />}
              aria-label="채팅 창 닫기"
            >
              <Icon name="x" size={16} />
            </Dialog.Close>
          </header>
          <Dialog.Description className="layout-chat-description">
            AI 연결 전 데모입니다. 메시지는 현재 화면에서만 유지됩니다.
          </Dialog.Description>
          <div
            ref={log}
            className="layout-chat-log"
            role="log"
            aria-label="채팅 대화"
            aria-live="polite"
            aria-relevant="additions"
          >
            <ChatBubble side="start" header="DOI LABS" avatar={<Avatar size="xs" initials="DO" />}>
              안녕하세요! 이곳에서 메시지를 작성해 보세요.
            </ChatBubble>
            {messages.map((message) => (
              <ChatBubble
                key={message.id}
                side="end"
                color="primary"
                header="나"
                footer={<span title={message.modelId}>선택 모델: {message.model}</span>}
              >
                {message.text}
              </ChatBubble>
            ))}
          </div>
          <form
            className="layout-chat-compose"
            onSubmit={(event) => {
              event.preventDefault();
              send();
            }}
          >
            <Textarea
              ref={input}
              rows={2}
              size="sm"
              aria-label="채팅 메시지"
              placeholder="메시지를 입력하세요…"
              title="Enter 전송 · Shift+Enter 줄바꿈"
              value={draft}
              maxLength={2000}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (
                  event.key === 'Enter' &&
                  !event.shiftKey &&
                  !event.nativeEvent.isComposing &&
                  event.keyCode !== 229
                ) {
                  event.preventDefault();
                  send();
                }
              }}
            />
            <div className="layout-chat-compose-tools">
              <ChatModelPicker
                models={models}
                sourceLabel={modelSourceLabel}
                value={model}
                onChange={(selected) => {
                  setModel(selected.id);
                  saveModelPreferences('doi-chat-selected-model', [selected.id]);
                }}
              />
              <Button
                type="submit"
                size="sm"
                shape="circle"
                color="primary"
                aria-label="채팅 메시지 보내기"
                disabled={!draft.trim() || !selectedModel}
              >
                <Icon name="send" size={16} />
              </Button>
            </div>
          </form>
          {!docked && (
            <button
              type="button"
              className="layout-chat-resize-handle"
              aria-label="채팅창 크기 조절"
              title="모서리를 드래그하여 크기 조절 · 방향키로 조절"
              {...interactionProps('resize')}
            >
              <span className="layout-chat-resize-grip" aria-hidden="true" />
            </button>
          )}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
