import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import notFoundImage from './assets/not-found-element.png';
import './css/SearchResults.css';
import Header from './Header';
import Footer from './Footer';

// Custom hooks
const useURLParameters = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q') || '';
  const categoryFromURL = new URLSearchParams(location.search).get('category') || '';
  
  return { query, categoryFromURL };
};

const useFilterState = (initialCategory) => {
  const [selectedValues, setSelectedValues] = useState({});
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const handleFilterChange = useCallback(({ 
    selectedValues: newSelectedValues, 
    priceRange: newPriceRange, 
    selectedCategory: newSelectedCategory 
  }) => {
    setSelectedValues(newSelectedValues);
    setPriceRange(newPriceRange);
    setSelectedCategory(newSelectedCategory);
  }, []);

  return {
    selectedValues,
    priceRange,
    selectedCategory,
    handleFilterChange
  };
};

// Components
const ItemCard = React.memo(({ item, onClick }) => (
  <div
    className="Item"
    onClick={() => onClick(item.url)}
    style={{ cursor: 'pointer' }}
  >
    <img src={item.image || 'https://placehold.co/150/'} alt={item.title} />
    <div className="Item-Content">
      <div className="Item-Title">{item.title}</div>
      <div className="Item-Price">${item.price.toFixed(2)}</div>
    </div>
  </div>
));
ItemCard.displayName = 'ItemCard';

const ItemsGrid = React.memo(({ items, onItemClick }) => (
  <div className="Items conteneur">
    {items.length > 0 ? (
      items.map((item) => (
        <ItemCard 
          key={item.id} 
          item={item} 
          onClick={onItemClick}
        />
      ))
    ) : (
      <div id='not-found'>
          <img id="not-found-image" src={notFoundImage} alt="Open drawers" />
          <p>Aucun élément ne correspond à vos critères.</p>
      </div>
    )}
  </div>
));
ItemsGrid.displayName = 'ItemsGrid';

// ... autres imports ...

const SearchResults = () => {
  const navigate = useNavigate();
  const { query, categoryFromURL } = useURLParameters();

  const {
    selectedValues,
    priceRange,
    selectedCategory,
    handleFilterChange,
  } = useFilterState(categoryFromURL);

  const [fashionItems, setFashionItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Préparer les filtres pour la requête serveur
  const buildServerQuery = useCallback(() => {
    const selector = {};

    // Filtrer par titre ou catégorie
    if (query) {
      selector["$or"] = [
        { title: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ];
    }

    // Filtrer par catégorie sélectionnée
    if (selectedCategory) {
      selector.category = { $eq: selectedCategory };
    }

    // Filtrer par plage de prix
    if (priceRange.min || priceRange.max) {
      selector.price = {};
      if (priceRange.min) {
        selector.price.$gte = parseFloat(priceRange.min);
      }
      if (priceRange.max) {
        selector.price.$lte = parseFloat(priceRange.max);
      }
    }

    // Filtrer par autres valeurs sélectionnées
    Object.entries(selectedValues).forEach(([key, values]) => {
      if (values.length > 0) {
        selector[key] = { $in: values };
      }
    });

    return {
      selector,
      sort: [{ issued: "desc" }], // Exemple de tri
      fields: ["_id", "title", "price", "category", "image", "issued"],
      limit: 25, // Limitation du nombre de résultats
    };
  }, [query, selectedCategory, priceRange, selectedValues]);

  // Récupérer les données depuis le serveur
  useEffect(() => {
    const fetchFashionItems = async () => {
      setIsLoading(true);
      const query = buildServerQuery();

      try {
        const response = await fetch("http://localhost:5984/swapp_data/_find", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(query),
        });

        if (!response.ok) {
          throw new Error(`Erreur lors de la requête: ${response.statusText}`);
        }

        const data = await response.json();
        const items = data.docs || []; // CouchDB retourne les résultats dans `docs`
        setFashionItems(items);
      } catch (error) {
        console.error("Erreur lors de la récupération des articles :", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFashionItems();
  }, [buildServerQuery]);

  const handleItemClick = useCallback(
    (url) => {
      navigate(url);
    },
    [navigate]
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header
        selectedValues={selectedValues}
        priceRange={priceRange}
        selectedCategory={selectedCategory}
        onFilterChange={handleFilterChange}
      />
      <ItemsGrid items={fashionItems} onItemClick={handleItemClick} />
      <div className="space" />
      <Footer />
    </div>
  );
};

export default SearchResults;
