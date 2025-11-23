// EcoCash configuration - placeholder for actual EcoCash settings
const ecocashConfig = {
  merchantCode: process.env.ECOCASH_MERCHANT_CODE || 'WHIMSICAL001',
  apiKey: process.env.ECOCASH_API_KEY || 'test-api-key',
  apiUrl: process.env.ECOCASH_URL || 'https://api.ecocash.co.zw/v1/payments',
  callbackUrl: process.env.ECOCASH_CALLBACK_URL || 'http://localhost:5000/api/payments/ecocash/callback',
  successUrl: process.env.ECOCASH_SUCCESS_URL || 'http://localhost:3000/payment/success',
  failureUrl: process.env.ECOCASH_FAILURE_URL || 'http://localhost:3000/payment/failure',
};

export default ecocashConfig;
