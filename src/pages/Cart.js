import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
    const navigate = useNavigate();
    const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();

    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity === 0) {
            removeFromCart(productId);
        } else {
            updateQuantity(productId, newQuantity);
        }
    };

    const handleCheckout = () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }

        // Simulate checkout process
        alert(`Order placed successfully! Total: ₹${getCartTotal().toLocaleString('en-IN')}\nThank you for supporting our artisans!`);
        clearCart();
        navigate('/buyer');
    };

    if (cart.length === 0) {
        return (
            <div className="cart-page">
                <div className="cart-header">
                    <button className="back-btn" onClick={() => navigate('/buyer')}>
                        ← Back to Shopping
                    </button>
                    <h1>Your Cart</h1>
                </div>

                <div className="empty-cart">
                    <div className="empty-cart-icon">🛒</div>
                    <h2>Your cart is empty</h2>
                    <p>Looks like you haven't added any beautiful handicrafts yet.</p>
                    <button className="continue-shopping-btn" onClick={() => navigate('/buyer')}>
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <div className="cart-header">
                <button className="back-btn" onClick={() => navigate('/buyer')}>
                    ← Back to Shopping
                </button>
                <h1>Your Cart ({cart.length} items)</h1>
                <button className="clear-cart-btn" onClick={clearCart}>
                    Clear Cart
                </button>
            </div>

            <div className="cart-content">
                <div className="cart-items">
                    {cart.map(item => (
                        <div key={item.id} className="cart-item">
                            <img src={item.image} alt={item.name} className="cart-item-image" />

                            <div className="cart-item-details">
                                <h3>{item.name}</h3>
                                <p className="cart-item-artisan">By {item.artisan}</p>
                                <p className="cart-item-location">📍 {item.location}</p>
                                <div className="cart-item-rating">
                                    ⭐ {item.rating} ({item.reviews} reviews)
                                </div>
                            </div>

                            <div className="cart-item-actions">
                                <div className="price-section">
                                    <span className="current-price">₹{item.price.toLocaleString('en-IN')}</span>
                                    {item.originalPrice && (
                                        <span className="original-price">₹{item.originalPrice.toLocaleString('en-IN')}</span>
                                    )}
                                </div>

                                <div className="quantity-controls">
                                    <button
                                        className="quantity-btn"
                                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                    >
                                        -
                                    </button>
                                    <span className="quantity">{item.quantity}</span>
                                    <button
                                        className="quantity-btn"
                                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                    >
                                        +
                                    </button>
                                </div>

                                <div className="item-total">
                                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                                </div>

                                <button
                                    className="remove-btn"
                                    onClick={() => removeFromCart(item.id)}
                                >
                                    🗑️ Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="cart-summary">
                    <div className="summary-card">
                        <h2>Order Summary</h2>

                        <div className="summary-row">
                            <span>Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                            <span>₹{getCartTotal().toLocaleString('en-IN')}</span>
                        </div>

                        <div className="summary-row">
                            <span>Shipping</span>
                            <span className="free-shipping">FREE</span>
                        </div>

                        <div className="summary-row">
                            <span>Platform Fee</span>
                            <span>₹0</span>
                        </div>

                        <hr />

                        <div className="summary-row total-row">
                            <span>Total</span>
                            <span>₹{getCartTotal().toLocaleString('en-IN')}</span>
                        </div>

                        <button className="checkout-btn" onClick={handleCheckout}>
                            Place Order 🛒
                        </button>

                        <div className="artisan-impact">
                            <h3>🌟 Your Impact</h3>
                            <p>Your purchase directly supports {new Set(cart.map(item => item.artisan)).size} artisan{new Set(cart.map(item => item.artisan)).size > 1 ? 's' : ''} across India!</p>
                            <div className="supported-artisans">
                                {Array.from(new Set(cart.map(item => item.artisan))).map(artisan => (
                                    <div key={artisan} className="artisan-tag">👨‍🎨 {artisan}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
