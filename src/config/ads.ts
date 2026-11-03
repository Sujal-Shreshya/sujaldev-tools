import { AdUnitConfig } from '../types';

/**
 * Google AdSense Configuration
 *
 * Keep 'enabled: false' until actual publisher credentials and privacy consent
 * CMP (Consent Management Platform) are configured.
 * This reserves responsive layout containers to prevent Cumulative Layout Shift (CLS).
 */
export const ADS_CONFIG: AdUnitConfig = {
  enabled: false, // Set to true once AdSense approval is granted
  publisherId: 'ca-pub-XXXXXXXXXXXXXXXX', // Replace with real publisher ID
  slots: {
    toolHeader: '1234567890',
    toolSidebar: '2345678901',
    toolFooter: '3456789012',
    homeMiddle: '4567890123',
  },
};

