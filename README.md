# Food Delivery App

Manages food orders placed by customers at partner restaurants.
For customers who want to track what they ordered, how they paid, and which orders were delivered.

## Data model

| Field          | Type         | Notes                                      |
| -------------- | ------------ | ------------------------------------------ |
| name           | text         | required, max 100 chars (what was ordered) |
| delivered      | boolean      | toggled from the list, default false       |
| payment_method | fixed values | CARD_ONLINE, CASH_ON_DELIVERY, APPLE_PAY   |
| restaurant     | relation     | Pizza Napoli, Sushi Zen, Burger House      |
| user           | relation     | the owner of the item (from week 11)       |

Sample data used across all stages:

1. Pizza Margherita x2, active, CARD_ONLINE
2. Sushi Platter (24 pcs), done, CASH_ON_DELIVERY
3. Double Cheeseburger + Fries, active, APPLE_PAY

## How to run

cd frontend
npm install
npm run dev
Then open the address printed in the terminal (http://localhost:5173).

## AI usage

| Tool        | Used for                       |
| ----------- | ------------------------------ |
| Claude Code | Stage 1: CSS mockup            |
| Claude Code | Stage 2: javascript data logic |

Details per stage: see the ai-log/ folder.

## Status

- [x] Stage 1: static mockup
- [x] Stage 2: data logic in JavaScript
- [x] Stage 3: The app now lives in `frontend/`, built with Vite. The data from stage 2 moved into the main component; the list is still printed raw.
- [x] Stage 4: The order list is rendered from data through reusable `OrderList` and `OrderCard` components.
- [x] Stage 5: local state and events
- [ ] Stage 6: loading data from a mock API

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
