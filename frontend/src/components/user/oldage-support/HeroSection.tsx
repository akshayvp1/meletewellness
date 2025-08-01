// import { UserCheck } from 'lucide-react';
// import { useIntersectionObserver } from '@/components/hooks/useIntersectionObserver';
// import OldImage from '@/../public/assets/senior.webp';

// export const HeroSection: React.FC = () => {
//   const [headerRef, isHeaderVisible] = useIntersectionObserver(0.1);

//   return (
//     <section 
//       ref={headerRef}
//       className="py-16 lg:py-24"
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
//           <div className={`transform transition-all duration-1000 ${
//             isHeaderVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
//           }`}>
//             <div className="flex items-center gap-4 mb-6">
//               <div className="bg-[#015F4A]/20 backdrop-blur-sm p-4 rounded-2xl shadow-lg">
//                 <UserCheck className="w-8 h-8 text-[#015F4A]" />
//               </div>
//               <span className="text-[#015F4A] font-medium">Specialized Senior Mental Health</span>
//             </div>
            
//             <h1 className="text-4xl lg:text-6xl font-bold text-slate-800 mb-6">
//               Senior Support
//               <span className="block text-[#015F4A]">
//                 Mental Health Services
//               </span>
//             </h1>
            
//             <p className="text-lg lg:text-xl text-slate-600 mb-8 leading-relaxed">
//               Dedicated mental health services for older adults, focusing on aging gracefully, cognitive health, and maintaining emotional well-being throughout the golden years.
//             </p>
//           </div>
          
//           <div className={`transform transition-all duration-1000 delay-300 ${
//             isHeaderVisible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
//           }`}>
//             <div className="relative">
//               <img
//                 src={OldImage.src}
//                 alt="Senior receiving mental health support"
//                 className="w-full h-96 lg:h-[500px] object-cover rounded-3xl shadow-2xl"
//                 onError={(e) => {
//                   const target = e.target as HTMLImageElement;
//                   target.src = 'https://via.placeholder.com/800x600/f59e0b/ffffff?text=Senior+Support+Services';
//                 }}
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-[#015F4A]/20 via-transparent to-transparent rounded-3xl" />
              
//               {/* Floating elements */}
//               <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg">
//                 <div className="flex items-center gap-2">
//                   <UserCheck className="w-5 h-5 text-[#015F4A]" />
//                   <span className="text-sm font-medium text-slate-700">Expert Care</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };


import { UserCheck } from 'lucide-react';
import { useIntersectionObserver } from '@/components/hooks/useIntersectionObserver';
import OldImage from '@/../public/assets/senior.webp';

export const HeroSection: React.FC = () => {
  const [headerRef, isHeaderVisible] = useIntersectionObserver(0.1);

  return (
    <section 
      ref={headerRef}
      className="py-16 lg:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className={`transform transition-all duration-1000 ${
            isHeaderVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
          }`}>
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-[#015F4A]/20 backdrop-blur-sm p-4 rounded-2xl shadow-lg">
                <UserCheck className="w-8 h-8 text-[#015F4A]" />
              </div>
              <span className="text-[#015F4A] font-medium">Specialized Senior Mental Health</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-slate-800 mb-6">
              Senior Support
              <span className="block text-[#015F4A]">
                Mental Health Services
              </span>
            </h1>
            
            <p className="text-lg lg:text-xl text-slate-600 mb-8 leading-relaxed">
              Dedicated mental health services for older adults, focusing on aging gracefully, cognitive health, and maintaining emotional well-being throughout the golden years.
            </p>
          </div>
          
          <div className={`transform transition-all duration-1000 delay-300 ${
            isHeaderVisible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
          }`}>
            <div className="relative rounded-3xl shadow-2xl overflow-hidden">
              <img
                src={OldImage.src}
                alt="Senior receiving mental health support"
                className="w-full h-96 lg:h-[500px] object-cover rounded-3xl"
                style={{ objectPosition: '50% 20%' }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/800x600/f59e0b/ffffff?text=Senior+Support+Services';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#015F4A]/20 via-transparent to-transparent rounded-3xl" />
              
              {/* Floating elements */}
              <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-[#015F4A]" />
                  <span className="text-sm font-medium text-slate-700">Expert Care</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};