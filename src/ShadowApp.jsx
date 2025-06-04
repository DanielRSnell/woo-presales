import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ShadowStyles } from './ShadowStyles';
import { CommandPalette } from './components/CommandPalette';
import { TriggerButton } from './components/TriggerButton';
import { SharedCartView } from './components/SharedCartView';
import { QuoteView } from './components/QuoteView';
import { CartActionsModal } from './components/CartActionsModal';
import { CheckCircle, User, Globe, ShoppingCart, Shield, Building, Loader2, AlertCircle } from 'lucide-react';

export function ShadowApp(props = {}) {
  // Extract props for different page types
  const { 
    restNonce = '', 
    pageType = 'default',
    cartHash = '',
    quoteId = '',
    currentUrl = '',
    cartData = ''
  } = props;
  
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [userData, setUserData] = useState(null);
  const [siteData, setSiteData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  // Fetch data from API (only for admin/default page type)
  useEffect(() => {
    if (pageType !== 'default') {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      if (!restNonce) {
        setError('No REST nonce provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // Fetch user and site data in parallel
        const [userResponse, siteResponse] = await Promise.all([
          fetch('/wp-json/wc-cart-share-quote/v1/user', {
            headers: {
              'X-WP-Nonce': restNonce
            }
          }),
          fetch('/wp-json/wc-cart-share-quote/v1/site', {
            headers: {
              'X-WP-Nonce': restNonce
            }
          })
        ]);

        if (!userResponse.ok || !siteResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const userData = await userResponse.json();
        const siteData = await siteResponse.json();

        if (userData.success && siteData.success) {
          setUserData(userData.data);
          setSiteData(siteData.data);
        } else {
          throw new Error('API returned error');
        }
      } catch (err) {
        setError(err.message);
        console.error('WC Cart Share Quote API Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [restNonce, pageType]);

  // Generate admin demo commands based on fetched data (only for admin)
  const commands = React.useMemo(() => {
    if (pageType !== 'default' || !userData || !siteData) return [];

    return [
      {
        id: 'working',
        title: 'WooCommerce Cart Share & Quote Working!',
        description: 'Plugin successfully integrated with WordPress and WooCommerce',
        icon: <CheckCircle size={16} />
      },
      {
        id: 'user',
        title: `User: ${userData.userName} (${userData.userRole})`,
        description: `ID: ${userData.userId}, Admin: ${userData.isAdmin ? 'Yes' : 'No'}, Email: ${userData.userEmail}`,
        icon: <User size={16} />
      },
      {
        id: 'site',
        title: `Site: ${siteData.siteName}`,
        description: `${siteData.siteDescription} - WordPress ${siteData.wordpressVersion}`,
        icon: <Globe size={16} />
      },
      {
        id: 'woocommerce',
        title: 'WooCommerce Integration Active',
        description: 'Cart sharing and quote functionality enabled',
        icon: <ShoppingCart size={16} />
      },
      {
        id: 'security',
        title: 'Security Features Enabled',
        description: 'Rate limiting, HPOS compatibility, and data validation active',
        icon: <Shield size={16} />
      },
      {
        id: 'architecture',
        title: 'Modern Plugin Architecture',
        description: `v${siteData.pluginVersion} - React + Shadow DOM + REST API`,
        icon: <Building size={16} />
      }
    ];
  }, [userData, siteData, pageType]);

  const filteredCommands = commands.filter(command =>
    command.title.toLowerCase().includes(query.toLowerCase()) ||
    command.description.toLowerCase().includes(query.toLowerCase())
  );

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Auto-open on mount to show it's working (only for admin settings page)
  useEffect(() => {
    if (pageType === 'default') {
      // Only auto-open in admin settings, not on frontend
      const isAdmin = window.location.pathname.includes('/wp-admin/');
      if (isAdmin) {
        const timer = setTimeout(() => setIsOpen(true), 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [pageType]);
  
  // Expose modal functions globally for WooCommerce integration
  useEffect(() => {
    if (pageType === 'cart-actions') {
      window.WCCartShareQuote = {
        openShareModal: () => setShowShareModal(true),
        openQuoteModal: () => setShowQuoteModal(true)
      };
      
      return () => {
        delete window.WCCartShareQuote;
      };
    }
  }, [pageType]);

  // Event handlers
  const handleCommandClick = (command) => {
    console.log(`Clicked: ${command.title}`);
    // Add your command handling logic here
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };
  
  // Render different interfaces based on page type
  const renderPageContent = () => {
    switch (pageType) {
      case 'shared-cart':
        return (
          <SharedCartView 
            cartHash={cartHash}
            restNonce={restNonce}
          />
        );
        
      case 'quote':
        return (
          <QuoteView 
            quoteId={quoteId}
            restNonce={restNonce}
          />
        );
        
      case 'cart-actions':
        return (
          <CartActionsModal
            restNonce={restNonce}
            currentUrl={currentUrl}
            showShareModal={showShareModal}
            showQuoteModal={showQuoteModal}
            onCloseShareModal={() => setShowShareModal(false)}
            onCloseQuoteModal={() => setShowQuoteModal(false)}
            cartData={cartData}
          />
        );
        
      default:
        return null;
    }
  };

  // Show loading or error states (only for admin/default mode)
  if (pageType === 'default' && loading) {
    const loadingCommands = [{
      id: 'loading',
      title: 'Loading plugin status...',
      description: 'Fetching user and site information via REST API',
      icon: <Loader2 size={16} className="animate-spin" />
    }];

    return (
      <>
        <ShadowStyles />
        <AnimatePresence>
          {isOpen && (
            <CommandPalette
              query={query}
              setQuery={setQuery}
              filteredCommands={loadingCommands}
              onCommandClick={handleCommandClick}
              onClose={handleClose}
            />
          )}
        </AnimatePresence>
        {!isOpen && (
          <TriggerButton onClick={handleOpen} />
        )}
      </>
    );
  }

  if (pageType === 'default' && error) {
    const errorCommands = [{
      id: 'error',
      title: 'API Error: ' + error,
      description: 'Check console for details. Make sure you are logged in.',
      icon: <AlertCircle size={16} />
    }];

    return (
      <>
        <ShadowStyles />
        <AnimatePresence>
          {isOpen && (
            <CommandPalette
              query={query}
              setQuery={setQuery}
              filteredCommands={errorCommands}
              onCommandClick={handleCommandClick}
              onClose={handleClose}
            />
          )}
        </AnimatePresence>
        {!isOpen && (
          <TriggerButton onClick={handleOpen} />
        )}
      </>
    );
  }

  // If we have a specific page type, render that content
  if (pageType && pageType !== 'default') {
    return (
      <>
        <ShadowStyles />
        {renderPageContent()}
      </>
    );
  }

  // Default admin interface with command palette
  return (
    <>
      <ShadowStyles />
      
      <AnimatePresence>
        {isOpen && (
          <CommandPalette
            query={query}
            setQuery={setQuery}
            filteredCommands={filteredCommands}
            onCommandClick={handleCommandClick}
            onClose={handleClose}
          />
        )}
      </AnimatePresence>

      {/* Floating trigger button (only show in admin) */}
      {!isOpen && (
        <TriggerButton onClick={handleOpen} />
      )}
    </>
  );
}