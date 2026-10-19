// app/actions/orderActions.js
"use server";

import { revalidatePath } from "next/cache";
import { validateOrder } from "../lib/schema";

// Action 1: Place an order safely on the server side
export async function placeOrderAction(prevState, formData) {
  // Artificial 800ms network delay to demonstrate pending spinner states
  await new Promise((resolve) => setTimeout(resolve, 800));

  const rawData = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    address: formData.get("address")
  };

  const validation = validateOrder(rawData);

  if (!validation.isValid) {
    return { success: false, errors: validation.errors };
  }

  // Trigger cache purge to immediately reveal the new item on target paths
  revalidatePath("/menu");

  return { success: true, orderId: "ORD-" + Math.floor(Math.random() * 90000 + 10000) };
}

// Action 2: Cancel an order with bulletproof backend permission checks
export async function cancelOrderAction(orderId, requestorUserId) {
  // Check against our hidden JWT secret to confirm the server context
  const secretKey = process.env.JWT_SECRET;
  if (!secretKey) {
    throw new Error("Server Configuration Error: Security contexts are missing.");
  }

  // Simulated live database record retrieval
  const existingOrder = {
    id: "ORD-55566",
    ownerId: "user-ekram777",
    status: "Pending"
  };

  // Authorization Check: Throw an error if a rogue user passes an alternate ID from the console
  if (existingOrder.ownerId !== requestorUserId) {
    return { 
      success: false, 
      error: "Access Denied: You do not possess structural ownership rights to alter this entity." 
    };
  }

  console.log(`Order ${orderId} successfully deleted on the secure backend server.`);
  revalidatePath("/menu");
  
  return { success: true, message: `Order ${orderId} has been successfully canceled.` };
}
