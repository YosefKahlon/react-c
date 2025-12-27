import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '../../api/productApi';
import { useFilterContext } from '../../context/FilterContext';
import './FilterSidebar.css';




const FilterSidebar = () => {

    const{sidebarOpen, closeSidebar, selectCategory, setSelectCategory} = useFilterContext();


    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories,
    });



    const handleCategoryClick = (categorySlug: string) => {
        setSelectCategory(categorySlug);
    };


    const handleClearFilters = () => {
        setSelectCategory("");
    };


return (
    <>
      {/* Dark Overlay */}
      {sidebarOpen && (
        <div 
          className="sidebar-overlay"
          onClick={closeSidebar}
          aria-label="Close sidebar"
        />
      )}

      {/* Sidebar Panel */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Filters</h2>
          <button 
            className="close-button"
            onClick={closeSidebar}
            aria-label="Close filters"
          >
            ✕
          </button>
        </div>

        <div className="sidebar-content">
          {/* Categories Section */}
          <div className="filter-section">
            <h3>Categories</h3>
            <ul className="category-list">
              <li>
                <button
                  className={`category-button ${selectCategory === '' ? 'active' : ''}`}
                  onClick={() => handleCategoryClick('')}
                >
                  All Products
                </button>
              </li>
              {categories?.map((category) => (
                <li key={category.slug}>
                  <button
                    className={`category-button ${selectCategory === category.slug ? 'active' : ''}`}
                    onClick={() => handleCategoryClick(category.slug)}
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Clear Filters Button */}
          <button 
            className="clear-button"
            onClick={handleClearFilters}
          >
            Clear All Filters
          </button>
        </div>
      </aside>
    </>
  );
};

export default FilterSidebar;
