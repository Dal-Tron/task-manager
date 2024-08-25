import { Button } from '@/components/base/button';
import { Input } from '@/components/base/input';
import { ResizableTextarea } from '@/components/base/resize-textarea';

interface TaskInputProps {
  inputValue: string;
  descriptionValue: string;
  onInputChange: (value: string) => void;
  onDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSaveTask: () => void;
  onAddSubtask: () => void;
  disabled?: boolean;
}

export const TaskInput: React.FC<TaskInputProps> = ({
  inputValue,
  descriptionValue,
  onInputChange,
  onDescriptionChange,
  onSaveTask,
  onAddSubtask,
  disabled = false,
}) => {
  const isSaveDisabled = disabled || inputValue.length < 3;

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
          onClick={onAddSubtask}
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md"
          disabled={isSaveDisabled}
          text="Add Subtask"
        />
        <Button
          onClick={onSaveTask}
          className="ml-2 bg-green-500 text-white font-semibold py-2 px-4 rounded-md"
          disabled={isSaveDisabled}
          text="Save Task"
        />
      </div>
    </div>
  );
};
