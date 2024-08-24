'use client';

import { Bars3Icon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

import { ButtonIcon } from '@/components/base/button-icon';
import { Logo } from '@/components/feature/logo';
import { MobileMenu } from '@/components/feature/mobile-menu';
import { NavigationLinks } from '@/components/feature/navigation-links';

const navigation = [
  { name: 'Application', href: '#application' },
  { name: 'Metrics', href: '#metrics' },
  { name: 'Notifications', href: '#' },
  { name: 'Pricing', href: '#' },
];

export const Header: React.FC<{ onSignIn?: () => void }> = ({ onSignIn }) => {
  const pathname = usePathname();
  const router = useRouter();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSignIn = () => {
    setIsAnimating(true);
    setTimeout(() => {
      onSignIn?.();
    }, 500);
  };

  const handleGoHome = () => {
    router.push('/');
  };

  const isSignInPage = pathname === '/sign-in';

  return (
    <header className="relative z-20">
      <nav
        aria-label="Global"
        className="flex items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1" onClick={handleGoHome}>
          <Logo />
        </div>
        {!isSignInPage && (
          <div
            className={clsx(
              'flex justify-center flex-1 lg:flex-none',
              isAnimating && 'opacity-0 transition-opacity duration-500'
            )}
          >
            <NavigationLinks navigation={navigation} />
          </div>
        )}
        <div className="flex lg:flex-1 lg:justify-end items-center">
          <ButtonIcon
            className="lg:hidden"
            srText="Open mobile menu"
            icon={Bars3Icon}
            onClick={() => setMobileMenuOpen(true)}
          />
          {!isSignInPage && (
            <div
              onClick={handleSignIn}
              className={clsx(
                'hidden lg:inline-block text-sm font-semibold leading-6 text-gray-900 ml-6 cursor-pointer',
                isAnimating && 'opacity-0 transition-opacity duration-500'
              )}
            >
              Sign in <span aria-hidden="true">&rarr;</span>
            </div>
          )}
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
