import React from 'react';
import { useLocation } from 'react-router-dom';
import fashionItems from './assets/sample_data.json';
import './searchResults.css';
import logo from './assets/swapp-logo.svg';


const SearchResults = () => {
  const query = new URLSearchParams(useLocation().search).get('q');

  const handleItemClick = (url) => {
    navigate(url);
  };

   // Accéder à la liste des articles
   const articles = fashionItems.articles || []; // Définit un tableau vide par défaut si articles est indéfini

  return (
    <div>
      <div className="Frontpage">
      <header>
        <div id="main-header" className="conteneur">
            <div id="main-header-search">
                <img id="logo2" src={logo} alt="Swapp logo" />
                <form id="search-form" name="search-form" action="" method="post">
                    <input type="text" id="input-search" name="search" placeholder="Search..." value={query} required/>
                </form>
            </div>
            <div id="main-header-buttons">
                <div><button><i className="fa fa-shopping-cart button-icon"></i>Mon panier</button></div>
                <div><button><i className="fa fa-user button-icon"></i>Mon compte</button></div>
            </div>
        </div>
        <div>
            <nav>
                <ul id="main-header-filters" className="conteneur">
                    <li><button>Filtre</button></li>
                    <li><button>Filtre</button></li>
                    <li><button>Filtre</button></li>
                    <li><button>Filtre</button></li>
                    <li><button>Filtre</button></li>
                    <li><button>Filtre</button></li>
                </ul>
            </nav>
        </div>
    </header>

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
      </div>
    </div>
  );
};

export default SearchResults;
