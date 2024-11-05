import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import fashionItems from './assets/sample_data.json';
import './SearchResults.css';
import Header from './Header';
import Footer from './Footer';

const SearchResults = () => {
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search).get('q');

  const handleItemClick = (url) => {
    navigate(url);
  };

  // Access the list of items
  const articles = fashionItems.articles || []; // Default to an empty array if articles is undefined

  return (
    <div>
      <Header />
      <div className="Items conteneur">
        {articles.map((item) => (
          <div
            key={item.id}
            className="Item"
            onClick={() => handleItemClick(item.url)}
            style={{ cursor: 'pointer' }}
          >
            <img src={item.image || 'https://via.placeholder.com/150'} alt={item.title} />
            <div className="Item-Content">
              <div className="Item-Title">{item.title}</div>
              <div className="Item-Price">${item.price.toFixed(2)}</div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default SearchResults;
