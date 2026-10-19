import { CheckoutForm } from '@/components/forms/CheckoutForm';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-extrabold text-slate-900">Module 3 Evaluation</h2>
        <p className="text-slate-600">Test keyboard navigation (Tab, Enter, Escape) and double-tap prevention.</p>
        <div>
          <Link 
            href="/dashboard" 
            className="inline-flex items-center text-blue-600 hover:underline font-medium text-sm p-1 rounded min-h-[44px]"
          >
            Go to Protected Dashboard (Dynamic Route →)
          </Link>
        </div>
      </div>

      <CheckoutForm />
    </div>
  );
}