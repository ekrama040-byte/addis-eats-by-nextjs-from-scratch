import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  isPending?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  isPending = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium transition-colors min-h-[44px] min-w-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2';
  
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400',
    secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200 disabled:bg-slate-50',
    danger: 'bg-red-600 text-white hover:bg-red-700 disabled:bg-red-400',
  };

  return (
    <button
      type="button"
      disabled={disabled || isPending}
      aria-busy={isPending}
      className={`${baseStyles} ${variants[variant]} ${className} ${disabled || isPending ? 'cursor-not-allowed' : ''}`}
      {...props}
    >
      {isPending ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Processing...
        </span>
      ) : (
        children
      )}
    </button>
  );
}