import { useId, useMemo, useRef, useState, type FormEvent } from 'react';
import {
  Avatar,
  Badge,
  Button,
  Card,
  Chart,
  Fieldset,
  Icon,
  Input,
  Label,
  Modal,
  Progress,
  Select,
  Stat,
  Table,
  type TableColumn,
} from '@bricks/core';
import {
  dashboardPeriods,
  dashboardTeam,
  initialActivity,
  initialProjects,
  projectStatuses,
  type DashboardPeriod,
  type DashboardProject,
} from './dashboardData';
import './dashboard.css';
import { DashboardDaily } from './DashboardHighlights';
import { DashboardCumulativeChart, DashboardProjectCharts } from './DashboardProjectCharts';

export function DashboardType01() {
  const id = useId();
  const overview = useRef<HTMLElement>(null);
  const projectSection = useRef<HTMLElement>(null);
  const activitySection = useRef<HTMLElement>(null);
  const [section, setSection] = useState('overview');
  const [period, setPeriod] = useState<DashboardPeriod>('week');
  const [projects, setProjects] = useState(initialProjects);
  const [activity, setActivity] = useState(initialActivity);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [createOpen, setCreateOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  const report = dashboardPeriods[period];
  const completedTasks = report.current.reduce((sum, value) => sum + value, 0);
  const previousTasks = report.previous.reduce((sum, value) => sum + value, 0);
  const growth = ((completedTasks / previousTasks - 1) * 100).toFixed(1);
  const goal = Math.round((completedTasks / report.target) * 100);
  const statusCounts = useMemo(
    () =>
      Object.entries(projectStatuses).map(([status, label]) => ({
        label,
        value: projects.filter((project) => project.status === status).length,
      })),
    [projects],
  );
  const trendDatasets = useMemo(
    () => [
      { label: '선택 기간', data: report.current, fill: true },
      { label: '이전 기간', data: report.previous, fill: false },
    ],
    [report],
  );
  const visibleProjects = projects.filter(
    (project) =>
      (filter === 'all' || project.status === filter) &&
      `${project.name} ${project.category} ${project.owner}`
        .toLowerCase()
        .includes(search.trim().toLowerCase()),
  );
  const selectedProject = projects.find((project) => project.id === selectedId);

  function navigate(next: string) {
    setSection(next);
    const target = next === 'projects' ? projectSection : next === 'activity' ? activitySection : overview;
    target.current?.scrollIntoView({
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
      block: 'start',
    });
  }
  function createProject(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const name = String(fields.get('name') ?? '').trim();
    if (!name) return;
    const owner = String(fields.get('owner'));
    const project: DashboardProject = {
      id: crypto.randomUUID(),
      name,
      owner,
      category: 'New project',
      progress: 0,
      status: 'active',
    };
    setProjects((current) => [project, ...current]);
    setActivity((current) => [
      {
        id: crypto.randomUUID(),
        person: owner,
        subject: name,
        action: '프로젝트를 만들었어요',
        time: '방금',
      },
      ...current,
    ]);
    setFilter('all');
    setSearch('');
    setCreateOpen(false);
    setAnnouncement(`${name} 프로젝트를 추가했습니다.`);
  }
  function completeProject() {
    if (!selectedProject || selectedProject.status === 'done') return;
    setProjects((current) =>
      current.map((project) =>
        project.id === selectedId ? { ...project, status: 'done', progress: 100 } : project,
      ),
    );
    setActivity((current) => [
      {
        id: crypto.randomUUID(),
        person: selectedProject.owner,
        subject: selectedProject.name,
        action: '프로젝트를 완료했어요',
        time: '방금',
      },
      ...current,
    ]);
    setAnnouncement(`${selectedProject.name} 프로젝트를 완료했습니다.`);
    setDetailOpen(false);
  }
  function downloadReport() {
    const cell = (value: string | number) =>
      `"${String(value)
        .replace(/^[=+\-@\t\r]/, "'$&")
        .replace(/"/g, '""')}"`;
    const rows = [
      ['프로젝트', '담당자', '상태', '진행률'],
      ...visibleProjects.map((project) => [
        project.name,
        project.owner,
        projectStatuses[project.status],
        project.progress,
      ]),
    ];
    const url = URL.createObjectURL(
      new Blob(['\uFEFF' + rows.map((row) => row.map(cell).join(',')).join('\r\n')], {
        type: 'text/csv;charset=utf-8;',
      }),
    );
    const link = document.createElement('a');
    link.href = url;
    link.download = 'doi-projects.csv';
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setAnnouncement('현재 목록을 CSV 파일로 다운로드했습니다.');
  }
  const columns: TableColumn<DashboardProject>[] = [
    {
      key: 'name',
      label: '프로젝트',
      sortable: true,
      render: (_, project) => (
        <div className="dashboard-project-name">
          <Button
            variant="link"
            size="sm"
            onClick={() => {
              setSelectedId(project.id);
              setDetailOpen(true);
            }}
          >
            {project.name}
          </Button>
          <span>{project.category}</span>
        </div>
      ),
    },
    {
      key: 'status',
      label: '상태',
      render: (_, project) => (
        <Badge
          size="sm"
          variant={project.status === 'review' ? 'soft' : 'outline'}
          color={project.status === 'review' ? 'secondary' : undefined}
        >
          {projectStatuses[project.status]}
        </Badge>
      ),
    },
    {
      key: 'owner',
      label: '담당',
      render: (_, project) => (
        <Avatar
          size="xs"
          initials={project.owner.slice(1)}
          title={project.owner}
          aria-label={project.owner}
        />
      ),
    },
    {
      key: 'progress',
      label: '진행률',
      sortable: true,
      render: (_, project) => (
        <div className="dashboard-project-progress">
          <Progress
            size="xs"
            color="primary"
            value={project.progress}
            aria-label={`${project.name} 진행률`}
          />
          <span>{project.progress}%</span>
        </div>
      ),
    },
  ];

  return (
    <div className="dashboard-shell">
      <aside className="dashboard-sidebar">
        <div className="dashboard-brand">
          <span>
            <Icon name="blocks" size={18} />
          </span>
          DOI LABS
        </div>
        <div className="dashboard-workspace">
          <span className="dashboard-workspace-icon">
            <Icon name="layers" size={17} />
          </span>
          <div>
            <strong>디자인 워크스페이스</strong>
            <small>Team workspace</small>
          </div>
        </div>
        <p className="dashboard-nav-label">WORKSPACE</p>
        <nav aria-label="대시보드 메뉴">
          {(
            [
              ['overview', '개요', 'layout-grid'],
              ['projects', '프로젝트', 'folder'],
              ['activity', '최근 활동', 'clock'],
            ] as const
          ).map(([key, label, icon]) => (
            <Button
              key={key}
              variant={section === key ? 'soft' : 'ghost'}
              color={section === key ? 'primary' : undefined}
              size="sm"
              aria-pressed={section === key}
              onClick={() => navigate(key)}
            >
              <Icon name={icon} size={16} />
              {label}
              {key === 'projects' && <span className="dashboard-nav-count">{projects.length}</span>}
            </Button>
          ))}
        </nav>
        <div className="dashboard-sidebar-bottom">
          <Button variant="ghost" size="sm" onClick={() => setHelpOpen(true)}>
            <Icon name="circle-help" size={16} />
            사용 가이드
          </Button>
          <div className="dashboard-user">
            <Avatar size="xs" initials="도윤" />
            <div>
              <strong>김도윤</strong>
              <small>워크스페이스 관리자</small>
            </div>
          </div>
        </div>
      </aside>
      <div className="dashboard-main">
        <div className="dashboard-topbar">
          <span>
            워크스페이스 <Icon name="chevron-right" size={13} /> 대시보드
          </span>
          <Badge variant="outline" size="sm">
            샘플 데이터
          </Badge>
        </div>
        <section ref={overview} className="dashboard-overview" aria-label="워크스페이스 개요">
          <header className="dashboard-heading">
            <div>
              <p>OVERVIEW</p>
              <h2>팀의 오늘을 한눈에.</h2>
              <span>프로젝트의 흐름을 확인하고, 다음 작업을 이어가세요.</span>
            </div>
            <div className="dashboard-heading-actions">
              <Select
                aria-label="대시보드 조회 기간"
                size="sm"
                value={period}
                onChange={(event) => setPeriod(event.target.value as DashboardPeriod)}
                options={Object.entries(dashboardPeriods).map(([value, item]) => ({
                  value,
                  label: item.label,
                }))}
              />
              <Button color="primary" size="sm" onClick={() => setCreateOpen(true)}>
                <Icon name="plus" size={15} />새 프로젝트
              </Button>
            </div>
          </header>
          <div className="dashboard-metrics">
            {[
              {
                id: 'projects',
                title: '진행 프로젝트',
                value: projects.filter((project) => project.status !== 'done').length,
                description: `전체 ${projects.length}개 프로젝트`,
                icon: 'folder' as const,
              },
              {
                id: 'tasks',
                title: '완료한 작업',
                value: completedTasks.toLocaleString(),
                description: `이전 기간 대비 +${growth}%`,
                icon: 'circle-check' as const,
              },
              {
                id: 'goal',
                title: '기간 목표 달성',
                value: `${goal}%`,
                description: `목표 ${report.target.toLocaleString()}개 작업`,
                icon: 'flag' as const,
              },
              {
                id: 'team',
                title: '함께하는 멤버',
                value: dashboardTeam.length,
                description: '디자인 · 개발 · 운영',
                icon: 'users' as const,
              },
            ].map((item) => (
              <Card key={item.id} variant="border" className="dashboard-metric">
                <Stat shadow={false} items={[{ ...item, figure: <Icon name={item.icon} size={17} /> }]} />
              </Card>
            ))}
          </div>
          <div className="dashboard-grid dashboard-primary-charts">
            <Card variant="border" className="dashboard-panel dashboard-trend">
              <Card.Header>
                <Card.Title level="h3">작업 완료 추이</Card.Title>
                <Badge variant="soft" color="secondary" size="sm">
                  +{growth}%
                </Badge>
              </Card.Header>
              <Card.Body>
                <div className="dashboard-chart-summary">
                  <strong>
                    {completedTasks.toLocaleString()}
                    <span>개 완료</span>
                  </strong>
                  <span>{report.label} · 이전 기간과 비교</span>
                </div>
                <Chart
                  type="area"
                  labels={report.labels}
                  datasets={trendDatasets}
                  height={236}
                  animated
                  options={{
                    animation: { duration: 700, easing: 'easeOutQuart' },
                    interaction: { mode: 'index', intersect: false },
                    plugins: { filler: { drawTime: 'beforeDatasetsDraw' } },
                    scales: { y: { ticks: { precision: 0 } } },
                  }}
                />
              </Card.Body>
            </Card>
            <Card variant="border" className="dashboard-panel">
              <Card.Header>
                <Card.Title level="h3">프로젝트 현황</Card.Title>
                <Icon name="chart-line" size={16} />
              </Card.Header>
              <Card.Body>
                <div className="dashboard-donut">
                  <Chart
                    type="doughnut"
                    data={statusCounts}
                    height={190}
                    showLegend={false}
                    animated
                    options={{ cutout: '78%', animation: { duration: 700 } }}
                  />
                  <div className="dashboard-donut-total" aria-hidden="true">
                    <strong>{projects.length}</strong>
                    <span>전체 프로젝트</span>
                  </div>
                </div>
                <ul className="dashboard-status-list">
                  {statusCounts.map((item, index) => (
                    <li key={item.label}>
                      <span>
                        <i data-index={index} />
                        {item.label}
                      </span>
                      <strong>
                        {item.value}
                        <small>개</small>
                      </strong>
                    </li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
            <DashboardCumulativeChart period={period} />
          </div>
          <DashboardProjectCharts projects={projects} />
        </section>
        <DashboardDaily
          projects={projects}
          onMember={(name) => {
            setSearch(name);
            setFilter('all');
            navigate('projects');
          }}
        />
        <div className="dashboard-grid dashboard-bottom-grid">
          <section ref={projectSection} className="dashboard-section" aria-label="프로젝트 목록">
            <Card variant="border" className="dashboard-panel">
              <Card.Header>
                <Card.Title level="h3">프로젝트</Card.Title>
                <Button variant="ghost" size="xs" onClick={downloadReport} aria-label="프로젝트 CSV 다운로드">
                  <Icon name="download" size={15} />
                  CSV
                </Button>
              </Card.Header>
              <Card.Body className="dashboard-table-body">
                <div className="dashboard-project-tools">
                  <Input
                    aria-label="프로젝트 검색"
                    placeholder="프로젝트 검색…"
                    size="sm"
                    leftIcon={<Icon name="search" size={15} />}
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                  />
                  <Select
                    aria-label="프로젝트 상태 필터"
                    size="sm"
                    value={filter}
                    onChange={(event) => setFilter(event.target.value)}
                    options={[
                      { value: 'all', label: '모든 상태' },
                      ...Object.entries(projectStatuses).map(([value, label]) => ({ value, label })),
                    ]}
                  />
                </div>
                <Table
                  aria-label="워크스페이스 프로젝트"
                  columns={columns}
                  data={visibleProjects}
                  rowKey={(project) => project.id}
                  size="sm"
                  hoverable
                  emptyText="조건에 맞는 프로젝트가 없습니다."
                />
                <p className="dashboard-table-count">
                  전체 {projects.length}개 중 {visibleProjects.length}개 표시
                </p>
              </Card.Body>
            </Card>
          </section>
          <section ref={activitySection} className="dashboard-section" aria-label="최근 활동 목록">
            <Card variant="border" className="dashboard-panel">
              <Card.Header>
                <Card.Title level="h3">최근 활동</Card.Title>
                <Icon name="clock" size={16} />
              </Card.Header>
              <Card.Body>
                <ul className="dashboard-activity">
                  {activity.slice(0, 5).map((item) => (
                    <li key={item.id}>
                      <Avatar size="xs" initials={item.person.slice(1)} />
                      <div>
                        <p>
                          <strong>{item.person}</strong> 님이
                          <br />
                          {item.action}
                        </p>
                        <span>{item.subject}</span>
                        <small>{item.time}</small>
                      </div>
                    </li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </section>
        </div>
        <footer className="dashboard-footer">
          <span>DOI LABS · Team workspace</span>
          <span role="status">{announcement || '샘플 데이터 · 변경사항은 이 화면에서만 유지됩니다.'}</span>
        </footer>
      </div>
      <Modal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="새 프로젝트"
        size="sm"
        footer={
          <>
            <Button variant="surface" onClick={() => setCreateOpen(false)}>
              취소
            </Button>
            <Button color="primary" type="submit" form={`${id}-create`}>
              프로젝트 만들기
            </Button>
          </>
        }
      >
        {createOpen && (
          <form id={`${id}-create`} onSubmit={createProject} className="dashboard-create-form">
            <Fieldset>
              <Label htmlFor={`${id}-name`}>프로젝트 이름</Label>
              <Input
                id={`${id}-name`}
                name="name"
                placeholder="어떤 프로젝트를 시작할까요?"
                required
                pattern=".*\S.*"
                maxLength={80}
                autoFocus
              />
            </Fieldset>
            <Fieldset>
              <Label htmlFor={`${id}-owner`}>담당자</Label>
              <Select
                id={`${id}-owner`}
                name="owner"
                defaultValue={dashboardTeam[0]}
                options={dashboardTeam.map((name) => ({ value: name, label: name }))}
              />
            </Fieldset>
          </form>
        )}
      </Modal>
      <Modal
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        title={selectedProject?.name ?? '프로젝트'}
        size="sm"
        footer={
          <>
            <Button variant="surface" onClick={() => setDetailOpen(false)}>
              닫기
            </Button>
            {selectedProject?.status !== 'done' && (
              <Button color="primary" onClick={completeProject}>
                완료로 변경
              </Button>
            )}
          </>
        }
      >
        {selectedProject && (
          <div className="dashboard-project-detail">
            <Badge variant="outline">{projectStatuses[selectedProject.status]}</Badge>
            <p>담당자 · {selectedProject.owner}</p>
            <Progress color="primary" value={selectedProject.progress} label="프로젝트 진행률" showValue />
            <p>목록과 프로젝트 현황, 최근 활동에 변경사항이 함께 반영됩니다.</p>
          </div>
        )}
      </Modal>
      <Modal
        open={helpOpen}
        onClose={() => setHelpOpen(false)}
        title="대시보드 사용 가이드"
        size="sm"
        footer={
          <Button color="primary" onClick={() => setHelpOpen(false)}>
            확인
          </Button>
        }
      >
        <p>
          기간을 바꾸면 작업 지표와 추이가 갱신됩니다. 프로젝트를 검색하거나 이름을 눌러 완료 처리할 수 있고,
          CSV 버튼으로 현재 목록을 내려받을 수 있습니다.
        </p>
      </Modal>
    </div>
  );
}
