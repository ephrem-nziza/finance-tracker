# Student Finance Tracker: Wireframe Spec

Live site: https://ephrem-nziza.github.io/finance-tracker/
Version: 1.0 (2026-10-16)
Author: Ephrem Nziza

## 1. Overview

Student Finance Tracker is a single-page web app that helps a student log expenses, see a spending summary, and stay under a spending cap. It works on desktop and mobile. All data lives in the browser and moves in and out as JSON.

This spec describes the wireframes for 4 screens in 2 layouts (web at 1280 px, mobile at 390 px), 8 screens in total. It is based on the live site and on screenshots of it.

## 2. Deliverables

| File | Layout | Screen | Canvas size |
| --- | --- | --- | --- |
| web-home.svg | Web | About + Dashboard | 1280 x 990 |
| web-records.svg | Web | Records | 1280 x 1200 |
| web-add.svg | Web | Add or Edit a Transaction | 1280 x 640 |
| web-settings.svg | Web | Settings | 1280 x 1120 |
| mobile-home.svg | Mobile | About + Dashboard | 390 x 880 |
| mobile-records.svg | Mobile | Records | 390 x 1280 |
| mobile-add.svg | Mobile | Add or Edit a Transaction | 390 x 560 |
| mobile-settings.svg | Mobile | Settings | 390 x 1000 |

The same screens also exist as a clickable canvas (Design artifact) with live form controls.

## 3. Design tokens

### Colors

| Token | Hex | Use |
| --- | --- | --- |
| brand-green | #217346 | Header, card top border, buttons, chart bar fill |
| heading-green | #1b5e3c | Section headings (About, Dashboard, Records, Add, Settings) |
| page-bg | #f2f2f2 | Page background, empty bar track |
| card-bg | #ffffff | Cards, inputs |
| card-border | #dddddd | Card and table borders |
| table-head | #e2efda | Table header row, footer background |
| table-zebra | #f2f8ef | Every second table row |
| input-border | #767676 | Inputs, selects, file box |
| text | #222222 | Body text |
| link | #0066cc | Links (underlined) |
| top-strip | #333333 | 3 px strip at the very top of the header |
| on-brand | #ffffff | Text on green |

Colors were matched by eye from screenshots. Replace them with the exact values from the site CSS if they differ.

### Typography

Font family: Arial, Helvetica, sans-serif.

| Role | Web | Mobile | Weight |
| --- | --- | --- | --- |
| Site title (header) | 26 px | 19 px | Bold, white |
| Section heading (h2) | 24 px | 23 px | Bold, heading-green |
| Sub heading (h3) | 18 px | 17 px | Bold |
| Body, labels, table cells | 15 px | 15 px (14 px for chart rows and long labels) | Regular, labels bold |

### Spacing and shape

- No rounded corners. Buttons, inputs and cards are square.
- Card: 1 px border, 4 px brand-green top border, 18 px padding on web and 16 px on mobile.
- Gap between cards: 18 px on web, 14 px on mobile.
- Inputs are 40 px high. Buttons are 38 px high with 18 px horizontal padding.

## 4. Global layout

### Web (1280 px)

- Header: 86 px high, brand-green, 3 px #333 strip on top. Title on the left at 40 px from the edge. Nav on the right: About, Dashboard, Records, Add, Settings (15 px, white, 36 px apart).
- Content column: 950 px wide, centered, 24 px above the first card.
- Footer (on the last screen): pale green band, 104 px high, centered text "© 2026 Student Finance Tracker. All rights reserved."

### Mobile (390 px)

- Header: 58 px high, brand-green, same top strip. Title on the left. Hamburger button on the right (44 x 38 px, white 1 px outline, three white lines).
- Cards: 10 px from the left and right edges, 370 px wide.
- Footer: 94 px high, same pale green and text.
- Nav links sit behind the hamburger button. The open menu was not captured in the screenshots, so it is not drawn.

## 5. Components

