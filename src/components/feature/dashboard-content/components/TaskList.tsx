'use client';

import { SkeletonTaskCard } from '@/components/base/skeleton';
import { TaskCard } from '@/components/feature/task-card';
import { ITask } from '@/types/task';

import { CreateTaskCard } from '../../create-task';

interface TaskListProps {
  tasks: ITask[];
  loadingTasks: boolean;
  onDelete: (id: number) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  loadingTasks,
  onDelete,
}) => {
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
              className="min-h-[12rem]"
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  );
};
