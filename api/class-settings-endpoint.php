<?php
/**
 * Settings REST API endpoint for Woo Presales
 */

class WC_Cart_Share_Quote_Settings_Endpoint {
    
    /**
     * Register REST API routes
     */
    public function register_routes() {
        register_rest_route('woo-presales/v1', '/settings', [
            [
                'methods' => WP_REST_Server::READABLE,
                'callback' => [$this, 'get_settings'],
                'permission_callback' => [$this, 'check_permission'],
            ],
            [
                'methods' => WP_REST_Server::CREATABLE,
                'callback' => [$this, 'update_settings'],
                'permission_callback' => [$this, 'check_permission'],
                'args' => $this->get_settings_schema(),
            ],
        ]);

        register_rest_route('woo-presales/v1', '/settings/reset', [
            'methods' => WP_REST_Server::CREATABLE,
            'callback' => [$this, 'reset_settings'],
            'permission_callback' => [$this, 'check_permission'],
        ]);
    }

    /**
     * Check permission for settings access
     */
    public function check_permission() {
        return current_user_can('manage_woocommerce');
    }

    /**
     * Get current settings
     */
    public function get_settings(WP_REST_Request $request) {
        $settings = $this->get_default_settings();
        $stored_settings = get_option('woo_presales_settings', []);
        
        // Merge stored settings with defaults
        $settings = array_replace_recursive($settings, $stored_settings);
        
        return rest_ensure_response($settings);
    }

    /**
     * Update settings
     */
    public function update_settings(WP_REST_Request $request) {
        $new_settings = $request->get_params();
        
        // Sanitize and validate settings
        $sanitized_settings = $this->sanitize_settings($new_settings);
        
        // Update the settings
        $updated = update_option('woo_presales_settings', $sanitized_settings);
        
        if ($updated) {
            // Update CSS variables if design settings changed
            if (isset($sanitized_settings['design'])) {
                $this->update_css_variables($sanitized_settings['design']);
            }
            
            return rest_ensure_response([
                'success' => true,
                'message' => 'Settings updated successfully',
                'settings' => $sanitized_settings
            ]);
        }
        
        return new WP_Error(
            'settings_update_failed',
            'Failed to update settings',
            ['status' => 500]
        );
    }

    /**
     * Reset settings to defaults
     */
    public function reset_settings(WP_REST_Request $request) {
        $default_settings = $this->get_default_settings();
        $updated = update_option('woo_presales_settings', $default_settings);
        
        if ($updated) {
            // Reset CSS variables
            $this->update_css_variables($default_settings['design']);
            
            return rest_ensure_response([
                'success' => true,
                'message' => 'Settings reset to defaults',
                'settings' => $default_settings
            ]);
        }
        
        return new WP_Error(
            'settings_reset_failed',
            'Failed to reset settings',
            ['status' => 500]
        );
    }

