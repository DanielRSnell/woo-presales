import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Star, Clock, PartyPopper, Mail, MessageCircle, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';

export function QuoteView({ quoteId, restNonce }) {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [accepting, setAccepting] = useState(false);

  useEffect(() => {
    fetchQuote();
  }, [quoteId]);

  const fetchQuote = async () => {
    if (!quoteId || !restNonce) {
      setError('Invalid quote link');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`/wp-json/wc-cart-share-quote/v1/quote/${quoteId}`, {
        headers: {
          'X-WP-Nonce': restNonce
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to load quote');
      }

      if (data.success) {
        setQuote(data.data);
      } else {
        throw new Error('Failed to load quote');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const acceptQuote = async () => {
    setAccepting(true);
    try {
      const response = await fetch(`/wp-json/wc-cart-share-quote/v1/quote/${quoteId}/accept`, {
        method: 'POST',
        headers: {
          'X-WP-Nonce': restNonce,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to accept quote');
      }

      if (data.success) {
        // Redirect to cart
        window.location.href = data.data.cart_url;
      } else {
        throw new Error('Failed to accept quote');
      }
    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      setAccepting(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#ff9800';
      case 'approved': return '#4caf50';
      case 'rejected': return '#f44336';
      case 'expired': return '#9e9e9e';
      default: return '#9e9e9e';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Loader2 size={16} className="animate-spin" />;
      case 'approved': return <CheckCircle size={16} />;
      case 'rejected': return <AlertCircle size={16} />;
      case 'expired': return <Clock size={16} />;
      default: return '❓';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Pending Review';
      case 'approved': return 'Approved';
      case 'rejected': return 'Rejected';
      case 'expired': return 'Expired';
      default: return 'Unknown';
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
          borderTop: '4px solid #00a32a',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <p>Loading quote...</p>
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
          ❌ Quote Not Found
        </h3>
        <p style={{ margin: '0 0 20px 0', color: '#666' }}>
          {error}
        </p>
        <a href="/" style={{
          display: 'inline-block',
          padding: '12px 24px',
          background: '#00a32a',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '4px'
        }}>
          ← Back to Shop
        </a>
      </div>
    );
  }

  if (!quote) {
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
        background: 'linear-gradient(135deg, #00a32a 0%, #007e1f 100%)',
        color: 'white',
        padding: '30px',
        borderRadius: '12px 12px 0 0',
        textAlign: 'center'
      }}>
        <h2 style={{ margin: '0 0 10px 0', fontSize: '28px' }}>
          💬 Quote #{quote.quote_id}
        </h2>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(255, 255, 255, 0.2)',
          padding: '8px 16px',
          borderRadius: '20px',
          fontSize: '16px'
        }}>
          <span>{getStatusIcon(quote.status)}</span>
          {getStatusText(quote.status)}
        </div>
      </div>

      {/* Quote Details */}
      <div style={{
        background: 'white',
        border: '1px solid #ddd',
        borderTop: 'none'
      }}>
        {/* Customer Info */}
        <div style={{
          padding: '20px',
          borderBottom: '1px solid #eee',
          background: '#f8f9fa'
        }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>Customer Information</h4>
          <div style={{ color: '#666' }}>
            <strong>{quote.customer_name}</strong><br />
            {quote.customer_email}
          </div>
        </div>

        {/* Quote Items */}
        <div>
          {quote.items.map((item, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '20px',
                borderBottom: index < quote.items.length - 1 ? '1px solid #eee' : 'none',
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
                color: '#00a32a',
                minWidth: '100px',
                textAlign: 'right'
              }}>
                ${item.line_total}
              </div>
            </div>
          ))}
        </div>

        {/* Quote Total */}
        <div style={{
          padding: '20px',
          background: '#f8f9fa',
          borderTop: '2px solid #00a32a',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{ fontSize: '20px', fontWeight: 'bold' }}>Quote Total:</span>
          <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#00a32a' }}>
            ${quote.quote_total}
          </span>
        </div>

        {/* Quote Notes */}
        {quote.quote_notes && (
          <div style={{
            padding: '20px',
            background: '#fff3cd',
            border: '1px solid #ffeaa7',
            borderLeft: '4px solid #fdcb6e'
          }}>
            <h5 style={{ margin: '0 0 10px 0', color: '#856404' }}>Notes:</h5>
            <p style={{ margin: '0', color: '#856404' }}>
              {quote.quote_notes}
            </p>
          </div>
        )}
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
        {quote.status === 'pending' && (
          <div>
            <div style={{
              background: '#fff3cd',
              border: '1px solid #ffeaa7',
              borderRadius: '6px',
              padding: '15px',
              margin: '0 0 20px 0'
            }}>
              <p style={{ margin: '0', color: '#856404' }}>
                <Loader2 size={18} className="animate-spin" style={{ marginRight: '8px' }} />
                <strong>Your quote is being reviewed.</strong><br />
                We'll update the status once our team has processed your request.
              </p>
            </div>
          </div>
        )}

        {quote.status === 'approved' && quote.can_accept && (
          <div>
            <p style={{ margin: '0 0 20px 0', color: '#666' }}>
              <PartyPopper size={18} style={{ marginRight: '8px' }} />
              <strong>Great news!</strong> Your quote has been approved. 
              You can now add these items to your cart at the quoted price.
            </p>
            
            <button
              onClick={acceptQuote}
              disabled={accepting}
              style={{
                padding: '15px 30px',
                background: accepting ? '#ccc' : '#00a32a',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: accepting ? 'not-allowed' : 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                transition: 'all 0.2s ease',
                marginRight: '15px'
              }}
            >
              {accepting ? (
                <>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid transparent',
                    borderTop: '2px solid white',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}></div>
                  Accepting Quote...
                </>
              ) : (
                <>
                  ✅ Accept Quote & Add to Cart
                </>
              )}
            </button>
          </div>
        )}

        {quote.status === 'rejected' && (
          <div style={{
            background: '#f8d7da',
            border: '1px solid #f5c6cb',
            borderRadius: '6px',
            padding: '15px',
            margin: '0 0 20px 0'
          }}>
            <p style={{ margin: '0', color: '#721c24' }}>
              ❌ <strong>Quote Rejected</strong><br />
              Unfortunately, we cannot fulfill this quote request. 
              Please contact us for alternative options.
            </p>
          </div>
        )}

        {quote.status === 'expired' && (
          <div style={{
            background: '#d1ecf1',
            border: '1px solid #bee5eb',
            borderRadius: '6px',
            padding: '15px',
            margin: '0 0 20px 0'
          }}>
            <p style={{ margin: '0', color: '#0c5460' }}>
              <Clock size={18} style={{ marginRight: '8px' }} />
              <strong>Quote Expired</strong><br />
              This quote has expired. Please create a new quote request for updated pricing.
            </p>
          </div>
        )}

        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href="/"
            style={{
              padding: '15px 30px',
              background: 'white',
              color: '#00a32a',
              border: '2px solid #00a32a',
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

          <a
            href="mailto:support@example.com"
            style={{
              padding: '15px 30px',
              background: 'white',
              color: '#666',
              border: '2px solid #ddd',
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
            <Mail size={16} style={{ marginRight: '8px' }} />
            Contact Support
          </a>
        </div>

        {/* Quote Info */}
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
              <strong>Quote ID:</strong> {quote.quote_id}
            </div>
            <div>
              <strong>Status:</strong> {getStatusText(quote.status)}
            </div>
            <div>
              <strong>Items:</strong> {quote.items.length}
            </div>
            {quote.expires_at && (
              <div>
                <strong>Expires:</strong> {new Date(quote.expires_at).toLocaleDateString()}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}