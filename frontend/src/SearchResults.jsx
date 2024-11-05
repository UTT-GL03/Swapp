import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import fashionItems from './assets/sample_data.json';
import './SearchResults.css';
import Header from './Header';
import Footer from './Footer';

const SearchResults = () => {
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search).get('q') || ''; // Assurez-vous que query est une chaîne

  const handleItemClick = (url) => {
    navigate(url);
  };

  // Accéder à la liste des articles
  const articles = fashionItems.articles || []; // Définit un tableau vide par défaut si articles est indéfini

  // Filtrer les articles en fonction du terme de recherche
  const filteredArticles = articles.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase()) || // Filtrer par titre
    item.category.toLowerCase().includes(query.toLowerCase()) // Filtrer par catégorie
  );

  return (
    <div>
      <Header />
      <div className="Items conteneur">
        {filteredArticles.length > 0 ? ( // Vérifier s'il y a des articles correspondants
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
      <Footer />
    </div>
  );
};

export default SearchResults;
