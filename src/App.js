import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import banner from "./assets/banner.jpg";
import logo from "./assets/logo.png";

// Separate Landing Pages
import BuyerLanding from "./pages/BuyerLanding";
import SellerLanding from "./pages/SellerLanding";

function App() {
  const [showBuyerModal, setShowBuyerModal] = useState(false);
  const [showSellerModal, setShowSellerModal] = useState(false);
  const [buyerSignup, setBuyerSignup] = useState(false);
  const [sellerSignup, setSellerSignup] = useState(false);

  // Buyer state
  const [buyerEmail, setBuyerEmail] = useState("");
  const [buyerPassword, setBuyerPassword] = useState("");

  // Seller state
  const [sellerName, setSellerName] = useState("");
  const [sellerPhone, setSellerPhone] = useState("");
  const [sellerBusiness, setSellerBusiness] = useState("");
  const [sellerEmail, setSellerEmail] = useState("");
  const [sellerPassword, setSellerPassword] = useState("");

  const navigate = useNavigate();

  // Buyer auth handler
  const handleBuyerAuth = () => {
    if (!buyerEmail || !buyerPassword) {
      alert("Please fill email and password!");
      return;
    }

    if (buyerSignup) {
      // Buyer signup logic
      console.log("Buyer Signup:", { buyerEmail, buyerPassword });
      alert("Buyer signed up successfully!");
    } else {
      // Buyer login logic
      console.log("Buyer Login:", { buyerEmail, buyerPassword });
      alert("Buyer logged in successfully!");
    }

    setShowBuyerModal(false);
    navigate("/buyer");
  };

  // Seller auth handler
  const handleSellerAuth = () => {
    if (!sellerEmail || !sellerPassword) {
      alert("Please fill email and password!");
      return;
    }

    if (sellerSignup) {
      if (!sellerName || !sellerPhone || !sellerBusiness) {
        alert("Please fill all signup details!");
        return;
      }
      console.log("Seller Signup:", { sellerName, sellerPhone, sellerBusiness, sellerEmail, sellerPassword });
      alert("Seller signed up successfully!");
    } else {
      console.log("Seller Login:", { sellerEmail, sellerPassword });
      alert("Seller logged in successfully!");
    }

    setShowSellerModal(false);
    navigate("/seller");
  };

  return (
    <div className="app-container">
      {/* Hero Section */}
      <header className="hero" style={{ backgroundImage: `url(${banner})` }}>
        <div className="overlay">
          <img src={logo} alt="Root & Rise Logo" className="hero-logo" />
          <h1 className="hero-title">Root & Rise</h1>
          <p className="hero-tagline">
            🌸 Celebrating Indian Handicrafts 🌸 <br />
            Where Tradition Meets Technology
          </p>
          <div className="hero-buttons">
            <button className="lotus-btn" onClick={() => setShowBuyerModal(true)}>
              ✨ Buyer Login / Signup ✨
            </button>
            <button className="lotus-btn seller-btn" onClick={() => setShowSellerModal(true)}>
              ✨ Seller Login / Signup ✨
            </button>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">How We Empower Artisans</h2>
        <div className="features-grid">
          <div className="feature">
            📸 <strong>Product catalogs from photos:</strong> Click photos and auto-create your shop catalog.
          </div>
          <div className="feature">
            💰 <strong>Fair price calculation:</strong> Set right prices based on materials & time.
          </div>
          <div className="feature">
            📦 <strong>Track raw materials & orders:</strong> Never miss inventory or pending orders.
          </div>
          <div className="feature">
            🤝 <strong>Direct connection with buyers:</strong> Sell directly without middlemen.
          </div>
          <div className="feature">
            📚 <strong>Regional-language skill library:</strong> Tutorials in your language.
          </div>
          <div className="feature">
            💳 <strong>Digital payments:</strong> Safe & instant money transfers.
          </div>
          <div className="feature">
            📊 <strong>Impact dashboards:</strong> Track income, sales & growth.
          </div>
          <div className="feature">
            🤖 <strong>AI product suggestions:</strong> Get ideas based on trends & demand.
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>🌼 Crafted by Hands, Empowered by Technology 🌼</p>
      </footer>

      {/* Buyer Modal */}
      {showBuyerModal && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-btn" onClick={() => setShowBuyerModal(false)}>✖</button>
            <h3>Buyer Portal</h3>
            <input
              type="email"
              placeholder="Email"
              value={buyerEmail}
              onChange={(e) => setBuyerEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={buyerPassword}
              onChange={(e) => setBuyerPassword(e.target.value)}
            />
            <button className="action-btn" onClick={handleBuyerAuth}>
              {buyerSignup ? "Signup" : "Login"}
            </button>
            <p className="alt-text">
              {buyerSignup ? (
                <>Already have an account? <span className="link" onClick={() => setBuyerSignup(false)}>Login</span></>
              ) : (
                <>New here? <span className="link" onClick={() => setBuyerSignup(true)}>Signup</span></>
              )}
            </p>
          </div>
        </div>
      )}

      {/* Seller Modal */}
      {showSellerModal && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-btn" onClick={() => setShowSellerModal(false)}>✖</button>
            <h3>Seller Portal</h3>

            {sellerSignup && (
              <>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={sellerName}
                  onChange={(e) => setSellerName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={sellerPhone}
                  onChange={(e) => setSellerPhone(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="What you do (Business/Artisan Type)"
                  value={sellerBusiness}
                  onChange={(e) => setSellerBusiness(e.target.value)}
                />
              </>
            )}

            <input
              type="email"
              placeholder="Email"
              value={sellerEmail}
              onChange={(e) => setSellerEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={sellerPassword}
              onChange={(e) => setSellerPassword(e.target.value)}
            />

            <button className="action-btn" onClick={handleSellerAuth}>
              {sellerSignup ? "Signup" : "Login"}
            </button>

            <p className="alt-text">
              {sellerSignup ? (
                <>Already have an account? <span className="link" onClick={() => setSellerSignup(false)}>Login</span></>
              ) : (
                <>New here? <span className="link" onClick={() => setSellerSignup(true)}>Signup</span></>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// Wrap in Router
export default function Main() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<App />} />
        <Route path="/buyer" element={<BuyerLanding />} />
        <Route path="/seller" element={<SellerLanding />} />
      </Routes>
    </Router>
  );
}
