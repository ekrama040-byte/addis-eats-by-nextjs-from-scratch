// app/layout.js
import Navbar from './components/Navbar';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'sans-serif', margin: 0, padding: '1rem' }}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
