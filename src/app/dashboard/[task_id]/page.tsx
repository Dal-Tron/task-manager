'use client';

import DashboardContent from '@/components/feature/dashboard-content';

export default function TaskDetailPage({
  params,
}: {
  params: { task_id: string };
}) {
  return <DashboardContent params={params} />;
}
