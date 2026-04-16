import NavBar from './pages/NavBar'
import HeroPage from './pages/HeroPage'

function App() {

  return (
    <>
      <div className='fixed inset-0 -z-10 w-full h-full'>
        <video 
          src="/video_2.mp4" 
          autoPlay
          loop
          muted
          className='w-full h-full object-cover blur-[2px]'
         />
      </div>
      <NavBar />
      <HeroPage />

    </>
  )
}

export default App
