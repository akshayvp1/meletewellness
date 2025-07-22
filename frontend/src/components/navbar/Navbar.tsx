




// 'use client';

// import React, { useState } from 'react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { ChevronDown, LogIn, User } from 'lucide-react';
// import MeleteLogo from '../../../public/assets/logoWhite.png';
// import MeleteLogo1 from '../../../public/assets/Melete-logo-2.svg';
// import { NavItem } from '../../types/types';
// import { useSelector } from 'react-redux';
// import { RootState } from '@/store/app/store';

// const navItems: NavItem[] = [
//   { name: 'Home', href: '/' },
//   { name: 'Service', href: '/user/service' },
//   { name: 'About', href: '/user/about' },
//   {
//     name: 'Specialized Care',
//     items: [
//       'Child-Support',
//       'Adult-Support',
//       'Parent-Support',
//       'Pregnancy-Support',
//       'Oldage-Support'
//     ]
//   },
//   { name: 'Our Experts', href: '/user/experts' },
//   { name: 'Improve With Us', href: '/user/improve' }
// ];

// const Navbar: React.FC = () => {
//   const auth = useSelector((state: RootState) => state.auth); // ✅ Correct hook usage
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [openDropdown, setOpenDropdown] = useState<number | null>(null);
//   const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
//   const pathname = usePathname();

//   const handleDropdownToggle = (index: number) => {
//     setOpenDropdown(openDropdown === index ? null : index);
//   };

//   const handleMouseEnter = (index: number) => {
//     if (hoverTimeout) clearTimeout(hoverTimeout);
//     setOpenDropdown(index);
//   };

//   const handleMouseLeave = () => {
//     const timeout = setTimeout(() => setOpenDropdown(null), 300);
//     setHoverTimeout(timeout);
//   };

//   const handleDropdownMouseEnter = (): void => {
//   if (hoverTimeout) clearTimeout(hoverTimeout);
// };


//   const handleMobileMenuClose = () => {
//     setIsMobileMenuOpen(false);
//     setOpenDropdown(null);
//   };

//   const handleLogoError = (e: React.SyntheticEvent<HTMLImageElement>) => {
//     const target = e.currentTarget;
//     target.src = typeof MeleteLogo === 'string' ? MeleteLogo : MeleteLogo.src;
//   };

//   const isActive = (href: string): boolean => pathname === href;

//   console.log(auth.name, '❤️❤️❤️❤️');

//   return (
//     <>
//       <nav className="fixed top-0 left-0 w-full z-50 shadow-lg bg-[#F9F9F9]">
//         <div className="container mx-auto px-4 py-4 flex justify-between items-center">
//           <div className="flex items-center">
//             <Link href="/" onClick={handleMobileMenuClose}>
//               <img
//                 src={typeof MeleteLogo1 === 'string' ? MeleteLogo1 : MeleteLogo1.src}
//                 alt="Melete Mental Health Services Logo"
//                 className="h-12 w-auto transition-transform duration-300"
//                 onError={handleLogoError}
//               />
//             </Link>
//           </div>

