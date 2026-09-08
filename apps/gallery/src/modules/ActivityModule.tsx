import { useState } from 'react';
import { Avatar, Badge, Button, List, Tabs } from '@bricks/core';
const initial = [
  {
    id: 'event-1',
    name: '김지윤',
    text: '디자인 검토를 요청했습니다.',
    target: '웹사이트 리뉴얼',
    time: '5분 전',
    read: false,
  },
  {
    id: 'event-2',
    name: '박민수',
    text: '새 파일을 업로드했습니다.',
    target: '브랜드 가이드 v2',
    time: '20분 전',
    read: false,
  },
  {
    id: 'event-3',
    name: '이서연',
    text: '작업을 완료했습니다.',
    target: '모바일 내비게이션',
    time: '1시간 전',
    read: true,
  },
  {
    id: 'event-4',
    name: '정하늘',
    text: '댓글을 남겼습니다.',
    target: '컴포넌트 문서',
    time: '2시간 전',
    read: true,
  },
];
export function ActivityModule() {
  const [events, setEvents] = useState(initial);
  const [tab, setTab] = useState('activity-all');
  const unread = events.filter((event) => !event.read).length;
  const content = (onlyUnread: boolean) => {
    const visible = events.filter((event) => !onlyUnread || !event.read);
    return visible.length ? (
      <List
        aria-label="활동 목록"
        items={visible.map((event) => ({
          id: event.id,
          leading: <Avatar size="xs" initials={event.name.slice(1)} />,
          content: (
            <div className="module-member">
              <strong>{event.name}</strong>
              <span>{event.text}</span>
              <span className="module-small">
                {event.target} · {event.time}
              </span>
            </div>
          ),
          wrapped: !event.read ? (
            <Button
              size="xs"
              variant="ghost"
              onClick={() =>
                setEvents((current) =>
                  current.map((item) => (item.id === event.id ? { ...item, read: true } : item)),
                )
              }
            >
              읽음 표시
            </Button>
          ) : (
            <span className="module-small">읽음</span>
          ),
        }))}
      />
    ) : (
      <p role="status" className="module-small py-6 text-center">
        확인하지 않은 활동이 없습니다.
      </p>
    );
  };
  return (
    <>
      <div className="module-row">
        <Badge variant="outline" aria-live="polite">
          읽지 않음 {unread}개
        </Badge>
        <Button
          size="sm"
          variant="surface"
          disabled={!unread}
          onClick={() => setEvents((current) => current.map((event) => ({ ...event, read: true })))}
        >
          모두 읽음
        </Button>
      </div>
      <Tabs
        activeKey={tab}
        onChange={setTab}
        size="sm"
        variant="border"
        items={[
          { key: 'activity-all', label: '전체 활동', content: content(false) },
          { key: 'activity-unread', label: '읽지 않음', content: content(true) },
        ]}
      />
    </>
  );
}
