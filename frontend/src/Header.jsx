import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from './assets/swapp-logo.svg';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q') || '';

  const handleSearchChange = (e) => {
    const newQuery = e.target.value;
    // Met à jour l'URL avec la nouvelle requête de recherche
    navigate(`?q=${newQuery}`);
  };

  return (
    <header>
      <div id="main-header" className="conteneur">
        <div id="main-header-search">
          <img id="logo2" src={logo} alt="Swapp logo" />
          <form id="search-form" name="search-form" action="" method="post">
            <input
              type="text"
              id="input-search"
              name="search"
              placeholder="Search..."
              value={query}
              onChange={handleSearchChange} // Écoute les changements dans le champ de recherche
              required
            />
          </form>
        </div>
        <div id="main-header-buttons">
          <div>
            <button><i className="fa fa-shopping-cart button-icon"></i>Mon panier</button>
          </div>
          <div>
            <button><i className="fa fa-user button-icon"></i>Mon compte</button>
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
