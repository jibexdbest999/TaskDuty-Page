import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import HomePage from "./Pages/HomePage";
import NewTaskPage from "./Pages/NewTaskPage";
import AllTasksPage from "./Pages/AllTasksPage";
import EditTaskPage from "./Pages/EditTaskPage";
import SignUpPage from "./Pages/AuthPages/SignUpPage";
import LoginPage from "./Pages/AuthPages/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import ProfilePage from "./Pages/ProfilePage";
import TrashPage from "./Pages/TrashPage";

import {
  getTasks,
  createTask,
  updateTask as updateTaskApi,
  deleteTask as deleteTaskApi,
  getTrashTasks,
  restoreTaskApi,
  deleteTaskPermanentApi,
} from "./api/taskApi";

function App() {
  const [tasks, setTasks] = useState([]);
  const [trashedTasks, setTrashedTasks] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (token) {
      fetchTasks();
      fetchTrashTasks();
    }
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
      fetchTrashTasks();
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

  const fetchTrashTasks = async () => {
    try {
      const res = await getTrashTasks();
      setTrashedTasks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const restoreTask = async (id) => {
    try {
      await restoreTaskApi(id);

      fetchTasks();
      fetchTrashTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTaskPermanent = async (id) => {
    try {
      await deleteTaskPermanentApi(id);

      setTrashedTasks((prev) =>
        prev.filter((task) => task._id !== id)
      );
    } catch (error) {
    console.error(error);
    }
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/newtask" element={<ProtectedRoute> <NewTaskPage addTask={addTask} /> </ProtectedRoute>} />
        <Route
          path="/mytask"
          element={<ProtectedRoute> <AllTasksPage tasks={tasks} deleteTask={deleteTask} /> </ProtectedRoute>}
        />
        <Route path="/edittask/:id" element={<ProtectedRoute> <EditTaskPage tasks={tasks} updateTask={updateTask} /> </ProtectedRoute>} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/trash" element={<ProtectedRoute><TrashPage trashedTasks={trashedTasks} restoreTask={restoreTask} deleteTaskPermanent={deleteTaskPermanent} /></ProtectedRoute>} />
      </Routes>
    </>
  );
}

export default App;
