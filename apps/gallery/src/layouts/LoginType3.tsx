import { useState } from 'react';
import { Button, Card, Icon, Modal } from '@bricks/core';
import { LoginForm } from './LoginForm';

/** login_04: a centered split card with a neutral visual panel. */
export function LoginType3() {
  const [policy, setPolicy] = useState('이용약관');
  const [policyOpen, setPolicyOpen] = useState(false);
  function openPolicy(title: string) {
    setPolicy(title);
    setPolicyOpen(true);
  }
  return (
    <section className="login-layout login-layout-showcase" aria-label="가로 카드형 로그인">
      <div className="login-showcase-wrap">
        <Card variant="border" className="login-card login-card-wide">
          <Card.Body>
            <LoginForm social="multiple" centered />
          </Card.Body>
          <Card.Figure className="login-visual">
            <div className="login-visual-brand">
              <Icon name="blocks" size={18} />
              DOI LABS
            </div>
            <div className="login-orbit" aria-hidden="true">
              <span className="login-orbit-ring" />
              <span className="login-orbit-core">
                <Icon name="blocks" size={50} strokeWidth={1.25} />
              </span>
              <span className="login-orbit-dot login-orbit-dot-top">
                <Icon name="sparkles" size={20} />
              </span>
              <span className="login-orbit-dot login-orbit-dot-bottom">
                <Icon name="layers" size={20} />
              </span>
            </div>
            <figcaption>
              <strong>
                좋은 아이디어가
                <br />
                좋은 경험이 되는 곳.
              </strong>
              <p>당신의 다음 작업을 DOI LABS와 함께하세요.</p>
            </figcaption>
          </Card.Figure>
        </Card>
        <p className="login-policy">
          계속하면{' '}
          <Button
            variant="link"
            size="xs"
            className="login-text-action"
            onClick={() => openPolicy('이용약관')}
          >
            이용약관
          </Button>{' '}
          및{' '}
          <Button
            variant="link"
            size="xs"
            className="login-text-action"
            onClick={() => openPolicy('개인정보 처리방침')}
          >
            개인정보 처리방침
          </Button>
          에 동의하게 됩니다.
        </p>
      </div>
      <Modal
        open={policyOpen}
        onClose={() => setPolicyOpen(false)}
        title={policy}
        size="sm"
        footer={
          <Button color="primary" onClick={() => setPolicyOpen(false)}>
            확인
          </Button>
        }
      >
        서비스에서 제공하는 {policy}가 표시되는 영역입니다. 실제 서비스 적용 시 운영 정책을 연결해 주세요.
      </Modal>
    </section>
  );
}
