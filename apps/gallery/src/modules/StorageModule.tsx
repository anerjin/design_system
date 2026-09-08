import { useRef, useState } from 'react';
import { Alert, Badge, Button, FileInput, Icon, List, RadialProgress } from '@bricks/core';
const MB = 1024 * 1024;
const initialFiles = [
  { id: 'guide', name: '브랜드 가이드.pdf', size: 3 * MB },
  { id: 'design', name: '홈 화면 시안.png', size: 4 * MB },
  { id: 'notes', name: '프로젝트 메모.txt', size: MB },
];
function sizeLabel(bytes: number) {
  return bytes >= MB ? `${(bytes / MB).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}
export function StorageModule() {
  const [files, setFiles] = useState(initialFiles);
  const [error, setError] = useState('');
  const input = useRef<HTMLInputElement>(null);
  const used = files.reduce((sum, file) => sum + file.size, 0);
  function addFiles(selected: FileList | null) {
    if (!selected?.length) return;
    const next = [...files];
    for (const file of Array.from(selected)) {
      if (!next.some((item) => item.name === file.name && item.size === file.size))
        next.push({ id: crypto.randomUUID(), name: file.name, size: file.size });
    }
    if (next.length > 8) {
      setError('파일은 최대 8개까지 추가할 수 있습니다.');
      return;
    }
    if (next.reduce((sum, file) => sum + file.size, 0) > 20 * MB) {
      setError('저장 공간 20MB를 초과했습니다. 파일을 삭제한 뒤 다시 추가해 주세요.');
      return;
    }
    setFiles(next);
    setError('');
  }
  return (
    <>
      <div className="module-storage-summary">
        <RadialProgress
          value={(used / (20 * MB)) * 100}
          size="6rem"
          thickness="6px"
          aria-label="저장 공간 사용률"
        />
        <div>
          <strong>{sizeLabel(used)} 사용 중</strong>
          <p className="module-small">전체 20 MB · {sizeLabel(20 * MB - used)} 남음</p>
          <Badge variant="outline" size="sm">
            {files.length}개 파일
          </Badge>
        </div>
      </div>
      <Button
        variant="surface"
        leftIcon={<Icon name="plus" size={16} />}
        onClick={() => input.current?.click()}
      >
        파일 추가
      </Button>
      <FileInput
        ref={input}
        multiple
        className="hidden"
        tabIndex={-1}
        aria-label="보관함 파일 선택"
        onChange={(event) => {
          addFiles(event.target.files);
          event.target.value = '';
        }}
      />
      {error && <Alert color="error" description={error} />}
      {files.length ? (
        <List
          items={files.map((file) => ({
            id: file.id,
            leading: <Icon name="file" size={20} />,
            content: (
              <div className="module-member">
                <span>{file.name}</span>
                <span className="module-small">{sizeLabel(file.size)}</span>
              </div>
            ),
            trailing: (
              <Button
                variant="ghost"
                shape="circle"
                size="xs"
                aria-label={`${file.name} 삭제`}
                onClick={() => {
                  setFiles((current) => current.filter((item) => item.id !== file.id));
                  setError('');
                }}
              >
                <Icon name="x" size={14} />
              </Button>
            ),
          }))}
        />
      ) : (
        <Alert
          icon={<Icon name="folder" size={20} />}
          description="아직 파일이 없습니다. 첫 파일을 추가해 보세요."
        />
      )}
      <p className="module-small">선택한 파일은 서버에 업로드되지 않습니다.</p>
    </>
  );
}
