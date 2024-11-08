import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from './assets/swapp-logo.svg';
import filtresData from './assets/valeurs_filtres.json';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q') || '';

  const handleLogoClick = () => {
    navigate('/'); // Redirige vers la page d'accueil
  };

  const valeursFiltres = filtresData?.Filtres || [];
  const categories = filtresData?.Catégories || [];

  const [filters, setFilters] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' }); // Store min and max price
  const [selectedValues, setSelectedValues] = useState({}); // Store selected filter values
  const [selectedCategory, setSelectedCategory] = useState(categories[0] || ''); // Set the default selected category to the first one

  const [openDropdown, setOpenDropdown] = useState(null); // Track the open dropdown
  const [openCategoriesDropdown, setOpenCategoriesDropdown] = useState(false); // Track the open Categories dropdown

  const dropdownRef = useRef(null);
  const categoriesDropdownRef = useRef(null);

  useEffect(() => {
    // Generate filter buttons with the count of available values
    const filterButtons = Object.keys(valeursFiltres).map((filterKey) => ({
      name: filterKey,
    }));

    // Add the custom "Prix" filter button
    filterButtons.push({ name: "Prix" });
    setFilters(filterButtons);
  }, []);

    // Fonction helper pour vérifier si un filtre est actif
    const isFilterActive = (filterName) => {
      if (filterName === 'Prix') {
        return priceRange.min !== '' || priceRange.max !== '';
      }
      return selectedValues[filterName]?.length > 0;
    };

  // Handle search on Enter key press
  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const newQuery = e.target.value;
      if (newQuery !== query) {
        navigate(`?q=${encodeURIComponent(newQuery)}`);
      }
    }
  };

  // Toggle dropdown visibility
  const handleDropdownToggle = (filterName) => {
    setOpenDropdown(openDropdown === filterName ? null : filterName);
  };

  // Toggle Categories dropdown visibility
  const handleCategoriesDropdownToggle = () => {
    setOpenCategoriesDropdown(!openCategoriesDropdown);
  };

  // Handle the checking state
  const handleCheckboxChange = (filterName, value) => {
    setSelectedValues(prevState => {
      const currentSelection = prevState[filterName] || [];
      if (currentSelection.includes(value)) {
        return { ...prevState, [filterName]: currentSelection.filter(val => val !== value) };
      } else {
        return { ...prevState, [filterName]: [...currentSelection, value] };
      }
    });
  };

  // Handle price range input change
  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPriceRange((prevRange) => ({ ...prevRange, [name]: value }));
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
      if (categoriesDropdownRef.current && !categoriesDropdownRef.current.contains(event.target)) {
        setOpenCategoriesDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle category selection
  const handleCategorySelection = (category) => {
    setSelectedCategory(category); // Update the selected category
    setOpenCategoriesDropdown(false); // Close the dropdown after selection
  };

  // Render Categories dropdown with selected category excluded
  const renderCategoriesDropdown = () => {
    return (
      <div className="dropdown-content" ref={categoriesDropdownRef}>
        <div className="dropdown-content-inner categories-dropdown-inner">
          {categories.filter(category => category !== selectedCategory).map((category, index) => (
            <div key={index} className="category-item" onClick={() => handleCategorySelection(category)}>
              {category}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render standard dropdown for filters
  const renderDropdown = (filterName, values) => {
    if (filterName === 'Prix') {
      // Custom dropdown content for "Prix"
      return (
        <div className="dropdown-content" ref={dropdownRef}>
          <div className="dropdown-content-inner">
            <div className="price-filter">
              <div className="price-filter-min">
                <label htmlFor="price-min">De</label>
                <input
                  type="number"
                  id="price-min"
                  className="input-price"
                  name="min"
                  value={priceRange.min}
                  onChange={handlePriceChange}
                  placeholder="Min"
                />
              </div>
              <div className="price-filter-max">
                <label htmlFor="price-max">À</label>
                <input
                  type="number"
                  id="price-max"
                  className="input-price"
                  name="max"
                  value={priceRange.max}
                  onChange={handlePriceChange}
                  placeholder="Max"
                />
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Default filter dropdown content
    const renderFilterValues = (filterValues) => {
      if (typeof filterValues === 'object' && !Array.isArray(filterValues)) {
        return Object.keys(filterValues).map((subcategory, index) => (
          <div key={index}>
            <h4>{subcategory}</h4>
            {filterValues[subcategory].map((value, valueIndex) => (
              <label key={valueIndex} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={selectedValues[filterName]?.includes(value) || false}
                  onChange={() => handleCheckboxChange(filterName, value)}
                />
                {value}
              </label>
            ))}
          </div>
        ));
      } else {
        return filterValues.map((value, index) => (
          <label key={index} className="checkbox-label">
            <input
              type="checkbox"
              checked={selectedValues[filterName]?.includes(value) || false}
              onChange={() => handleCheckboxChange(filterName, value)}
            />
            {value}
          </label>
        ));
      }
    };

    return (
      <div className="dropdown-content" ref={dropdownRef}>
        <div className="dropdown-content-inner">
          {renderFilterValues(values)}
        </div>
      </div>
    );
  };

  const renderFilterButtons = () => (
    filters.map((filter, index) => {
      const filterValues = valeursFiltres[filter.name];
      const isActive = isFilterActive(filter.name);
      return (
        <li key={index} className="filter-item">
          <button
            className={isActive ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              handleDropdownToggle(filter.name);
            }}
          >
            {filter.name}
            {isActive && (
              <span className="filter-count">
                {filter.name === 'Prix' 
                  ? '1'
                  : selectedValues[filter.name]?.length}
              </span>
            )}
            <i className="fa fa-angle-down button-icon-right"></i>
          </button>
          {openDropdown === filter.name && renderDropdown(filter.name, filterValues)}
        </li>
      );
    })
  );

  return (
    <header>
      <div id="main-header" className="conteneur">
        <div id="main-header-search">
                    <img 
            id="logo2" 
            src={logo} 
            alt="Swapp logo" 
            onClick={handleLogoClick} 
            style={{ cursor: 'pointer' }} // Change le curseur pour indiquer que c'est cliquable
          />
          <div id="full-search">
            <li className="filter-item">
              <button
                onClick={handleCategoriesDropdownToggle}
              >
                {selectedCategory || "Catégories"} <i className="fa fa-angle-down button-icon-right"></i>
              </button>
              {openCategoriesDropdown && renderCategoriesDropdown()}
            </li>
            <form id="search-form" name="search-form" action="" method="post" onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                className="input-search"
                name="search"
                placeholder="Search..."
                defaultValue={query}
                onKeyDown={handleSearchKeyPress}
                required
              />
            </form>
          </div>
        </div>
        <div id="main-header-buttons">
          <div>
            <button><i className="fa fa-shopping-cart button-icon-left"></i>Mon panier</button>
          </div>
          <div>
            <button><i className="fa fa-user button-icon-left"></i>Mon compte</button>
          </div>
        </div>
      </div>
      <div>
        <nav>
          <ul id="main-header-filters" className="conteneur">
            {renderFilterButtons()}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
