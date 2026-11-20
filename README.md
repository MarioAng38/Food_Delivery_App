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

| Tool           | Used for                                        |
| -------------- | ----------------------------------------------- |
| Claude Code    | Stage 1: CSS mockup                             |
| Claude Code    | Stage 2: javascript data logic                  |
| GitHub Copilot | Stage 6: API loading and documentation          |
| GitHub Copilot | Stage 7: Validation and test IDs                |
| Claude Code    | Stage 8: Validation for routing and CSS Modules |

Details per stage: see the ai-log/ folder.

## Status

- [x] Stage 1: static mockup
- [x] Stage 2: data logic in JavaScript
- [x] Stage 3: The app now lives in `frontend/`, built with Vite. The data from stage 2 moved into the main component; the list is still printed raw.
- [x] Stage 4: The order list is rendered from data through reusable `OrderList` and `OrderCard` components.
- [x] Stage 5: local state and events
- [x] Stage 6: loading data from a mock API
- [x] Stage 7: validated order form and API persistence
- [x] Stage 8: routing, detail page, and CSS Modules

## Stage 1: static mockup

A static HTML and CSS page in `mockup/`: the header, the order form with a text
field and fixed lists, and the order list with three sample orders, one of them
marked as delivered. Two columns on desktop, one column below 700px, a dark
theme that follows the system setting, and a visible focus outline for keyboard
navigation. Open `mockup/index.html` in a browser.

