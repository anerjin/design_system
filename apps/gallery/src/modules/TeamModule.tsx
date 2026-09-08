import { useState } from 'react';
import {
  Alert,
  Avatar,
  Badge,
  Button,
  Fieldset,
  Icon,
  Input,
  Label,
  List,
  Modal,
  Select,
} from '@bricks/core';
const initialMembers = [
  { id: '1', name: '김서준', email: 'seojun@doi.example', role: '관리자', pending: false },
  { id: '2', name: '이하윤', email: 'hayun@doi.example', role: '멤버', pending: false },
  { id: '3', name: '정민서', email: 'minseo@doi.example', role: '뷰어', pending: false },
];
export function TeamModule() {
  const [members, setMembers] = useState(initialMembers);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('멤버');
  const [error, setError] = useState('');
  return (
    <>
      <div className="module-row">
        <Badge variant="outline">{members.length}명</Badge>
        <Button
          size="sm"
          color="primary"
          leftIcon={<Icon name="plus" size={16} />}
          onClick={() => {
            setOpen(true);
            setError('');
          }}
        >
          팀원 초대
        </Button>
      </div>
      <List
        items={members.map((member) => ({
          id: member.id,
          leading: (
            <Avatar
              size="xs"
              color={member.pending ? 'secondary' : 'primary'}
              initials={member.name.slice(-2)}
            />
          ),
          content: (
            <div className="module-member">
              <strong>{member.name}</strong>
              {member.pending && (
                <Badge variant="soft" color="secondary" size="sm">
                  초대 대기
                </Badge>
              )}
            </div>
          ),
          wrapped: (
            <div className="module-row">
              <span className="module-small break-all">{member.email}</span>
              <Select
                size="sm"
                aria-label={`${member.name} 역할`}
                value={member.role}
                className="w-24"
                onChange={(event) =>
                  setMembers((current) =>
                    current.map((item) =>
                      item.id === member.id ? { ...item, role: event.target.value } : item,
                    ),
                  )
                }
                options={['관리자', '멤버', '뷰어'].map((value) => ({ value, label: value }))}
              />
            </div>
          ),
        }))}
      />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="팀원 초대"
        size="sm"
        footer={
          <>
            <Button variant="surface" onClick={() => setOpen(false)}>
              취소
            </Button>
            <Button color="primary" type="submit" form="module-invite-form">
              초대 추가
            </Button>
          </>
        }
      >
        <form
          id="module-invite-form"
          className="module-form"
          onSubmit={(event) => {
            event.preventDefault();
            const address = email.trim().toLowerCase();
            if (members.some((member) => member.email.toLowerCase() === address)) {
              setError('이미 등록된 이메일입니다.');
              return;
            }
            setMembers((current) => [
              ...current,
              { id: crypto.randomUUID(), name: address.split('@')[0], email: address, role, pending: true },
            ]);
            setOpen(false);
            setEmail('');
          }}
        >
          <Fieldset hint="현재 화면에만 초대 항목을 추가합니다.">
            <Label htmlFor="module-invite-email" required>
              이메일
            </Label>
            <Input
              id="module-invite-email"
              type="email"
              required
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setError('');
              }}
              placeholder="teammate@example.com"
            />
            <Label htmlFor="module-invite-role">역할</Label>
            <Select
              id="module-invite-role"
              value={role}
              onChange={(event) => setRole(event.target.value)}
              options={['관리자', '멤버', '뷰어'].map((value) => ({ value, label: value }))}
            />
          </Fieldset>
          {error && <Alert color="error" description={error} />}
        </form>
      </Modal>
    </>
  );
}
