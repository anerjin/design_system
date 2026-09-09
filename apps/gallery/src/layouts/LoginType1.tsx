import { Card } from '@bricks/core';
import { LoginForm } from './LoginForm';

/** login_01: a compact, centered account card. */
export function LoginType1() {
  return (
    <section className="login-layout login-layout-simple" aria-label="중앙 카드형 로그인">
      <Card variant="border" className="login-card login-card-simple">
        <Card.Body>
          <LoginForm />
        </Card.Body>
      </Card>
    </section>
  );
}
