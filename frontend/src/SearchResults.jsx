import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import fashionItems from './assets/sample_data.json';
import './SearchResults.css';
import Header from './Header';
import Footer from './Footer';

const SearchResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q') || ''; // Récupère la query de l'URL, ou vide par défaut

  const [prevQuery, setPrevQuery] = useState('');
  const [filteredArticles, setFilteredArticles] = useState([]);

  const handleItemClick = (url) => {
    navigate(url);
  };

  useEffect(() => {
    if (query !== prevQuery) {
      const articles = fashionItems.articles || []; // Récupère les articles
      const newFilteredArticles = query
        ? articles.filter(item =>
            item.title.toLowerCase().includes(query.toLowerCase()) || // Filtrer par titre
            item.category.toLowerCase().includes(query.toLowerCase()) // Filtrer par catégorie
          )
        : articles; // Si la query est vide, retourne tous les articles
      setFilteredArticles(newFilteredArticles);
      setPrevQuery(query);
    }
  }, [query, prevQuery]);

  return (
    <div>
      <Header />
      <div className="Items conteneur">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((item) => (
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
          ))
        ) : (
          <div>Aucun article trouvé pour "{query}".</div> // Message si aucun article ne correspond
        )}
      </div>
      <div className='space'></div>
      <Footer />
    </div>
  );
};

export default SearchResults;
