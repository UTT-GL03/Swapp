import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from './assets/swapp-logo.svg';
import filtresData from './assets/valeurs_filtres.json';


const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q') || '';

  const valeursFiltres = filtresData || [];
  const [filters, setFilters] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null); // Track the open dropdown
  const [selectedValues, setSelectedValues] = useState({}); // Store selected filter values

  useEffect(() => {
    // Generate filter buttons with the count of available values
    const filterButtons = Object.keys(valeursFiltres).map((filterKey) => {
      const filterValues = valeursFiltres[filterKey];
      return {
        name: filterKey,
      };
    });
    setFilters(filterButtons);
  }, []);

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const newQuery = e.target.value;
      if (newQuery !== query) {
        navigate(`?q=${encodeURIComponent(newQuery)}`);
      }
    }
  };

  const handleDropdownToggle = (filterName) => {
    setOpenDropdown(openDropdown === filterName ? null : filterName); // Toggle the dropdown
  };

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

  const renderDropdown = (filterName, values) => (
    <div className="dropdown-content">
      <div className="dropdown-content-inner">
        {values.map((value, index) => (
          <label key={index} className="checkbox-label">
            <input
              type="checkbox"
              checked={selectedValues[filterName]?.includes(value) || false}
              onChange={() => handleCheckboxChange(filterName, value)}
            />
            {value}
          </label>
        ))}
      </div>
    </div>
  );

  const renderFilterButtons = () => (
    filters.map((filter, index) => {
      const filterValues = valeursFiltres[filter.name];
      const values = Array.isArray(filterValues) ? filterValues : Object.values(filterValues).flat();
      return (
        <li key={index} className="filter-item">
          <button onClick={() => handleDropdownToggle(filter.name)}>
            {filter.name}
          </button>
          {openDropdown === filter.name && renderDropdown(filter.name, values)}
        </li>
      );
    })
  );

  return (
    <header>
      <div id="main-header" className="conteneur">
        <div id="main-header-search">
          <img id="logo2" src={logo} alt="Swapp logo" />
          <div id="full-search">
            <button>Catégorie<i className="fa fa-angle-down button-icon-right"></i></button>
            <form id="search-form" name="search-form" action="" method="post" onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                id="input-search"
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