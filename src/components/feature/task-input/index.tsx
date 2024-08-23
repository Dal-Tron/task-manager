import { Button } from '@/components/base/button';
import { Input } from '@/components/base/input';
import { ResizableTextarea } from '@/components/base/resize-textarea';

interface TaskInputProps {
  inputValue: string;
  descriptionValue: string;
  onInputChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onSaveTask: () => void;
}

export const TaskInput: React.FC<TaskInputProps> = ({
  inputValue,
  descriptionValue,
  onInputChange,
  onDescriptionChange,
  onSaveTask,
}) => {
  return (
    <div className="bg-white p-12 shadow-md max-w-xl w-full text-center rounded-md">
      <Input
        value={inputValue}
        onChange={(e) => onInputChange(e.target.value)}
        placeholder="Develop better habits"
        className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl w-full mb-4 !-pl-5"
        disabled={true}
      />
      <ResizableTextarea
        value={descriptionValue}
        onChange={onDescriptionChange}
        placeholder="Establish a routine for daily exercises"
        className="mt-2 text-lg leading-8 text-gray-600 w-full"
        disabled={true}
      />
      <Button
        onClick={onSaveTask}
        className="mt-6 bg-blue-500 text-white font-semibold py-2 px-4 rounded-md"
        disabled={true}
        text="Save Task"
      />
    </div>
  );
};
