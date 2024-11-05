import React, { useEffect } from 'react';
import './App.css';
import './index.css';
import { useNavigate } from 'react-router-dom';
import logo from './assets/swapp-logo.svg';
import Footer from './Footer';
import { Routes, Route } from 'react-router-dom';

// Header component
const Header = () => {
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const searchTerm = e.target.elements.search.value;
    navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <>
      <div id="btn-container" className="conteneur">
        <div>
          <button>
            <i className="fa fa-shopping-cart button-icon"></i>
            Mon panier
          </button>
        </div>
        <div>
          <button>
            <i className="fa fa-user button-icon"></i>
            Mon compte
          </button>
        </div>
      </div>
      <div id="main-container" className="conteneur">
        <img id="logo" src={logo} alt="Swapp logo" />
        <nav className="categories-list">
          <ul>
            {Array.from({ length: 6 }).map((_, index) => (
              <li key={index}>
                <a href="">Catégorie</a>
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
      <Footer />
    </div>
  );
}

export default HomePage;
