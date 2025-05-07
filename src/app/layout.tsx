import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "@/layout/footer/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import SessionProvider from '@/components/providers/SessionProvider';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Taqui - Agendamento de Serviços',
  description: 'Plataforma de agendamento de serviços para estabelecimentos',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="pt">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <SessionProvider session={session}>
          {children}
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
