import { useState } from 'react';
import { Avatar, AvatarGroup, Badge, Button, Checkbox, Progress } from '@bricks/core';
const tasks = ['화면 구조 정리', '공통 컴포넌트 연결', '모바일 화면 확인', '접근성 검토'];
export function ProjectsModule() {
  const [done, setDone] = useState([true, true, false, false]);
  const count = done.filter(Boolean).length;
  return (
    <>
      <div className="module-row">
        <Badge color="secondary" variant="soft">
          웹사이트 리뉴얼
        </Badge>
        <span className="module-small">{count} / 4 완료</span>
      </div>
      <Progress value={count} max={4} color="primary" size="sm" showValue aria-label="프로젝트 완료율" />
      <div className="module-stack">
        {tasks.map((task, index) => (
          <Checkbox
            key={task}
            color="primary"
            size="sm"
            label={task}
            checked={done[index]}
            onChange={(event) =>
              setDone((current) => current.map((value, i) => (i === index ? event.target.checked : value)))
            }
          />
        ))}
      </div>
      <div className="module-row">
        <AvatarGroup size="xs">
          <Avatar initials="서준" color="primary" />
          <Avatar initials="하윤" color="secondary" />
          <Avatar initials="민서" />
        </AvatarGroup>
        <Badge variant="outline">{count === 4 ? '출시 준비 완료' : '진행 중'}</Badge>
      </div>
      <Button variant="surface" size="sm" onClick={() => setDone([false, false, false, false])}>
        체크리스트 초기화
      </Button>
    </>
  );
}
