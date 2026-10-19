// app/checkout/page.js
"use client";
import { useActionState } from "react";
import { placeOrderAction } from "../actions/orderActions";

export default function CheckoutPage() {
  const [state, formAction, isPending] = useActionState(placeOrderAction, null);

  return (
    <main style={{ padding: "2rem", maxWidth: "450px", fontFamily: "sans-serif" }}>
      <h2>📋 Place Your Addis Eats Order</h2>
      {state?.success && <p style={{ color: "green", fontWeight: "bold" }}>🎉 Success! Your order tracking code is: {state.orderId}</p>}

      <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div>
          <label style={{ display: "block", marginBottom: "0.25rem" }}>Full Name:</label>
          <input type="text" name="name" disabled={isPending} style={{ width: "100%", padding: "0.5rem" }} />
          {state?.errors?.name && <span style={{ color: "red", fontSize: "0.85rem" }}>{state.errors.name}</span>}
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "0.25rem" }}>Phone Number:</label>
          <input type="text" name="phone" placeholder="+251..." disabled={isPending} style={{ width: "100%", padding: "0.5rem" }} />
          {state?.errors?.phone && <span style={{ color: "red", fontSize: "0.85rem" }}>{state.errors.phone}</span>}
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "0.25rem" }}>Delivery Address:</label>
          <input type="text" name="address" disabled={isPending} style={{ width: "100%", padding: "0.5rem" }} />
          {state?.errors?.address && <span style={{ color: "red", fontSize: "0.85rem" }}>{state.errors.address}</span>}
        </div>

        <button 
          type="submit" 
          disabled={isPending}
          style={{ 
            padding: "0.75rem", 
            background: isPending ? "#ccc" : "#0070f3", 
            color: "white", 
            border: "none", 
            borderRadius: "4px",
            cursor: isPending ? "not-allowed" : "pointer"
          }}
        >
          {isPending ? "Submitting Order..." : "Confirm & Place Order"}
        </button>
      </form>
    </main>
  );
}
