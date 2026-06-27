import { useParams, Link } from 'react-router-dom'
import { getModuleById } from '../data/modules'
import { useProgressContext } from '../context/ProgressContext'
import LessonStatus from '../components/progress/LessonStatus'
import ProgressRing from '../components/progress/ProgressRing'

export default function ModulePage() {
  const { moduleId } = useParams()
  const mod = getModuleById(moduleId)
  const { isLessonComplete, getModuleProgress } = useProgressContext()

  if (!mod) {
    return <div className="text-center text-gray-500 py-12">模块未找到</div>
  }

  const progress = getModuleProgress(mod.lessons)
  const firstIncomplete = mod.lessons.findIndex((l) => !isLessonComplete(l.id))

  const getStatus = (lesson, i) => {
    if (isLessonComplete(lesson.id)) return 'complete'
    if (i === firstIncomplete || (firstIncomplete === -1 && i === 0)) return 'current'
    return 'locked'
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: mod.color }} />
          <h1 className="text-2xl font-bold">{mod.title}</h1>
        </div>
        <p className="text-gray-500">{mod.descriptionCn}</p>
        <div className="flex items-center gap-4">
          <ProgressRing percent={progress} size={40} strokeWidth={3} color={mod.color} />
          <span className="text-sm text-gray-400">
            {mod.lessons.filter((l) => isLessonComplete(l.id)).length}/{mod.lessons.length} 课已完成
          </span>
        </div>
      </div>

      <div className="space-y-2">
        {mod.lessons.map((lesson, i) => {
          const status = getStatus(lesson, i)
          return (
            <Link
              key={lesson.id}
              to={status !== 'locked' ? `/module/${moduleId}/lesson/${lesson.id}` : '#'}
              onClick={(e) => status === 'locked' && e.preventDefault()}
              className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                status === 'locked'
                  ? 'border-gray-200 dark:border-gray-700 opacity-50 cursor-not-allowed'
                  : status === 'current'
                  ? 'border-2 hover:shadow-md'
                  : 'border-gray-200 dark:border-gray-600 hover:shadow-sm'
              }`}
              style={status === 'current' ? { borderColor: mod.color } : undefined}
            >
              <LessonStatus status={status} />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{lesson.titleCn}</p>
                <p className="text-xs text-gray-400 truncate">{lesson.title}</p>
              </div>
              <span className="text-xs text-gray-400 flex-shrink-0 hidden sm:inline">
                {lesson.cards.length} 卡片 · {lesson.exercises.length} 练习
              </span>
            </Link>
          )
        })}
      </div>

      {mod.lessons.length === 0 && (
        <div className="text-center text-gray-400 py-12">
          课程内容准备中...
        </div>
      )}
    </div>
  )
}
