'use client';

import { TaskCategoryDistribution } from '@/components/charts/task-category-distribution-pie-chart';
import { TaskCompletionBarChart } from '@/components/charts/task-completion-bar-chart';
import { TaskCompletionTrend } from '@/components/charts/task-completion-trend-line';

export const MetricsSection: React.FC = () => {
  return (
    <div id="metrics" className="bg-white py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              Task Distribution by Category
            </h3>
            <div className="w-full h-full flex justify-center">
              <div className="max-w-[500px] max-h-[500px] w-full h-full">
                <TaskCategoryDistribution />
              </div>
            </div>
          </div>

          <div className="grid grid-rows-2 gap-8">
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                Tasks Completed Over Time
              </h3>
              <div className="w-full h-full">
                <div className="max-w-[500px] max-h-[300px] w-full h-full mx-auto">
                  <TaskCompletionBarChart />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                Task Completion Trend
              </h3>
              <div className="w-full h-full">
                <div className="max-w-[500px] max-h-[300px] w-full h-full mx-auto">
                  <TaskCompletionTrend />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
