import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from './assets/swapp-logo.svg';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q') || '';

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Empêche le rechargement de la page
      const newQuery = e.target.value;
      if (newQuery !== query) {
        // Encode la nouvelle query pour garantir qu'elle est correctement formatée dans l'URL
        navigate(`?q=${encodeURIComponent(newQuery)}`);
      }
    }
  };

  return (
    <header>
      <div id="main-header" className="conteneur">
        <div id="main-header-search">
          <img id="logo2" src={logo} alt="Swapp logo" />
          <div id="full-search">
            <button>Catégorie<i className="fa fa-angle-down button-icon-right"></i></button>
            <form id="search-form" name="search-form" action="" method="post" onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                id="input-search"
                name="search"
                placeholder="Search..."
                defaultValue={query}
                onKeyDown={handleSearchKeyPress} // Lance la recherche uniquement lors de l'appui sur Entrée
                required
              />
            </form>
          </div>
        </div>
        <div id="main-header-buttons">
          <div>
            <button><i className="fa fa-shopping-cart button-icon-left"></i>Mon panier</button>
          </div>
          <div>
            <button><i className="fa fa-user button-icon-left"></i>Mon compte</button>
          </div>
        </div>
      </div>
      <div>
        <nav>
          <ul id="main-header-filters" className="conteneur">
            {Array.from({ length: 6 }).map((_, index) => (
              <li key={index}><button>Filtre</button></li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
