import { useState, useCallback, useEffect } from 'react'

const STORAGE_KEY = 'ink-to-nature-progress'

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function saveProgress(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export default function useProgress() {
  const [progress, setProgress] = useState(loadProgress)

  useEffect(() => {
    saveProgress(progress)
  }, [progress])

  const completeLesson = useCallback((lessonId) => {
    setProgress((prev) => ({ ...prev, [lessonId]: true }))
  }, [])

  const resetLesson = useCallback((lessonId) => {
    setProgress((prev) => {
      const next = { ...prev }
      delete next[lessonId]
      return next
    })
  }, [])

  const isLessonComplete = useCallback(
    (lessonId) => !!progress[lessonId],
    [progress]
  )

  const getModuleProgress = useCallback(
    (lessons) => {
      if (!lessons.length) return 0
      const done = lessons.filter((l) => progress[l.id]).length
      return Math.round((done / lessons.length) * 100)
    },
    [progress]
  )

  const resetAll = useCallback(() => {
    setProgress({})
  }, [])

  return { completeLesson, resetLesson, isLessonComplete, getModuleProgress, resetAll, progress }
}
