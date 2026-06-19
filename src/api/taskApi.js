import axios from "axios";

const API = "https://taskduty-server-qloc.onrender.com/tasks";

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
})

export const getTasks = () => axios.get(API, getAuthHeaders());

export const createTask = (task) =>
  axios.post(API, task, getAuthHeaders());

export const updateTask = (id, task) =>
  axios.put(`${API}/${id}`, task, getAuthHeaders());

export const deleteTask = (id) =>
  axios.delete(`${API}/${id}`, getAuthHeaders());