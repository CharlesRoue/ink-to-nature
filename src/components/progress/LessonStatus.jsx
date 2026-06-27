export default function LessonStatus({ status }) {
  const styles = {
    complete: {
      bg: 'bg-green-100 dark:bg-green-900/30',
      icon: '✓',
      iconColor: 'text-green-600',
    },
    current: {
      bg: 'bg-blue-100 dark:bg-blue-900/30',
      icon: '▶',
      iconColor: 'text-blue-600',
    },
    locked: {
      bg: 'bg-gray-100 dark:bg-gray-700',
      icon: '🔒',
      iconColor: 'text-gray-400',
    },
  }
  const s = styles[status] || styles.locked
  return (
    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${s.bg} ${s.iconColor}`}>
      {s.icon}
    </span>
  )
}
