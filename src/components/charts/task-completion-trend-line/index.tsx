import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import { mockTasks } from '@/mocks/mockTasks';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const TaskCompletionTrend = () => {
  // Group tasks by start_date and calculate average completion
  const taskCompletionByDate = mockTasks.reduce(
    (acc, task) => {
      const startDate = task.start_date.split('T')[0]; // Extract date part only
      if (!acc[startDate]) {
        acc[startDate] = { totalCompletion: 0, taskCount: 0 };
      }
      acc[startDate].totalCompletion += task.completion;
      acc[startDate].taskCount += 1;
      return acc;
    },
    {} as Record<string, { totalCompletion: number; taskCount: number }>
  );

  // Sort the dates in ascending order
  const dates = Object.keys(taskCompletionByDate).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  // Calculate the average completion percentage for each date
  const completionPercentages = dates.map(
    (date) =>
      taskCompletionByDate[date].totalCompletion /
      taskCompletionByDate[date].taskCount
  );

  const data = {
    labels: dates,
    datasets: [
      {
        label: 'Average Task Completion (%)',
        data: completionPercentages,
        fill: false,
        backgroundColor: '#FF6384',
        borderColor: '#FF6384',
        tension: 0.1,
      },
    ],
  };

  return <Line data={data} />;
};
