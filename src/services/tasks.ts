import { ITask } from '@/types/task';
import { createClient } from '@/util/supabase/client';

class TaskService {
  private static supabase = createClient();

  static async createTask(
    task: Omit<ITask, 'id' | 'updated_at' | 'user_id'>
  ): Promise<ITask | null> {
    try {
      const { data, error } = await this.supabase
        .from('tasks')
        .insert({
          ...task,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select('*')
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Create Task Error:', error);
      return null;
    }
  }

  static async getTasks(): Promise<ITask[] | null> {
    try {
      const { data, error } = await this.supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Get Tasks Error:', error);
      return null;
    }
  }

  static async getTaskById(taskId: number): Promise<ITask | null> {
    try {
      const { data, error } = await this.supabase
        .from('tasks')
        .select('*')
        .eq('id', taskId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Get Task By ID Error:', error);
      return null;
    }
  }

  static async updateTask(
    taskId: number,
    updates: Partial<Omit<ITask, 'id'>>
  ): Promise<ITask | null> {
    try {
      const { data, error } = await this.supabase
        .from('tasks')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', taskId)
        .select('*')
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Update Task Error:', error);
      return null;
    }
  }

  static async deleteTask(taskId: number): Promise<boolean> {
    try {
      const { error } = await this.supabase
        .from('tasks')
        .delete()
        .eq('id', taskId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Delete Task Error:', error);
      return false;
    }
  }
}

export default TaskService;
