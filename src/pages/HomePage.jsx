import allModules from '../data/modules'
import { useProgressContext } from '../context/ProgressContext'
import ModuleMap from '../components/progress/ModuleMap'
import ProgressRing from '../components/progress/ProgressRing'

export default function HomePage() {
  const { getModuleProgress } = useProgressContext()

  const totalLessons = allModules.reduce((sum, m) => sum + m.lessons.length, 0)
  const totalProgress = allModules.length
    ? Math.round(
        allModules.reduce((sum, m) => sum + getModuleProgress(m.lessons) * m.lessons.length, 0) /
          (totalLessons || 1)
      )
    : 0

  return (
    <div className="space-y-12">
      <div className="text-center space-y-4 py-8">
        <h1 className="text-4xl font-bold tracking-tight">Ink to Nature</h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          From first draft to Nature-level writing, one lesson at a time.
        </p>
        <div className="inline-flex items-center gap-3 text-sm text-gray-400">
          <span>{allModules.length} 模块</span>
          <span>·</span>
          <span>{totalLessons} 课</span>
          <span>·</span>
          <div className="flex items-center gap-1">
            <ProgressRing percent={totalProgress} size={28} strokeWidth={3} color="#3B82F6" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">学习路径</h2>
        <ModuleMap />
      </div>
    </div>
  )
}
