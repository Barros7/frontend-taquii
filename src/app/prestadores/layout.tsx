import '@/styles/globals.css';
import '@/styles/prestadores-variables.css';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from "next/font/google";
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
  title: 'Seja um Prestador - Taqui Serviço | Ganhe mais com seus serviços',
  description: 'Cadastre-se como prestador no Taqui Serviço. Mais clientes, menos complicações. Divulgue, agende e receba – tudo num só lugar.',
  keywords: 'prestador de serviços, registro, Taqui Serviço, agendamento, pagamentos',
};

export default function PrestadoresLayout({
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
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
} 