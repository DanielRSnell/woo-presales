import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, AlertCircle, ShoppingCart, User, Mail, Phone, Calendar, Eye } from 'lucide-react';

export function SharedCartView({ cartHash, restNonce }) {
  const [sharedCart, setSharedCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    fetchSharedCart();
  }, [cartHash]);

  const fetchSharedCart = async () => {
    if (!cartHash || !restNonce) {
      setError('Invalid shared cart link');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`/wp-json/wc-cart-share-quote/v1/shared-cart/${cartHash}`, {
        headers: {
          'X-WP-Nonce': restNonce
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to load shared cart');
      }

      if (data.success) {
        setSharedCart(data.data);
      } else {
        throw new Error('Failed to load shared cart');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addAllToCart = async () => {
    setAddingToCart(true);
    try {
      const response = await fetch(`/wp-json/wc-cart-share-quote/v1/shared-cart/${cartHash}/add`, {
        method: 'POST',
        headers: {
          'X-WP-Nonce': restNonce,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to add items to cart');
      }

      if (data.success) {
        // Redirect to cart
        window.location.href = data.data.cart_url;
      } else {
        throw new Error('Failed to add items to cart');
      }
    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '300px',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #007cba',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <p>Loading shared cart...</p>
        <style>
          {`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}
        </style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        padding: '40px',
        textAlign: 'center',
        background: '#fee',
        border: '1px solid #fcc',
        borderRadius: '8px',
        margin: '20px 0'
      }}>
        <h3 style={{ color: '#c33', margin: '0 0 16px 0' }}>
          {error.includes('expired') ? (
            <>
              <Clock size={18} style={{ marginRight: '8px' }} />
              Cart Expired
            </>
          ) : (
            <>
              <AlertCircle size={18} style={{ marginRight: '8px' }} />
              Cart Not Found
            </>
          )}
        </h3>
        <p style={{ margin: '0 0 20px 0', color: '#666' }}>
          {error}
        </p>
        <a href="/" style={{
          display: 'inline-block',
          padding: '12px 24px',
          background: '#007cba',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '4px'
        }}>
          ← Back to Shop
        </a>
      </div>
    );
  }

  if (!sharedCart) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px'
      }}
    >
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #007cba 0%, #005a87 100%)',
        color: 'white',
        padding: '30px',
        borderRadius: '12px 12px 0 0',
        textAlign: 'center'
      }}>
        <h2 style={{ margin: '0 0 10px 0', fontSize: '28px' }}>
          <ShoppingCart size={24} style={{ marginRight: '12px' }} />
          Shared Cart
        </h2>
        {sharedCart.customer_name && (
          <p style={{ margin: '0', opacity: 0.9, fontSize: '16px' }}>
            Shared by {sharedCart.customer_name}
          </p>
        )}
      </div>

      {/* Cart Items */}
      <div style={{
        background: 'white',
        border: '1px solid #ddd',
        borderTop: 'none'
      }}>
        {sharedCart.items.map((item, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '20px',
              borderBottom: index < sharedCart.items.length - 1 ? '1px solid #eee' : 'none',
              gap: '20px'
            }}
          >
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '18px', color: '#333' }}>
                {item.product_name}
              </h4>
              <div style={{ color: '#666', fontSize: '14px' }}>
                Quantity: {item.quantity} × ${item.product_price}
              </div>
            </div>
            <div style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#007cba',
              minWidth: '100px',
              textAlign: 'right'
            }}>
              ${item.line_total}
            </div>
          </div>
        ))}

        {/* Total */}
        <div style={{
          padding: '20px',
          background: '#f8f9fa',
          borderTop: '2px solid #007cba',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{ fontSize: '20px', fontWeight: 'bold' }}>Total:</span>
          <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#007cba' }}>
            ${sharedCart.total}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div style={{
        background: '#f8f9fa',
        padding: '30px',
        borderRadius: '0 0 12px 12px',
        border: '1px solid #ddd',
        borderTop: 'none',
        textAlign: 'center'
      }}>
        <p style={{ margin: '0 0 20px 0', color: '#666' }}>
          Add these items to your cart to continue shopping
        </p>
        
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={addAllToCart}
            disabled={addingToCart}
            style={{
              padding: '15px 30px',
              background: addingToCart ? '#ccc' : '#007cba',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: addingToCart ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              transition: 'all 0.2s ease'
            }}
          >
            {addingToCart ? (
              <>
                <div style={{
                  width: '16px',
                  height: '16px',
                  border: '2px solid transparent',
                  borderTop: '2px solid white',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
                Adding to Cart...
              </>
            ) : (
              <>
                <ShoppingCart size={18} style={{ marginRight: '8px' }} />
                Add All to Cart
              </>
            )}
          </button>

          <a
            href="/"
            style={{
              padding: '15px 30px',
              background: 'white',
              color: '#007cba',
              border: '2px solid #007cba',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: 'bold',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              transition: 'all 0.2s ease'
            }}
          >
            ← Continue Shopping
          </a>
        </div>

        {/* Cart info */}
        <div style={{
          marginTop: '30px',
          padding: '20px',
          background: 'white',
          borderRadius: '8px',
          border: '1px solid #ddd'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            fontSize: '14px',
            color: '#666'
          }}>
            <div>
              <strong>Cart ID:</strong> {sharedCart.hash}
            </div>
            <div>
              <strong>Items:</strong> {sharedCart.items.length}
            </div>
            <div>
              <strong>Viewed:</strong> {sharedCart.access_count} times
            </div>
            {sharedCart.expires_at && (
              <div>
                <strong>Expires:</strong> {new Date(sharedCart.expires_at).toLocaleDateString()}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}