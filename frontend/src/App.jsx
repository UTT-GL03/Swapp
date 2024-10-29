import React from 'react';
import logo from './assets/swapp-logo.svg';
import './App.css';

// Composant Header
const Header = () => {
  return (
    <header id="header-home">
      <div id="container-search" className=""> {/* Optional max-width */}
        <img id="logo" src={logo} alt='logo' />
        <input
          type="search"
          placeholder="Rechercher..."
          className="w-full p-2 border rounded"
        />
        <nav className="mt-4 w-full">
          <ul className="space-y-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <li key={index}>
                <button className="w-full p-2 text-left border rounded hover:bg-gray-100">
                  Catégorie {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div id="container-user" className="">
        <button>Panier</button>
        <button>Compte</button>
      </div>
    </header>
  );
};


// Composant App principal
function App() {
  return (
    <div>
      <Header />
    </div>
  );
}

export default App;