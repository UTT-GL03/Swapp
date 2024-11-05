import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className="custom-shape-divider-bottom-1730289659">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="shape-fill"></path>
        </svg>
      </div>
      <div id="footer-conteneur">
        <div id="footer-content" className="conteneur">
          <div id="footer-links">
            <ul>
              <li><h4>Swapp</h4></li>
              <li><a href="">À propos</a></li>
              <li><a href="">Économie circulaire</a></li>
              <li><a href="">Comment ça marche ?</a></li>
            </ul>
            <ul>
              <li><a href="">Politique de confidentialité</a></li>
              <li><a href="">Termes & conditions</a></li>
            </ul>
          </div>
          <div id="footer-socials">
            <ul>
              <li>
                <a target="_blank" rel="noopener noreferrer" title="Accès à la page Facebook de Swapp" href="https://fr-fr.facebook.com/">
                  <i className="fa fa-2x fa-facebook"></i>
                </a>
              </li>
              <li>
                <a target="_blank" rel="noopener noreferrer" title="Accès à la page Instagram de Swapp" href="https://www.instagram.com">
                  <i className="fa fa-2x fa-instagram"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
