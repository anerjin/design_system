import { useState, type ReactNode } from 'react';
import { Card, Button, Icon, Link, Divider } from '@bricks/core';
import { detailHref } from '../router';
import type { ModuleDefinition } from './catalog';
export function ModuleFrame({ module, children }: { module: ModuleDefinition; children: ReactNode }) {
  const [copyStatus, setCopyStatus] = useState('');
  return (
    <Card
      variant="border"
      className="module-card"
      id={module.pageId}
      data-page-id={module.pageId}
      data-module-id={module.id}
      aria-labelledby={`${module.id}-title`}
    >
      <Card.Body>
        <div className="module-card-heading">
          <Icon name={module.icon} size={20} />
          <Card.Title id={`${module.id}-title`}>{module.title}</Card.Title>
        </div>
        <p className="module-muted">{module.description}</p>
        <div className="module-content">{children}</div>
        <Divider className="my-1" />
        <footer className="module-composition">
          <div className="module-component-links" aria-label="사용한 컴포넌트">
            {[...new Set(['Card', ...module.components])].map((name) => (
              <Link
                key={name}
                href={detailHref(name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase())}
                hoverOnly
              >
                {name}
              </Link>
            ))}
          </div>
          <div className="module-copy-row">
            <Button
              variant="ghost"
              size="xs"
              aria-label={`${module.pageId} 복사`}
              leftIcon={<Icon name={copyStatus === '복사됨' ? 'check' : 'copy'} size={12} />}
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(module.pageId);
                  setCopyStatus('복사됨');
                } catch {
                  setCopyStatus('ID 텍스트를 선택해 복사해 주세요.');
                }
              }}
            >
              {module.pageId}
            </Button>
            <span role="status">{copyStatus}</span>
          </div>
        </footer>
      </Card.Body>
    </Card>
  );
}
