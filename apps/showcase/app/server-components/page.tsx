import { ServerButton } from 'bricks/src/next/ServerButton';

export default function ServerComponentsPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Server Components Demo</h1>
        <p className="text-gray-600 dark:text-gray-400">
          These components are rendered on the server without client-side JavaScript.
        </p>
      </div>

      <div className="space-y-8">
        {/* Server Buttons Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Server-Side Buttons</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Note: These buttons don't have onClick handlers as they're server components.
          </p>

          <div className="space-y-4">
            {/* Button Variants */}
            <div>
              <h3 className="text-lg font-medium mb-2">Variants</h3>
              <div className="flex flex-wrap gap-2">
                <ServerButton variant="primary">Primary</ServerButton>
                <ServerButton variant="secondary">Secondary</ServerButton>
                <ServerButton variant="success">Success</ServerButton>
                <ServerButton variant="danger">Danger</ServerButton>
                <ServerButton variant="warning">Warning</ServerButton>
                <ServerButton variant="info">Info</ServerButton>
              </div>
            </div>

            {/* Button Sizes */}
            <div>
              <h3 className="text-lg font-medium mb-2">Sizes</h3>
              <div className="flex items-center gap-2">
                <ServerButton size="sm">Small</ServerButton>
                <ServerButton size="md">Medium</ServerButton>
                <ServerButton size="lg">Large</ServerButton>
              </div>
            </div>

            {/* Button States */}
            <div>
              <h3 className="text-lg font-medium mb-2">States</h3>
              <div className="flex gap-2">
                <ServerButton>Normal</ServerButton>
                <ServerButton disabled>Disabled</ServerButton>
              </div>
            </div>

            {/* Button with Icons */}
            <div>
              <h3 className="text-lg font-medium mb-2">With Icons</h3>
              <div className="flex gap-2">
                <ServerButton leftIcon="🚀">Launch</ServerButton>
                <ServerButton rightIcon="→">Next</ServerButton>
                <ServerButton leftIcon="←" rightIcon="→">Navigate</ServerButton>
                <ServerButton iconOnly>⚙️</ServerButton>
              </div>
            </div>

            {/* Full Width Button */}
            <div>
              <h3 className="text-lg font-medium mb-2">Full Width</h3>
              <ServerButton fullWidth variant="primary">
                Full Width Button
              </ServerButton>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Use Cases for Server Components</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg dark:border-gray-700">
              <h3 className="font-semibold mb-2">✅ Good for:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Static content that doesn't need interactivity</li>
                <li>SEO-critical elements</li>
                <li>Initial page load performance</li>
                <li>Reducing JavaScript bundle size</li>
              </ul>
            </div>
            <div className="p-4 border rounded-lg dark:border-gray-700">
              <h3 className="font-semibold mb-2">❌ Not suitable for:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Interactive elements (onClick, onChange)</li>
                <li>Components that need state</li>
                <li>Real-time updates</li>
                <li>Client-side animations</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Navigation Links */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Navigation</h2>
          <div className="flex gap-4">
            <a href="/" className="text-blue-500 hover:underline">
              ← Back to Home
            </a>
            <a href="/components" className="text-blue-500 hover:underline">
              View Client Components →
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}