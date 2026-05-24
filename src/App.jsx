import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import QuestionnairePage from './pages/QuestionnairePage'
import DashboardPage from './pages/DashboardPage'
import RightDetailsPage from './pages/RightDetailsPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/questionnaire" element={<QuestionnairePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/right/:id" element={<RightDetailsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App