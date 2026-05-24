import Link from 'next/link';
import './globals.css';

export const metadata = {
  title: 'Dual Canvas PWA',
  description: 'App colaborativa para crear objetos compartidos',
  manifest: '/manifest.json',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <nav className="bg-purple-600 text-white p-3 flex gap-4 justify-center">
          <Link href="/" className="hover:underline">🏠 Dual Canvas</Link>
          <Link href="/fusion" className="hover:underline">🧪 Calculadora Fusión</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
