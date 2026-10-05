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

Open `src/index.html` in a browser. No build step, no server.

## AI usage

| Tool        | Used for                       |
| ----------- | ------------------------------ |
| Claude Code | Stage 1: CSS mockup            |
| Claude Code | Stage 2: javascript data logic |

Details per stage: see the ai-log/ folder.

## Status

- [x] Stage 1: static mockup
- [x] Stage 2: data logic in JavaScript
