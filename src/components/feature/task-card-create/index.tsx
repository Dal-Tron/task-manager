'use client';

import { PlusIcon } from '@heroicons/react/24/outline';

export const CreateTaskCard: React.FC = () => {
  const handleCreateTaskClick = () => {
    window.location.href = '/dashboard';
  };

  return (
    <div
      onClick={handleCreateTaskClick}
      className="bg-white p-6 rounded-md shadow-md max-w-xl w-full flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50"
    >
      <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
        <PlusIcon className="h-8 w-8 text-blue-500" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900">Create New Task</h3>
      <p className="mt-2 text-sm leading-6 text-gray-600">
        A new task can be a subtask as well
      </p>
    </div>
  );
};
