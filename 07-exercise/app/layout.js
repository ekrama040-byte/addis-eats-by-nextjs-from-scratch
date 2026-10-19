// app/layout.js
import Providers from "./components/Providers";
import Link from "next/link";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'sans-serif', margin: 0, padding: '1rem' }}>
        <header style={{ borderBottom: '2px solid #0070f3', paddingBottom: '1rem', marginBottom: '1rem' }}>
          <strong>🚀 Addis Eats Production Engine (Project 04)</strong>
          <nav style={{ display: 'flex', gap: '15px', marginTop: '0.5rem' }}>
            <Link href="/">Home</Link>
            <Link href="/menu">Menu</Link>
            <Link href="/cart">Cart</Link>
          </nav>
        </header>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

