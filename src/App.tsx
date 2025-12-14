import './App.css'
import CounterWithEffect from './components/CounterWithEffect/CounterWithEffect'
import { Routes, Route, Link } from 'react-router-dom'
import About from './pages/About'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'

function App() {
  return (
    <>
      <nav>
        <Link to="/">Products</Link> |{" "}
        <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/products/:id" element={<ProductDetail />} />
      </Routes>
    </>
  )
}

export default App
