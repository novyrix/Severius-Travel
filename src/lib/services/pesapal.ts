/**
 * PesaPal Payment Gateway Integration
 * Documentation: https://developer.pesapal.com/
 */

interface PesaPalConfig {
  consumerKey: string;
  consumerSecret: string;
  environment: 'sandbox' | 'production';
  ipnUrl: string;
}

interface PaymentRequest {
  id: string;
  currency: string;
  amount: number;
  description: string;
  callback_url: string;
  notification_id: string;
  billing_address: {
    email_address: string;
    phone_number: string;
    country_code: string;
    first_name: string;
    middle_name?: string;
    last_name: string;
    line_1?: string;
    line_2?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    zip_code?: string;
  };
}

interface PesaPalPaymentResponse {
  order_tracking_id: string;
  merchant_reference: string;
  redirect_url: string;
  error?: {
    type: string;
    code: string;
    message: string;
    call_back_url: string;
  };
  status: string;
}

interface PesaPalAuthResponse {
  token: string;
  expiryDate: string;
  error?: any;
  status: string;
  message: string;
}

class PesaPalService {
  private config: PesaPalConfig;
  private baseUrl: string;
  private token: string | null = null;
  private tokenExpiry: Date | null = null;

  constructor() {
    this.config = {
      consumerKey: process.env.PESAPAL_CONSUMER_KEY || '',
      consumerSecret: process.env.PESAPAL_CONSUMER_SECRET || '',
      environment: (process.env.PESAPAL_ENVIRONMENT as 'sandbox' | 'production') || 'sandbox',
      ipnUrl: process.env.PESAPAL_IPN_URL || '',
    };

    this.baseUrl =
      this.config.environment === 'sandbox'
        ? 'https://cybqa.pesapal.com/pesapalv3'
        : 'https://pay.pesapal.com/v3';
  }

  /**
   * Check if PesaPal is configured
   */
  isConfigured(): boolean {
    return Boolean(this.config.consumerKey && this.config.consumerSecret);
  }

  /**
   * Get authentication token
   */
  private async getAuthToken(): Promise<string> {
    // Return cached token if still valid
    if (this.token && this.tokenExpiry && new Date() < this.tokenExpiry) {
      return this.token;
    }

    console.log('🔐 Requesting PesaPal token from:', `${this.baseUrl}/api/Auth/RequestToken`);
    console.log('📤 With consumer key:', this.config.consumerKey?.substring(0, 10) + '...');
    
    const response = await fetch(`${this.baseUrl}/api/Auth/RequestToken`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        consumer_key: this.config.consumerKey,
        consumer_secret: this.config.consumerSecret,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ PesaPal auth failed:', response.status, response.statusText, errorText);
      throw new Error(`PesaPal auth failed: ${response.status} ${response.statusText}`);
    }

    const data: PesaPalAuthResponse = await response.json();
    console.log('🔑 PesaPal auth response:', JSON.stringify(data, null, 2));

    if (data.error || data.status !== '200') {
      console.error('❌ PesaPal auth error:', data);
      throw new Error(`PesaPal auth error: ${data.message || data.error || 'Unknown error'}`);
    }

    this.token = data.token;
    this.tokenExpiry = new Date(data.expiryDate);

    return this.token;
  }

  /**
   * Register IPN URL (should be called once during setup)
   */
  async registerIPN(): Promise<string> {
    const token = await this.getAuthToken();

    const response = await fetch(`${this.baseUrl}/api/URLSetup/RegisterIPN`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        url: this.config.ipnUrl,
        ipn_notification_type: 'GET',
      }),
    });

    if (!response.ok) {
      throw new Error(`IPN registration failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.ipn_id;
  }

  /**
   * Submit payment order
   */
  async submitOrder(paymentData: {
    bookingRef: string;
    amount: number;
    currency: string;
    description: string;
    callbackUrl: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    notificationId: string;
  }): Promise<PesaPalPaymentResponse> {
    if (!this.isConfigured()) {
      throw new Error('PesaPal is not configured. Please set environment variables.');
    }

    const token = await this.getAuthToken();

    const requestData: PaymentRequest = {
      id: paymentData.bookingRef,
      currency: paymentData.currency,
      amount: paymentData.amount, // Amount is already in main currency (USD)
      description: paymentData.description,
      callback_url: paymentData.callbackUrl,
      notification_id: paymentData.notificationId,
      billing_address: {
        email_address: paymentData.email,
        phone_number: paymentData.phoneNumber,
        country_code: 'KE',
        first_name: paymentData.firstName,
        last_name: paymentData.lastName,
      },
    };

    const response = await fetch(`${this.baseUrl}/api/Transactions/SubmitOrderRequest`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error(`PesaPal order submission failed: ${response.statusText}`);
    }

    const data: PesaPalPaymentResponse = await response.json();

    if (data.error) {
      throw new Error(`PesaPal error: ${data.error.message}`);
    }

    return data;
  }

  /**
   * Get transaction status
   */
  async getTransactionStatus(orderTrackingId: string): Promise<any> {
    const token = await this.getAuthToken();

    const response = await fetch(
      `${this.baseUrl}/api/Transactions/GetTransactionStatus?orderTrackingId=${orderTrackingId}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to get transaction status: ${response.statusText}`);
    }

    return await response.json();
  }
}

// Export singleton instance
export const pesapalService = new PesaPalService();
