import React from 'react';
import './App.css';
import './index.css';
import logo from './assets/swapp-logo.svg';

// Footer component
const Footer = () => {
  return (
    <footer>
      <div className="custom-shape-divider-bottom-1730289659">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="shape-fill"></path>
        </svg>
      </div>
      <div id="footer-conteneur">
        <div id="footer-content" className="conteneur">
          <div id="footer-links">
            <ul>
              <li><h4>Swapp</h4></li>
              <li><a href="">À propos</a></li>
              <li><a href="">Économie circulaire</a></li>
              <li><a href="">Comment ça marche ?</a></li>
            </ul>
            <ul>
              <li><a href="">Politique de confidentialité</a></li>
              <li><a href="">Termes & conditions</a></li>
            </ul>
          </div>
          <div id="footer-socials">
            <ul>
              <li>
                <a target="_blank" rel="noopener noreferrer" title="Accès à la page Facebook de Swapp" href="https://fr-fr.facebook.com/">
                  <i className="fa fa-2x fa-facebook"></i>
                </a>
              </li>
              <li>
                <a target="_blank" rel="noopener noreferrer" title="Accès à la page Instagram de Swapp" href="https://www.instagram.com">
                  <i className="fa fa-2x fa-instagram"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Header component
const Header = () => {
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
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            id="input-search"
            name="search"
            placeholder="Rechercher"
            onChange={(e) => {
              e.target.value = e.target.value.replace(/[^a-zA-Z]/g, '');
            }}
            required
          />
        </form>
      </div>
    </>
  );
};

// Main App component
function App() {
  return (
    <div>
      <Header />
      <Footer />
    </div>
  );
}

export default App;