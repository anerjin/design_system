import { useState } from 'react';
import { Badge, Chart, Select, Stat } from '@bricks/core';
const series = {
  week: [42, 58, 51, 72, 68, 94, 86],
  month: [210, 286, 324, 382],
};
export function AnalyticsModule() {
  const [period, setPeriod] = useState<'week' | 'month'>('week');
  const values = series[period];
  const total = values.reduce((a, b) => a + b, 0);
  return (
    <>
      <div className="module-row">
        <Badge color="secondary" variant="soft">
          {period === 'week' ? '+12.8%' : '+18.6%'} 성장
        </Badge>
        <Select
          size="sm"
          aria-label="매출 기간"
          value={period}
          onChange={(event) => setPeriod(event.target.value as typeof period)}
          options={[
            { value: 'week', label: '최근 7일' },
            { value: 'month', label: '최근 4주' },
          ]}
        />
      </div>
      <Stat
        className="w-full"
        items={[
          {
            id: 'revenue',
            title: '총 매출',
            value: `₩${(total * 10000).toLocaleString()}`,
            description: '선택한 기간의 합계',
          },
          {
            id: 'orders',
            title: '주문',
            value: period === 'week' ? '148건' : '624건',
            description: '결제 완료 기준',
          },
          {
            id: 'average',
            title: '재구매율',
            value: period === 'week' ? '32.4%' : '36.1%',
            description: '동일 고객 기준',
          },
        ]}
      />
      <Chart
        type="area"
        title="매출 추이 · 만원"
        height={220}
        showLegend={false}
        animated
        options={{
          animation: { duration: 900, easing: 'easeOutQuart' },
          interaction: { mode: 'index', intersect: false },
        }}
        data={values.map((value, i) => ({
          value,
          label: period === 'week' ? ['월', '화', '수', '목', '금', '토', '일'][i] : `${i + 1}주`,
        }))}
      />
    </>
  );
}
