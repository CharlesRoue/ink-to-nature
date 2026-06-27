import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getModuleById, getLessonById } from '../data/modules'
import { useProgressContext } from '../context/ProgressContext'
import CardViewer from '../components/cards/CardViewer'
import ExerciseRenderer from '../components/exercises/ExerciseRenderer'

export default function LessonPage() {
  const { moduleId, lessonId } = useParams()
  const navigate = useNavigate()
  const mod = getModuleById(moduleId)
  const lesson = getLessonById(moduleId, lessonId)
  const { completeLesson, isLessonComplete } = useProgressContext()

  const [mode, setMode] = useState('learn')
  const alreadyComplete = lesson ? isLessonComplete(lesson.id) : false

  if (!mod || !lesson) {
    return <div className="text-center text-gray-500 py-12">课程未找到</div>
  }

  const handleComplete = () => {
    completeLesson(lesson.id)
    const lessonIndex = mod.lessons.findIndex((l) => l.id === lessonId)
    const nextLesson = mod.lessons[lessonIndex + 1]
    if (nextLesson) {
      navigate(`/module/${moduleId}/lesson/${nextLesson.id}`)
    } else {
      navigate(`/module/${moduleId}`)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-xl font-bold">{lesson.titleCn}</h1>
        <p className="text-sm text-gray-500">{lesson.title}</p>
      </div>

      <div className="flex gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg w-fit">
        <button
          onClick={() => setMode('learn')}
          className={`px-4 py-2 text-sm rounded-md transition-colors ${
            mode === 'learn'
              ? 'bg-white dark:bg-gray-700 shadow-sm font-medium'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          📖 学习
        </button>
        <button
          onClick={() => setMode('practice')}
          className={`px-4 py-2 text-sm rounded-md transition-colors ${
            mode === 'practice'
              ? 'bg-white dark:bg-gray-700 shadow-sm font-medium'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          ✍️ 练习
        </button>
      </div>

      {alreadyComplete && (
        <div className="text-xs text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-3 py-2 rounded-lg inline-block">
          ✓ 已完成此课
        </div>
      )}

      {mode === 'learn' ? (
        <CardViewer
          cards={lesson.cards}
          moduleColor={mod.color}
          onComplete={() => setMode('practice')}
        />
      ) : (
        <ExerciseRenderer
          exercises={lesson.exercises}
          moduleColor={mod.color}
          onComplete={handleComplete}
        />
      )}
    </div>
  )
}
