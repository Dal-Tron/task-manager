import { XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

import { Modal } from '@/components/base/modal';
import { SkeletonTaskCard } from '@/components/base/skeleton';
import { TaskCard } from '@/components/feature/task-card';
import { ITask } from '@/types/task';

interface TaskSuggestionsModalProps {
  isOpen: boolean;
  closeModal: () => void;
  suggestions: ITask[];
  onSelectTask: (task: ITask) => void;
  loading: boolean;
}

export const TaskSuggestionsModal: React.FC<TaskSuggestionsModalProps> = ({
  isOpen,
  closeModal,
  suggestions,
  onSelectTask,
  loading,
}) => {
  return (
    <Modal isOpen={isOpen} closeModal={closeModal} title="Suggested Tasks" wide>
      <div className="absolute top-4 right-4">
        <XMarkIcon
          className="h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-700"
          onClick={closeModal}
        />
      </div>
      <div className="mt-8">
        <div className="mx-auto grid w-full max-w-full grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <>
              <SkeletonTaskCard className="min-h-[12rem]" />
              <SkeletonTaskCard className="min-h-[12rem]" />
              <SkeletonTaskCard className="min-h-[12rem]" />
            </>
          ) : (
            suggestions.map((task, index) => (
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
                  'cursor-pointer',
                  index >= 3 && 'hidden sm:hidden md:block lg:block'
                )}
                onClick={() => onSelectTask(task)}
                hideActions // Hide the bottom icons
              />
            ))
          )}
        </div>
      </div>
    </Modal>
  );
};
