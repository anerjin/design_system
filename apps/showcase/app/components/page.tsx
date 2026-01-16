import Link from "next/link";

const components = [
  { name: "Accordion", category: "Data Display", description: "Expandable content sections", storybook: "components-accordion" },
  { name: "Alert", category: "Feedback", description: "Contextual feedback messages", storybook: "components-alert" },
  { name: "Avatar", category: "Data Display", description: "User profile images", storybook: "components-avatar" },
  { name: "Badge", category: "Data Display", description: "Status indicators and labels", storybook: "components-badge" },
  { name: "Breadcrumb", category: "Navigation", description: "Navigation path indicator", storybook: "components-breadcrumb" },
  { name: "Button", category: "Actions", description: "Interactive action triggers", storybook: "components-button" },
  { name: "Card", category: "Layout", description: "Content container with sections", storybook: "components-card" },
  { name: "Chart", category: "Data Display", description: "Data visualization charts", storybook: "components-chart" },
  { name: "Checkbox", category: "Forms", description: "Multiple selection input", storybook: "components-checkbox" },
  { name: "DatePicker", category: "Forms", description: "Date selection input", storybook: "components-datepicker" },
  { name: "Dropdown", category: "Navigation", description: "Expandable menu options", storybook: "components-dropdown" },
  { name: "Input", category: "Forms", description: "Text input field", storybook: "components-input" },
  { name: "Modal", category: "Overlays", description: "Dialog overlay component", storybook: "components-modal" },
  { name: "Navbar", category: "Navigation", description: "Top navigation bar", storybook: "components-navbar" },
  { name: "Pagination", category: "Navigation", description: "Page navigation control", storybook: "components-pagination" },
  { name: "Progress", category: "Feedback", description: "Progress indicator bar", storybook: "components-progress" },
  { name: "Radio", category: "Forms", description: "Single selection input", storybook: "components-radio" },
  { name: "Select", category: "Forms", description: "Dropdown selection input", storybook: "components-select" },
  { name: "Spinner", category: "Feedback", description: "Loading state indicator", storybook: "components-spinner" },
  { name: "Table", category: "Data Display", description: "Tabular data display", storybook: "components-table" },
  { name: "Tabs", category: "Navigation", description: "Tabbed content sections", storybook: "components-tabs" },
  { name: "Toggle", category: "Forms", description: "On/off switch input", storybook: "components-toggle" },
  { name: "Tooltip", category: "Overlays", description: "Hover information display", storybook: "components-tooltip" },
  { name: "Typography", category: "Foundation", description: "Text styling components", storybook: "components-typography" },
];

const isProd = process.env.NODE_ENV === "production";
const STORYBOOK_URL = isProd ? "/private_project_design_system/storybook" : "http://localhost:6006";

export default function ComponentsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <span className="font-semibold text-xl">BRICKS</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/components" className="text-gray-900 dark:text-white font-medium">
                Components
              </Link>
              <a
                href={STORYBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition"
              >
                Storybook ↗
              </a>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Components
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
            Browse all {components.length} components. Click any component to view interactive examples in Storybook.
          </p>
        </div>

        {/* Components Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {components.map((component) => (
            <a
              key={component.name}
              href={`${STORYBOOK_URL}/?path=/docs/${component.storybook}--docs`}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-400 font-semibold">
                    {component.name.charAt(0)}
                  </span>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                  {component.category}
                </span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition flex items-center gap-1">
                {component.name}
                <span className="text-gray-400 text-sm">↗</span>
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {component.description}
              </p>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}
