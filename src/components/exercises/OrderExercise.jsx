import { useState } from 'react'

export default function OrderExercise({ exercise, moduleColor, onResult }) {
  const [items, setItems] = useState(() => {
    const arr = exercise.items.map((text, i) => ({ text, originalIndex: i }))
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
  })
  const [submitted, setSubmitted] = useState(false)
  const [dragIndex, setDragIndex] = useState(null)

  const isCorrect = items.every((item, i) => item.originalIndex === i)

  const handleDragStart = (i) => setDragIndex(i)
  const handleDragOver = (e) => e.preventDefault()
  const handleDrop = (i) => {
    if (dragIndex === null || dragIndex === i) return
    const next = [...items]
    const [moved] = next.splice(dragIndex, 1)
    next.splice(i, 0, moved)
    setItems(next)
    setDragIndex(null)
  }

  const moveItem = (i, direction) => {
    const next = [...items]
    const target = i + direction
    if (target < 0 || target >= next.length) return;
    [next[i], next[target]] = [next[target], next[i]]
    setItems(next)
  }

  const handleSubmit = () => {
    setSubmitted(true)
    onResult(isCorrect)
  }

  return (
    <div className="space-y-4">
      <p className="font-medium text-gray-800 dark:text-gray-200">{exercise.questionCn}</p>

      <div className="space-y-2">
        {items.map((item, i) => {
          let bg = 'bg-white dark:bg-[#1a1a2e]'
          if (submitted) {
            bg = item.originalIndex === i
              ? 'bg-green-50 dark:bg-green-900/20 border-green-500'
              : 'bg-red-50 dark:bg-red-900/20 border-red-500'
          }
          return (
            <div
              key={item.originalIndex}
              draggable={!submitted}
              onDragStart={() => handleDragStart(i)}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(i)}
              className={`p-3 rounded-lg border border-gray-200 dark:border-gray-600 text-sm flex items-center gap-3 ${bg} ${!submitted ? 'cursor-grab' : ''}`}
            >
              <span className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xs font-medium flex-shrink-0">
                {i + 1}
              </span>
              <span className="flex-1">{item.text}</span>
              {!submitted && (
                <div className="flex flex-col gap-1">
                  <button onClick={() => moveItem(i, -1)} className="text-gray-400 hover:text-gray-600 text-xs">▲</button>
                  <button onClick={() => moveItem(i, 1)} className="text-gray-400 hover:text-gray-600 text-xs">▼</button>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {!submitted && (
        <button
          onClick={handleSubmit}
          className="px-5 py-2 text-sm rounded-lg text-white hover:opacity-90 transition-opacity"
          style={{ backgroundColor: moduleColor }}
        >
          提交排序
        </button>
      )}

      {submitted && (
        <div className={`p-4 rounded-lg text-sm ${isCorrect ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300' : 'bg-orange-50 dark:bg-orange-900/20 text-orange-800 dark:text-orange-300'}`}>
          <p className="font-medium mb-1">{isCorrect ? '✓ 排序正确' : '部分顺序有误'}</p>
          {exercise.explanationCn && <p>{exercise.explanationCn}</p>}
        </div>
      )}
    </div>
  )
}
