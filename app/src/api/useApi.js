// useApi.js
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";

export const useApi = () => {
  const { authTokens } = useContext(AuthContext);

  // Aquí creamos una instancia de axios con los headers de autenticación
  // para las peticiones que requieren autenticación.
  const apiAuth = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    headers: {
      Authorization: `Bearer ${authTokens?.access}`,
    },
  });

  // No necesitamos los headers de autenticación para crear usuarios
  // porque la creación de usuarios no requiere autenticación.
  const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
  });

  return {
    createUser: (user) => api.post("/user/create/", user),
    getUserTasks: () => apiAuth.get("/user/tasks/my-tasks/"),
    createTask: (task) => apiAuth.post("/tasks/", task),
  };
};
