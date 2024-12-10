import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const ItemPage = () => {
  const { id } = useParams(); // Récupère l'ID de l'élément depuis l'URL
  const [itemData, setItemData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItemData = async () => {
      try {
        // Construire le sélecteur Mango pour rechercher par ID
        const selector = {
          _id: id,
        };

        const mangoQuery = {
          selector,
          fields: [
            "_id",
            "title",
            "category",
            "price",
            "description",
            "condition",
            "size",
            "brand",
            "color",
            "material",
            "seller",
            "published",
            "views",
            "likes"
          ], // Champs nécessaires
          limit: 1, // On s’attend à un seul document
        };

        console.log('Sending Mango query:', mangoQuery);

        const response = await fetch('http://localhost:5984/swapp_data/_find', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(mangoQuery),
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.docs.length > 0) {
          console.log('Fetched item:', data.docs[0]);
          setItemData(data.docs[0]); // Stocke les données de l’élément
        } else {
          throw new Error('Aucun élément trouvé pour l’ID donné.');
        }
      } catch (err) {
        console.error('Error fetching item:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItemData();
  }, [id]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <div>
      <Header 
        selectedValues={{}} 
        priceRange={{ min: '', max: '' }} 
        selectedCategory={null} 
        onFilterChange={() => {}} 
        showFilters={false} 
      />
      <div className="conteneur">
        <h1>Détails de l'élément</h1>
        {itemData ? (
          <div>
            <p><strong>ID :</strong> {itemData._id}</p>
            <p><strong>Titre :</strong> {itemData.title || 'Non disponible'}</p>
            <p><strong>Catégorie :</strong> {itemData.category || 'Non disponible'}</p>
            <p><strong>Prix :</strong> {itemData.price ? `${itemData.price} €` : 'Non disponible'}</p>
          </div>
        ) : (
          <p>Aucune donnée disponible pour cet élément.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ItemPage;
