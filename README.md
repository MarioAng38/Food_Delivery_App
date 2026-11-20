# Food Delivery App

Manages food orders placed by customers at partner restaurants.
For customers who want to track what they ordered, how they paid, and which orders were delivered.

## Data model

| Field          | Type         | Notes                                      |
| -------------- | ------------ | ------------------------------------------ |
| name           | text         | required, max 100 chars (what was ordered) |
| quantity       | number       | positive whole number                      |
| delivered      | boolean      | toggled from the list, default false       |
| payment_method | fixed values | CARD_ONLINE, CASH_ON_DELIVERY, APPLE_PAY   |
| restaurant     | relation     | Pizza Napoli, Sushi Zen, Burger House      |
| user           | relation     | the owner of the item (from week 11)       |

Sample data used across all stages:

1. Pizza Margherita x2, active, CARD_ONLINE
2. Sushi Platter (24 pcs), done, CASH_ON_DELIVERY
3. Double Cheeseburger + Fries, active, APPLE_PAY
4. Chicken Wrap Combo, active, CASH_ON_DELIVERY
5. Vegetarian Ramen, done, CARD_ONLINE

## How to run

```sh
cd frontend
npm install
npm run api
```

In a second terminal:

```sh
cd frontend
npm run dev
```

Then open the address printed in the terminal (http://localhost:5173).

## AI usage

| Tool           | Used for                               |
| -------------- | -------------------------------------- |
| Claude Code    | Stage 1: CSS mockup                    |
| Claude Code    | Stage 2: javascript data logic         |
| GitHub Copilot | Stage 6: API loading and documentation |
| GitHub Copilot | Stage 7: Validation and test IDs       |

Details per stage: see the ai-log/ folder.

## Status

- [x] Stage 1: static mockup
- [x] Stage 2: data logic in JavaScript
- [x] Stage 3: The app now lives in `frontend/`, built with Vite. The data from stage 2 moved into the main component; the list is still printed raw.
- [x] Stage 4: The order list is rendered from data through reusable `OrderList` and `OrderCard` components.
- [x] Stage 5: local state and events
- [x] Stage 6: loading data from a mock API
- [x] Stage 7: validated order form and API persistence

## Stage 4: components

`OrderList` receives the complete array and renders one `OrderCard` per order. `OrderCard` receives a single order through props and displays its name, delivery status, restaurant, and payment method. An empty array displays a message instead of a list.

| ID    | Requirement                                  | Where (permalink)                                                                                                                                        | How to check                                     |
| ----- | -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| S4-R1 | At least two components in `src/components/` | [`OrderCard.tsx#L1-L15`](./frontend/src/components/OrderCard.tsx#L1-L15), [`OrderList.tsx#L1-L9`](./frontend/src/components/OrderList.tsx#L1-L9)         | Open the files                                   |
| S4-R2 | Card receives data through props             | [`OrderCard.tsx#L9-L15`](./frontend/src/components/OrderCard.tsx#L9-L15)                                                                                 | Read the `comanda` prop                          |
| S4-R3 | List uses `map` and `key={id}`               | [`OrderList.tsx#L14-L23`](./frontend/src/components/OrderList.tsx#L14-L23)                                                                               | Run the app and check the browser console        |
| S4-R4 | Empty list displays a message                | [`OrderList.tsx#L9-L12`](./frontend/src/components/OrderList.tsx#L9-L12)                                                                                 | Set `comenzi` to `[]`                            |
| S4-R5 | Delivery state changes the card appearance   | [`OrderCard.tsx#L17-L24`](./frontend/src/components/OrderCard.tsx#L17-L24)                                                                               | Toggle the `delivered` value                     |
| S4-R6 | README and AI log updated                    | [`README.md#stage-4-components`](./README.md#stage-4-components), [`etapa-04.md`](./ai-log/etapa-04.md)                                                  | Read these files                                 |
| S4-R7 | Stage 4 commit published on GitHub           | [`ae30355`](https://github.com/MarioAng38/Food_Delivery_App/commit/ae30355), [`0e98fca`](https://github.com/MarioAng38/Food_Delivery_App/commit/0e98fca) | Commits `ae30355` and `0e98fca` pushed to `main` |

## Stage 5: local state and events

The list lives in React state. Checking and deleting work from the page,
and the counters in the header follow automatically. A button in the
header switches between light and dark mode. Changes are lost on refresh,
which is what stage 6 and stage 10 fix.

| ID    | Requirement                                         | Where (permalink)                                                                                                                                             | How to check                                             |
| ----- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| S5-R1 | Order list is kept in `useState` in `App`           | [`App.jsx#L4-L11`](./frontend/src/App.jsx#L4-L11)                                                                                                             | Read the initial list and state declaration              |
| S5-R2 | Toggling updates state and the card appearance      | [`App.jsx#L27-L30`](./frontend/src/App.jsx#L27-L30), [`OrderCard.tsx#L17-L24`](./frontend/src/components/OrderCard.tsx#L17-L24)                               | Toggle an order's checkbox                               |
| S5-R3 | Deleting removes an order with an accessible button | [`App.jsx#L32-L34`](./frontend/src/App.jsx#L32-L34), [`OrderCard.tsx#L31-L38`](./frontend/src/components/OrderCard.tsx#L31-L38)                               | Click **Sterge**; inspect its accessible name            |
| S5-R4 | Undelivered count is derived, not stored            | [`App.jsx#L13`](./frontend/src/App.jsx#L13)                                                                                                                   | Toggle an order and watch the count                      |
| S5-R5 | State updates are immutable                         | [`App.jsx#L27-L34`](./frontend/src/App.jsx#L27-L34)                                                                                                           | Read the `map` and `filter` state updates                |
| S5-R6 | Light/dark toggle uses state and `data-theme`       | [`App.jsx#L14-L24`](./frontend/src/App.jsx#L14-L24), [`App.jsx#L36-L55`](./frontend/src/App.jsx#L36-L55), [`App.css#L23-L65`](./frontend/src/App.css#L23-L65) | Toggle the button with both system color-scheme settings |
| S5-R7 | No console warnings; README and AI log documented   | [`README.md#stage-5-local-state-and-events`](./README.md#stage-5-local-state-and-events), [`etapa-05.md`](./ai-log/etapa-05.md)                               | Check DevTools Console and read both documents           |
| S5-R8 | “Stage 5” commit pushed                             | [`db387fe`](https://github.com/MarioAng38/Food_Delivery_App/commit/db387fe148325f4286d78a0d54669472a67e2363)                                                  | Check commit history                                     |

## Stage 6: loading data from a mock API

Orders are served by json-server from `frontend/db.json`. The app requests
`/comenzi` on mount and displays loading, success, or error feedback.
Stage 7 adds order creation, delivery updates, and deletion through the same
API resource; those changes persist across reloads.

Run the API and app in separate terminals from the repository root:

```sh
cd frontend
npm run api
```

```sh
cd frontend
npm run dev
```

The API is available at http://localhost:3001/comenzi. Set
`VITE_API_URL` in `frontend/.env` to override the default API address.

| ID    | Requirement                                       | Where (permalink)                                                                                                                           | How to check                                   |
| ----- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| S6-R1 | `npm run api` serves JSON from the resource route | [`package.json#L11`](./frontend/package.json#L11), [`db.json`](./frontend/db.json)                                                          | Start the API and open `/comenzi`       |
| S6-R2 | Orders are loaded instead of hard-coded in React  | [`App.jsx`](./frontend/src/App.jsx), [`api.js`](./frontend/src/api.js)                                                                      | Read the initial state and API call            |
| S6-R3 | Loading feedback appears while awaiting the API   | [`App.jsx`](./frontend/src/App.jsx)                                                                                                         | Start API with `--delay 4000`                  |
| S6-R4 | API failures show an actionable error             | [`App.jsx`](./frontend/src/App.jsx)                                                                                                         | Stop the API and refresh                       |
| S6-R5 | Fetch is centralized and API URL is configurable  | [`api.js`](./frontend/src/api.js), [`.env.example`](./frontend/.env.example)                                                                | Search for `fetch`; only `api.js` should match |
| S6-R6 | README checklist and AI log are present           | [`README.md#stage-6-loading-data-from-a-mock-api`](./README.md#stage-6-loading-data-from-a-mock-api), [`etapa-06.md`](./ai-log/etapa-06.md) | Read the stage section and AI log              |
| S6-R7 | Stage 6 commit is published on GitHub             | [`d589d16`](https://github.com/MarioAng38/Food_Delivery_App/commit/d589d16e1a75f797b92d110b2aabfe3350984964)                                | Check commit history                           |

- [x] S6-R1 API starts and its resource route returns JSON
- [x] S6-R2 Orders are not hard-coded in React
- [x] S6-R3 Loading feedback is rendered while waiting
- [x] S6-R4 An actionable error is rendered when the API is unavailable
- [x] S6-R5 Fetch is in `api.js` and the API URL can be configured
- [x] S6-R6 README Stage 6 section and AI log are complete
- [x] S6-R7 Stage 6 commit is published on GitHub

## Stage 7: order form and API persistence

The order form validates the title, quantity, and restaurant before creating
an order. Create, delivery updates, and deletion use the `/comenzi`
resource, so successful changes remain after a page reload. API failures are
shown in the form or beside the order list.

| ID    | Requirement                                    | Where (permalink)                                                                                                                                                                                                       | How to check                                 |
| ----- | ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| S7-R1 | Form validates input and creates an order      | [`OrderForm.tsx`](./frontend/src/components/OrderForm.tsx), [`api.js`](./frontend/src/api.js)                                                                                                                           | Submit valid and invalid form values         |
| S7-R2 | Delivery updates persist through the API       | [`App.jsx`](./frontend/src/App.jsx), [`api.js`](./frontend/src/api.js)                                                                                                                                                  | Toggle a delivery state, then reload         |
| S7-R3 | Deleting an order persists through the API     | [`App.jsx`](./frontend/src/App.jsx), [`api.js`](./frontend/src/api.js)                                                                                                                                                  | Delete an order, then reload                 |
| S7-R4 | Stable test IDs match the selector contract    | [`OrderCard.tsx`](./frontend/src/components/OrderCard.tsx), [`OrderList.tsx`](./frontend/src/components/OrderList.tsx), [`OrderForm.tsx`](./frontend/src/components/OrderForm.tsx), [`App.jsx`](./frontend/src/App.jsx) | Inspect the rendered DOM or query by test ID |
| S7-R5 | Stage implementation and validation are logged | [`etapa-07.md`](./ai-log/etapa-07.md)                                                                                                                                                                                   | Read the AI log and validation results       |
| S7-R5 | Stage 7 commit is published on GitHub          | [`10a45ba`](https://github.com/MarioAng38/Food_Delivery_App/commit/10a45ba7c146d422b313f6f907da2fb95f89b4b6)                                                                                                            | Check commit history                         |

### Test IDs

| Test ID               | Element                                        | Component   |
| --------------------- | ---------------------------------------------- | ----------- |
| `item`                | Order card (`li`), with `data-id={comanda.id}` | `OrderCard` |
| `item-title`          | Order title                                    | `OrderCard` |
| `item-toggle`         | Delivery checkbox                              | `OrderCard` |
| `item-delete`         | Delete button                                  | `OrderCard` |
| `empty`               | Empty-list message                             | `OrderList` |
| `form`                | Order form                                     | `OrderForm` |
| `form-title`          | Order title input                              | `OrderForm` |
| `form-quantity`       | Quantity input                                 | `OrderForm` |
| `form-delivered`      | Delivered checkbox                             | `OrderForm` |
| `form-payment_method` | Payment method field                           | `OrderForm` |
| `form-restaurant`     | Restaurant field                               | `OrderForm` |
| `form-submit`         | Submit button                                  | `OrderForm` |
| `form-error`          | Form validation or submission error            | `OrderForm` |
| `loading`             | Initial loading message                        | `App`       |
| `error`               | Initial API load error                         | `App`       |
| `action-error`        | API mutation error                             | `App`       |

- [x] S7-R1 Form validates values and creates orders through the API
- [x] S7-R2 Delivery changes persist through the API
- [x] S7-R3 Deletions persist through the API
- [x] S7-R4 Test IDs follow the selector contract
- [x] S7-R5 README and AI log document the implementation
