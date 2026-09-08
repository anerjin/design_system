import { useId, useState } from 'react';
import { Alert, Badge, Button, Card, Modal, Radio, Toggle } from '@bricks/core';
const plans = [
  { id: 'starter', name: 'Starter', price: 0, description: '개인 프로젝트 · 저장 공간 1GB' },
  { id: 'team', name: 'Team', price: 24000, description: '팀원 10명 · 저장 공간 100GB' },
  { id: 'business', name: 'Business', price: 59000, description: '팀원 50명 · 고급 권한 관리' },
];
export function BillingModule() {
  const group = useId();
  const [selected, setSelected] = useState('team');
  const [annual, setAnnual] = useState(false);
  const [current, setCurrent] = useState({ id: 'starter', annual: false });
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const plan = plans.find((item) => item.id === selected)!;
  const price = Math.round(plan.price * (annual ? 0.8 : 1));
  return (
    <>
      <div className="module-row">
        <Badge variant="outline">현재 {plans.find((item) => item.id === current.id)?.name}</Badge>
        <Toggle
          size="sm"
          color="primary"
          label="연간 결제"
          checked={annual}
          onChange={(event) => setAnnual(event.target.checked)}
        />
      </div>
      <div className="module-stack">
        {plans.map((item) => (
          <Card key={item.id} variant="border" size="sm">
            <Card.Body>
              <Radio
                name={group}
                value={item.id}
                checked={selected === item.id}
                onChange={() => {
                  setSelected(item.id);
                  setMessage('');
                }}
                size="sm"
                color="primary"
                label={
                  <span className="font-medium">
                    {item.name} · ₩{Math.round(item.price * (annual ? 0.8 : 1)).toLocaleString()} / 월
                  </span>
                }
                description={item.description}
              />
            </Card.Body>
          </Card>
        ))}
      </div>
      <p className="module-small">
        {annual
          ? `연간 결제 시 20% 할인 · 연 ₩${(price * 12).toLocaleString()}`
          : '월 단위로 요금제를 이용합니다.'}
      </p>
      <Button
        color="primary"
        size="sm"
        disabled={current.id === selected && current.annual === annual}
        onClick={() => setOpen(true)}
      >
        요금제 변경
      </Button>
      {message && <Alert color="success" description={message} />}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="요금제 변경 확인"
        footer={
          <>
            <Button variant="surface" onClick={() => setOpen(false)}>
              취소
            </Button>
            <Button
              color="primary"
              onClick={() => {
                setCurrent({ id: selected, annual });
                setOpen(false);
                setMessage(`${plan.name} 요금제로 변경했습니다.`);
              }}
            >
              확인
            </Button>
          </>
        }
      >
        <p>
          <strong>{plan.name}</strong> ·{' '}
          {annual ? `연 ₩${(price * 12).toLocaleString()}` : `월 ₩${price.toLocaleString()}`}
        </p>
        <p className="mt-3 text-sm opacity-65">요금제 선택 예제입니다. 실제 결제는 진행되지 않습니다.</p>
      </Modal>
    </>
  );
}
