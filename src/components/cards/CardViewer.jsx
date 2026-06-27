import KnowledgeCard from './KnowledgeCard'

export default function CardViewer({ cards, moduleColor, onComplete }) {
  return (
    <div className="space-y-5">
      {/* All cards displayed at once, scrollable */}
      {cards.map((card) => (
        <KnowledgeCard key={card.id} card={card} moduleColor={moduleColor} />
      ))}

      {/* Start practice button */}
      <div className="flex justify-center pt-4">
        <button
          onClick={onComplete}
          className="px-6 py-2.5 text-sm rounded-lg text-white transition-colors hover:opacity-90"
          style={{ backgroundColor: moduleColor }}
        >
          开始练习 →
        </button>
      </div>
    </div>
  )
}
