
import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  

  return (
    <>
      <Navbar />
      <main className='min-h-screen w-full mx-auto px-4 py-6 bg-neutral-100'>
      <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default App
