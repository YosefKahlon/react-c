import './App.css'
import CounterWithEffect from './components/CounterWithEffect/CounterWithEffect'
import { Routes, Route, Link } from 'react-router-dom'
import About from './pages/About'

function App() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={
          <>
            <h1>My React App</h1>
            <h2>Counter With Effect Component:</h2>
            <CounterWithEffect />
          </>
        } />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  )
}

export default App
