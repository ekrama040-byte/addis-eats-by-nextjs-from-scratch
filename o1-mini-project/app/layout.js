// app/layout.js
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'sans-serif', margin: 0, padding: '1rem' }}>
        <header style={{ borderBottom: '1px solid #ccc', paddingBottom: '1rem', marginBottom: '1rem' }}>
          <strong>Addis Eats Workspace</strong>
        </header>
        {children}
      </body>
    </html>
  );
}
