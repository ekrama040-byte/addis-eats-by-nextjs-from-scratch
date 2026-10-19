# 🗺️ Addis Eats API Engine & Server Mutation Mapping

This project architecture implements server-side JSON endpoint delivery combined with optimized Next.js Server Actions RPC mechanics.

## 📡 REST API Endpoint Registry

| Route Path | HTTP Method | Expected Input Payload | Success Code | Error Code(s) | Description |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/api/dishes` | **`GET`** | None | `200 OK` | None | Returns the full restaurant food array as raw JSON. |
| `/api/dishes/[id]` | **`GET`** | URL URL Path ID Parameter | `200 OK` | `404 Not Found` | Returns a single dish object or structured error if unknown. |
| `/api/orders` | **`POST`** | JSON object (`{name, phone, address}`) | `201 Created` | `422 Unprocessable` / `400 Bad Request` | Processes order requests and validates against shared schemas. |

## ⚡ Server Actions Registry
*   **`placeOrderAction`**: Bound directly to the checkout `<form>` token via the client-side `useActionState` controller hooks.
*   **`cancelOrderAction`**: Evaluates server environment configs (`process.env.JWT_SECRET`) and forces deep validation constraints between active identity claims and database rows to secure operations.
