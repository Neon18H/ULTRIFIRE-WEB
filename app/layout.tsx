import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://ultrifire.co'),
  title: 'UltriFire | Firewall Next-Generation fabricado en Colombia',
  description:
    'Ciberseguridad empresarial para PYME: firewall físico, virtual, gateway cloud gestionado y plataforma centralizada con soporte local en Colombia.',
  keywords: ['UltriFire', 'ciberseguridad Colombia', 'firewall', 'NGFW', 'OPNsense', 'SaaS seguridad', 'PYME'],
  openGraph: {
    title: 'UltriFire | Ciberseguridad fabricada en Colombia',
    description: 'Protección empresarial sin licencias en dólares, con soporte local y gestión centralizada en la nube.',
    url: 'https://ultrifire.co',
    siteName: 'UltriFire',
    locale: 'es_CO',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UltriFire | Firewall Next-Generation fabricado en Colombia',
    description: 'Protección de nivel empresarial para PYME, oficinas, nube e infraestructura híbrida.'
  },
  robots: { index: true, follow: true },
  icons: {
    icon: '/images/logo.png',
    shortcut: '/images/logo.png',
    apple: '/images/logo.png'
  }
};

export const viewport: Viewport = {
  themeColor: '#02040A',
  width: 'device-width',
  initialScale: 1
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="es" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
