import { useState } from 'react'
import KnowledgeCard from './KnowledgeCard'

export default function CardViewer({ cards, moduleColor, onComplete }) {
  const [index, setIndex] = useState(0)

  const card = cards[index]
  const isFirst = index === 0
  const isLast = index === cards.length - 1

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center gap-2">
        {cards.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-colors ${
              i === index ? 'scale-125' : ''
            }`}
            style={{
              backgroundColor: i <= index ? moduleColor : '#d1d5db',
            }}
          />
        ))}
      </div>

      <KnowledgeCard card={card} moduleColor={moduleColor} />

      <div className="flex items-center justify-between">
        <button
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={isFirst}
          className="px-4 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-600 disabled:opacity-30 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          ← 上一张
        </button>

        <span className="text-sm text-gray-500">
          {index + 1} / {cards.length}
        </span>

        {isLast ? (
          <button
            onClick={onComplete}
            className="px-4 py-2 text-sm rounded-lg text-white transition-colors hover:opacity-90"
            style={{ backgroundColor: moduleColor }}
          >
            开始练习 →
          </button>
        ) : (
          <button
            onClick={() => setIndex((i) => Math.min(cards.length - 1, i + 1))}
            className="px-4 py-2 text-sm rounded-lg text-white transition-colors hover:opacity-90"
            style={{ backgroundColor: moduleColor }}
          >
            下一张 →
          </button>
        )}
      </div>
    </div>
  )
}
