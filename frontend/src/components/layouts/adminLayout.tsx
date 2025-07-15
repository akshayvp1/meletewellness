'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { LayoutDashboard, Users, UserPlus, HelpCircle, LogOut, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { toast } from 'react-hot-toast';
import companyLogo from '@/../public/assets/logoWhite.png';
import AuthService from '../../services/AuthService';

// Utility for className merging (replacement for cn)
const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

// Mock useIsMobile hook
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return isMobile;
};

// Mock Redux store
const store = {
  getState: () => ({
    tempUser: {
      tempUser: { name: 'Admin', role: 'admin', profileImage: '' },
    },
  }),
};

type NavItem = {
  icon: React.ElementType;
  label: string;
  path: string;
  mobileVisible?: boolean;
};

interface AdminDashboardLayoutProps {
  children: React.ReactNode;
}

const user = store.getState().tempUser.tempUser;

const AdminDashboardLayout: React.FC<AdminDashboardLayoutProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isCompact, setIsCompact] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleNavClick = (item: NavItem) => {
    router.push(item.path);
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await AuthService.logout();
      localStorage.clear(); 
      router.push('/admin-login');
      toast.success('Successfully logged out!', { duration: 3000, position: 'top-right' });
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error('Logout failed. Please try again.');
    } finally {
      setIsLoggingOut(false);
    }
  };

  const navigationItems: NavItem[] = [
    { 
      icon: LayoutDashboard, 
      label: 'Dashboard', 
      path: '/admin/dashboard', 
      mobileVisible: true 
    },
    { 
      icon: Users, 
      label: 'Counsellor Management', 
      path: '/admin/counsellor-management', 
      mobileVisible: true 
    },
    { 
      icon: UserPlus, 
      label: 'Add Counsellor', 
      path: '/admin/counsellor', 
      mobileVisible: true 
    },
    { 
      icon: UserPlus, 
      label: 'Add User', 
      path: '/admin/add-user', 
      mobileVisible: true 
    },
    { 
      icon: Users, 
      label: 'College Management', 
      path: '/admin/add-colleges', 
      mobileVisible: true 
    },
    
    { 
      icon: HelpCircle, 
      label: 'Help', 
      path: '', 
      mobileVisible: true 
    },
  ];

  const mobileNavItems = navigationItems.filter(item => item.mobileVisible);

  const SidebarContent = () => (
    <>
      {/* Header with Logo */}
      <div className={cn(
        'flex justify-between items-center p-6 border-b border-white/10 bg-[#0A4F43]'
      )}>
        <div 
          className={cn(
            'flex items-center transition-all duration-300 ease-in-out',
            isCompact && !isMobile ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'
          )}
        >
          <img
            src={companyLogo.src}
            alt="Company Logo"
            className="h-10 mr-3"
          />
          <h1 className="text-xl font-bold text-white"></h1>
        </div>
        
        {!isMobile && (
          <button
            onClick={() => setIsCompact(!isCompact)}
            className="text-white hover:bg-white/10 p-2 rounded-full transition-all duration-200"
          >
            {isCompact ? 
              <ChevronsRight className="h-5 w-5 transition-transform duration-300 ease-in-out transform hover:scale-110" /> : 
              <ChevronsLeft className="h-5 w-5 transition-transform duration-300 ease-in-out transform hover:scale-110" />
            }
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-grow py-6 overflow-y-auto bg-[#0A4F43]">
        <div className="space-y-1.5 px-3">
          {navigationItems.map((item, index) => {
            const isActive = pathname === item.path;
            return (
              <button 
                key={item.label}
                className="block w-full"
                onClick={() => handleNavClick(item)}
                style={{ 
                  animationDelay: `${index * 50}ms`,
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateY(0)' : 'translateY(10px)',
                  transition: 'opacity 300ms ease, transform 300ms ease'
                }}
              >
                <div 
                  className={cn(
                    'flex items-center p-3 rounded-xl transition-all duration-200 group text-left',
                    isActive ? 'bg-white/20 text-white shadow-md' : 'text-white/80 hover:bg-white/10',
                    isCompact && !isMobile && 'justify-center'
                  )}
                >
                  <item.icon className={cn(
                    'h-5 w-5 transition-transform duration-200',
                    isActive ? 'text-white' : 'group-hover:text-white group-hover:scale-110',
                    isCompact && !isMobile ? 'mx-auto' : 'mr-4'
                  )} />
                  <span 
                    className={cn(
                      'font-medium transition-all duration-300 whitespace-nowrap',
                      isCompact && !isMobile ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'
                    )}
                  >
                    {item.label}
                  </span>
                  
                  {isActive && !isCompact && !isMobile && (
                    <div className="ml-auto h-2 w-2 rounded-full bg-white" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </nav>

      {/* User Profile and Logout */}
      <div className={cn(
        'p-4 mx-3 mb-4 rounded-xl bg-[#0A4F43]/80 border border-white/10 transition-all duration-300',
        isCompact && !isMobile ? 'px-2' : ''
      )}>
        <div 
          className={cn(
            'flex items-center transition-all duration-300',
            isCompact && !isMobile ? 'justify-center' : 'justify-start'
          )}
        >
          <div className={cn(
            'rounded-full overflow-hidden border-2 border-white/20 shadow-sm transition-transform duration-200 hover:scale-105',
            isCompact && !isMobile ? 'h-10 w-10' : 'h-10 w-10 mr-3'
          )}>
            {user?.profileImage ? (
              <img src={user.profileImage} alt="Admin Avatar" className="w-full h-full object-cover" />
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-white/20 text-white font-semibold">
                AD
              </div>
            )}
          </div>
          <div 
            className={cn(
              'transition-all duration-300 overflow-hidden',
              isCompact && !isMobile ? 'opacity-0 w-0' : 'opacity-100'
            )}
          >
            <p className="font-semibold text-white">{user?.name || 'Admin User'}</p>
            <p className="text-xs text-white/70">{user?.role || 'Administrator'}</p>
          </div>
        </div>
        
        <button 
          className={cn(
            'w-full mt-3 text-white/80 hover:text-white hover:bg-white/10 flex items-center rounded-xl transition-all duration-200 px-4 py-2',
            isCompact && !isMobile ? 'p-2 h-10 justify-center' : 'justify-start'
          )}
          onClick={handleLogout}
          disabled={isLoggingOut}
        >
          <LogOut className={cn(
            'h-5 w-5 transition-transform duration-200 hover:scale-110',
            isCompact && !isMobile ? '' : 'mr-3'
          )} />
          <span 
            className={cn(
              'font-medium transition-all duration-300',
              isCompact && !isMobile ? 'hidden' : 'block'
            )}
          >
            {isLoggingOut ? 'Logging out...' : 'Logout'}
          </span>
        </button>
      </div>
    </>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      {/* Desktop Sidebar */}
      {!isMobile && (
        <div 
          className={cn(
            'bg-[#0A4F43] border-r border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.05)] flex flex-col transition-all duration-300 ease-in-out z-20',
            isCompact ? 'w-20' : 'w-80',
            mounted && 'animate-in fade-in'
          )}
        >
          <SidebarContent />
        </div>
      )}

      {/* Main Content Area */}
      <main 
        className={cn(
          'flex-grow overflow-y-auto transition-all duration-300 bg-white',
          isMobile ? 'pb-20 pt-16' : 'p-6'
        )}
      >
        {children}
      </main>

      {/* Mobile Header */}
      {isMobile && (
        <div className="fixed top-0 left-0 right-0 bg-[#0A4F43] border-b border-white/10 z-40 px-4 py-3 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src={companyLogo.src}
                alt="Company Logo"
                className="h-8 mr-2"
              />
              <h1 className="text-xl font-bold text-white">Admin Portal</h1>
            </div>
            <div className="rounded-full overflow-hidden border-2 border-white/20 shadow-sm h-8 w-8">
              {user?.profileImage ? (
                <img src={user.profileImage} alt="Admin Avatar" className="w-full h-full object-cover" />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-white/20 text-white font-semibold">
                  AD
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#0A4F43] border-t border-white/10 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] h-16 z-50">
          <div className="grid grid-cols-4 h-full">
            {mobileNavItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item)}
                  className={cn(
                    'flex flex-col items-center justify-center transition-colors duration-200',
                    isActive ? 'text-white' : 'text-white/70 hover:text-white'
                  )}
                >
                  <item.icon className={cn(
                    'h-5 w-5 mb-1',
                    isActive && 'text-white'
                  )} />
                  <span className="text-xs font-medium">
                    {item.label === 'Add Counsellor' ? 'Add' : item.label.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardLayout;