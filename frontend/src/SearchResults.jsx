import React from 'react';
import { useLocation } from 'react-router-dom';
import fashionItems from './assets/items_data.json';
import './searchResults.css';

const SearchResults = () => {
  const query = new URLSearchParams(useLocation().search).get('q');

  const handleItemClick = (url) => {
    navigate(url);
  };

  return (
    <div>
      <div className="Frontpage">
        <div className="Headers">
          <div className="Logo">Logo</div>
          <div className="CategoryDropdown">Category/Dropdown</div>
          <div className="SearchBar">
            <input type="text" placeholder="Search..." value={query} />
          </div>
          <div className="Basket">Basket</div>
          <div className="Account">Account (Sign In or Profile)</div>
        </div>
        <div className="Filters">
          <div className="Filter">Filter</div>
          <div className="Filter">Filter</div>
          <div className="Filter">Filter</div>
          <div className="Filter">Filter</div>
          <div className="Filter">Filter</div>
          <div className="Filter">Filter</div>
        </div>
        <div className="Items">
        {fashionItems.map((item) => (
            <div
              key={item.id}
              className="Item"
              onClick={() => handleItemClick(item.url)}
              style={{ cursor: 'pointer' }}
            >
              <img src={item.image} alt={item.title} />
              <div className="Item-Content">
                <div className="Item-Title">{item.title}</div>
                <div className="Item-Price">${item.price.toFixed(2)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
