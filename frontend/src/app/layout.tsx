






// // src/app/layout.tsx
// 'use client';
// import { usePathname } from 'next/navigation';
// import Navbar from '@/components/navbar/Navbar';
// import Footer from '@/components/footer/footer';
// import './globals.css';

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   const pathname = usePathname();
//   const hideLayout = ['/terms-and-condition','/user','/privacy','/admin','/terms-and-conditions'];

//   const isLayoutHidden = hideLayout.some((path) => pathname.startsWith(path));

//   return (
//     <html lang="en">
//       <body>
//         <div className="flex flex-col min-h-screen">
//           {!isLayoutHidden && <Navbar />}
//           <main className="flex-grow pt-0 bg-gray-50">{children}</main>
//           {!isLayoutHidden && <Footer />}
//         </div>
//       </body>
//     </html>
//   );
// }






// 'use client';
// import { usePathname } from 'next/navigation';
// import { GoogleOAuthProvider } from '@react-oauth/google';
// import Navbar from '@/components/navbar/Navbar';
// import Footer from '@/components/footer/footer';
// import './globals.css';

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   const pathname = usePathname();
//   const hideLayout = ['/terms-and-condition','/user','/privacy','/admin','/terms-and-conditions'];

//   const isLayoutHidden = hideLayout.some((path) => pathname.startsWith(path));

//   return (
//     <html lang="en">
//       <body>
//         <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
//           <div className="flex flex-col min-h-screen">
//             {!isLayoutHidden && <Navbar />}
//             <main className="flex-grow pt-0 bg-gray-50">{children}</main>
//             {!isLayoutHidden && <Footer />}
//           </div>
//         </GoogleOAuthProvider>
//       </body>
//     </html>
//   );
// }


// 'use client';

// import { usePathname } from 'next/navigation';
// import { GoogleOAuthProvider } from '@react-oauth/google';
// import { Toaster } from 'react-hot-toast';
// import Navbar from '@/components/navbar/Navbar';
// import Footer from '@/components/footer/footer';
// import ReduxProvider from '@/store/Provider'; // ✅ Import Redux Provider
// import './globals.css';

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   const pathname = usePathname();
//   const hideLayout = ['/terms-and-condition', '/user', '/privacy', '/admin', '/terms-and-conditions'];
//   const isLayoutHidden = hideLayout.some((path) => pathname.startsWith(path));

//   return (
//     <html lang="en">
//       <body>
//         <ReduxProvider>
//           <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
//             <div className="flex flex-col min-h-screen">
//               {!isLayoutHidden && <Navbar />}
//               <main className="flex-grow pt-0 bg-gray-50">{children}</main>
//               {!isLayoutHidden && <Footer />}
//             </div>
//             <Toaster
//               position="top-right"
//               toastOptions={{
//                 duration: 4000,
//                 style: {
//                   background: '#ffffff',
//                   color: '#374151',
//                   border: '1px solid #e5e7eb',
//                   borderRadius: '8px',
//                   boxShadow:
//                     '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
//                 },
//                 success: {
//                   style: {
//                     background: '#10b981',
//                     color: '#ffffff',
//                     border: '1px solid #10b981',
//                   },
//                   iconTheme: {
//                     primary: '#ffffff',
//                     secondary: '#10b981',
//                   },
//                 },
//                 error: {
//                   style: {
//                     background: '#ef4444',
//                     color: '#ffffff',
//                     border: '1px solid #ef4444',
//                   },
//                   iconTheme: {
//                     primary: '#ffffff',
//                     secondary: '#ef4444',
//                   },
//                 },
//               }}
//             />
//           </GoogleOAuthProvider>
//         </ReduxProvider>
//       </body>
//     </html>
//   );
// }




import './globals.css';
import type { Metadata } from 'next';
import ClientLayout from './ClientLayout'; // ✅ Move hook-based logic here

export const metadata: Metadata = {
  title: 'Melete Wellness',
  description: '24/7 Mental Health Support Platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
