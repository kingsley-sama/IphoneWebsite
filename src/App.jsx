import { useState } from 'react'
import './App.css'
import NavBar from './components/Navbar'
import Hero from './components/Hero'
import Highlights from './components/Highlights'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className='bg-black'>
      <NavBar />
      <Hero />
      <Highlights />
    </main>
  )
}

export default App
