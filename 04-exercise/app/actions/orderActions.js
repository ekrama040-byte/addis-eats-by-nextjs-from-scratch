// app/actions/orderActions.js
"use server"; // Tells Next.js to compile this as a secure RPC server function
import { revalidatePath } from "next/cache";

export async function createOrderAction(prevState, formData) {
  // Artificial 1-second database delay to demonstrate pending state changes
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const name = formData.get("name");
  const address = formData.get("address");
  const fieldErrors = {};

  if (!name || name.trim() === "") fieldErrors.name = "Customer name is required.";
  if (!address || address.trim() === "") fieldErrors.address = "Delivery address is required.";

  if (Object.keys(fieldErrors).length > 0) {
    return { success: false, errors: fieldErrors };
  }

  // Trigger cache revalidation on the menu path to refresh database UI entries
  revalidatePath("/menu");

  return { success: true, orderId: "ORD-" + Math.floor(Math.random() * 90000 + 10000) };
}
// app/actions/orderActions.js (Appended function)
export async function cancelOrderAction(orderId, currentUserId, sessionToken) {
  // Security Layer 1: Check active session authentication presence
  if (!sessionToken) {
    throw new Error("Unauthorized Access: You must be logged in to modify orders.");
  }

  // Simulated Database Entity Entry Check
  const simulatedOrderRecord = {
    id: "ORD-999",
    ownerId: "user-abc123",
    status: "Processing"
  };

  // Security Layer 2: Confirm record ownership matching parameters
  if (simulatedOrderRecord.ownerId !== currentUserId) {
    return { success: false, error: "Forbidden: You are not authorized to cancel this order." };
  }

  console.log(`Order ${orderId} successfully deleted from backend datastore.`);
  revalidatePath("/menu");
  
  return { success: true, message: `Order ${orderId} has been successfully canceled.` };
}
