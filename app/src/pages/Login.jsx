import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function Login() {
  const { loginUser } = useContext(AuthContext);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={loginUser}
        className="bg-white p-6 rounded shadow-md w-96"
      >
        <h2 className="text-xl font-bold mb-4">Iniciar Sesión</h2>
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          className="w-full p-2 mb-3 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          className="w-full p-2 mb-3 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
