'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';

export function CheckoutForm() {
  const [isPending, setIsPending] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isPending) return; // Guard clause prevents double-tap / Enter spam

    setIsPending(true);
    setSuccessMessage('');

    try {
      // Simulate network request latency
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSuccessMessage('Order placed successfully!');
    } catch (error) {
      console.error('Submission failed', error);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 space-y-4 bg-white rounded-xl shadow-sm border border-slate-200">
      <h2 className="text-xl font-bold text-slate-800">Secure Checkout</h2>
      
      <div>
        <label htmlFor="item" className="block text-sm font-medium text-slate-700 mb-1">
          Product Item
        </label>
        <input
          id="item"
          type="text"
          defaultValue="CodeOps Full Stack Bundle"
          required
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 min-h-[44px]"
        />
      </div>

      <Button type="submit" variant="primary" isPending={isPending} className="w-full">
        Place One Order
      </Button>

      {successMessage && (
        <p className="text-sm font-medium text-emerald-600 text-center" role="status">
          {successMessage}
        </p>
      )}
    </form>
  );
}