//           {/* Mobile Menu Toggle */}
//           <div className="md:hidden">
//             <button
//               className="focus:outline-none text-gray-800"
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               aria-label="Toggle mobile menu"
//               aria-expanded={isMobileMenuOpen}
//             >
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
//                 />
//               </svg>
//             </button>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-6">
//             {navItems.map((menu, idx) => (
//               <div
//                 key={idx}
//                 className="group relative"
//                 onMouseEnter={() => menu.items && handleMouseEnter(idx)}
//                 onMouseLeave={() => menu.items && handleMouseLeave()}
//               >
//                 {menu.items ? (
//                   <>
//                     <button
//                       className="flex items-center text-gray-800 font-semibold text-base hover:text-emerald-700 transition-colors duration-300 group"
//                       onClick={() => handleDropdownToggle(idx)}
//                       aria-expanded={openDropdown === idx}
//                       aria-haspopup="true"
//                     >
//                       {menu.name}
//                       <ChevronDown
//                         className={`ml-1 w-4 h-4 transition-transform duration-300 ${
//                           openDropdown === idx ? 'rotate-180' : 'group-hover:rotate-180'
//                         }`}
//                       />
//                     </button>
//                     <div
//                       className={`absolute left-0 top-full bg-white shadow-2xl border border-gray-100 rounded-xl mt-2 min-w-[280px] max-w-[320px] z-50 overflow-hidden transition-all duration-200 ${
//                         openDropdown === idx ? 'opacity-100 visible' : 'opacity-0 invisible'
//                       }`}
//                       onMouseEnter={handleDropdownMouseEnter}
//                       onMouseLeave={handleMouseLeave}
//                     >
//                       <div className="py-3">
//                         {menu.items.map((item) => (
//                           <Link
//                             key={item}
//                             href={`/user/${item.toLowerCase().replace(/\s+/g, '-')}`}
//                             className="group/item flex items-center px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 border-l-3 border-transparent hover:border-emerald-600"
//                             onClick={() => setOpenDropdown(null)}
//                           >
//                             <div className="flex items-center space-x-3 w-full">
//                               <div className="w-2 h-2 rounded-full bg-emerald-600 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200" />
//                               <span className="flex-1 text-left leading-relaxed">{item}</span>
//                             </div>
//                           </Link>
//                         ))}
//                       </div>
//                     </div>
//                   </>
//                 ) : (
//                   <Link
//                     href={menu.href || '#'}
//                     className={`text-base font-semibold transition-colors duration-300 hover:text-emerald-700 ${
//                       isActive(menu.href || '#')
//                         ? 'text-emerald-700 border-b-2 border-emerald-700'
//                         : 'text-gray-800'
//                     }`}
//                   >
//                     {menu.name}
//                   </Link>
//                 )}
//               </div>
//             ))}

//             {/* Desktop Login/User Button */}
//             <div className="flex items-center space-x-3">
//               {
//               auth.name ? (
//                 <div className="flex items-center space-x-2 px-4 py-2 text-gray-800 font-semibold text-base rounded-lg bg-gray-50">
//                   <User className="w-4 h-4" />
//                   <span>{auth.name}</span>
//                 </div>
//               ) :
              
//               (
//                 <Link
//                   href="/user/login"
//                   className="flex items-center space-x-2 px-4 py-2 text-gray-800 font-semibold text-base hover:text-emerald-700 transition-colors duration-300 rounded-lg hover:bg-gray-50"
//                 >
//                   <LogIn className="w-4 h-4" />
//                   <span>Login</span>
//                 </Link>
//               )
//               }
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Mobile Menu */}
//       {isMobileMenuOpen && (
//         <>
//           <div
//             className="fixed inset-0 bg-black/50 z-30 md:hidden"
//             onClick={handleMobileMenuClose}
//           />
//           <div
//             className="md:hidden fixed left-0 right-0 top-16 backdrop-blur-md z-40 flex flex-col min-h-[calc(100vh-4rem)] bg-[#F9F9F9]"
//           >
//             <div className="flex-1 overflow-y-auto p-6 space-y-3">
//               {navItems.map((menu, idx) => (
//                 <div key={idx} className="mb-2">
//                   {menu.items ? (
//                     <>
//                       <button
//                         className="w-full flex justify-between items-center text-gray-800 font-semibold text-lg hover:text-emerald-700 transition-colors duration-300 py-3 px-2 rounded-lg hover:bg-gray-50"
//                         onClick={() => handleDropdownToggle(idx)}
//                         aria-expanded={openDropdown === idx}
//                         aria-haspopup="true"
//                       >
//                         {menu.name}
//                         <ChevronDown
//                           className={`w-5 h-5 transition-transform duration-300 ${
//                             openDropdown === idx ? 'rotate-180' : ''
//                           }`}
//                         />
//                       </button>
//                       {openDropdown === idx && (
//                         <div className="bg-white rounded-xl mt-3 shadow-lg border border-gray-100 overflow-hidden">
//                           <div className="py-2">
//                             {menu.items.map((item) => (
//                               <Link
//                                 key={item}
//                                 href={`/user/${item.toLowerCase().replace(/\s+/g, '-')}`}
//                                 className="group/mobile-item flex items-center px-6 py-4 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 border-l-4 border-transparent hover:border-emerald-600"
//                                 onClick={handleMobileMenuClose}
//                               >
//                                 <div className="flex items-center space-x-3 w-full">
//                                   <div className="w-2 h-2 rounded-full bg-emerald-600 opacity-0 group-hover/mobile-item:opacity-100 transition-opacity duration-200" />
//                                   <span className="flex-1 text-left leading-relaxed">{item}</span>
//                                 </div>
//                               </Link>
//                             ))}
//                           </div>
//                         </div>
//                       )}
//                     </>
//                   ) : (
//                     <Link
//                       href={menu.href || '#'}
//                       className={`block text-lg font-semibold transition-colors duration-300 py-3 px-2 rounded-lg hover:bg-gray-50 ${
//                         isActive(menu.href || '#')
//                           ? 'text-emerald-700 bg-emerald-50 border-l-4 border-emerald-700'
//                           : 'text-gray-800 hover:text-emerald-700'
//                       }`}
//                       onClick={handleMobileMenuClose}
//                     >
//                       {menu.name}
//                     </Link>
//                   )}
//                 </div>
//               ))}

