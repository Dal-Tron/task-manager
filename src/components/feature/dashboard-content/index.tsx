'use client';

import clsx from 'clsx';
import { useState } from 'react';

import { HorizontalLine } from '@/components/base/horizontal-line';
import { SkeletonTaskCard } from '@/components/base/skeleton/SkeletonTaskCard';
import { CreateSubtaskCard } from '@/components/feature/create-subtask';
import { TaskCard } from '@/components/feature/task-card';
import { TaskInput } from '@/components/feature/task-input';
import { useAuth } from '@/context/auth';
import TaskService from '@/services/tasks';

interface Subtask {
  title: string;
  description: string;
  start_date?: string;
  due_date?: string;
  updated_at?: string;
  completion?: number;
}

export const DashboardContent = () => {
  const [inputValue, setInputValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [subtasks, setSubtasks] = useState<Subtask[]>([]);
  const [loadingSubtasks, setLoadingSubtasks] = useState(false);

  const handleSaveTask = async () => {
    setLoadingSubtasks(true);
    setSubtasks([]);

    try {
      const task = await TaskService.createTask({
        title: inputValue,
        description: descriptionValue,
        start_date: new Date().toISOString(),
        due_date: new Date().toISOString(),
        completion: 0,
      });

      // Mock generating subtasks (This is where you would call your API)
      const response = await fetch('/api/generate-subtasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: inputValue,
          description: descriptionValue,
        }),
      });

      const data = await response.json();

      setSubtasks(data.subtasks);
    } catch (error) {
      console.error('Error saving task or generating subtasks:', error);
    } finally {
      setLoadingSubtasks(false);
    }
  };

  return (
    <div className="pb-14 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center w-full mb-8">
          <TaskInput
            inputValue={inputValue}
            descriptionValue={descriptionValue}
            onInputChange={setInputValue}
            onDescriptionChange={(e) => setDescriptionValue(e.target.value)}
            onSaveTask={handleSaveTask}
          />
        </div>

        <HorizontalLine text="Subtasks" pulse={true} />

        <div className="mx-auto mt-8 grid w-full max-w-full grid-cols-1 gap-x-4 gap-y-8 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-0">
          <CreateSubtaskCard />
          {loadingSubtasks ? (
            <>
              <SkeletonTaskCard />
              <SkeletonTaskCard />
              <SkeletonTaskCard />
              <SkeletonTaskCard />
              <SkeletonTaskCard />
            </>
          ) : (
            subtasks.map((task, index) => (
              <TaskCard
                key={index}
                id={index + 1}
                title={task.title}
                description={task.description}
                start_date={task.start_date}
                due_date={task.due_date}
                updated_at={task.updated_at}
                completion={task.completion}
                className={clsx('min-h-[12rem]', {
                  'hidden sm:block': index >= 2,
                })}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};
