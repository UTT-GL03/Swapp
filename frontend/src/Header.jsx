import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from './assets/swapp-logo.svg';
import filtresData from './assets/valeurs_filtres.json';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q') || '';

  const handleLogoClick = () => {
    navigate('/');
  };

  // Get categories and filters from the new JSON structure
  const categories = filtresData?.categories?.values || [];
  const filtersData = filtresData?.filters || {};

  const [filters, setFilters] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [selectedValues, setSelectedValues] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(categories[0] || '');

  const [openDropdown, setOpenDropdown] = useState(null);
  const [openCategoriesDropdown, setOpenCategoriesDropdown] = useState(false);

  const dropdownRef = useRef(null);
  const categoriesDropdownRef = useRef(null);

  useEffect(() => {
    // Generate filter buttons using the new structure
    const filterButtons = Object.entries(filtersData).map(([key, value]) => ({
      key: value.key,
      displayName: value.displayName
    }));

    // Add the custom "Prix" filter button
    filterButtons.push({ key: "price", displayName: "Prix" });
    setFilters(filterButtons);
  }, []);

  const isFilterActive = (filterKey) => {
    if (filterKey === 'price') {
      return priceRange.min !== '' || priceRange.max !== '';
    }
    return selectedValues[filterKey]?.length > 0;
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const newQuery = e.target.value;
      if (newQuery !== query) {
        navigate(`?q=${encodeURIComponent(newQuery)}`);
      }
    }
  };

  const handleDropdownToggle = (filterKey) => {
    setOpenDropdown(openDropdown === filterKey ? null : filterKey);
  };

  const handleCategoriesDropdownToggle = () => {
    setOpenCategoriesDropdown(!openCategoriesDropdown);
  };

  const handleCheckboxChange = (filterKey, value) => {
    setSelectedValues(prevState => {
      const currentSelection = prevState[filterKey] || [];
      if (currentSelection.includes(value)) {
        return { ...prevState, [filterKey]: currentSelection.filter(val => val !== value) };
      } else {
        return { ...prevState, [filterKey]: [...currentSelection, value] };
      }
    });
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPriceRange((prevRange) => ({ ...prevRange, [name]: value }));
  };

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

  const handleCategorySelection = (category) => {
    setSelectedCategory(category);
    setOpenCategoriesDropdown(false);
  };

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

  const renderDropdown = (filterKey, displayName) => {
    if (filterKey === 'price') {
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

    const filterData = filtersData[filterKey];
    
    const renderFilterValues = (values, key) => {
      if (typeof values === 'object' && values !== null && !Array.isArray(values)) {
        // Handle nested structure (like sizes)
        return Object.entries(values).map(([subKey, subValue]) => (
          <div key={subKey}>
            <h4>{subValue.displayName}</h4>
            {subValue.values.map((value, valueIndex) => (
              <label key={valueIndex} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={selectedValues[key]?.includes(value) || false}
                  onChange={() => handleCheckboxChange(key, value)}
                />
                {value}
              </label>
            ))}
          </div>
        ));
      } else {
        // Handle flat arrays (like colors, materials, conditions)
        return values.map((value, index) => (
          <label key={index} className="checkbox-label">
            <input
              type="checkbox"
              checked={selectedValues[key]?.includes(value) || false}
              onChange={() => handleCheckboxChange(key, value)}
            />
            {value}
          </label>
        ));
      }
    };

    return (
      <div className="dropdown-content" ref={dropdownRef}>
        <div className="dropdown-content-inner">
          {renderFilterValues(filterData.values, filterKey)}
        </div>
      </div>
    );
  };

  const renderFilterButtons = () => (
    filters.map((filter, index) => {
      const isActive = isFilterActive(filter.key);
      return (
        <li key={index} className="filter-item">
          <button
            className={isActive ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              handleDropdownToggle(filter.key);
            }}
          >
            {filter.displayName}
            {isActive && (
              <span className="filter-count">
                {filter.key === 'price' 
                  ? '1'
                  : selectedValues[filter.key]?.length}
              </span>
            )}
            <i className="fa fa-angle-down button-icon-right"></i>
          </button>
          {openDropdown === filter.key && renderDropdown(filter.key, filter.displayName)}
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
            style={{ cursor: 'pointer' }}
          />
          <div id="full-search">
            <li className="filter-item">
              <button onClick={handleCategoriesDropdownToggle}>
                {selectedCategory || filtresData.categories.displayName} 
                <i className="fa fa-angle-down button-icon-right"></i>
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