//               {/* Mobile Login/User Button */}
//               <div className="border-t border-gray-200 pt-4 mt-6 space-y-3">
//                 {
//                 auth.name ? (
//                   <div className="flex items-center space-x-3 w-full px-4 py-3 text-lg font-semibold text-gray-800 rounded-lg bg-gray-50">
//                     <User className="w-5 h-5" />
//                     <span>{auth.name}</span>
//                   </div>
//                 ) : 
//                 (
//                   <Link
//                     href="/user/login"
//                     className="flex items-center space-x-3 w-full px-4 py-3 text-lg font-semibold text-gray-800 hover:text-emerald-700 transition-colors duration-300 rounded-lg hover:bg-gray-50"
//                     onClick={handleMobileMenuClose}
//                   >
//                     <LogIn className="w-5 h-5" />
//                     <span>Login</span>
//                   </Link>
//                 )}
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </>
//   );
// };

// export default Navbar;






'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, LogIn, User, LogOut, Mail, Phone, MapPin, Calendar, Camera } from 'lucide-react';
import MeleteLogo from '../../../public/assets/logoWhite.png';
import MeleteLogo1 from '../../../public/assets/Melete-logo-2.svg';
import { NavItem } from '../../types/types';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/app/store';
import { signIn } from '@/store/features/authSlice';
import { setTempUser } from '@/store/features/tempSlice';
import AuthService from '@/services/user/AuthService';
import toast from 'react-hot-toast';

const navItems: NavItem[] = [
  { name: 'Home', href: '/' },
  { name: 'Service', href: '/user/service' },
  { name: 'About', href: '/user/about' },
  {
    name: 'Specialized Care',
    items: [
      'Child-Support',
      'Adult-Support',
      'Parent-Support',
      'Pregnancy-Support',
      'Oldage-Support'
    ]
  },
  { name: 'Our Experts', href: '/user/experts' },
  { name: 'Improve With Us', href: '/user/improve' }
];

