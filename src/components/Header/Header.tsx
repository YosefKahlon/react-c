import { Link } from 'react-router-dom';
import { useFilterContext } from '../../context/FilterContext';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import './Header.css';

const Header = () => {
  const { toggleSidebar } = useFilterContext();

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo Section */}
        <Link to="/" className="logo">
          🛍️ MyStore
        </Link>

        {/* Navigation Links */}
        <nav className="nav-links">
          <Link to="/">Products</Link>
          <Link to="/about">About</Link>
        </nav>

        <div className="header-actions">
          {/* Theme Toggle */}
          <ThemeToggle />
          
          {/* Filter Button */}
          <button 
            className="filter-button"
            onClick={toggleSidebar}
            aria-label="Toggle filters"
          >
            🔍 Filters
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;