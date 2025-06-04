import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Dialog from '@radix-ui/react-dialog';
import { Share2, MessageCircle, Copy, ExternalLink, CheckCircle, AlertCircle } from 'lucide-react';

export function CartActionsModal({ 
  restNonce, 
  currentUrl, 
  showShareModal, 
  showQuoteModal, 
  onCloseShareModal, 
  onCloseQuoteModal,
  cartData 
}) {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Share modal state
  const [shareData, setShareData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    expires_hours: 168 // 7 days default
  });
  const [shareResult, setShareResult] = useState(null);
  const [shareLoading, setShareLoading] = useState(false);
  
  // Quote modal state
  const [quoteData, setQuoteData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    message: ''
  });
  const [quoteResult, setQuoteResult] = useState(null);
  const [quoteLoading, setQuoteLoading] = useState(false);

  useEffect(() => {
    if (showShareModal || showQuoteModal) {
      loadCartData();
    }
  }, [showShareModal, showQuoteModal, cartData]);

  const loadCartData = () => {
    setLoading(true);
    
    try {
      if (cartData) {
        console.log('Loading pre-loaded cart data');
        const parsedCartData = JSON.parse(cartData);
        console.log('Cart data loaded:', parsedCartData);
        setCart(parsedCartData);
      } else {
        console.log('No cart data provided');
        setCart({ items: [], is_empty: true, items_count: 0 });
      }
    } catch (err) {
      console.error('Failed to parse cart data:', err);
      setCart({ items: [], is_empty: true, items_count: 0 });
    } finally {
      setLoading(false);
    }
  };

  const handleShareCart = async () => {
    setShareLoading(true);
    setShareResult(null);
    
    try {
      const requestData = {
        ...shareData,
        cart_data: cart // Include the cart data in the request
      };
      
      console.log('Sharing cart with data:', requestData);
      
      const response = await fetch('/wp-json/wc-cart-share-quote/v1/cart/share', {
        method: 'POST',
        headers: {
          'X-WP-Nonce': restNonce,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to share cart');
      }

      if (data.success) {
        console.log('Share successful:', data.data);
        setShareResult(data.data);
        // Prevent any potential page reload
        if (window.event) {
          window.event.preventDefault();
          window.event.stopPropagation();
        }
      } else {
        throw new Error('Failed to share cart');
      }
    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      setShareLoading(false);
    }
  };

  const handleCreateQuote = async () => {
    setQuoteLoading(true);
    setQuoteResult(null);
    
    try {
      const requestData = {
        ...quoteData,
        cart_data: cart // Include the cart data in the request
      };
      
      console.log('Creating quote with data:', requestData);
      
      const response = await fetch('/wp-json/wc-cart-share-quote/v1/cart/quote', {
        method: 'POST',
        headers: {
          'X-WP-Nonce': restNonce,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to create quote');
      }

      if (data.success) {
        console.log('Quote successful:', data.data);
        setQuoteResult(data.data);
        // Prevent any potential page reload
        if (window.event) {
          window.event.preventDefault();
          window.event.stopPropagation();
        }
      } else {
        throw new Error('Failed to create quote');
      }
    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      setQuoteLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Link copied to clipboard!');
    }).catch(() => {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Link copied to clipboard!');
    });
  };

  const modalStyles = {
    overlay: {
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000
    },
    content: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '0',
      maxWidth: '500px',
      width: '90%',
      maxHeight: '90vh',
      overflow: 'auto',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
    },
    header: {
      padding: '24px 24px 16px 24px',
      borderBottom: '1px solid #e5e7eb'
    },
    body: {
      padding: '24px'
    },
    footer: {
      padding: '16px 24px 24px 24px',
      borderTop: '1px solid #e5e7eb',
      display: 'flex',
      gap: '12px',
      justifyContent: 'flex-end'
    }
  };

  const inputStyles = {
    width: '100%',
    padding: '12px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '16px',
    marginBottom: '16px'
  };

  const buttonStyles = {
    primary: {
      padding: '12px 24px',
      backgroundColor: '#007cba',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer'
    },
    secondary: {
      padding: '12px 24px',
      backgroundColor: 'transparent',
      color: '#6b7280',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer'
    }
  };

  return (
    <>
      {/* Share Cart Modal */}
      <Dialog.Root open={showShareModal} onOpenChange={onCloseShareModal}>
        <Dialog.Portal>
          <Dialog.Overlay style={modalStyles.overlay}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              style={modalStyles.content}
            >
              <div style={modalStyles.header}>
                <Dialog.Title style={{ margin: 0, fontSize: '20px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Share2 size={20} />
                  Share Your Cart
                </Dialog.Title>
                <p style={{ margin: '8px 0 0 0', color: '#6b7280' }}>
                  Create a shareable link for your cart
                </p>
              </div>

              {loading ? (
                <div style={{ ...modalStyles.body, textAlign: 'center' }}>
                  <div style={{ marginBottom: '16px' }}>Loading cart...</div>
                </div>
              ) : shareResult ? (
                <div style={modalStyles.body}>
                  <div style={{
                    background: '#d1fae5',
                    border: '1px solid #a7f3d0',
                    borderRadius: '8px',
                    padding: '16px',
                    marginBottom: '20px'
                  }}>
                    <h4 style={{ margin: '0 0 12px 0', color: '#065f46', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckCircle size={18} />
                      Cart Shared Successfully!
                    </h4>
                    <p style={{ margin: '0 0 16px 0', color: '#065f46' }}>
                      Your cart has been shared. Anyone with this link can view and add these items to their cart.
                    </p>
                    
                    <div style={{ marginBottom: '16px' }}>
                      <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#065f46' }}>
                        Share Link:
                      </label>
                      <input
                        type="text"
                        value={shareResult.share_url}
                        readOnly
                        style={{
                          ...inputStyles,
                          marginBottom: '12px',
                          width: '100%',
                          backgroundColor: '#f3f4f6'
                        }}
                      />
                      <button
                        onClick={() => copyToClipboard(shareResult.share_url)}
                        style={{
                          ...buttonStyles.primary,
                          padding: '12px 16px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <Copy size={16} />
                        Copy
                      </button>
                    </div>

                    <div style={{ fontSize: '14px', color: '#047857' }}>
                      <div><strong>Cart ID:</strong> {shareResult.hash}</div>
                      <div><strong>Items:</strong> {shareResult.cart_items}</div>
                      <div><strong>Total:</strong> {shareResult.cart_total}</div>
                      <div><strong>Expires:</strong> {new Date(shareResult.expires_at).toLocaleDateString()}</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div style={modalStyles.body}>
                  {cart && (
                    <div style={{
                      background: '#f9fafb',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      padding: '16px',
                      marginBottom: '20px'
                    }}>
                      <h4 style={{ margin: '0 0 12px 0' }}>Cart Summary</h4>
                      <div style={{ fontSize: '14px', color: '#6b7280' }}>
                        <div><strong>Items:</strong> {cart.items_count}</div>
                        <div><strong>Total:</strong> {cart.total_with_tax}</div>
                      </div>
                    </div>
                  )}

                  <div>
                    <input
                      type="text"
                      placeholder="Your name (optional)"
                      value={shareData.customer_name}
                      onChange={(e) => setShareData({...shareData, customer_name: e.target.value})}
                      style={inputStyles}
                    />
                    
                    <input
                      type="email"
                      placeholder="Your email (optional)"
                      value={shareData.customer_email}
                      onChange={(e) => setShareData({...shareData, customer_email: e.target.value})}
                      style={inputStyles}
                    />
                    
                    <input
                      type="tel"
                      placeholder="Your phone (optional)"
                      value={shareData.customer_phone}
                      onChange={(e) => setShareData({...shareData, customer_phone: e.target.value})}
                      style={inputStyles}
                    />
                    
                    <div style={{ marginBottom: '16px' }}>
                      <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px' }}>
                        Link expires in:
                      </label>
                      <select
                        value={shareData.expires_hours}
                        onChange={(e) => setShareData({...shareData, expires_hours: parseInt(e.target.value)})}
                        style={inputStyles}
                      >
                        <option value={24}>24 hours</option>
                        <option value={72}>3 days</option>
                        <option value={168}>1 week</option>
                        <option value={720}>1 month</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              <div style={modalStyles.footer}>
                <button
                  onClick={onCloseShareModal}
                  style={buttonStyles.secondary}
                >
                  {shareResult ? 'Close' : 'Cancel'}
                </button>
                
                {!shareResult && (
                  <button
                    type="button"
                    onClick={(e) => { e.preventDefault(); handleShareCart(); }}
                    disabled={shareLoading || !cart || cart.is_empty}
                    style={{
                      ...buttonStyles.primary,
                      backgroundColor: shareLoading ? '#9ca3af' : '#007cba',
                      cursor: shareLoading ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {shareLoading ? 'Creating Link...' : 'Create Share Link'}
                  </button>
                )}
              </div>
            </motion.div>
          </Dialog.Overlay>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Quote Request Modal */}
      <Dialog.Root open={showQuoteModal} onOpenChange={onCloseQuoteModal}>
        <Dialog.Portal>
          <Dialog.Overlay style={modalStyles.overlay}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              style={modalStyles.content}
            >
              <div style={modalStyles.header}>
                <Dialog.Title style={{ margin: 0, fontSize: '20px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MessageCircle size={20} />
                  Request a Quote
                </Dialog.Title>
                <p style={{ margin: '8px 0 0 0', color: '#6b7280' }}>
                  Get custom pricing for your cart items
                </p>
              </div>

              {loading ? (
                <div style={{ ...modalStyles.body, textAlign: 'center' }}>
                  <div style={{ marginBottom: '16px' }}>Loading cart...</div>
                </div>
              ) : quoteResult ? (
                <div style={modalStyles.body}>
                  <div style={{
                    background: '#dbeafe',
                    border: '1px solid #93c5fd',
                    borderRadius: '8px',
                    padding: '16px',
                    marginBottom: '20px'
                  }}>
                    <h4 style={{ margin: '0 0 12px 0', color: '#1e40af', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckCircle size={18} />
                      Quote Generated Successfully!
                    </h4>
                    <p style={{ margin: '0 0 16px 0', color: '#1e40af' }}>
                      Your quote has been created and is ready to share. Use the buttons below to view or share your quote.
                    </p>
                    
                    <div style={{ marginBottom: '16px' }}>
                      <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#1e40af' }}>
                        Quote Link:
                      </label>
                      <input
                        type="text"
                        value={quoteResult.quote_url}
                        readOnly
                        style={{
                          ...inputStyles,
                          marginBottom: '12px',
                          width: '100%',
                          backgroundColor: '#f3f4f6'
                        }}
                      />
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-start' }}>
                        <button
                          onClick={() => copyToClipboard(quoteResult.quote_url)}
                          style={{
                            ...buttonStyles.primary,
                            padding: '12px 16px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}
                        >
                          <Copy size={16} />
                          Copy
                        </button>
                        <button
                          onClick={() => window.open(quoteResult.quote_url, '_blank')}
                          style={{
                            ...buttonStyles.secondary,
                            padding: '12px 16px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}
                        >
                          <ExternalLink size={16} />
                          View Quote
                        </button>
                      </div>
                    </div>
                    
                    <div style={{ fontSize: '14px', color: '#1d4ed8' }}>
                      <div><strong>Quote ID:</strong> #{quoteResult.quote_id}</div>
                      <div><strong>Customer:</strong> {quoteResult.customer_name}</div>
                      <div><strong>Items:</strong> {quoteResult.cart_items}</div>
                      <div><strong>Estimated Total:</strong> {quoteResult.cart_total}</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div style={modalStyles.body}>
                  {cart && (
                    <div style={{
                      background: '#f9fafb',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      padding: '16px',
                      marginBottom: '20px'
                    }}>
                      <h4 style={{ margin: '0 0 12px 0' }}>Cart Summary</h4>
                      <div style={{ fontSize: '14px', color: '#6b7280' }}>
                        <div><strong>Items:</strong> {cart.items_count}</div>
                        <div><strong>Current Total:</strong> {cart.total_with_tax}</div>
                      </div>
                    </div>
                  )}

                  <div>
                    <input
                      type="text"
                      placeholder="Your name *"
                      value={quoteData.customer_name}
                      onChange={(e) => setQuoteData({...quoteData, customer_name: e.target.value})}
                      style={inputStyles}
                      required
                    />
                    
                    <input
                      type="email"
                      placeholder="Your email *"
                      value={quoteData.customer_email}
                      onChange={(e) => setQuoteData({...quoteData, customer_email: e.target.value})}
                      style={inputStyles}
                      required
                    />
                    
                    <input
                      type="tel"
                      placeholder="Your phone (optional)"
                      value={quoteData.customer_phone}
                      onChange={(e) => setQuoteData({...quoteData, customer_phone: e.target.value})}
                      style={inputStyles}
                    />
                    
                    <textarea
                      placeholder="Additional message or requirements (optional)"
                      value={quoteData.message}
                      onChange={(e) => setQuoteData({...quoteData, message: e.target.value})}
                      rows={4}
                      style={{
                        ...inputStyles,
                        resize: 'vertical'
                      }}
                    />
                  </div>
                </div>
              )}

              <div style={modalStyles.footer}>
                <button
                  onClick={onCloseQuoteModal}
                  style={buttonStyles.secondary}
                >
                  {quoteResult ? 'Close' : 'Cancel'}
                </button>
                
                {!quoteResult && (
                  <button
                    type="button"
                    onClick={(e) => { e.preventDefault(); handleCreateQuote(); }}
                    disabled={quoteLoading || !cart || cart.is_empty || !quoteData.customer_name || !quoteData.customer_email}
                    style={{
                      ...buttonStyles.primary,
                      backgroundColor: quoteLoading ? '#9ca3af' : '#00a32a',
                      cursor: quoteLoading || !quoteData.customer_name || !quoteData.customer_email ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {quoteLoading ? 'Submitting...' : 'Request Quote'}
                  </button>
                )}
              </div>
            </motion.div>
          </Dialog.Overlay>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}