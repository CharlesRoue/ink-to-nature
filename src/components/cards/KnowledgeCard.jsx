export default function KnowledgeCard({ card, moduleColor }) {
  return (
    <div className="border border-gray-200 dark:border-gray-600 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <div
        className="px-5 py-3 text-white font-medium text-sm"
        style={{ backgroundColor: moduleColor }}
      >
        {card.titleCn}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-gray-600">
        <div className="p-5">
          <div className="text-xs uppercase tracking-wider text-gray-400 mb-2">中文讲解</div>
          <div
            className="text-sm leading-relaxed text-gray-700 dark:text-gray-300"
            dangerouslySetInnerHTML={{
              __html: card.contentCn
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\n/g, '<br/>')
            }}
          />
        </div>

        <div className="p-5">
          <div className="text-xs uppercase tracking-wider text-gray-400 mb-2">English</div>
          <div
            className="text-sm leading-relaxed text-gray-700 dark:text-gray-300"
            dangerouslySetInnerHTML={{
              __html: (card.contentEn || '')
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\n/g, '<br/>')
            }}
          />
        </div>
      </div>

      {card.example && (
        <div className="border-t border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-[#12122a] px-5 py-4">
          <div className="text-xs font-medium text-gray-500 mb-1">{card.example.label}</div>
          <div className="text-sm italic text-gray-600 dark:text-gray-400 whitespace-pre-line">
            {card.example.text}
          </div>
        </div>
      )}
    </div>
  )
}
