import { useMemo } from 'react';
import { Badge, Card, Chart, Icon, Progress } from '@bricks/core';
import {
  dashboardPeriods,
  dashboardTeam,
  type DashboardPeriod,
  type DashboardProject,
} from './dashboardData';

export function DashboardCumulativeChart({ period }: { period: DashboardPeriod }) {
  const report = dashboardPeriods[period];
  const cumulative = useMemo(() => {
    let total = 0;
    return report.current.map((value, index) => ({ label: report.labels[index], value: (total += value) }));
  }, [report]);
  const completed = cumulative[cumulative.length - 1]?.value ?? 0;
  return (
    <Card variant="border" className="dashboard-panel dashboard-cumulative">
      <Card.Header>
        <Card.Title level="h3">누적 작업 완료</Card.Title>
        <Icon name="circle-check" size={16} />
      </Card.Header>
      <Card.Body>
        <div className="dashboard-chart-summary">
          <strong>
            {completed.toLocaleString()}
            <span>개 완료</span>
          </strong>
        </div>
        <Chart
          type="line"
          title="누적 작업 완료"
          className="dashboard-chart-accessible-title"
          data={cumulative}
          height={174}
          showLegend={false}
          animated
          options={{
            animation: { duration: 700 },
            scales: { x: { ticks: { maxTicksLimit: 3 } }, y: { display: false } },
          }}
        />
        <div className="dashboard-cumulative-goal">
          <div>
            <span>기간 목표 달성</span>
            <strong>{Math.round((completed / report.target) * 100)}%</strong>
          </div>
          <Progress
            value={completed}
            max={report.target}
            color="primary"
            size="xs"
            aria-label="누적 작업 목표 달성"
          />
          <p>
            {report.label} · 목표 {report.target.toLocaleString()}개
          </p>
        </div>
      </Card.Body>
    </Card>
  );
}

export function DashboardProjectCharts({ projects }: { projects: DashboardProject[] }) {
  const progress = useMemo(
    () =>
      projects.slice(0, 5).map((project) => ({
        label: project.name,
        value: project.progress,
      })),
    [projects],
  );
  const workload = useMemo(
    () =>
      dashboardTeam.map((name) => ({
        label: name,
        value: projects.filter((project) => project.owner === name && project.status !== 'done').length,
      })),
    [projects],
  );
  const activeCount = workload.reduce((sum, member) => sum + member.value, 0);

  return (
    <div className="dashboard-project-charts">
      <Card variant="border" className="dashboard-panel">
        <Card.Header>
          <Card.Title level="h3">주요 프로젝트 진행률</Card.Title>
          <Badge variant="outline" size="sm">
            {progress.length}개 프로젝트
          </Badge>
        </Card.Header>
        <Card.Body>
          <p className="dashboard-chart-caption">
            목록 상단 {progress.length}개 프로젝트 비교 · 바깥선은 100%입니다.
          </p>
          <Chart
            type="radar"
            title="주요 프로젝트 진행률"
            className="dashboard-chart-accessible-title"
            data={progress}
            height={240}
            showLegend={false}
            animated
            options={{
              animation: { duration: 700 },
              scales: {
                r: {
                  min: 0,
                  max: 100,
                  ticks: { stepSize: 25, display: false },
                  pointLabels: {
                    font: { size: 11 },
                    callback: (label: string) => {
                      const compact = label.length > 14 ? `${label.slice(0, 13)}…` : label;
                      return compact.match(/.{1,7}/g) ?? [compact];
                    },
                  },
                },
              },
              plugins: {
                tooltip: { callbacks: { label: (context) => `진행률: ${context.formattedValue}%` } },
              },
            }}
          />
        </Card.Body>
      </Card>
      <Card variant="border" className="dashboard-panel">
        <Card.Header>
          <Card.Title level="h3">담당자별 진행 프로젝트</Card.Title>
          <Icon name="users" size={16} />
        </Card.Header>
        <Card.Body>
          <p className="dashboard-chart-caption">
            멤버 {dashboardTeam.length}명이 진행 중인 {activeCount}개 프로젝트의 분포입니다.
          </p>
          <Chart
            type="polarArea"
            title="담당자별 진행 프로젝트"
            className="dashboard-chart-accessible-title"
            data={workload}
            height={240}
            animated
            options={{
              animation: { duration: 700 },
              scales: { r: { ticks: { stepSize: 1, precision: 0, display: false }, suggestedMax: 2 } },
            }}
          />
        </Card.Body>
      </Card>
    </div>
  );
}
