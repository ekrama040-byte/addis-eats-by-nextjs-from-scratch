// app/layout.js
import Link from 'next/link';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'sans-serif', margin: 0, padding: '1rem' }}>
        <header style={{ borderBottom: '2px solid #0070f3', paddingBottom: '1rem', marginBottom: '1rem' }}>
          <strong>🚀 Workspace Mini-Project 02</strong>
          <nav style={{ marginTop: '0.5rem', display: 'flex', gap: '15px' }}>
            <Link href="/">Home</Link>
            <Link href="/menu">Menu</Link>
            <Link href="/cart">Cart</Link>
            <Link href="/checkout">Checkout</Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
