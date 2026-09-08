import { useState } from 'react';
import { Alert, Badge, Button, Divider, Icon, List, Modal, Progress } from '@bricks/core';
const initial = [
  { id: 'notebook', name: '그리드 노트', detail: 'A5 · 차콜', price: 18000, quantity: 2 },
  { id: 'pouch', name: '데스크 파우치', detail: '미디엄 · 샌드', price: 32000, quantity: 1 },
];
const won = (value: number) => `₩${value.toLocaleString()}`;
export function CartModule() {
  const [items, setItems] = useState(initial);
  const [open, setOpen] = useState(false);
  const [ordered, setOrdered] = useState(false);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 && subtotal < 100000 ? 3000 : 0;
  const change = (id: string, step: number) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, Math.min(9, item.quantity + step)) } : item,
      ),
    );
    setOrdered(false);
  };
  return (
    <>
      <div className="module-row">
        <Badge variant="outline">상품 {items.reduce((sum, item) => sum + item.quantity, 0)}개</Badge>
        <Button
          size="xs"
          variant="ghost"
          onClick={() => {
            setItems(initial);
            setOrdered(false);
          }}
        >
          초기화
        </Button>
      </div>
      {items.length ? (
        <>
          <List
            aria-label="장바구니 상품"
            items={items.map((item) => ({
              id: item.id,
              leading: (
                <span className="module-product-icon">
                  <Icon name="package" size={24} />
                </span>
              ),
              content: (
                <div className="module-member">
                  <strong>{item.name}</strong>
                  <span className="module-small">{item.detail}</span>
                  <span className="text-sm">{won(item.price)}</span>
                </div>
              ),
              trailing: (
                <Button
                  variant="ghost"
                  shape="circle"
                  size="xs"
                  aria-label={`${item.name} 삭제`}
                  onClick={() => {
                    setItems((current) => current.filter((entry) => entry.id !== item.id));
                    setOrdered(false);
                  }}
                >
                  <Icon name="x" size={14} />
                </Button>
              ),
              wrapped: (
                <div className="module-row">
                  <div className="module-quantity">
                    <Button
                      variant="surface"
                      size="xs"
                      shape="circle"
                      disabled={item.quantity === 1}
                      aria-label={`${item.name} 수량 줄이기`}
                      onClick={() => change(item.id, -1)}
                    >
                      −
                    </Button>
                    <output aria-label={`${item.name} 수량`}>{item.quantity}</output>
                    <Button
                      variant="surface"
                      size="xs"
                      shape="circle"
                      disabled={item.quantity === 9}
                      aria-label={`${item.name} 수량 늘리기`}
                      onClick={() => change(item.id, 1)}
                    >
                      <Icon name="plus" size={12} />
                    </Button>
                  </div>
                  <strong>{won(item.price * item.quantity)}</strong>
                </div>
              ),
            }))}
          />
          <div className="module-stack">
            <p className="module-small">
              {subtotal >= 100000
                ? '무료 배송이 적용되었습니다.'
                : `${won(100000 - subtotal)} 더 담으면 무료 배송`}
            </p>
            <Progress
              size="sm"
              color="primary"
              value={Math.min(subtotal, 100000)}
              max={100000}
              aria-label="무료 배송까지 담은 금액"
            />
          </div>
          <div className="module-stack">
            <div className="module-row">
              <span className="module-muted">상품 금액</span>
              <span>{won(subtotal)}</span>
            </div>
            <div className="module-row">
              <span className="module-muted">배송비</span>
              <span>{shipping ? won(shipping) : '무료'}</span>
            </div>
            <Divider />
            <div className="module-row">
              <strong>총 금액</strong>
              <strong aria-live="polite">{won(subtotal + shipping)}</strong>
            </div>
          </div>
          <Button size="sm" color="primary" disabled={ordered} onClick={() => setOpen(true)}>
            주문 내용 확인
          </Button>
          {ordered && <Alert color="success" description="예제 주문을 완료했습니다." />}
        </>
      ) : (
        <div className="module-stack justify-items-center py-6">
          <Icon name="shopping-bag" size={28} />
          <p className="module-muted">장바구니가 비어 있습니다.</p>
          <Button size="sm" variant="surface" onClick={() => setItems(initial)}>
            상품 다시 담기
          </Button>
        </div>
      )}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="주문 내용 확인"
        footer={
          <>
            <Button variant="surface" onClick={() => setOpen(false)}>
              취소
            </Button>
            <Button
              color="primary"
              onClick={() => {
                setOrdered(true);
                setOpen(false);
              }}
            >
              확인
            </Button>
          </>
        }
      >
        <p>
          상품 {items.reduce((sum, item) => sum + item.quantity, 0)}개 · 총 {won(subtotal + shipping)}
        </p>
        <p className="mt-3 text-sm opacity-65">장바구니 예제입니다. 실제 결제나 배송은 진행되지 않습니다.</p>
      </Modal>
    </>
  );
}
