# Stage 7: order form, API persistence, and test IDs

## Tool

GitHub Copilot

## Task

Align component test IDs with the supplied selector contract, repair the form
imports, and persist order creation, delivery updates, and deletion through
json-server.

## Result

- Replaced the duplicate and invalid form imports with the existing default
  `OrderForm` export.
- Routed GET, POST, PATCH, and DELETE through the `initialComenzi` resource.
- Removed the duplicate local toggle after a successful PATCH and surfaced
  mutation errors in the app.
- Added the requested test IDs for order cards, form controls, empty, loading,
  and error states. The payment field selector uses the `payment_method` key
  from the data model.
- Updated README run instructions, Stage 7 status, CRUD documentation, and the
  complete test ID reference table.

## Validation

- `npm run lint` in `frontend/`: passed.
- `npm run build` in `frontend/`: passed.
- Editor diagnostics for the touched React files: no errors.
- POST, PATCH, and DELETE against an isolated json-server fixture: passed; the
  project database was not changed and the temporary fixture was removed.
- No Git commands, commit, or push were performed.
