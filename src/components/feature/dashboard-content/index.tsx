'use client';

import { useEffect, useState } from 'react';

import { HorizontalLine } from '@/components/base/horizontal-line';
import { SkeletonTaskCard } from '@/components/base/skeleton/SkeletonTaskCard';
import { TaskCard } from '@/components/feature/task-card';
import { TaskInput } from '@/components/feature/task-input';
import TaskService from '@/services/tasks';

import { SubtaskSection } from './components/SubtaskSection';

interface Task {
  id: number;
  title: string;
  description: string;
  start_date: string;
  due_date: string;
  completion: number;
  user_id: string;
}

export const DashboardContent = () => {
  const [inputValue, setInputValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [subtasks, setSubtasks] = useState<Task[]>([]);
  const [loadingSubtasks, setLoadingSubtasks] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [showSubtasks, setShowSubtasks] = useState(false);

  const handleSaveTask = async () => {
    const task = await TaskService.createTask({
      title: inputValue,
      description: descriptionValue,
      start_date: new Date().toISOString(),
      due_date: new Date().toISOString(),
      completion: 0,
    });
  };

  const handleDeleteTask = async (id: number) => {
    const success = await TaskService.deleteTask(id);
    if (success) {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } else {
      console.error('Failed to delete the task');
    }
  };

  const handleGetSubtasks = async () => {
    setShowSubtasks(true);
    setLoadingSubtasks(true);
    setSubtasks([]);

    try {
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
      setSubtasks(data.subtasks);
    } catch (error) {
      console.error('Error saving task or generating subtasks:', error);
    } finally {
      setLoadingSubtasks(false);
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      setLoadingTasks(true);
      const fetchedTasks = await TaskService.getTasks();
      setTasks(fetchedTasks || []);
      setLoadingTasks(false);
    };

    fetchTasks();
  }, []);

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
            onAddSubtask={handleGetSubtasks}
          />
        </div>

        {showSubtasks && (
          <SubtaskSection
            subtasks={subtasks}
            loadingSubtasks={loadingSubtasks}
          />
        )}

        <HorizontalLine text="Current Tasks" pulse={false} />

        <div className="mt-8">
          <div className="mx-auto grid w-full max-w-full grid-cols-1 gap-x-4 gap-y-8 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-0">
            {loadingTasks ? (
              <>
                <SkeletonTaskCard />
                <SkeletonTaskCard />
                <SkeletonTaskCard />
                <SkeletonTaskCard />
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
                  updated_at={new Date().toISOString()}
                  completion={task.completion}
                  className="min-h-[12rem]"
                  onDelete={handleDeleteTask}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
