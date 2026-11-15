# FilmNegar 1.9 — Social features implementation plan

## Product scope
1. Real user discovery by username.
2. Follow / unfollow and follower/following counts and lists.
3. Private one-to-one conversations and unread-message indicators.
4. Share a complete custom list or watch-status list inside a conversation.
5. Recipient can save a received list as a new personal list with their own title, or append its items to an existing custom list.
6. Imported lists are independent snapshots; sender edits/deletions never alter the recipient's copy.
7. Preserve current auth, password recovery, manual title entry, TMDB search, watch lists, ratings, reviews, theme, public share links, and PWA behavior.

## Data model
- Keep existing profiles, user_data, and shared_lists untouched.
- follows: directed user-to-user relationships.
- messages: direct messages; a message can contain text, a shared-list JSON snapshot, or both.
- Reuse profiles.username for discovery; do not expose email addresses.
- Enforce participant-only reads and recipient-only read receipts with RLS.

## Delivery sequence
- Phase A: add the idempotent Supabase migration and verify security policies.
- Phase B: replace demo friends with real profile search, follow/unfollow, and follower/following views.
- Phase C: add inbox and private conversations, unread count, and read receipts.
- Phase D: add list sharing in chat and recipient import flow (new custom list with recipient-chosen title, or append to an existing custom list), with duplicate prevention and snapshot isolation.
- Phase E: run static checks and regression review; publish a pull request for review before merging to main.
- Phase F: apply the migration in Supabase, test with two real accounts, then merge/deploy after successful acceptance.

## Safety / compatibility
- No destructive SQL; no changes to existing rows or auth settings.
- No service-role key in client code.
- No writes to main until the feature branch passes review.
- A shared-list import maps each received title to the receiver's own item record and skips duplicate titles/IDs.
