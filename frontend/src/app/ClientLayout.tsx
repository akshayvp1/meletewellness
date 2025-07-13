'use client';

import { usePathname } from 'next/navigation';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/footer';
import ReduxProvider from '@/store/Provider';

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const hideLayout = ['/terms-and-condition', '/user', '/privacy', '/admin', '/terms-and-conditions'];
  const isLayoutHidden = hideLayout.some((path) => pathname.startsWith(path));

  return (
    <ReduxProvider>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
        <div className="flex flex-col min-h-screen">
          {!isLayoutHidden && <Navbar />}
          <main className="flex-grow pt-0 bg-gray-50">{children}</main>
          {!isLayoutHidden && <Footer />}
        </div>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#ffffff',
              color: '#374151',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow:
                '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            },
            success: {
              style: {
                background: '#10b981',
                color: '#ffffff',
                border: '1px solid #10b981',
              },
              iconTheme: {
                primary: '#ffffff',
                secondary: '#10b981',
              },
            },
            error: {
              style: {
                background: '#ef4444',
                color: '#ffffff',
                border: '1px solid #ef4444',
              },
              iconTheme: {
                primary: '#ffffff',
                secondary: '#ef4444',
              },
            },
          }}
        />
      </GoogleOAuthProvider>
    </ReduxProvider>
  );
};

export default ClientLayout;
