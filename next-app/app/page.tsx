import Link from "next/link";
import { ServerButton } from 'bricks/src/next/ServerButton';

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <main className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="text-center py-20">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            BRICKS Design System
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Next.js Integration with TypeScript & React
          </p>

          <div className="flex gap-4 justify-center">
            <Link href="/components">
              <ServerButton variant="primary" size="lg">
                View Components →
              </ServerButton>
            </Link>
            <Link href="/server-components">
              <ServerButton variant="secondary" size="lg">
                Server Components
              </ServerButton>
            </Link>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature Card 1 */}
            <div className="p-6 border rounded-lg dark:border-gray-700 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2">🎨 Design System</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Comprehensive design tokens, color palettes, typography, and spacing system.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="p-6 border rounded-lg dark:border-gray-700 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2">⚛️ React Components</h3>
              <p className="text-gray-600 dark:text-gray-400">
                11+ fully typed React components with TypeScript support.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="p-6 border rounded-lg dark:border-gray-700 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2">🌙 Dark Mode</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Built-in dark mode support with system preference detection.
              </p>
            </div>

            {/* Feature Card 4 */}
            <div className="p-6 border rounded-lg dark:border-gray-700 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2">📚 Storybook</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Interactive component documentation with Storybook integration.
              </p>
            </div>

            {/* Feature Card 5 */}
            <div className="p-6 border rounded-lg dark:border-gray-700 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2">🚀 Next.js Ready</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Optimized for Next.js App Router with Server Components support.
              </p>
            </div>

            {/* Feature Card 6 */}
            <div className="p-6 border rounded-lg dark:border-gray-700 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2">♿ Accessible</h3>
              <p className="text-gray-600 dark:text-gray-400">
                WCAG compliant components with ARIA attributes and keyboard navigation.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="py-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Quick Links</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/components" className="text-blue-600 hover:underline">
              Client Components Demo
            </Link>
            <span className="text-gray-400">•</span>
            <Link href="/server-components" className="text-blue-600 hover:underline">
              Server Components Demo
            </Link>
            <span className="text-gray-400">•</span>
            <a
              href="http://localhost:6006"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Storybook ↗
            </a>
            <span className="text-gray-400">•</span>
            <a
              href="https://github.com/anerjin/private_project_design_system"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              GitHub ↗
            </a>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="py-12 border-t dark:border-gray-700">
          <h2 className="text-2xl font-semibold mb-6 text-center">Tech Stack</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm">TypeScript</span>
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm">React 19</span>
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm">Next.js 15</span>
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm">Tailwind CSS</span>
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm">Storybook</span>
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm">Vite</span>
          </div>
        </section>
      </main>
    </div>
  );
}