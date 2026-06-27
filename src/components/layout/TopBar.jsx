import { Link, useLocation } from 'react-router-dom'
import useTheme from '../../hooks/useTheme'
import allModules from '../../data/modules'

function buildBreadcrumbs(pathname) {
  const parts = pathname.split('/').filter(Boolean)
  const crumbs = [{ label: 'Home', path: '/' }]

  if (parts[0] === 'module' && parts[1]) {
    const mod = allModules.find((m) => m.moduleId === parts[1])
    crumbs.push({
      label: mod?.title || parts[1],
      path: `/module/${parts[1]}`,
    })
    if (parts[2] === 'lesson' && parts[3]) {
      const lesson = mod?.lessons.find((l) => l.id === parts[3])
      crumbs.push({
        label: lesson?.titleCn || parts[3],
        path: `/module/${parts[1]}/lesson/${parts[3]}`,
      })
    }
  }
  return crumbs
}

export default function TopBar() {
  const location = useLocation()
  const { dark, toggleTheme } = useTheme()
  const crumbs = buildBreadcrumbs(location.pathname)

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-[#1a1a2e] border-b border-gray-200 dark:border-gray-700 px-6 py-3">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <nav className="flex items-center gap-2 text-sm">
          {crumbs.map((crumb, i) => (
            <span key={crumb.path} className="flex items-center gap-2">
              {i > 0 && <span className="text-gray-400">/</span>}
              {i === crumbs.length - 1 ? (
                <span className="font-medium text-gray-900 dark:text-white">{crumb.label}</span>
              ) : (
                <Link to={crumb.path} className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
                  {crumb.label}
                </Link>
              )}
            </span>
          ))}
        </nav>
        <button
          onClick={toggleTheme}
          className="w-9 h-9 rounded-lg border border-gray-200 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Toggle theme"
        >
          {dark ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  )
}
