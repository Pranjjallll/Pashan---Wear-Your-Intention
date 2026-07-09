# PASHAN

Premium storefront for PASHAN, built with TanStack Start.

## Local setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy the environment template:

   ```bash
   cp .env.example .env
   ```

3. Add the Razorpay test credentials to `.env`:

   ```bash
   RAZORPAY_KEY_ID=rzp_test_your_key_id_here
   RAZORPAY_KEY_SECRET=your_test_key_secret_here
   ```

4. Start the app:

   ```bash
   npm run dev
   ```

## Razorpay test payments

Checkout uses Razorpay Standard Checkout. The browser receives only `RAZORPAY_KEY_ID`; the secret stays on the server and is used to create orders and verify payment signatures.

For a hosted test deployment, add these environment variables in the hosting provider before testing checkout:

- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`

Use test-mode keys while testing. Swap to live-mode keys only when the site is ready to accept real payments.
