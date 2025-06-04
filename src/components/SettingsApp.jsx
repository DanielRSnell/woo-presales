import React, { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Tabs from '@radix-ui/react-tabs';
import * as Switch from '@radix-ui/react-switch';

// Settings App Component for WordPress Admin
export function SettingsApp({ restNonce }) {
  const [settings, setSettings] = useState({
    general: {
      store_name: '',
      store_address: '',
      contact_email: '',
      contact_name: '',
      support_phone: '',
      store_logo: '',
      store_website: '',
      store_description: '',
      enable_share_cart: true,
      enable_quote_request: true,
      default_expiry_days: 30,
      require_login_for_quotes: false,
      email_notifications: true
    },
    design: {
      primary_color: '#007cba',
      secondary_color: '#00a32a',
      button_style: 'rounded',
      button_size: 'medium',
      font_family: 'system',
      border_radius: 6,
      custom_css: ''
    },
    form_fields: {
      share_form: [
        { name: 'customer_email', label: 'Email Address', type: 'email', required: true, enabled: true },
        { name: 'customer_name', label: 'Your Name', type: 'text', required: false, enabled: true },
        { name: 'recipient_email', label: 'Recipient Email', type: 'email', required: true, enabled: true },
        { name: 'personal_message', label: 'Personal Message', type: 'textarea', required: false, enabled: true }
      ],
      quote_form: [
        { name: 'customer_name', label: 'Full Name', type: 'text', required: true, enabled: true },
        { name: 'customer_email', label: 'Email Address', type: 'email', required: true, enabled: true },
        { name: 'customer_phone', label: 'Phone Number', type: 'tel', required: false, enabled: true },
        { name: 'company_name', label: 'Company Name', type: 'text', required: false, enabled: true },
        { name: 'quote_notes', label: 'Special Requirements', type: 'textarea', required: false, enabled: true }
      ]
    }
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  // Load settings on mount
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const response = await fetch('/wp-json/woo-presales/v1/settings', {
        headers: {
          'X-WP-Nonce': restNonce
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setSettings(prev => ({ ...prev, ...data }));
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    try {
      setSaving(true);
      const response = await fetch('/wp-json/woo-presales/v1/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-WP-Nonce': restNonce
        },
        body: JSON.stringify(settings)
      });

      if (response.ok) {
        setMessage('Settings saved successfully!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        throw new Error('Failed to save settings');
      }
    } catch (error) {
      setMessage('Error saving settings. Please try again.');
      console.error('Save error:', error);
    } finally {
      setSaving(false);
    }
  };

  const updateSetting = (section, key, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const updateFormField = (formType, fieldIndex, updates) => {
    setSettings(prev => ({
      ...prev,
      form_fields: {
        ...prev.form_fields,
        [formType]: prev.form_fields[formType].map((field, index) =>
          index === fieldIndex ? { ...field, ...updates } : field
        )
      }
    }));
  };

  // Helper function for font family preview
  const getFontFamilyForPreview = (family) => {
    const families = {
      'system': '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      'arial': 'Arial, sans-serif',
      'helvetica': 'Helvetica, Arial, sans-serif',
      'georgia': 'Georgia, serif',
      'times': '"Times New Roman", Times, serif'
    };
    return families[family] || families['system'];
  };

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <div style={{ width: '32px', height: '32px', border: '3px solid #f3f3f3', borderTop: '3px solid #007cba', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 20px' }}></div>
        <p>Loading settings...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0', padding: '0' }}>
      {message && (
        <div style={{
          background: message.includes('Error') ? '#d63638' : '#00a32a',
          color: 'white',
          padding: '12px 20px',
          borderRadius: '4px',
          marginBottom: '20px'
        }}>
          {message}
        </div>
      )}

      <Tabs.Root defaultValue="general" style={{ width: '100%' }}>
        <Tabs.List style={{
          display: 'flex',
          borderBottom: '1px solid #ddd',
          background: 'white',
          padding: '0 20px'
        }}>
          <Tabs.Trigger value="general" style={{
            padding: '16px 24px',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            borderBottom: '2px solid transparent',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            General Settings
          </Tabs.Trigger>
          <Tabs.Trigger value="design" style={{
            padding: '16px 24px',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            borderBottom: '2px solid transparent',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            Design & Styling
          </Tabs.Trigger>
          <Tabs.Trigger value="form-fields" style={{
            padding: '16px 24px',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            borderBottom: '2px solid transparent',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            Form Fields
          </Tabs.Trigger>
        </Tabs.List>

        {/* General Settings Tab */}
        <Tabs.Content value="general" style={{ padding: '30px', background: 'white' }}>
          <h3 style={{ marginTop: '0', color: '#1d2327', fontSize: '20px' }}>General Settings</h3>
          
          <div style={{ display: 'grid', gap: '32px', maxWidth: '800px' }}>
            
            {/* Store Information Section */}
            <div>
              <h4 style={{ margin: '0 0 16px 0', color: '#1d2327', fontSize: '16px', fontWeight: '600' }}>Store Information</h4>
              <div style={{ display: 'grid', gap: '20px' }}>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#1d2327' }}>
                      Store Name *
                    </label>
                    <input
                      type="text"
                      value={settings.general.store_name}
                      onChange={(e) => updateSetting('general', 'store_name', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        border: '1px solid #8c8f94',
                        borderRadius: '4px',
                        fontSize: '14px'
                      }}
                      placeholder="Your Store Name"
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#1d2327' }}>
                      Store Website
                    </label>
                    <input
                      type="url"
                      value={settings.general.store_website}
                      onChange={(e) => updateSetting('general', 'store_website', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        border: '1px solid #8c8f94',
                        borderRadius: '4px',
                        fontSize: '14px'
                      }}
                      placeholder="https://yourstore.com"
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#1d2327' }}>
                    Store Address
                  </label>
                  <textarea
                    value={settings.general.store_address}
                    onChange={(e) => updateSetting('general', 'store_address', e.target.value)}
                    rows={3}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #8c8f94',
                      borderRadius: '4px',
                      fontSize: '14px',
                      resize: 'vertical'
                    }}
                    placeholder="123 Main Street&#10;City, State 12345&#10;Country"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#1d2327' }}>
                      Contact Name
                    </label>
                    <input
                      type="text"
                      value={settings.general.contact_name}
                      onChange={(e) => updateSetting('general', 'contact_name', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        border: '1px solid #8c8f94',
                        borderRadius: '4px',
                        fontSize: '14px'
                      }}
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#1d2327' }}>
                      Contact Email *
                    </label>
                    <input
                      type="email"
                      value={settings.general.contact_email}
                      onChange={(e) => updateSetting('general', 'contact_email', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        border: '1px solid #8c8f94',
                        borderRadius: '4px',
                        fontSize: '14px'
                      }}
                      placeholder="contact@yourstore.com"
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#1d2327' }}>
                      Support Phone
                    </label>
                    <input
                      type="tel"
                      value={settings.general.support_phone}
                      onChange={(e) => updateSetting('general', 'support_phone', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        border: '1px solid #8c8f94',
                        borderRadius: '4px',
                        fontSize: '14px'
                      }}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#1d2327' }}>
                    Store Logo URL
                  </label>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <input
                      type="url"
                      value={settings.general.store_logo}
                      onChange={(e) => updateSetting('general', 'store_logo', e.target.value)}
                      style={{
                        flex: 1,
                        padding: '8px 12px',
                        border: '1px solid #8c8f94',
                        borderRadius: '4px',
                        fontSize: '14px'
                      }}
                      placeholder="https://yourstore.com/logo.png"
                    />
                    {settings.general.store_logo && (
                      <img 
                        src={settings.general.store_logo} 
                        alt="Store Logo Preview"
                        style={{ width: '40px', height: '40px', objectFit: 'contain', border: '1px solid #ddd', borderRadius: '4px' }}
                        onError={(e) => e.target.style.display = 'none'}
                      />
                    )}
                  </div>
                  <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#646970' }}>
                    URL to your store logo (displayed on shared carts and quotes)
                  </p>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#1d2327' }}>
                    Store Description
                  </label>
                  <textarea
                    value={settings.general.store_description}
                    onChange={(e) => updateSetting('general', 'store_description', e.target.value)}
                    rows={3}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #8c8f94',
                      borderRadius: '4px',
                      fontSize: '14px',
                      resize: 'vertical'
                    }}
                    placeholder="Brief description of your store and what you offer..."
                  />
                </div>
              </div>
            </div>

            {/* Feature Settings Section */}
            <div>
              <h4 style={{ margin: '0 0 16px 0', color: '#1d2327', fontSize: '16px', fontWeight: '600' }}>Feature Settings</h4>
              <div style={{ display: 'grid', gap: '20px' }}>
                
                <div style={{ display: 'flex', gap: '30px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Switch.Root
                      checked={settings.general.enable_share_cart}
                      onCheckedChange={(checked) => updateSetting('general', 'enable_share_cart', checked)}
                      style={{
                        width: '42px',
                        height: '24px',
                        background: settings.general.enable_share_cart ? '#007cba' : '#ddd',
                        borderRadius: '12px',
                        position: 'relative',
                        cursor: 'pointer',
                        border: 'none'
                      }}
                    >
                      <Switch.Thumb style={{
                        display: 'block',
                        width: '20px',
                        height: '20px',
                        background: 'white',
                        borderRadius: '10px',
                        transform: settings.general.enable_share_cart ? 'translateX(20px)' : 'translateX(2px)',
                        transition: 'transform 100ms',
                        position: 'absolute',
                        top: '2px'
                      }} />
                    </Switch.Root>
                    <label style={{ fontWeight: '600', color: '#1d2327' }}>Enable Cart Sharing</label>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Switch.Root
                      checked={settings.general.enable_quote_request}
                      onCheckedChange={(checked) => updateSetting('general', 'enable_quote_request', checked)}
                      style={{
                        width: '42px',
                        height: '24px',
                        background: settings.general.enable_quote_request ? '#007cba' : '#ddd',
                        borderRadius: '12px',
                        position: 'relative',
                        cursor: 'pointer',
                        border: 'none'
                      }}
                    >
                      <Switch.Thumb style={{
                        display: 'block',
                        width: '20px',
                        height: '20px',
                        background: 'white',
                        borderRadius: '10px',
                        transform: settings.general.enable_quote_request ? 'translateX(20px)' : 'translateX(2px)',
                        transition: 'transform 100ms',
                        position: 'absolute',
                        top: '2px'
                      }} />
                    </Switch.Root>
                    <label style={{ fontWeight: '600', color: '#1d2327' }}>Enable Quote Requests</label>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '30px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Switch.Root
                      checked={settings.general.require_login_for_quotes}
                      onCheckedChange={(checked) => updateSetting('general', 'require_login_for_quotes', checked)}
                      style={{
                        width: '42px',
                        height: '24px',
                        background: settings.general.require_login_for_quotes ? '#007cba' : '#ddd',
                        borderRadius: '12px',
                        position: 'relative',
                        cursor: 'pointer',
                        border: 'none'
                      }}
                    >
                      <Switch.Thumb style={{
                        display: 'block',
                        width: '20px',
                        height: '20px',
                        background: 'white',
                        borderRadius: '10px',
                        transform: settings.general.require_login_for_quotes ? 'translateX(20px)' : 'translateX(2px)',
                        transition: 'transform 100ms',
                        position: 'absolute',
                        top: '2px'
                      }} />
                    </Switch.Root>
                    <label style={{ fontWeight: '600', color: '#1d2327' }}>Require Login for Quotes</label>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Switch.Root
                      checked={settings.general.email_notifications}
                      onCheckedChange={(checked) => updateSetting('general', 'email_notifications', checked)}
                      style={{
                        width: '42px',
                        height: '24px',
                        background: settings.general.email_notifications ? '#007cba' : '#ddd',
                        borderRadius: '12px',
                        position: 'relative',
                        cursor: 'pointer',
                        border: 'none'
                      }}
                    >
                      <Switch.Thumb style={{
                        display: 'block',
                        width: '20px',
                        height: '20px',
                        background: 'white',
                        borderRadius: '10px',
                        transform: settings.general.email_notifications ? 'translateX(20px)' : 'translateX(2px)',
                        transition: 'transform 100ms',
                        position: 'absolute',
                        top: '2px'
                      }} />
                    </Switch.Root>
                    <label style={{ fontWeight: '600', color: '#1d2327' }}>Send Email Notifications</label>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '20px', alignItems: 'center' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#1d2327' }}>
                      Default Link Expiry
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="number"
                        value={settings.general.default_expiry_days}
                        onChange={(e) => updateSetting('general', 'default_expiry_days', parseInt(e.target.value) || 30)}
                        min="1"
                        max="365"
                        style={{
                          width: '80px',
                          padding: '8px 12px',
                          border: '1px solid #8c8f94',
                          borderRadius: '4px',
                          fontSize: '14px'
                        }}
                      />
                      <span style={{ fontSize: '14px', color: '#646970' }}>days</span>
                    </div>
                  </div>
                  <p style={{ margin: '0', fontSize: '12px', color: '#646970' }}>
                    How long shared cart and quote links remain valid before expiring
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Tabs.Content>

        {/* Design Settings Tab */}
        <Tabs.Content value="design" style={{ padding: '30px', background: 'white' }}>
          <h3 style={{ marginTop: '0', color: '#1d2327', fontSize: '20px' }}>Design & Styling</h3>
          
          <div style={{ display: 'grid', gap: '32px', maxWidth: '1000px' }}>
            
            {/* Preview Section */}
            <div>
              <h4 style={{ margin: '0 0 16px 0', color: '#1d2327', fontSize: '16px', fontWeight: '600' }}>Preview</h4>
              <div style={{
                padding: '24px',
                background: '#f8f9fa',
                borderRadius: '8px',
                border: '1px solid #e1e5e9'
              }}>
                <p style={{ margin: '0 0 16px 0', color: '#646970', fontSize: '14px' }}>
                  This is how your presales buttons will appear on your site:
                </p>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <button
                    style={{
                      background: settings.design.primary_color,
                      color: 'white',
                      border: 'none',
                      borderRadius: settings.design.button_style === 'square' ? '0px' : 
                                   settings.design.button_style === 'pill' ? '50px' : '6px',
                      padding: settings.design.button_size === 'small' ? '8px 16px' :
                               settings.design.button_size === 'large' ? '16px 32px' : '12px 24px',
                      fontSize: settings.design.button_size === 'small' ? '12px' :
                               settings.design.button_size === 'large' ? '16px' : '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      fontFamily: getFontFamilyForPreview(settings.design.font_family)
                    }}
                  >
                    🛒 Share Cart
                  </button>
                  <button
                    style={{
                      background: settings.design.secondary_color,
                      color: 'white',
                      border: 'none',
                      borderRadius: settings.design.button_style === 'square' ? '0px' : 
                                   settings.design.button_style === 'pill' ? '50px' : '6px',
                      padding: settings.design.button_size === 'small' ? '8px 16px' :
                               settings.design.button_size === 'large' ? '16px 32px' : '12px 24px',
                      fontSize: settings.design.button_size === 'small' ? '12px' :
                               settings.design.button_size === 'large' ? '16px' : '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      fontFamily: getFontFamilyForPreview(settings.design.font_family)
                    }}
                  >
                    💬 Request Quote
                  </button>
                </div>
              </div>
            </div>
            <div style={{ display: 'grid', gap: '20px' }}>
              <h4 style={{ margin: '0 0 16px 0', color: '#1d2327', fontSize: '16px', fontWeight: '600' }}>Color Settings</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#1d2327' }}>
                    Primary Color
                </label>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <input
                    type="color"
                    value={settings.design.primary_color}
                    onChange={(e) => updateSetting('design', 'primary_color', e.target.value)}
                    style={{ width: '50px', height: '36px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                  />
                  <input
                    type="text"
                    value={settings.design.primary_color}
                    onChange={(e) => updateSetting('design', 'primary_color', e.target.value)}
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      border: '1px solid #8c8f94',
                      borderRadius: '4px',
                      fontSize: '14px'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#1d2327' }}>
                  Secondary Color
                </label>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <input
                    type="color"
                    value={settings.design.secondary_color}
                    onChange={(e) => updateSetting('design', 'secondary_color', e.target.value)}
                    style={{ width: '50px', height: '36px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                  />
                  <input
                    type="text"
                    value={settings.design.secondary_color}
                    onChange={(e) => updateSetting('design', 'secondary_color', e.target.value)}
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      border: '1px solid #8c8f94',
                      borderRadius: '4px',
                      fontSize: '14px'
                    }}
                  />
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gap: '20px' }}>
              <h4 style={{ margin: '0 0 16px 0', color: '#1d2327', fontSize: '16px', fontWeight: '600' }}>Button Settings</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#1d2327' }}>
                    Button Style
                  </label>
                <select
                  value={settings.design.button_style}
                  onChange={(e) => updateSetting('design', 'button_style', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #8c8f94',
                    borderRadius: '4px',
                    fontSize: '14px',
                    background: 'white'
                  }}
                >
                  <option value="rounded">Rounded Corners</option>
                  <option value="square">Square</option>
                  <option value="pill">Pill Shape</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#1d2327' }}>
                  Button Size
                </label>
                <select
                  value={settings.design.button_size}
                  onChange={(e) => updateSetting('design', 'button_size', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #8c8f94',
                    borderRadius: '4px',
                    fontSize: '14px',
                    background: 'white'
                  }}
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
            </div>

            </div>

            <div style={{ display: 'grid', gap: '20px' }}>
              <h4 style={{ margin: '0 0 16px 0', color: '#1d2327', fontSize: '16px', fontWeight: '600' }}>Typography & Layout</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#1d2327' }}>
                    Font Family
                  </label>
                <select
                  value={settings.design.font_family}
                  onChange={(e) => updateSetting('design', 'font_family', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #8c8f94',
                    borderRadius: '4px',
                    fontSize: '14px',
                    background: 'white'
                  }}
                >
                  <option value="system">System Default</option>
                  <option value="arial">Arial</option>
                  <option value="helvetica">Helvetica</option>
                  <option value="georgia">Georgia</option>
                  <option value="times">Times New Roman</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#1d2327' }}>
                  Border Radius
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="range"
                    min="0"
                    max="25"
                    value={settings.design.border_radius}
                    onChange={(e) => updateSetting('design', 'border_radius', parseInt(e.target.value))}
                    style={{ flex: 1 }}
                  />
                  <span style={{ 
                    fontSize: '14px', 
                    color: '#646970',
                    minWidth: '40px',
                    textAlign: 'right'
                  }}>
                    {settings.design.border_radius}px
                  </span>
                </div>
              </div>
            </div>

            </div>

            <div style={{ display: 'grid', gap: '20px' }}>
              <h4 style={{ margin: '0 0 16px 0', color: '#1d2327', fontSize: '16px', fontWeight: '600' }}>Advanced Customization</h4>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#1d2327' }}>
                  Custom CSS
                </label>
              <textarea
                value={settings.design.custom_css}
                onChange={(e) => updateSetting('design', 'custom_css', e.target.value)}
                rows={6}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #8c8f94',
                  borderRadius: '4px',
                  fontSize: '13px',
                  fontFamily: 'Monaco, Consolas, monospace',
                  resize: 'vertical'
                }}
                placeholder="/* Add custom CSS here */&#10;.woo-presales-button {&#10;  /* Custom button styles */&#10;}"
              />
              <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#646970' }}>
                Custom CSS will be applied to all presales components
              </p>
            </div>
            </div>
          </div>
        </Tabs.Content>

        {/* Form Fields Tab */}
        <Tabs.Content value="form-fields" style={{ padding: '30px', background: 'white' }}>
          <h3 style={{ marginTop: '0', color: '#1d2327', fontSize: '20px' }}>Form Field Management</h3>
          
          <div style={{ display: 'grid', gap: '32px' }}>
            {/* Share Form Fields */}
            <div>
              <h4 style={{ margin: '0 0 16px 0', color: '#1d2327' }}>Share Cart Form Fields</h4>
              <div style={{ display: 'grid', gap: '12px' }}>
                {settings.form_fields.share_form.map((field, index) => (
                  <div key={index} style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 200px 120px 80px 60px',
                    gap: '12px',
                    alignItems: 'center',
                    padding: '12px',
                    background: '#f9f9f9',
                    borderRadius: '4px'
                  }}>
                    <input
                      type="text"
                      value={field.label}
                      onChange={(e) => updateFormField('share_form', index, { label: e.target.value })}
                      style={{
                        padding: '6px 8px',
                        border: '1px solid #8c8f94',
                        borderRadius: '4px',
                        fontSize: '14px'
                      }}
                    />
                    <select
                      value={field.type}
                      onChange={(e) => updateFormField('share_form', index, { type: e.target.value })}
                      style={{
                        padding: '6px 8px',
                        border: '1px solid #8c8f94',
                        borderRadius: '4px',
                        fontSize: '14px'
                      }}
                    >
                      <option value="text">Text</option>
                      <option value="email">Email</option>
                      <option value="tel">Phone</option>
                      <option value="textarea">Textarea</option>
                    </select>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="checkbox"
                        checked={field.required}
                        onChange={(e) => updateFormField('share_form', index, { required: e.target.checked })}
                        style={{ width: '16px', height: '16px' }}
                      />
                      <span style={{ fontSize: '14px' }}>Required</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="checkbox"
                        checked={field.enabled}
                        onChange={(e) => updateFormField('share_form', index, { enabled: e.target.checked })}
                        style={{ width: '16px', height: '16px' }}
                      />
                      <span style={{ fontSize: '14px' }}>Enabled</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quote Form Fields */}
            <div>
              <h4 style={{ margin: '0 0 16px 0', color: '#1d2327' }}>Quote Request Form Fields</h4>
              <div style={{ display: 'grid', gap: '12px' }}>
                {settings.form_fields.quote_form.map((field, index) => (
                  <div key={index} style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 200px 120px 80px 60px',
                    gap: '12px',
                    alignItems: 'center',
                    padding: '12px',
                    background: '#f9f9f9',
                    borderRadius: '4px'
                  }}>
                    <input
                      type="text"
                      value={field.label}
                      onChange={(e) => updateFormField('quote_form', index, { label: e.target.value })}
                      style={{
                        padding: '6px 8px',
                        border: '1px solid #8c8f94',
                        borderRadius: '4px',
                        fontSize: '14px'
                      }}
                    />
                    <select
                      value={field.type}
                      onChange={(e) => updateFormField('quote_form', index, { type: e.target.value })}
                      style={{
                        padding: '6px 8px',
                        border: '1px solid #8c8f94',
                        borderRadius: '4px',
                        fontSize: '14px'
                      }}
                    >
                      <option value="text">Text</option>
                      <option value="email">Email</option>
                      <option value="tel">Phone</option>
                      <option value="textarea">Textarea</option>
                    </select>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="checkbox"
                        checked={field.required}
                        onChange={(e) => updateFormField('quote_form', index, { required: e.target.checked })}
                        style={{ width: '16px', height: '16px' }}
                      />
                      <span style={{ fontSize: '14px' }}>Required</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="checkbox"
                        checked={field.enabled}
                        onChange={(e) => updateFormField('quote_form', index, { enabled: e.target.checked })}
                        style={{ width: '16px', height: '16px' }}
                      />
                      <span style={{ fontSize: '14px' }}>Enabled</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Tabs.Content>
      </Tabs.Root>

      {/* Save Button */}
      <div style={{
        position: 'sticky',
        bottom: '0',
        background: 'white',
        borderTop: '1px solid #ddd',
        padding: '20px',
        textAlign: 'right'
      }}>
        <button
          onClick={saveSettings}
          disabled={saving}
          style={{
            background: '#007cba',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '4px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: saving ? 'not-allowed' : 'pointer',
            opacity: saving ? 0.7 : 1
          }}
        >
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        [data-state="active"] {
          color: #007cba !important;
          border-bottom-color: #007cba !important;
        }
        
        [data-state="inactive"]:hover {
          color: #0073aa !important;
        }
      `}</style>
    </div>
  );
}