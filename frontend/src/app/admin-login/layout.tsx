


// src/app/user/layout.tsx
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/footer';
import '@/app/globals.css';

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="w-full pt-10">
        {children}
      </main>
      <Footer />
    </div>
  );
}