'use client';

import { useEffect, useState } from 'react';

import { HorizontalLine } from '@/components/base/horizontal-line';
import { TaskInput } from '@/components/feature/task-input';
import { TaskList } from '@/components/feature/task-list';
import TaskService from '@/services/tasks';
import { ITask } from '@/types/task';

import { useTaskManager } from './hooks/useTaskManager';

interface DashboardContentProps {
  params?: { task_id?: string };
}

export default function DashboardContent({ params }: DashboardContentProps) {
  const [task, setTask] = useState<ITask | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      if (params?.task_id) {
        const fetchedTask = await TaskService.getTaskById(
          Number(params.task_id)
        );
        setTask(fetchedTask);
      }
    };

    fetchTask();
  }, [params?.task_id]);

  const {
    inputValue,
    setInputValue,
    descriptionValue,
    setDescriptionValue,
    tasks,
    setTasks,
    loadingTasks,
    handleSaveTask,
    handleDeleteTask,
  } = useTaskManager(task);

  const handleTaskCreate = (newTask: ITask) => {
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  return (
    <div className="pb-14 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center w-full mb-8">
          <TaskInput
            inputValue={inputValue}
            descriptionValue={descriptionValue}
            onInputChange={setInputValue}
            onDescriptionChange={(e) => setDescriptionValue(e.target.value)}
            onSaveTask={handleSaveTask}
            onTaskCreate={handleTaskCreate}
            isEditing={!!params?.task_id}
          />
        </div>

        <HorizontalLine text="Current Tasks" pulse={false} />

        <TaskList
          tasks={tasks}
          loadingTasks={loadingTasks}
          onDelete={handleDeleteTask}
          currentTaskId={params?.task_id}
          isMain={true}
        />
      </div>
    </div>
  );
}
