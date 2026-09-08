import { useEffect, useState, type ComponentType } from 'react';
import { Badge, Button, Icon, Input, Link } from '@bricks/core';
import { moduleCatalog, moduleCategories } from '../modules/catalog';
import { ModuleFrame } from '../modules/ModuleFrame';
import { AnalyticsModule } from '../modules/AnalyticsModule';
import { ProjectsModule } from '../modules/ProjectsModule';
import { TeamModule } from '../modules/TeamModule';
import { OrdersModule } from '../modules/OrdersModule';
import { OnboardingModule } from '../modules/OnboardingModule';
import { ProfileModule } from '../modules/ProfileModule';
import { NotificationsModule } from '../modules/NotificationsModule';
import { StorageModule } from '../modules/StorageModule';
import { KanbanModule } from '../modules/KanbanModule';
import { BookingModule } from '../modules/BookingModule';
import { BillingModule } from '../modules/BillingModule';
import { InboxModule } from '../modules/InboxModule';
import { ActivityModule } from '../modules/ActivityModule';
import { CartModule } from '../modules/CartModule';
import '../../../../packages/bricks/src/styles/examples.css';
import '../modules/modules.css';

const components: Record<string, ComponentType> = {
  analytics: AnalyticsModule,
  projects: ProjectsModule,
  team: TeamModule,
  orders: OrdersModule,
  onboarding: OnboardingModule,
  profile: ProfileModule,
  notifications: NotificationsModule,
  storage: StorageModule,
  kanban: KanbanModule,
  booking: BookingModule,
  billing: BillingModule,
  inbox: InboxModule,
  activity: ActivityModule,
  cart: CartModule,
};
export function Modules() {
  const [category, setCategory] = useState('전체');
  const [query, setQuery] = useState('');
  useEffect(() => {
    let frame = 0;
    const revealModule = () => {
      const requested = new URLSearchParams(window.location.hash.split('?')[1]).get('module');
      const entry = moduleCatalog.find((module) => module.id === requested || module.pageId === requested);
      if (!entry) return;
      setCategory('전체');
      setQuery('');
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() =>
        document.getElementById(entry.pageId)?.scrollIntoView({ block: 'start' }),
      );
    };
    revealModule();
    window.addEventListener('hashchange', revealModule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('hashchange', revealModule);
    };
  }, []);
  const visible = moduleCatalog.filter(
    (module) =>
      (category === '전체' || module.category === category) &&
      `${module.title} ${module.description} ${module.pageId} ${module.components.join(' ')}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  return (
    <div className="module-library bricks-example-boxes">
      <header className="module-page-heading">
        <span className="eyebrow">MODULE LIBRARY</span>
        <h1>모듈</h1>
        <p>
          DOI INC 컴포넌트로 구성한 {moduleCatalog.length}가지 모듈. 직접 사용해 보고, 필요한 구성을
          찾아보세요.
        </p>
      </header>
      <section aria-label="모듈 라이브러리">
        <div className="modules-toolbar">
          <div className="module-filter-buttons" role="group" aria-label="모듈 분류">
            {moduleCategories.map((item) => (
              <Button
                key={item}
                size="sm"
                color={category === item ? 'primary' : undefined}
                variant={category === item ? 'solid' : 'ghost'}
                aria-pressed={category === item}
                onClick={() => setCategory(item)}
              >
                {item}
              </Button>
            ))}
          </div>
          <div className="module-search">
            <Input
              size="sm"
              className="w-full"
              leftIcon={<Icon name="search" size={16} />}
              aria-label="모듈 검색"
              placeholder="모듈, 컴포넌트, ID 검색"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Badge variant="outline" className="shrink-0 whitespace-nowrap" aria-live="polite">
              {visible.length}개
            </Badge>
          </div>
        </div>
        <div className="modules-grid">
          {moduleCatalog.map((module) => {
            const Component = components[module.id];
            return (
              <div
                key={module.id}
                className={module.wide ? 'module-slot module-slot-wide' : 'module-slot'}
                hidden={!visible.includes(module)}
              >
                <ModuleFrame module={module}>
                  <Component />
                </ModuleFrame>
              </div>
            );
          })}
        </div>
        {!visible.length && (
          <div className="module-empty">
            <Icon name="search" size={24} />
            <p>조건에 맞는 모듈이 없습니다.</p>
            <Button
              variant="surface"
              size="sm"
              onClick={() => {
                setQuery('');
                setCategory('전체');
              }}
            >
              전체 모듈 보기
            </Button>
          </div>
        )}
      </section>
      <footer className="modules-footer">
        <span>변경 사항은 현재 화면에서만 유지됩니다.</span>
        <Link href="#/components" hoverOnly>
          전체 컴포넌트 보기 <Icon name="arrow-right" size={14} />
        </Link>
      </footer>
    </div>
  );
}
