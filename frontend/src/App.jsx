import React from 'react';
import SearchResults from './SearchResults';
import HomePage from './HomePage';
import ItemPage from './ItemPage';
import { Routes, Route } from 'react-router-dom';

// Main App component
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Home page */}
        <Route path="/search" element={<SearchResults />} /> {/* Search results */}
        <Route path="/item/:id" element={<ItemPage />} /> {/* Item page details*/}
      </Routes>
    </div>
  );
}

export default App;