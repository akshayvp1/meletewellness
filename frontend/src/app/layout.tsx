import './globals.css';
import Navbar from '@/components/navbar/Navbar';
import { Metadata } from 'next';
import Footer from '@/components/footer/footer';
export const metadata: Metadata = {
  title: 'Melete',
  // No icons needed - Next.js automatically detects favicon.ico
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
  <body>
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-0 bg-gray-50">
        {children} {/* Your page goes here */}
      </main>
      <Footer />
    </div>
  </body>
</html>
  );
}