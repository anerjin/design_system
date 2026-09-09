export type ProjectStatus = 'active' | 'review' | 'done';
export interface DashboardProject {
  id: string;
  name: string;
  category: string;
  owner: string;
  progress: number;
  status: ProjectStatus;
}
export const projectStatuses: Record<ProjectStatus, string> = {
  active: '진행 중',
  review: '검토 중',
  done: '완료',
};
export const dashboardTeam = ['김도윤', '이서연', '박지훈', '최수빈'];
export const initialProjects: DashboardProject[] = [
  {
    id: 'design-system',
    name: '디자인 시스템 2.0',
    category: 'Design system',
    owner: '김도윤',
    progress: 72,
    status: 'active',
  },
  {
    id: 'website',
    name: '브랜드 웹사이트',
    category: 'Website',
    owner: '이서연',
    progress: 90,
    status: 'review',
  },
  {
    id: 'mobile',
    name: '모바일 앱 리뉴얼',
    category: 'Product design',
    owner: '박지훈',
    progress: 46,
    status: 'active',
  },
  {
    id: 'onboarding',
    name: '신규 고객 온보딩',
    category: 'Experience',
    owner: '최수빈',
    progress: 100,
    status: 'done',
  },
  {
    id: 'analytics',
    name: '데이터 분석 대시보드',
    category: 'Development',
    owner: '김도윤',
    progress: 28,
    status: 'active',
  },
];
export interface DashboardActivity {
  id: string;
  person: string;
  action: string;
  subject: string;
  time: string;
}
export const initialActivity: DashboardActivity[] = [
  { id: '1', person: '이서연', action: '검토를 요청했어요', subject: '브랜드 웹사이트', time: '12분 전' },
  {
    id: '2',
    person: '최수빈',
    action: '프로젝트를 완료했어요',
    subject: '신규 고객 온보딩',
    time: '38분 전',
  },
  {
    id: '3',
    person: '박지훈',
    action: '작업을 업데이트했어요',
    subject: '모바일 앱 리뉴얼',
    time: '1시간 전',
  },
  {
    id: '4',
    person: '김도윤',
    action: '컴포넌트를 추가했어요',
    subject: '디자인 시스템 2.0',
    time: '2시간 전',
  },
];
export const dashboardPeriods = {
  week: {
    label: '최근 7일',
    labels: ['월', '화', '수', '목', '금', '토', '일'],
    current: [14, 22, 18, 31, 24, 38, 29],
    previous: [11, 18, 14, 23, 18, 29, 24],
    target: 200,
  },
  month: {
    label: '최근 4주',
    labels: ['1주', '2주', '3주', '4주'],
    current: [108, 126, 142, 176],
    previous: [92, 112, 118, 137],
    target: 650,
  },
  quarter: {
    label: '최근 3개월',
    labels: ['첫째 달', '둘째 달', '셋째 달'],
    current: [410, 468, 552],
    previous: [356, 398, 459],
    target: 1800,
  },
};
export type DashboardPeriod = keyof typeof dashboardPeriods;
