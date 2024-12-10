import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './css/ItemPage.css';
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
            "description",
            "price",
            "condition",
            "size",
            "brand",
            "color",
            "material",
            "seller",
          ], // Champs nécessaires
          limit: 1, // On s'attend à un seul document
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
          setItemData(data.docs[0]); // Stocke les données de l'élément
        } else {
          throw new Error("Aucun élément trouvé pour l'ID donné.");
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
      <div className="item-page-content conteneur">
        <div className="images">
          {/* Afficher les images du produit ici */}
          <div className="image-container">
          <img src={itemData.image || 'https://placehold.co/150/'} alt={itemData.title} />
          </div>
        </div>
        <div className="description-group">
          <div className="title">{itemData?.title || 'Titre non disponible'}</div>
          <div className="price">{itemData?.price ? `${itemData.price} €` : 'Prix non disponible'}</div>
          <div className="description">{itemData?.description || 'Description non disponible'}</div>
          <div className="details">
            Taille: {itemData?.size || 'Non disponible'}, Marque: {itemData?.brand || 'Non disponible'}, 
            Couleur: {itemData?.color || 'Non disponible'}, Matériau: {itemData?.material || 'Non disponible'}
          </div>
          <div className="seller-details">
            <div className="seller-pseudo">{itemData?.seller?.username || 'Nom du vendeur non disponible'}</div>
            <div className="seller-star-ratings">{itemData?.seller?.rating ? `${itemData.seller.rating.toFixed(1)} étoiles` : 'Note du vendeur non disponible'}</div>
            <div className="nb-raters">{itemData?.seller?.location || 'Emplacement du vendeur non disponible'}</div>
            <div className="buy-button">Acheter</div>
            <div className="make-an-offer-button">Faire une offre</div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ItemPage;