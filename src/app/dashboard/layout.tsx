import { DashboardHeader } from '@/components/feature/dashboard-header';
import { Footer } from '@/components/feature/footer';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-white">
      <DashboardHeader />
      {children}
      <Footer />
    </div>
  );
}
