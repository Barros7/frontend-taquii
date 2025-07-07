import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "@/layout/footer/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toaster } from 'react-hot-toast';
import { AuthStatus } from '@/components/AuthStatus';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { AuthProvider } from '@/context/AuthContext';

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ErrorBoundary>
          <AuthProvider>
            <AuthStatus />
            {children}
            <Toaster position="bottom-right" />
            <Footer />
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
