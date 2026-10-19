 "use client";

import { FormEvent, useState } from "react";

const foods = [
  {
    id: 1,
    name: "Injera Combo",
    price: 180,
    description: "Injera served with a variety of Ethiopian stews.",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=700",
  },
  {
    id: 2,
    name: "Fresh Salad",
    price: 120,
    description: "A fresh, colorful and satisfying salad.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=700",
  },
  {
    id: 3,
    name: "Vegetable Bowl",
    price: 150,
    description: "A delicious bowl of fresh vegetables.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=700",
  },
];

export default function Home() {
  const [cart, setCart] = useState<number[]>([]);
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");

  function addToCart(id: number) {
    setCart((current) => [...current, id]);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (pending) return;

    setPending(true);
    setMessage("");

    try {
      // Demo only: no server request is made.
      await new Promise((resolve) => setTimeout(resolve, 700));
      setMessage(Thank you! Confirmation prepared for ${email}.);
      setEmail("");
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-8 sm:px-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <a
          href="#home"
          className="rounded-lg text-2xl font-bold text-orange-700"
        >
          Keyboard-Ready Shop
        </a>

        <a
          href="#cart"
          className="inline-flex min-h-11 items-center rounded-lg border px-4"
        >
          Cart ({cart.length})
        </a>
      </header>

      <section id="home" className="py-12 sm:py-16">
        <p className="font-semibold text-orange-700">
          GOOD FOOD, SIMPLE ORDERING
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          Delicious food for everyone.
        </h1>
        <p className="mt-4 max-w-xl text-gray-600">
          A small demonstration of accessible, mobile-friendly
          food ordering.
        </p>
        <a
          href="#menu"
          className="mt-6 inline-flex min-h-11 items-center rounded-lg
                     bg-orange-600 px-5 font-semibold text-white"
        >
          Explore menu
        </a>
      </section>

      <section id="menu" aria-labelledby="menu-title">
        <h2 id="menu-title" className="text-2xl font-bold">
          Our menu
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {foods.map((food) => (
            <article key={food.id} className="overflow-hidden rounded-xl border">
              <img
                src={food.image}
                alt={food.name}
                className="h-48 w-full object-cover"
              />

              <div className="p-4">
                <h3 className="text-lg font-bold">{food.name}</h3>
                <p className="mt-2 text-sm text-gray-600">
                  {food.description}
                </p>
                <p className="mt-3 font-semibold">
                  {food.price} ETB
                </p>

                <button
                  type="button"
                  onClick={() => addToCart(food.id)}
                  className="mt-4 min-h-11 w-full rounded-lg
                             bg-orange-600 px-4 text-white
                             focus-visible:outline-none
                             focus-visible:ring-2
                             focus-visible:ring-orange-500
                             focus-visible:ring-offset-2"
                >
                  Add to cart
                </button>
              </div>
            </article>
          ))}
        </div>

      </section> 
      
    <section id="cart" className="py-10">
        <h2 className="text-2xl font-bold">Your cart</h2>
        <p className="mt-2">
          {cart.length} item(s) ·{" "}
          {cart.reduce(
            (total, id) =>
              total + (foods.find((food) => food.id === id)?.price ?? 0),
            0
          )}{" "}
          ETB
        </p>
        <button
          type="button"
          onClick={() => setCart([])}
          disabled={cart.length === 0}
          className="mt-3 min-h-11 rounded-lg border px-4
                     disabled:opacity-50"
        >
          Clear cart
        </button>
      </section>

      <section className="max-w-xl border-t py-10">
        <h2 className="text-2xl font-bold">Get updates</h2>
        <p className="mt-2 text-gray-600">
          Try submitting this demo form using your keyboard.
        </p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <label htmlFor="email" className="block font-medium">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="min-h-11 w-full rounded-lg border px-3
                       focus-visible:outline-none
                       focus-visible:ring-2
                       focus-visible:ring-orange-500"
          />

          <button
            type="submit"
            disabled={pending}
            className="min-h-11 rounded-lg bg-orange-600 px-5
                       font-semibold text-white disabled:opacity-60"
          >
            {pending ? "Submitting..." : "Subscribe"}
          </button>

          <p role="status" aria-live="polite" className="text-sm">
            {message}
          </p>
        </form>
      </section>

      <footer className="border-t py-6 text-sm text-gray-600">
        Keyboard-Ready Shop · Accessibility demonstration
      </footer>
    </main>
  );
}