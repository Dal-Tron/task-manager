'use client';

import clsx from 'clsx';
import { useEffect, useState } from 'react';

import { BackgroundShapes } from '@/components/feature/background-shapes';
import { Footer } from '@/components/feature/footer';
import { Header } from '@/components/feature/header';
import { SignIn } from '@/components/feature/sign-in';

export default function Page() {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
  }, []);

  return (
    <div className="bg-white">
      <Header />
      <BackgroundShapes />

      <main
        className={clsx(
          'lg:px-8 z-20 relative transition-transform duration-500 ease-out',
          {
            'translate-x-0': isAnimating,
            'translate-x-full': !isAnimating,
          }
        )}
      >
        <div className="min-h-screen mx-auto max-w-2xl pb-32 px-6">
          <SignIn />
        </div>
      </main>
      <Footer />
    </div>
  );
}
