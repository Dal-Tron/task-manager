import { PlusCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';

import { Dialog } from '@/components/base/dialog';
import { Modal } from '@/components/base/modal';
import { TaskCard } from '@/components/feature/task-card';
import TaskService from '@/services/tasks';
import { ITask } from '@/types/task';

interface TaskSuggestionsModalProps {
  isOpen: boolean;
  closeModal: () => void;
  suggestions: ITask[];
  loading: boolean;
  onTaskCreate: (task: ITask) => void;
}

export const TaskSuggestionsModal: React.FC<TaskSuggestionsModalProps> = ({
  isOpen,
  closeModal,
  suggestions,
  loading,
  onTaskCreate,
}) => {
  const [localSuggestions, setLocalSuggestions] = useState(suggestions);
  const [isLoading, setIsLoading] = useState(loading);
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const fetchSuggestions = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/generate-subtasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'Default Title',
          description: 'Default Description',
        }),
      });

      const data = await response.json();
      setLocalSuggestions(data.subtasks);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (localSuggestions.length === 0 && isOpen) {
      fetchSuggestions();
    }
  }, [isOpen, localSuggestions.length]);

  const handleCreateTaskClick = (task: ITask) => {
    setSelectedTask(task);
  };

  const handleConfirmCreate = async () => {
    if (!selectedTask) return;

    setIsSaving(true);

    try {
      const newTask = await TaskService.createTask({
        title: selectedTask.title,
        description: selectedTask.description,
        start_date: new Date().toISOString(),
        due_date: new Date().toISOString(),
        completion: 0,
      });

      if (newTask) {
        setLocalSuggestions((prevSuggestions) =>
          prevSuggestions.filter((t) => t.id !== selectedTask.id)
        );
        onTaskCreate(newTask);
        setSelectedTask(null);
      }
    } catch (error) {
      console.error('Error creating task:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal isOpen={isOpen} closeModal={closeModal} title="Suggested Tasks" wide>
      <div className="absolute top-4 right-4">
        <XMarkIcon
          className="h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-700"
          onClick={closeModal}
        />
      </div>

      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
          <FaSpinner className="animate-spin h-12 w-12 text-gray-600" />
        </div>
      )}

      <div className="mt-8">
        <div className="mx-auto grid w-full max-w-full grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
          {localSuggestions.length === 0 && !isLoading ? (
            <p className="text-center text-gray-500">No more suggestions.</p>
          ) : (
            localSuggestions.map((task, index) => (
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
                onClick={() => handleCreateTaskClick(task)}
                isInModal
              />
            ))
          )}
        </div>
      </div>

      {selectedTask && (
        <Dialog
          open={!!selectedTask}
          onClose={() => setSelectedTask(null)}
          icon={PlusCircleIcon}
          title="Create Task"
          description="Would you like to create a new task with the selected details?"
          actionText="Create"
          onAction={handleConfirmCreate}
        />
      )}
    </Modal>
  );
};
