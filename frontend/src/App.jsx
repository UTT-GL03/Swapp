import React from 'react';
import logo from './assets/react.svg';
import './App.css';

// Composant Header
const Header = () => {
  return (
    <header>
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


// Composant Footer
const Footer = () => {
  return (
    <footer>
        <div>
          <h3 className="font-bold mb-4">Find</h3>
          <p>Text</p>
        </div>
        <div>
          <h3 className="font-bold mb-4">Help</h3>
          <p>Text</p>
        </div>
        <div>
          <h3 className="font-bold mb-4">Socials</h3>
          <div className="space-y-2">
            {Array.from({ length: 2 }).map((_, index) => (
              <div key={index} className="p-2 border rounded">
                SocialMedia {index + 1}
              </div>
            ))}
          </div>
        </div>
    </footer>
  );
};


// Composant App principal
function App() {
  return (
    <div>
      <Header />
      <Footer />
    </div>
  );
}

export default App;