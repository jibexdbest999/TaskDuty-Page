import axios from "axios";

const API = "http://localhost:5000/auth";

export const loginUsers = (userData) =>
  axios.post(`${API}/login`, userData);

export const signupUsers = (userData) =>
  axios.post(`${API}/signup`, userData);