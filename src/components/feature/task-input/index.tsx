import { useState } from 'react';

import { Button } from '@/components/base/button';
import { Input } from '@/components/base/input';
import { ResizableTextarea } from '@/components/base/resize-textarea';
import { TaskSuggestionsModal } from '@/components/feature/task-suggestions-modal';
import { ITask } from '@/types/task';

interface TaskInputProps {
  inputValue: string;
  descriptionValue: string;
  onInputChange: (value: string) => void;
  onDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSaveTask: () => void;
  onTaskCreate: (task: ITask) => void;
  disabled?: boolean;
  isEditing?: boolean;
}

export const TaskInput: React.FC<TaskInputProps> = ({
  inputValue,
  descriptionValue,
  onInputChange,
  onDescriptionChange,
  onSaveTask,
  onTaskCreate,
  disabled = false,
  isEditing = false,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<ITask[]>([]);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);

  const isSaveDisabled = disabled || inputValue.length < 3;

  const handleSuggestTask = async () => {
    setIsModalOpen(true);
    setSuggestionsLoading(true);

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
    setSuggestions(data.subtasks);
    setSuggestionsLoading(false);
  };

  const handleCreateTask = (newTask: ITask) => {
    onTaskCreate(newTask);
  };

  return (
    <div className="bg-white p-12 shadow-md max-w-xl w-full text-center rounded-md">
      <Input
        value={inputValue}
        onChange={(e) => onInputChange(e.target.value)}
        placeholder="Develop better habits"
        className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl w-full mb-4 !-pl-5"
        disabled={disabled}
      />
      <ResizableTextarea
        value={descriptionValue}
        onChange={onDescriptionChange}
        placeholder="Establish a routine for daily exercises"
        className="mt-2 text-lg leading-8 text-gray-600 w-full"
        disabled={disabled}
      />
      <div className="mt-6 flex justify-end">
        <Button
          onClick={handleSuggestTask}
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md"
          disabled={isSaveDisabled}
          text="Suggest Task"
        />
        <Button
          onClick={onSaveTask}
          className="ml-2 bg-green-500 text-white font-semibold py-2 px-4 rounded-md"
          disabled={isSaveDisabled}
          text={isEditing ? 'Update Task' : 'Save Task'}
        />
      </div>

      <TaskSuggestionsModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        suggestions={suggestions}
        loading={suggestionsLoading}
        onTaskCreate={handleCreateTask}
      />
    </div>
  );
};
