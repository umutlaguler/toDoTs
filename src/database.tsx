// database.ts

interface Task {
    id: number;
    content: string;
    completed: boolean;
    priority: number;
    priorityColor: string
  }
  
  const tasks: Task[] = [
    { id: 1, content: 'Örnek görev 1', completed: false, priority: 3, priorityColor: 'red' },
    { id: 2, content: 'Örnek görev 2', completed: true, priority: 2, priorityColor: 'yellow' },
    // ... diğer örnek görevler
  ];
  
  const getAllTasks = (): Promise<Task[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(tasks);
      }, 1000);
    });
  };
  
  const addTask = (content: string, priority: number, priorityColor: string): Promise<Task> => {
    console.log("priotdsifsdf", priorityColor)
    return new Promise((resolve) => {
      setTimeout(() => {
        const newTask: Task = { id: tasks.length + 2, content, completed: false, priority, priorityColor};
        tasks.push(newTask);
        resolve(newTask);
      }, 1000);
    });
  };
  
  const deleteTask = (taskId: number): Promise<Task | null> => {
    // console.log("umut bu neden calısmadı ")
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = tasks.findIndex((task) => task.id === taskId);
        if (index !== -1) {
          const deletedTask = tasks.splice(index, 1)[0];
          // console.log("umut bu neden calısmadı deleted", deletedTask)
          resolve(deletedTask);
        } else {
          resolve(null);
        }
      }, 1000);
    });
  };
  
  const toggleTaskCompletion = (taskId: number): Promise<Task | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const task = tasks.find((task) => task.id === taskId);
        if (task) {
          task.completed = !task.completed;
          resolve(task);
        } else {
          resolve(null);
        }
      }, 1000);
    });
  };
  
  export {Task, getAllTasks, addTask, deleteTask, toggleTaskCompletion };
  