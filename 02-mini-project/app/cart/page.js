"use client";
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const router = useRouter();
  return (
    <main>
      <h1>🛒 Project 02: Cart</h1>
      <button 
        onClick={() => router.push('/checkout')}
        style={{ padding: '0.5rem 1rem', background: '#0070f3', color: 'white', border: 'none', cursor: 'pointer' }}
      >
        Go to Checkout
      </button>
    </main>
  );
}
