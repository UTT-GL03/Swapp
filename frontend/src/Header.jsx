import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from './assets/swapp-logo.svg';
import filtresData from './assets/valeurs_filtres.json';

const Header = ({ selectedValues, priceRange, selectedCategory, onFilterChange }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q') || '';

  // Temporary states for open dropdown
  const [tempSelectedValues, setTempSelectedValues] = useState(selectedValues);
  const [tempPriceRange, setTempPriceRange] = useState(priceRange);
  const [tempSelectedCategory, setTempSelectedCategory] = useState(selectedCategory);

  const [filters, setFilters] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openCategoriesDropdown, setOpenCategoriesDropdown] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const dropdownRef = useRef(null);
  const categoriesDropdownRef = useRef(null);

  // Reset temp states when dropdown opens
  useEffect(() => {
    if (openDropdown) {
      setTempSelectedValues(selectedValues);
      setTempPriceRange(priceRange);
      setHasChanges(false);
    }
  }, [openDropdown]);

  useEffect(() => {
    const filterButtons = Object.entries(filtresData.filters).map(([key, value]) => ({
      key: value.key,
      displayName: value.displayName
    }));
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

  const applyFilters = () => {
    if (hasChanges) {
      onFilterChange({
        selectedValues: tempSelectedValues,
        priceRange: tempPriceRange,
        selectedCategory: tempSelectedCategory
      });
      setHasChanges(false);
    }
  };

  const handleDropdownToggle = (filterKey) => {
    if (openDropdown === filterKey) {
      applyFilters();
      setOpenDropdown(null);
    } else {
      setOpenDropdown(filterKey);
    }
  };

  const handleCheckboxChange = (filterKey, value) => {
    setTempSelectedValues(prev => {
      const currentSelection = prev[filterKey] || [];
      if (currentSelection.includes(value)) {
        return {
          ...prev,
          [filterKey]: currentSelection.filter(val => val !== value)
        };
      } else {
        return {
          ...prev,
          [filterKey]: [...currentSelection, value]
        };
      }
    });
    setHasChanges(true);
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setTempPriceRange(prev => ({
      ...prev,
      [name]: value
    }));
    setHasChanges(true);
  };

  const handleCategorySelection = (category) => {
    setTempSelectedCategory(category);
    onFilterChange({
      selectedValues: tempSelectedValues,
      priceRange: tempPriceRange,
      selectedCategory: category
    });
    setOpenCategoriesDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        applyFilters();
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
  }, [tempSelectedValues, tempPriceRange, hasChanges]);

  const handleLogoClick = () => {
    navigate('/');
  };

  const renderCategoriesDropdown = () => {
    return (
      <div className="dropdown-content" ref={categoriesDropdownRef}>
        <div className="dropdown-content-inner categories-dropdown-inner">
          {filtresData?.categories?.values?.filter(category => category !== tempSelectedCategory).map((category, index) => (
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
                  value={tempPriceRange.min}
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
                  value={tempPriceRange.max}
                  onChange={handlePriceChange}
                  placeholder="Max"
                />
              </div>
            </div>
          </div>
        </div>
      );
    }

    const filterData = filtresData?.filters[filterKey];

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
                checked={tempSelectedValues[filterKey]?.includes(value) || false}
                onChange={() => handleCheckboxChange(filterKey, value)}
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
                checked={tempSelectedValues[filterKey]?.includes(value) || false}
                onChange={() => handleCheckboxChange(filterKey, value)}
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
                  : tempSelectedValues[filter.key]?.length}
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
              <button onClick={() => setOpenCategoriesDropdown(!openCategoriesDropdown)}>
                {tempSelectedCategory || filtresData.categories.displayName} 
                <i className="fa fa-angle-down button-icon-right"></i>
              </button>
              {openCategoriesDropdown && renderCategoriesDropdown()}
            </li>
            <form id="search-form" name="search-form" onSubmit={(e) => e.preventDefault()}>
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
