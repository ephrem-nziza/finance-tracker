# Student Finance Tracker

A small web app that helps students keep track of what they spend. I built it with plain HTML, CSS and JavaScript, with no frameworks.

- Live site: https://ephrem-nziza.github.io/finance-tracker/
- Demo video: https://youtu.be/ZTcizJcXP2Y

## Theme
I chose the Student Finance Tracker (budgets, transactions and search).

## Features
- Add, edit and delete transactions (delete asks you to confirm)
- Records show in a table on big screens and as cards on phones
- Sort by date, description (A to Z or Z to A) and amount (low to high or high to low)
- Live regex search with an "Ignore case" box. Matches are highlighted with `<mark>`. A pattern that is not valid does not break the page
- Dashboard with total records, total spent, top category and a last 7 days chart
- Spending cap in Settings. The message says how much is left, or how much you are over
- Currency settings: a base currency and two others, with rates that I type in by hand (no API)
- Everything saves in localStorage by itself
- Export the records to a JSON file, and import them back. The file is checked before it loads
- `seed.json` has 11 test records, including edge cases

## Pages
About, Dashboard, Records, Add/Edit form and Settings. They are all sections on one page, so the menu jumps to each one.

## Data model
Every record looks like this:

    {
      "id": "rec_0001",
      "description": "Lunch at cafeteria",
      "amount": 12.5,
      "category": "Food",
      "date": "2026-10-09",
      "createdAt": "2026-10-09T10:00:00.000Z",
      "updatedAt": "2026-10-09T10:00:00.000Z"
    }

`updatedAt` changes every time a record is edited.

## Regex catalog
- Description: `^\S(?:.*\S)?$` — no space at the start or end. Good: `Lunch at cafeteria`. Bad: ` Lunch`
- Amount: `^(0|[1-9]\d*)(\.\d{1,2})?$` — a number with up to 2 decimals. Good: `12.50`. Bad: `12.505`, `007`
- Date: `^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$` — YYYY-MM-DD. Good: `2026-10-09`. Bad: `2026-13-45`
- Category: `^[A-Za-z]+(?:[ -][A-Za-z]+)*$` — letters, spaces and hyphens. Good: `Self-Care`. Bad: `Food2`
- Repeated words (advanced, back-reference): `\b(\w+)\s+\1\b` — finds a word written twice. Bad: `coffee coffee`
- Currency code: `^[A-Z]{3}$` — three capital letters. Good: `USD`
- Exchange rate: `^(0|[1-9]\d*)(\.\d{1,4})?$` — Good: `0.92`, `1300`
- Import id: `^rec_\d{4,}$` — Good: `rec_0001`

Some search ideas to try in the search box:
- `\.\d{2}\b` finds amounts with cents
- `(coffee|tea)` finds drinks
- `\b(\w+)\s+\1\b` finds repeated words

## Keyboard map
| Key | What it does |
|---|---|
| Tab / Shift + Tab | Move to the next / previous item |
| Tab (first press) | Shows the "Skip to content" link |
| Enter | Press a link or button, or send the form |
| Space | Press a button or tick the "Ignore case" box |
| Arrow up / down | Change the Sort by option |
| Enter or Esc | Confirm or cancel the delete box |

## Accessibility notes
- Landmarks: header, nav, main, sections and footer, with headings in order
- Skip link at the top and a clear orange outline on focused items
- Every input has a label, and error messages are linked to their input with `aria-describedby`
- Messages use `role="status"`. The cap message is polite when you are under the cap, and assertive (`role="alert"`) when you go over
- Buttons in the table have labels that include the description, like "Edit Lunch"
- Colors were chosen for good contrast, and the animations stop if the device asks for reduced motion
- The whole app can be used with only the keyboard

## How to run it
The scripts use ES modules, so the page needs a small server. It will not work if you just open the file.

    git clone https://github.com/ephrem-nziza/finance-tracker.git
    cd finance-tracker
    python3 -m http.server 8080

Then open http://localhost:8080

## How to run the tests
With the server running, open http://localhost:8080/tests.html. The page runs the regex checks and should say `22 passed, 0 failed`.

## Try the seed data
In Settings, press "Choose File" under Import JSON and pick `seed.json`. It replaces your records with
 11 test ones.

## Project files
- `index.html`, `tests.html`, `seed.json`
- `styles/main.css`
- `scripts/validators.js` (regex rules), `storage.js` (localStorage), `state.js` (the records), `ui.js
` (the table), `search.js` (safe regex search), `stats.js` (dashboard), `settings.js` (currencies), `d
ata.js` (import and export), `main.js` (connects everything)

## Wireframes
My sketches are in the `assets` folder.

## Author
Ephrem Nziza
- GitHub: https://github.com/ephrem-nziza
- Email: e.nziza@alustudent.com