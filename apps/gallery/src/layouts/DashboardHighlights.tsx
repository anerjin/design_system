import { useState } from 'react';
import { Avatar, Badge, Button, Card, Checkbox, Icon } from '@bricks/core';
import { dashboardTeam, type DashboardProject } from './dashboardData';

const agenda = [
  {
    id: 'standup',
    time: '09:30',
    title: '팀 데일리 스탠드업',
    note: '오늘의 우선순위 공유',
    duration: '15분',
  },
  {
    id: 'review',
    time: '11:00',
    title: '브랜드 웹사이트 디자인 리뷰',
    note: '디자인 · 개발팀',
    duration: '45분',
  },
  {
    id: 'handoff',
    time: '15:00',
    title: '컴포넌트 개발 핸드오프',
    note: '디자인 시스템 2.0',
    duration: '30분',
  },
];

export function DashboardDaily({
  projects,
  onMember,
}: {
  projects: DashboardProject[];
  onMember: (name: string) => void;
}) {
  const [finished, setFinished] = useState<string[]>(['standup']);
  const active = projects.filter((project) => project.status !== 'done');
  return (
    <div className="dashboard-daily-grid">
      <Card variant="border" className="dashboard-panel dashboard-agenda">
        <Card.Header>
          <Card.Title level="h3">오늘의 일정</Card.Title>
          <Badge variant="outline" size="sm">
            {finished.length} / {agenda.length} 완료
          </Badge>
        </Card.Header>
        <Card.Body>
          <ol className="dashboard-agenda-list">
            {agenda.map((item) => (
              <li key={item.id} data-done={finished.includes(item.id)}>
                <time>{item.time}</time>
                <div className="dashboard-agenda-task">
                  <Checkbox
                    size="xs"
                    color="primary"
                    aria-label={`${item.title} 완료`}
                    checked={finished.includes(item.id)}
                    onChange={(event) =>
                      setFinished((current) =>
                        event.target.checked ? [...current, item.id] : current.filter((id) => id !== item.id),
                      )
                    }
                  />
                  <div>
                    <strong>{item.title}</strong>
                    <span>{item.note}</span>
                  </div>
                </div>
                <span className="dashboard-agenda-duration">{item.duration}</span>
              </li>
            ))}
          </ol>
        </Card.Body>
      </Card>
      <Card variant="border" className="dashboard-panel dashboard-team-panel">
        <Card.Header>
          <Card.Title level="h3">팀 업무 분포</Card.Title>
          <Icon name="users" size={16} />
        </Card.Header>
        <Card.Body>
          <p className="dashboard-team-caption">멤버를 선택해 담당 프로젝트를 확인하세요.</p>
          <div className="dashboard-team-grid">
            {dashboardTeam.map((name) => {
              const count = active.filter((project) => project.owner === name).length;
              return (
                <Button
                  key={name}
                  variant="ghost"
                  className="dashboard-member"
                  onClick={() => onMember(name)}
                  aria-label={`${name} 담당 프로젝트 보기`}
                >
                  <Avatar size="xs" initials={name.slice(1)} />
                  <span>
                    <strong>{name}</strong>
                    <small>진행 {count}개</small>
                  </span>
                  <Icon name="chevron-right" size={12} />
                </Button>
              );
            })}
          </div>
          <div className="dashboard-team-summary">
            <span>전체 진행 프로젝트</span>
            <strong>{active.length}개</strong>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
