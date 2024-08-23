'use client';

import { useState } from 'react';

import { TaskCard } from '@/components/feature/task-card';
import { TaskInput } from '@/components/feature/task-input';

import { CreateSubtaskCard } from '../create-subtask';

const tasks = [
  {
    id: 1,
    title: 'Finish the project report',
    description:
      'Complete the final draft of the project report and submit it by end of the day.',
    date: 'Aug 22, 2024',
    datetime: '2024-08-22',
    category: { title: 'Work', href: '#' },
  },
  {
    id: 2,
    title: 'Plan team meeting',
    description:
      'Prepare the agenda and send out invites for the team meeting next week.',
    date: 'Aug 20, 2024',
    datetime: '2024-08-20',
    category: { title: 'Meetings', href: '#' },
  },
  {
    id: 3,
    title: 'Update project timeline',
    description:
      'Review the project timeline and update the tasks based on the current progress.',
    date: 'Aug 18, 2024',
    datetime: '2024-08-18',
    category: { title: 'Project', href: '#' },
  },
];

export const ApplicationSection = () => {
  const [inputValue, setInputValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');

  const handleCreateClick = () => {
    console.log('Create clicked with input:', inputValue);
  };

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center w-full">
          <TaskInput
            inputValue={inputValue}
            descriptionValue={descriptionValue}
            onInputChange={setInputValue}
            onDescriptionChange={setDescriptionValue}
            onSaveTask={handleCreateClick}
          />
        </div>

        <div className="mx-auto mt-16 grid w-full max-w-full grid-cols-1 gap-x-4 gap-y-8 border-t border-gray-200 pt-10 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-0">
          <CreateSubtaskCard />
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
              date={task.date}
              datetime={task.datetime}
              category={task.category}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
