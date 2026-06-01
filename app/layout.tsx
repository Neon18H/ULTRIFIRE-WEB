import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://ultrifire.co'),
  title: 'UltriFire | Ciberseguridad empresarial fabricada en Colombia',
  description:
    'Firewalls Next-Generation físicos y virtuales, gateway cloud gestionado y plataforma SaaS centralizada para empresas en Colombia. Sin licencias en dólares.',
  keywords: ['UltriFire', 'ciberseguridad Colombia', 'firewall empresarial', 'NGFW', 'gateway cloud', 'firewall virtual', 'PYME'],
  authors: [{ name: 'UltriFire' }],
  openGraph: {
    title: 'UltriFire | Ciberseguridad fabricada en Colombia',
    description: 'Protección empresarial con firewalls físicos, virtuales y gateway cloud gestionado. Costos en COP y soporte local.',
    url: 'https://ultrifire.co',
    siteName: 'UltriFire',
    locale: 'es_CO',
    type: 'website',
    images: [{ url: '/images/hero-hardware.jpg', width: 1200, height: 630, alt: 'Ciberseguridad empresarial UltriFire' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UltriFire | Ciberseguridad empresarial fabricada en Colombia',
    description: 'Firewalls Next-Generation gestionados desde una sola plataforma. Sin licencias en dólares.'
  },
  robots: { index: true, follow: true },
  icons: {
    icon: '/images/logo.png',
    shortcut: '/images/logo.png',
    apple: '/images/logo.png'
  }
};

export const viewport: Viewport = {
  themeColor: '#060810',
  width: 'device-width',
  initialScale: 1
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="es">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
