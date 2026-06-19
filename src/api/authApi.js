import axios from "axios";

const API = "https://taskduty-server-qloc.onrender.com/auth";

export const loginUsers = (userData) =>
  axios.post(`${API}/login`, userData);

export const signupUsers = (userData) =>
  axios.post(`${API}/signup`, userData);