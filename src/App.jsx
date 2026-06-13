import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import HomePage from "./Pages/HomePage";
import NewTaskPage from "./Pages/NewTaskPage";
import AllTasksPage from "./Pages/AllTasksPage";
import EditTaskPage from "./Pages/EditTaskPage";

import {
  getTasks,
  createTask,
  updateTask as updateTaskApi,
  deleteTask as deleteTaskApi,
} from "./api/taskApi";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addTask = async (task) => {
    try {
      const res = await createTask(task);
      setTasks((prev) => [...prev, res.data]);
    } catch (error) {
      console.error(error)
    }
    };

  const deleteTask = async (id) => {
    try {
      await deleteTaskApi(id);

      setTasks((prev) => 
        prev.filter((task) => task._id !== id)
    );
    } catch (error) {
      console.error(error);
    }
  };

  const updateTask = async (id, updatedTask) => {
    try { 
      const res = await updateTaskApi(id, updatedTask);

      setTasks((prev) =>
        prev.map((task) =>
          task._id === id ? res.data : task
        )
      );
    } catch (error) {
      console.error(error);
    }
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
