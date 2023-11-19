import AsyncStorage from '@react-native-async-storage/async-storage';

interface Task {
  id: number;
  content: string;
  completed: boolean;
  priority: number;
  priorityColor: string;
}

const STORAGE_KEY = 'mytasks';

const tasks: Task[] = [
  // { id: 1, content: 'Örnek görev 1', completed: false, priority: 3, priorityColor: 'red' },
  // { id: 2, content: 'Örnek görev 2', completed: true, priority: 2, priorityColor: 'yellow' },
  // ... diğer örnek görevler
];

const saveTasksToStorage = async (tasks: Task[]): Promise<void> => {
  try {
    const tasksJSON = JSON.stringify(tasks);
    await AsyncStorage.setItem(STORAGE_KEY, tasksJSON);
  } catch (error) {
    console.error('Error saving tasks to storage:', error);
  }
};

const getTasksFromStorage = async (): Promise<Task[]> => {
  try {
    const tasksJSON = await AsyncStorage.getItem(STORAGE_KEY);
    return tasksJSON ? JSON.parse(tasksJSON) : [];
  } catch (error) {
    console.error('Error getting tasks from storage:', error);
    return [];
  }
};

const getAllTasks = async (): Promise<Task[]> => {
  const tasksFromStorage = await getTasksFromStorage();
  return tasksFromStorage.length > 0 ? tasksFromStorage : tasks;
};

const addTask = async (content: string, priority: number, priorityColor: string): Promise<Task> => {
  const tasksFromStorage = await getTasksFromStorage();
  const newTask: Task = { id: tasksFromStorage.length + 2, content, completed: false, priority, priorityColor };
  const updatedTasks = [...tasksFromStorage, newTask];
  await saveTasksToStorage(updatedTasks);
  return newTask;
};

const deleteTask = async (taskId: number): Promise<Task | null> => {
  const tasksFromStorage = await getTasksFromStorage();
  const index = tasksFromStorage.findIndex((task) => task.id === taskId);
  if (index !== -1) {
    const deletedTask = tasksFromStorage.splice(index, 1)[0];
    await saveTasksToStorage(tasksFromStorage);
    return deletedTask;
  } else {
    return null;
  }
};

const toggleTaskCompletion = async (taskId: number): Promise<Task | null> => {
  const tasksFromStorage = await getTasksFromStorage();
  const task = tasksFromStorage.find((task) => task.id === taskId);
  if (task) {
    task.completed = !task.completed;
    await saveTasksToStorage(tasksFromStorage);
    return task;
  } else {
    return null;
  }
};

export { Task, getAllTasks, addTask, deleteTask, toggleTaskCompletion };
