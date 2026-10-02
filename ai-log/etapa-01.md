# Stage 1: AI log

## Tools

- Claude Code (desktop app, Code tab)

## Conversations

- <share link> (generating the stage 1 static mockup from the ProiectBD database project, restyling it, setting up git)

## Key requests

### 1. Initial mockup from existing project

- Asked: create `style.css` based on the source code in Proiect_TW, as a barebones but visually pleasant mockup, with the README following the course template.
- Got: Dark colour palette for the ProiectBD React frontend.
- Changed or rejected: moved the files into `src/` (`src/index.html`, `src/css/style.css`) for a cleaner structure, and tidied the README tables.

### 2. Restyle to match a reference design

- Asked: update the CSS to follow the design language of a food delivery landing page screenshot (yellow hero, green pill buttons, bold rounded type).
- Got: a new stylesheet with a yellow curved header band, white shadowed cards overlapping it, green pill buttons, cream/mint labels and the Nunito font from Google Fonts. No HTML changes needed.
- Changed or rejected: kept it CSS-only for now; the hero image and round restaurant photos were left out because they need image assets.

## What I learned / what did not work

A visual reference screenshot gets a much closer result than describing the style in words.
The AI could not preview the page in its built-in browser, so the styling had to be checked manually in a normal browser.
