# Stripe Webhook Persistence and User Mapping (OPE-10)

## Decision

This repository currently ships a static Astro landing page and does not provide a first-class auth/session or database stack. To satisfy webhook billing requirements now without coupling to UI pages, billing state is owned by a dedicated webhook module (`billing/`) that can run as a service boundary.

- Source of truth for identity: the internal `user_id` issued by the auth system at checkout creation time.
- Stripe mapping fields (priority order):
  1. `event.data.object.metadata.user_id`
  2. `event.data.object.client_reference_id`
  3. existing `customer -> user_id` mapping in persisted state
- Source of truth for billing state: persisted billing store managed by the webhook processor (`users`, `customerToUser`, `processedEvents`, `audits`).

## Supported Stripe Events

- `checkout.session.completed`
  - resolves user via mapping precedence above
  - links `customer` to user
  - updates `subscriptionStatus` (`active` for subscription checkout)
  - applies token deltas from metadata (`tokens_purchased` / `tokens_delta`)
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`
  - resolves user and updates `subscriptionStatus`

## Idempotency and Replay Handling

- Every processed Stripe event ID is stored in `processedEvents`.
- If an event ID is seen again, processing is skipped and an `event_replay_skipped` audit record is written.

## Audit Logging

Each processed (or skipped) event writes an audit entry with:

- timestamp
- event ID + type
- action (`billing_state_updated`, `subscription_state_updated`, `user_not_resolved`, `event_replay_skipped`, `event_ignored`)
- relevant details (`userId`, resolution source, customer ID, token delta, resulting status)

## Placement Note

This module is an interim implementation to make webhook behavior explicit and testable in the current repo. Long-term, billing persistence should move into a backend service that already owns auth/session and durable DB infrastructure.
