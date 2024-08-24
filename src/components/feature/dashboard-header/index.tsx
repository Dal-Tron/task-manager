'use client';

import { Bars3Icon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { ButtonIcon } from '@/components/base/button-icon';
import { Logo } from '@/components/feature/logo';
import { MobileMenu } from '@/components/feature/mobile-menu';
import { NavigationLinks } from '@/components/feature/navigation-links';
import { useAuth } from '@/context/auth';

const navigation = [
  { name: 'Generation', href: '#application' },
  { name: 'Analysis', href: '#metrics' },
  { name: 'Tracking', href: '#' },
  { name: 'Settings', href: '#' },
];

export const DashboardHeader: React.FC = () => {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <header className="bg-white relative z-20">
      <nav
        aria-label="Global"
        className="flex items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1 cursor-pointer" onClick={handleGoHome}>
          <Logo />
        </div>
        <div className="flex justify-center flex-1 lg:flex-none">
          <NavigationLinks navigation={navigation} />
        </div>
        <div className="flex lg:flex-1 lg:justify-end items-center">
          <ButtonIcon
            className="lg:hidden"
            srText="Open mobile menu"
            icon={Bars3Icon}
            onClick={() => setMobileMenuOpen(true)}
          />
          <div
            onClick={handleSignOut}
            className="hidden lg:inline-block text-sm font-semibold leading-6 text-gray-900 ml-6 cursor-pointer"
          >
            Sign out <span aria-hidden="true">&rarr;</span>
          </div>
        </div>
      </nav>
      <MobileMenu
        navigation={navigation}
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </header>
  );
};
