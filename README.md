[10/19/2026 6:24 AM] EKRAM: createdAt
customerName
neighbourhood
status
total

The direction can be:

asc
desc

When the user changes the sorting column or direction, the URL reflects the selected settings and pagination returns to the first page.

Pagination

Pagination divides the order records into manageable groups. The previous and next links retain the selected sorting preferences.

The page number is validated to prevent invalid values from being used directly.

Loading, Empty, Error, and Success States

The application demonstrates four important UI states.

Loading

The loading skeleton indicates that data is being retrieved. It helps prevent the dashboard from appearing broken while a request is pending.

Empty

The empty state informs the user that no order records are available and provides a clear way to navigate away.

Error

The error state displays a failure interface and offers a retry button. The error boundary can attempt to render the route again.

Populated

The populated state displays the summary cards, revenue chart, daily orders chart, their equivalent tables, and the order records table.

Testing all four states helps ensure that the application behaves predictably beyond the ideal successful request.

Accessibility

Accessibility is part of the dashboard design rather than an optional enhancement.

The implementation includes:

- Semantic HTML tables.
- Table captions and column headers.
- Appropriate header scope.
- "aria-sort" on the active sortable column.
- Textual labels alongside chart visualizations.
- Data tables that provide alternatives to visual charts.
- Visible labels and values rather than relying exclusively on colour.
- Readable text and numeric alignment.
- Keyboard-operable links and buttons using native HTML elements.

Accessibility Testing Checklist

- [ ] Navigate the dashboard using only a keyboard.
- [ ] Verify that sortable headers are understandable.
- [ ] Confirm that the active sort direction is communicated.
- [ ] Read both chart tables using a screen reader.
- [ ] Check contrast and text readability.
- [ ] Confirm that loading and error messages are understandable.
- [ ] Verify that the interface remains usable without relying on colour.

Responsive Design

Tailwind CSS utility classes are used to create a responsive layout.

The dashboard should remain usable on:

- Desktop computers.
- Laptops.
- Tablets.
- Mobile devices.

Recommended responsive checks include narrower chart containers, horizontally accessible data tables where necessary, readable summary cards, and appropriately sized controls.

Test the interface at multiple viewport widths before submitting the project.

Validation and Testing

Run the following checks before committing or submitting the project.

1. Start the Application

npm run dev

Open "/admin/orders" and verify that the dashboard loads.

2. Test Sorting

Open:

/admin/orders?sort=total&direction=desc&page=1

Verify that order totals are sorted from highest to lowest.

3. Test Pagination

Open:

/admin/orders?sort=createdAt&direction=desc&page=2

Verify that the second page displays different records while preserving the selected sorting order.

4. Test Empty State

Open:

/admin/orders?demoState=empty

Verify that the empty message appears without a runtime error.

5. Test Error State

Open:

/admin/orders?demoState=error

Verify that the error boundary is displayed and the retry control works.

6. Test Loading Behavior

Open:

/admin/orders?demoState=loading

Verify the delayed response and confirm that the application eventually displays the populated dashboard.

7. Test the Production Build

npm run build

Resolve compilation and type errors before deployment.

8. Review the Data

Check that:

- Cancelled orders are excluded consistently from the relevant totals.
- ETB values are formatted consistently.
- The revenue chart and its table contain matching data.
- The daily orders chart and its table contain matching data.
- The seven-day reporting range is applied correctly.
- Sorting and pagination preserve valid URL parameters.

Environment Variables
[10/19/2026 6:24 AM] EKRAM: The current sample dashboard does not require an external API key.

If the application later uses environment variables, create a ".env.local" file in the project root.

For example:

DATABASE_URL="your-database-connection-string"

This is an example only; the current sample implementation does not automatically use this variable.

Important: Do not commit passwords, database credentials, private API keys, or other secrets to GitHub. Server-only secrets should not use the "NEXT_PUBLIC_" prefix because variables with that prefix can be exposed to the browser.

Production Considerations

Before using the dashboard with real customer data, address the following areas.

Real Data Source

Replace the sample data in "src/lib/orders/data.ts" with a database query or a backend API request.

The data layer should support:

- Fetching orders.
- Filtering by reporting period.
- Aggregating revenue.
- Grouping orders by neighbourhood and date.
- Sorting and pagination.

Authentication and Authorization

The "/admin/orders" route is an administrative interface. Protect it with server-side authentication and authorization so that only permitted users can access order information.

Hiding links in the UI alone is not sufficient protection.

Data Validation

Validate incoming records and query parameters. Handle malformed responses, failed requests, missing fields, and invalid dates gracefully.

Pagination Efficiency

For larger datasets, prefer database-level sorting and pagination instead of fetching every order and sorting it in memory.

Privacy

Customer names and order records may contain personal information. Limit access to authorized users and avoid logging unnecessary customer details.

Currency and Financial Accuracy

Store monetary values in a consistent representation, such as integer minor units or an appropriate decimal type. Avoid relying on floating-point arithmetic for financial calculations that require exact precision.

Monitoring

In production, log actionable errors on the server and monitor failed requests. Avoid exposing internal stack traces or sensitive data to users.

Future Improvements

Possible next steps include:

- Connect the dashboard to a real database.
- Add administrator login and role-based permissions.
- Add date-range filters.
- Add neighbourhood and order-status filters.
- Add CSV export.
- Add order detail pages.
- Add revenue comparisons between reporting periods.
- Add restaurant-level analytics.
- Add automated tests for aggregation and sorting.
- Add API pagination and caching.
- Add deployment configuration.
- Improve mobile layouts and accessibility testing.
- Add live updates for newly received orders.

Contributing

Contributions and improvements are welcome.

1. Fork or clone the repository.
2. Create a feature branch.
3. Make focused changes.
4. Run the production build.
5. Test the relevant dashboard states.
6. Commit your changes with a descriptive message.
7. Open a pull request describing the change.

Example:

git checkout -b feature/dashboard-improvements
git add .
git commit -m "Improve orders dashboard"
git push origin feature/dashboard-improvements

Follow the existing project conventions and keep components modular.

License

No specific license is declared by this README. Add a license, such as MIT, only after deciding how the project may be used, modified, and distributed.

---

Project: Addis Eats — Admin Orders Dashboard
Framework: Next.js
Language: TypeScript
Styling: Tailwind CSS
Charts: Recharts
Currency: Ethiopian birr (ETB)
Current data source: Sample data for demonstration
Main route: "/admin/orders"
