import { useState } from 'react'
import ChoiceExercise from './ChoiceExercise'
import FillExercise from './FillExercise'
import OrderExercise from './OrderExercise'
import ScenarioExercise from './ScenarioExercise'

const COMPONENTS = {
  choice: ChoiceExercise,
  fill: FillExercise,
  order: OrderExercise,
  scenario: ScenarioExercise,
}

export default function ExerciseRenderer({ exercises, moduleColor, onComplete }) {
  const [index, setIndex] = useState(0)
  const [results, setResults] = useState([])

  if (index >= exercises.length) {
    const passed = results.filter(Boolean).length
    return (
      <div className="text-center space-y-4 py-8">
        <div className="text-4xl">{passed === exercises.length ? '🎉' : '💪'}</div>
        <p className="text-lg font-medium">
          练习完成！{passed}/{exercises.length} 题正确
        </p>
        <button
          onClick={onComplete}
          className="px-6 py-2 rounded-lg text-white hover:opacity-90 transition-opacity"
          style={{ backgroundColor: moduleColor }}
        >
          完成本课 ✓
        </button>
      </div>
    )
  }

  const exercise = exercises[index]
  const Component = COMPONENTS[exercise.type]

  const handleResult = (correct) => {
    setResults((prev) => [...prev, correct])
  }

  const handleNext = () => {
    setIndex((i) => i + 1)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        {exercises.map((_, i) => (
          <div
            key={i}
            className="h-1.5 flex-1 rounded-full transition-colors"
            style={{
              backgroundColor: i < index ? moduleColor : i === index ? moduleColor + '80' : '#e5e7eb',
            }}
          />
        ))}
      </div>

      <p className="text-xs text-gray-500">
        练习 {index + 1} / {exercises.length}
      </p>

      <Component
        exercise={exercise}
        moduleColor={moduleColor}
        onResult={handleResult}
      />

      {results.length > index && index < exercises.length - 1 && (
        <button
          onClick={handleNext}
          className="px-5 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          下一题 →
        </button>
      )}

      {results.length > index && index === exercises.length - 1 && (
        <button
          onClick={handleNext}
          className="px-5 py-2 text-sm rounded-lg text-white hover:opacity-90 transition-opacity"
          style={{ backgroundColor: moduleColor }}
        >
          查看结果 →
        </button>
      )}
    </div>
  )
}