    /**
     * Get default settings structure
     */
    private function get_default_settings() {
        return [
            'general' => [
                'store_name' => get_bloginfo('name'),
                'store_address' => '',
                'contact_email' => get_option('admin_email'),
                'contact_name' => '',
                'support_phone' => '',
                'store_logo' => '',
                'store_website' => home_url(),
                'store_description' => '',
                'enable_share_cart' => true,
                'enable_quote_request' => true,
                'default_expiry_days' => 30,
                'require_login_for_quotes' => false,
                'email_notifications' => true,
                'admin_notification_email' => get_option('admin_email')
            ],
            'design' => [
                'primary_color' => '#007cba',
                'secondary_color' => '#00a32a',
                'button_style' => 'rounded',
                'font_family' => 'system',
                'button_size' => 'medium',
                'border_radius' => '6',
                'custom_css' => ''
            ],
            'form_fields' => [
                'share_form' => [
                    [
                        'name' => 'customer_email',
                        'label' => 'Your Email Address',
                        'type' => 'email',
                        'required' => true,
                        'enabled' => true,
                        'placeholder' => 'Enter your email',
                        'order' => 1
                    ],
                    [
                        'name' => 'customer_name',
                        'label' => 'Your Name',
                        'type' => 'text',
                        'required' => false,
                        'enabled' => true,
                        'placeholder' => 'Enter your name',
                        'order' => 2
                    ],
                    [
                        'name' => 'recipient_email',
                        'label' => 'Recipient Email',
                        'type' => 'email',
                        'required' => true,
                        'enabled' => true,
                        'placeholder' => 'Enter recipient email',
                        'order' => 3
                    ],
                    [
                        'name' => 'personal_message',
                        'label' => 'Personal Message (Optional)',
                        'type' => 'textarea',
                        'required' => false,
                        'enabled' => true,
                        'placeholder' => 'Add a personal message...',
                        'order' => 4
                    ]
                ],
                'quote_form' => [
                    [
                        'name' => 'customer_name',
                        'label' => 'Full Name',
                        'type' => 'text',
                        'required' => true,
                        'enabled' => true,
                        'placeholder' => 'Enter your full name',
                        'order' => 1
                    ],
                    [
                        'name' => 'customer_email',
                        'label' => 'Email Address',
                        'type' => 'email',
                        'required' => true,
                        'enabled' => true,
                        'placeholder' => 'Enter your email',
                        'order' => 2
                    ],
                    [
                        'name' => 'customer_phone',
                        'label' => 'Phone Number',
                        'type' => 'tel',
                        'required' => false,
                        'enabled' => true,
                        'placeholder' => 'Enter your phone number',
                        'order' => 3
                    ],
                    [
                        'name' => 'company_name',
                        'label' => 'Company Name',
                        'type' => 'text',
                        'required' => false,
                        'enabled' => true,
                        'placeholder' => 'Enter company name',
                        'order' => 4
                    ],
                    [
                        'name' => 'quote_notes',
                        'label' => 'Special Requirements',
                        'type' => 'textarea',
                        'required' => false,
                        'enabled' => true,
                        'placeholder' => 'Any special requirements or notes...',
                        'order' => 5
                    ]
                ]
            ],
            'email_templates' => [
                'share_notification' => [
                    'subject' => '{customer_name} shared a cart with you',
                    'message' => 'Hello!\n\n{customer_name} has shared a shopping cart with you.\n\nView the shared cart: {cart_link}\n\nBest regards,\n{store_name}'
                ],
                'quote_request' => [
                    'subject' => 'New quote request from {customer_name}',
                    'message' => 'A new quote request has been submitted.\n\nCustomer: {customer_name}\nEmail: {customer_email}\nPhone: {customer_phone}\nCompany: {company_name}\n\nSpecial Requirements:\n{quote_notes}\n\nView quote details: {quote_link}'
                ],
                'quote_response' => [
                    'subject' => 'Your quote request has been {status}',
                    'message' => 'Hello {customer_name},\n\nYour quote request has been {status}.\n\n{quote_notes}\n\nView quote details: {quote_link}\n\nBest regards,\n{store_name}'
                ]
            ]
        ];
    }

    /**
     * Sanitize settings input
     */
    private function sanitize_settings($settings) {
        $sanitized = [];

        // Sanitize general settings
        if (isset($settings['general'])) {
            $sanitized['general'] = [
                'store_name' => sanitize_text_field($settings['general']['store_name'] ?? ''),
                'store_address' => sanitize_textarea_field($settings['general']['store_address'] ?? ''),
                'contact_email' => sanitize_email($settings['general']['contact_email'] ?? ''),
                'contact_name' => sanitize_text_field($settings['general']['contact_name'] ?? ''),
                'support_phone' => sanitize_text_field($settings['general']['support_phone'] ?? ''),
                'store_logo' => esc_url_raw($settings['general']['store_logo'] ?? ''),
                'store_website' => esc_url_raw($settings['general']['store_website'] ?? ''),
                'store_description' => sanitize_textarea_field($settings['general']['store_description'] ?? ''),
                'enable_share_cart' => (bool) ($settings['general']['enable_share_cart'] ?? true),
                'enable_quote_request' => (bool) ($settings['general']['enable_quote_request'] ?? true),
                'default_expiry_days' => absint($settings['general']['default_expiry_days'] ?? 30),
                'require_login_for_quotes' => (bool) ($settings['general']['require_login_for_quotes'] ?? false),
                'email_notifications' => (bool) ($settings['general']['email_notifications'] ?? true),
                'admin_notification_email' => sanitize_email($settings['general']['admin_notification_email'] ?? get_option('admin_email'))
            ];
        }

        // Sanitize design settings
        if (isset($settings['design'])) {
            $sanitized['design'] = [
                'primary_color' => sanitize_hex_color($settings['design']['primary_color'] ?? '#007cba'),
                'secondary_color' => sanitize_hex_color($settings['design']['secondary_color'] ?? '#00a32a'),
                'button_style' => sanitize_text_field($settings['design']['button_style'] ?? 'rounded'),
                'font_family' => sanitize_text_field($settings['design']['font_family'] ?? 'system'),
                'button_size' => sanitize_text_field($settings['design']['button_size'] ?? 'medium'),
                'border_radius' => absint($settings['design']['border_radius'] ?? 6),
                'custom_css' => wp_strip_all_tags($settings['design']['custom_css'] ?? '')
            ];
        }

        // Sanitize form fields
        if (isset($settings['form_fields'])) {
            $sanitized['form_fields'] = [];
            
            foreach (['share_form', 'quote_form'] as $form_type) {
                if (isset($settings['form_fields'][$form_type]) && is_array($settings['form_fields'][$form_type])) {
                    $sanitized['form_fields'][$form_type] = [];
                    
                    foreach ($settings['form_fields'][$form_type] as $field) {
                        $sanitized['form_fields'][$form_type][] = [
                            'name' => sanitize_key($field['name'] ?? ''),
                            'label' => sanitize_text_field($field['label'] ?? ''),
                            'type' => sanitize_text_field($field['type'] ?? 'text'),
                            'required' => (bool) ($field['required'] ?? false),
                            'enabled' => (bool) ($field['enabled'] ?? true),
                            'placeholder' => sanitize_text_field($field['placeholder'] ?? ''),
                            'order' => absint($field['order'] ?? 0)
                        ];
                    }
                }
            }
        }

        // Sanitize email templates
        if (isset($settings['email_templates'])) {
            $sanitized['email_templates'] = [];
            
            foreach ($settings['email_templates'] as $template_key => $template) {
                $sanitized['email_templates'][$template_key] = [
                    'subject' => sanitize_text_field($template['subject'] ?? ''),
                    'message' => sanitize_textarea_field($template['message'] ?? '')
                ];
            }
        }

        return $sanitized;
    }

