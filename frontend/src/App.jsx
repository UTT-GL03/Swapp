import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './assets/swapp-logo.svg';
import SearchResults from './SearchResults';
import HomePage from './HomePage';
import { Routes, Route } from 'react-router-dom';

// Main App component
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Home page */}
        <Route path="/search" element={<SearchResults />} /> {/* Search results */}
      </Routes>
    </div>
  );
}

export default App;