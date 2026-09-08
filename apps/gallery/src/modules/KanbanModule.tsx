import { useState } from 'react';
import {
  Avatar,
  Badge,
  Button,
  Card,
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
  Icon,
  Input,
  Select,
} from '@bricks/core';

const columns = [
  { value: 'todo', label: '할 일' },
  { value: 'doing', label: '진행 중' },
  { value: 'done', label: '완료' },
];
const initialTasks = [
  { id: 'task-1', title: '모바일 화면 검토', owner: '지윤', status: 'todo' },
  { id: 'task-2', title: '컴포넌트 가이드 작성', owner: '민수', status: 'todo' },
  { id: 'task-3', title: '온보딩 화면 제작', owner: '서연', status: 'doing' },
  { id: 'task-4', title: '디자인 토큰 정리', owner: '지윤', status: 'done' },
];
export function KanbanModule() {
  const [tasks, setTasks] = useState(initialTasks);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('카드의 상태를 선택하거나 우클릭으로 작업 메뉴를 열어보세요.');
  const move = (id: string, status: string) => {
    setTasks((current) => current.map((task) => (task.id === id ? { ...task, status } : task)));
    setMessage(`작업을 ${columns.find((column) => column.value === status)?.label}으로 이동했습니다.`);
  };
  return (
    <>
      <form
        className="module-inline-fields"
        onSubmit={(event) => {
          event.preventDefault();
          if (!title.trim()) return;
          setTasks((current) => [
            ...current,
            { id: crypto.randomUUID(), title: title.trim(), owner: '나', status: 'todo' },
          ]);
          setTitle('');
          setMessage('새 작업을 추가했습니다.');
        }}
      >
        <Input
          size="sm"
          aria-label="새 작업 이름"
          placeholder="새 작업 이름"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          maxLength={60}
        />
        <Button size="sm" color="primary" type="submit" disabled={!title.trim()}>
          <Icon name="plus" size={14} />
          작업 추가
        </Button>
      </form>
      <div className="module-kanban">
        {columns.map((column) => (
          <section key={column.value} aria-label={column.label} className="module-stack">
            <div className="module-row">
              <strong className="text-sm">{column.label}</strong>
              <Badge variant="outline" size="sm">
                {tasks.filter((task) => task.status === column.value).length}
              </Badge>
            </div>
            {tasks
              .filter((task) => task.status === column.value)
              .map((task) => (
                <ContextMenu key={task.id}>
                  <ContextMenuTrigger aria-label={`${task.title} 작업 메뉴`}>
                    <Card variant="border" size="sm">
                      <Card.Body>
                        <p className="text-sm font-medium">{task.title}</p>
                        <div className="module-row">
                          <Avatar initials={task.owner} size="xs" />
                          <span className="module-small">{task.owner}</span>
                        </div>
                        <Select
                          size="sm"
                          className="w-full"
                          aria-label={`${task.title} 상태`}
                          value={task.status}
                          options={columns}
                          onChange={(event) => move(task.id, event.target.value)}
                        />
                      </Card.Body>
                    </Card>
                  </ContextMenuTrigger>
                  <ContextMenuContent>
                    <ContextMenuGroup>
                      <ContextMenuLabel>{task.title}</ContextMenuLabel>
                      {columns.map((target) => (
                        <ContextMenuItem
                          key={target.value}
                          disabled={target.value === task.status}
                          onClick={() => move(task.id, target.value)}
                        >
                          {target.label}으로 이동
                        </ContextMenuItem>
                      ))}
                      <ContextMenuSeparator />
                      <ContextMenuItem
                        variant="destructive"
                        onClick={() => {
                          setTasks((current) => current.filter((item) => item.id !== task.id));
                          setMessage('작업을 삭제했습니다.');
                        }}
                      >
                        <Icon name="trash-2" size={14} />
                        작업 삭제
                      </ContextMenuItem>
                    </ContextMenuGroup>
                  </ContextMenuContent>
                </ContextMenu>
              ))}
            {!tasks.some((task) => task.status === column.value) && (
              <p className="module-small">아직 작업이 없습니다.</p>
            )}
          </section>
        ))}
      </div>
      <p role="status" className="module-small">
        {message}
      </p>
    </>
  );
}
