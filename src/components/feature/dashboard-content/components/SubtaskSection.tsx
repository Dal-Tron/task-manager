'use client';

import clsx from 'clsx';

import { SkeletonTaskCard } from '@/components/base/skeleton/SkeletonTaskCard';
import { CreateSubtaskCard } from '@/components/feature/create-subtask';
import { TaskCard } from '@/components/feature/task-card';

interface Subtask {
  title: string;
  description: string;
  start_date?: string;
  due_date?: string;
  updated_at?: string;
  completion?: number;
}

interface SubtaskSectionProps {
  subtasks: Subtask[];
  loadingSubtasks: boolean;
}

export const SubtaskSection: React.FC<SubtaskSectionProps> = ({
  subtasks,
  loadingSubtasks,
}) => {
  return (
    <div className="mx-auto mb-8 mt-8 grid w-full max-w-full grid-cols-1 gap-x-4 gap-y-8 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-0">
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
  );
};
