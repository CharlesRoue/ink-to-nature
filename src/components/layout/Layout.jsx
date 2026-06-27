import TopBar from './TopBar'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-white dark:bg-[#1a1a2e] text-gray-900 dark:text-gray-100 transition-colors">
      <TopBar />
      <main className="max-w-5xl mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}
