import { BrowserRouter, Route, Routes } from 'react-router-dom'
import StockDetailPage from './pages/StockDetailPage'
import StockOverviewPage from './pages/StockOverviewPage'
import { WatchListContextProvider } from './context/watchListContext'
import './App.css'
import Navbar from './components/Navbar'

function App() {
  return <div >
    <WatchListContextProvider>
      <BrowserRouter>
        <Navbar />
        <main className='container'>
          <Routes>
            <Route path="/" element={<StockOverviewPage />} />
            <Route path="/detail/:symbol" element={<StockDetailPage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </WatchListContextProvider>
  </div>
}

export default App
