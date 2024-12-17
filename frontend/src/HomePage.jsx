import React, { useEffect } from 'react';
import './css/App.css';
import './css/HomePage.css';
import { useNavigate } from 'react-router-dom';
import logo from './assets/swapp-logo.svg';
import valeursFiltres from './assets/valeurs_filtres.json';
import Footer from './Footer';
import { useCart } from './CartContext.jsx'; // Importation de useCart

// Header component
const Header = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart(); // Utilisation du contexte du panier

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const searchTerm = e.target.elements.search.value;
    navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
  };

  const handleCategoryClick = (category) => {
    navigate(`/search?category=${encodeURIComponent(category)}`);
  };

  const filtres = valeursFiltres.categories.values || []; // Récupère les articles

  return (
    <>
      <div id="btn-container" className="conteneur">
        <div>
          <button>
            <i className="fa fa-shopping-cart button-icon-left"></i>
            Mon panier 
            {cartItems.length > 0 && <span className="cart-bubble">{cartItems.length}</span>}
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
                <a
                  href="#"
                  onClick={() => handleCategoryClick(categorie)}
                >
                  {categorie}
                </a>
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
            className="input-search"
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
