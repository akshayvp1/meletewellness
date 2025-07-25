

// 'use client';

// import { GoogleOAuthProvider } from '@react-oauth/google';
// import { Toaster } from 'react-hot-toast';
// import Navbar from '@/components/navbar/Navbar';
// import Footer from '@/components/footer/footer';

// export default function MainLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
//       <div className="min-h-screen flex flex-col">
//         <Navbar />
//         <main className="flex-grow">
//           {children}
//         </main>
//         <Footer />
//       </div>
//       <Toaster
//         position="top-right"
//         toastOptions={{
//           duration: 4000,
//           style: {
//             background: '#ffffff',
//             color: '#374151',
//             border: '1px solid #e5e7eb',
//             borderRadius: '8px',
//             boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
//           },
//           success: {
//             style: {
//               background: '#10b981',
//               color: '#ffffff',
//               border: '1px solid #10b981',
//             },
//             iconTheme: {
//               primary: '#ffffff',
//               secondary: '#10b981',
//             },
//           },
//           error: {
//             style: {
//               background: '#ef4444',
//               color: '#ffffff',
//               border: '1px solid #ef4444',
//             },
//             iconTheme: {
//               primary: '#ffffff',
//               secondary: '#ef4444',
//             },
//           },
//         }}
//       />
//     </GoogleOAuthProvider>
//   );
// }




'use client';

import GoogleProviderWrapper from '@/components/GoogleProviderWrapper';
import CustomToaster from '@/components/CustomToaster';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/footer';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <GoogleProviderWrapper>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
      <CustomToaster />
    </GoogleProviderWrapper>
  );
}
