import { Link } from 'react-router-dom'
import allModules from '../../data/modules'
import { useProgressContext } from '../../context/ProgressContext'
import ProgressRing from './ProgressRing'

export default function ModuleMap() {
  const { getModuleProgress } = useProgressContext()

  return (
    <div className="flex flex-col md:flex-row items-stretch gap-4">
      {allModules.map((mod, i) => {
        const progress = getModuleProgress(mod.lessons)
        return (
          <div key={mod.moduleId} className="flex items-center gap-4 flex-1">
            <Link
              to={`/module/${mod.moduleId}`}
              className="flex-1 p-4 rounded-xl border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: mod.color }}
                />
                <span className="font-medium text-sm">{mod.title}</span>
              </div>
              <p className="text-xs text-gray-500 mb-3">{mod.titleCn}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">
                  {mod.lessons.length} 课
                </span>
                <ProgressRing percent={progress} size={36} strokeWidth={3} color={mod.color} />
              </div>
            </Link>
            {i < allModules.length - 1 && (
              <span className="text-gray-300 dark:text-gray-600 text-xl hidden md:block">→</span>
            )}
          </div>
        )
      })}
    </div>
  )
}
