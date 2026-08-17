/**
 * Donation Service for GlobalHelper Platform
 * Integrates with multiple payment providers: Stripe, PayPal, Crypto
 * Supports recurring donations and one-time payments
 */

// Payment Provider Configuration
const STRIPE_PUBLISHABLE_KEY = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || '';
const PAYPAL_CLIENT_ID = process.env.REACT_APP_PAYPAL_CLIENT_ID || '';
const CRYPTO_WALLET_ADDRESS = process.env.REACT_APP_CRYPTO_WALLET_ADDRESS || '';

export interface DonationDetails {
  crisisId: string;
  crisisTitle: string;
  amount: number;
  currency: string;
  donorEmail?: string;
  donorName?: string;
  isRecurring?: boolean;
  recurringInterval?: 'monthly' | 'yearly';
}

export interface PaymentProvider {
  name: string;
  type: 'stripe' | 'paypal' | 'crypto' | 'bank';
  processDonation: (details: DonationDetails) => Promise<DonationResult>;
}

export interface DonationResult {
  success: boolean;
  transactionId?: string;
  error?: string;
  redirectUrl?: string;
}

class DonationService {
  private providers: PaymentProvider[] = [];

  /**
   * Initialize donation service with configured providers
   */
  initialize() {
    if (STRIPE_PUBLISHABLE_KEY) {
      this.providers.push({
        name: 'Stripe',
        type: 'stripe',
        processDonation: this.processStripeDonation.bind(this)
      });
    }

    if (PAYPAL_CLIENT_ID) {
      this.providers.push({
        name: 'PayPal',
        type: 'paypal',
        processDonation: this.processPayPalDonation.bind(this)
      });
    }

    if (CRYPTO_WALLET_ADDRESS) {
      this.providers.push({
        name: 'Crypto',
        type: 'crypto',
        processDonation: this.processCryptoDonation.bind(this)
      });
    }
  }

  /**
   * Process donation via Stripe
   */
  private async processStripeDonation(details: DonationDetails): Promise<DonationResult> {
    try {
      // Create Stripe checkout session
      const response = await fetch('/api/create-stripe-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          crisisId: details.crisisId,
          crisisTitle: details.crisisTitle,
          amount: details.amount,
          currency: details.currency,
          donorEmail: details.donorEmail,
          donorName: details.donorName,
          isRecurring: details.isRecurring,
          recurringInterval: details.recurringInterval
        })
      });

      const session = await response.json();

      return {
        success: true,
        transactionId: session.id,
        redirectUrl: session.url
      };
    } catch (error) {
      return {
        success: false,
        error: 'Stripe payment failed'
      };
    }
  }

  /**
   * Process donation via PayPal
   */
  private async processPayPalDonation(details: DonationDetails): Promise<DonationResult> {
    try {
      // Create PayPal order
      const response = await fetch('/api/create-paypal-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          crisisId: details.crisisId,
          crisisTitle: details.crisisTitle,
          amount: details.amount,
          currency: details.currency
        })
      });

      const order = await response.json();

      return {
        success: true,
        transactionId: order.id,
        redirectUrl: order.approvalUrl
      };
    } catch (error) {
      return {
        success: false,
        error: 'PayPal payment failed'
      };
    }
  }

  /**
   * Process donation via Crypto
   */
  private async processCryptoDonation(details: DonationDetails): Promise<DonationResult> {
    // For crypto, we show wallet address and transaction instructions
    return {
      success: true,
      transactionId: 'crypto-pending',
      redirectUrl: `crypto-wallet?address=${CRYPTO_WALLET_ADDRESS}&amount=${details.amount}`
    };
  }

  /**
   * Process donation using preferred provider
   */
  async processDonation(
    details: DonationDetails,
    providerType: 'stripe' | 'paypal' | 'crypto' = 'stripe'
  ): Promise<DonationResult> {
    const provider = this.providers.find(p => p.type === providerType);

    if (!provider) {
      return {
        success: false,
        error: 'Payment provider not configured'
      };
    }

    return await provider.processDonation(details);
  }

  /**
   * Get available payment providers
   */
  getAvailableProviders(): PaymentProvider[] {
    return this.providers;
  }

  /**
   * Get crypto wallet address
   */
  getCryptoWalletAddress(): string {
    return CRYPTO_WALLET_ADDRESS;
  }

  /**
   * Track donation analytics
   */
  async trackDonation(details: DonationDetails, result: DonationResult) {
    try {
      await fetch('/api/track-donation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...details,
          ...result,
          timestamp: new Date().toISOString()
        })
      });
    } catch (error) {
      console.error('Failed to track donation:', error);
    }
  }
}

export const donationService = new DonationService();

// Initialize on load
donationService.initialize();
