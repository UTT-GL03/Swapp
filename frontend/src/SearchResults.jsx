import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import fashionItems from './assets/sample_data.json';
import './css/SearchResults.css';
import Header from './Header';
import Footer from './Footer';

const SearchResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the search query and category from the URL parameters
  const query = new URLSearchParams(location.search).get('q') || '';
  const categoryFromURL = new URLSearchParams(location.search).get('category') || '';

  // Current active filters
  const [selectedValues, setSelectedValues] = useState({});
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [selectedCategory, setSelectedCategory] = useState(categoryFromURL); // Set category from URL
  const [filteredArticles, setFilteredArticles] = useState([]);

  const handleItemClick = (url) => {
    navigate(url);
  };

  const handleFilterChange = (newFilters) => {
    const { selectedValues: newSelectedValues, priceRange: newPriceRange, selectedCategory: newSelectedCategory } = newFilters;
    
    setSelectedValues(newSelectedValues);
    setPriceRange(newPriceRange);
    setSelectedCategory(newSelectedCategory);
  };

  // Filter articles based on all criteria
  const filterArticles = () => {
    let filtered = fashionItems.articles || [];

    // Apply search query filter
    if (query) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Apply category filter (using the category from URL)
    if (selectedCategory) {
      filtered = filtered.filter(item =>
        item.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Apply price range filter
    if (priceRange.min !== '' || priceRange.max !== '') {
      filtered = filtered.filter(item => {
        const price = item.price;
        const minPrice = priceRange.min === '' ? -Infinity : parseFloat(priceRange.min);
        const maxPrice = priceRange.max === '' ? Infinity : parseFloat(priceRange.max);
        return price >= minPrice && price <= maxPrice;
      });
    }

    // Apply other filters (sizes, colors, etc.)
    Object.entries(selectedValues).forEach(([filterKey, selectedFilterValues]) => {
      if (selectedFilterValues.length > 0) {
        filtered = filtered.filter(item => {
          const itemValue = item[filterKey];
          if (Array.isArray(itemValue)) {
            return selectedFilterValues.some(value => itemValue.includes(value));
          } else {
            return selectedFilterValues.includes(itemValue);
          }
        });
      }
    });

    setFilteredArticles(filtered);
  };

  useEffect(() => {
    filterArticles();
  }, [query, selectedValues, priceRange, selectedCategory]);

  return (
    <div>
      <Header 
        selectedValues={selectedValues}
        priceRange={priceRange}
        selectedCategory={selectedCategory}
        onFilterChange={handleFilterChange}
      />
      <div className="Items conteneur">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((item) => (
            <div
              key={item.id}
              className="Item"
              onClick={() => handleItemClick(item.url)}
              style={{ cursor: 'pointer' }}
            >
              <img src={item.image || 'https://placehold.co/150/'} alt={item.title} />
              <div className="Item-Content">
                <div className="Item-Title">{item.title}</div>
                <div className="Item-Price">${item.price.toFixed(2)}</div>
              </div>
            </div>
          ))
        ) : (
          <div>Aucun élément ne correspond à vos critères.</div>
        )}
      </div>
      <div className='space'></div>
      <Footer />
    </div>
  );
};

export default SearchResults;
