import { useParams, Link } from 'react-router-dom'
import { getModuleById } from '../data/modules'

export default function ModulePage() {
  const { moduleId } = useParams()
  const mod = getModuleById(moduleId)

  if (!mod) {
    return <div className="text-center text-gray-500 py-12">模块未找到</div>
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: mod.color }} />
          <h1 className="text-2xl font-bold">{mod.title}</h1>
        </div>
        <p className="text-gray-500">{mod.descriptionCn}</p>
        <span className="text-sm text-gray-400">{mod.lessons.length} 课</span>
      </div>

      <div className="space-y-2">
        {mod.lessons.map((lesson) => (
          <Link
            key={lesson.id}
            to={`/module/${moduleId}/lesson/${lesson.id}`}
            className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 dark:border-gray-600 hover:shadow-md transition-all"
          >
            <div
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: mod.color }}
            />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{lesson.titleCn}</p>
              <p className="text-xs text-gray-400 truncate">{lesson.title}</p>
            </div>
            <span className="text-xs text-gray-400 flex-shrink-0 hidden sm:inline">
              {lesson.cards.length} 卡片 · {lesson.exercises.length} 练习
            </span>
          </Link>
        ))}
      </div>

      {mod.lessons.length === 0 && (
        <div className="text-center text-gray-400 py-12">
          课程内容准备中...
        </div>
      )}
    </div>
  )
}
