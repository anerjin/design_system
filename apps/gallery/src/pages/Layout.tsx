import { PageIdentity } from '../components/PageIdentity';
import { ThreeColumnLayout } from '../layouts/ThreeColumnLayout';
import { LoginType1 } from '../layouts/LoginType1';
import { LoginType2 } from '../layouts/LoginType2';
import { LoginType3 } from '../layouts/LoginType3';
import { DashboardType01 } from '../layouts/DashboardType01';
import { DashboardType02 } from '../layouts/DashboardType02';
import { findLayout } from '../layouts/catalog';
import '../layouts/layouts.css';
import '../layouts/login-layouts.css';

const examples = {
  'login-1': LoginType1,
  'login-2': LoginType2,
  'login-3': LoginType3,
  'three-column': ThreeColumnLayout,
  'dashboard-01': DashboardType01,
  'dashboard-02': DashboardType02,
};

export function Layout({ layoutId }: { layoutId?: string }) {
  const layout = findLayout(layoutId);
  const Example = examples[layout.id];
  return (
    <section className="layout-page layout-library" aria-label="레이아웃">
      <header className="layout-page-toolbar">
        <h1>{layout.title}</h1>
        <PageIdentity key={layout.pageId} pageId={layout.pageId} compact />
      </header>
      <article className="layout-example" id={layout.pageId} data-page-id={layout.pageId}>
        <Example key={layout.id} />
      </article>
    </section>
  );
}
