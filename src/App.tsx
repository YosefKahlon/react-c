import './App.css'
import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Header from './components/Header/Header'
import FilterSidebar from './components/FilterSidebar/FilterSidebar'
import ToastHost from './components/ToastHost/ToastHost'
import GlobalLoading from './components/GlobalLoading/GlobalLoading'
import About from './pages/About'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import { FilterProvider } from './context/FilterContext'
import { useThemeStore } from './stores/theme'
import { applyPrimeTheme } from './utils/primeTheme'


function App() {
  const theme = useThemeStore((state) => state.theme);
  const primeTheme = useThemeStore((state) => state.primeTheme);
  const { i18n } = useTranslation();

  // Apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = i18n.dir();
  }, [i18n, i18n.language]);

  useEffect(() => {
    applyPrimeTheme(primeTheme);
  }, [primeTheme]);

  return (
    //Puts the Provider at the top so all routes/pages can share the filter + sidebar state.
    <FilterProvider>
      <GlobalLoading />
      <Header />
      <FilterSidebar />
      <ToastHost />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/products/:id" element={<ProductDetail />} />
      </Routes>
    </FilterProvider>
  )
}

export default App
