import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from './assets/swapp-logo.svg';
import filtresData from './assets/valeurs_filtres.json';

// Custom hooks
const useFilterState = (initialValues, initialPriceRange, initialCategory) => {
  const [tempValues, setTempValues] = useState(initialValues);
  const [tempPriceRange, setTempPriceRange] = useState(initialPriceRange);
  const [tempCategory, setTempCategory] = useState(initialCategory);
  const [hasChanges, setHasChanges] = useState(false);

  const updateTempValues = (filterKey, value) => {
    setTempValues(prev => {
      const currentSelection = prev[filterKey] || [];
      const newSelection = currentSelection.includes(value)
        ? currentSelection.filter(val => val !== value)
        : [...currentSelection, value];
      return { ...prev, [filterKey]: newSelection };
    });
    setHasChanges(true);
  };

  const updateTempPriceRange = (name, value) => {
    setTempPriceRange(prev => ({ ...prev, [name]: value }));
    setHasChanges(true);
  };

  const resetTempStates = (values, priceRange) => {
    setTempValues(values);
    setTempPriceRange(priceRange);
    setHasChanges(false);
  };

  return {
    tempValues,
    tempPriceRange,
    tempCategory,
    hasChanges,
    updateTempValues,
    updateTempPriceRange,
    setTempCategory,
    resetTempStates
  };
};

const useDropdownState = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openCategoriesDropdown, setOpenCategoriesDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const categoriesDropdownRef = useRef(null);

  return {
    openDropdown,
    setOpenDropdown,
    openCategoriesDropdown,
    setOpenCategoriesDropdown,
    dropdownRef,
    categoriesDropdownRef
  };
};

// Components
const SearchBar = ({ query, onSearch }) => (
  <form id="search-form" name="search-form" onSubmit={(e) => e.preventDefault()}>
    <input
      type="text"
      className="input-search"
      name="search"
      placeholder="Search..."
      defaultValue={query}
      onKeyDown={onSearch}
      required
    />
  </form>
);

const PriceFilter = ({ priceRange, onChange }) => (
  <div className="price-filter">
    <div className="price-filter-min">
      <label htmlFor="price-min">De</label>
      <input
        type="number"
        id="price-min"
        className="input-price"
        name="min"
        value={priceRange.min}
        onChange={onChange}
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
        onChange={onChange}
        placeholder="Max"
      />
    </div>
  </div>
);

const FilterCheckbox = ({ filterKey, value, isChecked, onChange }) => (
  <label className="checkbox-label">
    <input
      type="checkbox"
      checked={isChecked}
      onChange={() => onChange(filterKey, value)}
    />
    {value}
  </label>
);

const FilterDropdown = ({ filterKey, filterData, tempValues, onChange }) => {
  const renderFilterValues = (values, key) => {
    if (typeof values === 'object' && values !== null && !Array.isArray(values)) {
      return Object.entries(values).map(([subKey, subValue]) => (
        <div key={subKey}>
          <h4>{subValue.displayName}</h4>
          {subValue.values.map((value, valueIndex) => (
            <FilterCheckbox
              key={valueIndex}
              filterKey={filterKey}
              value={value}
              isChecked={tempValues[filterKey]?.includes(value) || false}
              onChange={onChange}
            />
          ))}
        </div>
      ));
    }
    
    return values.map((value, index) => (
      <FilterCheckbox
        key={index}
        filterKey={filterKey}
        value={value}
        isChecked={tempValues[filterKey]?.includes(value) || false}
        onChange={onChange}
      />
    ));
  };

  return (
    <div className="dropdown-content-inner">
      {renderFilterValues(filterData.values, filterKey)}
    </div>
  );
};

const CategoriesDropdown = ({ categories, selectedCategory, onSelect }) => (
  <div className="dropdown-content-inner categories-dropdown-inner">
    {categories?.filter(category => category !== selectedCategory).map((category, index) => (
      <div key={index} className="category-item" onClick={() => onSelect(category)}>
        {category}
      </div>
    ))}
  </div>
);

