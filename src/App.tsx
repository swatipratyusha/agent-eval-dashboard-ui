import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AgentsOverview } from './components/AgentsOverview'
import { AgentDetail } from './components/AgentDetail'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AgentsOverview />} />
        <Route path="/agent/:agentType" element={<AgentDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
