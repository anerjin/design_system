import { Button, Card, Icon, type IconName } from '@bricks/core';
import { LoginForm } from './LoginForm';
import { modulesHref } from '../router';

const features: { icon: IconName; title: string; description: string }[] = [
  {
    icon: 'messages-square',
    title: '대화로 연결되는 아이디어',
    description: '생각을 나누고, 팀과 함께 더 나은 답을 찾아보세요.',
  },
  {
    icon: 'layers',
    title: '흩어진 작업을 한곳에',
    description: '문서와 프로젝트를 하나의 워크스페이스에서 관리하세요.',
  },
  {
    icon: 'monitor-smartphone',
    title: '어디서든 이어지는 작업',
    description: '데스크톱부터 모바일까지, 익숙한 방식 그대로.',
  },
];

/** login_02 + login_03: full-height split layout, brand story and tabbed auth. */
export function LoginType2() {
  return (
    <section className="login-layout login-layout-split" aria-label="브랜드 소개형 로그인">
      <aside className="login-story">
        <div className="login-brand">
          <span>
            <Icon name="blocks" size={19} />
          </span>
          DOI LABS
        </div>
        <div className="login-story-content">
          <span className="login-eyebrow">A SPACE FOR YOUR NEXT IDEA</span>
          <h2>
            함께 만드는 일, <br />더 단순하고 명확하게.
          </h2>
          <p>
            아이디어에서 완성까지.
            <br />
            팀의 모든 작업이 자연스럽게 이어지는 공간입니다.
          </p>
          <ul className="login-features">
            {features.map((feature) => (
              <li key={feature.icon}>
                <span className="login-feature-icon">
                  <Icon name={feature.icon} size={19} />
                </span>
                <div>
                  <strong>{feature.title}</strong>
                  <p>{feature.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <small>© {new Date().getFullYear()} DOI INC</small>
      </aside>
      <div className="login-split-main">
        <Card variant="border" className="login-card login-card-tabbed">
          <Card.Body>
            <LoginForm tabs social="github" />
          </Card.Body>
        </Card>
        <Button as="a" href={modulesHref} variant="link" size="sm" className="login-home">
          <Icon name="arrow-left" size={14} />
          홈으로
        </Button>
      </div>
    </section>
  );
}
