# Stage 8: routing, detail page, and CSS Modules

## Tool

Claude Code

## Task

Check Steps 4 to 8 of the Stage 8 guide (layout,
card link, detail page, simple pages, navigation tests) against the app.

## Result

- Renamed `App.css` to `index.css`, kept only variables, base elements, and
  shared classes there, and moved the remaining rules into the `.module.css`
  files of `Layout`, `OrderCard`, `OrderForm`, `OrderList`, `OrderPage`, and
  `OrderDetaliuPage`. Class names are written as `styles.name` in JSX.
- Fixed `fetchComenzi` requesting the literal text `COMENZI_RESOURCE`, a wrong
  `api.js` import path in `OrderPage`, and the detail route (`/orders/:id`
  to `/comenzi/:id`, as required by `tw.json`).
- Added a root `.gitignore`, removed two test orders from `db.json`

## Validation

- `npm ci`, `npm run build`, and `npm run lint` in `frontend/` on a clean copy:
  passed.
- Production build against json-server, checked in a headless browser: header
  navigation loads no HTML document; clicking a title opens `/comenzi/1` with
  the right `detail-title`; Back works; reloading `/comenzi/1` works;
  `/comenzi/999` shows the error; `/ceva` shows `not-found`; the nav has 2
  links.
- Stage 7 re-check: the page and the API agree; an empty form shows
  `form-error`; add, toggle, and delete persist after a reload.
- No Git commands, commit, or push were performed.
