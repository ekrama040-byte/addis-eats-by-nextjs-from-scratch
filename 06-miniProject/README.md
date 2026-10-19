Live data and Network tab verification

Order status

Open the browser DevTools Network tab, filter by Fetch/XHR, and reload the home page. The order appears on the initial render using server-provided fallback data. A request to "/api/orders/AE-1001" then appears and repeats approximately every five seconds while the page remains open.

The order query also revalidates when the browser window regains focus.

Debounced menu search

Type a dish name into the search field while watching the Network tab. The application waits approximately 400 milliseconds after typing stops before updating the debounced search query.

The search query does not run when the debounced term is empty because its SWR key is "null". When searching, the previous results remain visible while the new response is loading, thanks to "keepPreviousData".

Pagination and URLs

Use the Previous and Next buttons. The page number is reflected in the URL, and the menu API request includes the corresponding "page" parameter. Copy the URL into a new tab to check that the selected page and search term can be restored.

Test commands

Run the development server:

npm run dev

Run the CSV tests if the project still includes them:

node --experimental-default-type=module --test src/lib/csv.test.mjs

Run a production build before submitting:

npm run build