'use client';

import { useEffect } from 'react';

import { Announcement } from '@/components/feature/announcement';
import ApplicationSection from '@/components/feature/application-section';
import { BackgroundShapes } from '@/components/feature/background-shapes';
import { Footer } from '@/components/feature/footer';
import { Header } from '@/components/feature/header';
import { HeroSection } from '@/components/feature/hero-section';

export default function Page() {
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.scrollY === 0 &&
        (window.location.hash || window.location.search)
      ) {
        history.replaceState(null, '', window.location.pathname);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="bg-white">
      <Header />
      <BackgroundShapes />

      <main className="lg:px-8 z-20 relative">
        <div className="mx-auto max-w-2xl pt-24 pb-32 sm:py-48 lg:py-48 px-6">
          <Announcement />
          <HeroSection />
        </div>
        <div id="application" className="min-h-screen h-auto">
          <ApplicationSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
