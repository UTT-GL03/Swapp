import React from 'react';
import Header from './Header';

const ItemPage = () => {
  return (
    <div>
      <Header 
        selectedValues={{}} 
        priceRange={{ min: '', max: '' }} 
        selectedCategory={null} 
        onFilterChange={() => {}} 
        showFilters={false}
      />
      {/* Contenu principal de la page */}
      <div className="item-page-content">
        <h1>Item Details</h1>
        {/* Ajoutez ici le contenu spécifique de votre page Item */}
      </div>
    </div>
  );
};

export default ItemPage;
