'use client';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { BannerSection } from '@/components/base/banner';
import { Announcement } from '@/components/feature/announcement';
import { ApplicationSection } from '@/components/feature/application-section';
import { BackgroundShapes } from '@/components/feature/background-shapes';
import { Footer } from '@/components/feature/footer';
import { Header } from '@/components/feature/header';
import { HeroSection } from '@/components/feature/hero-section';
import { MetricsSection } from '@/components/feature/metrics-section';

export default function Page() {
  const router = useRouter();
  const [isAnimating, setIsAnimating] = useState(false);

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

  const handleAnimate = () => {
    setIsAnimating(true);
    setTimeout(() => {
      router.replace('/sign-in');
    }, 500);
  };

  return (
    <div className="bg-white">
      <Header onSignIn={handleAnimate} />
      <BackgroundShapes />

      <main
        className={clsx('lg:px-8 z-20 relative', {
          'animate-slideOutLeft': isAnimating,
        })}
      >
        <div className="mx-auto max-w-2xl pt-24 pb-32 sm:py-48 lg:py-48 px-6">
          <Announcement />
          <HeroSection />
        </div>
        <div id="application" className="min-h-screen h-auto">
          <BannerSection
            title="Get Task Suggestions"
            subtitle="Expert tips and tools to help you succeed."
          />
          <ApplicationSection />
        </div>
        <div id="metrics" className="min-h-screen h-auto">
          <BannerSection
            title="Analyze Your Task Completion"
            subtitle="Gain insights with top-tier metrics on how your tasks are completed."
            backgroundStyle={{
              backgroundImage: `linear-gradient(20deg, rgba(67, 97, 238, 0.05) 0%, rgba(67, 97, 238, 0.1) 100%)`,
              backgroundSize: '150% 150%',
            }}
          />

          <MetricsSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
