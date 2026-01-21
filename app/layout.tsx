import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['400', '500', '700', '800', '900'], // Weights for regular, medium, bold, extra bold, black
});

export const metadata: Metadata = {
  title: 'Game Search | Eneba',
  description: 'Find the best deals on games across all platforms',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