const Header = ({ selectedValues, priceRange, selectedCategory, onFilterChange }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q') || '';

  const {
    tempValues,
    tempPriceRange,
    tempCategory,
    hasChanges,
    updateTempValues,
    updateTempPriceRange,
    setTempCategory,
    resetTempStates
  } = useFilterState(selectedValues, priceRange, selectedCategory);

  const {
    openDropdown,
    setOpenDropdown,
    openCategoriesDropdown,
    setOpenCategoriesDropdown,
    dropdownRef,
    categoriesDropdownRef
  } = useDropdownState();

  const updateURLWithFilters = (params) => {
    const searchParams = new URLSearchParams(location.search);
    
    // Update query parameter if it changes
    if (params.query && params.query !== query) {
      searchParams.set('q', params.query);
    }

    // Update category parameter
    if (params.selectedCategory) {
      searchParams.set('category', params.selectedCategory);
    }

    // Update price range parameters
    if (params.priceRange) {
      if (params.priceRange.min !== '') {
        searchParams.set('min', params.priceRange.min);
      } else {
        searchParams.delete('min');
      }
      if (params.priceRange.max !== '') {
        searchParams.set('max', params.priceRange.max);
      } else {
        searchParams.delete('max');
      }
    }

    // Update other filter parameters
    if (params.selectedValues) {
      Object.entries(params.selectedValues).forEach(([key, values]) => {
        if (values.length > 0) {
          searchParams.set(key, values.join(','));
        } else {
          searchParams.delete(key);
        }
      });
    }

    // Navigate with updated URL
    navigate(`?${searchParams.toString()}`);
  };

  const [filters, setFilters] = useState(() => {
    const filterButtons = Object.entries(filtresData.filters).map(([key, value]) => ({
      key: value.key,
      displayName: value.displayName
    }));
    return [...filterButtons, { key: "price", displayName: "Prix" }];
  });

  useEffect(() => {
    if (openDropdown) {
      resetTempStates(selectedValues, priceRange);
    }
  }, [openDropdown]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        handleDropdownClose();
      }
      if (categoriesDropdownRef.current && !categoriesDropdownRef.current.contains(event.target)) {
        setOpenCategoriesDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [tempValues, tempPriceRange, hasChanges]);

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const newQuery = e.target.value;
      if (newQuery !== query) {
        navigate(`?q=${encodeURIComponent(newQuery)}`);
      }
    }
  };

  const handleDropdownClose = () => {
    if (hasChanges) {
      updateURLWithFilters({
        query,
        selectedValues: tempValues,
        priceRange: tempPriceRange,
        selectedCategory: tempCategory
      });
      onFilterChange({
        selectedValues: tempValues,
        priceRange: tempPriceRange,
        selectedCategory: tempCategory
      });
    }
    setOpenDropdown(null);
  };

  const handleDropdownToggle = (filterKey) => {
    if (openDropdown === filterKey) {
      if (hasChanges) {
        onFilterChange({
          selectedValues: tempValues,
          priceRange: tempPriceRange,
          selectedCategory: tempCategory
        });
      }
      setOpenDropdown(null);
    } else {
      setOpenDropdown(filterKey);
    }
  };

  const handleCategorySelection = (category) => {
    setTempCategory(category);
    updateURLWithFilters({
      query,
      selectedValues: tempValues,
      priceRange: tempPriceRange,
      selectedCategory: category
    });
    onFilterChange({
      selectedValues: tempValues,
      priceRange: tempPriceRange,
      selectedCategory: category
    });
    setOpenCategoriesDropdown(false);
  };

  const isFilterActive = (filterKey) => {
    if (filterKey === 'price') {
      return priceRange.min !== '' || priceRange.max !== '';
    }
    return selectedValues[filterKey]?.length > 0;
  };

  const getFilterCount = (filterKey) => {
    if (filterKey === 'price') {
      return (priceRange.min !== '' || priceRange.max !== '') ? '1' : '';
    }
    const count = selectedValues[filterKey]?.length;
    return count > 0 ? count.toString() : '';
  };

  const renderFilterButtons = () => (
    filters.map((filter, index) => {
      const isActive = isFilterActive(filter.key);
      const filterCount = getFilterCount(filter.key);
      
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
            {isActive && filterCount && (
              <span className="filter-count">{filterCount}</span>
            )}
            <i className="fa fa-angle-down button-icon-right"></i>
          </button>
          {openDropdown === filter.key && (
            <div className="dropdown-content" ref={dropdownRef}>
              {filter.key === 'price' ? (
                <div className="dropdown-content-inner">
                  <PriceFilter
                    priceRange={tempPriceRange}
                    onChange={(e) => updateTempPriceRange(e.target.name, e.target.value)}
                  />
                </div>
              ) : (
                <FilterDropdown
                  filterKey={filter.key}
                  filterData={filtresData.filters[filter.key]}
                  tempValues={tempValues}
                  onChange={updateTempValues}
                />
              )}
            </div>
          )}
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
            onClick={() => navigate('/')} 
            style={{ cursor: 'pointer' }}
          />
          <div id="full-search">
            <li className="filter-item">
              <button onClick={() => setOpenCategoriesDropdown(!openCategoriesDropdown)}>
                {tempCategory || filtresData.categories.displayName} 
                <i className="fa fa-angle-down button-icon-right"></i>
              </button>
              {openCategoriesDropdown && (
                <div className="dropdown-content" ref={categoriesDropdownRef}>
                  <CategoriesDropdown
                    categories={filtresData?.categories?.values}
                    selectedCategory={tempCategory}
                    onSelect={handleCategorySelection}
                  />
                </div>
              )}
            </li>
            <SearchBar query={query} onSearch={handleSearchKeyPress} />
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