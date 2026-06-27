import { useState } from 'react'

export default function FillExercise({ exercise, moduleColor, onResult }) {
  const [answer, setAnswer] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [criteria, setCriteria] = useState(
    () => (exercise.criteria || []).map(() => false)
  )

  const allCriteriaMet = criteria.every(Boolean)

  const handleToggleCriteria = (i) => {
    setCriteria((prev) => {
      const next = [...prev]
      next[i] = !next[i]
      return next
    })
  }

  const handleSubmit = () => {
    setSubmitted(true)
  }

  const handleConfirm = () => {
    onResult(allCriteriaMet)
  }

  return (
    <div className="space-y-4">
      <p className="font-medium text-gray-800 dark:text-gray-200">{exercise.questionCn}</p>

      {exercise.passage && (
        <div className="p-4 bg-gray-50 dark:bg-[#12122a] rounded-lg border border-gray-200 dark:border-gray-600 text-sm">
          <span className="text-xs uppercase tracking-wider text-gray-400 block mb-1">原文</span>
          {exercise.passage}
        </div>
      )}

      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        disabled={submitted}
        placeholder="在此输入你的改写..."
        className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-[#1a1a2e] resize-none h-28 focus:outline-none focus:ring-2"
      />

      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={!answer.trim()}
          className="px-5 py-2 text-sm rounded-lg text-white disabled:opacity-40 hover:opacity-90 transition-opacity"
          style={{ backgroundColor: moduleColor }}
        >
          查看参考答案
        </button>
      )}

      {submitted && (
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
            <span className="text-xs uppercase tracking-wider text-blue-500 block mb-1">参考答案</span>
            <p className="text-sm text-blue-900 dark:text-blue-200">{exercise.modelAnswer}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              对照检查（点击勾选）：
            </p>
            <div className="space-y-2">
              {(exercise.criteria || []).map((criterion, i) => (
                <button
                  key={i}
                  onClick={() => handleToggleCriteria(i)}
                  className={`w-full text-left p-3 rounded-lg border text-sm transition-colors flex items-center gap-3 ${
                    criteria[i]
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                      : 'border-gray-200 dark:border-gray-600'
                  }`}
                >
                  <span className="w-5 h-5 rounded border-2 flex items-center justify-center text-xs flex-shrink-0"
                    style={{
                      borderColor: criteria[i] ? '#10B981' : '#d1d5db',
                      backgroundColor: criteria[i] ? '#10B981' : 'transparent',
                      color: criteria[i] ? 'white' : 'transparent',
                    }}
                  >
                    ✓
                  </span>
                  {criterion}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleConfirm}
            className="px-5 py-2 text-sm rounded-lg text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: allCriteriaMet ? '#10B981' : '#F59E0B' }}
          >
            {allCriteriaMet ? '✓ 全部达标，继续' : '部分未达标，仍然继续'}
          </button>
        </div>
      )}
    </div>
  )
}
