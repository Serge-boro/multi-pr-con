import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import OtherPage from './OtherPage'
import Fib from './Fib'
import NavBar from './NavBar'
function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path='otherPage' element={<OtherPage />} />
          <Route path='/' element={<Fib />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
