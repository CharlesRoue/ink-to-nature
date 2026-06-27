import { useState } from 'react'

export default function ChoiceExercise({ exercise, moduleColor, onResult }) {
  const [selected, setSelected] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const isCorrect = selected === exercise.correct

  const handleSubmit = () => {
    if (selected === null) return
    setSubmitted(true)
    onResult(isCorrect)
  }

  return (
    <div className="space-y-4">
      <p className="font-medium text-gray-800 dark:text-gray-200">{exercise.questionCn}</p>

      <div className="space-y-2">
        {exercise.options.map((opt, i) => {
          let borderColor = 'border-gray-200 dark:border-gray-600'
          if (submitted) {
            if (i === exercise.correct) borderColor = 'border-green-500 bg-green-50 dark:bg-green-900/20'
            else if (i === selected && !isCorrect) borderColor = 'border-red-500 bg-red-50 dark:bg-red-900/20'
          } else if (i === selected) {
            borderColor = 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
          }
          return (
            <button
              key={i}
              onClick={() => !submitted && setSelected(i)}
              disabled={submitted}
              className={`w-full text-left p-3 rounded-lg border text-sm transition-colors ${borderColor}`}
            >
              {opt}
            </button>
          )
        })}
      </div>

      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={selected === null}
          className="px-5 py-2 text-sm rounded-lg text-white disabled:opacity-40 hover:opacity-90 transition-opacity"
          style={{ backgroundColor: moduleColor }}
        >
          提交答案
        </button>
      )}

      {submitted && (
        <div className={`p-4 rounded-lg text-sm ${isCorrect ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300' : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300'}`}>
          <p className="font-medium mb-1">{isCorrect ? '✓ 正确' : '✗ 不正确'}</p>
          <p>{exercise.explanationCn}</p>
          {exercise.explanationEn && (
            <p className="mt-2 text-xs italic opacity-75">{exercise.explanationEn}</p>
          )}
        </div>
      )}
    </div>
  )
}
