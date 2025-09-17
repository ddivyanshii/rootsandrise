// src/pages/BuyerLanding.js
import React from "react";
import "./BuyerLanding.css";
import logo from "../assets/logo.png";
import banner from "../assets/banner.jpg";

export default function BuyerLanding() {
  return (
    <div className="buyer-landing">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-left">
          <img src={logo} alt="Root & Rise Logo" className="nav-logo" />
          <h2>Root & Rise</h2>
        </div>
        <div className="nav-right">
          <input type="text" placeholder="🔍 Search handicrafts..." />
          <button className="cart-btn">🛒 Cart</button>
          <button className="logout-btn">Logout</button>
        </div>
      </nav>

      {/* Hero Section */}
      <header
        className="buyer-hero"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="buyer-overlay">
          <h1>Welcome, Buyer 🙏</h1>
          <p>Discover Authentic Indian Handicrafts Directly from Artisans</p>
        </div>
      </header>

      {/* Categories */}
      <section className="categories">
        <h2>Explore Categories</h2>
        <div className="category-grid">
          <div className="category-card">🪔 Pottery</div>
          <div className="category-card">🧵 Textiles</div>
          <div className="category-card">🎨 Paintings</div>
          <div className="category-card">🪑 Woodwork</div>
          <div className="category-card">💍 Jewelry</div>
          <div className="category-card">🥻 Handloom</div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured">
        <h2>Featured Products</h2>
        <div className="product-grid">
          <div className="product-card">
            <img
              src="https://i.imgur.com/7D7I6dI.jpg"
              alt="Handcrafted Pot"
            />
            <h3>Clay Pot</h3>
            <p>₹499</p>
            <button>Add to Cart</button>
          </div>
          <div className="product-card">
            <img
              src="https://i.imgur.com/jJq5C8B.jpg"
              alt="Handwoven Scarf"
            />
            <h3>Handwoven Scarf</h3>
            <p>₹799</p>
            <button>Add to Cart</button>
          </div>
          <div className="product-card">
            <img
              src="https://i.imgur.com/5cX1q0m.jpg"
              alt="Wooden Carving"
            />
            <h3>Wooden Carving</h3>
            <p>₹1499</p>
            <button>Add to Cart</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="buyer-footer">
        <p>🌸 Empowering Artisans | Connecting Traditions 🌸</p>
      </footer>
    </div>
  );
}
