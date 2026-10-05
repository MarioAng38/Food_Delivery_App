# Stage 2: AI log

## Tools

- Claude Code (desktop app, Code tab)

## Conversations

- moving the order data into JavaScript and writing the immutable data functions, tested in the browser console

## Key requests

### 1. Data logic in JavaScript, following the stage 2 brief

- Asked: update the JavaScript file's alreadt existing variables added by user and `index.html` to fulfil all stage 2 requirements (array of objects with id, list / count / search / add with validation / toggle / delete, console tests grouped in sections).
- Got: `comenzi.js` rewritten with no DOM code: the functions `listeazaNume`, `numaraNelivrate`, `cautaDupaNume`, `nextId` (max id + 1 with `reduce`), `adaugaComanda`, `comutaLivrata` and `stergeComanda`, all returning new arrays (`map`, `filter`, spread). Search matches the order name or the restaurant, case-insensitive. Validation rejects an empty name, a name over 100 chars, an unknown payment method and an unknown restaurant. Manual tests are grouped into Citire / Adăugare / Modificare și ștergere / Validare.
- Changed or rejected: my previous version rendered the list with `document` and mutated orders in the checkbox handler; that was dropped because stage 2 forbids touching the page. The 3 static orders were put back in `index.html` so the page stays identical to stage 1.

### 2. Checking the results

- Asked: verify that the functions work.
- Got: the file was run once to check the output: the original array stays at 3 orders after adding, the next id is 5 after deleting id 3, and both invalid adds print an error without stopping the script.
- Changed or rejected: nothing; I also checked it in the browser console (F12) as the brief requires.

## What I learned / what did not work

`map`, `filter`, `find` and `reduce` never change the original array, so combined with spread (`[...lista, nou]`, `{ ...c, delivered: !c.delivered }`) every function stays immutable.
The new id must be the highest existing id + 1, not `lista.length + 1`, otherwise deleting an order produces duplicate ids.
Keeping logic and UI separate meant throwing away my DOM rendering code for now; it comes back in React in stage 5.
