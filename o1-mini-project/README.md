# Mini-Project 01: Addis Eats on Next.js
**IBT College Canada CodeOps · Module 3 · Day 36**

This is the first mini-project in the workspace, carrying the complete Addis Eats route tree built using the Next.js App Router file-system conventions.

---

## 🗺️ Route Tree & File Mapping

| Route Path | Associated File | Description | Route Type |
| :--- | :--- | :--- | :--- |
| `/` | `app/page.js` | Home page for Addis Eats | Static Index |
| `/menu` | `app/menu/page.js` | Main food menu landing page | Static Parent |
| `/menu/[id]` | `app/menu/[id]/page.js` | Detailed view of a dish by its ID | Dynamic Item |
| `/cart` | `app/cart/page.js` | User shopping cart layout | Static Index |
| `/checkout` | `app/checkout/page.js` | Checkout page for finalizing orders | Static Index |

---

## 🛠️ Segment Files & States

*   **`app/menu/loading.js`** - Renders automatically while loading menu segments.
*   **`app/menu/error.js`** - Client component (`"use client"`) catching operational errors.
*   **`app/not-found.js`** - Triggered by unknown paths or explicit execution of `notFound()`.

