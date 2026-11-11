# Architecture decisions

- Create Magic Potion Stripe Checkout sessions only in Lovable Cloud functions using server-verified catalog prices; the browser never determines payment totals.
- Treat Stripe-signed webhook events as the payment authority and process event IDs idempotently so retries cannot duplicate order transitions.