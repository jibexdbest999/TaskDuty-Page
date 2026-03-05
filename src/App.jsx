import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import HomePage from "./Pages/HomePage";
import NewTaskPage from "./Pages/NewTaskPage";
import AllTasksPage from "./Pages/AllTasksPage";
import EditTaskPage from "./Pages/EditTaskPage";

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks((prev) => [...prev, task]);
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const updateTask = (updatedTask) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
    );
  };
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/newtask" element={<NewTaskPage addTask={addTask} />} />
        <Route
          path="/mytask"
          element={<AllTasksPage tasks={tasks} deleteTask={deleteTask} />}
        />
        <Route path="/edittask/:id" element={<EditTaskPage tasks={tasks} updateTask={updateTask} />} />
      </Routes>
    </>
  );
}

export default App;
