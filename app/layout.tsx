import Link from 'next/link';
import SWRegistration from '@/components/SWRegistration';
import './globals.css';

export const metadata = {
  title: 'Dual Canvas PWA',
  description: 'App colaborativa para crear objetos compartidos',
  manifest: '/manifest.json',
  themeColor: '#a855f7',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <SWRegistration />
        <nav className="bg-purple-600 text-white p-3 flex gap-4 justify-center">
  <Link href="/">🎨 Dual Canvas</Link>
  <Link href="/emoji-canvas">😊 Emoji Canvas Libre</Link>
</nav>
        {children}
        
      </body>
    </html>

    
  );
}