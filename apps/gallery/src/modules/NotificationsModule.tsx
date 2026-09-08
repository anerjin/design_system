import { useState } from 'react';
import { Alert, Button, Fieldset, Icon, Label, Select, Toggle } from '@bricks/core';
const defaults = { email: true, mentions: true, updates: false, frequency: 'daily' };
export function NotificationsModule() {
  const [saved, setSaved] = useState(defaults);
  const [settings, setSettings] = useState(defaults);
  const [message, setMessage] = useState('');
  const dirty = JSON.stringify(saved) !== JSON.stringify(settings);
  return (
    <>
      {(
        [
          { key: 'email', title: '이메일 알림', hint: '작업과 프로젝트의 주요 변경 사항' },
          { key: 'mentions', title: '멘션 알림', hint: '나를 언급한 댓글과 메시지' },
          { key: 'updates', title: '제품 소식', hint: '새로운 기능과 개선 안내' },
        ] as const
      ).map((item) => (
        <div className="module-settings-row" key={item.key}>
          <div>
            <Label htmlFor={`module-notice-${item.key}`}>{item.title}</Label>
            <p className="module-small">{item.hint}</p>
          </div>
          <Toggle
            id={`module-notice-${item.key}`}
            size="sm"
            color="primary"
            checked={settings[item.key]}
            onChange={(event) => {
              setSettings({ ...settings, [item.key]: event.target.checked });
              setMessage('');
            }}
          />
        </div>
      ))}
      <Fieldset
        hint={
          settings.email
            ? '이메일 알림을 모아 보내는 주기입니다.'
            : '이메일 알림을 켜면 주기를 선택할 수 있습니다.'
        }
      >
        <Label htmlFor="module-notice-frequency">이메일 발송 주기</Label>
        <Select
          id="module-notice-frequency"
          disabled={!settings.email}
          value={settings.frequency}
          onChange={(event) => {
            setSettings({ ...settings, frequency: event.target.value });
            setMessage('');
          }}
          options={[
            { value: 'instant', label: '변경될 때마다' },
            { value: 'daily', label: '하루에 한 번' },
            { value: 'weekly', label: '일주일에 한 번' },
          ]}
        />
      </Fieldset>
      {message && <Alert icon={<Icon name="check" size={20} />} description={message} />}
      <div className="module-row">
        <Button
          variant="surface"
          size="sm"
          disabled={!dirty}
          onClick={() => {
            setSettings(saved);
            setMessage('');
          }}
        >
          취소
        </Button>
        <Button
          color="primary"
          size="sm"
          disabled={!dirty}
          onClick={() => {
            setSaved(settings);
            setMessage('알림 설정을 저장했습니다.');
          }}
        >
          설정 저장
        </Button>
      </div>
    </>
  );
}
