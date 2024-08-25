import { TrashIcon, PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Dialog } from '@/components/base/dialog';

interface TaskCardProps {
  id: number;
  title: string;
  description: string;
  start_date?: string;
  due_date?: string;
  updated_at?: string;
  completion?: number;
  className?: string;
  demo?: boolean;
  onDelete?: (id: number) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  id,
  title,
  description,
  start_date,
  due_date,
  updated_at,
  completion,
  demo = false,
  className,
  onDelete,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  const handleDeleteClick = () => {
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (onDelete) {
      onDelete(id);
    }
    setIsDialogOpen(false);
  };

  const handleCardClick = () => {
    router.push(`/dashboard/${id}`);
  };

  return (
    <>
      <div
        key={id}
        className={clsx(
          'relative bg-white p-6 rounded-md shadow-md max-w-xl w-full flex flex-col items-start justify-between cursor-pointer border border-transparent hover:border-blue-500 transition-colors duration-200',
          className
        )}
        onClick={handleCardClick}
      >
        {demo && (
          <div className="absolute top-4 right-4">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
              <PlusIcon className="h-6 w-6 text-blue-500" aria-hidden="true" />
            </div>
          </div>
        )}

        <div className="w-full">
          <div className="flex items-center space-x-2 text-xs text-gray-500 mb-3">
            <time dateTime={start_date}>
              Start:{' '}
              {start_date ? new Date(start_date).toLocaleDateString() : 'N/A'}
            </time>
            <time dateTime={due_date}>
              Due: {due_date ? new Date(due_date).toLocaleDateString() : 'N/A'}
            </time>
          </div>

          <div className="group relative">
            <h3 className="text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
              <a href="#">
                <span className="absolute inset-0" />
                {title}
              </a>
            </h3>
            <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">
              {description}
            </p>
          </div>

          <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
            <span>
              Last Updated:{' '}
              {updated_at ? new Date(updated_at).toLocaleDateString() : 'N/A'}
            </span>
            <span>Completion: {demo ? 0 : completion}%</span>
          </div>
        </div>

        {!demo && (
          <div
            className="mt-4 flex justify-end w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <TrashIcon
              className="h-5 w-5 text-gray-400 cursor-pointer hover:text-red-500"
              aria-hidden="true"
              onClick={handleDeleteClick}
            />
          </div>
        )}
      </div>

      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        icon={TrashIcon}
        title="Delete Task"
        description="Are you sure you want to delete this task? This action cannot be undone."
        actionText="Confirm"
        onAction={handleConfirmDelete}
      />
    </>
  );
};
