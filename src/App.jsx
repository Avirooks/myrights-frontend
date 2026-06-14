import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'

import HomePage from './pages/HomePage'
import QuestionnairePage from './pages/QuestionnairePage'
import DashboardPage from './pages/DashboardPage'
import RightDetailsPage from './pages/RightDetailsPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import FeedbackButton from './components/FeedbackButton'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/questionnaire" element={<QuestionnairePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/right/:id" element={<RightDetailsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <FeedbackButton />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App