import { Routes, Route, Navigate } from 'react-router-dom'
import { ProgressProvider } from './context/ProgressContext'
import Layout from './components/layout/Layout'

function Placeholder({ text }) {
  return <div className="p-8 text-gray-500">{text}</div>
}

export default function App() {
  return (
    <ProgressProvider>
      <Routes>
        <Route path="/" element={<Layout><Placeholder text="Home — coming soon" /></Layout>} />
        <Route path="/module/:moduleId" element={<Layout><Placeholder text="Module — coming soon" /></Layout>} />
        <Route path="/module/:moduleId/lesson/:lessonId" element={<Layout><Placeholder text="Lesson — coming soon" /></Layout>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ProgressProvider>
  )
}
