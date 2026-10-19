import type { Metadata } from 'node_modules/next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CodeOps Day 48 Project',
  description: 'Accessible and resilient Next.js application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased flex flex-col justify-between">
        <header className="border-b border-slate-200 bg-white px-6 py-4">
          <h1 className="text-lg font-semibold text-slate-800">IBT College CodeOps</h1>
        </header>
        <main className="flex-1 px-4 py-8 max-w-4xl mx-auto w-full">
          {children}
        </main>
        <footer className="border-t border-slate-200 bg-white px-6 py-4 text-center text-sm text-slate-500">
          Module 3 · Day 48 Assessment
        </footer>
      </body>
    </html>
  );
}