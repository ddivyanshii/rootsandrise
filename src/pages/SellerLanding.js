// src/pages/SellerLanding.js
import React from "react";
import "./SellerLanding.css";
import logo from "../assets/logo.png";
import banner from "../assets/banner.jpg";

export default function SellerLanding() {
  return (
    <div className="seller-landing">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-left">
          <img src={logo} alt="Root & Rise Logo" className="nav-logo" />
          <h2>Root & Rise</h2>
        </div>
        <div className="nav-right">
          <button className="logout-btn">Logout</button>
        </div>
      </nav>

      {/* Hero */}
      <header
        className="seller-hero"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="seller-overlay">
          <h1>Welcome, Artisan 🙏</h1>
          <p>Showcase your creations. Grow your business.</p>
        </div>
      </header>

      {/* Dashboard */}
      <section className="dashboard">
        <h2>Your Dashboard</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <h3>₹12,450</h3>
            <p>Total Sales</p>
          </div>
          <div className="stat-card">
            <h3>56</h3>
            <p>Orders Completed</p>
          </div>
          <div className="stat-card">
            <h3>8</h3>
            <p>Pending Orders</p>
          </div>
          <div className="stat-card">
            <h3>120</h3>
            <p>Products Listed</p>
          </div>
        </div>
      </section>

      {/* Upload Products */}
      <section className="upload-section">
        <h2>Add New Product</h2>
        <form className="upload-form">
          <input type="text" placeholder="Product Name" required />
          <input type="number" placeholder="Price (₹)" required />
          <textarea placeholder="Description" rows="3" required></textarea>
          <input type="file" accept="image/*" />
          <button type="submit">Upload Product</button>
        </form>
      </section>

      {/* Orders Section */}
      <section className="orders-section">
        <h2>Recent Orders</h2>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Buyer</th>
              <th>Product</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#1024</td>
              <td>Ananya</td>
              <td>Handloom Saree</td>
              <td>Completed ✅</td>
            </tr>
            <tr>
              <td>#1025</td>
              <td>Ravi</td>
              <td>Clay Pot</td>
              <td>Pending ⏳</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Footer */}
      <footer className="seller-footer">
        <p>🌸 Empowering Artisans | Celebrating Tradition 🌸</p>
      </footer>
    </div>
  );
}
