import { DashboardContent } from '@/components/feature/dashboard-content';
import { DashboardHeader } from '@/components/feature/dashboard-header';
import { Footer } from '@/components/feature/footer';

export default function DashboardPage() {
  return (
    <div className="bg-white">
      <DashboardHeader />
      <DashboardContent />
      <Footer />
    </div>
  );
}
