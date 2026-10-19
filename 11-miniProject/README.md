Addis Eats — Authentication and Authorization

1. Authentication design

Addis Eats uses a signed session token stored in an HTTP cookie.

The cookie is configured with:

- "httpOnly: true" — prevents client-side JavaScript from reading the cookie.
- "secure: true" in production — restricts cookie transmission to HTTPS.
- "sameSite: "lax"" — provides a layer of cross-site request protection.
- A seven-day maximum lifetime.

The shared "getSession()" helper verifies the JWT signature, expiry, subject, and role. Pages, server actions, and API handlers use this helper to verify the session.

2. Protected routes and security layers

Route| Security layers| What each layer proves
"/checkout"| Middleware + page session check| Middleware checks for a valid session; the page verifies it while rendering.
"/orders"| Middleware + page session check + ownership-scoped query| The page requires authentication, and the query returns only the signed-in user's orders.
"/api/orders"| Handler session check + ownership-scoped query| The handler independently authenticates the caller and limits results to their account.
Server actions that modify orders| Session check + ownership condition in the database write| The caller is authenticated and the target order belongs to that caller.
"/kitchen"| Middleware + page session check + staff role check| The user is authenticated and has the staff role.
"/sign-in"| Credential verification + validated redirect| Credentials are checked against stored password hashes; the destination must be a safe local path.

Middleware is not the only security boundary. Every private page, API handler, and server action enforces its own authorization requirements.

3. Redirect protection

The "safeRedirectPath()" helper rejects absolute external URLs, protocol-relative URLs, backslashes, and invalid control characters. The redirect is validated again during sign-in before navigation.

4. Data ownership

Order queries use the authenticated session's user ID instead of trusting a user ID submitted by the browser.

Every order mutation verifies the session and includes the user's ID in its database condition. Staff-only operations additionally verify the staff role.

5. Attack testing

Record actual results after running each test locally. Do not mark a test as passed unless the observed result matches the expected result.

Attack 1 — Call a server action while signed out

Method: Open the application in a browser without a session and attempt to invoke an order-modifying server action directly.

Expected result: The action rejects the request as unauthorized. No database record is modified.

Observed result: [Record your actual result.]

Status: [PASS / FAIL]

Attack 2 — Change the order ID to another account's order

Method: Sign in as Account A and attempt to invoke an order action using an order ID belonging to Account B.

Expected result: The action does not modify Account B's order. It returns a generic failure response.

Observed result: [Record your actual result.]

Status: [PASS / FAIL]

Attack 3 — Use an external sign-in destination

Method: Open a crafted sign-in URL such as "/sign-in?next=https%3A%2F%2Fevil.example".

Expected result: After successful sign-in, the application redirects to the safe fallback route rather than the external site.

Observed result: [Record your actual result.]

Status: [PASS / FAIL]

6. Conclusion

The application uses layered security: session verification, server-side authorization, validated redirects, and ownership-scoped database operations. Middleware improves navigation and blocks unauthenticated requests early, while the underlying pages, handlers, and actions remain responsible for enforcing access control.