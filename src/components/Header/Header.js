import React from 'react';
import './Header.css';

const Header = (props) => {
  return (
    <header className="mainHeader">
      <div>
        <a href="/" data-test='Logo' className="logo">RISK METHODS</a>
      </div>
      {
        props.isAuthenticated &&
        <div className="divProfile">
          <p className="logo">Welcome {localStorage.userId && localStorage.userId.split('@')[0]}</p>
          <a href="/logout" className="logo signout">Logout</a>
        </div>
      }
    </header >
  );
}

export default Header;
