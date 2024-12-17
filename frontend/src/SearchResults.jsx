import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import notFoundImage from './assets/not-found-element.png';
import './css/SearchResults.css';
import Header from './Header';
import Footer from './Footer';

function decodeHtmlEntities(str) {
  const doc = new DOMParser().parseFromString(str, 'text/html');
  return doc.documentElement.textContent || doc.body.textContent;
}

// Custom hooks
const useURLParameters = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  
  const query = searchParams.get('q') || '';
  const categoryFromURL = searchParams.get('category') || '';
  
  // Parse selected values from URL
  const selectedValuesFromURL = {};
  const filterKeys = ['size', 'condition', 'color', 'material']; // Add all your filter keys here
  
  filterKeys.forEach(key => {
    const values = searchParams.get(key);
    if (values) {
      selectedValuesFromURL[key] = values.split(',');
    }
  });

  // Parse price range from URL
  const priceMin = searchParams.get('min') || '';
  const priceMax = searchParams.get('max') || '';
  
  return { 
    query, 
    categoryFromURL, 
    selectedValuesFromURL,
    priceRange: { min: priceMin, max: priceMax }
  };
};

const useFilterState = (initialCategory, initialSelectedValues, initialPriceRange) => {
  const [selectedValues, setSelectedValues] = useState(initialSelectedValues);
  const [priceRange, setPriceRange] = useState(initialPriceRange);
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
    onClick={() => onClick(item._id)}
    style={{ cursor: 'pointer' }}
  >
    <img src={item.image || 'https://placehold.co/150/'} alt={item.title} />
    <div className="Item-Content">
      <div className="Item-Title">{decodeHtmlEntities(item.title)}</div>
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
          key={item._id} 
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
  const { 
    query, 
    categoryFromURL, 
    selectedValuesFromURL,
    priceRange: initialPriceRange 
  } = useURLParameters();
  
  const {
    selectedValues,
    priceRange,
    selectedCategory,
    handleFilterChange
  } = useFilterState(categoryFromURL, selectedValuesFromURL, initialPriceRange);

  const [fashionItems, setFashionItems] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState(fashionItems);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFashionItems = async () => {
      try {
        const selector = {
          "title": { "$regex": "(?i)" + query }
        };
  
        if (categoryFromURL) {
          selector["category"] = categoryFromURL;
        }
  
        // Apply additional filter values
        Object.keys(selectedValues).forEach(key => {
          if (selectedValues[key] && selectedValues[key].length > 0) {
            selector[key] = { "$in": selectedValues[key] };
          }
        });
  
        // Apply price range filter
        if (priceRange.min !== '' || priceRange.max !== '') {
          selector["price"] = {};
          if (priceRange.min !== '') {
            selector["price"]["$gte"] = parseFloat(priceRange.min);
          }
          if (priceRange.max !== '') {
            selector["price"]["$lte"] = parseFloat(priceRange.max);
          }
        }
  
        const mangoPaginatedQuery = {
          selector,
          "fields": [
            "_id", 
            "title", 
            "category", 
            "price", 
            "image", 
            "url"
          ],
          "limit": 25,
          "sort": [{ "price": "asc" }]
        };
  
        // console.log('Sending Mango query:', mangoPaginatedQuery);
  
        const response = await fetch('http://localhost:5984/swapp_data/_find', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(mangoPaginatedQuery)
        });
  
        const data = await response.json();
  
        // console.log('Fetched items:', data.docs);
  
        const items = data.docs;
        setFashionItems(items);
        setFilteredArticles(items);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching fashion items:', error);
        setIsLoading(false);
      }
    };
  
    fetchFashionItems();
  }, [query, categoryFromURL, JSON.stringify(selectedValues), JSON.stringify(priceRange)]);

  const handleItemClick = useCallback((id) => {
    navigate(`/item/${id}`);
  }, [navigate]);
 
  // Memoize header props to prevent unnecessary re-renders
  const headerProps = useMemo(() => ({
    selectedValues,
    priceRange,
    selectedCategory,
    onFilterChange: handleFilterChange,
    showFilters: true
  }), [selectedValues, priceRange, selectedCategory, handleFilterChange]);

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