const Navbar: React.FC = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const [imageError, setImageError] = useState<boolean>(false);
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Reset image error when auth.image changes
  useEffect(() => {
    setImageError(false);
  }, [auth.image]);

  // Close user dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDropdownToggle = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const handleMouseEnter = (index: number) => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    setOpenDropdown(index);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => setOpenDropdown(null), 300);
    setHoverTimeout(timeout);
  };

  const handleDropdownMouseEnter = (): void => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
  };

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
    setIsUserDropdownOpen(false);
  };

  const handleLogoError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget;
    target.src = typeof MeleteLogo === 'string' ? MeleteLogo : MeleteLogo.src;
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const isActive = (href: string): boolean => pathname === href;

  // Function to get fallback avatar with initials
  const getInitials = (name: string): string => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  const handleLogout = () => {
    // Show confirmation toast
    toast((t) => (
      <div className="flex flex-col items-center space-y-3 p-2">
        <div className="flex items-center space-x-2">
          <LogOut className="w-5 h-5 text-red-500" />
          <span className="font-medium text-gray-800">Are you sure you want to logout?</span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => {
              toast.dismiss(t.id);
            }}
            className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              try {
                // Call logout service
                await AuthService.logout();
                
                // Close dropdown and mobile menu
                setIsUserDropdownOpen(false);
                setIsMobileMenuOpen(false);
                
                // Show success toast
                toast.success('Logout successful!', {
                  duration: 3000,
                  icon: '✅',
                });
                
               
              } catch (error) {
                console.error('Logout failed:', error);
                toast.error('Logout failed. Please try again.', {
                  duration: 1000,
                  icon: '❌',
                });
              }
            }}
            className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    ), {
      duration: 2000,
      position: 'top-center',
    });
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  // Profile Image Component with proper error handling
  const ProfileImage = ({ size, className = "" }: { size: string, className?: string }) => {
    const sizeMap: { [key: string]: string } = {
      small: "w-9 h-9",
      medium: "w-12 h-12", 
      large: "w-16 h-16"
    };

    // Check if we have a valid image URL and no error
    const hasValidImage = auth.image && !imageError;

    if (!hasValidImage) {
      // Fallback to initials avatar with professional styling
      return (
        <div className={`${sizeMap[size]} rounded-full bg-gradient-to-br from-[#015F4A] to-[#014A3B] flex items-center justify-center text-white font-semibold shadow-sm ${className}`}>
          <span className={size === 'large' ? 'text-lg' : size === 'medium' ? 'text-sm' : 'text-xs'}>
            {getInitials(auth.name || '')}
          </span>
        </div>
      );
    }

    return (
      <img
        src={auth.image || ''}
        alt="Profile"
        className={`${sizeMap[size]} rounded-full object-cover shadow-sm ${className}`}
        onError={handleImageError}
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
    );
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 shadow-lg bg-[#F9F9F9]">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" onClick={handleMobileMenuClose}>
              <img
                src={typeof MeleteLogo1 === 'string' ? MeleteLogo1 : MeleteLogo1.src}
                alt="Melete Mental Health Services Logo"
                className="h-12 w-auto transition-transform duration-300"
                onError={handleLogoError}
              />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              className="focus:outline-none text-gray-800"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
                />
              </svg>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((menu, idx) => (
              <div
                key={idx}
                className="group relative"
                onMouseEnter={() => menu.items && handleMouseEnter(idx)}
                onMouseLeave={() => menu.items && handleMouseLeave()}
              >
                {menu.items ? (
                  <>
                    <button
                      className="flex items-center text-gray-800 font-semibold text-base hover:text-[#015F4A] transition-colors duration-300 group"
                      onClick={() => handleDropdownToggle(idx)}
                      aria-expanded={openDropdown === idx}
                      aria-haspopup="true"
                    >
                      {menu.name}
                      <ChevronDown
                        className={`ml-1 w-4 h-4 transition-transform duration-300 ${
                          openDropdown === idx ? 'rotate-180' : 'group-hover:rotate-180'
                        }`}
                      />
                    </button>
                    <div
                      className={`absolute left-0 top-full bg-white shadow-2xl border border-gray-100 rounded-xl mt-2 min-w-[280px] max-w-[320px] z-50 overflow-hidden transition-all duration-200 ${
                        openDropdown === idx ? 'opacity-100 visible' : 'opacity-0 invisible'
                      }`}
                      onMouseEnter={handleDropdownMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="py-3">
                        {menu.items.map((item) => (
                          <Link
                            key={item}
                            href={`/user/${item.toLowerCase().replace(/\s+/g, '-')}`}
                            className="group/item flex items-center px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 border-l-3 border-transparent hover:border-[#015F4A]"
                            onClick={() => setOpenDropdown(null)}
                          >
                            <div className="flex items-center space-x-3 w-full">
                              <div className="w-2 h-2 rounded-full bg-[#015F4A] opacity-0 group-hover/item:opacity-100 transition-opacity duration-200" />
                              <span className="flex-1 text-left leading-relaxed">{item}</span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={menu.href || '#'}
                    className={`text-base font-semibold transition-colors duration-300 hover:text-[#015F4A] ${
                      isActive(menu.href || '#')
                        ? 'text-[#015F4A] border-b-2 border-[#015F4A]'
                        : 'text-gray-800'
                    }`}
                  >
                    {menu.name}
                  </Link>
                )}
              </div>
            ))}

            {/* Desktop Login/User Section - IMPROVED */}
            <div className="flex items-center">
              {auth.name ? (
                <div className="relative" ref={userDropdownRef}>
                  {/* Clean Profile Button - No Box Style */}
                  <button
                    onClick={toggleUserDropdown}
                    className="flex items-center space-x-3 px-2 py-1 rounded-full hover:bg-gray-100/70 transition-all duration-200 group"
                    aria-expanded={isUserDropdownOpen}
                    aria-haspopup="true"
                  >
                    <ProfileImage size="small" />
                    <div className="flex items-center space-x-1">
                      <span className="text-gray-800 font-medium text-base group-hover:text-[#015F4A] transition-colors duration-200 max-w-[120px] truncate">
                        {auth.name}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-gray-500 group-hover:text-[#015F4A] transition-all duration-200 ${
                          isUserDropdownOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </button>

                  {/* Enhanced User Dropdown */}
                  {isUserDropdownOpen && (
                    <div className="absolute right-0 top-full bg-white shadow-xl border border-gray-200 rounded-xl mt-3 w-72 z-50 overflow-hidden">
                      {/* Profile Header */}
                      <div className="bg-gradient-to-r from-[#015F4A] to-[#014A3B] p-5 text-white">
                        <div className="flex items-center space-x-3">
                          <ProfileImage size="medium" className="ring-2 ring-white/30" />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-white truncate">{auth.name}</h3>
                            <p className="text-white/80 text-sm truncate">{auth.email}</p>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="p-2">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200 rounded-lg"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/user/login"
                  className="flex items-center space-x-2 px-4 py-2 text-gray-800 font-semibold text-base hover:text-[#015F4A] transition-colors duration-300 rounded-lg hover:bg-gray-100/70"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={handleMobileMenuClose}
          />
          <div className="md:hidden fixed left-0 right-0 top-16 backdrop-blur-md z-40 flex flex-col min-h-[calc(100vh-4rem)] bg-[#F9F9F9]">
            <div className="flex-1 overflow-y-auto p-6 space-y-3">
              {navItems.map((menu, idx) => (
                <div key={idx} className="mb-2">
                  {menu.items ? (
                    <>
                      <button
                        className="w-full flex justify-between items-center text-gray-800 font-semibold text-lg hover:text-[#015F4A] transition-colors duration-300 py-3 px-2 rounded-lg hover:bg-gray-50"
                        onClick={() => handleDropdownToggle(idx)}
                        aria-expanded={openDropdown === idx}
                        aria-haspopup="true"
                      >
                        {menu.name}
                        <ChevronDown
                          className={`w-5 h-5 transition-transform duration-300 ${
                            openDropdown === idx ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {openDropdown === idx && (
                        <div className="bg-white rounded-xl mt-3 shadow-lg border border-gray-100 overflow-hidden">
                          <div className="py-2">
                            {menu.items.map((item) => (
                              <Link
                                key={item}
                                href={`/user/${item.toLowerCase().replace(/\s+/g, '-')}`}
                                className="group/mobile-item flex items-center px-6 py-4 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 border-l-4 border-transparent hover:border-[#015F4A]"
                                onClick={handleMobileMenuClose}
                              >
                                <div className="flex items-center space-x-3 w-full">
                                  <div className="w-2 h-2 rounded-full bg-[#015F4A] opacity-0 group-hover/mobile-item:opacity-100 transition-opacity duration-200" />
                                  <span className="flex-1 text-left leading-relaxed">{item}</span>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={menu.href || '#'}
                      className={`block text-lg font-semibold transition-colors duration-300 py-3 px-2 rounded-lg hover:bg-gray-50 ${
                        isActive(menu.href || '#')
                          ? 'text-[#015F4A] bg-[#015F4A]/10 border-l-4 border-[#015F4A]'
                          : 'text-gray-800 hover:text-[#015F4A]'
                      }`}
                      onClick={handleMobileMenuClose}
                    >
                      {menu.name}
                    </Link>
                  )}
                </div>
              ))}

              {/* Mobile Profile Section - IMPROVED */}
              <div className="border-t border-gray-200 pt-4 mt-6">
                {auth.name ? (
                  <div className="space-y-4">
                    {/* Clean Mobile Profile Display */}
                    <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                      <ProfileImage size="medium" />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">{auth.name}</h3>
                        <p className="text-gray-600 text-sm truncate">{auth.email}</p>
                      </div>
                    </div>
                    
                    {/* Logout Button */}
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 w-full px-4 py-3 text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors duration-300 rounded-lg border border-red-200"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/user/login"
                    className="flex items-center space-x-3 w-full px-4 py-3 text-lg font-semibold text-gray-800 hover:text-[#015F4A] transition-colors duration-300 rounded-lg hover:bg-gray-50"
                    onClick={handleMobileMenuClose}
                  >
                    <LogIn className="w-5 h-5" />
                    <span>Login</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;