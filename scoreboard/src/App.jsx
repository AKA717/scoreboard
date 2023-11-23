import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Scoreboard from './components/Leaderboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Scoreboard/>
    </>
  )
}

export default App
