import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import TanstackProvider from '@/components/TanStackProvider/TanStackProvider';

// const geistSans = Geist({
//   variable: '--font-geist-sans',
//   subsets: ['latin'],
// });

// const geistMono = Geist_Mono({
//   variable: '--font-geist-mono',
//   subsets: ['latin'],
// });

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
});

export const metadata: Metadata = {
  title: 'NoteHub',
  description:
    'A simple and efficient app for creating and organizing your notes.',
  openGraph: {
    title: `NoteHub`,
    description: `A simple and efficient app for creating and organizing your notes.`,
    url: `https://notehub.com/`,
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: `A simple and efficient app for creating and organizing your notes.`,
      },
    ],
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.variable} ${roboto.variable}`}>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <TanstackProvider>
          <Header />
          <main className="flex-1">
            {children}
            {modal}
          </main>
          <Footer />
        </TanstackProvider>
      </body>
    </html>
  );
}
