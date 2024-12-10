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

  // if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  const renderStarRatings = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating); // Nombre d'étoiles pleines
    const hasHalfStar = rating % 1 >= 0.5; // Si une demi-étoile est nécessaire
  
    // Ajouter les étoiles pleines
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="fas fa-star"></i>);
    }
  
    // Ajouter une demi-étoile si nécessaire
    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
    }
  
    // Compléter avec des étoiles vides pour faire 5 au total
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star"></i>);
    }
  
    return stars;
  };
  
  
  
  

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
            <div className="main-image">
              <img src={itemData.image || 'https://placehold.co/400x420/'} alt={itemData.title} />
            </div>
            <div className="side-images">
              <div className="side-image top">
                <img src="https://placehold.co/180x200/" alt="Placeholder top" />
              </div>
              <div className="side-image bottom">
                <img src="https://placehold.co/180x200/" alt="Placeholder bottom" />
              </div>
            </div>
        </div>
        <div className="description-group">
          <div className="title">{itemData?.title || 'Titre non disponible'}</div>
          <div className="price">{itemData?.price ? `${itemData.price} €` : 'Prix non disponible'}</div>
          <div className="description-split">
            <div className="details">
              <table className="details-table">
                <tbody>
                <tr>
                    <td className="detail-key">Condition</td>
                    <td className="detail-value">{itemData?.condition || 'Non disponible'}</td>
                  </tr>
                  <tr>
                    <td className="detail-key">Taille</td>
                    <td className="detail-value">{itemData?.size || 'Non disponible'}</td>
                  </tr>
                  <tr>
                    <td className="detail-key">Marque</td>
                    <td className="detail-value">{itemData?.brand || 'Non disponible'}</td>
                  </tr>
                  <tr>
                    <td className="detail-key">Couleur</td>
                    <td className="detail-value">{itemData?.color || 'Non disponible'}</td>
                  </tr>
                  <tr>
                    <td className="detail-key">Matériau</td>
                    <td className="detail-value">{itemData?.material || 'Non disponible'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="divider"></div>
            <div className="description">{itemData?.description || 'Description non disponible'}</div>
          </div>
          <div className='user-btn'>
            <button className="buy-button btn-secondary">Acheter</button>
            <button className="make-an-offer-button btn-secondary">Faire une offre</button>
          </div>
          <div className="seller-details">
            <div>
              <img className="seller-icon" src={itemData?.seller?.username?.image || 'https://placehold.co/60/FFF/c3d1cc'} alt={itemData?.seller?.username?.title} />
            </div>
            <div>
              <div className="seller-pseudo">{itemData?.seller?.username || 'Nom du vendeur non disponible'}</div>
              <div className="seller-star-ratings">
              {itemData?.seller?.rating
                ? renderStarRatings(itemData.seller.rating)
                : 'Note du vendeur non disponible'}
            </div>              
            <div className="nb-raters">{itemData?.seller?.location || 'Emplacement du vendeur non disponible'}</div>
            </div>
          </div> 
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default ItemPage;