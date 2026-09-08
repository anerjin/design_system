import { useState } from 'react';
import { Alert, Button, Fieldset, Input, Label, Radio, Steps } from '@bricks/core';
export function OnboardingModule() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [plan, setPlan] = useState('팀');
  const [complete, setComplete] = useState(false);
  const [error, setError] = useState('');
  return (
    <>
      <Steps className="w-full" currentStep={complete ? 2 : step} steps={['이름', '사용 목적', '완료']} />
      {complete ? (
        <>
          <Alert
            icon={false}
            title="작업 공간이 준비되었습니다"
            description={`${name} · ${plan} 워크스페이스`}
          />
          <Button
            variant="surface"
            size="sm"
            onClick={() => {
              setComplete(false);
              setStep(0);
              setName('');
              setPlan('팀');
            }}
          >
            다시 시작
          </Button>
        </>
      ) : (
        <form
          className="module-form"
          onSubmit={(event) => {
            event.preventDefault();
            if (step === 0 && !name.trim()) {
              setError('워크스페이스 이름을 입력해 주세요.');
              return;
            }
            setError('');
            if (step < 2) setStep(step + 1);
            else setComplete(true);
          }}
        >
          {step === 0 && (
            <Fieldset hint="팀이나 프로젝트의 이름을 사용해 보세요.">
              <Label htmlFor="module-workspace-name" required>
                워크스페이스 이름
              </Label>
              <Input
                id="module-workspace-name"
                required
                maxLength={40}
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="예: DOI 디자인 팀"
              />
            </Fieldset>
          )}
          {step === 1 && (
            <Fieldset legend="어떻게 사용하시나요?">
              <div className="module-stack">
                {['개인', '팀'].map((value) => (
                  <Radio
                    key={value}
                    name="module-workspace-plan"
                    label={`${value} 작업`}
                    color="primary"
                    value={value}
                    checked={plan === value}
                    onChange={() => setPlan(value)}
                  />
                ))}
              </div>
            </Fieldset>
          )}
          {step === 2 && (
            <Fieldset legend="설정 확인">
              <div className="module-row">
                <span className="module-muted">이름</span>
                <strong className="break-all">{name}</strong>
              </div>
              <div className="module-row">
                <span className="module-muted">사용 목적</span>
                <strong>{plan} 작업</strong>
              </div>
              <Fieldset.Hint>이 예제는 실제 워크스페이스를 생성하지 않습니다.</Fieldset.Hint>
            </Fieldset>
          )}
          {error && <Alert color="error" description={error} />}
          <div className="module-row">
            <Button
              type="button"
              variant="surface"
              size="sm"
              disabled={step === 0}
              onClick={() => setStep(step - 1)}
            >
              이전
            </Button>
            <Button type="submit" color="primary" size="sm">
              {step === 2 ? '설정 완료' : '다음 단계'}
            </Button>
          </div>
        </form>
      )}
    </>
  );
}
