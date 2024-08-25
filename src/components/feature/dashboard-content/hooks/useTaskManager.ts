import { useEffect, useState } from 'react';

import TaskService from '@/services/tasks';
import { ITask } from '@/types/task';

export const useTaskManager = (initialTask?: ITask | null) => {
  const [inputValue, setInputValue] = useState(initialTask?.title || '');
  const [descriptionValue, setDescriptionValue] = useState(
    initialTask?.description || ''
  );
  const [subtasks, setSubtasks] = useState<ITask[]>([]);
  const [loadingSubtasks, setLoadingSubtasks] = useState(false);
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [showSubtasks, setShowSubtasks] = useState(false);

  useEffect(() => {
    if (initialTask) {
      setInputValue(initialTask.title);
      setDescriptionValue(initialTask.description);
    }
  }, [initialTask]);

  const handleSaveTask = async () => {
    const task = await TaskService.createTask({
      title: inputValue,
      description: descriptionValue,
      start_date: new Date().toISOString(),
      due_date: new Date().toISOString(),
      completion: 0,
    });

    if (task) {
      setTasks((prevTasks) => [...prevTasks, task]);
    }
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

  return {
    inputValue,
    setInputValue,
    descriptionValue,
    setDescriptionValue,
    subtasks,
    setSubtasks,
    loadingSubtasks,
    tasks,
    loadingTasks,
    showSubtasks,
    handleSaveTask,
    handleDeleteTask,
    handleGetSubtasks,
  };
};