| ID    | Requirement                                          | Where (permalink)                                                                                                                       | How to check                    |
| ----- | ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| S1-R1 | README: description, fields, test items, how to run  | [`README.md`](./README.md)                                                                                                              | Read                            |
| S1-R2 | AI usage section                                     | [`README.md#ai-usage`](./README.md#ai-usage)                                                                                            | Read                            |
| S1-R3 | AI log for stage 1                                   | [`etapa-01.md`](./ai-log/etapa-01.md)                                                                                                   | Read                            |
| S1-R4 | Header, form (text + select), list with three orders | [`index.html#L10-L13`](./mockup/index.html#L10-L13), [`index.html#L18-L31`](./mockup/index.html#L18-L31), [`index.html#L44-L63`](./mockup/index.html#L44-L63) | Open the page                   |
| S1-R5 | The delivered order looks different                  | [`style.css#L169`](./mockup/css/style.css#L169)                                                                                               | Look at the second order        |
| S1-R6 | Two columns on desktop, one below 700px              | [`style.css#L77-L86`](./mockup/css/style.css#L77-L86), [`style.css#L182-L186`](./mockup/css/style.css#L182-L186)                                    | Resize the window below 700px   |
| S1-R7 | Visible focus, readable dark theme                   | [`style.css#L128-L135`](./mockup/css/style.css#L128-L135), [`style.css#L20-L38`](./mockup/css/style.css#L20-L38)                                    | Press Tab; switch to dark mode  |
| S1-R8 | "Stage 1" commit pushed                              | [`1e53e9f`](https://github.com/MarioAng38/Food_Delivery_App/commit/1e53e9fef5435444edc29a115a31e2fa0fb4222e)                                                                      | Check commit history            |

- [x] S1-R1 The theme is approved, and the README has the description, fields, test items, and how to run
- [x] S1-R2 The README has the AI usage section
- [x] S1-R3 `ai-log/etapa-01.md` is complete
- [x] S1-R4 The page has the header, the form with the text field and fixed lists, and three order cards
- [x] S1-R5 One card is visibly marked as delivered
- [x] S1-R6 Two columns on desktop, one column below 700px
- [x] S1-R7 Focus is visible with Tab, and the dark theme is readable
- [x] S1-R8 The code is in a public GitHub repository, with the Stage 1 commit

## Stage 2: data logic

Plain JavaScript, no DOM. `mockup/comenzi.js` holds the order array and the
functions that read and change it. Results are printed in the browser console
(F12) when `mockup/index.html` is opened.

| ID    | Requirement                                              | Where (permalink)                                                                                                       | How to check                |
| ----- | -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| S2-R1 | JS file linked, logs when the page opens                 | [`index.html#L67`](./mockup/index.html#L67)                                                                                   | Open the page, press F12    |
| S2-R2 | 3+ orders with id, name, state, and fixed label          | [`comenzi.js#L4-L8`](./mockup/comenzi.js#L4-L8)                                                                               | Read                        |
| S2-R3 | List, count, search, add, toggle, delete                 | [`comenzi.js#L10-L57`](./mockup/comenzi.js#L10-L57)                                                                           | Console output              |
| S2-R4 | Adding rejects an empty name and an unknown label        | [`comenzi.js#L29-L49`](./mockup/comenzi.js#L29-L49), [`comenzi.js#L77-L79`](./mockup/comenzi.js#L77-L79)                            | Last two console lines      |
| S2-R5 | The original array stays unchanged                       | [`comenzi.js#L68`](./mockup/comenzi.js#L68)                                                                                   | Console line                |
| S2-R6 | README Stage 2 section and AI log                        | [`README.md#stage-2-data-logic`](./README.md#stage-2-data-logic), [`etapa-02.md`](./ai-log/etapa-02.md)                 | Read                        |
| S2-R7 | "Stage 2" commit pushed                                  | [`442e4d3`](https://github.com/MarioAng38/Food_Delivery_App/commit/442e4d3628ca01536babc096c4afd4518605a3ba)                                                      | Check commit history        |

- [x] S2-R1 The JavaScript file is linked to the page and logs to the console when it opens
- [x] S2-R2 The array has at least three orders, each with id, name, state, and fixed label
- [x] S2-R3 Listing, counting, searching, adding, toggling, and deleting work
- [x] S2-R4 Adding rejects an empty name and an unknown label, with a console message
- [x] S2-R5 The original array is unchanged after adding, shown in the console
- [x] S2-R6 README Stage 2 section and `ai-log/etapa-02.md` are complete
- [x] S2-R7 Stage 2 commit is published on GitHub

## Stage 3: Vite and React project

The app lives in `frontend/`, built with Vite and React. The orders from the
README are rendered by the main component, with the app name and a counter
computed from the data. The Stage 1 styles are reused.

| ID    | Requirement                                   | Where (permalink)                                                                                                                                  | How to check                     |
| ----- | --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| S3-R1 | `npm run dev` starts without errors           | [`package.json`](./frontend/package.json)                                                                                                          | `npm install`, `npm run dev`     |
| S3-R2 | App name and counter                          | [`App.jsx#L8-L22`](https://github.com/MarioAng38/Food_Delivery_App/blob/d1e9f4441397e7fbc74e81597ab3aa3104aab9d5/frontend/src/App.jsx#L8-L22)                                                 | Edit the data, save              |
| S3-R3 | Data from the README, not from the example    | [`App.jsx#L1-L5`](https://github.com/MarioAng38/Food_Delivery_App/blob/d1e9f4441397e7fbc74e81597ab3aa3104aab9d5/frontend/src/App.jsx#L1-L5)                                                   | Compare with the README          |
| S3-R4 | Stage 1 styles reused                         | [`App.css`](https://github.com/MarioAng38/Food_Delivery_App/blob/d1e9f4441397e7fbc74e81597ab3aa3104aab9d5/frontend/src/App.css)                                                               | Look at the page                 |
| S3-R5 | `node_modules` ignored; `npm run build` works | [`.gitignore`](./frontend/.gitignore)                                                                                                              | `npm run build`                  |
| S3-R6 | README Stage 3 section and AI log             | [`README.md#stage-3-vite-and-react-project`](./README.md#stage-3-vite-and-react-project), [`etapa-03.md`](./ai-log/etapa-03.md)                    | Read                             |
| S3-R7 | "Stage 3" commit pushed                       | [`d1e9f44`](https://github.com/MarioAng38/Food_Delivery_App/commit/d1e9f4441397e7fbc74e81597ab3aa3104aab9d5)                                                                                 | Check commit history             |

- [x] S3-R1 `npm run dev` starts without errors
- [x] S3-R2 The page shows the app name and a counter computed from the data
- [x] S3-R3 The data comes from the README, not from the example
- [x] S3-R4 The Stage 1 styles are reused in the app
- [x] S3-R5 `node_modules/` is not on GitHub, and `npm run build` runs without errors
- [x] S3-R6 README updated and `ai-log/etapa-03.md` complete
- [x] S3-R7 Stage 3 commit is published on GitHub

## Stage 4: components

`OrderList` receives the complete array and renders one `OrderCard` per order. `OrderCard` receives a single order through props and displays its name, delivery status, restaurant, and payment method. An empty array displays a message instead of a list.

| ID    | Requirement                                  | Where (permalink)                                                                                                                                        | How to check                                     |
| ----- | -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| S4-R1 | At least two components in `src/components/` | [`OrderCard.tsx#L1-L15`](https://github.com/MarioAng38/Food_Delivery_App/blob/ae30355137fdf7cee27dddf5383cfe84bc3582f6/frontend/src/components/OrderCard.tsx#L1-L15), [`OrderList.tsx#L1-L9`](https://github.com/MarioAng38/Food_Delivery_App/blob/ae30355137fdf7cee27dddf5383cfe84bc3582f6/frontend/src/components/OrderList.tsx#L1-L9)         | Open the files                                   |
| S4-R2 | Card receives data through props             | [`OrderCard.tsx#L9-L15`](https://github.com/MarioAng38/Food_Delivery_App/blob/ae30355137fdf7cee27dddf5383cfe84bc3582f6/frontend/src/components/OrderCard.tsx#L9-L15)                                                                                 | Read the `comanda` prop                          |
| S4-R3 | List uses `map` and `key={id}`               | [`OrderList.tsx#L14-L23`](https://github.com/MarioAng38/Food_Delivery_App/blob/ae30355137fdf7cee27dddf5383cfe84bc3582f6/frontend/src/components/OrderList.tsx#L14-L23)                                                                               | Run the app and check the browser console        |
| S4-R4 | Empty list displays a message                | [`OrderList.tsx#L9-L12`](https://github.com/MarioAng38/Food_Delivery_App/blob/ae30355137fdf7cee27dddf5383cfe84bc3582f6/frontend/src/components/OrderList.tsx#L9-L12)                                                                                 | Set `comenzi` to `[]`                            |
| S4-R5 | Delivery state changes the card appearance   | [`OrderCard.tsx#L17-L24`](https://github.com/MarioAng38/Food_Delivery_App/blob/ae30355137fdf7cee27dddf5383cfe84bc3582f6/frontend/src/components/OrderCard.tsx#L17-L24)                                                                               | Toggle the `delivered` value                     |
| S4-R6 | README and AI log updated                    | [`README.md#stage-4-components`](./README.md#stage-4-components), [`etapa-04.md`](./ai-log/etapa-04.md)                                                  | Read these files                                 |
| S4-R7 | Stage 4 commit published on GitHub           | [`ae30355`](https://github.com/MarioAng38/Food_Delivery_App/commit/ae30355), [`0e98fca`](https://github.com/MarioAng38/Food_Delivery_App/commit/0e98fca) | Commits `ae30355` and `0e98fca` pushed to `main` |

## Stage 5: local state and events

The list lives in React state. Checking and deleting work from the page,
and the counters in the header follow automatically. A button in the
header switches between light and dark mode. Changes are lost on refresh,
which is what stage 6 and stage 10 fix.

| ID    | Requirement                                         | Where (permalink)                                                                                                                                             | How to check                                             |
| ----- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| S5-R1 | Order list is kept in `useState` in `App`           | [`App.jsx#L4-L11`](https://github.com/MarioAng38/Food_Delivery_App/blob/db387fe148325f4286d78a0d54669472a67e2363/frontend/src/App.jsx#L4-L11)                                                                                                             | Read the initial list and state declaration              |
| S5-R2 | Toggling updates state and the card appearance      | [`App.jsx#L27-L30`](https://github.com/MarioAng38/Food_Delivery_App/blob/db387fe148325f4286d78a0d54669472a67e2363/frontend/src/App.jsx#L27-L30), [`OrderCard.tsx#L17-L24`](https://github.com/MarioAng38/Food_Delivery_App/blob/db387fe148325f4286d78a0d54669472a67e2363/frontend/src/components/OrderCard.tsx#L17-L24)                               | Toggle an order's checkbox                               |
| S5-R3 | Deleting removes an order with an accessible button | [`App.jsx#L32-L34`](https://github.com/MarioAng38/Food_Delivery_App/blob/db387fe148325f4286d78a0d54669472a67e2363/frontend/src/App.jsx#L32-L34), [`OrderCard.tsx#L31-L38`](https://github.com/MarioAng38/Food_Delivery_App/blob/db387fe148325f4286d78a0d54669472a67e2363/frontend/src/components/OrderCard.tsx#L31-L38)                               | Click **Sterge**; inspect its accessible name            |
| S5-R4 | Undelivered count is derived, not stored            | [`App.jsx#L13`](https://github.com/MarioAng38/Food_Delivery_App/blob/db387fe148325f4286d78a0d54669472a67e2363/frontend/src/App.jsx#L13)                                                                                                                   | Toggle an order and watch the count                      |
| S5-R5 | State updates are immutable                         | [`App.jsx#L27-L34`](https://github.com/MarioAng38/Food_Delivery_App/blob/db387fe148325f4286d78a0d54669472a67e2363/frontend/src/App.jsx#L27-L34)                                                                                                           | Read the `map` and `filter` state updates                |
| S5-R6 | Light/dark toggle uses state and `data-theme`       | [`App.jsx#L14-L24`](https://github.com/MarioAng38/Food_Delivery_App/blob/db387fe148325f4286d78a0d54669472a67e2363/frontend/src/App.jsx#L14-L24), [`App.jsx#L36-L55`](https://github.com/MarioAng38/Food_Delivery_App/blob/db387fe148325f4286d78a0d54669472a67e2363/frontend/src/App.jsx#L36-L55), [`App.css#L23-L65`](https://github.com/MarioAng38/Food_Delivery_App/blob/db387fe148325f4286d78a0d54669472a67e2363/frontend/src/App.css#L23-L65) | Toggle the button with both system color-scheme settings |
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
| S6-R1 | `npm run api` serves JSON from the resource route | [`package.json#L11`](./frontend/package.json#L11), [`db.json`](./frontend/db.json)                                                          | Start the API and open `/comenzi`              |
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

| ID    | Requirement                                                     | Where (permalink)                                                                                                                                                  | How to check                                  |
| ----- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------- |
| S7-R1 | Controlled form: every field has `value` and `onChange`          | [`OrderForm.tsx#L71-L142`](./frontend/src/components/OrderForm.tsx#L71-L142)                                                                                                   | Read the form fields                          |
| S7-R2 | An empty field shows an error and sends no request              | [`OrderForm.tsx#L19-L43`](./frontend/src/components/OrderForm.tsx#L19-L43)                                                                                                     | Submit the empty form, watch Network          |
| S7-R3 | An added order appears in the list and survives a reload        | [`OrderPage.jsx#L71-L75`](./frontend/src/pages/OrderPage.jsx#L71-L75), [`api.js#L24-L29`](./frontend/src/api.js#L24-L29)                                                                     | Add an order, then reload                     |
| S7-R4 | Ticking and deleting survive a reload                           | [`OrderPage.jsx#L46-L69`](./frontend/src/pages/OrderPage.jsx#L46-L69), [`api.js#L31-L42`](./frontend/src/api.js#L31-L42)                                                                     | Tick and delete an order, then reload         |
| S7-R5 | Button disabled while sending; form clears only after success   | [`OrderForm.tsx#L44-L67`](./frontend/src/components/OrderForm.tsx#L44-L67), [`OrderForm.tsx#L139`](./frontend/src/components/OrderForm.tsx#L139)                                           | Stop the API and submit                       |
| S7-R6 | `tw.json` in the repository root; test IDs from table 7.3       | [`tw.json`](./tw.json), [`OrderCard.tsx`](./frontend/src/components/OrderCard.tsx), [`OrderList.tsx`](./frontend/src/components/OrderList.tsx), [`OrderForm.tsx`](./frontend/src/components/OrderForm.tsx) | Query the test IDs in the console             |
| S7-R7 | README Stage 7 section and AI log                               | [`README.md#stage-7-order-form-and-api-persistence`](./README.md#stage-7-order-form-and-api-persistence), [`etapa-07.md`](./ai-log/etapa-07.md)                    | Read both documents                           |
| S7-R8 | "Stage 7" commit pushed                                         | [`10a45ba`](https://github.com/MarioAng38/Food_Delivery_App/commit/10a45ba7c146d422b313f6f907da2fb95f89b4b6), [`3618bfc`](https://github.com/MarioAng38/Food_Delivery_App/commit/3618bfc62cb68d5513f49b5bcf6ef3f6e5cfc9b5)                                 | Check commit history                          |

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
| `loading`             | Initial loading message                        | `OrderPage` |
| `error`               | Initial API load error                         | `OrderPage` |
| `action-error`        | API mutation error                             | `OrderPage` |

- [x] S7-R1 The form is controlled: every field has `value` and `onChange`
- [x] S7-R2 An empty field shows an error and no request is sent
- [x] S7-R3 An added order appears in the list and stays after a reload
- [x] S7-R4 Ticking and deleting stay after a reload
- [x] S7-R5 The button is disabled while sending, and the form clears only after a successful save
- [x] S7-R6 `tw.json` is in the repository root, and the elements from table 7.3 have their `data-testid`
- [x] S7-R7 README Stage 7 section and `ai-log/etapa-07.md` are complete
- [x] S7-R8 Stage 7 commit is published on GitHub

## Stage 8: routing and detail page

Three pages behind React Router: the order list at `/`, a detail page at
`/comenzi/:id`, and an about page at `/despre`, plus a 404 page for any other
address. The header, navigation, and footer are written once in `Layout`, which
renders the current page through `Outlet`. Each order title is a link to its
detail page. Component and page styles moved to CSS Modules; `index.css` keeps
only the color variables, base elements, and shared classes (`panel`,
`btn-danger`, `info`, `error`). Fixed values and their labels live in
`constants.js`.

| ID    | Requirement                                                   | Where (permalink)                                                                                                                                                                                                                                                                | How to check                              |
| ----- | ------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| S8-R1 | Header navigation changes the page without a reload           | [`App.jsx#L10-L17`](./frontend/src/App.jsx#L10-L17), [`Layout.jsx#L40-L59`](./frontend/src/components/Layout.jsx#L40-L59)                                                                                                                                                        | Click the header links and watch Network  |
| S8-R2 | Clicking an order opens its detail page                       | [`OrderCard.tsx#L42-L48`](./frontend/src/components/OrderCard.tsx#L42-L48), [`OrderDetaliuPage.jsx`](./frontend/src/pages/OrderDetaliuPage.jsx)                                                                                                                                  | Click an order title                      |
| S8-R3 | Refresh on the detail URL works; a missing id shows an error  | [`OrderDetaliuPage.jsx#L13-L48`](./frontend/src/pages/OrderDetaliuPage.jsx#L13-L48)                                                                                                                                                                                              | Refresh `/comenzi/1`, open `/comenzi/999` |
| S8-R4 | An unknown URL shows the app 404 page                         | [`App.jsx#L15`](./frontend/src/App.jsx#L15), [`NotFoundPage.jsx`](./frontend/src/pages/NotFoundPage.jsx)                                                                                                                                                                         | Open `/ceva`                              |
| S8-R5 | Each component has its `.module.css`; `index.css` only shared | [`src/components`](./frontend/src/components), [`src/pages`](./frontend/src/pages), [`index.css`](./frontend/src/index.css)                                                                                                                                                      | Read the files                            |
| S8-R6 | Test IDs from tables 7.3 and 8.2; detail route `/comenzi/:id` | [`Layout.jsx#L40`](./frontend/src/components/Layout.jsx#L40), [`OrderCard.tsx#L28-L64`](./frontend/src/components/OrderCard.tsx#L28-L64), [`OrderDetaliuPage.jsx`](./frontend/src/pages/OrderDetaliuPage.jsx), [`NotFoundPage.jsx#L5`](./frontend/src/pages/NotFoundPage.jsx#L5) | `querySelector` in the console            |
| S8-R7 | README Stage 8 section and AI log                             | [`README.md#stage-8-routing-and-detail-page`](./README.md#stage-8-routing-and-detail-page), [`etapa-08.md`](./ai-log/etapa-08.md)                                                                                                                                                | Read both documents                       |
| S8-R8 | "Stage 8" commit pushed                                       | [`86a49bf`](https://github.com/MarioAng38/Food_Delivery_App/commit/86a49bf78a8a5092de80f18bfd824b52e39a7353)                                                                                                                                                                     | Check commit history                      |

### Test IDs added in Stage 8

`item-link` replaces `item-title` on the order card; all other Stage 7 test IDs
stay on the same elements.

| Test ID            | Element                                    | Component          |
| ------------------ | ------------------------------------------ | ------------------ |
| `nav`              | Header navigation                          | `Layout`           |
| `item-link`        | Order title, now a link to the detail page | `OrderCard`        |
| `detail`           | Detail section, after loading              | `OrderDetaliuPage` |
| `detail-title`     | Order name on the detail page              | `OrderDetaliuPage` |
| `error`, `loading` | Detail page messages                       | `OrderDetaliuPage` |
| `not-found`        | Page for unknown addresses                 | `NotFoundPage`     |

Console checks:

```js
document.querySelectorAll("[data-testid=nav] a").length; // 2
document.querySelector("[data-testid=detail-title]").textContent; // on /comenzi/1
```

- [x] S8-R1 Header navigation changes the page without a reload
- [x] S8-R2 Clicking an order opens its detail page with the correct data
- [x] S8-R3 Refreshing the detail URL works, and a missing id shows an error
- [x] S8-R4 An unknown address shows the app 404 page
- [x] S8-R5 Each component has its own `.module.css`, and `index.css` holds only shared styles
- [x] S8-R6 Test IDs from tables 7.3 and 8.2 are present, and the detail route is `/comenzi/:id`
- [x] S8-R7 README Stage 8 section and `ai-log/etapa-08.md` are complete
- [x] S8-R8 Stage 8 commit is published on GitHub
