# Data Fetching Documentation

## 1. Overview

This project demonstrates data fetching with SWR in Next.js App Router.

The demo uses two API routes:

- /api/orders/[id] — retrieves order status.
- /api/foods?search=...&page=... — searches and paginates food records.

The API routes use sample in-memory data. They are not connected to a production database.

## 2. Shared Fetcher

Location: src/lib/fetcher.js

The shared fetcher uses fetch() and throws an error for unsuccessful HTTP responses.

SWR receives the returned JSON and exposes loading, error, and validation states.

## 3. Order Status

Location: src/app/components/OrderStatus.tsx

The server provides the initial order as initialOrder.

SWR receives that data through fallbackData, then revalidates the order every five seconds using refreshInterval.

Revalidation on window focus is also enabled.

The order formatter functions are imported from src/lib/format.js.

## 4. Food Search

Location: src/app/components/FoodSearch.tsx

Search is debounced by 400 milliseconds.

An empty search term produces a null SWR key, preventing a search request.

When a search term exists, the API receives the search term and page number as query parameters.

keepPreviousData: true retains previous results while a new query is loading.

Pagination uses the page query parameter in the browser URL.

## 5. Formatting

Location: src/lib/format.js

- etb(value) formats Ethiopian birr amounts.
- when(value) formats dates and times in the Africa/Addis_Ababa time zone.
- relative(value) formats relative time.

These functions are shared to avoid duplicate formatting logic.

## 6. CSV Export

Location: src/lib/csv.js

CSV fields containing commas, double quotes, or line breaks are quoted.

Double quotes inside a quoted field are escaped by doubling them.

Automated tests cover commas, quotation marks, newlines, and combined cases.

## 7. Verification

Run:

node --experimental-default-type=module --test src/lib/csv.test.mjs
npm run build
Use browser developer tools to inspect the Network tab.

Expected behavior:

- An order request on initial client revalidation, followed by polling every five seconds.
- No food-search request while the search term is empty.
- A search request after typing stops for approximately 400 milliseconds.
- Search requests include the page query parameter.
- Previous results remain visible while a new search is being fetched.

## 8. Limitations

The data is illustrative. A production application should use persistent storage, authorization, appropriate caching, and server-side validation.