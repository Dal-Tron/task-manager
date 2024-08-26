import { TrashIcon, PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
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
  onClick?: () => void;
  isInModal?: boolean;
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
  onClick,
  isInModal = false,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    onDelete?.(id);
    setIsDialogOpen(false);
  };

  const truncatedDescription =
    description.length > 50 ? `${description.slice(0, 50)}...` : description;

  return (
    <>
      <div
        key={id}
        className={clsx(
          'relative bg-white p-6 rounded-md shadow-md max-w-xl w-full flex flex-col justify-between cursor-pointer border border-transparent hover:border-blue-500 transition-colors duration-200',
          className
        )}
        onClick={onClick}
      >
        <div className="flex-1 w-full">
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
              {title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              {truncatedDescription}
            </p>
          </div>

          {!isInModal && (
            <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
              <span>
                Last Updated:{' '}
                {updated_at ? new Date(updated_at).toLocaleDateString() : 'N/A'}
              </span>
              <span>Completion: {completion}%</span>
            </div>
          )}
        </div>

        <div className="flex justify-end w-full mt-2">
          {!isInModal && !demo && (
            <TrashIcon
              className="h-5 w-5 text-gray-400 cursor-pointer hover:text-red-500"
              aria-hidden="true"
              onClick={handleDeleteClick}
            />
          )}

          {isInModal && !demo && (
            <div className="flex items-center justify-center size-8 bg-blue-100 rounded-full">
              <PlusIcon
                className="h-5 w-5 text-blue-500 cursor-pointer hover:text-blue-700"
                aria-hidden="true"
              />
            </div>
          )}
        </div>
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
