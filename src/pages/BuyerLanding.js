// src/pages/BuyerLanding.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./BuyerLanding.css";
import logo from "../assets/logo.png";
import banner from "../assets/banner.jpg";
import demoData from "../assets/demo-data.json";
import { useCart } from "../context/CartContext";

export default function BuyerLanding() {
  const navigate = useNavigate();
  const { addToCart, getCartItemsCount, isInCart, getItemQuantity } = useCart();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredProducts, setFilteredProducts] = useState(demoData.products);
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);

  // Filter products based on search and category
  useEffect(() => {
    let filtered = demoData.products;

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
        product.artisan.toLowerCase().includes(searchLower) ||
        product.location.toLowerCase().includes(searchLower)
      );
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered.sort((a, b) => b.id - a.id);
        break;
      default: // featured
        filtered = filtered.filter(product => demoData.featuredProducts.includes(product.id))
          .concat(filtered.filter(product => !demoData.featuredProducts.includes(product.id)));
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, sortBy]);

  const handleAddToCart = (product) => {
    addToCart(product);
    // Show a brief success message
    const button = document.getElementById(`add-btn-${product.id}`);
    if (button) {
      const originalText = button.textContent;
      button.textContent = "Added! ✓";
      button.style.background = "#4caf50";
      setTimeout(() => {
        button.textContent = originalText;
        button.style.background = "";
      }, 1500);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setShowFilters(false);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSortBy("featured");
  };

  return (
    <div className="buyer-landing">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-left">
          <img src={logo} alt="Root & Rise Logo" className="nav-logo" />
          <h2>Root & Rise</h2>
        </div>
        <div className="nav-center">
          <div className="search-container">
            <input
              type="text"
              placeholder="🔍 Search handicrafts, artisans, locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {searchTerm && (
              <button
                className="clear-search"
                onClick={() => setSearchTerm("")}
              >
                ✕
              </button>
            )}
          </div>
        </div>
        <div className="nav-right">
          <button
            className="cart-btn"
            onClick={() => navigate('/cart')}
          >
            🛒 Cart {getCartItemsCount() > 0 && <span className="cart-count">({getCartItemsCount()})</span>}
          </button>
          <button className="logout-btn" onClick={() => navigate('/')}>Logout</button>
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
          <div className="hero-stats">
            <span>📦 {demoData.products.length}+ Products</span>
            <span>👨‍🎨 {new Set(demoData.products.map(p => p.artisan)).size}+ Artisans</span>
            <span>🏛️ {demoData.categories.length} Categories</span>
          </div>
        </div>
      </header>

      {/* Filter Bar */}
      <section className="filter-bar">
        <div className="filter-controls">
          <button
            className="filter-toggle"
            onClick={() => setShowFilters(!showFilters)}
          >
            🔧 Filters {(selectedCategory !== "All" || searchTerm) && <span className="active-filters">•</span>}
          </button>

          <div className="sort-controls">
            <label>Sort by:</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          {(selectedCategory !== "All" || searchTerm) && (
            <button className="clear-filters" onClick={clearFilters}>
              Clear All Filters
            </button>
          )}
        </div>

        {showFilters && (
          <div className="filter-panel">
            <div className="category-filters">
              <h3>Categories</h3>
              <div className="category-buttons">
                <button
                  className={selectedCategory === "All" ? "active" : ""}
                  onClick={() => handleCategoryClick("All")}
                >
                  All ({demoData.products.length})
                </button>
                {demoData.categories.map(category => (
                  <button
                    key={category.id}
                    className={selectedCategory === category.name ? "active" : ""}
                    onClick={() => handleCategoryClick(category.name)}
                  >
                    {category.emoji} {category.name} ({demoData.products.filter(p => p.category === category.name).length})
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="results-info">
          {searchTerm && (
            <p>Search results for "<strong>{searchTerm}</strong>": </p>
          )}
          <span>{filteredProducts.length} products found</span>
          {selectedCategory !== "All" && (
            <span> in <strong>{selectedCategory}</strong></span>
          )}
        </div>
      </section>

      {/* Categories Quick Access */}
      {!searchTerm && selectedCategory === "All" && (
        <section className="categories">
          <h2>Explore Categories</h2>
          <div className="category-grid">
            {demoData.categories.map(category => (
              <div
                key={category.id}
                className="category-card"
                onClick={() => handleCategoryClick(category.name)}
              >
                {category.emoji} {category.name}
                <small>({demoData.products.filter(p => p.category === category.name).length} items)</small>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Products Section */}
      <section className="products-section">
        <h2>
          {selectedCategory === "All"
            ? (searchTerm ? `Search Results` : `Featured Products`)
            : `${selectedCategory} Collection`}
        </h2>

        {filteredProducts.length === 0 ? (
          <div className="no-products">
            <div className="no-products-icon">🔍</div>
            <h3>No products found</h3>
            <p>Try adjusting your search or filter criteria</p>
            <button className="clear-filters" onClick={clearFilters}>
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="product-grid">
            {filteredProducts.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image-container">
                  <img src={product.image} alt={product.name} />
                  {product.originalPrice && (
                    <div className="discount-badge">
                      {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                    </div>
                  )}
                  {isInCart(product.id) && (
                    <div className="in-cart-badge">
                      In Cart ({getItemQuantity(product.id)})
                    </div>
                  )}
                </div>

                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="product-artisan">By {product.artisan}</p>
                  <p className="product-location">📍 {product.location}</p>

                  <div className="product-rating">
                    ⭐ {product.rating} ({product.reviews} reviews)
                  </div>

                  <div className="product-price">
                    <span className="current-price">₹{product.price.toLocaleString('en-IN')}</span>
                    {product.originalPrice && (
                      <span className="original-price">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                    )}
                  </div>

                  <div className="product-tags">
                    {product.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>

                  <button
                    id={`add-btn-${product.id}`}
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(product)}
                  >
                    {isInCart(product.id) ? `Add More (${getItemQuantity(product.id)} in cart)` : 'Add to Cart'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="buyer-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>🌸 Root & Rise</h3>
            <p>Empowering Artisans | Connecting Traditions</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <p>About Us</p>
            <p>Artisan Stories</p>
            <p>Support</p>
          </div>
          <div className="footer-section">
            <h4>Categories</h4>
            {demoData.categories.slice(0, 3).map(cat => (
              <p key={cat.id} onClick={() => handleCategoryClick(cat.name)} style={{ cursor: 'pointer' }}>
                {cat.emoji} {cat.name}
              </p>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
