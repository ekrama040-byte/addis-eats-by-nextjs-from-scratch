"use client";
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const router = useRouter();

  return (
    <main style={{ padding: '1rem' }}>
      <h1>🛒 Your Cart</h1>
      <p>Review the delicious dishes added to your order.</p>
      
      <button 
        onClick={() => router.push('/checkout')}
        style={{ padding: '0.75rem 1.5rem', background: '#0070f3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '1rem' }}
      >
        Proceed to Checkout Programmatically
      </button>
    </main>
  );
}
