// app/components/Navbar.jsx
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav style={{ display: 'flex', gap: '15px', background: '#eee', padding: '1rem', marginBottom: '1rem' }}>
      <Link href="/">Home</Link>
      <Link href="/menu">Menu</Link>
      <Link href="/cart">Cart</Link>
      <Link href="/checkout">Checkout</Link>
    </nav>
  );
}
