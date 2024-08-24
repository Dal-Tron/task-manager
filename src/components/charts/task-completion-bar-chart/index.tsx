import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import { mockTasks } from '@/constants/mockTasks';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const TaskCompletionBarChart = () => {
  // Group tasks by date and calculate average completion
  const taskCompletionByDate = mockTasks.reduce(
    (acc, task) => {
      if (!acc[task.date]) {
        acc[task.date] = { totalCompletion: 0, taskCount: 0 };
      }
      acc[task.date].totalCompletion += task.completion;
      acc[task.date].taskCount += 1;
      return acc;
    },
    {} as Record<string, { totalCompletion: number; taskCount: number }>
  );

  // Sort the dates in ascending order
  const dates = Object.keys(taskCompletionByDate).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

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
        backgroundColor: '#36A2EB',
        borderColor: '#36A2EB',
        borderWidth: 1,
      },
    ],
  };

  return <Bar data={data} />;
};
