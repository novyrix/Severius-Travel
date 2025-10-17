/**
 * PayPal Payment Gateway Integration
 * Documentation: https://developer.paypal.com/docs/api/overview/
 */

interface PayPalConfig {
  clientId: string;
  clientSecret: string;
  mode: 'sandbox' | 'live';
}

interface PayPalOrder {
  orderID: string;
  bookingRef: string;
  amount: number;
  currency: string;
  description: string;
}

interface PayPalAccessToken {
  access_token: string;
  expires_in: number;
  token_type: string;
}

class PayPalService {
  private config: PayPalConfig;
  private baseURL: string;
  private accessToken: string | null = null;
  private tokenExpiry: number = 0;

  constructor() {
    this.config = {
      clientId: process.env.PAYPAL_CLIENT_ID || '',
      clientSecret: process.env.PAYPAL_CLIENT_SECRET || '',
      mode: (process.env.PAYPAL_MODE as 'sandbox' | 'live') || 'sandbox',
    };

    this.baseURL =
      this.config.mode === 'sandbox'
        ? 'https://api-m.sandbox.paypal.com'
        : 'https://api-m.paypal.com';
  }

  isConfigured(): boolean {
    return Boolean(this.config.clientId && this.config.clientSecret);
  }

  private async getAccessToken(): Promise<string> {
    // Return cached token if still valid
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    const auth = Buffer.from(
      `${this.config.clientId}:${this.config.clientSecret}`
    ).toString('base64');

    const response = await fetch(`${this.baseURL}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });

    if (!response.ok) {
      throw new Error('Failed to get PayPal access token');
    }

    const data: PayPalAccessToken = await response.json();
    this.accessToken = data.access_token;
    // Set expiry to 5 minutes before actual expiry
    this.tokenExpiry = Date.now() + (data.expires_in - 300) * 1000;

    return this.accessToken;
  }

  async createOrder(order: PayPalOrder): Promise<{ orderId: string; approvalUrl: string }> {
    const accessToken = await this.getAccessToken();

    const response = await fetch(`${this.baseURL}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            reference_id: order.bookingRef,
            description: order.description,
            amount: {
              currency_code: order.currency,
              value: order.amount.toFixed(2),
            },
          },
        ],
        application_context: {
          brand_name: 'Severius Travel',
          landing_page: 'NO_PREFERENCE',
          user_action: 'PAY_NOW',
          return_url: `${process.env.NEXTAUTH_URL}/api/payments/paypal/callback?bookingRef=${order.bookingRef}`,
          cancel_url: `${process.env.NEXTAUTH_URL}/payment/${order.bookingRef}?cancelled=true`,
        },
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('PayPal create order error:', error);
      throw new Error('Failed to create PayPal order');
    }

    const data = await response.json();
    const approvalUrl = data.links.find((link: any) => link.rel === 'approve')?.href;

    return {
      orderId: data.id,
      approvalUrl,
    };
  }

  async captureOrder(orderId: string): Promise<{
    status: string;
    captureId: string;
    amount: string;
  }> {
    const accessToken = await this.getAccessToken();

    const response = await fetch(
      `${this.baseURL}/v2/checkout/orders/${orderId}/capture`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error('PayPal capture order error:', error);
      throw new Error('Failed to capture PayPal order');
    }

    const data = await response.json();
    const capture = data.purchase_units[0]?.payments?.captures?.[0];

    return {
      status: data.status,
      captureId: capture?.id || '',
      amount: capture?.amount?.value || '0',
    };
  }

  async getOrderDetails(orderId: string): Promise<any> {
    const accessToken = await this.getAccessToken();

    const response = await fetch(`${this.baseURL}/v2/checkout/orders/${orderId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to get PayPal order details');
    }

    return await response.json();
  }
}

export const paypalService = new PayPalService();
