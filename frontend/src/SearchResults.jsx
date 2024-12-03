import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import notFoundImage from './assets/not-found-element.png';
import './css/SearchResults.css';
import Header from './Header';
import Footer from './Footer';

// Custom hooks
const useURLParameters = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q') || '';
  const categoryFromURL = new URLSearchParams(location.search).get('category') || '';
  
  return { query, categoryFromURL };
};

const useFilterState = (initialCategory) => {
  const [selectedValues, setSelectedValues] = useState({});
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const handleFilterChange = useCallback(({ 
    selectedValues: newSelectedValues, 
    priceRange: newPriceRange, 
    selectedCategory: newSelectedCategory 
  }) => {
    setSelectedValues(newSelectedValues);
    setPriceRange(newPriceRange);
    setSelectedCategory(newSelectedCategory);
  }, []);

  return {
    selectedValues,
    priceRange,
    selectedCategory,
    handleFilterChange
  };
};

// Components
const ItemCard = React.memo(({ item, onClick }) => (
  <div
    className="Item"
    onClick={() => onClick(item.url)}
    style={{ cursor: 'pointer' }}
  >
    <img src={item.image || 'https://placehold.co/150/'} alt={item.title} />
    <div className="Item-Content">
      <div className="Item-Title">{item.title}</div>
      <div className="Item-Price">${item.price.toFixed(2)}</div>
    </div>
  </div>
));
ItemCard.displayName = 'ItemCard';

const ItemsGrid = React.memo(({ items, onItemClick }) => (
  <div className="Items conteneur">
    {items.length > 0 ? (
      items.map((item) => (
        <ItemCard 
          key={item.id} 
          item={item} 
          onClick={onItemClick}
        />
      ))
    ) : (
      <div id='not-found'>
          <img id="not-found-image" src={notFoundImage} alt="Open drawers" />
          <p>Aucun élément ne correspond à vos critères.</p>
      </div>
    )}
  </div>
));
ItemsGrid.displayName = 'ItemsGrid';

const SearchResults = () => {
  const navigate = useNavigate();
  const { query, categoryFromURL } = useURLParameters();
  
  const {
    selectedValues,
    priceRange,
    selectedCategory,
    handleFilterChange
  } = useFilterState(categoryFromURL);

  const [fashionItems, setFashionItems] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFashionItems = async () => {
      try {
        // Requête Mango pour récupérer les articles
        const mangoPaginatedQuery = {
          "selector": {
            "$or": [
              { "title": { "$regex": "(?i)" + query } },
              { "category": { "$regex": "(?i)" + query } }
            ]
          },
          "fields": [
            "_id", 
            "title", 
            "category", 
            "price", 
            "image", 
            "url"
          ],
          "limit": 10,
          "sort": [{ "price": "asc" }]
        };
  
        const response = await fetch('http://localhost:5984/swapp_data/_find', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(mangoPaginatedQuery)
        });
  
        const data = await response.json();
        const items = data.docs;
        setFashionItems(items);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching fashion items:', error);
        setIsLoading(false);
      }
    };
  
    fetchFashionItems();
  }, [query]); // Dépendance sur query pour refetch quand la recherche change

  const handleItemClick = useCallback((url) => {
    navigate(url);
  }, [navigate]);

  const filterArticles = useCallback(() => {
    let filtered = fashionItems || [];
    console.log(filtered);

    // Apply search query filter
    if (query) {
      const searchTerm = query.toLowerCase();
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm) ||
        item.category.toLowerCase().includes(searchTerm)
      );
    }

    // Apply category filter
    if (selectedCategory) {
      const categoryTerm = selectedCategory.toLowerCase();
      filtered = filtered.filter(item =>
        item.category.toLowerCase() === categoryTerm
      );
    }

    // Apply price range filter
    if (priceRange.min !== '' || priceRange.max !== '') {
      const minPrice = priceRange.min === '' ? -Infinity : parseFloat(priceRange.min);
      const maxPrice = priceRange.max === '' ? Infinity : parseFloat(priceRange.max);
      filtered = filtered.filter(item =>
        item.price >= minPrice && item.price <= maxPrice
      );
    }

    // Apply other filters (sizes, colors, etc.)
    Object.entries(selectedValues).forEach(([filterKey, selectedFilterValues]) => {
      if (selectedFilterValues.length > 0) {
        filtered = filtered.filter(item => {
          const itemValue = item[filterKey];
          return Array.isArray(itemValue)
            ? selectedFilterValues.some(value => itemValue.includes(value))
            : selectedFilterValues.includes(itemValue);
        });
      }
    });

    setFilteredArticles(filtered);
  }, [fashionItems, query, selectedValues, priceRange, selectedCategory]);

  // Filter articles when dependencies change
  useEffect(() => {
    filterArticles();
  }, [filterArticles]);

  // Memoize header props to prevent unnecessary re-renders
  const headerProps = useMemo(() => ({
    selectedValues,
    priceRange,
    selectedCategory,
    onFilterChange: handleFilterChange
  }), [selectedValues, priceRange, selectedCategory, handleFilterChange]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header {...headerProps} />
      <ItemsGrid 
        items={filteredArticles} 
        onItemClick={handleItemClick}
      />
      <div className='space' />
      <Footer />
    </div>
  );
};

export default SearchResults;