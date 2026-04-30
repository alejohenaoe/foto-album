import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './pages/NavBar'
import HeroPage from './pages/HeroPage'
import WhatsAppButton from './components/WhatsAppButton'
import Login from './pages/Login'
import AdminPanel from './pages/AdminPanel'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home page */}
        <Route
          path="/"
          element={
            <>
              <div id='video-background' className='fixed inset-0 -z-10 w-full h-full'>
                <video src="/videos/video_background.mp4" autoPlay loop muted className='w-full h-full object-cover blur-[2px]'/>
              </div>
              <NavBar />
              <HeroPage />
              <WhatsAppButton />
            </>
          }
        />
        
        {/* Login page */}
        <Route path="/login" element={<Login />} />
        
        {/* Admin panel */}
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
