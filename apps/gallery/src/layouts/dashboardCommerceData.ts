export const commerceReports = {
  week: {
    label: '최근 7일',
    labels: ['월', '화', '수', '목', '금', '토', '일'],
    revenue: [72, 96, 81, 128, 110, 156, 142],
    previous: [64, 78, 75, 108, 96, 132, 121],
    orders: 428,
    customers: 96,
    conversion: 3.8,
    target: 1000,
    channels: [46, 28, 18, 8],
  },
  month: {
    label: '최근 4주',
    labels: ['1주', '2주', '3주', '4주'],
    revenue: [420, 580, 610, 785],
    previous: [380, 490, 570, 674],
    orders: 1428,
    customers: 354,
    conversion: 4.2,
    target: 3000,
    channels: [38, 32, 20, 10],
  },
};
export type CommercePeriod = keyof typeof commerceReports;
export const commerceChannels = [
  { name: '직접 방문', color: '#8b5cf6' },
  { name: '검색', color: '#14b8a6' },
  { name: '소셜', color: '#f59e0b' },
  { name: '이메일', color: '#f472b6' },
];
export const orderStatuses = { paid: '결제 완료', shipping: '배송 중', refunded: '환불' } as const;
export type CommerceOrder = {
  id: string;
  name: string;
  product: string;
  amount: number;
  status: keyof typeof orderStatuses;
};
export const initialCommerceOrders: CommerceOrder[] = [
  { id: 'DOI-1048', name: '이서연', product: '워크 데스크 매트', amount: 39000, status: 'paid' },
  { id: 'DOI-1047', name: '김도윤', product: '데일리 플래너', amount: 24000, status: 'shipping' },
  { id: 'DOI-1046', name: '박지훈', product: '포커스 타이머', amount: 49000, status: 'paid' },
  { id: 'DOI-1045', name: '최수빈', product: '워크 데스크 매트', amount: 39000, status: 'shipping' },
  { id: 'DOI-1044', name: '정하린', product: '데일리 플래너', amount: 24000, status: 'refunded' },
];
export const commerceProducts = [
  { name: '워크 데스크 매트', category: 'Workspace', share: 45, tone: 'violet' },
  { name: '데일리 플래너', category: 'Stationery', share: 32, tone: 'teal' },
  { name: '포커스 타이머', category: 'Accessories', share: 23, tone: 'orange' },
];
export const commerceCampaigns = [
  { id: 'welcome', name: '신규 고객 웰컴 쿠폰', audience: '첫 구매 고객', tone: 'violet', active: true },
  { id: 'return', name: '다시 만나는 스토어', audience: '재방문 고객', tone: 'teal', active: true },
  { id: 'weekend', name: '주말 스페셜', audience: '전체 구독자', tone: 'orange', active: false },
];
