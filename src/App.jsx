import { Routes, Route, Navigate } from 'react-router-dom'
import { ProgressProvider } from './context/ProgressContext'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import ModulePage from './pages/ModulePage'
import LessonPage from './pages/LessonPage'

export default function App() {
  return (
    <ProgressProvider>
      <Routes>
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/module/:moduleId" element={<Layout><ModulePage /></Layout>} />
        <Route path="/module/:moduleId/lesson/:lessonId" element={<Layout><LessonPage /></Layout>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ProgressProvider>
  )
}
