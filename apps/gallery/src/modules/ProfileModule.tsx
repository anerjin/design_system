import { useEffect, useRef, useState } from 'react';
import { Alert, Avatar, Button, Fieldset, FileInput, Icon, Input, Label } from '@bricks/core';
interface Profile {
  name: string;
  email: string;
  photo: File | null;
}
const initial: Profile = { name: '김서준', email: 'seojun@doi.example', photo: null };
export function ProfileModule() {
  const [saved, setSaved] = useState(initial);
  const [draft, setDraft] = useState(initial);
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const request = useRef(0);
  useEffect(
    () => () => {
      request.current++;
    },
    [],
  );
  useEffect(() => {
    if (!draft.photo) {
      setUrl('');
      return;
    }
    const next = URL.createObjectURL(draft.photo);
    setUrl(next);
    return () => URL.revokeObjectURL(next);
  }, [draft.photo]);
  const dirty = draft.name !== saved.name || draft.email !== saved.email || draft.photo !== saved.photo;
  async function choose(file?: File) {
    if (!file) return;
    const token = ++request.current;
    setMessage('');
    setError('');
    if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type) || file.size > 5 * 1024 * 1024) {
      setPending(false);
      setError('JPG, PNG, WebP 이미지(5MB 이하)를 선택해 주세요.');
      return;
    }
    setPending(true);
    const preview = URL.createObjectURL(file);
    try {
      const image = new Image();
      image.src = preview;
      await image.decode();
      if (token === request.current) setDraft((current) => ({ ...current, photo: file }));
    } catch {
      if (token === request.current) setError('이미지를 읽을 수 없습니다. 다른 파일을 선택해 주세요.');
    } finally {
      URL.revokeObjectURL(preview);
      if (token === request.current) setPending(false);
    }
  }
  return (
    <form
      className="module-form"
      onSubmit={(event) => {
        event.preventDefault();
        if (!draft.name.trim()) {
          setError('이름을 입력해 주세요.');
          return;
        }
        setSaved(draft);
        setError('');
        setMessage('프로필 변경을 적용했습니다.');
      }}
    >
      <div className="module-row">
        <div className="module-file-trigger">
          <Button
            type="button"
            variant="ghost"
            shape="circle"
            size="xl"
            aria-label="프로필 이미지 변경"
            onClick={() => input.current?.click()}
          >
            <Avatar
              src={url || undefined}
              alt="내 프로필"
              initials={draft.name || '나'}
              size="sm"
              color="primary"
            />
          </Button>
          <span className="module-small">사진을 눌러 변경 · 최대 5MB</span>
        </div>
        {draft.photo && (
          <Button
            type="button"
            variant="ghost"
            size="xs"
            onClick={() => {
              request.current++;
              setPending(false);
              setDraft((current) => ({ ...current, photo: null }));
              setMessage('');
            }}
          >
            사진 제거
          </Button>
        )}
      </div>
      <FileInput
        ref={input}
        className="hidden"
        tabIndex={-1}
        accept="image/png,image/jpeg,image/webp"
        aria-label="프로필 이미지 파일"
        onChange={(event) => {
          void choose(event.target.files?.[0]);
          event.target.value = '';
        }}
      />
      <Fieldset>
        <div className="module-field">
          <Label htmlFor="module-profile-name" required>
            이름
          </Label>
          <Input
            id="module-profile-name"
            required
            maxLength={40}
            value={draft.name}
            onChange={(event) => {
              setDraft({ ...draft, name: event.target.value });
              setMessage('');
            }}
          />
        </div>
        <div className="module-field">
          <Label htmlFor="module-profile-email" required>
            이메일
          </Label>
          <Input
            id="module-profile-email"
            type="email"
            required
            value={draft.email}
            onChange={(event) => {
              setDraft({ ...draft, email: event.target.value });
              setMessage('');
            }}
          />
        </div>
      </Fieldset>
      {error && <Alert color="error" description={error} />}
      {message && <Alert icon={<Icon name="check" size={20} />} description={message} />}
      <div className="module-row">
        <Button
          type="button"
          variant="surface"
          size="sm"
          disabled={!dirty && !pending && !error}
          onClick={() => {
            request.current++;
            setPending(false);
            setDraft(saved);
            setError('');
            setMessage('');
          }}
        >
          취소
        </Button>
        <Button color="primary" type="submit" size="sm" disabled={!dirty || pending}>
          {pending ? '이미지 확인 중' : '프로필 저장'}
        </Button>
      </div>
    </form>
  );
}