- **Text input:** 40 px high, 1 px input-border, white fill, 10 px left padding. Placeholder text is gray (#8a8a8a).
- **Select:** same as input, with a chevron on the right edge.
- **Date input:** native date field, 180 px wide, shows dd/mm/yyyy with a calendar icon.
- **Amount input:** 180 px wide, shorter than the other fields.
- **Checkbox:** 14 px square, blue when checked, label in bold.
- **Button:** brand-green fill, white 15 px text, no border.
- **File input:** 46 px high box with a native "Choose File" button and "No file chosen" text.
- **Bar row (Last 7 Days):** label (MM-DD), a 16 px track on web or 14 px on mobile, and a value on the right. The fill is brand-green and its width is the day total divided by the largest day total.
- **Records table (web):** 5 columns: Date 141 px, Description 240 px, Category 166 px, Amount 113 px, Actions 254 px. Header row 47 px, data rows 73 px, zebra fill. Each row has an Edit and a Delete button.
- **Record card (mobile):** bordered box with 5 rows (Date, Description, Category, Amount, Actions). Labels are bold on the left, values are right-aligned. Edit and Delete sit on the right of the Actions row.

## 6. Screen specs

### 6.1 Home (About + Dashboard)

Two stacked cards.

**About card**
1. Heading "About".
2. "This is a student finance tracker application that allows you to manage your expenses."
3. "Github:" with a link to the author's GitHub profile.
4. "LinkedIn:" with a mailto link to e.nziza@alustudent.com.

**Dashboard card**
1. Heading "Dashboard".
2. "View your financial summary and recent transactions."
3. Bulleted list:
   - Total Records: 11
   - Total Spent: $14375.74
   - Top Category: Books
4. Converted totals line: "Total In USD: 14375.74. In EUR: 13225.68. In RWF: 20844823.00."
5. Sub heading "Last 7 Days", then 7 bar rows, one per day from 6 days ago to today (10-10 to 10-16 in the sample). Only 10-11 has spending (20.00), so only that bar is filled.
6. Cap line: "You have 985624.26 left of your 1000000.00 cap".

### 6.2 Records

One card, top to bottom:
1. Heading "Records".
2. Label "Search (regex)" and a full-width text input with placeholder "Search records".
3. Checkbox "Ignore Case", checked by default.
4. Label "Sort by:" and a select with 6 options:
   - Date (newest first) (default)
   - Date (oldest first)
   - Description (A-Z)
   - Description (Z-A)
   - Amount (highest first)
   - Amount (lowest first)
5. Caption "All transactions".
6. Table on web, record cards on mobile. Columns: Date, Description, Category, Amount, Actions (Edit, Delete).

### 6.3 Add or Edit a Transaction

One card with these fields in order:
1. Description: full-width text input.
2. Amount: short text input.
3. Category: select with "Choose a category" as the first option, then Food, Transport, Education, Other.
4. Date(YYYY-MM-DD): date input.
5. Buttons: Save, Cancel (side by side, 12 px apart).

The same form is used for adding a new record and for editing an existing one. Edit mode opens with the row values filled in.

### 6.4 Settings

One card with three groups:

**Spending Cap**
- Cap amount: text input (sample value 1000000).

**Currencies** (5 fields, full width, in this order)
- Base Currency (3 letters): USD
- Second Currency (3 letters): EUR
- Rate: how many of the second currency for 1 base: 0.92
- Third Currency (3 letters): RWF
- Rate: how many of the third currency for 1 base: 1450

**Data**
- Export JSON button.
- Import JSON file input.

The footer closes this screen.

## 7. Data

### Transaction

| Field | Type | Notes |
| --- | --- | --- |
| description | string | Required |
| amount | number | Shown with 2 decimals |
| category | string | Chosen from the Category select |
| date | string | YYYY-MM-DD |

### Settings

| Field | Type | Sample |
| --- | --- | --- |
| cap | number | 1000000 |
| baseCurrency | string (3 letters) | USD |
| secondCurrency, secondRate | string, number | EUR, 0.92 |
| thirdCurrency, thirdRate | string, number | RWF, 1450 |

### Sample records used in the wireframes

| Date | Description | Category | Amount |
| --- | --- | --- | --- |
| 2026-10-11 | haircut | Self-Care | 20.00 |
| 2026-10-09 | Lunch at cafeteria | Food | 12.50 |
| 2026-09-28 | Coffee with friends | Entertainment | 8.75 |
| 2026-09-23 | Chemistry textbook | Books | 9999.99 |
| 2026-09-20 | Bus pass | Transport | 55.00 |
| 2026-08-15 | Tuition fee payment | Fees | 3000.00 |
| 2026-03-10 | Snacks | Other | 10.00 |
| 2026-01-01 | Laptop repair | Other | 1250.99 |
| 2024-02-29 | Leap day snack | Food | 0.01 |

The app holds 11 records. The wireframes show the 9 visible in the screenshots, so their amounts add up to less than the $14375.74 total.

## 8. Behavior

### Seen on the live site
- Nav links jump to the About, Dashboard, Records, Add and Settings sections of one long page.
- Records can be searched with a regular expression, with a case toggle, and sorted 6 ways.
- Totals are shown in the base currency and converted to the second and third currencies.
- The remaining cap is shown as cap minus total spent.
- Settings data can be exported to and imported from a JSON file.

### Calculations (checked against the sample data)
- Cap left = cap minus total spent: 1000000.00 - 14375.74 = 985624.26.
- Converted total = total spent x rate: 14375.74 x 0.92 = 13225.68 (EUR), 14375.74 x 1450 = 20844823.00 (RWF).
- Top category = category with the highest summed amount (Books, 9999.99 in the sample).

### Assumed, not confirmed
- Delete asks for confirmation before removing a record.
- Save validates the form and shows an error message under the field that failed.
- An invalid regex in the search box shows an error and does not filter.
- The hamburger menu lists the same 5 links as the web nav.
- Cap warning: the cap line changes style when spending passes the cap.

## 9. Responsive rules

- Breakpoint: switch from the web layout to the mobile layout below roughly 600 px wide.
- Nav: inline links on web, hamburger button on mobile.
- Records: table on web, stacked record cards on mobile. A table that cannot fit scrolls sideways inside its card.
- Forms: fields stay full width, except Amount and Date, which stay 180 px.
- Cards keep the green top border at every size.

## 10. Accessibility

- Every input has a visible label tied to it (for and id).
- Text contrast: white on #217346 is about 5.3:1 and passes AA. Heading-green on white also passes.
- Icon-only buttons (hamburger) need an aria-label such as "Open menu".
- Tap targets: buttons are 38 px high on both layouts, and the hamburger is 44 px wide. Raise buttons to 44 px if touch use is a priority.
- Chart rows carry their numeric value as text, so the information does not depend on bar length or color.

## 11. Open questions

1. The Category select lists Food, Transport, Education and Other, but the saved records also use Self-Care, Entertainment, Books and Fees. Decide whether the select should include these.
2. The Date label says YYYY-MM-DD but the field shows dd/mm/yyyy. Pick one format and use it in the label and in the field.
3. Amounts show as plain numbers in the table (20.00) but with a dollar sign in the summary ($14375.74). Decide whether to show the currency symbol everywhere.
4. Should the 7-day chart show a total of the week, and should it use the same scale at all times?
5. Should the cap show a warning at a threshold (for example 80 percent) before it is exceeded?