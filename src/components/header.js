import React from 'react';
import './header.css'; // You'll create this CSS file

const Header = () => {
  return (
    <div className="header">
      {/* <img src="your-logo.png" alt="Logo" className="logo" /> */}
      <h2>STRAFA</h2>
      <input type="text" placeholder="Search" className="search-input" />
    </div>
  );
};

export { Header };
