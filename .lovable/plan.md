# Awujayz Enterprise Ecosystem Redesign and Completion Plan

## Goal
Transform the portfolio hub, all three public brand sites, commerce flow, and admin console into one polished multi-brand ecosystem. Preserve each business’s identity while introducing a consistent agency-grade design system and completing the unfinished operational workflows.

## Locked Design Direction
- **Composition:** Enterprise Ecosystem Gateway with editorial asymmetry, strong full-bleed imagery, offset type, purposeful negative space, and compact operational surfaces.
- **Palette:** Ink `#0B0C0E`, warm white `#F7F4ED`, Magic Potion `#B63BCE`, Easily Movers `#006C67`, Cravins TX `#D9471E`.
- **Typography:** Space Grotesk headings, DM Sans body.
- **Behavior:** Crisp editorial reveals and image transitions; restrained admin motion; reduced-motion support.
- **Brand separation:** Magic Potion remains fashion-forward and dark, Easily Movers remains practical and trust-led, Cravins remains warm and food-led, and Admin becomes a dedicated operations environment.

## Phase 1 — Finish the Operational Foundation
1. Wire the existing Orders, Users, and Audit Log screens into protected admin navigation.
2. Complete the Magic Potion order flow:
   - Load saleable products from the database rather than the hardcoded catalog.
   - Preserve size, quantity, cart, subtotal, and stock behavior.
   - Collect customer and shipping details.
   - Submit through the existing secure order function, where prices are recalculated from stored products.
   - Show confirmation, failure recovery, and cart persistence.
3. Keep checkout as **order capture with unpaid status** until live card payments are available on the workspace plan; structure the UI and order model so a hosted payment step can be added without redesigning checkout.
4. Add live inquiry refresh and visible “new activity” feedback.
5. Add server-side pagination, search, filters, loading, empty, and error states to inquiries, products, menu items, orders, users, and audit activity.

## Phase 2 — Shared Agency-Grade Design System
1. Replace scattered hardcoded colors and one-off styling with semantic tokens for the ecosystem, each brand, status states, charts, and admin surfaces.
2. Load the locked fonts correctly through the document head and remove remote CSS imports.
3. Build reusable public-site foundations:
   - Brand-aware navigation with active states and a complete mobile menu.
   - Consistent content widths, section rhythms, type scales, buttons, form controls, drawers, and footers.
   - Accessible image overlays, focus states, icon labels, and reduced-motion behavior.
4. Create an explicit admin theme rather than inheriting the portfolio styling.
5. Preserve one visual system while varying imagery, accent, hierarchy, and conversion language by brand.

## Phase 3 — Redesign Every Public Experience
### Awujayz Hub
- Match the selected gateway composition: dominant Awujayz identity, asymmetric brand destinations, real brand imagery, concise consultant positioning, and a discreet Admin entry.
- Retain the light/dark control in the footer corner, implemented through the shared theme system.

### Magic Potion Apparel
- Redesign Home, Shop, and About as a premium editorial streetwear storefront.
- Make product imagery, collection discovery, pricing, sizes, availability, cart, and checkout the primary journey.
- Retain the supplied tagline and social identity.

### Easily Movers / Elixir.TX Services
- Redesign Home, About, and Contact around trust, service coverage, clear estimates, and fast calling/lead submission.
- Present moving, junk removal, handyman, and cleaning services with clear territory and contact information.
- Persist contact requests to the shared inquiry system with honest success and error states.

### Cravins TX
- Redesign Home, Menu, Catering, and About around food photography, menu discovery, current location, opening hours, and event booking.
- Connect menu presentation to managed menu records.
- Preserve Circles Lounge Café details, phones, Instagram, service schedule, and catering inquiry path.
- Add an accessible interactive location map with a direct directions fallback.

## Phase 4 — Enterprise Admin Control Center
1. Recompose the admin shell as an information-dense command center with:
   - Brand switcher and global/all-brands view.
   - Role-aware grouped navigation, breadcrumbs, command search, notifications, and account controls.
   - Responsive mobile navigation and tables that remain usable on narrow screens.
2. Build an operational overview with real data:
   - New and total inquiries, open orders, captured sales value, catalog availability, service status, and recent activity.
   - Brand-level filters and period comparisons where the stored data supports them.
   - System-health indicators based on real query/function status, never invented metrics.
3. Complete operational workspaces:
   - **Inbox:** live inquiries, status, notes, search, filters, pagination, and safe deletion confirmation.
   - **Commerce:** orders, order detail with line items, customer/shipping details, payment state, and fulfillment status.
   - **Catalog:** paginated product management with preview, inventory visibility, pricing, categories, and images.
   - **Food:** paginated menu management with availability, featured state, categories, pricing, and images.
   - **Services:** active status, ordering, and service details.
   - **Users:** admin-created accounts, role assignment, account status, search, and pagination; remove public admin signup.
   - **Audit:** searchable actor/action/entity history with before-and-after detail.
4. Add a System area showing actionable application status, recent failures available to the client, and integration readiness without exposing secrets.

## Phase 5 — Reliability, Security, and Quality
- Keep authorization enforced by protected routes and database policies; roles remain in the dedicated roles table.
- Keep order prices server-validated and admin account management server-authorized.
- Add confirmation for destructive actions and prevent accidental self-demotion or removal of the final administrator where feasible.
- Standardize query caching, invalidation, retries, and recoverable error messages.
- Update page titles, descriptions, social metadata, semantic headings, image alt text, and crawlable public navigation.
- Replace external hotlinked product imagery with project-managed assets where required for reliable delivery.

## Validation
- Verify public routes, mobile menus, forms, cart, checkout, order visibility, role changes, audit entries, pagination, and live inquiries in the browser.
- Test desktop and mobile layouts for every route group, including long names, empty datasets, loading, errors, and narrow admin tables.
- Confirm all displayed metrics come from stored data.
- Run targeted tests plus the project’s standard validation, then resolve browser console and network failures.

## Delivery Order
```text
Finish wiring and data flows
        ↓
Install shared visual foundations
        ↓
Redesign Hub + three brand families
        ↓
Recompose and complete Admin
        ↓
Accessibility, metadata, mobile, and end-to-end verification
```

## Technical Notes
- Keep the existing React, routing, React Query, component library, and Lovable Cloud architecture.
- Reuse the existing orders, order items, audit logs, role model, live inquiry publication, and secured management functions.
- Do not introduce new brand overlap or merge brand-specific customer journeys.
- Live card charging remains deferred until payment capability is available; this delivery completes secure order capture and admin fulfillment visibility.
