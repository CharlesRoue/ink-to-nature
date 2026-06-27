import { Routes, Route, Navigate } from 'react-router-dom'
import { ProgressProvider } from './context/ProgressContext'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import ModulePage from './pages/ModulePage'

function Placeholder({ text }) {
  return <div className="p-8 text-gray-500">{text}</div>
}

export default function App() {
  return (
    <ProgressProvider>
      <Routes>
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/module/:moduleId" element={<Layout><ModulePage /></Layout>} />
        <Route path="/module/:moduleId/lesson/:lessonId" element={<Layout><Placeholder text="Lesson — coming soon" /></Layout>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ProgressProvider>
  )
}
