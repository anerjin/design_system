import { Icon } from './Icon';
import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { FileInput } from './FileInput';
import { Fieldset } from './Fieldset';
import { Button } from './Button';

const MB = 1024 * 1024;
const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const meta: Meta<typeof FileInput> = {
  title: 'Data Input/FileInput',
  component: FileInput,
  parameters: {
    layout: 'padded',
    gallery: {
      description:
        '이미지를 눌러 바꾸는 프로필, 문서를 놓는 드롭 영역, 사진 갤러리와 메시지 첨부 등 화면에 자연스럽게 녹아드는 파일 선택.',
      daisyui: 'file-input',
      props: [
        { name: 'accept', type: 'string', description: '선택 가능한 파일 형식' },
        { name: 'multiple', type: 'boolean', description: '여러 파일 선택' },
        {
          name: 'onChange',
          type: 'ChangeEventHandler<HTMLInputElement>',
          description: '선택한 FileList 처리',
        },
        { name: 'disabled', type: 'boolean', defaultValue: 'false' },
        { name: 'size', type: 'xs | sm | md | lg | xl', defaultValue: 'md' },
        { name: 'color', type: 'neutral | primary | … | error | ghost' },
      ],
    },
  },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof meta>;

function formatSize(bytes: number) {
  return bytes >= MB ? `${(bytes / MB).toFixed(1)} MB` : `${Math.max(1, Math.ceil(bytes / 1024))} KB`;
}
function fileKey(file: File) {
  return `${file.name}-${file.size}-${file.lastModified}`;
}
function useImagePreview(file: File | null) {
  const [url, setUrl] = useState<string>();
  useEffect(() => {
    if (!file) {
      setUrl(undefined);
      return;
    }
    const next = URL.createObjectURL(file);
    setUrl(next);
    return () => URL.revokeObjectURL(next);
  }, [file]);
  return url;
}
function FileList({ files, onRemove }: { files: File[]; onRemove: (index: number) => void }) {
  return (
    <ul className="file-example-list" aria-label="선택한 파일">
      {files.map((file, index) => (
        <li key={fileKey(file)}>
          <Icon name="file" size="1em" aria-hidden="true" />
          <span className="file-example-file">
            <strong>{file.name}</strong>
            <span>{formatSize(file.size)}</span>
          </span>
          <Button
            size="sm"
            variant="ghost"
            shape="circle"
            aria-label={`${file.name} 삭제`}
            onClick={() => onRemove(index)}
          >
            <Icon name="x" size="1em" aria-hidden="true" />
          </Button>
        </li>
      ))}
    </ul>
  );
}

/** A real button keeps file selection accessible by mouse, Enter and Space. */
function DropArea({
  onFiles,
  describedBy,
  children,
}: {
  onFiles: (files: File[]) => void;
  describedBy: string;
  children: ReactNode;
}) {
  const input = useRef<HTMLInputElement>(null);
  const depth = useRef(0);
  const [dragging, setDragging] = useState(false);
  return (
    <>
      <FileInput
        ref={input}
        className="file-example-native"
        tabIndex={-1}
        accept=".pdf,.doc,.docx"
        aria-label="이력서 파일 선택"
        onChange={(event) => {
          onFiles(Array.from(event.currentTarget.files ?? []));
          event.currentTarget.value = '';
        }}
      />
      <button
        type="button"
        className={'file-example-dropzone' + (dragging ? ' is-dragging' : '')}
        aria-label="이력서 파일 선택"
        aria-describedby={describedBy}
        onClick={() => input.current?.click()}
        onDragEnter={(event) => {
          event.preventDefault();
          depth.current++;
          setDragging(true);
        }}
        onDragOver={(event) => {
          event.preventDefault();
          event.dataTransfer.dropEffect = 'copy';
        }}
        onDragLeave={(event) => {
          event.preventDefault();
          if (--depth.current <= 0) {
            depth.current = 0;
            setDragging(false);
          }
        }}
        onDrop={(event) => {
          event.preventDefault();
          depth.current = 0;
          setDragging(false);
          onFiles(Array.from(event.dataTransfer.files));
        }}
      >
        {children}
      </button>
    </>
  );
}

function ImageTile({
  file,
  primary,
  onPrimary,
  onRemove,
}: {
  file: File;
  primary: boolean;
  onPrimary: () => void;
  onRemove: () => void;
}) {
  const url = useImagePreview(file);
  const [failed, setFailed] = useState(false);
  return (
    <li className="file-example-image-tile">
      <button
        type="button"
        className="file-example-thumbnail"
        aria-label={`${file.name} 대표 이미지로 설정`}
        aria-pressed={primary}
        onClick={onPrimary}
      >
        {failed ? (
          <span className="file-example-note">미리보기 없음</span>
        ) : (
          <img src={url} alt={file.name} onError={() => setFailed(true)} />
        )}
        <span className={'file-example-image-badge' + (primary ? ' is-primary' : '')}>
          {primary ? '대표 이미지' : '대표로 설정'}
        </span>
      </button>
      <button
        type="button"
        className="file-example-image-remove"
        aria-label={`${file.name} 삭제`}
        onClick={onRemove}
      >
        <Icon name="x" size="1em" aria-hidden="true" />
      </button>
      <span className="file-example-image-name" title={file.name}>
        {file.name}
      </span>
    </li>
  );
}

export const Default: Story = {
  name: '메시지에 파일 첨부',
  render: function BasicAttachment(args) {
    const id = useId();
    const input = useRef<HTMLInputElement>(null);
    const [files, setFiles] = useState<File[]>([]);
    return (
      <Fieldset bordered legend="팀에 자료 공유" className="file-example">
        <p className="file-example-description">메시지를 작성하다가 클립 버튼으로 자료를 첨부해 보세요.</p>
        <textarea
          className="file-example-message"
          aria-label="메시지"
          placeholder="공유할 내용을 입력하세요…"
          rows={3}
        />
        <FileInput
          {...args}
          id={id}
          ref={input}
          className="file-example-native"
          tabIndex={-1}
          aria-label="메시지 첨부 파일"
          aria-describedby={`${id}-hint`}
          onChange={(event) => {
            setFiles(Array.from(event.currentTarget.files ?? []));
            args.onChange?.(event);
          }}
        />
        <div className="file-example-composer-toolbar">
          <Button
            size="sm"
            variant="surface"
            aria-label="메시지에 파일 첨부"
            disabled={args.disabled}
            onClick={() => input.current?.click()}
          >
            <Icon name="paperclip" size="1em" aria-hidden="true" />
            파일 첨부
          </Button>
          <span id={`${id}-hint`} className="file-example-note">
            첨부한 파일은 아래에 표시됩니다.
          </span>
        </div>
        <FileList
          files={files}
          onRemove={(index) => {
            setFiles(files.filter((_, i) => i !== index));
            if (input.current) input.current.value = '';
          }}
        />
        <p className="file-example-note" role="status">
          {files.length ? `${files.length}개 파일 선택됨` : '선택한 파일이 없습니다.'}
        </p>
      </Fieldset>
    );
  },
};

export const ProfilePhoto: Story = {
  name: '프로필 사진 변경',
  render: function ProfilePhotoExample() {
    const id = useId();
    const input = useRef<HTMLInputElement>(null);
    const [photo, setPhoto] = useState<File | null>(null);
    const [saved, setSaved] = useState<File | null>(null);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const preview = useImagePreview(photo);
    const dirty = photo !== saved;
    const resetInput = () => {
      if (input.current) input.current.value = '';
    };
    return (
      <Fieldset bordered legend="프로필 사진 변경" className="file-example">
        <p className="file-example-description">사진 위의 카메라 아이콘을 눌러 나를 표현해 보세요.</p>
        <div className="file-example-profile">
          <button
            type="button"
            className="file-example-avatar-trigger"
            aria-label="프로필 사진 변경"
            aria-describedby={`${id}-hint ${id}-error`}
            onClick={() => input.current?.click()}
          >
            <span className="file-example-avatar">
              {preview ? (
                <img
                  src={preview}
                  alt="선택한 프로필 사진 미리보기"
                  onError={() => {
                    setError('이미지를 읽을 수 없습니다. 다른 사진을 선택하세요.');
                    setPhoto(null);
                    resetInput();
                  }}
                />
              ) : (
                <Icon name="user-round" size="1em" aria-label="기본 프로필" role="img" />
              )}
            </span>
            <span className="file-example-avatar-overlay" aria-hidden="true">
              변경
            </span>
            <span className="file-example-camera" aria-hidden="true">
              <Icon name="camera" size="1em" />
            </span>
          </button>
          <div className="file-example-picker">
            <strong className="file-example-profile-name">DOI 멤버</strong>
            <span className="file-example-note">사진 영역을 클릭해 변경하세요.</span>
            <FileInput
              id={id}
              ref={input}
              accept="image/jpeg,image/png,image/webp"
              className="file-example-native"
              tabIndex={-1}
              aria-label="프로필 사진 파일"
              aria-invalid={!!error}
              aria-describedby={`${id}-hint ${id}-error`}
              onChange={(event) => {
                const file = event.currentTarget.files?.[0];
                if (!file) return;
                setMessage('');
                if (!IMAGE_TYPES.includes(file.type) || file.size > 5 * MB) {
                  setError('JPG, PNG, WebP 이미지 중 5MB 이하 파일을 선택하세요.');
                  resetInput();
                  return;
                }
                setError('');
                setPhoto(file);
              }}
            />
            <Fieldset.Hint id={`${id}-hint`}>JPG, PNG, WebP · 최대 5MB</Fieldset.Hint>
          </div>
        </div>
        {photo && (
          <div className="file-example-selection">
            <span>{photo.name}</span>
            <Button
              size="sm"
              variant="surface"
              onClick={() => {
                setPhoto(null);
                setError('');
                setMessage('');
                resetInput();
              }}
            >
              사진 제거
            </Button>
          </div>
        )}
        <p id={`${id}-error`} className="file-example-error" role="alert">
          {error}
        </p>
        <div className="file-example-actions">
          <Button
            variant="surface"
            disabled={!dirty}
            onClick={() => {
              setPhoto(saved);
              setError('');
              setMessage('변경을 취소했습니다.');
              resetInput();
            }}
          >
            취소
          </Button>
          <Button
            color="primary"
            disabled={!dirty || !!error}
            onClick={() => {
              setSaved(photo);
              setMessage('이 예제의 프로필에 적용했습니다.');
            }}
          >
            사진 적용
          </Button>
        </div>
        <p className="file-example-note" role="status">
          {message || '사진은 이 예제에서만 미리보기로 사용되며, 서버로 전송되지 않습니다.'}
        </p>
      </Fieldset>
    );
  },
};

export const DocumentAttachment: Story = {
  name: '드래그해서 이력서 첨부',
  render: function DocumentExample() {
    const id = useId();
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState('');
    return (
      <Fieldset bordered legend="함께할 준비가 되셨나요?" className="file-example">
        <p className="file-example-description">이력서를 아래에 놓거나, 영역을 클릭해 첨부하세요.</p>
        <DropArea
          describedBy={`${id}-hint ${id}-error`}
          onFiles={(incoming) => {
            if (!incoming.length) return;
            const next = incoming[0];
            if (incoming.length !== 1 || !/\.(pdf|doc|docx)$/i.test(next.name) || next.size > 10 * MB) {
              setError('PDF 또는 Word 문서 1개를 선택하세요. 최대 용량은 10MB입니다.');
              return;
            }
            setError('');
            setFile(next);
          }}
        >
          <span className="file-example-drop-icon">
            <Icon name={file ? 'check' : 'cloud-upload'} size="1em" aria-hidden="true" />
          </span>
          <strong>{file ? '다른 이력서로 교체하기' : '이력서를 여기에 놓아주세요'}</strong>
          <span className="file-example-note">또는 클릭해서 파일 찾기</span>
          <span className="file-example-file-types" aria-hidden="true">
            <span>PDF</span>
            <span>DOC</span>
            <span>DOCX</span>
          </span>
        </DropArea>
        <Fieldset.Hint id={`${id}-hint`}>파일 1개 · 최대 10MB</Fieldset.Hint>
        <p id={`${id}-error`} className="file-example-error" role="alert">
          {error}
        </p>
        <FileList
          files={file ? [file] : []}
          onRemove={() => {
            setFile(null);
            setError('');
          }}
        />
        <p className="file-example-note" role="status">
          {file ? '첨부할 문서를 선택했습니다.' : '아직 첨부한 이력서가 없습니다.'}
        </p>
      </Fieldset>
    );
  },
};

export const MultipleFiles: Story = {
  name: '이미지 갤러리 · 대표 사진 선택',
  render: function ImageGalleryExample() {
    const id = useId();
    const input = useRef<HTMLInputElement>(null);
    const [files, setFiles] = useState<File[]>([]);
    const [primary, setPrimary] = useState('');
    const [error, setError] = useState('');
    const primaryKey = files.some((file) => fileKey(file) === primary)
      ? primary
      : files[0] && fileKey(files[0]);
    return (
      <Fieldset bordered legend="프로젝트 갤러리" className="file-example">
        <p className="file-example-description">
          작업 이미지를 모아보세요. 사진을 클릭하면 대표 이미지로 지정됩니다.
        </p>
        <FileInput
          id={id}
          ref={input}
          accept="image/jpeg,image/png,image/webp"
          multiple
          className="file-example-native"
          tabIndex={-1}
          aria-label="갤러리 이미지 파일"
          onChange={(event) => {
            const incoming = Array.from(event.currentTarget.files ?? []);
            event.currentTarget.value = '';
            if (!incoming.length) return;
            if (incoming.some((file) => !IMAGE_TYPES.includes(file.type) || file.size > 5 * MB)) {
              setError('JPG, PNG, WebP 이미지만 추가할 수 있으며, 파일당 최대 5MB입니다.');
              return;
            }
            const combined = [
              ...new Map([...files, ...incoming].map((file) => [fileKey(file), file])).values(),
            ];
            if (combined.length > 6) {
              setError('이미지는 최대 6장까지 추가할 수 있습니다.');
              return;
            }
            setError('');
            setFiles(combined);
          }}
        />
        <ul className="file-example-gallery" aria-label="프로젝트 이미지">
          {files.map((file, index) => (
            <ImageTile
              key={fileKey(file)}
              file={file}
              primary={fileKey(file) === primaryKey}
              onPrimary={() => setPrimary(fileKey(file))}
              onRemove={() => {
                setFiles(files.filter((_, i) => i !== index));
                setError('');
              }}
            />
          ))}
          {files.length < 6 && (
            <li className="file-example-add-tile">
              <button
                type="button"
                aria-label="갤러리에 이미지 추가"
                aria-describedby={`${id}-hint ${id}-error`}
                onClick={() => input.current?.click()}
              >
                <Icon name="plus" size="1em" aria-hidden="true" />
                <strong>사진 추가</strong>
                <span>{files.length} / 6</span>
              </button>
            </li>
          )}
        </ul>
        <Fieldset.Hint id={`${id}-hint`}>JPG, PNG, WebP · 최대 6장 · 파일당 5MB</Fieldset.Hint>
        <p id={`${id}-error`} className="file-example-error" role="alert">
          {error}
        </p>
        <div className="file-example-selection">
          <p className="file-example-note" role="status">
            {files.length
              ? `대표 이미지: ${files.find((file) => fileKey(file) === primaryKey)?.name}`
              : '첫 번째 사진이 대표 이미지가 됩니다.'}
          </p>
          {!!files.length && (
            <Button
              size="sm"
              variant="surface"
              onClick={() => {
                setFiles([]);
                setPrimary('');
                setError('');
              }}
            >
              모두 삭제
            </Button>
          )}
        </div>
      </Fieldset>
    );
  },
};

export const CoverImage: Story = {
  name: '클릭해서 커버 이미지 변경',
  render: function CoverImageExample() {
    const id = useId();
    const input = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState('');
    const preview = useImagePreview(file);
    return (
      <Fieldset bordered legend="프로젝트 커버" className="file-example">
        <p className="file-example-description">넓은 커버 영역을 클릭해 프로젝트의 첫인상을 바꿔보세요.</p>
        <FileInput
          ref={input}
          className="file-example-native"
          tabIndex={-1}
          accept="image/jpeg,image/png,image/webp"
          aria-label="커버 이미지 파일"
          onChange={(event) => {
            const next = event.currentTarget.files?.[0];
            event.currentTarget.value = '';
            if (!next) return;
            if (!IMAGE_TYPES.includes(next.type) || next.size > 5 * MB) {
              setError('JPG, PNG, WebP 이미지 중 5MB 이하 파일을 선택하세요.');
              return;
            }
            setError('');
            setFile(next);
          }}
        />
        <button
          type="button"
          className="file-example-cover"
          aria-label="커버 이미지 변경"
          aria-describedby={`${id}-hint ${id}-error`}
          onClick={() => input.current?.click()}
        >
          {preview ? (
            <img
              src={preview}
              alt="프로젝트 커버 미리보기"
              onError={() => {
                setFile(null);
                setError('이미지를 읽을 수 없습니다. 다른 파일을 선택하세요.');
              }}
            />
          ) : (
            <span className="file-example-cover-placeholder">
              <Icon name="image-plus" size="1em" aria-hidden="true" />
              <strong>이 프로젝트만의 장면을 담아보세요</strong>
              <span>클릭해서 커버 추가</span>
            </span>
          )}
          <span className="file-example-cover-edit">
            <Icon name="camera" size="1em" aria-hidden="true" />
            {file ? '커버 변경' : '커버 추가'}
          </span>
        </button>
        <div className="file-example-cover-caption">
          <span className="file-example-note">WORKSPACE / DESIGN</span>
          <strong>새로운 브랜드의 시작</strong>
          <span className="file-example-note">아이디어부터 완성까지, 팀의 작업을 한곳에.</span>
        </div>
        <div className="file-example-selection">
          <Fieldset.Hint id={`${id}-hint`}>가로형 이미지 권장 · JPG, PNG, WebP · 최대 5MB</Fieldset.Hint>
          {file && (
            <Button
              size="sm"
              variant="surface"
              onClick={() => {
                setFile(null);
                setError('');
              }}
            >
              커버 제거
            </Button>
          )}
        </div>
        <p id={`${id}-error`} className="file-example-error" role="alert">
          {error}
        </p>
      </Fieldset>
    );
  },
};
