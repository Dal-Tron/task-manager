import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

import { mockTasks, mockTags } from '@/mocks';

ChartJS.register(ArcElement, Tooltip, Legend);

export const TaskCategoryDistribution = () => {
  // Create a mapping of tag IDs to tag names
  const tagMap = mockTags.reduce(
    (acc, tag) => {
      acc[tag.id] = tag.name;
      return acc;
    },
    {} as Record<number, string>
  );

  // Flatten the tags from each task, map them to names, and count occurrences
  const tagCounts = mockTasks.reduce(
    (acc, task) => {
      task.tags.forEach((tagId) => {
        const tagName = tagMap[tagId];
        acc[tagName] = (acc[tagName] || 0) + 1;
      });
      return acc;
    },
    {} as Record<string, number>
  );

  const data = {
    labels: Object.keys(tagCounts),
    datasets: [
      {
        data: Object.values(tagCounts),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#FF6384',
          '#36A2EB',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#FF6384',
          '#36A2EB',
        ],
      },
    ],
  };

  return <Pie data={data} />;
};
