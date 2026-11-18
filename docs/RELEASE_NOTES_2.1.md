# FilmNegar 2.1

## My Lists improvements
- Added search within saved titles by Persian or English title.
- Search results show the watch-status category and any custom lists containing the title.
- Shows «یافت نشد» when no saved title matches.
- Added a persistent choice between the existing poster/card view and a compact title-only view.
- The compact view keeps status controls available and hides posters and secondary metadata for easier scanning.

## Branding
- The homepage hero uses the supplied FilmNegar artwork from `assets/filmnegar-cover.jpg` as its logo/cover mark. It is displayed as a restrained circular brand image, not as a full-page background.

## Compatibility and backup
- No database schema changes and no SQL migration are required.
- Existing Supabase data, accounts, statuses, custom lists, list sharing, and social features are retained.
- A complete pre-2.1 copy of `index.html` is stored at `docs/backups/FilmNegar-2.0.1-pre-2.1.html`.
