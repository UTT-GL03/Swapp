import React from 'react';
import { useParams } from 'react-router-dom';

const ItemPage = () => {
  const { id } = useParams(); // Récupère l'ID depuis l'URL

  console.log(`Selected item ID: ${id}`); // Affiche un log de l'ID

  return (
    <div>
      <h1>Item Page</h1>
      <p>Selected item ID: {id}</p>
    </div>
  );
};

export default ItemPage;
