import { useId, useState } from 'react';
import { Alert, Button, Divider, Fieldset, Icon, Input, Label, Modal, Tabs } from '@bricks/core';

type AuthMode = 'login' | 'signup';
type SocialStyle = 'google' | 'github' | 'multiple';

export function LoginForm({
  tabs = false,
  social = 'google',
  centered = false,
}: {
  tabs?: boolean;
  social?: SocialStyle;
  centered?: boolean;
}) {
  const id = useId();
  const [mode, setMode] = useState<AuthMode>('login');
  const content = (
    <CredentialsForm
      key={mode}
      mode={mode}
      social={social}
      heading={!tabs}
      centered={centered}
      onSwitchMode={() => setMode(mode === 'login' ? 'signup' : 'login')}
    />
  );

  if (!tabs) return content;
  return (
    <div className="login-tabbed-form">
      <header className="login-form-heading login-form-heading-centered">
        <h2>DOI LABS</h2>
        <p>당신의 다음 아이디어가 시작되는 곳</p>
      </header>
      <Tabs
        variant="box"
        size="sm"
        justified
        activeKey={`${id}-${mode}`}
        onChange={(key) => setMode(key === `${id}-signup` ? 'signup' : 'login')}
        contentClassName="login-tab-content"
        items={[
          { key: `${id}-login`, label: '로그인', content: mode === 'login' ? content : null },
          { key: `${id}-signup`, label: '회원가입', content: mode === 'signup' ? content : null },
        ]}
      />
    </div>
  );
}

function CredentialsForm({
  mode,
  social,
  heading,
  centered,
  onSwitchMode,
}: {
  mode: AuthMode;
  social: SocialStyle;
  heading: boolean;
  centered: boolean;
  onSwitchMode: () => void;
}) {
  const id = useId();
  const [showPassword, setShowPassword] = useState(false);
  const [notice, setNotice] = useState('');
  const [recover, setRecover] = useState(false);
  const signup = mode === 'signup';
  const providers =
    social === 'multiple' ? ['Apple', 'Google', 'GitHub'] : [social === 'github' ? 'GitHub' : 'Google'];

  return (
    <>
      <form
        className="login-form"
        aria-label={signup ? '회원가입' : '로그인'}
        onSubmit={(event) => {
          event.preventDefault();
          setNotice(
            signup
              ? '회원가입 입력을 확인했습니다. 실제 계정 생성은 인증 서비스 연결 후 사용할 수 있습니다.'
              : '로그인 입력을 확인했습니다. 실제 로그인은 인증 서비스 연결 후 사용할 수 있습니다.',
          );
        }}
      >
        {heading && (
          <header className={`login-form-heading${centered ? ' login-form-heading-centered' : ''}`}>
            <h2>{signup ? '새로운 시작을 함께해요' : centered ? '다시 만나 반가워요' : '계정에 로그인'}</h2>
            <p>
              {signup
                ? 'DOI LABS에서 나만의 작업 공간을 만들어 보세요.'
                : '이메일로 DOI LABS 워크스페이스에 로그인하세요.'}
            </p>
          </header>
        )}
        <Fieldset className="login-fields" aria-label={signup ? '계정 생성 정보' : '로그인 정보'}>
          {signup && (
            <div className="login-field">
              <Label htmlFor={`${id}-name`}>이름</Label>
              <Input
                id={`${id}-name`}
                name="name"
                autoComplete="name"
                placeholder="이름을 입력하세요"
                required
                maxLength={80}
              />
            </div>
          )}
          <div className="login-field">
            <Label htmlFor={`${id}-email`}>이메일</Label>
            <Input
              id={`${id}-email`}
              name="email"
              type="email"
              autoComplete="email"
              placeholder="name@company.com"
              required
            />
          </div>
          <div className="login-field">
            <div className="login-field-label">
              <Label htmlFor={`${id}-password`}>비밀번호</Label>
              {!signup && (
                <Button
                  variant="link"
                  size="xs"
                  className="login-text-action"
                  onClick={() => setRecover(true)}
                >
                  비밀번호 찾기
                </Button>
              )}
            </div>
            <div className="login-password">
              <Input
                id={`${id}-password`}
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete={signup ? 'new-password' : 'current-password'}
                placeholder={signup ? '8자 이상 입력하세요' : '비밀번호를 입력하세요'}
                minLength={signup ? 8 : undefined}
                required
              />
              <Button
                variant="ghost"
                size="xs"
                shape="circle"
                aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
                aria-pressed={showPassword}
                onClick={() => setShowPassword(!showPassword)}
              >
                <Icon name="eye" size={16} />
              </Button>
            </div>
          </div>
        </Fieldset>
        <Button color="primary" type="submit" block>
          {signup ? '계정 만들기' : '로그인'}
        </Button>
        {!signup && (
          <>
            {social !== 'google' && <Divider className="login-divider">또는 다음 계정으로 계속</Divider>}
            <div className={`login-social${social === 'multiple' ? ' login-social-multiple' : ''}`}>
              {providers.map((provider) => (
                <Button
                  key={provider}
                  variant="surface"
                  block
                  aria-label={`${provider}로 로그인`}
                  onClick={() => setNotice(`${provider} 로그인은 인증 서비스 연결 후 사용할 수 있습니다.`)}
                >
                  {social === 'multiple' ? provider : `${provider}로 계속하기`}
                </Button>
              ))}
            </div>
          </>
        )}
        {notice && (
          <Alert
            className="login-notice"
            variant="outline"
            icon={<Icon name="info" size={16} />}
            description={notice}
          />
        )}
        <p className="login-switch">
          {signup ? '이미 계정이 있으신가요?' : '아직 계정이 없으신가요?'}{' '}
          <Button variant="link" size="xs" className="login-text-action" onClick={onSwitchMode}>
            {signup ? '로그인' : '회원가입'}
          </Button>
        </p>
      </form>
      <Modal
        open={recover}
        onClose={() => setRecover(false)}
        title="비밀번호 찾기"
        size="sm"
        footer={
          <Button variant="surface" onClick={() => setRecover(false)}>
            닫기
          </Button>
        }
      >
        {recover && <PasswordRecovery />}
      </Modal>
    </>
  );
}

function PasswordRecovery() {
  const id = useId();
  const [submitted, setSubmitted] = useState(false);
  return (
    <form
      className="login-recovery"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <p>가입할 때 사용한 이메일을 입력해 주세요.</p>
      <Fieldset>
        <Label htmlFor={id}>이메일</Label>
        <Input
          id={id}
          type="email"
          name="recovery-email"
          autoComplete="email"
          placeholder="name@company.com"
          required
        />
      </Fieldset>
      <Button color="primary" type="submit" block>
        재설정 링크 요청
      </Button>
      {submitted && (
        <Alert variant="outline" description="입력을 확인했습니다. 이 예제는 이메일을 발송하지 않습니다." />
      )}
    </form>
  );
}
