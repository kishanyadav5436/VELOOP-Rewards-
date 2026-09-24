import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { UserProvider } from './context/UserContext'
import GiveawayHome    from './pages/GiveawayHome/GiveawayHome'
import GiveawayDetails from './pages/GiveawayDetails/GiveawayDetails'
import NotFound        from './pages/NotFound/NotFound'

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/"               element={<GiveawayHome />} />
          <Route path="/giveaway/:slug" element={<GiveawayDetails />} />
          <Route path="*"               element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  )
}

export default App
