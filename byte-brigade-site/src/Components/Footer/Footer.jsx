import React,{useEffect} from 'react';
import {FaInstagram, FaLinkedin, FaEnvelope, FaArrowUp } from 'react-icons/fa';
import './style.css';

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
function Footer() {
  useEffect(() => {
  const handleScroll = () => {
    if (window.scrollY > 100) {
      document.body.classList.add('scrolled');
    } else {
      document.body.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

  return (
    <footer className="footer-custom text-white text-center py-4 mt-auto">
      <div className="container">
        <p className="mb-2">© {new Date().getFullYear()} Byte Brigade – Tous droits réservés.</p>
        <p className="mb-3">Conçu avec ❤️ par le Club Informatique Byte Brigade</p>
        <div className="d-flex justify-content-center gap-3">
          <a href="mailto:bytebrigadeclub@gmail.com" className="text-white" title="Email du club">
            <FaEnvelope />
          </a>
          <a
            href="https://www.instagram.com/byte.brigade.club?igsh=djA4a2lydXVwenk0" target="_blank" rel="noreferrer"
            className="text-white fs-5"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.linkedin.com/in/bytebrigade?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" rel="noreferrer"
            className="text-white fs-5"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
      {/* Bouton Haut de page */}
      <button
        onClick={scrollToTop}
        className="btn btn-primary scroll-top-button"
        title="Haut de page"
      >
        <FaArrowUp />
      </button>
    </footer>
  );
}

export default Footer;
