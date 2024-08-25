'use client';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';

import { SkeletonTaskCard } from '@/components/base/skeleton';
import { CreateTaskCard } from '@/components/feature/create-task-card';
import { TaskCard } from '@/components/feature/task-card';
import { ITask } from '@/types/task';

interface TaskListProps {
  tasks: ITask[];
  loadingTasks: boolean;
  onDelete: (id: number) => void;
  currentTaskId?: string;
  isMain?: boolean;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  loadingTasks,
  onDelete,
  currentTaskId,
  isMain = false,
}) => {
  const router = useRouter();

  const handleTaskClick = (id: number) => {
    if (isMain) {
      router.push(`/dashboard/${id}`);
    } else {
      console.log('Clicked suggestion');
    }
  };

  return (
    <div className="mt-8">
      <div className="mx-auto grid w-full max-w-full grid-cols-1 gap-x-4 gap-y-8 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-0">
        <CreateTaskCard />
        {loadingTasks ? (
          <>
            <SkeletonTaskCard />
            <SkeletonTaskCard />
          </>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
              start_date={task.start_date}
              due_date={task.due_date}
              updated_at={task.updated_at}
              completion={task.completion}
              className={clsx(
                'min-h-[12rem]',
                task.id.toString() === currentTaskId &&
                  'border-2 border-blue-500'
              )}
              onDelete={onDelete}
              onClick={() => handleTaskClick(task.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};
