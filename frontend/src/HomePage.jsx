import React, { useEffect } from 'react';
import './css/App.css';
import './css/HomePage.css';
import { useNavigate } from 'react-router-dom';
import logo from './assets/swapp-logo.svg';
import valeursFiltres from './assets/valeurs_filtres.json';
import Footer from './Footer';

// Header component
const Header = () => {
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const searchTerm = e.target.elements.search.value;
    // Utilisation du bon paramètre pour la recherche
    navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
  };

  const filtres = valeursFiltres.Catégories || []; // Récupère les articles


  return (
    <>
      <div id="btn-container" className="conteneur">
        <div>
          <button>
            <i className="fa fa-shopping-cart button-icon-left"></i>
            Mon panier
          </button>
        </div>
        <div>
          <button>
            <i className="fa fa-user button-icon-left"></i>
            Mon compte
          </button>
        </div>
      </div>
      <div id="main-container" className="conteneur">
        <img id="logo" src={logo} alt="Swapp logo" />
        <nav className="categories-list">
        <ul>
            {filtres.map((categorie) => (
              <li key={categorie}>
                <a href="">{categorie}</a>
              </li>
            ))}
          </ul>
        </nav>
        <form 
          id="sign-in-form" 
          name="sign-in-form" 
          onSubmit={handleSearchSubmit}
        >
          <input
            type="text"
            id="input-search"
            name="search"
            placeholder="Rechercher"
            required
          />
        </form>
      </div>
    </>
  );
};

function HomePage() {
  useEffect(() => {
    document.body.classList.add('homepage-background');
  
    return () => {
      document.body.classList.remove('homepage-background');
    };
  }, []);

  return (
    <div>
      <Header />
      <div className="absolute-footer">
        <Footer />
      </div>
    </div>
  );
}

export default HomePage;
