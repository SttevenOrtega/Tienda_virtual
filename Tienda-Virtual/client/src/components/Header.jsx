import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/styles.css';

const Header = () => {
  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src="/assets/img/logo.png" alt="Logotipo" />
      </Link>
    </header>
  );
};

export default Header;
