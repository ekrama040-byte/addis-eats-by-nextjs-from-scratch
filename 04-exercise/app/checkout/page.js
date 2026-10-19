// app/checkout/page.js
"use client";
import { useActionState } from "react";
import { createOrderAction } from "../actions/orderActions";

export default function CheckoutPage() {
  // useActionState sets up our action handling hook, providing [state, formAction, isPending]
  const [state, formAction, isPending] = useActionState(createOrderAction, null);

  return (
    <main style={{ padding: "2rem", maxWidth: "400px" }}>
      <h2>⚡ Checkout Form (Server Actions Optimization)</h2>
      {state?.success && <p style={{ color: "green" }}>Success! Order created: {state.orderId}</p>}
      
      <form action={formAction}>
        <div style={{ marginBottom: "1rem" }}>
          <label>Name:</label>
          <input type="text" name="name" style={{ display: "block", width: "100%" }} disabled={isPending} />
          {state?.errors?.name && <span style={{ color: "red" }}>{state.errors.name}</span>}
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>Delivery Address:</label>
          <input type="text" name="address" style={{ display: "block", width: "100%" }} disabled={isPending} />
          {state?.errors?.address && <span style={{ color: "red" }}>{state.errors.address}</span>}
        </div>
        <button 
          type="submit" 
          disabled={isPending}
          style={{ padding: "0.5rem 1rem", background: isPending ? "#ccc" : "green", color: "white", cursor: isPending ? "not-allowed" : "pointer" }}
        >
          {isPending ? "Processing Order..." : "Submit Order via Server Action"}
        </button>
      </form>
    </main>
  );
}
