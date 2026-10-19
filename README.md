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
- [ ] Stage 5: local state and events

## Stage 4: components

`OrderList` receives the complete array and renders one `OrderCard` per order. `OrderCard` receives a single order through props and displays its name, delivery status, restaurant, and payment method. An empty array displays a message instead of a list.

| ID    | Requirement                                  | Where                                   | How to check                              |
| ----- | -------------------------------------------- | --------------------------------------- | ----------------------------------------- |
| S4-R1 | At least two components in `src/components/` | `frontend/src/components/`              | Open the folder                           |
| S4-R2 | Card receives data through props             | `frontend/src/components/OrderCard.tsx` | Read the `comanda` prop                   |
| S4-R3 | List uses `map` and `key={id}`               | `frontend/src/components/OrderList.tsx` | Run the app and check the browser console |
| S4-R4 | Empty list displays a message                | `frontend/src/components/OrderList.tsx` | Set `comenzi` to `[]`                     |
| S4-R5 | Delivery state changes the card appearance   | `frontend/src/components/OrderCard.tsx` | Toggle the `delivered` value              |
| S4-R6 | README and AI log updated                    | `README.md`, `ai-log/etapa-04.md`       | Read these files                          |
| S4-R7 | Stage 4 commit published on GitHub           | Git history                             | Pending publication                       |
