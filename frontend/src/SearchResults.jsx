import React from 'react';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
  const query = new URLSearchParams(useLocation().search).get('query');

  return (
    <div>
      <h1>Search Results</h1>
      <p>Showing results for: {query}</p>
      {/* Additional code to display actual search results */}
    </div>
  );
};

export default SearchResults;