import type { ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useFilterContext } from '../../context/FilterContext';
import { ThemeToggle } from '@my-app/ui';
import './Header.css';
import { LANGUAGE_STORAGE_KEY } from '@my-app/i18n';

const Header = () => {
  const { toggleSidebar } = useFilterContext();
  const { t, i18n } = useTranslation('common');

  const handleLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextLang = event.target.value;
    i18n.changeLanguage(nextLang);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLang);
    }
    document.documentElement.lang = nextLang;
    document.documentElement.dir = i18n.dir(nextLang);
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo Section */}
        <Link to="/" className="logo">
          🛍️ {t('appName')}
        </Link>

        {/* Navigation Links */}
        <nav className="nav-links">
          <Link to="/">{t('nav.products')}</Link>
          <Link to="/about">{t('nav.about')}</Link>
          <Link to="/register">{t('register')}</Link>
        </nav>


        <div className="header-actions">
          {/* Theme Toggle */}
          <ThemeToggle />

          <label className="language-select-label" htmlFor="language-select">
            {t('header.language')}
          </label>
          <select
            id="language-select"
            className="language-select"
            value={i18n.language}
            onChange={handleLanguageChange}
          >
            <option value="en">English</option>
            <option value="he">עברית</option>
          </select>
          
          {/* Filter Button */}
          <button 
            className="filter-button"
            onClick={toggleSidebar}
            aria-label={t('header.toggleFilters')}
          >
            🔍 {t('header.filters')}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;