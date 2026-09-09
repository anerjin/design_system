import { useMemo, useRef, useState } from 'react';
import {
  Avatar,
  Badge,
  Button,
  Card,
  Chart,
  Icon,
  Input,
  Modal,
  Progress,
  RadialProgress,
  Select,
  Stat,
  Table,
  Toggle,
  type TableColumn,
} from '@bricks/core';
import {
  commerceCampaigns,
  commerceChannels,
  commerceProducts,
  commerceReports,
  initialCommerceOrders,
  orderStatuses,
  type CommerceOrder,
  type CommercePeriod,
} from './dashboardCommerceData';
import './dashboard-commerce.css';

export function DashboardType02() {
  const [period, setPeriod] = useState<CommercePeriod>('week');
  const [section, setSection] = useState('overview');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [orders, setOrders] = useState(initialCommerceOrders);
  const [campaigns, setCampaigns] = useState(commerceCampaigns);
  const [selected, setSelected] = useState<string | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [notice, setNotice] = useState('');
  const overview = useRef<HTMLElement>(null);
  const orderSection = useRef<HTMLElement>(null);
  const campaignSection = useRef<HTMLElement>(null);
  const report = commerceReports[period];
  const revenue = report.revenue.reduce((sum, value) => sum + value, 0);
  const previous = report.previous.reduce((sum, value) => sum + value, 0);
  const growth = ((revenue / previous - 1) * 100).toFixed(1);
  const goal = Math.round((revenue / report.target) * 100);
  const chosenOrder = orders.find((order) => order.id === selected);
  const filtered = orders.filter(
    (order) =>
      (status === 'all' || order.status === status) &&
      `${order.id} ${order.name} ${order.product}`.toLowerCase().includes(search.trim().toLowerCase()),
  );
  const revenueDatasets = useMemo(
    () => [
      {
        label: '선택 기간',
        data: report.revenue,
        borderColor: '#8b5cf6',
        backgroundColor: '#8b5cf61a',
        fill: true,
      },
      {
        label: '이전 기간',
        data: report.previous,
        borderColor: '#14b8a6',
        backgroundColor: '#14b8a6',
        fill: false,
      },
    ],
    [report],
  );
  const channels = useMemo(
    () =>
      commerceChannels.map((channel, index) => ({
        label: channel.name,
        color: channel.color,
        value: report.channels[index],
      })),
    [report],
  );

  function navigate(next: string) {
    setSection(next);
    const ref = next === 'orders' ? orderSection : next === 'campaigns' ? campaignSection : overview;
    ref.current?.scrollIntoView({
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
      block: 'start',
    });
  }
  function shipOrder() {
    if (!chosenOrder || chosenOrder.status !== 'paid') return;
    setOrders((current) =>
      current.map((order) => (order.id === selected ? { ...order, status: 'shipping' } : order)),
    );
    setNotice(`${chosenOrder.id} 주문을 배송 중으로 변경했습니다.`);
    setDetailOpen(false);
  }
  const columns: TableColumn<CommerceOrder>[] = [
    {
      key: 'id',
      label: '주문 / 상품',
      render: (_, order) => (
        <div className="commerce-order-name">
          <Button
            variant="link"
            size="sm"
            onClick={() => {
              setSelected(order.id);
              setDetailOpen(true);
            }}
          >
            {order.id}
          </Button>
          <span>{order.product}</span>
        </div>
      ),
    },
    { key: 'name', label: '고객' },
    {
      key: 'amount',
      label: '결제 금액',
      sortable: true,
      render: (_, order) => `₩${order.amount.toLocaleString()}`,
    },
    {
      key: 'status',
      label: '상태',
      render: (_, order) => (
        <Badge variant="soft" size="sm" className={`commerce-order-status commerce-status-${order.status}`}>
          {orderStatuses[order.status]}
        </Badge>
      ),
    },
  ];

  return (
    <div className="commerce-shell">
      <aside className="commerce-sidebar" aria-label="스토어 메뉴">
        <div className="commerce-brand">
          <span>
            <Icon name="shopping-bag" size={19} />
          </span>
          <strong>
            DOI <span>COMMERCE</span>
          </strong>
        </div>
        <div className="commerce-store">
          <Icon name="package" size={18} />
          <div>
            <strong>DOI 라이프 스토어</strong>
            <small>데모 워크스페이스</small>
          </div>
        </div>
        <p className="commerce-menu-label">WORKSPACE</p>
        <nav aria-label="커머스 대시보드 메뉴">
          {(
            [
              ['overview', '오버뷰', 'layout-grid'],
              ['orders', '주문 관리', 'shopping-bag'],
              ['campaigns', '캠페인', 'flag'],
            ] as const
          ).map(([key, name, icon]) => (
            <Button
              key={key}
              variant={section === key ? 'soft' : 'ghost'}
              size="sm"
              aria-pressed={section === key}
              onClick={() => navigate(key)}
            >
              <Icon name={icon} size={16} />
              {name}
            </Button>
          ))}
        </nav>
        <div className="commerce-account">
          <Avatar size="xs" initials="DO" />
          <div>
            <strong>스토어 관리자</strong>
            <small>DOI COMMERCE</small>
          </div>
        </div>
      </aside>
      <div className="commerce-content">
        <section ref={overview} className="commerce-section" aria-label="커머스 개요">
          <div className="commerce-heading">
            <div>
              <p>STORE ANALYTICS</p>
              <h2>스토어의 성장을 한눈에.</h2>
              <span>매출부터 고객의 다음 구매까지, 오늘의 흐름을 확인하세요.</span>
            </div>
            <Select
              size="sm"
              aria-label="커머스 조회 기간"
              value={period}
              onChange={(event) => setPeriod(event.target.value as CommercePeriod)}
              options={Object.entries(commerceReports).map(([value, item]) => ({ value, label: item.label }))}
            />
          </div>
          <div className="commerce-metrics">
            {[
              {
                id: 'revenue',
                title: '총 매출',
                value: `₩${(revenue * 10000).toLocaleString()}`,
                description: `이전 기간 대비 +${growth}%`,
                icon: 'credit-card' as const,
                tone: 'violet',
              },
              {
                id: 'orders',
                title: '주문 수',
                value: report.orders.toLocaleString(),
                description: '선택 기간 접수 주문',
                icon: 'shopping-bag' as const,
                tone: 'teal',
              },
              {
                id: 'customers',
                title: '신규 고객',
                value: report.customers.toLocaleString(),
                description: '스토어를 처음 만난 고객',
                icon: 'users' as const,
                tone: 'orange',
              },
              {
                id: 'conversion',
                title: '구매 전환율',
                value: `${report.conversion}%`,
                description: '방문 대비 구매 비율',
                icon: 'arrow-up-right' as const,
                tone: 'pink',
              },
            ].map((metric) => (
              <Card
                variant="border"
                className={`commerce-metric commerce-tone-${metric.tone}`}
                key={metric.id}
              >
                <Stat shadow={false} items={[{ ...metric, figure: <Icon name={metric.icon} size={20} /> }]} />
              </Card>
            ))}
          </div>

          <div className="commerce-chart-grid">
            <Card variant="border" className="commerce-panel commerce-revenue">
              <Card.Header>
                <Card.Title level="h3">매출 흐름</Card.Title>
                <Badge size="sm" variant="soft" color="secondary">
                  +{growth}%
                </Badge>
              </Card.Header>
              <Card.Body>
                <div className="commerce-chart-summary">
                  <strong>
                    {revenue.toLocaleString()}
                    <small>만원</small>
                  </strong>
                  <span>{report.label} · 이전 기간 비교</span>
                </div>
                <Chart
                  title="기간별 매출 흐름"
                  className="commerce-chart"
                  type="area"
                  labels={report.labels}
                  datasets={revenueDatasets}
                  height={236}
                  animated
                  options={{
                    animation: { duration: 800 },
                    interaction: { mode: 'index', intersect: false },
                    plugins: {
                      filler: { drawTime: 'beforeDatasetsDraw' },
                      tooltip: {
                        callbacks: {
                          label: (context) => `${context.dataset.label}: ${context.formattedValue}만원`,
                        },
                      },
                    },
                    scales: { y: { ticks: { callback: (value) => `${value}만` } } },
                  }}
                />
              </Card.Body>
            </Card>
            <Card variant="border" className="commerce-panel">
              <Card.Header>
                <Card.Title level="h3">방문 채널</Card.Title>
                <Icon name="users" size={16} />
              </Card.Header>
              <Card.Body>
                <div className="commerce-channel-chart">
                  <Chart
                    title="방문 채널 비중"
                    className="commerce-chart"
                    type="doughnut"
                    data={channels}
                    height={184}
                    showLegend={false}
                    animated
                    options={{
                      cutout: '74%',
                      animation: { duration: 800 },
                      plugins: {
                        tooltip: {
                          callbacks: { label: (context) => `${context.label}: ${context.formattedValue}%` },
                        },
                      },
                    }}
                  />
                  <span aria-hidden="true">
                    <strong>
                      100<small>%</small>
                    </strong>
                    <small>전체 방문</small>
                  </span>
                </div>
                <ul className="commerce-channel-list">
                  {channels.map((channel) => (
                    <li key={channel.label}>
                      <span>
                        <i style={{ background: channel.color }} />
                        {channel.label}
                      </span>
                      <strong>{channel.value}%</strong>
                    </li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </div>
        </section>

        <div className="commerce-order-region">
          <section ref={orderSection} className="commerce-section commerce-orders" aria-label="최근 주문">
            <Card variant="border" className="commerce-panel">
              <Card.Header>
                <Card.Title level="h3">최근 주문</Card.Title>
                <Badge variant="outline" size="sm">
                  {orders.length}건 샘플
                </Badge>
              </Card.Header>
              <Card.Body className="commerce-table-body">
                <div className="commerce-order-tools">
                  <Input
                    size="sm"
                    aria-label="주문 검색"
                    placeholder="주문번호, 고객, 상품 검색"
                    leftIcon={<Icon name="search" size={15} />}
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                  />
                  <Select
                    size="sm"
                    aria-label="주문 상태 필터"
                    value={status}
                    onChange={(event) => setStatus(event.target.value)}
                    options={[
                      { value: 'all', label: '모든 상태' },
                      ...Object.entries(orderStatuses).map(([value, label]) => ({ value, label })),
                    ]}
                  />
                </div>
                <Table
                  columns={columns}
                  data={filtered}
                  rowKey={(order) => order.id}
                  size="sm"
                  hoverable
                  aria-label="스토어 최근 주문"
                  emptyText="조건에 맞는 주문이 없습니다."
                />
                <p className="commerce-table-note">
                  최근 주문 {filtered.length}건 · 주문번호를 눌러 상세 내용을 확인하세요.
                </p>
              </Card.Body>
            </Card>
          </section>
        </div>
        <footer className="commerce-footer">
          <span>DOI COMMERCE · Sample workspace</span>
          <span role="status">
            {notice || '샘플 데이터 · 주문과 캠페인 변경은 이 화면에서만 유지됩니다.'}
          </span>
        </footer>
      </div>
      <aside className="commerce-widgets" aria-labelledby="commerce-widgets-title">
        <div className="commerce-widget-heading">
          <h2 id="commerce-widgets-title">위젯</h2>
          <Icon name="layout-grid" size={16} />
        </div>
        <Card variant="border" className="commerce-panel commerce-goal commerce-tone-violet">
          <Card.Header>
            <Card.Title level="h3">매출 목표</Card.Title>
            <Icon name="flag" size={16} />
          </Card.Header>
          <Card.Body>
            <div className="commerce-goal-ring">
              <RadialProgress
                value={goal}
                size="154px"
                thickness="10px"
                color="secondary"
                aria-label="커머스 매출 목표 달성률"
              >
                <strong>
                  {goal}
                  <small>%</small>
                </strong>
              </RadialProgress>
            </div>
            <h4>목표에 한 걸음 더 가까이</h4>
            <p>
              {(report.target - revenue).toLocaleString()}만원을 더 달성하면
              <br />
              이번 기간 목표를 채울 수 있어요.
            </p>
            <div className="commerce-goal-total">
              <span>목표 매출</span>
              <strong>{report.target.toLocaleString()}만원</strong>
            </div>
          </Card.Body>
        </Card>
        <Card variant="border" className="commerce-panel">
          <Card.Header>
            <Card.Title level="h3">인기 상품</Card.Title>
            <span className="commerce-muted">판매 비중</span>
          </Card.Header>
          <Card.Body>
            <ol className="commerce-products">
              {commerceProducts.map((product, index) => (
                <li key={product.name}>
                  <span className={`commerce-product-icon commerce-tone-${product.tone}`}>
                    <Icon name="package" size={19} />
                  </span>
                  <div>
                    <div>
                      <strong>{product.name}</strong>
                      <span>{product.share}%</span>
                    </div>
                    <Progress
                      value={product.share}
                      max={100}
                      size="xs"
                      className={`commerce-product-progress commerce-progress-${product.tone}`}
                      aria-label={`${product.name} 판매 비중`}
                    />
                    <small>
                      0{index + 1} · {product.category}
                    </small>
                  </div>
                </li>
              ))}
            </ol>
          </Card.Body>
        </Card>
        <section ref={campaignSection} className="commerce-section" aria-label="캠페인 관리">
          <Card variant="border" className="commerce-panel">
            <Card.Header>
              <Card.Title level="h3">캠페인</Card.Title>
              <Badge variant="soft" color="secondary" size="sm">
                {campaigns.filter((campaign) => campaign.active).length}개 운영 중
              </Badge>
            </Card.Header>
            <Card.Body>
              <ul className="commerce-campaigns">
                {campaigns.map((campaign) => (
                  <li key={campaign.id}>
                    <span className={`commerce-campaign-dot commerce-tone-${campaign.tone}`} />
                    <div>
                      <strong>{campaign.name}</strong>
                      <small>
                        {campaign.audience} · {campaign.active ? '운영 중' : '일시 중지'}
                      </small>
                    </div>
                    <Toggle
                      size="sm"
                      color="secondary"
                      aria-label={`${campaign.name} 운영`}
                      checked={campaign.active}
                      onChange={(event) => {
                        const active = event.target.checked;
                        setCampaigns((current) =>
                          current.map((item) => (item.id === campaign.id ? { ...item, active } : item)),
                        );
                        setNotice(`${campaign.name} 캠페인을 ${active ? '시작' : '일시 중지'}했습니다.`);
                      }}
                    />
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </section>
      </aside>
      <Modal
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        title={chosenOrder ? `주문 ${chosenOrder.id}` : '주문 상세'}
        size="sm"
        footer={
          <>
            <Button variant="surface" onClick={() => setDetailOpen(false)}>
              닫기
            </Button>
            {chosenOrder?.status === 'paid' && (
              <Button color="primary" onClick={shipOrder}>
                배송 처리
              </Button>
            )}
          </>
        }
      >
        {chosenOrder && (
          <dl className="commerce-order-detail">
            <div>
              <dt>고객</dt>
              <dd>{chosenOrder.name}</dd>
            </div>
            <div>
              <dt>상품</dt>
              <dd>{chosenOrder.product}</dd>
            </div>
            <div>
              <dt>결제 금액</dt>
              <dd>₩{chosenOrder.amount.toLocaleString()}</dd>
            </div>
            <div>
              <dt>주문 상태</dt>
              <dd>{orderStatuses[chosenOrder.status]}</dd>
            </div>
          </dl>
        )}
      </Modal>
    </div>
  );
}
