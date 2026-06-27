export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-white dark:bg-[#1a1a2e] transition-colors">
      <header className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <a href="#/" className="text-xl font-bold tracking-tight">Ink to Nature</a>
      </header>
      <main className="max-w-5xl mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}