    /**
     * Update CSS variables based on design settings
     */
    private function update_css_variables($design_settings) {
        $css_variables = [
            '--woo-presales-primary-color' => $design_settings['primary_color'] ?? '#007cba',
            '--woo-presales-secondary-color' => $design_settings['secondary_color'] ?? '#00a32a',
            '--woo-presales-border-radius' => ($design_settings['border_radius'] ?? 6) . 'px',
        ];

        // Handle button styles
        switch ($design_settings['button_style'] ?? 'rounded') {
            case 'square':
                $css_variables['--woo-presales-button-radius'] = '0px';
                break;
            case 'pill':
                $css_variables['--woo-presales-button-radius'] = '50px';
                break;
            default:
                $css_variables['--woo-presales-button-radius'] = '6px';
        }

        // Handle button sizes
        switch ($design_settings['button_size'] ?? 'medium') {
            case 'small':
                $css_variables['--woo-presales-button-padding'] = '8px 16px';
                $css_variables['--woo-presales-button-font-size'] = '12px';
                break;
            case 'large':
                $css_variables['--woo-presales-button-padding'] = '16px 32px';
                $css_variables['--woo-presales-button-font-size'] = '16px';
                break;
            default:
                $css_variables['--woo-presales-button-padding'] = '12px 24px';
                $css_variables['--woo-presales-button-font-size'] = '14px';
        }

        // Handle font families
        $font_families = [
            'system' => '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            'arial' => 'Arial, sans-serif',
            'helvetica' => 'Helvetica, Arial, sans-serif',
            'georgia' => 'Georgia, serif',
            'times' => '"Times New Roman", Times, serif'
        ];
        
        $css_variables['--woo-presales-font-family'] = $font_families[$design_settings['font_family'] ?? 'system'];

        // Store CSS variables for use in frontend
        update_option('woo_presales_css_variables', $css_variables);
    }

    /**
     * Get settings schema for validation
     */
    private function get_settings_schema() {
        return [
            'general' => [
                'type' => 'object',
                'properties' => [
                    'store_name' => ['type' => 'string'],
                    'store_logo' => ['type' => 'string'],
                    'store_description' => ['type' => 'string'],
                    'enable_share_cart' => ['type' => 'boolean'],
                    'enable_quote_request' => ['type' => 'boolean'],
                    'default_expiry_days' => ['type' => 'integer', 'minimum' => 1, 'maximum' => 365],
                    'require_login_for_quotes' => ['type' => 'boolean'],
                    'email_notifications' => ['type' => 'boolean'],
                    'admin_notification_email' => ['type' => 'string', 'format' => 'email']
                ]
            ],
            'design' => [
                'type' => 'object',
                'properties' => [
                    'primary_color' => ['type' => 'string', 'pattern' => '^#[0-9a-fA-F]{6}$'],
                    'secondary_color' => ['type' => 'string', 'pattern' => '^#[0-9a-fA-F]{6}$'],
                    'button_style' => ['type' => 'string', 'enum' => ['rounded', 'square', 'pill']],
                    'font_family' => ['type' => 'string'],
                    'button_size' => ['type' => 'string', 'enum' => ['small', 'medium', 'large']],
                    'border_radius' => ['type' => 'integer', 'minimum' => 0, 'maximum' => 50],
                    'custom_css' => ['type' => 'string']
                ]
            ],
            'form_fields' => [
                'type' => 'object',
                'properties' => [
                    'share_form' => ['type' => 'array'],
                    'quote_form' => ['type' => 'array']
                ]
            ],
            'email_templates' => [
                'type' => 'object'
            ]
        ];
    }
}