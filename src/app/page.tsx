'use client';

import { Bars3Icon } from '@heroicons/react/24/outline';
import { useState } from 'react';

import { ButtonIcon } from '@/components/base/button-icon';
import { Announcement } from '@/components/feature/announcement';
import { BackgroundShapes } from '@/components/feature/background-shapes';
import { HeroSection } from '@/components/feature/hero-section';
import { Logo } from '@/components/feature/logo';
import { MobileMenu } from '@/components/feature/mobile-menu';
import { NavigationLinks } from '@/components/feature/navigation-links';

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
];

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-white relative overflow-hidden">
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

      <BackgroundShapes />

      <main className="relative z-10 px-6 lg:px-8">
        <div className="mx-auto max-w-2xl pt-24 pb-32 sm:py-48 lg:py-48">
          <Announcement />
          <HeroSection />
        </div>
      </main>
    </div>
  );
}
