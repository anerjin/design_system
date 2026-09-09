export const layoutCatalog = [
  {
    id: 'login-1',
    pageId: 'DOI-L-LOGIN-1',
    title: '로그인 타입 1',
    source: 'LoginType1.tsx',
  },
  {
    id: 'login-2',
    pageId: 'DOI-L-LOGIN-2',
    title: '로그인 타입 2',
    source: 'LoginType2.tsx',
  },
  {
    id: 'login-3',
    pageId: 'DOI-L-LOGIN-3',
    title: '로그인 타입 3',
    source: 'LoginType3.tsx',
  },
  {
    id: 'three-column',
    pageId: 'DOI-L-THREE-COLUMN',
    title: '3단 레이아웃',
    source: 'ThreeColumnLayout.tsx',
  },
  {
    id: 'dashboard-01',
    pageId: 'DOI-L-DASHBOARD-01',
    title: '대시보드 타입 01',
    source: 'DashboardType01.tsx',
  },
  {
    id: 'dashboard-02',
    pageId: 'DOI-L-DASHBOARD-02',
    title: '대시보드 타입 02',
    source: 'DashboardType02.tsx',
  },
] as const;

export function findLayout(pageId?: string) {
  return layoutCatalog.find((layout) => layout.pageId === pageId) ?? layoutCatalog[0];
}
