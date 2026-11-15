# FilmNegar 1.9 — Test checklist (two accounts)

## Before testing
- This is a feature-branch build, not the production GitHub Pages site.
- Do not test against real user data until you have a backup.
- Apply `supabase/migrations/202611150001_social_features.sql` in the Supabase SQL Editor for the FilmNegar project. Run it once and confirm it completes without errors.
- Publish a preview of branch `feature/social-v1.9` (Netlify Deploy Preview if the repository is connected; otherwise wait for an agreed test deployment). Do not merge to main just to get a preview.
- Use two test accounts you control, Account A and Account B.

## Follow and notification
1. Sign in as A and search for B by username.
2. Follow B. Confirm A's following count/list updates.
3. Sign in as B. Confirm a new notification says A followed B and the unread indicator is visible.
4. Mark the notification as read. Confirm the unread indicator clears.
5. Unfollow B from A. Confirm the relationship is removed. A new notification should not be created by an unfollow.

## Private messaging
1. Sign in as A, open Friends → Private messages, search B and start a conversation.
2. Send a text message. Sign in as B and confirm only A/B can see the conversation.
3. Reply as B. Confirm A can see the reply.
4. Open the conversation as recipient and confirm unread state is cleared.
5. Check that another signed-in account cannot query these messages (RLS).

## Share and import a list
1. As A, create a custom list with at least three titles, including one manually entered title if possible.
2. Open the conversation with B and send the list.
3. As B, open the received list and choose "Create new list"; enter a different title, e.g. "Suggestions from A".
4. Confirm the new list appears in B's personal lists with all expected titles.
5. Send the same list again and import into the same existing custom list. Confirm duplicate titles are skipped.
6. Edit or delete A's original list. Confirm B's imported copy is unchanged.
7. Also test importing a list containing an existing title already in B's library.

## Regression checks
- Sign up, sign in, sign out, password reset, and password change.
- Add a title from TMDB and manually add a title.
- Add/remove items from want / watching / watched.
- Create, rename (if supported), and delete a custom list.
- Confirm personal ratings/reviews and theme still work.
- Confirm existing public share links still work.

## Report back
For each test, report Pass / Fail and the exact error text or screenshot. Do not share passwords, access tokens, or API keys.

## Known test boundary
JavaScript syntax validation passes for both inline script blocks. Database migration and end-to-end behavior have not yet been run against Supabase or two real accounts. Treat this as a test candidate, not a released version.
