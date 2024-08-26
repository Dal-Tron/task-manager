import { useState, useEffect } from 'react';

import TaskService from '@/services/tasks';
import { ITask } from '@/types/task';

export function useTaskManager(initialTask?: ITask | null) {
  const [inputValue, setInputValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [loadingSubtasks, setLoadingSubtasks] = useState(false);
  const [showSubtasks, setShowSubtasks] = useState(false);

  useEffect(() => {
    if (initialTask) {
      setInputValue(initialTask.title);
      setDescriptionValue(initialTask.description);
    }
  }, [initialTask]);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoadingTasks(true);
      const fetchedTasks = await TaskService.getTasks();
      setTasks(fetchedTasks || []);
      setLoadingTasks(false);
    };

    fetchTasks();
  }, []);

  const handleSaveTask = async () => {
    if (initialTask && initialTask.id) {
      // Update existing task
      const updatedTask = await TaskService.updateTask(initialTask.id, {
        title: inputValue,
        description: descriptionValue,
      });

      if (updatedTask) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === updatedTask.id ? updatedTask : task
          )
        );
      }
    } else {
      // Create a new task
      const newTask = await TaskService.createTask({
        title: inputValue,
        description: descriptionValue,
        start_date: new Date().toISOString(),
        due_date: new Date().toISOString(),
        completion: 0,
      });

      if (newTask) {
        setTasks((prevTasks) => [newTask, ...prevTasks]);
        setInputValue('');
        setDescriptionValue('');
      }
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
  };

  return {
    setTasks,
    inputValue,
    setInputValue,
    descriptionValue,
    setDescriptionValue,
    tasks,
    loadingTasks,
    loadingSubtasks,
    showSubtasks,
    handleSaveTask,
    handleDeleteTask,
    handleGetSubtasks,
  };
}
