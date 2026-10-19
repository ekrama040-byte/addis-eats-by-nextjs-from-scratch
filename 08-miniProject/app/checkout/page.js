import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

export default async function CheckoutPage() {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in?next=%2Fcheckout");
  }

  return (
    <main className="mx-auto max-w-5xl p-8">
      <h1 className="text-3xl font-bold">Checkout</h1>
      <p>Review your Addis Eats order before placing it.</p>
    </main>
  );
}