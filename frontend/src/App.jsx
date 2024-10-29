import React from 'react';
import './App.css'

// Composant Header
const Header = () => {
  return (
    <header className="p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="w-40 h-16 border rounded">
          <span className="text-lg">Logo</span>
        </div>
        
        <div className="flex-grow mx-8">
          <input
            type="search"
            placeholder="Rechercher..."
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div className="flex gap-4">
          <button className="px-4 py-2 border rounded hover:bg-gray-100">
            Panier
          </button>
          <button className="px-4 py-2 border rounded hover:bg-gray-100">
            Compte
          </button>
        </div>
      </div>
      
      <nav className="mt-4">
        <div className="container mx-auto">
          <h2 className="font-bold mb-2">Categories</h2>
          <ul className="space-y-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <li key={index}>
                <button className="w-full p-2 text-left border rounded hover:bg-gray-100">
                  Catégorie {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

// Composant Main Content
const MainContent = () => {
  return (
    <main className="flex-grow">
      <div className="h-full bg-gray-100 flex items-center justify-center text-gray-400">
        Background Image
      </div>
    </main>
  );
};

// Composant Footer
const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold mb-4">Find</h3>
            <div className="p-4 border rounded">
              <p>Text</p>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Help</h3>
            <div className="p-4 border rounded">
              <p>Text</p>
            </div>
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
        </div>
      </div>
    </footer>
  );
};

// Composant App principal
function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
}

export default App;