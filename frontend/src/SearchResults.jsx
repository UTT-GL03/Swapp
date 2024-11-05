import React from 'react';
import { useLocation } from 'react-router-dom';
import './searchResults.css';
import logo from './assets/swapp-logo.svg';


const SearchResults = () => {
  const query = new URLSearchParams(useLocation().search).get('q');

  const sampleData = [
    {
      id: 1,
      image: 'https://via.placeholder.com/150',
      title: 'Product 1',
      price: 19.99
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/150',
      title: 'Product 2',
      price: 24.99
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/150',
      title: 'Product 3',
      price: 14.99
    },
    {
      id: 4,
      image: 'https://via.placeholder.com/150',
      title: 'Product 4',
      price: 29.99
    },
    {
      id: 5,
      image: 'https://via.placeholder.com/150',
      title: 'Product 5',
      price: 9.99
    },
    {
      id: 6,
      image: 'https://via.placeholder.com/150',
      title: 'Product 6',
      price: 34.99
    },
    {
      id: 7,
      image: 'https://via.placeholder.com/150',
      title: 'Product 7',
      price: 17.99
    },
    {
      id: 8,
      image: 'https://via.placeholder.com/150',
      title: 'Product 8',
      price: 22.99
    },
    {
      id: 9,
      image: 'https://via.placeholder.com/150',
      title: 'Product 9',
      price: 12.99
    },
    {
      id: 10,
      image: 'https://via.placeholder.com/150',
      title: 'Product 10',
      price: 27.99
    },
    {
      id: 11,
      image: 'https://via.placeholder.com/150',
      title: 'Product 11',
      price: 7.99
    },
    {
      id: 12,
      image: 'https://via.placeholder.com/150',
      title: 'Product 12',
      price: 32.99
    },
    {
      id: 13,
      image: 'https://via.placeholder.com/150',
      title: 'Product 13',
      price: 15.99
    },
    {
      id: 14,
      image: 'https://via.placeholder.com/150',
      title: 'Product 14',
      price: 20.99
    },
    {
      id: 15,
      image: 'https://via.placeholder.com/150',
      title: 'Product 15',
      price: 10.99
    },
    {
      id: 16,
      image: 'https://via.placeholder.com/150',
      title: 'Product 16',
      price: 25.99
    },
    {
      id: 17,
      image: 'https://via.placeholder.com/150',
      title: 'Product 17',
      price: 5.99
    },
    {
      id: 18,
      image: 'https://via.placeholder.com/150',
      title: 'Product 18',
      price: 30.99
    },
    {
      id: 19,
      image: 'https://via.placeholder.com/150',
      title: 'Product 19',
      price: 13.99
    },
    {
      id: 20,
      image: 'https://via.placeholder.com/150',
      title: 'Product 20',
      price: 23.99
    }
  ];
  
  const handleItemClick = (url) => {
    navigate(url);
  };

  return (
    <div>
      <div className="Frontpage">
      <header>
        <div id="main-header" className="conteneur">
            <div id="main-header-search">
                <img id="logo2" src={logo} alt="Swapp logo" />
                <form id="search-form" name="search-form" action="" method="post">
                    <input type="text" id="input-search" name="search" placeholder="Search..." value={query} required/>
                </form>
            </div>
            <div id="main-header-buttons">
                <div><button><i className="fa fa-shopping-cart button-icon"></i>Mon panier</button></div>
                <div><button><i className="fa fa-user button-icon"></i>Mon compte</button></div>
            </div>
        </div>
        <div>
            <nav>
                <ul id="main-header-filters" className="conteneur">
                    <li><button>Filtre</button></li>
                    <li><button>Filtre</button></li>
                    <li><button>Filtre</button></li>
                    <li><button>Filtre</button></li>
                    <li><button>Filtre</button></li>
                    <li><button>Filtre</button></li>
                </ul>
            </nav>
        </div>
    </header>

        <div className="Items conteneur">
        {sampleData.map((item) => (
            <div
              key={item.id}
              className="Item"
              onClick={() => handleItemClick(item.url)}
              style={{ cursor: 'pointer' }}
            >
              <img src={item.image} alt={item.title} />
              <div className="Item-Content">
                <div className="Item-Title">{item.title}</div>
                <div className="Item-Price">${item.price.toFixed(2)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;