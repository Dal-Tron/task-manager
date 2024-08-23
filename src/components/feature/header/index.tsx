'use client';

import { Bars3Icon } from '@heroicons/react/24/outline';
import { useState } from 'react';

import { ButtonIcon } from '@/components/base/button-icon';
import { Logo } from '@/components/feature/logo';
import { MobileMenu } from '@/components/feature/mobile-menu';
import { NavigationLinks } from '@/components/feature/navigation-links';

const navigation = [
  { name: 'Application', href: '#application' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
];

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="relative z-20">
      <nav
        aria-label="Global"
        className="flex items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <Logo />
        </div>
        <div className="flex justify-center flex-1 lg:flex-none">
          <NavigationLinks navigation={navigation} />
        </div>
        <div className="flex lg:flex-1 lg:justify-end">
          <ButtonIcon
            className="lg:hidden"
            srText="Open mobile menu"
            icon={Bars3Icon}
            onClick={() => setMobileMenuOpen(true)}
          />
          <a
            href="#"
            className="hidden lg:inline-block text-sm font-semibold leading-6 text-gray-900 ml-6"
          >
            Log in <span aria-hidden="true">&rarr;</span>
          </a>
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
