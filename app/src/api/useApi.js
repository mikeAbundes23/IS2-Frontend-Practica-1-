// useApi.js
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";

export const useApi = () => {
  const { authTokens } = useContext(AuthContext);

  // Obtener la URL base desde las variables de entorno
  const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api/";

  // Aquí creamos una instancia de axios con los headers de autenticación
  // para las peticiones que requieren autenticación.
  const apiAuth = axios.create({
    baseURL: baseURL,
    headers: {
      Authorization: `Bearer ${authTokens?.access}`,
    },
  });

  // No necesitamos los headers de autenticación para crear usuarios
  // porque la creación de usuarios no requiere autenticación.
  const api = axios.create({
    baseURL: baseURL,
  });

  return {
    createUser: (user) => api.post("/user/create/", user),
    getUserTasks: () => apiAuth.get("/user/tasks/my-tasks/"),
    createTask: (task) => apiAuth.post("/tasks/", task),
  };
};
