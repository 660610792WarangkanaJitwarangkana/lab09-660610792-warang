import TaskCard from "../components/TaskCard";
import TodoModal from "../components/Modal";
import { type TaskCardProps } from "../libs/Todolist";
import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState<TaskCardProps[]>([
    {
      id: "1",
      title: "Read a book",
      description: "Vite + React + Bootstrap + TS",
      isDone: false,
    },
    {
      id: "2",
      title: "Write code",
      description: "Finish project for class",
      isDone: false,
    },
    {
      id: "3",
      title: "Deploy app",
      description: "Push project to GitHub Pages",
      isDone: false,
    },
  ]);

  const handleAdd = (newTask: TaskCardProps) => {
    // make a new array based on old "tasks" and add newTask as last one
    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
  };

  // Define the function with proper type
  const deleteTask = (taskId: string) => {
    const newTasks = tasks.filter((task: TaskCardProps) => task.id !== taskId);
    setTasks(newTasks);
  };

  // Define the function with proper type
  const toggleDoneTask = (taskId: string) => {
    // สร้าง array ใหม่โดย map ผ่าน tasks เดิม
    const newTasks = tasks.map((todo: TaskCardProps) =>
      // ถ้า id ของ todo ตรงกับ taskId ที่ส่งเข้ามา
      // ให้สร้าง object ใหม่โดย copy todo เดิม และสลับค่า isDone เป็นตรงข้าม
      todo.id === taskId ? { ...todo, isDone: !todo.isDone } : todo
    );
    setTasks(newTasks);
  };

  return (
    <div className="col-12 m-2 p-0">
      <div className="container text-center">
        <h2>Todo List</h2>
        <span className="m-2">
          All : ({tasks.length}) Done : ({tasks.filter((task) => task.isDone).length})
        </span>
        {/* Modal Component */}
        <button
          type="button"
          className="btn btn-primary my-3"
          data-bs-toggle="modal"
          data-bs-target="#todoModal"
        >
          Add
        </button>

        <TodoModal onAdd={handleAdd} />
        <>
          {tasks.map((task) => (
            <TaskCard
              id={task.id}
              title={task.title}
              description={task.description}
              isDone={task.isDone} // ส่งค่า isDone เข้าไปใน TaskCard
              deleteTaskFunc={deleteTask}
              toggleDoneTaskFunc={toggleDoneTask} // ส่งฟังก์ชัน toggleDoneTask เข้าไป
              key={task.id}
            />
          ))}
        </>
      </div>
    </div>
  );
}

export default App;